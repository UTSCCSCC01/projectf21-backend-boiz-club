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
import resetPassword from '@/services/resetPassword';

const ResetPasswordScreen = ({
  navigation,
  route,
}: RootStackScreenProps<'ResetPassword'>) => {
  const { email, encryptedEmail, encrpytedOTPId } = route.params;

  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [inputError, setInputError] = useState({
    invalidPasswordError: false,
    invalidCPasswordError: false,
    invalidVerificationCodeError: false,
  });

  const [backendError, setBackendError] = useState({
    passwordLengthError: false,
    samePasswordError: false,
    invalidVerificationCodeError: false,
  });

  const validateInput = () => {
    if (newPassword === null || newPassword.length === 0) {
      setInputError({
        invalidPasswordError: true,
        invalidCPasswordError: false,
        invalidVerificationCodeError: false,
      });
      setBackendError({
        passwordLengthError: false,
        samePasswordError: false,
        invalidVerificationCodeError: false,
      });
    } else if (
      confirmPassword === null ||
      confirmPassword.length === 0 ||
      newPassword !== confirmPassword
    ) {
      setInputError({
        invalidPasswordError: false,
        invalidCPasswordError: true,
        invalidVerificationCodeError: false,
      });
      setBackendError({
        passwordLengthError: false,
        samePasswordError: false,
        invalidVerificationCodeError: false,
      });
    } else if (verificationCode === null || verificationCode.length === 0) {
      setInputError({
        invalidPasswordError: false,
        invalidCPasswordError: false,
        invalidVerificationCodeError: true,
      });
      setBackendError({
        passwordLengthError: false,
        samePasswordError: false,
        invalidVerificationCodeError: false,
      });
    } else {
      setInputError({
        invalidPasswordError: false,
        invalidCPasswordError: false,
        invalidVerificationCodeError: false,
      });
      setBackendError({
        passwordLengthError: false,
        samePasswordError: false,
        invalidVerificationCodeError: false,
      });
      return true;
    }

    return false;
  };

  const handlePress = async () => {
    if (!validateInput()) {
      return;
    }

    console.log(email);
    console.log(encryptedEmail);
    console.log(encrpytedOTPId);
    console.log(verificationCode);
    console.log(newPassword);

    await resetPassword(
      email,
      encryptedEmail,
      encrpytedOTPId,
      verificationCode,
      newPassword
    ).catch((err) => {
      if (err !== null) {
        console.log('Reset-Password Error');
      }
      return;
    });

    navigation.navigate('SignIn');
  };

  const handleResend = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <Box safeArea flex={1} p="2">
      <VStack alignItems="center" space="md">
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
          Reset Password
        </Heading>
        <VStack alignItems="center">
          <Heading size="sm" fontSize="md" fontWeight="light">
            We have sent you a verification code.
          </Heading>
          <Heading size="sm" fontSize="md" fontWeight="light">
            Please enter the code and your new password.
          </Heading>
        </VStack>
      </VStack>

      <VStack p="8" space={4}>
        <FormControl
          isInvalid={
            inputError.invalidVerificationCodeError ||
            backendError.invalidVerificationCodeError
          }
        >
          <FormControl.Label>Verification Code</FormControl.Label>
          <Input
            size="lg"
            keyboardType="default"
            autoCapitalize="none"
            placeholder="Verification Code"
            onChangeText={(text) => setVerificationCode(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Invalid Code
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={
            inputError.invalidPasswordError || backendError.samePasswordError
          }
        >
          <FormControl.Label>New Password</FormControl.Label>
          <Input
            size="lg"
            secureTextEntry={true}
            placeholder="New Password"
            onChangeText={(text) => setNewPassword(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            {inputError.invalidPasswordError
              ? 'Invalid Password'
              : backendError.samePasswordError
              ? 'You cannot use your previous password'
              : ''}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={inputError.invalidCPasswordError}>
          <FormControl.Label>Confirm Password</FormControl.Label>
          <Input
            size="lg"
            secureTextEntry={true}
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <FormControl.ErrorMessage
            _text={{ fontSize: 'sm', color: 'error.500', fontWeight: 400 }}
          >
            Invalid Entry
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          height="12"
          marginTop="0"
          color="#72BCC1"
          _text={{ color: 'white', fontSize: 18 }}
          onPress={() => handlePress()}
        >
          Change Your Password
        </Button>

        <HStack space={2} justifyContent="center">
          <Text fontSize="sm" color="muted.500">
            Haven't received code?
          </Text>
          <Link
            _text={{
              color: '#E6973F',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            onPress={() => handleResend()}
          >
            Resend
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ResetPasswordScreen;
