import * as React from 'react';
import { useAppSelector } from '@/hooks/react-redux';
import { AccountStackScreenProps, User } from '@/types';
import { whoAmI } from '@/services/account';
import {
  Button,
  Input,
  Spinner,
  Text,
  View,
  HStack,
  VStack,
  Heading,
} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { width } from 'styled-system';

interface ProfileInfo {
  first_name: string | null;
  last_name: string;
  phone_number: string;
  address: string;
}

const EditProfileScreen = ({
  navigation,
}: AccountStackScreenProps<'EditProfileScreen'>) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const token = useAppSelector((state) => state.userCredential.userToken);
  const [userInfo, setUserInfo] = React.useState<User | null>(null);
  const [newProfileInfo, setNewProfileInfo] =
    React.useState<ProfileInfo | null>(null);

  const updateUserInfo = async () => {
    setIsLoading(true);
    whoAmI(token).then((res) => {
      setUserInfo(res.data);
      setIsLoading(false);
    });
  };

  React.useEffect(() => {
    updateUserInfo();
    setNewProfileInfo({ first_name: userInfo?.first_name });
  }, []);

  const onSaveProfile = () => {};

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
        <HStack space={2} width="100%" alignItems="center">
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
              userInfo?.first_name != null ? userInfo.first_name : ''
            }
          />
        </HStack>
        <HStack space={2} width="100%">
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
            defaultValue={userInfo?.last_name != null ? userInfo.last_name : ''}
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
              userInfo?.phone_number != null ? userInfo.phone_number : ''
            }
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
            defaultValue={userInfo?.address != null ? userInfo.address : ''}
          />
        </HStack>
        <HStack space={10} width="100%">
          <Text fontSize="lg">
            <FontAwesome5 name="dog" size={26} style={{ color: '#E6973F' }} />
          </Text>
          <Text fontSize="lg">1</Text>
        </HStack>
        <HStack space={10} width="100%">
          <Text fontSize="lg">
            <FontAwesome5 name="cat" size={26} style={{ color: '#E6973F' }} />
          </Text>
          <Text fontSize="lg">2</Text>
        </HStack>
      </VStack>
      <Button.Group space={2}>
        <Button
          variant="ghost"
          colorScheme="blueGray"
          disabled={isLoading}
          onPress={() => navigation.goBack()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading} width="20%">
          Save
        </Button>
      </Button.Group>
    </View>
  );
};

export default EditProfileScreen;
