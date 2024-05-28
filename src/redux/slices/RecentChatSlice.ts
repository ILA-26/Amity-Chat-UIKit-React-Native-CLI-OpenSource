import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IChatListProps } from '../../components/ChatList';


interface RecentChatState {
  channelList: IChatListProps[];
}
const initialState: RecentChatState = {
  channelList: [],
};

const recentChatSlice = createSlice({
  name: 'recentChat',
  initialState,
  reducers: {
    updateRecentChat: (state, action: PayloadAction<IChatListProps[]>) => {
      const getUniqueArrayById = (arr: IChatListProps[]) => {
        const uniqueIds = new Set(state.channelList.map((channel) => channel.chatId));
        return arr.filter((channel) => !uniqueIds.has(channel.chatId));
      };
      state.channelList = [
        ...state.channelList,
        ...getUniqueArrayById(action.payload),
      ];
    },

    updateByChannelId: (
      state,
      action: PayloadAction<{ channelId: string; updatedChannelData: IChatListProps }>
    ) => {
      const { channelId, updatedChannelData } = action.payload;

      const index = state.channelList.findIndex((item) => item.chatId === channelId);
      state.channelList[index] = updatedChannelData;
    },

    deleteByChannelId: (state, action: PayloadAction<{ channelId: string }>) => {
      const { channelId } = action.payload;
      const prevChannelList: IChatListProps[] = [...state.channelList];
      const updatedChannelList: IChatListProps[] = prevChannelList.filter(
        (item) => item.chatId !== channelId
      );

      state.channelList = updatedChannelList;
    },
    clearChannelList: (state) => {
      state.channelList = [];
    },
  },
});

export default recentChatSlice;
