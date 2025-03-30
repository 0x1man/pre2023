import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { ArrowLeft, Send } from "lucide-react-native";
import TweetCard from "./TweetCard";
import ReplyList from "./ReplyList";

interface TweetDetailScreenProps {
  postId?: string;
  post?: {
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
  };
  onBack?: () => void;
  onLike?: (id: string) => void;
  onRetweet?: (id: string) => void;
  onReply?: (id: string) => void;
  onShare?: (id: string) => void;
  onReplyToReply?: (replyId: string) => void;
}

const TweetDetailScreen = ({
  postId = "1",
  post = {
    id: "1",
    username: "John Doe",
    handle: "@johndoe",
    content:
      "This is a sample post that has generated a lot of engagement. What do you think about this topic? #discussion #social",
    timestamp: "3h",
    likes: 142,
    retweets: 38,
    replies: 24,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    image:
      "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?w=800&q=80",
  },
  onBack = () => {},
  onLike = () => {},
  onRetweet = () => {},
  onReply = () => {},
  onShare = () => {},
  onReplyToReply = () => {},
}: TweetDetailScreenProps) => {
  const [replyText, setReplyText] = useState("");

  const handleSendReply = () => {
    if (replyText.trim()) {
      // In a real app, this would send the reply to the backend
      console.log(`Replying to post ${postId}: ${replyText}`);
      setReplyText("");
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={onBack} className="mr-4">
          <ArrowLeft size={20} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">Post</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Original Post */}
        <View className="border-b border-gray-200">
          <TweetCard
            id={post.id}
            username={post.username}
            handle={post.handle}
            content={post.content}
            timestamp={post.timestamp}
            likes={post.likes}
            retweets={post.retweets}
            replies={post.replies}
            avatar={post.avatar}
            image={post.image}
            onLike={() => onLike(post.id)}
            onRetweet={() => onRetweet(post.id)}
            onReply={() => onReply(post.id)}
            onShare={() => onShare(post.id)}
          />
        </View>

        {/* Conversation Label */}
        <View className="p-4 border-b border-gray-200">
          <Text className="font-bold text-lg">Conversation</Text>
        </View>

        {/* Replies */}
        <ReplyList
          parentPostId={post.id}
          onReplyPress={onReplyToReply}
          onLike={onReplyToReply}
          onRetweet={onReplyToReply}
          onReply={onReplyToReply}
          onShare={onReplyToReply}
        />
      </ScrollView>

      {/* Reply Composer */}
      <View className="p-3 border-t border-gray-200 flex-row items-center">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
          placeholder="Post your reply"
          value={replyText}
          onChangeText={setReplyText}
          multiline
          maxLength={280}
        />
        <TouchableOpacity
          onPress={handleSendReply}
          disabled={!replyText.trim()}
          className={`p-2 rounded-full ${replyText.trim() ? "bg-blue-500" : "bg-blue-300"}`}
        >
          <Send size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TweetDetailScreen;
