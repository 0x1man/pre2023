import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Link as LinkIcon,
} from "lucide-react-native";

interface ProfileHeaderProps {
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
  onFollowPress?: () => void;
  onBackPress?: () => void;
}

const ProfileHeader = ({
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
  onFollowPress = () => {},
  onBackPress = () => {},
}: ProfileHeaderProps) => {
  return (
    <View className="bg-white">
      {/* Header with back button */}
      <View className="flex-row items-center p-2">
        <TouchableOpacity onPress={onBackPress} className="p-2">
          <ArrowLeft size={20} color="#1DA1F2" />
        </TouchableOpacity>
        <View className="ml-4">
          <Text className="font-bold text-lg">{displayName}</Text>
          <Text className="text-gray-500 text-xs">@{username}</Text>
        </View>
      </View>

      {/* Cover image */}
      <View className="h-32 w-full">
        <Image
          source={{ uri: coverImage }}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>

      {/* Profile image and follow button */}
      <View className="px-4">
        <View className="flex-row justify-between items-end mt-[-40px]">
          <View className="h-20 w-20 rounded-full border-4 border-white overflow-hidden">
            <Image
              source={{ uri: profileImage }}
              className="h-full w-full"
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity
            onPress={onFollowPress}
            className={`rounded-full px-4 py-2 ${isFollowing ? "border border-gray-300 bg-white" : "bg-[#1DA1F2]"}`}
          >
            <Text
              className={`font-bold ${isFollowing ? "text-black" : "text-white"}`}
            >
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* User info */}
        <View className="mt-3">
          <Text className="font-bold text-xl">{displayName}</Text>
          <Text className="text-gray-500">@{username}</Text>
        </View>

        {/* Bio */}
        <Text className="mt-2">{bio}</Text>

        {/* Additional info */}
        <View className="flex-row flex-wrap mt-2">
          {location && (
            <View className="flex-row items-center mr-4 mt-1">
              <MapPin size={16} color="#657786" />
              <Text className="text-gray-500 ml-1">{location}</Text>
            </View>
          )}
          {website && (
            <View className="flex-row items-center mr-4 mt-1">
              <LinkIcon size={16} color="#1DA1F2" />
              <Text className="text-[#1DA1F2] ml-1">{website}</Text>
            </View>
          )}
          {joinDate && (
            <View className="flex-row items-center mt-1">
              <Calendar size={16} color="#657786" />
              <Text className="text-gray-500 ml-1">Joined {joinDate}</Text>
            </View>
          )}
        </View>

        {/* Followers/Following counts */}
        <View className="flex-row mt-3 mb-3">
          <TouchableOpacity className="flex-row mr-4">
            <Text className="font-bold">{followingCount}</Text>
            <Text className="text-gray-500 ml-1">Following</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row">
            <Text className="font-bold">{followersCount}</Text>
            <Text className="text-gray-500 ml-1">Followers</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Separator */}
      <View className="h-[1px] bg-gray-200 w-full" />
    </View>
  );
};

export default ProfileHeader;
