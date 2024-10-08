# EvolvX Theme Integration with LikeMinds SDK

This project is based on the default social-feed theme provided by [LikeMinds SDK](https://docs.likeminds.community/feed/react-native/getting-started). It includes all the default screens from the SDK, but with modifications to fit the **EvolvX** theme.

## Custom Universal Feed Screen

In the EvolvX theme, while the default screens from the social-feed theme are used, a **custom Universal Feed screen** has been created to better match the design and functionality requirements of EvolvX. This screen is built using components from the LikeMinds SDK, ensuring compatibility with the rest of the features while offering a more tailored user experience.

## How to Use

1. Clone the repository.
2. Install the required dependencies using:
```bash
npm install
```
3. To apply the EvolvX theme changes, navigate to the **App.tsx** file and ensure the styles are set according to the EvolvX design.

## Screens

The project includes the following screens:

### 1. Default Screens from LikeMinds Social-Feed Theme

The following default screens from the [LikeMinds social-feed theme](https://docs.likeminds.community/feed/react-native/getting-started#step-4---configure-navigation) are used:

- **Post Detail Screen**: Provides detailed view of a specific post with comments and interactions.
- **Create Post Screen**: Allows users to create new posts with text, images, or videos.
- **Post Likes Screen**: Displays a list of users who liked a specific post.
- **Notifications Screen**: Shows notifications about user activity and engagement in the feed.

### 2. Custom Universal Feed Screen

The custom **Universal Feed Screen** for the EvolvX theme uses components from the LikeMinds SDK, with two custom components designed for EvolvX:

#### Custom Components

1. `<FilterTopics />`

The **`<FilterTopics />`** component allows users to filter the feed based on specific topics, designed to integrate with the EvolvX theme.

2. `<CreatePostButton />`

The **`<CreatePostButton />`** component is customized with a specific feature that only allows the **Community Manager (CM)** to create posts under the "Coach's Corner" topic. This is implemented via a hardcoded check within the component.

If you want to modify this restriction or change topic-based logic, you will need to update the hardcoded logic inside the `<CreatePostButton />` component according to your requirements.

#### API Key and User Credentials

The project uses a predefined **API key** and **user credentials** for the EvolvX theme. If you intend to use a different API key, user ID, or username, follow these steps:

1. Update the **API key** and **user credentials** in the **App.tsx** file.
2. Create your own topics and data set according to your requirement.
3. Modify the hardcoded topic check inside the `<CreatePostButton />` component, specifically for the "Coach's Corner" topic, to meet your new requirements.

This custom screen ensures that the user experience remains consistent with EvolvX's design principles while leveraging the robust features provided by the LikeMinds SDK.