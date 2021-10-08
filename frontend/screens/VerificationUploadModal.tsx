import { useAppSelector } from '@/hooks/react-redux';
import requestVerification from '@/services/upload';
import { AccountStackScreenProps } from '@/types';
import * as DocumentPicker from 'expo-document-picker';
import {
  Button,
  Center,
  Column,
  Text,
  useToast,
  View,
  Heading,
} from 'native-base';
import React, { useEffect, useState } from 'react';
const VerificationUploadModal = ({
  navigation,
}: AccountStackScreenProps<'VerificationUploadModal'>) => {
  const [filename, setFilename] = useState('');
  const [fileURI, setFileURI] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const token = useAppSelector((state) => state.userCredential.userToken);
  const toast = useToast();

  const pickDocument = async () => {
    await DocumentPicker.getDocumentAsync({
      type: 'image/*',
    }).then((resp) => {
      setFilename(resp.type === 'success' ? resp.name : '');
      setFileURI(resp.type === 'success' ? resp.uri : '');
    });
  };

  useEffect(() => {
    setFilename('');
    setFileURI('');
  }, []);

  const onPressSaveId = async () => {
    if (filename !== '') {
      setIsLoading(true);
      await requestVerification(fileURI, token)
        .catch((err) => {
          toast.show({
            status: 'error',
            title: err.body,
            placement: 'top',
          });
        })
        .then((resp) => {
          if (resp.status === 200) {
            toast.show({
              status: 'success',
              title: 'Verification request has been sent.',
              placement: 'top',
            });
          } else {
            toast.show({
              status: 'error',
              title: JSON.parse(resp?.body).message,
              placement: 'top',
            });
          }
        });
    }
    setIsLoading(false);
    navigation.goBack();
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
        Account Verification Request
      </Heading>
      <Column space={3} marginTop={5}>
        <Text>
          Upload any legal canadian government issued identification like a
          passport, driving license, or health card.
        </Text>
        <Text bold>
          Note: All data is encrypted and your images will be stored safely and
          in accordance with security standards.
        </Text>
        <Button isLoading={isLoading} onPress={pickDocument}>
          {filename === '' ? 'Upload File' : filename}
        </Button>
      </Column>
      <Button.Group space={2} marginTop={5}>
        <Button
          variant="ghost"
          colorScheme="blueGray"
          disabled={isLoading}
          onPress={onPressCancel}
        >
          Cancel
        </Button>
        <Button disabled={isLoading} onPress={onPressSaveId}>
          Save
        </Button>
      </Button.Group>
    </View>
  );
};
export default VerificationUploadModal;
