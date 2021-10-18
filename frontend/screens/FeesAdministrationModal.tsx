import React, { useEffect, useState } from 'react';
import { AccountStackScreenProps } from '@/types';
import {
  Button,
  FormControl,
  Heading,
  Input,
  Text,
  View,
  VStack,
} from 'native-base';

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

  useEffect(() => {
    // TODO: Get current fees and update currentFee variable
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

  const onPressCancel = () => {
    navigation.goBack();
  };

  return (
    <View
      flex={1}
      alignItems="center"
      // justifyContent="center"
      backgroundColor="white"
      padding={5}
    >
      <Heading fontSize="sm" p="4" pb="3">
        Fees & Administration
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
          <Text marginBottom="2">
            The percentage cut of revenue Pawsup takes from a purchase of a
            service for the maintenance and usage of the platform to advertise
            services
          </Text>
          <FormControl isInvalid={inputError.serviceProviderFeeError}>
            <FormControl.Label>New Service Provider Fee (%)</FormControl.Label>
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
        </View>
      </VStack>
      <Button.Group space={2} marginTop={5}>
        <Button
          variant="ghost"
          colorScheme="blueGray"
          disabled={isLoading}
          onPress={onPressCancel}
        >
          Cancel
        </Button>
        <Button disabled={isLoading} onPress={() => onPressUpdateFees(fees)}>
          Update
        </Button>
      </Button.Group>
    </View>
  );
};

export default FeesAdministrationModal;
