import * as React from 'react';
import { useAppSelector } from '@/hooks/react-redux';
import { AccountStackScreenProps, User } from '@/types';
import { getProfilePic, updateProfilePic, whoAmI } from '@/services/account';
import {
  Avatar,
  Column,
  Pressable,
  Row,
  Button,
  Input,
  Select,
  Spinner,
  Text,
  View,
  HStack,
  VStack,
  useToast,
} from 'native-base';
import { updateAccountInfo } from '@/services/account';
import * as DocumentPicker from 'expo-document-picker';

const EditProfileScreen = ({
  navigation,
}: AccountStackScreenProps<'EditProfileScreen'>) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const token = useAppSelector((state) => state.userCredential.userToken);
  const [profilePic, setProfilePic] = React.useState('');
  const [newProfileInfo, setNewProfileInfo] = React.useState<User>({
    _id: '',
    username: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    authentication_lvl: 'unverified',
    profile_pic: '',
    num_dogs: 0,
    num_cats: 0,
    createdAt: '',
    updatedAt: '',
  });
  const [inputError, setInputError] = React.useState(false);
  const toast = useToast();

  const updateUserInfo = async () => {
    setIsLoading(true);
    const res = await whoAmI(token);
    setNewProfileInfo(res.data);
    setProfilePic(await getProfilePic(res.data));
    setIsLoading(false);
  };

  const updateUserInfoAfterPic = async () => {
    setIsLoading(true);
    const res = await whoAmI(token);
    setNewProfileInfo({
      ...newProfileInfo,
      profile_pic: res.data.profile_pic,
    });
    setProfilePic(await getProfilePic(res.data));
    setIsLoading(false);
  };

  const pickImage = async () => {
    await DocumentPicker.getDocumentAsync({
      type: 'image/*',
    }).then(async (resp) => {
      if (resp.type === 'success') {
        await updateProfilePic(resp.uri, token);
        await updateUserInfoAfterPic();
      }
    });
  };

  React.useEffect(() => {
    updateUserInfo();
  }, []);

  const petOptions = [0, 1, 2, 3, 4, 5];

  const handleFirstName = (input: string) => {
    setNewProfileInfo({ ...newProfileInfo, first_name: input });
  };

  const handleLastName = (input: string) => {
    setNewProfileInfo({ ...newProfileInfo, last_name: input });
  };

  const handlePhoneNumber = (input: string) => {
    setNewProfileInfo({ ...newProfileInfo, phone_number: input });
  };

  const handleAddress = (input: string) => {
    setNewProfileInfo({ ...newProfileInfo, address: input });
  };

  const handleNumDogs = (input: string) => {
    setNewProfileInfo({ ...newProfileInfo, num_dogs: parseInt(input, 10) });
  };

  const handleNumCats = (input: string) => {
    setNewProfileInfo({ ...newProfileInfo, num_cats: parseInt(input, 10) });
  };

  const validateInput = () => {
    if (newProfileInfo.first_name == null || newProfileInfo.first_name == '') {
      setInputError(true);
    } else if (
      newProfileInfo.last_name == null ||
      newProfileInfo.last_name == ''
    ) {
      setInputError(true);
    } else if (
      newProfileInfo.phone_number == null ||
      newProfileInfo.phone_number == ''
    ) {
      setInputError(true);
    } else if (newProfileInfo.address == null || newProfileInfo.address == '') {
      setInputError(true);
    } else {
      setInputError(false);
      return true;
    }
    return false;
  };

  const onSaveProfile = async () => {
    setIsLoading(true);
    if (!validateInput()) {
      setIsLoading(false);
      return;
    }
    try {
      updateAccountInfo(token, newProfileInfo);
      toast.show({
        status: 'success',
        title: 'Profile Information Updated',
        placement: 'top',
      });
    } catch (err) {
      console.log('failed to update account information', err);
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
    <View flex={1} p="2" alignItems="center">
      <Row>
        <Column>
          <Avatar
            bg="lightBlue.400"
            size="xl"
            source={{
              uri: profilePic,
            }}
          />
        </Column>
      </Row>
      <Row>
        <Column alignItems="center">
          <Text
            bold
            fontSize="xl"
            alignContent="center"
            justifyContent="center"
          >
            {newProfileInfo?.username} &nbsp;
          </Text>
        </Column>
      </Row>
      <Row marginBottom="5%">
        <Pressable onPress={pickImage}>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Text underline style={{ color: 'blue' }}>
            Change Profile Photo
          </Text>
        </Pressable>
      </Row>
      <VStack
        space={2.5}
        width="95%"
        alignItems="flex-start"
        marginBottom="15%"
      >
        <HStack space={1.5} width="100%" alignItems="center">
          <Text fontSize="lg">first name</Text>
          <Input
            width="75%"
            size="lg"
            style={{ backgroundColor: 'white' }}
            defaultValue={
              newProfileInfo?.first_name != null
                ? newProfileInfo.first_name
                : ''
            }
            onChangeText={handleFirstName}
          />
        </HStack>
        <HStack space={2} width="100%" alignItems="center">
          <Text fontSize="lg">last name</Text>
          <Input
            width="75%"
            size="lg"
            style={{ backgroundColor: 'white' }}
            defaultValue={
              newProfileInfo.last_name != null ? newProfileInfo.last_name : ''
            }
            onChangeText={handleLastName}
          />
        </HStack>
        <HStack space={5} width="100%" alignItems="center">
          <Text fontSize="lg">phone #</Text>
          <Input
            width="75%"
            size="lg"
            style={{ backgroundColor: 'white' }}
            keyboardType="phone-pad"
            style={{ backgroundColor: 'white' }}
            maxLength={10}
            defaultValue={
              newProfileInfo?.phone_number != null
                ? newProfileInfo.phone_number
                : ''
            }
            onChangeText={handlePhoneNumber}
            returnKeyType="done"
          />
        </HStack>
        <HStack space={3} width="100%" alignItems="center">
          <Text fontSize="lg">address{'  '}</Text>
          <Input
            width="75%"
            size="lg"
            style={{ backgroundColor: 'white' }}
            defaultValue={
              newProfileInfo.address != null ? newProfileInfo.address : ''
            }
            onChangeText={handleAddress}
          />
        </HStack>
        <HStack space={4} width="100%" alignItems="center">
          <Text fontSize="lg"># dogs {'  '}</Text>
          <Select
            style={{ fontSize: 15, backgroundColor: 'white' }}
            minWidth="20%"
            selectedValue={newProfileInfo.num_dogs.toString(10)}
            onValueChange={(itemValue) => handleNumDogs(itemValue)}
          >
            {petOptions.map((option) => (
              <Select.Item
                key={option}
                label={option.toString()}
                value={option.toString()}
              />
            ))}
          </Select>
        </HStack>
        <HStack space={9} width="100%" alignItems="center">
          <Text fontSize="lg"># cats</Text>
          <Select
            style={{ fontSize: 15, backgroundColor: 'white' }}
            minWidth="20%"
            selectedValue={newProfileInfo.num_cats.toString(10)}
            onValueChange={(itemValue) => handleNumCats(itemValue)}
          >
            {petOptions.map((option) => (
              <Select.Item
                key={option}
                label={option.toString()}
                value={option.toString()}
              />
            ))}
          </Select>
        </HStack>
      </VStack>
      <Button.Group space={2} marginBottom="2%">
        <Button
          variant="ghost"
          colorScheme="blueGray"
          disabled={isLoading}
          onPress={() => navigation.goBack()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading} width="20%" onPress={onSaveProfile}>
          Save
        </Button>
      </Button.Group>
      {inputError ? (
        <Text color="#f53131"> {'   '}Please fill out all fields!</Text>
      ) : null}
    </View>
  );
};

export default EditProfileScreen;
