import * as React from 'react';
import { useAppSelector } from '@/hooks/react-redux';
import { AccountStackScreenProps, User } from '@/types';
import { whoAmI } from '@/services/account';
import {
  Button,
  Input,
  Select,
  Spinner,
  Text,
  View,
  HStack,
  VStack,
  Heading,
  useToast,
} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { updateAccountInfo } from '@/services/account';

const EditProfileScreen = ({
  navigation,
}: AccountStackScreenProps<'EditProfileScreen'>) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const token = useAppSelector((state) => state.userCredential.userToken);
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

  // const initNewProfileInfo = () => {
  //   let firstName = userInfo?.first_name == null ? '' : userInfo.first_name;
  //   let lastName = userInfo?.last_name == null ? '' : userInfo.last_name;
  //   let phoneNumber =
  //     userInfo?.phone_number == null ? '' : userInfo.phone_number;
  //   let address = userInfo?.address == null ? '' : userInfo.address;
  //   let profilePic = userInfo?.profile_pic == null ? '' : userInfo.profile_pic;
  //   let numDogs = userInfo?.num_dogs == null ? 0 : userInfo.num_dogs;
  //   let numCats = userInfo?.num_cats == null ? 0 : userInfo.num_cats;

  //   setNewProfileInfo({
  //     first_name: firstName,
  //     last_name: lastName,
  //     phone_number: phoneNumber,
  //     address: address,
  //     profile_pic: profilePic,
  //     num_dogs: numDogs,
  //     num_cats: numCats,
  //   });
  // };

  const updateUserInfo = async () => {
    setIsLoading(true);
    const res = await whoAmI(token);
    setNewProfileInfo(res.data);
  };

  React.useEffect(() => {
    updateUserInfo();
    setIsLoading(false);
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
      <Heading size="lg" marginTop="10%" marginBottom="15%">
        Edit Profile
      </Heading>
      <VStack space={4} width="95%" alignItems="flex-start" marginBottom="15%">
        <HStack space={1} width="100%" alignItems="center">
          <Text fontSize="lg" fontWeight="thin">
            <FontAwesome5
              name="id-card-alt"
              size={26}
              style={{ color: '#E6973F' }}
            />{' '}
            first
          </Text>
          <Input
            width="80%"
            size="lg"
            defaultValue={
              newProfileInfo?.first_name != null
                ? newProfileInfo.first_name
                : ''
            }
            onChangeText={handleFirstName}
          />
        </HStack>
        <HStack space={1.5} width="100%">
          <Text fontSize="lg" fontWeight="thin">
            <FontAwesome5
              name="id-card"
              size={26}
              style={{ color: '#E6973F' }}
            />{' '}
            last
          </Text>
          <Input
            width="80%"
            size="lg"
            defaultValue={
              newProfileInfo.last_name != null ? newProfileInfo.last_name : ''
            }
            onChangeText={handleLastName}
          />
        </HStack>
        <HStack space={10} width="100%">
          <Text fontSize="lg">
            <FontAwesome5
              name="phone-alt"
              size={26}
              style={{ color: '#E6973F' }}
            />
          </Text>
          <Input
            width="80%"
            size="lg"
            keyboardType="phone-pad"
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
        <HStack space={9} width="100%">
          <Text fontSize="lg">
            <FontAwesome5
              name="house-user"
              size={26}
              style={{ color: '#E6973F' }}
            />
          </Text>
          <Input
            width="80%"
            size="lg"
            defaultValue={
              newProfileInfo.address != null ? newProfileInfo.address : ''
            }
            onChangeText={handleAddress}
          />
        </HStack>
        <HStack space={9} width="100%">
          <Text fontSize="lg">
            <FontAwesome5 name="dog" size={26} style={{ color: '#E6973F' }} />
          </Text>
          <Select
            style={{ fontSize: 15 }}
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
        <HStack space={10} width="100%">
          <Text fontSize="lg">
            <FontAwesome5 name="cat" size={26} style={{ color: '#E6973F' }} />
          </Text>
          <Select
            style={{ fontSize: 15 }}
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
