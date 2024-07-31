import React from 'react';
import {LMFeedNotificationFeedScreen} from '@likeminds.community/feed-rn-core';
import {View} from 'react-native';
import STYLES from '@likeminds.community/feed-rn-core/constants/Styles';

const NotificationScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: STYLES.$IS_DARK_THEME
          ? STYLES.$BACKGROUND_COLORS.DARK
          : STYLES.$BACKGROUND_COLORS.LIGHT,
      }}>
      <LMFeedNotificationFeedScreen />
    </View>
  );
};

export default NotificationScreen;
