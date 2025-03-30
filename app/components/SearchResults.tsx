import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Search, User, Hash } from "lucide-react-native";
import TweetCard from "./TweetCard";

interface SearchResultsProps {
  query?: string;
  isLoading?: boolean;
  activeTab?: "top" | "latest" | "people" | "media";
  onTabChange?: (tab: "top" | "latest" | "people" | "media") => void;
  onUserPress?: (userId: string) => void;
  onTweetPress?: (tweetId: string) => void;
  onHashtagPress?: (hashtag: string) => void;
}

interface UserResult {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  isVerified: boolean;
  isFollowing: boolean;
}

interface PostResult {
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
}

interface HashtagResult {
  tag: string;
  postCount: number;
}

const SearchResults = ({
  query = "",
  isLoading = false,
  activeTab = "top",
  onTabChange = () => {},
  onUserPress = () => {},
  onTweetPress = () => {},
  onHashtagPress = () => {},
}: SearchResultsProps) => {
  // Mock data for demonstration
  const mockUsers: UserResult[] = [
    {
      id: "1",
      name: "Jane Smith",
      handle: "@janesmith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      bio: "UX Designer | Coffee enthusiast | Dog lover",
      isVerified: true,
      isFollowing: false,
    },
    {
      id: "2",
      name: "Alex Johnson",
      handle: "@alexj",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      bio: "Software Engineer at Tech Co. | Tweets about code and food",
      isVerified: false,
      isFollowing: true,
    },
    {
      id: "3",
      name: "Sam Wilson",
      handle: "@samwilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sam",
      bio: "Photographer | Traveler | Always looking for the next adventure",
      isVerified: false,
      isFollowing: false,
    },
  ];

  const mockPosts: PostResult[] = [
    {
      id: "1",
      username: "Jane Smith",
      handle: "@janesmith",
      content:
        "Just finished designing the new app interface! Can't wait to share it with everyone. #UXDesign #ProductDesign",
      timestamp: "2h",
      likes: 128,
      retweets: 42,
      replies: 17,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      image:
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&q=80",
    },
    {
      id: "2",
      username: "Alex Johnson",
      handle: "@alexj",
      content:
        "Working on a new React Native project. The new architecture is amazing! #ReactNative #MobileApp",
      timestamp: "5h",
      likes: 89,
      retweets: 23,
      replies: 7,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
    {
      id: "3",
      username: "Sam Wilson",
      handle: "@samwilson",
      content:
        "Captured this amazing sunset today. Nature never fails to inspire me.",
      timestamp: "1d",
      likes: 215,
      retweets: 56,
      replies: 12,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sam",
      image:
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&q=80",
    },
  ];

  const mockHashtags: HashtagResult[] = [
    { tag: "#ReactNative", postCount: 12453 },
    { tag: "#UXDesign", postCount: 8765 },
    { tag: "#MobileApp", postCount: 5432 },
    { tag: "#ProductDesign", postCount: 3210 },
  ];

  const renderUserItem = ({ item }: { item: UserResult }) => (
    <TouchableOpacity
      className="p-4 flex-row items-center border-b border-gray-200 bg-white"
      onPress={() => onUserPress(item.id)}
    >
      <Image
        source={{ uri: item.avatar }}
        className="h-12 w-12 rounded-full mr-3"
      />
      <View className="flex-1">
        <View className="flex-row items-center">
          <Text className="font-bold mr-1">{item.name}</Text>
          {item.isVerified && (
            <View className="h-4 w-4 bg-blue-500 rounded-full items-center justify-center">
              <Text className="text-white text-xs">✓</Text>
            </View>
          )}
        </View>
        <Text className="text-gray-500">{item.handle}</Text>
        <Text className="mt-1 text-gray-700" numberOfLines={2}>
          {item.bio}
        </Text>
      </View>
      {!item.isFollowing ? (
        <TouchableOpacity className="bg-black py-1.5 px-4 rounded-full">
          <Text className="text-white font-semibold">Follow</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity className="bg-white py-1.5 px-4 rounded-full border border-gray-300">
          <Text className="text-black font-semibold">Following</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const renderHashtagItem = ({ item }: { item: HashtagResult }) => (
    <TouchableOpacity
      className="p-4 flex-row items-center border-b border-gray-200 bg-white"
      onPress={() => onHashtagPress(item.tag)}
    >
      <View className="h-10 w-10 rounded-full bg-gray-200 items-center justify-center mr-3">
        <Hash size={20} color="#536471" />
      </View>
      <View>
        <Text className="font-bold">{item.tag}</Text>
        <Text className="text-gray-500">
          {item.postCount.toLocaleString()} Posts
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center bg-white">
          <ActivityIndicator size="large" color="#1DA1F2" />
          <Text className="mt-2 text-gray-500">Loading results...</Text>
        </View>
      );
    }

    if (query.length === 0) {
      return (
        <View className="flex-1 items-center justify-center p-4 bg-white">
          <Search size={40} color="#536471" />
          <Text className="mt-4 text-lg text-center">
            Search for people, topics, or keywords
          </Text>
        </View>
      );
    }

    switch (activeTab) {
      case "people":
        return (
          <FlatList
            data={mockUsers}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
            className="bg-white"
          />
        );
      case "latest":
      case "top":
      case "media":
        return (
          <FlatList
            data={mockPosts}
            renderItem={({ item }) => (
              <TweetCard {...item} onPress={() => onTweetPress(item.id)} />
            )}
            keyExtractor={(item) => item.id}
            className="bg-white"
          />
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Search Tabs */}
      <View className="flex-row border-b border-gray-200">
        {["top", "latest", "people", "media"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabChange(tab as any)}
            className={`flex-1 py-3 items-center ${activeTab === tab ? "border-b-2 border-blue-500" : ""}`}
          >
            <Text
              className={`${activeTab === tab ? "text-blue-500 font-bold" : "text-gray-500"}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results Content */}
      {renderContent()}
    </View>
  );
};

export default SearchResults;
