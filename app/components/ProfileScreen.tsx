import React, { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "expo-router";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import BottomNavigation from "./BottomNavigation";

interface ProfileScreenProps {
  userId?: string;
  username?: string;
  displayName?: string;
  bio?: string;
  location?: string;
  website?: string;
  joinDate?: string;
  followersCount?: number;
  followingCount?: number;
  profileImage?: string;
  coverImage?: string;
  isFollowing?: boolean;
  isCurrentUser?: boolean;
}

const ProfileScreen = ({
  userId = "1",
  username = "twitter_user",
  displayName = "Twitter User",
  bio = "Welcome to my Twitter profile! This is a placeholder bio that would normally contain information about the user.",
  location = "San Francisco, CA",
  website = "twitter.com",
  joinDate = "September 2023",
  followersCount = 1234,
  followingCount = 567,
  profileImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=twitter",
  coverImage = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80",
  isFollowing = false,
  isCurrentUser = false,
}: ProfileScreenProps) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<
    "posts" | "replies" | "media" | "likes"
  >("posts");

  const handleBackPress = () => {
    // In a real app, this would navigate back
    navigation.goBack();
  };

  const handleFollowPress = () => {
    // In a real app, this would toggle follow status
    console.log("Follow button pressed");
  };

  const handleTabChange = (tab: "posts" | "replies" | "media" | "likes") => {
    setActiveTab(tab);
  };

  // Mock data for posts, replies, media, and likes would be fetched from an API in a real app
  const posts = [
    {
      id: "1",
      username: displayName,
      handle: `@${username}`,
      content: "Just setting up my Social clone!",
      timestamp: "2h",
      likes: 42,
      retweets: 12,
      replies: 5,
      avatar: profileImage,
    },
    {
      id: "2",
      username: displayName,
      handle: `@${username}`,
      content: "Working on a new project. #coding #reactnative",
      timestamp: "1d",
      likes: 89,
      retweets: 23,
      replies: 7,
      avatar: profileImage,
      image:
        "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&q=80",
    },
  ];

  const replies = [
    {
      id: "3",
      username: displayName,
      handle: `@${username}`,
      content: "@janedoe Thanks for the feedback on my project!",
      timestamp: "5h",
      likes: 12,
      retweets: 2,
      replies: 1,
      avatar: profileImage,
    },
  ];

  const media = [
    {
      id: "4",
      username: displayName,
      handle: `@${username}`,
      content: "Check out this amazing view! #travel",
      timestamp: "3d",
      likes: 156,
      retweets: 42,
      replies: 13,
      avatar: profileImage,
      image:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80",
    },
    {
      id: "5",
      username: displayName,
      handle: `@${username}`,
      content: "My new workspace setup. #tech #productivity",
      timestamp: "1w",
      likes: 201,
      retweets: 56,
      replies: 24,
      avatar: profileImage,
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    },
  ];

  const likes = [
    {
      id: "6",
      username: "Jane Smith",
      handle: "@janesmith",
      content: "Just launched my new portfolio website!",
      timestamp: "4h",
      likes: 78,
      retweets: 15,
      replies: 8,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <ScrollView className="flex-1" stickyHeaderIndices={[0]}>
          <ProfileHeader
            username={username}
            displayName={displayName}
            bio={bio}
            location={location}
            website={website}
            joinDate={joinDate}
            followersCount={followersCount}
            followingCount={followingCount}
            profileImage={profileImage}
            coverImage={coverImage}
            isFollowing={isFollowing}
            onFollowPress={handleFollowPress}
            onBackPress={handleBackPress}
          />
          <ProfileTabs
            userId={userId}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            posts={posts}
            replies={replies}
            media={media}
            likes={likes}
          />
        </ScrollView>
      </View>
      <BottomNavigation activeTab="profile" />
    </SafeAreaView>
  );
};

export default ProfileScreen;
