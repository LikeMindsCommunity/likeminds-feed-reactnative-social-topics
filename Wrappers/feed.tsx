import React, {useEffect, useState} from 'react';
import {
  LMFilterTopics,
  LMPostUploadIndicator,
  LMUniversalFeedHeader,
  PostsList,
  UniversalFeed,
} from '@likeminds.community/feed-rn-core';
import {pushAPI, token} from '../pushNotification';
import {useAppSelector} from '@likeminds.community/feed-rn-core/store/store';
import FilterTopics from '../components/FilterTopics';
import CreatePostButton from '../components/CreatePostButton';
import {View} from 'react-native';

const Feed = () => {
  const mappedTopics = useAppSelector((state: any) => state.feed.mappedTopics);
  const [FCMToken, setFCMToken] = useState('');

  /// Setup notifications
  useEffect(() => {
    token().then(res => {
      if (!!res) {
        setFCMToken(res);
      }
    });
  }, []);

  // useEffect(() => {
  //   if (FCMToken) {
  //     pushAPI(FCMToken, accessToken);
  //   }
  // }, [FCMToken]);

  return (
    <View style={{flex: 1}}>
      <UniversalFeed>
        <LMUniversalFeedHeader />
        <FilterTopics />
        <LMPostUploadIndicator />
        <PostsList items={mappedTopics} />
        <CreatePostButton />
      </UniversalFeed>
    </View>
  );
};

export default Feed;
