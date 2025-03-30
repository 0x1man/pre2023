import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Search, ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import SearchResults from "./SearchResults";

interface SearchScreenProps {
  initialQuery?: string;
  onBack?: () => void;
}

const SearchScreen = ({ initialQuery = "", onBack }: SearchScreenProps) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "top" | "latest" | "people" | "media"
  >("top");

  const handleSearch = (text: string) => {
    setQuery(text);
    setIsSearching(text.length > 0);
  };

  const handleClear = () => {
    setQuery("");
    setIsSearching(false);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleUserPress = (userId: string) => {
    // Navigate to user profile
    router.push(`/profile/${userId}`);
  };

  const handleTweetPress = (tweetId: string) => {
    // Navigate to tweet detail
    router.push(`/tweet/${tweetId}`);
  };

  const handleHashtagPress = (hashtag: string) => {
    // Set search query to hashtag
    setQuery(hashtag);
    setIsSearching(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Search Header */}
      <View className="flex-row items-center px-4 py-2 border-b border-gray-200">
        <TouchableOpacity onPress={handleBack} className="mr-3">
          <ArrowLeft size={20} color="#000" />
        </TouchableOpacity>

        <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-3 py-2">
          <Search size={16} color="#536471" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search Twitter"
            value={query}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={handleClear}>
              <View className="h-5 w-5 bg-gray-400 rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">✕</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Results */}
      <SearchResults
        query={query}
        isLoading={isSearching && query.length > 0}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onUserPress={handleUserPress}
        onTweetPress={handleTweetPress}
        onHashtagPress={handleHashtagPress}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
