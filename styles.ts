import STYLES from '@likeminds.community/feed-rn-core/constants/Styles';

export const postListStyles = {
  header: {
    memberStateViewStyle: {
      backgroundColor: 'grey',
    },
  },
  footer: {
    showBookMarkIcon: false,
    showShareIcon: false,
  },
  postContent: {
    postTopicStyle: {
      text: {
        color: 'white',
        fontFamily: STYLES.$FONT_TYPES.BOLD,
      },
      box: {
        backgroundColor: 'grey',
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1,
      },
    },
  },
};

export const pollStyle = {
  pollOptionOtherColor: 'grey',
  votesCountStyles: {
    color: STYLES.$IS_DARK_THEME
      ? STYLES.$TEXT_COLOR.PRIMARY_TEXT_DARK
      : STYLES.$TEXT_COLOR.PRIMARY_TEXT_LIGHT,
  },
  pollOptionAddedByTextStyles: {
    color: STYLES.$IS_DARK_THEME
      ? STYLES.$TEXT_COLOR.PRIMARY_TEXT_DARK
      : STYLES.$TEXT_COLOR.PRIMARY_TEXT_LIGHT,
  },
};
