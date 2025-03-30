import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";

interface MarketItem {
  id: string;
  title: string;
  price: string;
  seller: string;
  image: string;
  description: string;
}

interface MarketScreenProps {
  isLoading?: boolean;
  onRefresh?: () => void;
}

const MarketScreen = ({
  isLoading = false,
  onRefresh = () => {},
}: MarketScreenProps) => {
  const router = useRouter();

  // Sample market items
  const marketItems: MarketItem[] = [
    {
      id: "1",
      title: "Vintage Camera",
      price: "$120",
      seller: "@photogeek",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
      description:
        "Vintage film camera in excellent condition. Perfect for collectors.",
    },
    {
      id: "2",
      title: "Mechanical Keyboard",
      price: "$85",
      seller: "@techguru",
      image:
        "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=600&q=80",
      description: "Mechanical keyboard with RGB lighting and custom keycaps.",
    },
    {
      id: "3",
      title: "Handmade Pottery",
      price: "$45",
      seller: "@craftlover",
      image:
        "https://images.unsplash.com/photo-1565193298357-c5b64a816c38?w=600&q=80",
      description: "Handmade ceramic bowl, perfect for your home decor.",
    },
    {
      id: "4",
      title: "Vintage Vinyl Records",
      price: "$25 each",
      seller: "@musicfan",
      image:
        "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&q=80",
      description: "Collection of classic vinyl records from the 70s and 80s.",
    },
  ];

  const renderMarketItem = ({ item }: { item: MarketItem }) => (
    <TouchableOpacity
      className="bg-white mb-3 rounded-lg overflow-hidden shadow-sm"
      onPress={() => console.log(`Viewing item ${item.id}`)}
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-48"
        resizeMode="cover"
      />
      <View className="p-3">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-lg font-bold">{item.title}</Text>
          <Text className="text-blue-500 font-bold">{item.price}</Text>
        </View>
        <Text className="text-gray-500 mb-2">{item.seller}</Text>
        <Text className="text-gray-700">{item.description}</Text>
        <TouchableOpacity
          className="bg-blue-500 py-2 px-4 rounded-full mt-3 items-center"
          onPress={() => console.log(`Contact seller for item ${item.id}`)}
        >
          <Text className="text-white font-bold">Contact Seller</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1">
        <Header title="Marketplace" />

        <FlatList
          data={marketItems}
          renderItem={renderMarketItem}
          keyExtractor={(item) => item.id}
          contentContainerClassName="p-3"
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh}
          refreshing={isLoading}
        />

        <BottomNavigation activeTab="market" />
      </View>
    </SafeAreaView>
  );
};

export default MarketScreen;
