import { useAppSelector } from '@/hooks/react-redux';
import { verifyUserByID, getIDPhotoData } from '@/services/verification';
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
  Spinner,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { getProfilePic } from '@/services/account';

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
  const [profilePic, setProfilePic] = useState('');
  const toast = useToast();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [IDbase64, setIDbase64] = useState('');
  useEffect(() => {
    getProfilePic(user).then((profilePic) => {
      setProfilePic(profilePic);
    });
    getIDPhotoData(request.img_key).then((resp) => {
      setIDbase64(`data:image/png;base64,${resp.data.image}`);
      setIsPageLoading(false);
    });
  }, []);
  const handleRequest = async (approval: boolean) => {
    setIsProcessing(true);
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
      {isPageLoading ? (
        <Spinner />
      ) : (
        <ScrollView
          _contentContainerStyle={{
            px: '20px',
            mb: '4',
          }}
        >
          <Center flex={1}>
            <Avatar
              size="150px"
              source={{
                uri: profilePic,
              }}
            />
            {Object.keys(normalizedKeys).map((key) => (
              <Center key={key}>
                <Row
                  maxWidth="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text bold underline>
                    {normalizedKeys[key as keyof typeof normalizedKeys]}
                  </Text>
                </Row>
                <Row
                  maxWidth="100%"
                  alignItems="center"
                  justifyContent="center"
                >
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
              resizeMode="contain"
              source={{
                uri: IDbase64,
              }}
              alt={'Alternate Text ' + '2xl'}
            />
          </Center>

          {!isProcessing && (
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
          {isProcessing && (
            <Center flex={1} marginBottom="30%">
              <Text>Processing...</Text>
            </Center>
          )}
        </ScrollView>
      )}
    </View>
  );
}
