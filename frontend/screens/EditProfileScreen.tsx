import React, { useEffect, useState } from 'react';
import { Avatar, Center, Column, Pressable, Row, Text } from 'native-base';
import { useAppSelector } from '@/hooks/react-redux';
import { User } from '@/types';
import { whoAmI } from '@/services/account';
import * as DocumentPicker from 'expo-document-picker';

export default function EditProfileScreen() {
  const token = useAppSelector((state) => state.userCredential.userToken);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    async function getUserInfo() {
      setIsLoading(true);
      await whoAmI(token).then((res) => {
        setUserInfo(res.data);
        setIsLoading(false);
      });
    }

    getUserInfo();
  }, [token]);

  const pickImage = async () => {
    await DocumentPicker.getDocumentAsync({
      type: 'image/*',
    }).then((resp) => {});
  };

  return (
    <Center padding={5}>
      <Row>
        <Column>
          <Avatar
            bg="lightBlue.400"
            size="xl"
            source={{
              uri: 'https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg',
            }}
          />
        </Column>
      </Row>
      <Row>
        <Column alignItems="center">
          <Text
            bold
            fontSize="xl"
            alignContent="center"
            justifyContent="center"
          >
            {userInfo?.username} &nbsp;
          </Text>
        </Column>
      </Row>
      <Row>
        <Pressable onPress={pickImage}>
          <Text underline style={{ color: 'blue' }}>
            Change Profile Photo
          </Text>
        </Pressable>
      </Row>
    </Center>
  );
}
