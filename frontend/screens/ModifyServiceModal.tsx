import React, { useState } from 'react';
import {
  Button,
  VStack,
  Box,
  FormControl,
  Input,
  Heading,
  Slider,
  HStack,
  useToast,
} from 'native-base';
import { ServiceStackScreenProps } from '@/types';
import modifyService from '@/services/modifyService';
import { useAppSelector } from '@/hooks/react-redux';

export default function ModifyServiceModal({
  navigation,
  route,
}: ServiceStackScreenProps<'ModifyServiceModal'>) {
  const toast = useToast();
  const token = useAppSelector((state) => state.userCredential.userToken);
  const { service } = route.params;
  const [sliderMoney, setSliderMoney] = useState(
    Math.floor(service.service_price ? service.service_price : 0)
  );
  const maxMoney = 100;
  const minMoney = 0;

  interface serviceDescription {
    name: string;
    description: string;
    contactNumber: string;
    price: number;
  }

  const [serviceData, setServiceData] = useState<serviceDescription>({
    name: service.service_name ? service.service_name : '',
    description: service.service_description ? service.service_description : '',
    contactNumber: service.contact_number ? service.contact_number : '',
    price: service.service_price ? service.service_price : 0,
  });

  const handleNameChange = (input: string) => {
    setServiceData({
      ...serviceData,
      name: input,
    });
  };

  const handleDescriptionChange = (input: string) => {
    setServiceData({
      ...serviceData,
      description: input,
    });
  };

  const handleContactNumberChange = (input: string) => {
    setServiceData({
      ...serviceData,
      contactNumber: input,
    });
  };

  const handlePriceChange = (input: number) => {
    setServiceData({
      ...serviceData,
      price: input,
    });
  };

  const [inputError, setInputError] = useState({
    nameError: false,
    descriptionError: false,
    contactNumberError: false,
  });

  const validateInput = (
    name: string,
    description: string,
    contactNumber: string
  ) => {
    // Check whether service name is entered.
    if (name == null || name.length === 0) {
      setInputError({
        nameError: true,
        descriptionError: false,
        contactNumberError: false,
      });
    }

    // Check whether service description is entered.
    else if (description == null || description.length === 0) {
      setInputError({
        nameError: false,
        descriptionError: true,
        contactNumberError: false,
      });
    }

    // Check whether service contact number is entered.
    else if (contactNumber == null || contactNumber.length === 0) {
      setInputError({
        nameError: false,
        descriptionError: false,
        contactNumberError: true,
      });
    } else {
      setInputError({
        nameError: false,
        descriptionError: false,
        contactNumberError: false,
      });
      return true;
    }
    return false;
  };

  const modifyServiceHandle = async (
    serviceId: string,
    name: string,
    description: string,
    price: number,
    contactNumber: string
  ) => {
    if (!validateInput(name, description, contactNumber)) {
      return;
    }

    console.log(serviceId);
    console.log(name);
    console.log(description);
    console.log(String(price));
    console.log(contactNumber);
    console.log(token);

    const serviceModification = await modifyService(
      serviceId,
      name,
      description,
      String(price),
      contactNumber,
      token
    ).catch((err) => {
      let feedback = err.response.status;

      if (feedback === 400 || feedback === 500) {
        toast.show({
          status: 'error',
          title: 'Error occured, please try again later.',
          placement: 'top',
        });
        navigation.navigate('ServiceIndexScreen');
      }

      return null;
    });

    if (serviceModification != null) {
      toast.show({
        status: 'success',
        title: 'Service modification request has been sent.',
        placement: 'top',
      });
      navigation.navigate('ServiceIndexScreen');
    }

    return;
  };

  return (
    <Box safeArea flex={1} paddingTop="5" paddingX="10">
      <VStack space={3} alignItems={'center'}>
        <Heading fontSize="xl" pb="3">
          Modify Service
        </Heading>
        <Heading fontSize="sm" fontWeight="light">
          Modify your service description here.
        </Heading>

        <FormControl isInvalid={inputError.nameError}>
          <FormControl.Label>Name</FormControl.Label>
          <Input
            size="lg"
            placeholder="Service Name"
            value={serviceData.name ? serviceData.name : ''}
            onChangeText={(text: string) => handleNameChange(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Please enter service name.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={inputError.descriptionError}>
          <FormControl.Label>Description</FormControl.Label>
          <Input
            size="lg"
            placeholder="Description"
            value={serviceData.description ? serviceData.description : ''}
            onChangeText={(text: string) => handleDescriptionChange(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Please enter description.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={inputError.contactNumberError}>
          <FormControl.Label>Contact Number</FormControl.Label>
          <Input
            size="lg"
            value={serviceData.contactNumber ? serviceData.contactNumber : ''}
            keyboardType="phone-pad"
            placeholder="Contact Number"
            onChangeText={(text: string) => handleContactNumberChange(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Please enter a contact number.
          </FormControl.ErrorMessage>
        </FormControl>

        <Box w="100%">
          <Heading fontSize="sm" fontWeight="semibold">
            {' '}
            Service Price ($CAD/day){' '}
          </Heading>
        </Box>
        <Box w="100%">
          <HStack
            justifyContent="space-between"
            alignItems="flex-end"
            width="100%"
          >
            <Heading fontSize="xs" fontWeight="light">
              {' '}
              {minMoney}{' '}
            </Heading>
            <Heading> {sliderMoney} </Heading>
            <Heading fontSize="xs" fontWeight="light">
              {' '}
              {maxMoney}{' '}
            </Heading>
          </HStack>

          <Box w="100%">
            <Slider
              defaultValue={sliderMoney ? sliderMoney : 0}
              minValue={minMoney}
              maxValue={maxMoney}
              accessibilityLabel="Price"
              step={1}
              onChange={(price) => {
                setSliderMoney(Math.floor(price));
              }}
              onChangeEnd={(price) => {
                handlePriceChange(Math.floor(price));
              }}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
          </Box>
        </Box>

        <Button
          size="lg"
          key="proceedContanctButton"
          width="100%"
          onPress={() => {
            modifyServiceHandle(
              service._id,
              serviceData.name,
              serviceData.description,
              serviceData.price,
              serviceData.contactNumber
            );
          }}
          justifyContent="center"
        >
          Modify
        </Button>

        <Button
          size="lg"
          key="cancelModifyButton"
          width="100%"
          onPress={() => {
            navigation.pop();
            navigation.navigate('ServiceDetailModal', {
              service: service,
              belongsToThisUser: true,
            });
          }}
          justifyContent="center"
        >
          Cancel
        </Button>
      </VStack>
    </Box>
  );
}
