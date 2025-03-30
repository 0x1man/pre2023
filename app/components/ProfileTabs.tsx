import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import TweetCard from "./TweetCard";

interface ProfileTabsProps {
  userId?: string;
  activeTab?: "tweets" | "replies" | "media" | "likes" | "market";
  onTabChange?: (
    tab: "tweets" | "replies" | "media" | "likes" | "market",
  ) => void;
  tweets?: Array<{
    id: string;
    username: string;
    handle: string;
    content: string;
    timestamp: string;
    likes: number;
    retweets: number;
    replies: number;
    avatar: string;
    image?: string;
  }>;
  replies?: Array<{
    id: string;
    username: string;
    handle: string;
    content: string;
    timestamp: string;
    likes: number;
    retweets: number;
    replies: number;
    avatar: string;
    image?: string;
  }>;
  media?: Array<{
    id: string;
    username: string;
    handle: string;
    content: string;
    timestamp: string;
    likes: number;
    retweets: number;
    replies: number;
    avatar: string;
    image: string;
  }>;
  likes?: Array<{
    id: string;
    username: string;
    handle: string;
    content: string;
    timestamp: string;
    likes: number;
    retweets: number;
    replies: number;
    avatar: string;
    image?: string;
  }>;
}

const ProfileTabs = ({
  userId = "1",
  activeTab = "tweets",
  onTabChange = () => {},
  tweets = [
    {
      id: "1",
      username: "John Doe",
      handle: "@johndoe",
      content: "Just setting up my Twitter clone!",
      timestamp: "2h",
      likes: 42,
      retweets: 12,
      replies: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "2",
      username: "John Doe",
      handle: "@johndoe",
      content: "Working on a new project. #coding #reactnative",
      timestamp: "1d",
      likes: 89,
      retweets: 23,
      replies: 7,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      image:
        "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&q=80",
    },
  ],
  replies = [
    {
      id: "3",
      username: "John Doe",
      handle: "@johndoe",
      content: "@janedoe Thanks for the feedback on my project!",
      timestamp: "5h",
      likes: 12,
      retweets: 2,
      replies: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
  ],
  media = [
    {
      id: "4",
      username: "John Doe",
      handle: "@johndoe",
      content: "Check out this amazing view! #travel",
      timestamp: "3d",
      likes: 156,
      retweets: 42,
      replies: 13,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      image:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80",
    },
    {
      id: "5",
      username: "John Doe",
      handle: "@johndoe",
      content: "My new workspace setup. #tech #productivity",
      timestamp: "1w",
      likes: 201,
      retweets: 56,
      replies: 24,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
    },
  ],
  likes = [
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
  ],
}: ProfileTabsProps) => {
  const [localActiveTab, setLocalActiveTab] = useState<
    "tweets" | "replies" | "media" | "likes" | "market"
  >(activeTab);

  const handleTabChange = (
    tab: "tweets" | "replies" | "media" | "likes" | "market",
  ) => {
    setLocalActiveTab(tab);
    onTabChange(tab);
  };

  const renderContent = () => {
    let contentToRender;

    switch (localActiveTab) {
      case "tweets":
        contentToRender = tweets;
        break;
      case "replies":
        contentToRender = replies;
        break;
      case "media":
        contentToRender = media;
        break;
      case "likes":
        contentToRender = likes;
        break;
      case "market":
        contentToRender = []; // Empty for now, would be populated with market items
        break;
      default:
        contentToRender = tweets;
    }

    if (contentToRender.length === 0) {
      return (
        <View className="flex-1 items-center justify-center p-8 bg-white">
          <Text className="text-gray-500 text-center">
            {localActiveTab === "tweets" && "No tweets yet"}
            {localActiveTab === "replies" && "No replies yet"}
            {localActiveTab === "media" && "No media tweets yet"}
            {localActiveTab === "likes" && "No liked tweets yet"}
            {localActiveTab === "market" && "No market items yet"}
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={contentToRender}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TweetCard
            id={item.id}
            username={item.username}
            handle={item.handle}
            content={item.content}
            timestamp={item.timestamp}
            likes={item.likes}
            retweets={item.retweets}
            replies={item.replies}
            avatar={item.avatar}
            image={item.image}
            onPress={() => {}}
          />
        )}
        className="bg-white"
      />
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Tabs */}
      <View className="flex-row border-b border-gray-200">
        <TouchableOpacity
          onPress={() => handleTabChange("tweets")}
          className={`flex-1 py-3 items-center ${localActiveTab === "tweets" ? "border-b-2 border-blue-500" : ""}`}
        >
          <Text
            className={`${localActiveTab === "tweets" ? "text-blue-500 font-bold" : "text-gray-600"}`}
          >
            Tweets
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabChange("replies")}
          className={`flex-1 py-3 items-center ${localActiveTab === "replies" ? "border-b-2 border-blue-500" : ""}`}
        >
          <Text
            className={`${localActiveTab === "replies" ? "text-blue-500 font-bold" : "text-gray-600"}`}
          >
            Replies
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabChange("media")}
          className={`flex-1 py-3 items-center ${localActiveTab === "media" ? "border-b-2 border-blue-500" : ""}`}
        >
          <Text
            className={`${localActiveTab === "media" ? "text-blue-500 font-bold" : "text-gray-600"}`}
          >
            Media
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabChange("likes")}
          className={`flex-1 py-3 items-center ${localActiveTab === "likes" ? "border-b-2 border-blue-500" : ""}`}
        >
          <Text
            className={`${localActiveTab === "likes" ? "text-blue-500 font-bold" : "text-gray-600"}`}
          >
            Likes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabChange("market")}
          className={`flex-1 py-3 items-center ${localActiveTab === "market" ? "border-b-2 border-blue-500" : ""}`}
        >
          <Text
            className={`${localActiveTab === "market" ? "text-blue-500 font-bold" : "text-gray-600"}`}
          >
            Market
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {renderContent()}
    </View>
  );
};

export default ProfileTabs;
