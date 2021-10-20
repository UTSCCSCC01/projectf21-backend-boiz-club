import {
  getUserInfoByID,
  getAccountVerificationRequests,
  getServiceVerificationRequests,
  getServiceInfoByID,
} from '@/services/verification';
import {
  AccountStackScreenProps,
  AccountVerificationRequest,
  ServiceVerificationRequest,
  User,
} from '@/types';
import {
  Avatar,
  Box,
  FlatList,
  Heading,
  HStack,
  Pressable,
  Spacer,
  Text,
  View,
  VStack,
  Center,
  ScrollView,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useAppSelector } from '@/hooks/react-redux';

export const NotificationScreen = ({
  navigation,
}: AccountStackScreenProps<'NotificationScreen'>) => {
  type Notification = {
    username: string;
    date: Date;
    description: string;
    payload: any;
    type: 'AccountVerificationRequest' | 'ServiceVerificationRequest';
  };

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.userCredential.userToken);

  const updateNotifications = async () => {
    setNotifications([]);
    setIsLoading(true);
    //Parse account verification requests
    const parseAccountVerificationRequests = async () => {
      try {
        const verificationRequests = await getAccountVerificationRequests(
          token
        );
        const newNotifications: Notification[] = [];
        await Promise.all(
          verificationRequests.map((request: AccountVerificationRequest) =>
            getUserInfoByID(request.user_id).then((user: User) => {
              newNotifications.push({
                username: user.username,
                date: new Date(request.createdAt),
                description: 'Requested account verification.',
                payload: { user, request },
                type: 'AccountVerificationRequest',
              });
            })
          )
        );
        setNotifications((prevNotifications) => {
          return [...prevNotifications, ...newNotifications].sort(
            (a: Notification, b: Notification) =>
              b.date.getTime() - a.date.getTime()
          );
        });
      } catch (err) {
        console.log(err);
      }
    };
    //Parse services verification requests
    const parseServiceVerificationRequests = async () => {
      try {
        const serviceVerificationRequests =
          await getServiceVerificationRequests(token);
        const newNotifications: Notification[] = [];
        await Promise.all(
          serviceVerificationRequests.map(
            (request: ServiceVerificationRequest) =>
              (async () => {
                const service = await getServiceInfoByID(request.service_id);
                const user = await getUserInfoByID(service.user_id);
                newNotifications.push({
                  username: user.username,
                  date: new Date(request.createdAt),
                  description: 'Requested service approval.',
                  payload: { user, request, service },
                  type: 'ServiceVerificationRequest',
                });
              })()
          )
        );
        setNotifications((prevNotifications) => {
          return [...prevNotifications, ...newNotifications].sort(
            (a: Notification, b: Notification) =>
              b.date.getTime() - a.date.getTime()
          );
        });
      } catch (err) {
        console.log(err);
      }
    };
    await Promise.all([
      parseAccountVerificationRequests(),
      parseServiceVerificationRequests(),
    ]);
    setIsLoading(false);
  };
  useEffect(() => {
    updateNotifications();
  }, []);

  return (
    <View flex={1} alignItems="center">
      <Heading fontSize="md" p="5">
        Notifications
      </Heading>
      {notifications.length === 0 && !isLoading && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                updateNotifications();
              }}
            />
          }
        >
          <Center p={5}>
            <Text>No notifications found. Pull down to refresh.</Text>
          </Center>
        </ScrollView>
      )}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              updateNotifications();
            }}
          />
        }
        maxWidth="100%"
        data={notifications}
        renderItem={({ item }: { item: Notification }) => (
          <Pressable
            onPress={() => {
              switch (item.type) {
                case 'ServiceVerificationRequest': {
                  navigation.navigate('ServiceApprovalModal', item.payload);
                  break;
                }
                case 'AccountVerificationRequest': {
                  navigation.navigate(
                    'VerificationApprovalModal',
                    item.payload
                  );
                  break;
                }
              }
            }}
          >
            {({ isPressed }) => {
              return (
                <Box
                  p="5"
                  rounded="8"
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: 'gray.600',
                  }}
                  borderColor="coolGray.200"
                  pl="4"
                  pr="5"
                  py="2"
                >
                  <HStack space={3} justifyContent="space-between">
                    <Avatar
                      size="48px"
                      // source={{
                      //   uri: '',
                      // }}
                    />
                    <VStack maxWidth="60%">
                      <Text
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        bold
                      >
                        {item.username}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: 'warmGray.200',
                        }}
                      >
                        {item.description}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Text
                      fontSize="xs"
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      alignSelf="flex-start"
                    >
                      {item.date.toLocaleDateString()}
                    </Text>
                  </HStack>
                </Box>
              );
            }}
          </Pressable>
        )}
        keyExtractor={(item) => item.date.toString()}
      />
    </View>
  );
};

export default NotificationScreen;
