import {
  getUserInfoByID,
  getVerificationRequests,
} from '@/services/verification';
import { AccountStackScreenProps, VerificationRequest } from '@/types';
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
  };
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector((state) => state.userCredential.userToken);

  const updateNotifications = async () => {
    setNotifications([]);
    setIsLoading(true);
    //Parse verification requests
    const parseVerificationRequests = async () => {
      const verificationRequests = await getVerificationRequests(token);
      const newNotifications: Notification[] = [];
      await Promise.all(
        verificationRequests.map((request: VerificationRequest) =>
          getUserInfoByID(request.user_id).then(({ data: user }) => {
            newNotifications.push({
              username: user.username,
              date: new Date(request.createdAt),
              description: 'Requested account verification.',
              payload: { user, request },
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
    };
    await parseVerificationRequests();
    setIsLoading(false);
  };
  useEffect(() => {
    updateNotifications();
  }, []);

  return (
    <View flex={1} alignItems="center">
      <Heading fontSize="xl" p="4" pb="3">
        Inbox
      </Heading>
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
              navigation.navigate('VerificationApprovalModal', item.payload);
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
                        {'Requested account verification.'}
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
