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

  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [inputError, setInputError] = useState({
    invalidPasswordError: false,
    differentPasswordsError: false,
  });

  const [backendError, setBackendError] = useState({
    samePasswordError: false,
    invalidVerificationCodeError: false,
  })

  const handlePress = (password: string, cPassword: string) => {
    if (password == null || password.length == 0){
      setInputError({
        invalidPasswordError: true,
        differentPasswordsError: false,
      })
    }

    else if (password != cPassword){
      setInputError({
        invalidPasswordError: false,
        differentPasswordsError: true,
      })
    }

    else {
      setInputError({
        invalidPasswordError: false,
        differentPasswordsError: false,
      })
      return true;
    }
    return false;
  };

  const handleResend = () => {
    // RESENDING VERIFICATION CODE FUNCTION
    // CHANGE BACKEND ERROR ACCORDINGLY
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
        <FormControl isInvalid={backendError.invalidVerificationCodeError}>
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
            Wrong Code
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={inputError.invalidPasswordError || backendError.samePasswordError}>
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
            {(inputError.invalidPasswordError) ? "Invalid Password" : (backendError.samePasswordError) ? "You cannot use your previous password" : ""}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={inputError.differentPasswordsError}>
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
            Password doesn't match
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          height="12"
          marginTop="0"
          color="#72BCC1"
          _text={{ color: 'white', fontSize: 18 }}
          onPress={() => handlePress(newPassword, confirmPassword)}
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

export default ForgotPasswordScreen;