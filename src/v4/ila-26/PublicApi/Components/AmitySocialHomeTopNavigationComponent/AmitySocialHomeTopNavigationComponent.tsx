import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC, memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../routes/RouteParamList';
import { useAmityComponent, useUiKitConfig } from '../../../../hook';
import { ComponentID, ElementID, PageID } from '../../../../enum/enumUIKitID';
import { useBehaviour } from '../../../../providers/BehaviourProvider';
import TextKeyElement from '../../../../PublicApi/Elements/TextKeyElement/TextKeyElement';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import CustomPostTypeChoiceModal from '../../../components/CustomPostTypeChoiceModal/CustomPostTypeChoiceModal';

type AmitySocialHomeTopNavigationComponentType = {
  activeTab: string;
};

const AmitySocialHomeTopNavigationComponent: FC<
  AmitySocialHomeTopNavigationComponentType
> = ({ activeTab }) => {
  const pageId = PageID.social_home_page;
  const componentId = ComponentID.top_navigation;
  const componentConfig = useAmityComponent({ pageId, componentId });
  const theme = componentConfig.themeStyles;
  const { AmitySocialHomeTopNavigationComponentBehaviour } = useBehaviour();

  const [myCommunitiesTab] = useUiKitConfig({
    page: PageID.social_home_page,
    component: ComponentID.WildCardComponent,
    element: ElementID.my_communities_button,
    keys: ['text'],
  }) as string[];
  // const [exploreTab] = useUiKitConfig({
  //   page: PageID.social_home_page,
  //   component: ComponentID.WildCardComponent,
  //   element: ElementID.explore_button,
  //   keys: ['text'],
  // }) as string[];

  // const createIcon = useConfigImageUri({
  //   configPath: {
  //     page: PageID.social_home_page,
  //     component: ComponentID.top_navigation,
  //     element: ElementID.post_creation_button,
  //   },
  //   configKey: 'icon',
  // });

  const navigation =
    useNavigation() as NativeStackNavigationProp<RootStackParamList>;
  const styles = StyleSheet.create({
    headerContainer: {
      width: '100%',
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      zIndex: 1,
      paddingTop: 16,
      paddingBottom: 12,
    },
    title: {
      fontWeight: 'bold',
      color: theme.colors.base,
      fontSize: 16,
    },
    flexContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconBtn: {
      borderRadius: 50,
      backgroundColor: theme.colors.baseShade4,
      padding: 4,
      marginHorizontal: 4,
    },
    iconBtnTransparent: {
      padding: 4,
      marginHorizontal: 4,
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    icon: {
      width: 24,
      height: 24,
      tintColor: theme.colors.base,
    },
    profilePic: {
      width: 32,
      height: 32,
      borderRadius: 72,
      objectFit: 'contain',
    },
  });

  const onPressSearch = useCallback(() => {
    if (myCommunitiesTab === activeTab) {
      if (
        AmitySocialHomeTopNavigationComponentBehaviour.goToMyCommunitiesSearchPage
      ) {
        return AmitySocialHomeTopNavigationComponentBehaviour.goToMyCommunitiesSearchPage();
      }
      return navigation.navigate('AmityMyCommunitiesSearchPage');
    }
    if (AmitySocialHomeTopNavigationComponentBehaviour.goToGlobalSearchPage) {
      return AmitySocialHomeTopNavigationComponentBehaviour.goToGlobalSearchPage();
    }
    navigation.navigate('AmitySocialGlobalSearchPage');
  }, [
    AmitySocialHomeTopNavigationComponentBehaviour,
    activeTab,
    myCommunitiesTab,
    navigation,
  ]);

  // const onCreateCommunity = useCallback(() => {
  //   navigation.navigate('CreateCommunity');
  // }, [navigation]);

  const { avatarUrl } = useSelector((state: RootState) => state.external);
  // const { updatePopUpState } = externalSlice.actions;

  // const dispatch = useDispatch();

  // const setIsOpen = (nextState: boolean) => {
  //   dispatch(updatePopUpState(nextState));
  // };
  // const onPressCreate = useCallback(() => {
  //   if (AmitySocialHomeTopNavigationComponentBehaviour.onPressCreate)
  //     return AmitySocialHomeTopNavigationComponentBehaviour.onPressCreate();
  //   if (activeTab === myCommunitiesTab) return onCreateCommunity();
  //   return setIsOpen(!isPostPopUpOpen);
  // }, [
  //   AmitySocialHomeTopNavigationComponentBehaviour,
  //   activeTab,
  //   myCommunitiesTab,
  //   onCreateCommunity,
  // ]);

  if (componentConfig?.isExcluded) return null;

  return (
    <>
      <View
        style={styles.headerContainer}
        testID={componentConfig.accessibilityId}
        accessibilityLabel={componentConfig.accessibilityId}
      >
        <View style={styles.profileContainer}>
          <Image source={{ uri: avatarUrl }} style={styles.profilePic} />
          <TextKeyElement
            pageID={pageId}
            componentID={componentId}
            elementID={ElementID.header_label}
            style={styles.title}
          />
        </View>

        <View style={styles.flexContainer}>
          <TouchableOpacity
            style={styles.iconBtnTransparent}
            onPress={onPressSearch}
            testID="top_navigation/global_search_button"
            accessibilityLabel="top_navigation/global_search_button"
          >
            <Image
              source={require('../../../ConfigAssets/search-normal.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          {/* {activeTab !== exploreTab && (
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={onPressCreate}
              testID="top_navigation/post_creation_button"
              accessibilityLabel="top_navigation/post_creation_button"
            >
              <Image source={createIcon} style={styles.icon} />
            </TouchableOpacity>
          )}   */}
        </View>
        {/* <Popup
          setOpen={setIsOpen}
          open={isPostPopUpOpen}
          position={{
            top: 45,
            right: 15,
          }}
        >
          <AmityCreatePostMenuComponent
            pageId={PageID.social_home_page}
            componentId={ComponentID.create_post_menu}
          />
        </Popup>   */}
        <CustomPostTypeChoiceModal />
      </View>
    </>
  );
};

export default memo(AmitySocialHomeTopNavigationComponent);
