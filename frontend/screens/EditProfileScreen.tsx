import * as React from 'react';
import { useAppSelector } from '@/hooks/react-redux';
import { AccountStackScreenProps } from '@/types';
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
} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

interface ProfileInfo {
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  profile_pic: string;
  num_dogs: number;
  num_cats: number;
}

const EditProfileScreen = ({
  navigation,
}: AccountStackScreenProps<'EditProfileScreen'>) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const token = useAppSelector((state) => state.userCredential.userToken);
  // const [userInfo, setUserInfo] = React.useState<User | null>(null);
  const [newProfileInfo, setNewProfileInfo] = React.useState<ProfileInfo>({
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    profile_pic: '',
    num_dogs: 0,
    num_cats: 0,
  });
  const [inputError, setInputError] = React.useState(false);

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
    console.log(newProfileInfo.first_name, 'blah');
  };

  React.useEffect(() => {
    updateUserInfo();
    setIsLoading(false);
    console.log('hi');
    console.log(newProfileInfo.first_name);
  }, []);

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

  const onSaveProfile = () => {
    if (!validateInput()) {
      return;
    }
    console.log(newProfileInfo);
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
            <Select.Item label="0" value="0" />
            <Select.Item label="1" value="1" />
            <Select.Item label="2" value="2" />
            <Select.Item label="3" value="3" />
            <Select.Item label="4" value="4" />
            <Select.Item label="5" value="5" />
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
            <Select.Item label="0" value="0" />
            <Select.Item label="1" value="1" />
            <Select.Item label="2" value="2" />
            <Select.Item label="3" value="3" />
            <Select.Item label="4" value="4" />
            <Select.Item label="5" value="5" />
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
