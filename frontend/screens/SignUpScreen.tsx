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
import signup from '@/services/signup';

const SignUpScreen = ({ navigation }: RootStackScreenProps<'SignUp'>) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;

  interface user {
    email: string;
    username: string;
    password: string;
  }

  const [userData, setUserData] = useState<user>({
    email: '',
    username: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (input: string) => {
    setUserData({
      ...userData,
      email: input,
    });
  };

  const handleUsernameChange = (input: string) => {
    setUserData({
      ...userData,
      username: input,
    });
  };

  const handlePasswordChange = (input: string) => {
    setUserData({
      ...userData,
      password: input,
    });
  };

  const handleConfirmPasswordChange = (input: string) => {
    setConfirmPassword(input);
  };

  // Input Error struct
  const [inputError, setInputError] = useState({
    emailError: false,
    usernameError: false,
    passwordError: false,
    confirmPasswordError: false,
  });

  const [backendError, setBackendError] = useState({
    existingEmailError: false,
    existingUsernameError: false,
  });

  // Function to validate user sign-up information
  const validateInput = (email: string, username: string, password: string) => {
    // Check whether email is entered and satisfies the regex.
    if (email == null || email.length === 0 || !emailRegex.test(email)) {
      setInputError({
        emailError: true,
        usernameError: false,
        passwordError: false,
        confirmPasswordError: false,
      });
      setBackendError({
        existingEmailError: false,
        existingUsernameError: false,
      });
    }

    // Check whether email is entered and satisfies the regex.
    else if (username == null || username.length === 0) {
      setInputError({
        emailError: false,
        usernameError: true,
        passwordError: false,
        confirmPasswordError: false,
      });
      setBackendError({
        existingEmailError: false,
        existingUsernameError: false,
      });
    }

    // Check whether password is entered.
    else if (password == null || password.length === 0) {
      setInputError({
        emailError: false,
        usernameError: false,
        passwordError: true,
        confirmPasswordError: false,
      });
      setBackendError({
        existingEmailError: false,
        existingUsernameError: false,
      });
    }

    // Check whether confirm password is entered and matches password.
    else if (
      confirmPassword == null ||
      confirmPassword.length === 0 ||
      confirmPassword !== password
    ) {
      setInputError({
        emailError: false,
        usernameError: false,
        passwordError: false,
        confirmPasswordError: true,
      });
      setBackendError({
        existingEmailError: false,
        existingUsernameError: false,
      });
    } else {
      setInputError({
        emailError: false,
        usernameError: false,
        passwordError: false,
        confirmPasswordError: false,
      });
      setBackendError({
        existingEmailError: false,
        existingUsernameError: false,
      });
      return true;
    }
    return false;
  };

  const signUpHandle = async (
    email: string,
    username: string,
    password: string
  ) => {
    if (!validateInput(email, username, password)) {
      return;
    }

    const userSignUp = await signup(email, username, password).catch((err) => {
      console.log('Sign Up failed.');

      let feedback = err.response.data.errors[0].param;

      if (feedback === 'email') {
        setBackendError({
          existingEmailError: true,
          existingUsernameError: false,
        });
      } else if (feedback === 'username') {
        setBackendError({
          existingEmailError: false,
          existingUsernameError: true,
        });
      }

      return null;
    });

    if (userSignUp !== null) {
      console.log('Sign Up Succeed');
      navigation.navigate('SignIn');
    }

    return;
  };

  return (
    <Box safeArea flex={1} p="2">
      <VStack alignItems="center">
        <Box w="210" h="90">
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
          Sign-Up
        </Heading>
        <Heading size="sm" fontSize="md" fontWeight="light">
          Welcome to Pawsup,
        </Heading>
        <Heading size="sm" fontSize="md" fontWeight="light">
          Enter your information to join us!
        </Heading>
      </VStack>

      <VStack paddingRight="8" paddingLeft="8" paddingTop="4" space={4}>
        <FormControl
          isInvalid={inputError.emailError || backendError.existingEmailError}
        >
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
            {inputError.emailError
              ? 'Invalid Email'
              : backendError.existingEmailError
              ? 'There is an account with this email'
              : ''}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            inputError.usernameError || backendError.existingUsernameError
          }
        >
          <FormControl.Label>Username</FormControl.Label>
          <Input
            size="lg"
            keyboardType="default"
            autoCapitalize="none"
            placeholder="Username"
            onChangeText={(text) => handleUsernameChange(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            {inputError.usernameError
              ? 'Invalid Username'
              : backendError.existingUsernameError
              ? 'Username is taken'
              : ''}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={inputError.passwordError}>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            size="lg"
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => handlePasswordChange(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Password is Required
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={inputError.confirmPasswordError}>
          <FormControl.Label>Confirm Password</FormControl.Label>
          <Input
            size="lg"
            secureTextEntry={true}
            placeholder="Confirm Password"
            onChangeText={(text) => handleConfirmPasswordChange(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Invalid Confirm password.
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          height="12"
          marginTop="0"
          color="#72BCC1"
          _text={{ color: 'white', fontSize: 18 }}
          onPress={() =>
            signUpHandle(userData.email, userData.username, userData.password)
          }
        >
          Sign Up
        </Button>
      </VStack>

      <HStack p="8" space={2} justifyContent="center">
        <Text fontSize="sm" color="muted.500">
          Already have an Account?
        </Text>
        <Link
          _text={{
            color: '#E6973F',
            fontWeight: 'medium',
            fontSize: 'sm',
          }}
          onPress={() => navigation.navigate('SignIn')}
        >
          Sign In
        </Link>
      </HStack>
    </Box>
  );
};

export default SignUpScreen;
