import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {
  useAppDispatch,
  useAppSelector,
} from '@likeminds.community/feed-rn-core/store/store';
import {
  UniversalFeedContextValues,
  useUniversalFeedContext,
  useUniversalFeedCustomisableMethodsContext,
} from '@likeminds.community/feed-rn-core/context';
import {SET_PREDEFINED_TOPICS} from '@likeminds.community/feed-rn-core/store/types/types';
import {LMFeedAnalytics} from '@likeminds.community/feed-rn-core';
import {Events} from '@likeminds.community/feed-rn-core/enums/Events';
import {STATE_ADMIN} from '@likeminds.community/feed-rn-core/constants/Strings';

const CreatePostTypeModal = ({
  actionAlertModalVisible,
  hideActionModal,
}: any) => {
  const dispatch = useAppDispatch();
  const {showCreatePost, newPostButtonClick}: UniversalFeedContextValues =
    useUniversalFeedContext();
  const {newPostButtonClickProps} =
    useUniversalFeedCustomisableMethodsContext();
  const topics = useAppSelector(state => state.feed.topics);
  const memberData = useAppSelector(state => state.login.member);

  return (
    <View style={{backgroundColor: 'black'}}>
      <Modal
        transparent={true}
        visible={actionAlertModalVisible}
        onRequestClose={hideActionModal}>
        <Pressable style={styles.centeredView} onPress={hideActionModal}>
          <View
            style={{backgroundColor: 'black', padding: 20, borderRadius: 10}}>
            <Pressable
              onPress={() => {}}
              style={[styles.modalView, {backgroundColor: 'black'}]}>
              <View style={{padding: 15, paddingBottom: 10}}>
                <View
                  style={{
                    width: 40,
                    height: 5,
                    backgroundColor: 'grey',
                    borderRadius: 10,
                  }}
                />
              </View>
              <ScrollView style={{display: 'flex', flexDirection: 'column'}}>
                {Object.keys(topics)?.map((item, index) => {
                  const isCoachCentre =
                    topics[item]?.name === "Coach's Corner" ? true : false;

                  return (
                    <View key={index}>
                      {isCoachCentre && memberData?.state === STATE_ADMIN ? (
                        <TouchableOpacity
                          onPress={() => {
                            dispatch({
                              type: SET_PREDEFINED_TOPICS,
                              body: {topics: [item]},
                            });

                            newPostButtonClickProps
                              ? newPostButtonClickProps()
                              : newPostButtonClick();
                            LMFeedAnalytics.track(Events.POST_CREATION_STARTED);
                            hideActionModal();
                          }}
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                          }}>
                          <Text style={{color: 'white', fontSize: 18}}>
                            {topics[item]?.name}
                          </Text>
                        </TouchableOpacity>
                      ) : !isCoachCentre ? (
                        <TouchableOpacity
                          onPress={() => {
                            dispatch({
                              type: SET_PREDEFINED_TOPICS,
                              body: {topics: [item]},
                            });

                            newPostButtonClickProps
                              ? newPostButtonClickProps()
                              : newPostButtonClick();
                            LMFeedAnalytics.track(Events.POST_CREATION_STARTED);
                            hideActionModal();
                          }}
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                          }}>
                          <Text style={{color: 'white', fontSize: 18}}>
                            {topics[item]?.name}
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  );
                })}

                <TouchableOpacity
                  onPress={() => {
                    hideActionModal();
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                  }}>
                  <Text style={{color: '#ff4e02', fontSize: 18}}>Cancel</Text>
                </TouchableOpacity>
              </ScrollView>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default CreatePostTypeModal;
