import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Image,
  FormControl,
  Input,
  Link,
  Text,
  HStack,
  VStack,
} from 'native-base';
import { RootStackScreenProps } from '@/types';

const ForgotPasswordScreen = ({ navigation }: RootStackScreenProps<'ForgotPassword'>) => {

    const [email, setEmail] = useState('');

    const [emailError, setEmailError] = useState({
        wrongFormatError: false,
        noMatchingEmailError: false,
    });

    const handleEmailChange = (input: string) => {
        setEmail(input);
    };

    const handleRequest = () => {};

  return (
    <Box safeArea flex={1} p="2">
      <VStack alignItems="center" space="md">
        <Box w="350" h="150">
          <Image
            flex={1}
            source={require('@/assets/images/pawsup-logo.png')}
            alt="Hello"
            width={undefined}
            height={undefined}
            resizeMode="contain"
          />
        </Box>
        
        <Heading size="lg" fontSize="3xl">
          Trouble Logging In?
        </Heading>
        <VStack alignItems="center">
            <Heading size="sm" fontSize="md" fontWeight="light">
                Enter your email below and we will
            </Heading>
            <Heading size="sm" fontSize="md" fontWeight="light">
                send you a code to change your password.
            </Heading>
        </VStack>
      </VStack>

      <VStack p="8" space={4}>
        <FormControl isInvalid={emailError.wrongFormatError || emailError.noMatchingEmailError}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            size="lg"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={(text) => handleEmailChange(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            {(emailError.wrongFormatError) ? "Email is in wrong format" : (emailError.noMatchingEmailError) ? "No matching email" : ""}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          height="12"
          marginTop="0"
          color="#72BCC1"
          _text={{ color: 'white', fontSize: 18 }}
          onPress={() => handleRequest()}
        >
          Request Password Change
        </Button>

        <VStack>
            <HStack space={2} justifyContent="center">
                <Text fontSize="sm" color="muted.500">
                Don't have an account?
                </Text>
                <Link
                    _text={{
                        color: '#E6973F',
                        fontWeight: 'medium',
                        fontSize: 'sm',
                    }}
                    onPress={() => navigation.navigate('SignUp')}
                >
                Create Account
                </Link>
            </HStack>
        
            <HStack space={2} justifyContent="center">
                <Text fontSize="sm" color="muted.500">
                    Know your password?
                </Text>
                <Link
                    _text={{
                        color: '#E6973F',
                        fontWeight: 'medium',
                        fontSize: 'sm',
                    }}
                    onPress={() => navigation.navigate('SignIn')}
                    >
                    Login
                </Link>
            </HStack>
        </VStack>
        
        
      </VStack>
    </Box>
  );
};

export default ForgotPasswordScreen;