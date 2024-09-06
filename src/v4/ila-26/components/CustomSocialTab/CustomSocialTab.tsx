import {
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { FC, memo } from 'react';
import { TabName } from '../../../enum/enumTabName';
import { useStyles } from './styles';

type TCustomTab = {
  onTabChange: (tabName: TabName) => void;
  tabNames: TabName[] | string[];
  activeTab: TabName | string;
};

const CustomSocialTab: FC<TCustomTab> = ({
  tabNames,
  onTabChange,
  activeTab,
}) => {
  const styles = useStyles();
  // const theme = useTheme() as MyMD3Theme;

  return (
    <View style={styles.tabContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tabNames.map((tabName: TabName) => {
          const onPressTab = () => {
            onTabChange(tabName);
          };
          const pressedBtnStyle: ViewStyle = activeTab === tabName && {
            borderBottomWidth: 2,
            borderBottomColor: '#704AD1',
          };
          const pressedTabName: TextStyle = activeTab === tabName && {
            color: '#704AD1',
          };
          return (
            <TouchableOpacity
              style={[styles.tabBtn, pressedBtnStyle]}
              onPress={onPressTab}
              key={tabName}
            >
              <Text style={[styles.tabName, pressedTabName]}>{tabName}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default memo(CustomSocialTab);
