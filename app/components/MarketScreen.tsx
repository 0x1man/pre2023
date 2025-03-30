import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";
import ComposeButton from "./ComposeButton";
import {
  Filter,
  MapPin,
  Tag,
  DollarSign,
  Percent,
  Clock,
  ShoppingBag,
} from "lucide-react-native";

interface MarketItem {
  id: string;
  title: string;
  price: string | null;
  bargaining: boolean;
  seller: string;
  sellerAvatar: string;
  image: string;
  description: string;
  location: string;
  category: string;
  condition: "New" | "Like New" | "Good" | "Fair" | "Poor";
  isNew: boolean;
  timestamp: string;
  reserved: boolean;
  reservedUntil?: string;
}

interface MarketScreenProps {
  isLoading?: boolean;
  onRefresh?: () => void;
}

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Vehicles",
  "Toys & Games",
  "Sports",
  "Collectibles",
  "Books",
  "Other",
];

const CONDITIONS = ["New", "Like New", "Good", "Fair", "Poor"];

const MarketScreen = ({
  isLoading = false,
  onRefresh = () => {},
}: MarketScreenProps) => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "recent" | "price-low" | "price-high" | "relevance"
  >("recent");

  // New listing states
  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    price: "",
    bargaining: false,
    location: "",
    category: CATEGORIES[0],
    condition: "New" as const,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&q=80",
  });

  // Sample market items
  const marketItems: MarketItem[] = [
    {
      id: "1",
      title: "Vintage Camera",
      price: "$120",
      bargaining: false,
      seller: "@photogeek",
      sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=photogeek",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
      description:
        "Vintage film camera in excellent condition. Perfect for collectors.",
      location: "New York, NY",
      category: "Electronics",
      condition: "Good",
      isNew: false,
      timestamp: "2h",
      reserved: false,
    },
    {
      id: "2",
      title: "Mechanical Keyboard",
      price: "$85",
      bargaining: true,
      seller: "@techguru",
      sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=techguru",
      image:
        "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=600&q=80",
      description: "Mechanical keyboard with RGB lighting and custom keycaps.",
      location: "San Francisco, CA",
      category: "Electronics",
      condition: "Like New",
      isNew: false,
      timestamp: "5h",
      reserved: false,
    },
    {
      id: "3",
      title: "Handmade Pottery",
      price: null,
      bargaining: true,
      seller: "@craftlover",
      sellerAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=craftlover",
      image:
        "https://images.unsplash.com/photo-1565193298357-c5b64a816c38?w=600&q=80",
      description: "Handmade ceramic bowl, perfect for your home decor.",
      location: "Portland, OR",
      category: "Home & Garden",
      condition: "New",
      isNew: true,
      timestamp: "1d",
      reserved: true,
      reservedUntil: "2d",
    },
    {
      id: "4",
      title: "Vintage Vinyl Records",
      price: "$25 each",
      bargaining: false,
      seller: "@musicfan",
      sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=musicfan",
      image:
        "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&q=80",
      description: "Collection of classic vinyl records from the 70s and 80s.",
      location: "Austin, TX",
      category: "Collectibles",
      condition: "Good",
      isNew: false,
      timestamp: "3d",
      reserved: false,
    },
    {
      id: "5",
      title: "Mountain Bike",
      price: "$350",
      bargaining: true,
      seller: "@bikerider",
      sellerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bikerider",
      image:
        "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&q=80",
      description:
        "Mountain bike in great condition. Perfect for trails and off-road adventures.",
      location: "Denver, CO",
      category: "Sports",
      condition: "Good",
      isNew: false,
      timestamp: "6h",
      reserved: false,
    },
  ];

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    onRefresh();
    // Simulate network request
    setTimeout(() => setRefreshing(false), 1500);
  }, [onRefresh]);

  const toggleCategoryFilter = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleConditionFilter = (condition: string) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter((c) => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  const applyFilters = () => {
    // In a real app, this would filter the data
    setShowFilters(false);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedConditions([]);
    setMinPrice("");
    setMaxPrice("");
    setSearchQuery("");
    setSortBy("recent");
  };

  const handleCreateListing = () => {
    // In a real app, this would create a new listing
    console.log("Creating new listing:", newListing);
    setShowListingModal(false);
    // Reset form
    setNewListing({
      title: "",
      description: "",
      price: "",
      bargaining: false,
      location: "",
      category: CATEGORIES[0],
      condition: "New",
      isNew: true,
      image:
        "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&q=80",
    });
  };

  const handleReserveItem = (itemId: string) => {
    console.log(`Reserving item ${itemId} for 48 hours`);
    // In a real app, this would update the item's reserved status
  };

  const handleBargain = (itemId: string) => {
    console.log(`Opening bargaining chat for item ${itemId}`);
    // In a real app, this would open a chat with the seller
  };

  const filteredItems = marketItems.filter((item) => {
    // Apply search query filter
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Apply category filter
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(item.category)
    ) {
      return false;
    }

    // Apply condition filter
    if (
      selectedConditions.length > 0 &&
      !selectedConditions.includes(item.condition)
    ) {
      return false;
    }

    // Apply price filter
    if (minPrice && item.price) {
      const itemPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      if (itemPrice < parseFloat(minPrice)) {
        return false;
      }
    }

    if (maxPrice && item.price) {
      const itemPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      if (itemPrice > parseFloat(maxPrice)) {
        return false;
      }
    }

    return true;
  });

  // Sort items based on selected sort option
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price-low") {
      const aPrice = a.price ? parseFloat(a.price.replace(/[^0-9.]/g, "")) : 0;
      const bPrice = b.price ? parseFloat(b.price.replace(/[^0-9.]/g, "")) : 0;
      return aPrice - bPrice;
    } else if (sortBy === "price-high") {
      const aPrice = a.price ? parseFloat(a.price.replace(/[^0-9.]/g, "")) : 0;
      const bPrice = b.price ? parseFloat(b.price.replace(/[^0-9.]/g, "")) : 0;
      return bPrice - aPrice;
    } else if (sortBy === "recent") {
      // Simple timestamp comparison (in a real app, use actual dates)
      return a.timestamp.localeCompare(b.timestamp);
    }
    return 0;
  });

  const renderMarketItem = ({ item }: { item: MarketItem }) => (
    <TouchableOpacity
      className="bg-white mb-3 rounded-lg overflow-hidden shadow-sm"
      onPress={() => console.log(`Viewing item ${item.id}`)}
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-48"
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

        <View className="flex-row items-center mb-2">
          <Image
            source={{ uri: item.sellerAvatar }}
            className="h-5 w-5 rounded-full mr-2"
          />
          <Text className="text-gray-500">{item.seller}</Text>
          <Text className="text-gray-400 ml-2">· {item.timestamp}</Text>
        </View>

        <Text className="text-gray-700 mb-2">{item.description}</Text>

        <View className="flex-row flex-wrap mb-3">
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

        <View className="flex-row">
          {!item.reserved ? (
            <TouchableOpacity
              className="bg-blue-500 py-2 px-4 rounded-full mr-2 flex-1 items-center"
              onPress={() => handleReserveItem(item.id)}
            >
              <Text className="text-white font-bold">Reserve</Text>
            </TouchableOpacity>
          ) : (
            <View className="flex-row items-center bg-gray-200 py-2 px-4 rounded-full mr-2 flex-1 justify-center">
              <Clock size={16} color="#4B5563" />
              <Text className="text-gray-600 font-bold ml-1">
                Reserved ({item.reservedUntil})
              </Text>
            </View>
          )}

          {item.bargaining && (
            <TouchableOpacity
              className="bg-green-500 py-2 px-4 rounded-full flex-1 items-center"
              onPress={() => handleBargain(item.id)}
            >
              <Text className="text-white font-bold">Bargain</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showFilters}
      onRequestClose={() => setShowFilters(false)}
    >
      <View className="flex-1 bg-black bg-opacity-50 justify-end">
        <View className="bg-white rounded-t-3xl p-4 h-3/4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">Filters</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Text className="text-blue-500 font-bold">Close</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1">
            {/* Search */}
            <View className="mb-4">
              <Text className="font-bold mb-2">Search</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2"
                placeholder="Search items..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Categories */}
            <View className="mb-4">
              <Text className="font-bold mb-2">Categories</Text>
              <View className="flex-row flex-wrap">
                {CATEGORIES.map((category) => (
                  <TouchableOpacity
                    key={category}
                    className={`mr-2 mb-2 px-3 py-1 rounded-full ${selectedCategories.includes(category) ? "bg-blue-500" : "bg-gray-200"}`}
                    onPress={() => toggleCategoryFilter(category)}
                  >
                    <Text
                      className={
                        selectedCategories.includes(category)
                          ? "text-white"
                          : "text-gray-700"
                      }
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Condition */}
            <View className="mb-4">
              <Text className="font-bold mb-2">Condition</Text>
              <View className="flex-row flex-wrap">
                {CONDITIONS.map((condition) => (
                  <TouchableOpacity
                    key={condition}
                    className={`mr-2 mb-2 px-3 py-1 rounded-full ${selectedConditions.includes(condition) ? "bg-blue-500" : "bg-gray-200"}`}
                    onPress={() => toggleConditionFilter(condition)}
                  >
                    <Text
                      className={
                        selectedConditions.includes(condition)
                          ? "text-white"
                          : "text-gray-700"
                      }
                    >
                      {condition}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Range */}
            <View className="mb-4">
              <Text className="font-bold mb-2">Price Range</Text>
              <View className="flex-row">
                <TextInput
                  className="border border-gray-300 rounded-lg p-2 flex-1 mr-2"
                  placeholder="Min"
                  keyboardType="numeric"
                  value={minPrice}
                  onChangeText={setMinPrice}
                />
                <TextInput
                  className="border border-gray-300 rounded-lg p-2 flex-1"
                  placeholder="Max"
                  keyboardType="numeric"
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                />
              </View>
            </View>

            {/* Sort By */}
            <View className="mb-4">
              <Text className="font-bold mb-2">Sort By</Text>
              <View className="flex-row flex-wrap">
                <TouchableOpacity
                  className={`mr-2 mb-2 px-3 py-1 rounded-full ${sortBy === "recent" ? "bg-blue-500" : "bg-gray-200"}`}
                  onPress={() => setSortBy("recent")}
                >
                  <Text
                    className={
                      sortBy === "recent" ? "text-white" : "text-gray-700"
                    }
                  >
                    Most Recent
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`mr-2 mb-2 px-3 py-1 rounded-full ${sortBy === "price-low" ? "bg-blue-500" : "bg-gray-200"}`}
                  onPress={() => setSortBy("price-low")}
                >
                  <Text
                    className={
                      sortBy === "price-low" ? "text-white" : "text-gray-700"
                    }
                  >
                    Price: Low to High
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`mr-2 mb-2 px-3 py-1 rounded-full ${sortBy === "price-high" ? "bg-blue-500" : "bg-gray-200"}`}
                  onPress={() => setSortBy("price-high")}
                >
                  <Text
                    className={
                      sortBy === "price-high" ? "text-white" : "text-gray-700"
                    }
                  >
                    Price: High to Low
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`mr-2 mb-2 px-3 py-1 rounded-full ${sortBy === "relevance" ? "bg-blue-500" : "bg-gray-200"}`}
                  onPress={() => setSortBy("relevance")}
                >
                  <Text
                    className={
                      sortBy === "relevance" ? "text-white" : "text-gray-700"
                    }
                  >
                    Relevance
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View className="flex-row mt-4">
            <TouchableOpacity
              className="flex-1 bg-gray-200 py-3 rounded-lg mr-2 items-center"
              onPress={resetFilters}
            >
              <Text className="font-bold">Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-blue-500 py-3 rounded-lg items-center"
              onPress={applyFilters}
            >
              <Text className="text-white font-bold">Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderListingModal = () => (
    <Modal
      animationType="slide"
      transparent={false}
      visible={showListingModal}
      onRequestClose={() => setShowListingModal(false)}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
          <TouchableOpacity onPress={() => setShowListingModal(false)}>
            <Text className="text-blue-500">Cancel</Text>
          </TouchableOpacity>
          <Text className="font-bold text-lg">List an Item</Text>
          <TouchableOpacity
            onPress={handleCreateListing}
            disabled={
              !newListing.title ||
              !newListing.description ||
              !newListing.location
            }
          >
            <Text
              className={`font-bold ${!newListing.title || !newListing.description || !newListing.location ? "text-gray-400" : "text-blue-500"}`}
            >
              List
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Title */}
          <View className="mb-4">
            <Text className="font-bold mb-1">Title*</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2"
              placeholder="What are you selling?"
              value={newListing.title}
              onChangeText={(text) =>
                setNewListing({ ...newListing, title: text })
              }
            />
          </View>

          {/* Description */}
          <View className="mb-4">
            <Text className="font-bold mb-1">Description*</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2 h-24"
              placeholder="Describe your item..."
              multiline
              textAlignVertical="top"
              value={newListing.description}
              onChangeText={(text) =>
                setNewListing({ ...newListing, description: text })
              }
            />
          </View>

          {/* Price */}
          <View className="mb-4">
            <Text className="font-bold mb-1">Price (optional)</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2"
              placeholder="$0.00"
              keyboardType="numeric"
              value={newListing.price}
              onChangeText={(text) =>
                setNewListing({ ...newListing, price: text })
              }
            />
          </View>

          {/* Bargaining Option */}
          <View className="mb-4 flex-row items-center">
            <TouchableOpacity
              className={`h-5 w-5 rounded mr-2 ${newListing.bargaining ? "bg-blue-500" : "border border-gray-300"}`}
              onPress={() =>
                setNewListing({
                  ...newListing,
                  bargaining: !newListing.bargaining,
                })
              }
            />
            <Text>Allow bargaining</Text>
          </View>

          {/* Location */}
          <View className="mb-4">
            <Text className="font-bold mb-1">Location*</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2"
              placeholder="Where is the item located?"
              value={newListing.location}
              onChangeText={(text) =>
                setNewListing({ ...newListing, location: text })
              }
            />
          </View>

          {/* Category */}
          <View className="mb-4">
            <Text className="font-bold mb-1">Category*</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-2"
            >
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  className={`mr-2 px-3 py-1 rounded-full ${newListing.category === category ? "bg-blue-500" : "bg-gray-200"}`}
                  onPress={() => setNewListing({ ...newListing, category })}
                >
                  <Text
                    className={
                      newListing.category === category
                        ? "text-white"
                        : "text-gray-700"
                    }
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Condition */}
          <View className="mb-4">
            <Text className="font-bold mb-1">Condition*</Text>
            <View className="flex-row flex-wrap">
              {CONDITIONS.map((condition) => (
                <TouchableOpacity
                  key={condition}
                  className={`mr-2 mb-2 px-3 py-1 rounded-full ${newListing.condition === condition ? "bg-blue-500" : "bg-gray-200"}`}
                  onPress={() =>
                    setNewListing({
                      ...newListing,
                      condition: condition as
                        | "New"
                        | "Like New"
                        | "Good"
                        | "Fair"
                        | "Poor",
                    })
                  }
                >
                  <Text
                    className={
                      newListing.condition === condition
                        ? "text-white"
                        : "text-gray-700"
                    }
                  >
                    {condition}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Is New */}
          <View className="mb-4 flex-row items-center">
            <TouchableOpacity
              className={`h-5 w-5 rounded mr-2 ${newListing.isNew ? "bg-blue-500" : "border border-gray-300"}`}
              onPress={() =>
                setNewListing({ ...newListing, isNew: !newListing.isNew })
              }
            />
            <Text>Mark as new item</Text>
          </View>

          {/* Image Upload (placeholder) */}
          <View className="mb-4">
            <Text className="font-bold mb-1">Images</Text>
            <TouchableOpacity className="border border-dashed border-gray-300 rounded-lg p-4 items-center justify-center h-32">
              <Text className="text-blue-500">+ Add Photos</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1">
        <Header title="Marketplace" />

        {/* Search and Filter Bar */}
        <View className="flex-row items-center p-3 bg-white border-b border-gray-200">
          <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
            placeholder="Search marketplace..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            className="p-2 bg-gray-100 rounded-full"
            onPress={() => setShowFilters(true)}
          >
            <Filter size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {/* Active Filters Display */}
        {(selectedCategories.length > 0 ||
          selectedConditions.length > 0 ||
          minPrice ||
          maxPrice) && (
          <View className="flex-row flex-wrap p-2 bg-white border-b border-gray-200">
            {selectedCategories.map((category) => (
              <View
                key={category}
                className="bg-blue-100 rounded-full px-2 py-1 mr-2 mb-1 flex-row items-center"
              >
                <Text className="text-blue-800 text-xs">{category}</Text>
                <TouchableOpacity
                  onPress={() => toggleCategoryFilter(category)}
                  className="ml-1"
                >
                  <Text className="text-blue-800 font-bold">×</Text>
                </TouchableOpacity>
              </View>
            ))}
            {selectedConditions.map((condition) => (
              <View
                key={condition}
                className="bg-green-100 rounded-full px-2 py-1 mr-2 mb-1 flex-row items-center"
              >
                <Text className="text-green-800 text-xs">{condition}</Text>
                <TouchableOpacity
                  onPress={() => toggleConditionFilter(condition)}
                  className="ml-1"
                >
                  <Text className="text-green-800 font-bold">×</Text>
                </TouchableOpacity>
              </View>
            ))}
            {(minPrice || maxPrice) && (
              <View className="bg-yellow-100 rounded-full px-2 py-1 mr-2 mb-1 flex-row items-center">
                <Text className="text-yellow-800 text-xs">
                  {minPrice && maxPrice
                    ? `${minPrice}-${maxPrice}`
                    : minPrice
                      ? `Min ${minPrice}`
                      : `Max ${maxPrice}`}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setMinPrice("");
                    setMaxPrice("");
                  }}
                  className="ml-1"
                >
                  <Text className="text-yellow-800 font-bold">×</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              onPress={resetFilters}
              className="bg-gray-200 rounded-full px-2 py-1 mb-1"
            >
              <Text className="text-gray-700 text-xs">Clear All</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={sortedItems}
          renderItem={renderMarketItem}
          keyExtractor={(item) => item.id}
          contentContainerClassName="p-3"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />

        {renderFilterModal()}
        {renderListingModal()}

        <ComposeButton onPress={() => setShowListingModal(true)} />
        <BottomNavigation activeTab="market" />
      </View>
    </SafeAreaView>
  );
};

export default MarketScreen;
