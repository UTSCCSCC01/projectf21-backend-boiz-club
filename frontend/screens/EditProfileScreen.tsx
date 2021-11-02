import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Center,
  Column,
  Pressable,
  Row,
  Spinner,
  Text,
} from 'native-base';
import { useAppSelector } from '@/hooks/react-redux';
import { User } from '@/types';
import { getProfilePic, updateProfilePic, whoAmI } from '@/services/account';
import * as DocumentPicker from 'expo-document-picker';

export default function EditProfileScreen() {
  const token = useAppSelector((state) => state.userCredential.userToken);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [profilePic, setProfilePic] = useState('');

  async function getUserInfo() {
    setIsLoading(true);
    await whoAmI(token).then(async (res) => {
      setUserInfo(res.data);
      setProfilePic(await getProfilePic(res.data));
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const pickImage = async () => {
    await DocumentPicker.getDocumentAsync({
      type: 'image/*',
    }).then(async (resp) => {
      if (resp.type === 'success') {
        await updateProfilePic(resp.uri, token);
        await getUserInfo();
      }
    });
  };

  return (
    <Center padding={5}>
      {!isLoading ? (
        <>
          <Row>
            <Column>
              <Avatar
                bg="lightBlue.400"
                size="xl"
                source={{
                  uri: profilePic,
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
        </>
      ) : (
        <Spinner />
      )}
    </Center>
  );
}
