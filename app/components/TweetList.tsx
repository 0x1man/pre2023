import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
} from "react-native";
import TweetCard from "./TweetCard";

interface Tweet {
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

interface TweetListProps {
  tweets?: Tweet[];
  isLoading?: boolean;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  onTweetPress?: (tweetId: string) => void;
  onLike?: (tweetId: string) => void;
  onDislike?: (tweetId: string) => void;
  onRetweet?: (tweetId: string) => void;
  onReply?: (tweetId: string) => void;
  onEdit?: (tweetId: string) => void;
  onShare?: (tweetId: string) => void;
}

const TweetList = ({
  tweets = [
    {
      id: "1",
      username: "Jane Smith",
      handle: "@janesmith",
      content:
        "Just launched my new website! Check it out at https://example.com #webdev #launch",
      timestamp: "10m",
      likes: 24,
      retweets: 5,
      replies: 3,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    {
      id: "2",
      username: "Tech News",
      handle: "@technews",
      content:
        "Breaking: New smartphone features unveiled today will change how we interact with mobile devices",
      timestamp: "45m",
      likes: 153,
      retweets: 78,
      replies: 34,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tech",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    },
    {
      id: "3",
      username: "Travel Enthusiast",
      handle: "@travelbug",
      content:
        "The sunset in Bali tonight was absolutely breathtaking! #travel #bali #sunset",
      timestamp: "2h",
      likes: 287,
      retweets: 42,
      replies: 12,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=travel",
      image:
        "https://images.unsplash.com/photo-1569288063643-5d29ad6874f9?w=800&q=80",
    },
    {
      id: "4",
      username: "Coding Tips",
      handle: "@codetips",
      content:
        "Pro tip: Learn keyboard shortcuts for your IDE. It will save you hours of development time!",
      timestamp: "3h",
      likes: 89,
      retweets: 23,
      replies: 7,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=code",
    },
    {
      id: "5",
      username: "Foodie Dreams",
      handle: "@foodielove",
      content:
        "Made homemade pasta for the first time today. The process was therapeutic and the results were delicious!",
      timestamp: "5h",
      likes: 112,
      retweets: 14,
      replies: 22,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=food",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80",
    },
  ],
  isLoading = false,
  isRefreshing = false,
  onRefresh = () => {},
  onLoadMore = () => {},
  onTweetPress = () => {},
  onLike = () => {},
  onDislike = () => {},
  onRetweet = () => {},
  onReply = () => {},
  onEdit = () => {},
  onShare = () => {},
}: TweetListProps) => {
  const [refreshing, setRefreshing] = useState(isRefreshing);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    onRefresh();
    // In a real app, you would set refreshing to false when the refresh is complete
    // This is simulated here with a timeout
    setTimeout(() => setRefreshing(false), 1500);
  }, [onRefresh]);

  const renderFooter = () => {
    if (!isLoading) return null;

    return (
      <View className="py-4 flex items-center justify-center">
        <ActivityIndicator size="small" color="#1DA1F2" />
      </View>
    );
  };

  const renderEmptyList = () => {
    if (isLoading) return null;

    return (
      <View className="flex-1 items-center justify-center py-10">
        <Text className="text-gray-500 text-center">No tweets to display</Text>
      </View>
    );
  };

  const renderTweet = ({ item }: { item: Tweet }) => (
    <TweetCard
      id={item.id}
      username={item.username}
      handle={item.handle}
      content={item.content}
      timestamp={item.timestamp}
      likes={item.likes}
      dislikes={8} // Default value for dislikes
      retweets={item.retweets}
      replies={item.replies}
      avatar={item.avatar}
      image={item.image}
      isOwnTweet={item.id === "1" || item.id === "5"} // Example: mark some tweets as user's own
      onPress={() => onTweetPress(item.id)}
      onLike={() => onLike(item.id)}
      onDislike={() => onDislike && onDislike(item.id)}
      onRetweet={() => onRetweet(item.id)}
      onReply={() => onReply(item.id)}
      onEdit={() => onEdit && onEdit(item.id)}
      onShare={() => onShare(item.id)}
    />
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={tweets}
        renderItem={renderTweet}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TweetList;
