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
import { useDispatch } from 'react-redux';
import { addToken } from '@/redux/userCredential';
import login from '@/services/login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation }: RootStackScreenProps<'SignIn'>) => {
  const dispatch = useDispatch();

  // variables for form validation
  const [inputError, setInputError] = useState({
    emailError: false,
    passwordError: false,
    invalidCredentials: false,
  });

  // Make sure user information inputs are not empty
  const validateInput = (email: string, password: string) => {
    if (email == null || email.length === 0 || ) {
      setInputError({
        emailError: true,
        passwordError: false,
        invalidCredentials: false,
      });
    } else if (password.length === 0) {
      setInputError({
        emailError: false,
        passwordError: true,
        invalidCredentials: false,
      });
    } else {
      setInputError({
        emailError: false,
        passwordError: false,
        invalidCredentials: false,
      });
      return true;
    }
    return false;
  };

  interface user {
    email: string;
    password: string;
  }

  const [userData, setUserData] = useState<user>({
    email: '',
    password: '',
  });

  const handleEmailChange = (input: string) => {
    setUserData({
      ...userData,
      email: input,
    });
  };

  const handlePasswordChange = (input: string) => {
    setUserData({
      ...userData,
      password: input,
    });
  };

  // authenticate user and retrieve user token to enter the home page
  const signInHandle = async (email: string, password: string) => {
    if (!validateInput(email, password)) {
      return;
    }
    const userToken = await login(email, password).catch((err) => {
      console.log('Sign in failed');
      if (err.response.status === 400) {
        setInputError({ ...inputError, invalidCredentials: true });
      }
      return null;
    });
    if (userToken !== null) {
      try {
        await AsyncStorage.setItem('userToken', userToken);
        dispatch(addToken({ userToken: userToken }));
      } catch (err) {
        console.log('Failed to add user token. ' + err);
      }
    }
  };

  return (
    <Box safeArea flex={1} p="2">
      <VStack alignItems="center">
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
        <Heading size="lg" fontSize="4xl">
          Login
        </Heading>
        <Heading size="sm" fontSize="md" fontWeight="light">
          Welcome back,
        </Heading>
        <Heading size="sm" fontSize="md" fontWeight="light">
          Sign in and continue to Pawsup
        </Heading>
      </VStack>
      <VStack p="8" space={4}>
        <FormControl isInvalid={inputError.emailError}>
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
            Email is required
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={inputError.passwordError || inputError.invalidCredentials}
        >
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
            {inputError.passwordError
              ? 'Password is required'
              : 'Incorrect login information'}
          </FormControl.ErrorMessage>
          <Link
            _text={{ fontSize: 'sm', fontWeight: '500', color: '#E6973F' }}
            alignSelf="flex-end"
            marginTop="1"
            onPress={() => navigation.navigate('ResetPassword')}
          >
            Forgot Password?
          </Link>
        </FormControl>
        <Button
          height="12"
          marginTop="16"
          color="#72BCC1"
          _text={{ color: 'white', fontSize: 18 }}
          onPress={() => signInHandle(userData.email, userData.password)}
        >
          Sign In
        </Button>
      </VStack>
      <HStack p="8" space={2} justifyContent="center">
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
    </Box>
  );
};

export default SignInScreen;
