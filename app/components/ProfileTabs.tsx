import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import TweetCard from "./TweetCard";
import { MapPin, Tag, ShoppingBag } from "lucide-react-native";

interface ProfileTabsProps {
  userId?: string;
  activeTab?: "posts" | "replies" | "media" | "likes" | "market";
  onTabChange?: (
    tab: "posts" | "replies" | "media" | "likes" | "market",
  ) => void;
  posts?: Array<{
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
  marketItems?: Array<{
    id: string;
    title: string;
    price: string | null;
    bargaining: boolean;
    description: string;
    location: string;
    category: string;
    condition: string;
    isNew: boolean;
    timestamp: string;
    image: string;
    reserved: boolean;
    reservedUntil?: string;
  }>;
}

const ProfileTabs = ({
  userId = "1",
  activeTab = "posts",
  onTabChange = () => {},
  posts = [
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
  marketItems = [
    {
      id: "m1",
      title: "Vintage Camera",
      price: "$120",
      bargaining: false,
      description:
        "Vintage film camera in excellent condition. Perfect for collectors.",
      location: "New York, NY",
      category: "Electronics",
      condition: "Good",
      isNew: false,
      timestamp: "2h",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
      reserved: false,
    },
    {
      id: "m2",
      title: "Mechanical Keyboard",
      price: "$85",
      bargaining: true,
      description: "Mechanical keyboard with RGB lighting and custom keycaps.",
      location: "San Francisco, CA",
      category: "Electronics",
      condition: "Like New",
      isNew: false,
      timestamp: "5h",
      image:
        "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=600&q=80",
      reserved: false,
    },
  ],
}: ProfileTabsProps) => {
  const [localActiveTab, setLocalActiveTab] = useState<
    "posts" | "replies" | "media" | "likes" | "market"
  >(activeTab);

  const handleTabChange = (
    tab: "posts" | "replies" | "media" | "likes" | "market",
  ) => {
    setLocalActiveTab(tab);
    onTabChange(tab);
  };

  const renderMarketItem = ({
    item,
  }: {
    item: ProfileTabsProps["marketItems"][0];
  }) => (
    <View className="bg-white mb-3 rounded-lg overflow-hidden shadow-sm border border-gray-200">
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-40"
          resizeMode="cover"
        />
        {item.reserved && (
          <View className="absolute top-2 right-2 bg-yellow-500 px-2 py-1 rounded-md">
            <Text className="text-white font-bold text-xs">Reserved</Text>
          </View>
        )}
        {item.isNew && (
          <View className="absolute top-2 left-2 bg-green-500 px-2 py-1 rounded-md">
            <Text className="text-white font-bold text-xs">New</Text>
          </View>
        )}
      </View>

      <View className="p-3">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-lg font-bold">{item.title}</Text>
          {item.price ? (
            <Text className="text-blue-500 font-bold">{item.price}</Text>
          ) : (
            <Text className="text-green-500 font-bold">Make an offer</Text>
          )}
        </View>

        <Text className="text-gray-500 mb-1">{item.timestamp}</Text>
        <Text className="text-gray-700 mb-2">{item.description}</Text>

        <View className="flex-row flex-wrap mb-2">
          <View className="flex-row items-center bg-gray-100 rounded-full px-2 py-1 mr-2 mb-1">
            <MapPin size={12} color="#4B5563" />
            <Text className="text-xs text-gray-600 ml-1">{item.location}</Text>
          </View>

          <View className="flex-row items-center bg-gray-100 rounded-full px-2 py-1 mr-2 mb-1">
            <Tag size={12} color="#4B5563" />
            <Text className="text-xs text-gray-600 ml-1">{item.category}</Text>
          </View>

          <View className="flex-row items-center bg-gray-100 rounded-full px-2 py-1 mb-1">
            <ShoppingBag size={12} color="#4B5563" />
            <Text className="text-xs text-gray-600 ml-1">{item.condition}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    let contentToRender;

    switch (localActiveTab) {
      case "posts":
        contentToRender = posts;
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
        return (
          <FlatList
            data={marketItems}
            keyExtractor={(item) => item.id}
            renderItem={renderMarketItem}
            className="bg-white p-3"
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center p-8 bg-white">
                <Text className="text-gray-500 text-center">
                  No market items yet
                </Text>
              </View>
            }
          />
        );
      default:
        contentToRender = tweets;
    }

    if (contentToRender.length === 0) {
      return (
        <View className="flex-1 items-center justify-center p-8 bg-white">
          <Text className="text-gray-500 text-center">
            {localActiveTab === "posts" && "No posts yet"}
            {localActiveTab === "replies" && "No replies yet"}
            {localActiveTab === "media" && "No media posts yet"}
            {localActiveTab === "likes" && "No liked posts yet"}
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
          onPress={() => handleTabChange("posts")}
          className={`flex-1 py-3 items-center ${localActiveTab === "posts" ? "border-b-2 border-blue-500" : ""}`}
        >
          <Text
            className={`${localActiveTab === "posts" ? "text-blue-500 font-bold" : "text-gray-600"}`}
          >
            Posts
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
