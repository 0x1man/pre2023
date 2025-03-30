import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  Heart,
  MessageCircle,
  Repeat,
  Share,
  ThumbsDown,
  Edit,
} from "lucide-react-native";

interface TweetCardProps {
  id?: string;
  username?: string;
  handle?: string;
  content?: string;
  timestamp?: string;
  likes?: number;
  dislikes?: number;
  retweets?: number;
  replies?: number;
  avatar?: string;
  image?: string;
  isOwnTweet?: boolean;
  onPress?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  onRetweet?: () => void;
  onReply?: () => void;
  onShare?: () => void;
  onEdit?: () => void;
}

const TweetCard = ({
  id = "1",
  username = "John Doe",
  handle = "@johndoe",
  content = "This is a sample tweet. It could contain #hashtags and @mentions and links https://example.com",
  timestamp = "2h",
  likes = 42,
  dislikes = 8,
  retweets = 12,
  replies = 5,
  avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  image = "",
  isOwnTweet = false,
  onPress = () => {},
  onLike = () => {},
  onDislike = () => {},
  onRetweet = () => {},
  onReply = () => {},
  onShare = () => {},
  onEdit = () => {},
}: TweetCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="p-4 border-b border-gray-200 bg-white"
    >
      <View className="flex-row">
        {/* Avatar */}
        <Image
          source={{ uri: avatar }}
          className="h-12 w-12 rounded-full mr-3"
        />

        {/* Tweet Content */}
        <View className="flex-1">
          {/* User Info */}
          <View className="flex-row items-center mb-1">
            <Text className="font-bold mr-1">{username}</Text>
            <Text className="text-gray-500 mr-1">{handle}</Text>
            <Text className="text-gray-500">· {timestamp}</Text>
          </View>

          {/* Tweet Text */}
          <Text className="mb-2">{content}</Text>

          {/* Tweet Image (if any) */}
          {image ? (
            <Image
              source={{ uri: image }}
              className="h-48 w-full rounded-lg mb-2"
              resizeMode="cover"
            />
          ) : null}

          {/* Engagement Buttons */}
          <View className="flex-row justify-between mt-2">
            <TouchableOpacity
              onPress={onReply}
              className="flex-row items-center"
            >
              <MessageCircle size={18} color="#536471" />
              <Text className="ml-1 text-gray-500">{replies}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onRetweet}
              className="flex-row items-center"
            >
              <Repeat size={18} color="#536471" />
              <Text className="ml-1 text-gray-500">{retweets}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onLike}
              className="flex-row items-center"
            >
              <Heart size={18} color="#536471" />
              <Text className="ml-1 text-gray-500">{likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onDislike}
              className="flex-row items-center"
            >
              <ThumbsDown size={18} color="#536471" />
              <Text className="ml-1 text-gray-500">{dislikes}</Text>
            </TouchableOpacity>

            {isOwnTweet && (
              <TouchableOpacity
                onPress={onEdit}
                className="flex-row items-center"
              >
                <Edit size={18} color="#536471" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={onShare}
              className="flex-row items-center"
            >
              <Share size={18} color="#536471" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TweetCard;
