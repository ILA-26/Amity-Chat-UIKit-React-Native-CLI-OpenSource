import { Platform, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import type { MyMD3Theme } from '../../../providers/amity-ui-kit-provider';

export const useStyles = () => {
  const theme = useTheme() as MyMD3Theme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      marginTop: Platform.OS === 'ios' ? 50 : 20, // Adjust for iOS notch
      zIndex: 1,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    closeButton: {
      padding: 3,
    },
    headerTextContainer: {
      // paddingTop : Platform.OS === "ios" ? 12 : 0,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontWeight: '600',
      fontSize: 17,
      textAlign: 'center',
      color: theme.colors.base,
    },

    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginBottom: 10,
      backgroundColor: '#D9E5FC',
    },
    categoryIcon: {
      alignItems: 'center',
    },
    LoadingIndicator: {
      paddingVertical: 20,
    },
    headerWrap: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    inputWrap: {
      marginHorizontal: 16,
      backgroundColor: theme.colors.secondary,
      padding: 10,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    input: { flex: 1, marginHorizontal: 6, height: 32 },
    cancelBtn: {
      marginRight: 16,
    },
    searchScrollList: {
      paddingBottom: 110,
      marginTop: 10,
    },
    doneText: {
      color: theme.colors.primary,
    },
    disabledDone: {
      opacity: 0.5,
    },
    sectionItem: {
      flex: 1,
    },
  });
  return styles;
};
