import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  Heart,
  MessageCircle,
  Repeat,
  Share,
  ThumbsDown,
  Edit,
} from "lucide-react-native";

interface TweetCardProps {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  retweets: number;
  dislikes: number;
  isOwnTweet?: boolean;
  onPress?: () => void;
  onReply?: () => void;
  onRetweet?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  onEdit?: () => void;
  onShare?: () => void;
}

const TweetCard = ({
  id,
  username,
  handle,
  avatar,
  content,
  timestamp,
  likes,
  replies,
  retweets,
  dislikes,
  isOwnTweet = false,
  onPress = () => {},
  onReply = () => {},
  onRetweet = () => {},
  onLike = () => {},
  onDislike = () => {},
  onEdit = () => {},
  onShare = () => {},
}: TweetCardProps) => {
  return (
    <TouchableOpacity
      className="border-b border-gray-200 p-4 bg-white"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row">
        <Image
          source={{ uri: avatar }}
          className="h-12 w-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text className="font-bold">{username}</Text>
            <Text className="text-gray-500 ml-1">{handle}</Text>
            <Text className="text-gray-500 ml-1">· {timestamp}</Text>
          </View>
          <Text className="mt-1 mb-2">{content}</Text>
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
