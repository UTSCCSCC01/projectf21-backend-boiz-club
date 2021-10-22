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
} from 'native-base';
import { ServiceStackScreenProps } from '@/types';

export default function CreateServiceModalDesciption({
  navigation,
}: ServiceStackScreenProps<'CreateServiceModalDescription'>) {
  const [sliderMoney, setSliderMoney] = useState(20);
  const maxMoney = 100;
  const minMoney = 0;

  interface service {
    name: string;
    description: string;
    price: number;
  }

  const [serviceData, setServiceData] = useState<service>({
    name: '',
    description: '',
    price: 20,
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

  const handlePriceChange = (input: number) => {
    setServiceData({
      ...serviceData,
      price: input,
    });
  };

  const [inputError, setInputError] = useState({
    nameError: false,
    descriptionError: false,
  });

  const validateInput = (name: string, description: string) => {
    // Check whether service name is entered.
    if (name == null || name.length === 0) {
      setInputError({
        nameError: true,
        descriptionError: false,
      });
    }

    // Check whether service description is entered.
    else if (description == null || description.length === 0) {
      setInputError({
        nameError: false,
        descriptionError: true,
      });
    } else {
      setInputError({
        nameError: false,
        descriptionError: false,
      });
      return true;
    }
    return false;
  };

  const proceedContact = async (
    name: string,
    description: string,
    price: number
  ) => {
    if (!validateInput(name, description)) {
      return;
    }
    navigation.navigate('CreateServiceModalContact', {
      serviceName: name,
      serviceDescription: description,
      servicePrice: String(price),
    });
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
            Enter your service description here.
          </Heading>
        </Box>

        <FormControl isInvalid={inputError.nameError}>
          <Input
            size="lg"
            autoCapitalize="none"
            placeholder="Service Name"
            onChangeText={(text) => handleNameChange(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Please enter service name.
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={inputError.descriptionError}>
          <Input
            size="lg"
            placeholder="Description"
            onChangeText={(text) => handleDescriptionChange(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Please enter description.
          </FormControl.ErrorMessage>
        </FormControl>

        <Box w="100%">
          <Heading fontSize="xs" fontWeight="medium">
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
              defaultValue={20}
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
          onPress={() =>
            proceedContact(
              serviceData.name,
              serviceData.description,
              serviceData.price
            )
          }
          justifyContent="center"
        >
          Continue
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
