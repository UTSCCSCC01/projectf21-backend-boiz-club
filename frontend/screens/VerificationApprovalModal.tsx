import { AccountStackScreenProps, User } from '@/types';
import {
  Button,
  Center,
  Heading,
  Image,
  Row,
  ScrollView,
  Text,
  View,
  Avatar,
} from 'native-base';
import React from 'react';

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
  const onApprove = () => {
    navigation.goBack();
  };
  const onReject = () => {
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

        <Row justifyContent="space-between" marginTop="10%" marginBottom="30%">
          <Button colorScheme="teal" onPress={onApprove}>
            Approve
          </Button>
          <Button colorScheme="danger" onPress={onReject}>
            Reject
          </Button>
        </Row>
      </ScrollView>
    </View>
  );
}
