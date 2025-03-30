import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import TweetCard from "./TweetCard";

interface Reply {
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

interface ReplyListProps {
  replies?: Reply[];
  onReplyPress?: (replyId: string) => void;
  onLike?: (replyId: string) => void;
  onRetweet?: (replyId: string) => void;
  onReply?: (replyId: string) => void;
  onShare?: (replyId: string) => void;
  isLoading?: boolean;
  parentPostId?: string;
}

const ReplyList = ({
  replies = [
    {
      id: "r1",
      username: "Jane Smith",
      handle: "@janesmith",
      content:
        "This is a great point! I completely agree with what you're saying.",
      timestamp: "1h",
      likes: 15,
      retweets: 2,
      replies: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    {
      id: "r2",
      username: "Alex Johnson",
      handle: "@alexj",
      content: "I have a different perspective on this. Have you considered...",
      timestamp: "45m",
      likes: 8,
      retweets: 0,
      replies: 3,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
    {
      id: "r3",
      username: "Sam Wilson",
      handle: "@samwilson",
      content:
        "Here's an article that relates to this topic: https://example.com/article",
      timestamp: "30m",
      likes: 21,
      retweets: 5,
      replies: 2,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sam",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
    },
  ],
  onReplyPress = () => {},
  onLike = () => {},
  onRetweet = () => {},
  onReply = () => {},
  onShare = () => {},
  isLoading = false,
  parentPostId = "main",
}: ReplyListProps) => {
  // Render loading state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center p-4 bg-white">
        <Text className="text-gray-500">Loading replies...</Text>
      </View>
    );
  }

  // Render empty state
  if (replies.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-8 bg-white">
        <Image
          source={{
            uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=empty",
          }}
          className="h-16 w-16 opacity-50 mb-4"
        />
        <Text className="text-lg font-medium text-gray-700 mb-2">
          No replies yet
        </Text>
        <Text className="text-gray-500 text-center">
          Be the first to reply to this post!
        </Text>
        <TouchableOpacity
          className="mt-4 bg-blue-500 py-2 px-6 rounded-full"
          onPress={() => onReply(parentPostId)}
        >
          <Text className="text-white font-medium">Reply</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={replies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="border-l-2 border-gray-200 ml-6">
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
              onPress={() => onReplyPress(item.id)}
              onLike={() => onLike(item.id)}
              onRetweet={() => onRetweet(item.id)}
              onReply={() => onReply(item.id)}
              onShare={() => onShare(item.id)}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ReplyList;
