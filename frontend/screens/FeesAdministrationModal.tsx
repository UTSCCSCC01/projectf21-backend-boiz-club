import React, { useEffect, useState } from 'react';
import { AccountStackScreenProps, User } from '@/types';
import {
  Button,
  FormControl,
  Heading,
  Input,
  Spinner,
  Text,
  View,
  VStack,
} from 'native-base';
import { whoAmI } from '@/services/account';
import { useAppSelector } from '@/hooks/react-redux';

interface Fees {
  customerFee: number;
  serviceProviderFee: number;
}

const FeesAdministrationModal = ({
  navigation,
}: AccountStackScreenProps<'FeesAdministrationModal'>) => {
  const [currentFees, setCurrentFees] = useState<Fees>({
    customerFee: 8,
    serviceProviderFee: 17,
  });
  const [fees, setFees] = useState<Fees>({
    customerFee: 0,
    serviceProviderFee: 0,
  });
  const token = useAppSelector((state) => state.userCredential.userToken);
  const [userInfo, setUserInfo] = React.useState<User | null>(null);

  // variables for form validation
  const [inputError, setInputError] = useState({
    customerFeeError: false,
    serviceProviderFeeError: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Make sure user information inputs are valid
  const validateInput = (customerFee: number, serviceProviderFee: number) => {
    if (customerFee === null || customerFee < 0 || customerFee > 100) {
      setInputError({
        customerFeeError: true,
        serviceProviderFeeError: false,
      });
    } else if (
      serviceProviderFee === null ||
      serviceProviderFee < 0 ||
      serviceProviderFee > 100
    ) {
      setInputError({
        customerFeeError: false,
        serviceProviderFeeError: true,
      });
    } else {
      setInputError({
        customerFeeError: false,
        serviceProviderFeeError: false,
      });
      return true;
    }
    return false;
  };

  const handleCustomerFeeChange = (input: number) => {
    setFees({
      ...fees,
      customerFee: input,
    });
  };

  const handleServiceProviderFeeChange = (input: number) => {
    setFees({
      ...fees,
      serviceProviderFee: input,
    });
  };

  // Set the current fees details
  const setFeeInfo = (customerFee: number, serviceProviderFee: number) => {
    setCurrentFees({
      customerFee: customerFee,
      serviceProviderFee: serviceProviderFee,
    });
  };

  const updateUserInfo = async () => {
    setIsLoading(true);
    whoAmI(token).then((res) => {
      setUserInfo(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    // TODO: Get current fees and update currentFee variable
    updateUserInfo();
    setIsLoading(false);
  }, []);

  const onPressUpdateFees = ({ customerFee, serviceProviderFee }: Fees) => {
    setIsLoading(true);
    if (!validateInput(customerFee, serviceProviderFee)) {
      setIsLoading(false);
      return;
    }
    // TODO: send POST request to update fees
    setFeeInfo(customerFee, serviceProviderFee);
    // TODO: update current fee values
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View safeArea flex={1} alignItems="center" justifyContent="center">
        <Spinner size="lg" />
      </View>
    );
  }

  const feeAdministration = () => (
    <View flex={1}>
      <VStack alignItems="center">
        <FormControl isInvalid={inputError.serviceProviderFeeError}>
          <FormControl.Label>New Service Fee (%)</FormControl.Label>
          <Input
            size="lg"
            keyboardType="number-pad"
            placeholder="0-100"
            onChangeText={(text) =>
              handleServiceProviderFeeChange(parseInt(text, 10))
            }
            returnKeyType="done"
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Invalid fee value. Enter a number between 0-100
          </FormControl.ErrorMessage>
        </FormControl>
      </VStack>
      <Button.Group space={2} marginTop={2}>
        <Button
          width="100%"
          disabled={isLoading}
          onPress={() => onPressUpdateFees(fees)}
        >
          Update
        </Button>
      </Button.Group>
    </View>
  );

  return (
    <View
      flex={1}
      alignItems="center"
      // justifyContent="center"
      backgroundColor="white"
      padding={5}
    >
      <Heading fontSize="3xl" p="4" pb="3" marginBottom={4}>
        Service Fees
      </Heading>
      <VStack alignItems="flex-start">
        <View marginBottom="8">
          <Text fontSize="xl" fontWeight="semibold">
            Customer Fee:{'  '}
            <Text fontSize="2xl" fontWeight="bold" color="#E6973F">
              {currentFees.customerFee}%
            </Text>
          </Text>
          <Text marginBottom="2">
            The percentage cut of revenue Pawsup takes from a purchase of a
            service for the use of the platform
          </Text>
          <FormControl isInvalid={inputError.customerFeeError}>
            <FormControl.Label>New Customer Fee (%)</FormControl.Label>
            <Input
              size="lg"
              keyboardType="number-pad"
              placeholder="0-100"
              onChangeText={(text) =>
                handleCustomerFeeChange(parseInt(text, 10))
              }
              returnKeyType="done"
            />
            <FormControl.ErrorMessage
              _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
            >
              Invalid fee value. Enter a number between 0-100
            </FormControl.ErrorMessage>
          </FormControl>
        </View>
        <View marginBottom="4">
          <Text fontSize="xl" fontWeight="semibold">
            Service Provider Fee:{'  '}
            <Text fontSize="2xl" fontWeight="bold" color="#E6973F">
              {currentFees.serviceProviderFee}%
            </Text>
          </Text>
          <Text fontSize="md" fontWeight="semibold">
            What is the Service Fee?
          </Text>
          <Text marginBottom="2">
            The service fee is a small percentage cut of revenue Pawsup takes
            from a purchase of a service.
          </Text>
          <Text marginBottom="4">
            The service fee helps Pawsup keep up with maintenance costs and make
            further investments to enhance our platform. This allows Pawsup to
            bring improvements to the app such as new features that enhance the
            usability for both service providers and pet owners.
          </Text>
        </View>
        {userInfo?.authentication_lvl === 'unverified'
          ? feeAdministration()
          : null}
      </VStack>
    </View>
  );
};

export default FeesAdministrationModal;
