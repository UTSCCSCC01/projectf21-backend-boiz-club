import React, { useEffect, useState } from 'react';
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
import { getServiceFee, updateServiceFee } from '@/services/fees';
import { useAppSelector } from '@/hooks/react-redux';

interface Fees {
  serviceFee: number;
}

const FeesAdministrationModal = () => {
  const [currentfees, setCurrentFees] = useState<Fees>({
    serviceFee: -1,
  });
  const [fees, setFees] = useState<Fees>({
    serviceFee: -1,
  });
  const token = useAppSelector((state) => state.userCredential.userToken);

  // variables for form validation
  const [inputError, setInputError] = useState({
    serviceFeeError: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Make sure user information inputs are valid
  const validateInput = (serviceFee: number) => {
    if (isNaN(serviceFee) || serviceFee < 0 || serviceFee > 100) {
      setInputError({
        serviceFeeError: true,
      });
    } else {
      setInputError({
        serviceFeeError: false,
      });
      return true;
    }
    return false;
  };

  const handleServiceFeeChange = (input: number) => {
    setFees({
      serviceFee: input,
    });
  };

  // Set the current fees details
  const displayCurrentFeeInfo = async () => {
    try {
      const { fee } = await getServiceFee(token);
      setCurrentFees({
        serviceFee: fee,
      });
    } catch (err) {
      console.log('Unable to get service fee');
    }
  };

  useEffect(() => {
    // TODO: Get current fees and update currentFee variable
    displayCurrentFeeInfo();
    setIsLoading(false);
  }, []);

  const onPressUpdateFees = async ({ serviceFee }: Fees) => {
    setIsLoading(true);
    if (!validateInput(serviceFee)) {
      setIsLoading(false);
      return;
    }
    // TODO: send POST request to update fees
    try {
      await updateServiceFee(serviceFee, token);
      await displayCurrentFeeInfo();
      setFees({ serviceFee: -1 });
    } catch (err) {
      console.log('Failed to update service fee');
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View safeArea flex={1} alignItems="center" justifyContent="center">
        <Spinner size="lg" />
      </View>
    );
  }

  return (
    <View
      flex={1}
      alignItems="center"
      // justifyContent="center"
      backgroundColor="white"
      padding={5}
    >
      <Heading fontSize="3xl" p="4" pb="3" marginBottom={4}>
        Pawsup Fees
      </Heading>
      <VStack>
        <View marginBottom="4">
          <Text fontSize="xl" fontWeight="semibold">
            Service Fee:{'  '}
            <Text fontSize="2xl" fontWeight="bold" color="#E6973F">
              {currentfees.serviceFee}%
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
            This helps Pawsup keep up with maintenance costs and make further
            investments to enhance our platform. This allows Pawsup to bring
            improvements to the app such as new features that enhance the
            usability for both service providers and pet owners.
          </Text>
          <FormControl isInvalid={inputError.serviceFeeError}>
            <FormControl.Label>New Service Fee (%)</FormControl.Label>
            <Input
              size="lg"
              keyboardType="number-pad"
              placeholder="0-100"
              onChangeText={(text) =>
                handleServiceFeeChange(parseInt(text, 10))
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
      <Button.Group space={2}>
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
};

export default FeesAdministrationModal;
