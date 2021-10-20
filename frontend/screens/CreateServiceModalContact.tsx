import React, { useState } from 'react';
import {
  Button,
  HStack,
  VStack,
  Box,
  FormControl,
  Input,
  Heading,
  Alert,
  IconButton,
  CloseIcon,
} from 'native-base';
import { ServiceStackScreenProps } from '@/types';
import createService from '@/services/createService';

export default function CreateServiceModalContact({
  navigation,
  route,
}: ServiceStackScreenProps<'CreateServiceModalContact'>) {
  const { serviceName, serviceDescription, servicePrice } = route.params;
  interface service {
    contactNumber: string;
    country: string;
    city: string;
    postalCode: string;
    address: string;
  }

  const [serviceData, setServiceData] = useState<service>({
    contactNumber: '',
    country: 'Canada',
    city: '',
    postalCode: '',
    address: '',
  });

  const handleContactNumberChange = (input: string) => {
    setServiceData({
      ...serviceData,
      contactNumber: input,
    });
  };

  const handleCountryChange = (input: string) => {
    setServiceData({
      ...serviceData,
      country: input,
    });
  };

  const handleCityChange = (input: string) => {
    setServiceData({
      ...serviceData,
      city: input,
    });
  };

  const handlePostalCodeChange = (input: string) => {
    setServiceData({
      ...serviceData,
      postalCode: input,
    });
  };

  const handleAddressChange = (input: string) => {
    setServiceData({
      ...serviceData,
      address: input,
    });
  };

  const [inputError, setInputError] = useState({
    contactNumberError: false,
    countryError: false,
    cityError: false,
    postalCodeError: false,
    addressError: false,
  });

  const validateInput = (
    contactNumber: string,
    country: string,
    city: string,
    postalCode: string,
    address: string
  ) => {
    if (contactNumber == null || contactNumber.length === 0) {
      setInputError({
        contactNumberError: true,
        countryError: false,
        cityError: false,
        postalCodeError: false,
        addressError: false,
      });
    } else if (country == null || country.length === 0) {
      setInputError({
        contactNumberError: false,
        countryError: true,
        cityError: false,
        postalCodeError: false,
        addressError: false,
      });
    } else if (city == null || city.length === 0) {
      setInputError({
        contactNumberError: false,
        countryError: false,
        cityError: true,
        postalCodeError: false,
        addressError: false,
      });
    } else if (postalCode == null || postalCode.length === 0) {
      setInputError({
        contactNumberError: false,
        countryError: false,
        cityError: false,
        postalCodeError: true,
        addressError: false,
      });
    } else if (address == null || address.length === 0) {
      setInputError({
        contactNumberError: false,
        countryError: false,
        cityError: false,
        postalCodeError: false,
        addressError: true,
      });
    } else {
      setInputError({
        contactNumberError: false,
        countryError: false,
        cityError: false,
        postalCodeError: false,
        addressError: false,
      });
      return true;
    }
    return false;
  };

  const createServiceHandle = async (
    contactNumber: string,
    country: string,
    city: string,
    postalCode: string,
    address: string
  ) => {
    if (!validateInput(contactNumber, country, city, postalCode, address)) {
      return;
    }

    const serviceCreation = createService(
      serviceName,
      serviceDescription,
      servicePrice,
      contactNumber,
      country,
      city,
      postalCode,
      address
    ).catch((err) => {
      console.log('Failed to Create Service');

      // let feedback = err.response.data.errors[0].param;

      // Change this to extensively handle each type of error.
      console.log(err);

      // Return this if error is not on user side.
      //   return (
      //     <Alert w="100%" status="error">
      //       <VStack space={2} flexShrink={1} w="100%">
      //         <HStack flexShrink={1} space={2} justifyContent="space-between">
      //           <HStack space={2} flexShrink={1}>
      //             <Alert.Icon mt="1" />
      //             <Heading fontSize="md" color="coolGray.800">
      //               Request for services failed.
      //             </Heading>
      //           </HStack>
      //           <IconButton
      //             variant="unstyled"
      //             icon={<CloseIcon size="3" color="coolGray.600" />}
      //             onPress={() => {
      //               navigation.navigate('ServiceIndexScreen');
      //             }}
      //           />
      //         </HStack>
      //       </VStack>
      //     </Alert>
      //   );

      // Remove this return when backend connection and error handling are fully functional.
      return (
        <Alert w="100%" status="success">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Heading fontSize="md" color="coolGray.800">
                  Your request for creating service has been sent.
                </Heading>
              </HStack>
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" color="coolGray.600" />}
                onPress={() => {
                  navigation.navigate('ServiceIndexScreen');
                }}
              />
            </HStack>
          </VStack>
        </Alert>
      );
    });

    if (serviceCreation !== null) {
      return (
        <Alert w="100%" status="success">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Heading fontSize="md" color="coolGray.800">
                  Your request for creating service has been sent.
                </Heading>
              </HStack>
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" color="coolGray.600" />}
                onPress={() => {
                  navigation.navigate('ServiceIndexScreen');
                }}
              />
            </HStack>
          </VStack>
        </Alert>
      );
    }

    return;
  };

  return (
    <Box safeArea flex={1} paddingTop="5" paddingX="10">
      <VStack space={3} alignItems={'center'}>
        <Heading fontSize="xl" pb="3">
          Create Service
        </Heading>
        <Box alignItems="center">
          <Heading fontSize="sm" fontWeight="light">
            Enter your contact information here.
          </Heading>
        </Box>

        <FormControl isInvalid={inputError.contactNumberError}>
          <Input
            size="lg"
            keyboardType="phone-pad"
            placeholder="Contact Number"
            onChangeText={(text) => handleContactNumberChange(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Please enter a contact number.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={inputError.countryError} isDisabled mb="0">
          <Input
            backgroundColor="gray.200"
            size="lg"
            keyboardType="default"
            placeholder="Canada" // Change this to 'Country', if the system supports.
            onChangeText={(text) => handleCountryChange(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Please enter a country.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={inputError.cityError}>
          <Input
            size="lg"
            keyboardType="default"
            placeholder="City"
            onChangeText={(text) => handleCityChange(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Please enter a city.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={inputError.postalCodeError}>
          <Input
            size="lg"
            keyboardType="numeric"
            placeholder="Postal Code"
            onChangeText={(text) => handlePostalCodeChange(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Please enter a postal code.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={inputError.addressError}>
          <Input
            size="lg"
            placeholder="Address"
            onChangeText={(text) => handleAddressChange(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Please enter an address.
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          size="lg"
          key="createServiceButton"
          width="100%"
          onPress={() =>
            createServiceHandle(
              serviceData.contactNumber,
              serviceData.country,
              serviceData.city,
              serviceData.postalCode,
              serviceData.address
            )
          }
          justifyContent="center"
        >
          Create
        </Button>

        <Button
          size="lg"
          key="cancelCreateButton"
          width="100%"
          onPress={() => navigation.navigate('ServiceIndexScreen')}
          justifyContent="center"
        >
          Cancel
        </Button>
      </VStack>
    </Box>
  );
}
