import React, {useEffect, useState} from 'react';
import {
  LMPostUploadIndicator,
  LMUniversalFeedHeader,
  PostsList,
  UniversalFeed,
} from '@likeminds.community/feed-rn-core';
import {pushAPI, token} from '../pushNotification';
import {useAppSelector} from '@likeminds.community/feed-rn-core/store/store';
import FilterTopics from '../components/FilterTopics';
import CreatePostButton from '../components/CreatePostButton';

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
    <UniversalFeed>
      <LMUniversalFeedHeader />
      <FilterTopics />
      <LMPostUploadIndicator />
      <PostsList items={mappedTopics} />
      <CreatePostButton />
    </UniversalFeed>
  );
};

export default Feed;
