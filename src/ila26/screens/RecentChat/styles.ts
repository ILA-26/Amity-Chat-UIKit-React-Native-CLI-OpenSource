import { Platform, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import type { MyMD3Theme } from '../../../providers/amity-ui-kit-provider';

export const useStyles = () => {
  const theme = useTheme() as MyMD3Theme;
  const styles = StyleSheet.create({
    fontStyle: {
      color: '#1054DE',
      fontWeight: '500',
      margin: 5,
      fontSize: 17,
    },

    tabStyle: {
      backgroundColor: '#FFFFF',
      minHeight: 30,
      width: 100,
      padding: 6,
    },
    indicatorStyle: {
      backgroundColor: '#1054DE',
    },
    topBar: {
      // paddingTop: Platform.OS === 'ios' ? 50 : 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.background,
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    addChatIcon: {
      width: 24,
      height: 20,
      resizeMode: 'contain',
    },
    titleText: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.base,
    },
    tabView: {
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
      paddingTop: 8,
      marginTop: 8,
    },
    selectedTabViewTitle: {
      paddingBottom: 10,
      fontWeight: '500',
      fontSize: 16,
      color: '#704AD1',
      alignSelf: 'flex-start',
    },
    unSelectedTabViewTitle: {
      paddingBottom: 10,
      fontWeight: '500',
      fontSize: 16,
      color: theme.colors.baseShade1,
      alignSelf: 'flex-start',
    },
    selectedIndicator: {
      borderBottomWidth: 2,
      borderBottomColor: '#704AD1',
      marginHorizontal: 10,
    },
    unSelectedIndicator: {
      borderBottomWidth: 0,
      borderBottomColor: theme.colors.shadow,
      marginHorizontal: 10,
    },
    androidWrap: {
      marginTop: 0,
    },
    iosWrap: {
      marginTop: 30,
    },
    chatContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    chatListContainer: {
      paddingBottom: Platform.OS === 'ios' ? 65 : 35,
    },
    chatListEmptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chatListEmptyText: {
      color: theme.colors.baseShade3,
      fontSize: 17,
    },
  });
  return styles;
};
