import React, { type ReactElement, useCallback, useMemo, useRef } from 'react';

import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';

import { ChannelRepository } from '@amityco/ts-sdk-react-native';
import ChatList, {
  type IChatListProps,
  type IGroupChatObject,
} from '../../../components/ChatList/index';
import useAuth from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import moment from 'moment';

import { useStyles } from './styles';
import CustomText from '../../../components/CustomText';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LoadingIndicator from '../../../components/LoadingIndicator/index';
import AddMembersModal from '../../components/AddMembersModal';
import type { UserInterface } from '../../../types/user.interface';
import { createAmityChannel } from '../../../providers/channel-provider';
import { AddChatIcon } from '../../../svg/AddChat';
import { ChatEmptyIcon } from '../../../svg/ChatEmptyIcon';
import { useTheme } from 'react-native-paper';
import type { MyMD3Theme } from '../../../providers/amity-ui-kit-provider';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import recentChatSlice from '../../../redux/slices/RecentChatSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecentChat() {
  const { client, isConnected, error: loginError, sessionState } = useAuth();
  const { channelList } = useSelector((state: RootState) => state.recentChat);

  const individualChannelList = channelList?.filter(
    (item) => item?.channelType !== 'community'
  );
  const communityChannelList = channelList?.filter(
    (item) => item?.channelType === 'community'
  );

  const { updateRecentChat, clearChannelList } = recentChatSlice.actions;
  const dispatch = useDispatch();

  const theme = useTheme() as MyMD3Theme;
  const [loadChannel, setLoadChannel] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const styles = useStyles();

  const [channelData, setChannelData] =
    useState<Amity.LiveCollection<Amity.Channel>>();

  const { data: channels = [], onNextPage, hasNextPage } = channelData ?? {};

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedTab, setSelectedTab] = useState('individual');

  useEffect(() => {
    if (sessionState === 'terminated') {
      setChannelData(undefined);
    }

    if (loginError) {
      setLoadChannel(false);
    }
  }, [sessionState, loginError]);

  useFocusEffect(
    useCallback(() => {
      let unsubscribe;

      const fetchChannels = async () => {
        try {
          if (isConnected) {
            unsubscribe = ChannelRepository.getChannels(
              { sortBy: 'lastActivity', limit: 40, membership: 'member' },
              (value) => {
                setChannelData(value);
                if (!value.loading) {
                  setLoadChannel(false);
                }
              }
            );
          }
        } catch (error) {
          console.log('Error fetching channels:', error);
        }
      };

      fetchChannels();

      // Cleanup on screen unfocus or component unmount
      return () => {
        unsubscribe?.();
      };
    }, [isConnected, channelList]) // Re-fetch when screen is focused or `isConnected` changes
  );

  const formatChat = () => {
    const formattedChannelObjects: IChatListProps[] = channels.map(
      (item: Amity.Channel<any>) => {
        const lastActivityDate: string = moment(item.lastActivity).format(
          'DD/MM/YYYY'
        );
        const todayDate = moment(Date.now()).format('DD/MM/YYYY');
        let dateDisplay;
        if (lastActivityDate === todayDate) {
          dateDisplay = moment(item.lastActivity).format('hh:mm A');
        } else {
          dateDisplay = moment(item.lastActivity).format('DD/MM/YYYY');
        }

        let lastMessage = '';

        const sendByCurrentUser =
          client?.userId === item?.messagePreview?.user?.userPublicId;

        switch (item?.messagePreview?.dataType) {
          case 'text':
            lastMessage = sendByCurrentUser
              ? `You: ${item?.messagePreview?.data?.text}`
              : item?.messagePreview?.data?.text;
            break;
          case 'image':
            lastMessage = sendByCurrentUser
              ? 'You sent a photo'
              : 'You recived a photo';
            break;
          case 'file':
            lastMessage = 'file';
            break;
        }
        return {
          chatId: item.channelId ?? '',
          chatName: item.displayName ?? '',
          chatMemberNumber: item.memberCount ?? 0,
          unReadMessage: item.unreadCount ?? 0,
          messageDate: dateDisplay ?? '',
          channelType: item.type ?? '',
          avatarFileId: item.avatarFileId,
          lastMessage: lastMessage,
        };
      }
    );
    return formattedChannelObjects;
  };

  useEffect(() => {
    if (channels.length > 0) {
      const formattedChannelObjects: IChatListProps[] = formatChat();
      dispatch(clearChannelList());
      dispatch(updateRecentChat(formattedChannelObjects));
    }
  }, [channels]);

  const handleLoadMore = () => {
    if (hasNextPage && onNextPage) {
      onNextPage();
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOnFinish = async (users: UserInterface[]) => {
    const channel = await createAmityChannel(
      (client as Amity.Client).userId as string,
      users
    );
    if (channel) {
      try {
        if (users.length === 1 && users[0]) {
          const oneOnOneChatObject: UserInterface = {
            userId: users[0].userId,
            displayName: users[0].displayName as string,
            avatarFileId: users[0].avatarFileId as string,
          };

          navigation.navigate('ChatRoom', {
            channelId: channel.channelId,
            chatReceiver: oneOnOneChatObject,
          });
        } else if (users.length > 1) {
          const chatDisplayName = users.map((item) => item.displayName);
          const userObject = users.map((item: UserInterface) => {
            return {
              userId: item.userId,
              displayName: item.displayName,
              avatarFileId: item.avatarFileId,
            };
          });
          const groupChatObject: IGroupChatObject = {
            displayName: chatDisplayName.join(','),
            users: userObject,
            memberCount: channel.memberCount as number,
            avatarFileId: channel.avatarFileId,
          };

          navigation.navigate('ChatRoom', {
            channelId: channel.channelId,
            groupChat: groupChatObject,
          });
        }

        console.log('create chat success ' + JSON.stringify(channel));
      } catch (error) {
        console.log('create chat error ' + JSON.stringify(error));
        console.error(error);
      }
    }
  };

  const renderRecentChat = useMemo(() => {
    return loadChannel ? (
      <View style={{ marginTop: 20 }}>
        <LoadingIndicator color="#704AD1" />
      </View>
    ) : channelList.length === 0 ? (
      <View style={styles.chatListEmptyState}>
        <ChatEmptyIcon color={theme.colors.baseShade3} />
        <Text style={styles.chatListEmptyText}>No conversations</Text>
      </View>
    ) : (
      <View style={styles.chatListContainer}>
        <FlatList
          data={
            selectedTab === 'individual'
              ? individualChannelList
              : communityChannelList
          }
          renderItem={({ item }) => renderChatList(item)}
          keyExtractor={(item) => item.chatId.toString() + item?.avatarFileId}
          // onEndReached={handleLoadMore}
          // onEndReachedThreshold={0.4}
          // extraData={channelList}
          style={{ paddingBottom: 56 }}
        />
      </View>
    );
  }, [loadChannel, channelList, handleLoadMore, selectedTab]);

  const renderChatList = (item: IChatListProps): ReactElement => {
    return (
      <ChatList
        key={item.chatId}
        chatId={item.chatId}
        chatName={item.chatName}
        chatMemberNumber={item.chatMemberNumber}
        unReadMessage={item.unReadMessage}
        messageDate={item.messageDate}
        channelType={item.channelType}
        avatarFileId={item.avatarFileId}
        lastMessage={item?.lastMessage}
      />
    );
  };

  const renderTabView = (): ReactElement => {
    return (
      <View style={styles.tabView}>
        <Pressable
          onPress={() => setSelectedTab('individual')}
          style={
            selectedTab === 'individual'
              ? styles.selectedIndicator
              : styles.unSelectedIndicator
          }
        >
          <CustomText
            style={
              selectedTab === 'individual'
                ? styles.selectedTabViewTitle
                : styles.unSelectedTabViewTitle
            }
          >
            Recent
          </CustomText>
        </Pressable>
        <Pressable
          onPress={() => setSelectedTab('community')}
          style={
            selectedTab === 'community'
              ? styles.selectedIndicator
              : styles.unSelectedIndicator
          }
        >
          <CustomText
            style={
              selectedTab === 'community'
                ? styles.selectedTabViewTitle
                : styles.unSelectedTabViewTitle
            }
          >
            Community
          </CustomText>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, height: '100%' }} edges={['top']}>
      <View style={styles.chatContainer}>
        <View style={styles.topBar}>
          <CustomText style={styles.titleText}>Chat ila26</CustomText>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
            }}
          >
            <AddChatIcon color={theme.colors.base} />
          </TouchableOpacity>
        </View>
        {renderTabView()}
        {renderRecentChat}
        <AddMembersModal
          onFinish={handleOnFinish}
          onClose={handleCloseModal}
          visible={isModalVisible}
        />
      </View>
    </SafeAreaView>
  );
}
