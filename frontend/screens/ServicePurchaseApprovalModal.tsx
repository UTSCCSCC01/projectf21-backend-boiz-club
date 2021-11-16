import { useAppSelector } from '@/hooks/react-redux';
import { verifyServicePurchaseByID } from '@/services/verification';
import { AccountStackScreenProps, User } from '@/types';
import {
  Button,
  Center,
  Heading,
  Row,
  ScrollView,
  Text,
  useToast,
  View,
} from 'native-base';
import React, { Fragment, useEffect, useState } from 'react';

const normalizedKeys = {
  service_name: 'Service',
  service_price: 'Price',
  address: 'Address',
};
export default function ServicePurchaseApprovalModal({
  navigation,
  route,
}: AccountStackScreenProps<'ServicePurchaseApprovalModal'>) {
  const { user, request, service } = route.params;
  const token = useAppSelector((state) => state.userCredential.userToken);
  const toast = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {}, []);
  const handleApprovalRequest = async () => {
    setIsProcessing(true);
    await verifyServicePurchaseByID(request._id, true, token)
      .catch((err) => {
        console.log(err);
        toast.show({
          status: 'error',
          title: err,
          placement: 'top',
        });
      })
      .then((resp) => {
        toast.show({
          status: resp.status === 200 ? 'success' : 'error',
          title:
            resp.status === 200
              ? 'Purchase approved'
              : 'Purchase approval unsuccessful',
          placement: 'top',
        });
      });
    navigation.goBack();
  };
  const handleRejectionRequest = async () => {
    setIsProcessing(true);
    await verifyServicePurchaseByID(request._id, false, token)
      .catch((err) => {
        console.log(err);
        toast.show({
          status: 'error',
          title: err,
          placement: 'top',
        });
      })
      .then((resp) => {
        toast.show({
          status: resp.status === 200 ? 'success' : 'error',
          title:
            resp.status === 200
              ? 'Purchase declined'
              : 'Purchase decline unsuccessful',
          placement: 'top',
        });
      });
    navigation.goBack();
  };
  return (
    <View flex={1} alignItems="center" backgroundColor="white">
      <Heading fontSize="sm" p="4" pb="3">
        Service Purchase Request
      </Heading>
      <ScrollView
        _contentContainerStyle={{
          px: '20px',
          mb: '4',
        }}
      >
        <Center flex={1}>
          <Center>
            <Row maxWidth="100%" alignItems="center" justifyContent="center">
              <Text bold fontSize="lg" color="#E6973F">
                {'Customer Details'}
              </Text>
            </Row>
            <Row maxWidth="100%" alignItems="center" justifyContent="center">
              <Text bold underline>
                {'Username'}
              </Text>
            </Row>
            <Row maxWidth="100%" alignItems="center" justifyContent="center">
              <Text>{user.username}</Text>
            </Row>
            <Row maxWidth="100%" alignItems="center" justifyContent="center">
              <Text bold underline>
                {'Name'}
              </Text>
            </Row>
            <Row maxWidth="100%" alignItems="center" justifyContent="center">
              <Text>{user.first_name + ' ' + user.last_name}</Text>
            </Row>
            <Row maxWidth="100%" alignItems="center" justifyContent="center">
              <Text bold underline>
                {'Contact Number'}
              </Text>
            </Row>
            <Row
              maxWidth="100%"
              alignItems="center"
              justifyContent="center"
              marginBottom="5%"
            >
              <Text>{user.phone_number}</Text>
            </Row>
            <Row maxWidth="100%" alignItems="center" justifyContent="center">
              <Text bold fontSize="lg" color="#72BCC1">
                {'Service Details'}
              </Text>
            </Row>
            {Object.keys(normalizedKeys).map((key) => (
              <Fragment key={key}>
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
                  <Text>{service[key as keyof User]}</Text>
                </Row>
              </Fragment>
            ))}
          </Center>
        </Center>

        {!isProcessing && (
          <Row justifyContent="center" marginTop="10%" marginBottom="30%">
            <Button
              colorScheme="danger"
              onPress={() => handleRejectionRequest()}
              marginRight="10%"
            >
              Reject
            </Button>
            <Button
              marginLeft="10%"
              colorScheme="teal"
              onPress={() => handleApprovalRequest()}
            >
              Approve
            </Button>
          </Row>
        )}
        {isProcessing && (
          <Center flex={1} marginBottom="30%">
            <Text>Processing...</Text>
          </Center>
        )}
      </ScrollView>
    </View>
  );
}
