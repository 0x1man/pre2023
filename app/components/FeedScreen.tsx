import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

import Header from "./Header";
import TweetList from "./TweetList";
import ComposeButton from "./ComposeButton";
import BottomNavigation from "./BottomNavigation";

interface FeedScreenProps {
  isLoading?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
}

const FeedScreen = ({
  isLoading = false,
  onRefresh = () => {},
  onLoadMore = () => {},
}: FeedScreenProps) => {
  const router = useRouter();
  const [isComposeModalVisible, setIsComposeModalVisible] = useState(false);
  const [replyToTweetId, setReplyToTweetId] = useState<string | null>(null);

  const handleTweetPress = (tweetId: string) => {
    router.push(`/tweet/${tweetId}`);
  };

  const handleLike = (tweetId: string) => {
    console.log(`Liked tweet: ${tweetId}`);
    // In a real app, this would call an API to like the tweet
  };

  const handleDislike = (tweetId: string) => {
    console.log(`Disliked tweet: ${tweetId}`);
    // In a real app, this would call an API to dislike the tweet
  };

  const handleRetweet = (tweetId: string) => {
    console.log(`Retweeted: ${tweetId}`);
    // In a real app, this would call an API to retweet
  };

  const handleReply = (tweetId: string) => {
    console.log(`Reply to: ${tweetId}`);
    setReplyToTweetId(tweetId);
    setIsComposeModalVisible(true);
    // In a real app, this would open the compose modal with reply context
  };

  const handleEdit = (tweetId: string) => {
    console.log(`Edit tweet: ${tweetId}`);
    // In a real app, this would fetch the tweet content and open the compose modal in edit mode
    setIsComposeModalVisible(true);
    // For demo purposes, we're not actually loading the tweet content
  };

  const handleShare = (tweetId: string) => {
    console.log(`Share tweet: ${tweetId}`);
    // In a real app, this would open the native share dialog
  };

  const handleComposePress = () => {
    setReplyToTweetId(null);
    setIsComposeModalVisible(true);
  };

  const handleCloseComposeModal = () => {
    setIsComposeModalVisible(false);
    setReplyToTweetId(null);
  };

  const handlePostTweet = (content: string, media?: string) => {
    console.log(
      `Posting tweet: ${content}`,
      media ? `with media: ${media}` : "",
    );
    if (replyToTweetId) {
      console.log(`This is a reply to tweet: ${replyToTweetId}`);
    }
    setIsComposeModalVisible(false);
    setReplyToTweetId(null);
    // In a real app, this would call an API to post the tweet
  };

  // Temporary placeholder for ComposeTweetModal
  const renderComposeModal = () => {
    if (!isComposeModalVisible) return null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isComposeModalVisible}
        onRequestClose={handleCloseComposeModal}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-xl p-4 h-1/2">
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity onPress={handleCloseComposeModal}>
                <Text className="text-blue-500 text-lg">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 px-4 py-1 rounded-full"
                onPress={() => handlePostTweet("Sample tweet content")}
              >
                <Text className="text-white font-bold">Tweet</Text>
              </TouchableOpacity>
            </View>

            {replyToTweetId && (
              <Text className="text-gray-500 mb-2">
                Replying to tweet {replyToTweetId}
              </Text>
            )}

            <Text className="text-gray-700">
              This is a placeholder for the tweet composition area. In a
              complete implementation, this would include a text input,
              character counter, and media attachment options.
            </Text>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1">
        <Header title="Home" />

        <TweetList
          isLoading={isLoading}
          onRefresh={onRefresh}
          onLoadMore={onLoadMore}
          onTweetPress={handleTweetPress}
          onLike={handleLike}
          onDislike={handleDislike}
          onRetweet={handleRetweet}
          onReply={handleReply}
          onEdit={handleEdit}
          onShare={handleShare}
        />

        <ComposeButton onPress={handleComposePress} />

        <BottomNavigation activeTab="home" />
      </View>

      {renderComposeModal()}
    </SafeAreaView>
  );
};

export default FeedScreen;
