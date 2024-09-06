import React, { FC, memo } from 'react';
import { View } from 'react-native';
import useConfig from '../../../../hook/useConfig';
import { ComponentID, PageID } from '../../../../enum/enumUIKitID';
import AmityGlobalFeedComponent from '../AmityGlobalFeedComponent/AmityGlobalFeedComponent';

type AmityNewsFeedComponentType = {
  pageId?: PageID;
  onPressExploreCommunity?: any;
};

const AmityNewsFeedComponent: FC<AmityNewsFeedComponentType> = ({
  pageId = PageID.WildCardPage,
}) => {
  const { excludes } = useConfig();
  const componentId = ComponentID.newsfeed_component;
  const uiReference = `${pageId}/${componentId}/*`;

  if (excludes.includes(uiReference)) return null;

  return (
    <View
      style={{ flex: 1 }}
      testID={uiReference}
      accessibilityLabel={uiReference}
    >
      <AmityGlobalFeedComponent pageId={pageId} />
    </View>
  );
};

export default memo(AmityNewsFeedComponent);
