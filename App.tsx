import React, {useEffect, useState} from 'react';
import {
  UNIVERSAL_FEED,
  POST_DETAIL,
  CREATE_POST,
  CAROUSEL_SCREEN,
  POST_LIKES_LIST,
  LMOverlayProvider,
  CarouselScreen,
  LMFeedPollResult,
  NOTIFICATION_FEED,
  getNotification,
  getRoute,
  LMFeedCallbacks,
  LMCarouselScreenCallbacks,
  NAVIGATED_FROM_NOTIFICATION,
  initMyClient,
} from '@likeminds.community/feed-rn-core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  KeyboardAvoidingView,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import FeedWrapper from './Wrappers/feedWrapper';
import DetailWrapper from './Wrappers/detailScreenWrapper';
import CreateWrapper from './Wrappers/createScreenWrapper';
import LikesWrapper from './Wrappers/likesWrapper';
import NotificationWrapper from './Wrappers/notificationWrapper';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {Credentials} from './login/credentials';
import {
  CREATE_POLL_SCREEN,
  POLL_RESULT,
  TOPIC_FEED,
} from '@likeminds.community/feed-rn-core/constants/screenNames';
import {initiateAPI} from './registerDeviceApi';
import {carouselScreenStyle, createPollStyle, pollStyle} from './styles';
import CreatePollScreenWrapper from './Wrappers/createPollScreenWrapper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import STYLES from '@likeminds.community/feed-rn-core/constants/Styles';
import TopicFeedWrapper from './Wrappers/topicFeedScreenWrapper';

class CustomCallbacks implements LMFeedCallbacks, LMCarouselScreenCallbacks {
  onEventTriggered(eventName: string, eventProperties?: Map<string, string>) {
    // Override onEventTriggered with custom logic
  }
  onBackPressOnCarouselScreen() {
    // Override onBackPressOnCarouselScreen with custom logic
    navigationRef.goBack();
  }
}

const lmFeedInterface = new CustomCallbacks();

const App = () => {
  const Stack = createNativeStackNavigator();
  const [users, setUsers] = useState<any>({
    apiKey: '6749d246-1cd1-4cd7-8fe0-62b6c6991aae',
    userUniqueID: 'Test',
    userName: 'Test',
  });
  const [apiKey, setApiKey] = useState(
    Credentials?.apiKey?.length > 0 ? Credentials?.apiKey : users?.apiKey,
  );
  const [userUniqueID, setUserUniqueID] = useState(
    Credentials?.userUniqueId?.length > 0
      ? Credentials.userUniqueId
      : users?.userUniqueID,
  );
  const [userName, setUserName] = useState(
    Credentials?.username?.length > 0 ? Credentials?.username : users?.userName,
  );
  const [myClient, setMyClient] = useState();
  const [isTrue, setIsTrue] = useState(true);

  useEffect(() => {
    setUserName(
      Credentials?.username?.length > 0
        ? Credentials?.username
        : users?.userName,
    );
    setUserUniqueID(
      Credentials?.userUniqueId?.length > 0
        ? Credentials.userUniqueId
        : users?.userUniqueID,
    );
    setApiKey(
      Credentials?.apiKey?.length > 0 ? Credentials?.apiKey : users?.apiKey,
    );
  }, [users, isTrue]);

  useEffect(() => {
    if (apiKey) {
      const res: any = initMyClient();
      setMyClient(res);
    }
  }, [isTrue, apiKey]);

  // custom style of new post button
  const regex = /post_id=([^&]+)/;

  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
  // notification listener on foreground state
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const val = await getNotification(remoteMessage);
      return remoteMessage;
    });

    return unsubscribe;
  }, []);

  // notification display on foreground state
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      let routes = getRoute(detail?.notification?.data?.route);
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          if (!!navigationRef) {
            navigationRef.navigate(routes.route, routes.params);
          }
          break;
      }
    });
  });
  // deeplink listener for foreground state
  useEffect(() => {
    Linking.addEventListener('url', ({url}) => {
      const match = url.match(regex);
      // Extract the postId from the matched result
      const postId = match ? match[1] : null;
      if (navigationRef) {
        navigationRef.navigate(POST_DETAIL, [
          postId,
          NAVIGATED_FROM_NOTIFICATION,
        ]);
      }
    });
  }, []);

  // deeplink listener for kill state
  useEffect(() => {
    let isMounted = true;

    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (isMounted) {
        if (initialUrl) {
          // Execute the regex pattern on the URL
          const match = initialUrl?.match(regex);
          // Extract the postId from the matched result
          const postId = match ? match[1] : null;
          setTimeout(() => {
            if (navigationRef) {
              navigationRef.navigate(POST_DETAIL, [
                postId,
                NAVIGATED_FROM_NOTIFICATION,
              ]);
            }
          }, 2000);
        }
      }
    };

    getUrlAsync();

    // Cleanup function to unsubscribe when component is unmounted
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    STYLES.setTheme({
      hue: 18,
      isDarkTheme: true,
      primaryColor: '#ff4e02',
    });
  });

  const postListStyles = {
    footer: {
      showBookMarkIcon: false,
      showShareIcon: false,
    },
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: STYLES.$IS_DARK_THEME
          ? STYLES.$BACKGROUND_COLORS.DARK
          : STYLES.$BACKGROUND_COLORS.LIGHT,
      }}>
      {userName && userUniqueID && apiKey && myClient ? (
        <GestureHandlerRootView style={{flex: 1}}>
          <LMOverlayProvider
            myClient={myClient}
            apiKey={apiKey}
            userName={userName}
            userUniqueId={userUniqueID}
            lmFeedInterface={lmFeedInterface}
            postListStyle={postListStyles}>
            <NavigationContainer ref={navigationRef} independent={true}>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={UNIVERSAL_FEED} component={FeedWrapper} />
                <Stack.Screen name={POST_DETAIL} component={DetailWrapper} />
                <Stack.Screen name={CREATE_POST} component={CreateWrapper} />
                <Stack.Screen name={POST_LIKES_LIST} component={LikesWrapper} />
                <Stack.Screen
                  name={TOPIC_FEED}
                  component={TopicFeedWrapper}
                  options={{headerShown: true}}
                />
                <Stack.Screen
                  name={NOTIFICATION_FEED}
                  component={NotificationWrapper}
                />
                <Stack.Screen
                  options={{gestureEnabled: false}}
                  name={CAROUSEL_SCREEN}
                  component={CarouselScreen}
                />
                <Stack.Screen
                  name={POLL_RESULT}
                  component={LMFeedPollResult}
                  options={{
                    gestureEnabled: false,
                  }}
                />
                <Stack.Screen
                  name={CREATE_POLL_SCREEN}
                  component={CreatePollScreenWrapper}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </LMOverlayProvider>
        </GestureHandlerRootView>
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default App;
