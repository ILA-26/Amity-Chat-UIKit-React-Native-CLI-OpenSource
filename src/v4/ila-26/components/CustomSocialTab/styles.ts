import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import type { MyMD3Theme } from 'src/providers/amity-ui-kit-provider';

export const useStyles = () => {
  const theme = useTheme() as MyMD3Theme;

  const styles = StyleSheet.create({
    tabContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      paddingHorizontal: 12,
      borderBottomWidth: 2,
      borderColor: theme.colors.baseShade4,
      borderWidth: 1,
    },
    tabBtn: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginHorizontal: 4,
    },
    tabName: {
      fontSize: 16,
      lineHeight: 22,
      color: theme.colors.baseShade1,
    },
  });
  return styles;
};
