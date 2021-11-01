import { useAppSelector } from '@/hooks/react-redux';
import NotificationScreen from '@/screens/NotificationScreen';
import VerificationApprovalModal from '@/screens/VerificationApprovalModal';
import VerificationUploadModal from '@/screens/VerificationUploadModal';
import FeesAdministrationModal from '@/screens/FeesAdministrationModal';
import ServiceApprovalModal from '@/screens/ServiceApprovalModal';
import { whoAmI } from '@/services/account';
import { AccountStackParamList, AccountStackScreenProps, User } from '@/types';
import { FontAwesome5 } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Avatar,
  Button,
  Center,
  Column,
  Row,
  ScrollView,
  Spinner,
  Text,
  View,
} from 'native-base';
import * as React from 'react';
import { RefreshControl } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearToken } from '@/redux/userCredential';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AccountIndexScreen({
  navigation,
}: AccountStackScreenProps<'AccountIndexScreen'>) {
  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.userCredential.userToken);
  const [isLoading, setIsLoading] = React.useState(true);
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
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      dispatch(clearToken());
    } catch (err) {
      console.log('Logout Failed');
    }
  };
  const UserDetails = () => (
    <Center padding={5}>
      <Row>
        <Column>
          <Avatar bg="lightBlue.400" size="xl" />
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
            {userInfo?.username} &nbsp;
            <FontAwesome5
              name={
                userInfo?.authentication_lvl === 'unverified'
                  ? 'times-circle'
                  : 'check-circle'
              }
              size={24}
              color={
                userInfo?.authentication_lvl === 'unverified' ? 'grey' : 'green'
              }
            />
          </Text>
          <Text fontSize="md">
            <FontAwesome5
              name="map-pin"
              color="red"
              size={20}
              style={{ padding: 10 }}
            />
            &nbsp; Toronto, Canada
          </Text>
          <Text fontSize="md">
            3 <FontAwesome5 name="dog" size={24} color="#779ecb" />
            3 <FontAwesome5 name="cat" size={24} color="#966fd6" />
          </Text>
        </Column>
      </Row>
    </Center>
  );
  const UserButtons = () => (
    <View justifyContent="center" alignItems="center" marginBottom={5}>
      <Button
        size="lg"
        key="personalInformationBtn"
        width="70%"
        style={{ justifyContent: 'flex-start' }}
        marginBottom={5}
        startIcon={
          <FontAwesome5 style={{ color: 'white' }} name="home" size={18} />
        }
      >
        Personal Information
      </Button>

      <Button
        size="lg"
        key="paymentInformationBtn"
        width="70%"
        style={{ justifyContent: 'flex-start' }}
        marginBottom={5}
        startIcon={
          <FontAwesome5
            style={{ color: 'white' }}
            name="credit-card"
            size={18}
          />
        }
      >
        Payment Information
      </Button>

      <Button
        size="lg"
        key="verifyAccountBtn"
        width="70%"
        onPress={() => navigation.navigate('VerificationUploadModal')}
        marginBottom={5}
        style={{ justifyContent: 'flex-start' }}
        startIcon={
          <FontAwesome5
            style={{ color: 'white' }}
            name="user-check"
            size={18}
          />
        }
      >
        Verify Account
      </Button>
      <Button
        size="lg"
        key="notificationsBtn"
        width="70%"
        style={{ justifyContent: 'flex-start' }}
        marginBottom={5}
        startIcon={
          <FontAwesome5 style={{ color: 'white' }} name="bell" size={18} />
        }
        onPress={() => navigation.navigate('NotificationScreen')}
      >
        Notifications
      </Button>

      <Button
        size="lg"
        key="messagesBtn"
        width="70%"
        style={{ justifyContent: 'flex-start' }}
        marginBottom={5}
        startIcon={
          <FontAwesome5 style={{ color: 'white' }} name="envelope" size={18} />
        }
      >
        Messages
      </Button>

      {userInfo?.authentication_lvl === 'admin' ? (
        <Button
          size="lg"
          key="feesBtn"
          width="70%"
          style={{ justifyContent: 'flex-start' }}
          marginBottom={5}
          startIcon={
            <FontAwesome5
              style={{ color: 'white' }}
              name="hand-holding-usd"
              size={18}
            />
          }
          onPress={() => navigation.navigate('FeesAdministrationModal')}
        >
          Fees
        </Button>
      ) : null}

      <Button
        size="lg"
        key="logOutBtn"
        width="70%"
        onPress={logout}
        style={{ justifyContent: 'flex-start' }}
        startIcon={
          <FontAwesome5
            style={{ color: 'white' }}
            name="sign-out-alt"
            size={18}
          />
        }
      >
        Log out
      </Button>
    </View>
  );

  if (isLoading) {
    return (
      <View safeArea flex={1} alignItems="center" justifyContent="center">
        <Spinner size="lg" />
      </View>
    );
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            updateUserInfo();
          }}
        />
      }
    >
      <UserDetails />
      <UserButtons />
    </ScrollView>
  );
}

const AccountStack = createNativeStackNavigator<AccountStackParamList>();
createNativeStackNavigator();
export default function Account() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="AccountIndexScreen"
        component={AccountIndexScreen}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <AccountStack.Group screenOptions={{ presentation: 'modal' }}>
        <AccountStack.Screen
          name="VerificationApprovalModal"
          component={VerificationApprovalModal}
          options={{ headerShown: false }}
        />
        <AccountStack.Screen
          name="ServiceApprovalModal"
          component={ServiceApprovalModal}
          options={{ headerShown: false }}
        />
        <AccountStack.Screen
          name="VerificationUploadModal"
          component={VerificationUploadModal}
          options={{ headerShown: false }}
        />
        <AccountStack.Screen
          name="FeesAdministrationModal"
          component={FeesAdministrationModal}
          options={{ headerShown: false }}
        />
      </AccountStack.Group>
    </AccountStack.Navigator>
  );
}
