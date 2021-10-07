import { useAppSelector } from '@/hooks/react-redux';
import { verifyUserByID } from '@/services/verification';
import { AccountStackScreenProps, User } from '@/types';
import {
  Avatar,
  Button,
  Center,
  Heading,
  Image,
  Row,
  ScrollView,
  Text,
  useToast,
  View,
} from 'native-base';
import React, { useState } from 'react';

const normalizedKeys = {
  username: 'Username',
  first_name: 'First Name',
  last_name: 'Last Name',
  address: 'Address',
  phone_number: 'Phone Number',
};
export default function VerificationApprovalModal({
  navigation,
  route,
}: AccountStackScreenProps<'VerificationApprovalModal'>) {
  const { user, request } = route.params;
  const token = useAppSelector((state) => state.userCredential.userToken);

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const handleRequest = async (approval: boolean) => {
    setIsLoading(true);
    await verifyUserByID(request.user_id, approval, token)
      .catch((err) => {
        toast.show({
          status: 'error',
          title: err,
          placement: 'top',
        });
      })
      .then((resp) => {
        toast.show({
          status: resp.status === 200 ? 'success' : 'error',
          title: resp.data.message,
          placement: 'top',
        });
      });
    navigation.goBack();
  };
  return (
    <View flex={1} alignItems="center" backgroundColor="white">
      <Heading fontSize="sm" p="4" pb="3">
        Account Verification Request
      </Heading>
      <ScrollView
        _contentContainerStyle={{
          px: '20px',
          mb: '4',
        }}
      >
        <Center flex={1}>
          <Avatar
            size="150px"
            // source={{
            //   uri: '',
            // }}
          />
          {Object.keys(normalizedKeys).map((key) => (
            <Center key={key}>
              <Row maxWidth="100%" alignItems="center" justifyContent="center">
                <Text bold underline>
                  {normalizedKeys[key as keyof typeof normalizedKeys]}
                </Text>
              </Row>
              <Row maxWidth="100%" alignItems="center" justifyContent="center">
                <Text>{user[key as keyof User]}</Text>
              </Row>
            </Center>
          ))}
          <Row maxWidth="100%" alignItems="center" justifyContent="center">
            <Text bold underline>
              {'ID'}
            </Text>
          </Row>
          <Image
            size={'2xl'}
            resizeMode="cover"
            source={{
              uri: 'https://wallpaperaccess.com/full/317501.jpg',
            }}
            alt={'Alternate Text ' + '2xl'}
          />
        </Center>

        {!isLoading && (
          <Row
            justifyContent="space-between"
            marginTop="10%"
            marginBottom="30%"
          >
            <Button colorScheme="teal" onPress={() => handleRequest(true)}>
              Approve
            </Button>
            <Button colorScheme="danger" onPress={() => handleRequest(false)}>
              Reject
            </Button>
          </Row>
        )}
        {isLoading && (
          <Center flex={1} marginBottom="30%">
            <Text>Processing...</Text>
          </Center>
        )}
      </ScrollView>
    </View>
  );
}
