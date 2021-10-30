import * as React from 'react';
import { useAppSelector } from '@/hooks/react-redux';
import { AccountStackScreenProps, User } from '@/types';
import { whoAmI } from '@/services/account';
import {
  Button,
  Spinner,
  Text,
  View,
  HStack,
  VStack,
  Heading,
} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileInformationScreen = ({
  navigation,
}: AccountStackScreenProps<'ProfileInformationScreen'>) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const token = useAppSelector((state) => state.userCredential.userToken);
  const [userInfo, setUserInfo] = React.useState<User | null>(null);

  const updateUserInfo = async () => {
    setIsLoading(true);
    whoAmI(token).then((res) => {
      setUserInfo(res.data);
      setIsLoading(false);
    });
  };

  React.useEffect(() => {
    updateUserInfo();
  }, []);

  const fullName = () => {
    if (userInfo?.first_name != null && userInfo?.last_name != null) {
      return userInfo.first_name + ' ' + userInfo.last_name;
    } else if (userInfo?.first_name != null) {
      return userInfo.first_name;
    }

    return '';
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
        Profile
      </Heading>
      <VStack space={6} width="95%" alignItems="flex-start" marginBottom="15%">
        <HStack space={8} width="100%">
          <Text fontSize="lg">
            <FontAwesome5 name="user" size={26} style={{ color: '#E6973F' }} />
          </Text>
          <Text fontSize="lg">{fullName()}</Text>
        </HStack>
        <HStack space={8} width="100%">
          <Text fontSize="lg">
            <FontAwesome5
              name="phone-alt"
              size={26}
              style={{ color: '#E6973F' }}
            />
          </Text>
          <Text fontSize="lg">
            {userInfo?.phone_number != null ? userInfo.phone_number : 'N/A'}
          </Text>
        </HStack>
        <HStack space={7} width="100%">
          <Text fontSize="lg">
            <FontAwesome5
              name="house-user"
              size={26}
              style={{ color: '#E6973F' }}
            />
          </Text>
          <Text fontSize="lg">
            {userInfo?.address != null ? userInfo.address : 'N/A'}
          </Text>
        </HStack>
        <HStack space={7} width="100%">
          <Text fontSize="lg">
            <FontAwesome5 name="dog" size={26} style={{ color: '#E6973F' }} />
          </Text>
          <Text fontSize="lg">1</Text>
        </HStack>
        <HStack space={8} width="100%">
          <Text fontSize="lg">
            <FontAwesome5 name="cat" size={26} style={{ color: '#E6973F' }} />
          </Text>
          <Text fontSize="lg">2</Text>
        </HStack>
      </VStack>
      <Button
        width="90%"
        startIcon={
          <FontAwesome5 name="user-edit" size={20} style={{ color: 'white' }} />
        }
        onPress={() => navigation.navigate('EditProfileScreen')}
      >
        Edit Profile
      </Button>
    </View>
  );
};

export default ProfileInformationScreen;
