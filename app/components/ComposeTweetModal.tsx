import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
} from "react-native";
import {
  X,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Smile,
  BarChart,
  Tag,
  DollarSign,
  ShoppingBag,
} from "lucide-react-native";

interface ComposeTweetModalProps {
  visible?: boolean;
  onClose?: () => void;
  onTweet?: (content: string, mediaUrl?: string) => void;
  editMode?: boolean;
  tweetToEdit?: {
    id: string;
    content: string;
    mediaUrl?: string;
  };
  isMarketListing?: boolean;
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

const ComposeTweetModal = ({
  visible = true,
  onClose = () => {},
  onTweet = () => {},
  editMode = false,
  tweetToEdit = { id: "", content: "", mediaUrl: "" },
  isMarketListing = false,
}: ComposeTweetModalProps) => {
  const [tweetContent, setTweetContent] = useState(
    editMode ? tweetToEdit.content : "",
  );
  const [mediaUrl, setMediaUrl] = useState(
    editMode && tweetToEdit.mediaUrl ? tweetToEdit.mediaUrl : "",
  );
  const maxCharCount = 280;

  // Market listing specific states
  const [itemTitle, setItemTitle] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [itemCategory, setItemCategory] = useState(CATEGORIES[0]);
  const [itemCondition, setItemCondition] = useState("New");
  const [isNewItem, setIsNewItem] = useState(true);
  const [allowBargaining, setAllowBargaining] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showConditionPicker, setShowConditionPicker] = useState(false);

  const handleTweet = () => {
    if (tweetContent.trim() && tweetContent.length <= maxCharCount) {
      onTweet(tweetContent, mediaUrl);
      setTweetContent("");
      setMediaUrl("");
      onClose();
    }
  };

  const handleListItem = () => {
    // In a real app, this would create a market listing with all the details
    const marketListing = {
      title: itemTitle,
      description: tweetContent,
      price: itemPrice,
      location: itemLocation,
      category: itemCategory,
      condition: itemCondition,
      isNew: isNewItem,
      allowBargaining: allowBargaining,
      image: mediaUrl,
    };
    console.log("Creating market listing:", marketListing);
    onClose();
    // Reset form
    setItemTitle("");
    setTweetContent("");
    setItemPrice("");
    setItemLocation("");
    setItemCategory(CATEGORIES[0]);
    setItemCondition("New");
    setIsNewItem(true);
    setAllowBargaining(false);
    setMediaUrl("");
  };

  const handleAddImage = () => {
    // Placeholder for image picker functionality
    setMediaUrl(
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
    );
  };

  const handleRemoveImage = () => {
    setMediaUrl("");
  };

  const remainingChars = maxCharCount - tweetContent.length;
  const isOverLimit = remainingChars < 0;
  const isNearLimit = remainingChars <= 20 && remainingChars >= 0;

  const isMarketFormValid =
    itemTitle.trim() &&
    tweetContent.trim() &&
    tweetContent.length <= maxCharCount &&
    itemLocation.trim();

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-white"
      >
        <View className="flex-1 bg-white">
          {/* Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={isMarketListing ? handleListItem : handleTweet}
              disabled={
                isMarketListing
                  ? !isMarketFormValid
                  : tweetContent.length === 0 || isOverLimit
              }
              className={`px-4 py-1.5 rounded-full ${
                isMarketListing
                  ? isMarketFormValid
                    ? "bg-[#1DA1F2]"
                    : "bg-[#8ED0F9]"
                  : tweetContent.length > 0 && !isOverLimit
                    ? "bg-[#1DA1F2]"
                    : "bg-[#8ED0F9]"
              }`}
            >
              <Text className="text-white font-bold">
                {isMarketListing ? "List Item" : editMode ? "Update" : "Tweet"}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 p-4">
            {/* User info and input */}
            <View className="flex-row">
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=user123",
                }}
                className="h-10 w-10 rounded-full mr-3"
              />
              <View className="flex-1">
                {isMarketListing && (
                  <View className="mb-3">
                    <TextInput
                      className="text-lg font-bold border-b border-gray-200 pb-2"
                      placeholder="Item title"
                      value={itemTitle}
                      onChangeText={setItemTitle}
                    />
                  </View>
                )}

                <TextInput
                  className="text-base min-h-[120px]"
                  placeholder={
                    isMarketListing
                      ? "Describe your item..."
                      : "What's happening?"
                  }
                  multiline
                  value={tweetContent}
                  onChangeText={setTweetContent}
                  autoFocus
                />

                {/* Market listing specific fields */}
                {isMarketListing && (
                  <View className="mt-3">
                    {/* Price */}
                    <View className="flex-row items-center mb-3">
                      <DollarSign size={18} color="#1DA1F2" className="mr-2" />
                      <TextInput
                        className="flex-1 border-b border-gray-200 pb-1"
                        placeholder="Price (optional)"
                        keyboardType="numeric"
                        value={itemPrice}
                        onChangeText={setItemPrice}
                      />
                    </View>

                    {/* Bargaining Option */}
                    <View className="flex-row items-center justify-between mb-3">
                      <Text>Allow bargaining</Text>
                      <Switch
                        value={allowBargaining}
                        onValueChange={setAllowBargaining}
                        trackColor={{ false: "#D1D5DB", true: "#1DA1F2" }}
                      />
                    </View>

                    {/* Location */}
                    <View className="flex-row items-center mb-3">
                      <MapPin size={18} color="#1DA1F2" className="mr-2" />
                      <TextInput
                        className="flex-1 border-b border-gray-200 pb-1"
                        placeholder="Location"
                        value={itemLocation}
                        onChangeText={setItemLocation}
                      />
                    </View>

                    {/* Category */}
                    <TouchableOpacity
                      className="flex-row items-center justify-between mb-3"
                      onPress={() => setShowCategoryPicker(!showCategoryPicker)}
                    >
                      <View className="flex-row items-center">
                        <Tag size={18} color="#1DA1F2" className="mr-2" />
                        <Text>Category</Text>
                      </View>
                      <Text className="text-gray-600">{itemCategory} ▼</Text>
                    </TouchableOpacity>

                    {showCategoryPicker && (
                      <View className="mb-3 bg-gray-100 p-2 rounded-lg">
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                        >
                          {CATEGORIES.map((category) => (
                            <TouchableOpacity
                              key={category}
                              className={`mr-2 px-3 py-1 rounded-full ${itemCategory === category ? "bg-blue-500" : "bg-white"}`}
                              onPress={() => {
                                setItemCategory(category);
                                setShowCategoryPicker(false);
                              }}
                            >
                              <Text
                                className={
                                  itemCategory === category
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
                    )}

                    {/* Condition */}
                    <TouchableOpacity
                      className="flex-row items-center justify-between mb-3"
                      onPress={() =>
                        setShowConditionPicker(!showConditionPicker)
                      }
                    >
                      <View className="flex-row items-center">
                        <ShoppingBag
                          size={18}
                          color="#1DA1F2"
                          className="mr-2"
                        />
                        <Text>Condition</Text>
                      </View>
                      <Text className="text-gray-600">{itemCondition} ▼</Text>
                    </TouchableOpacity>

                    {showConditionPicker && (
                      <View className="mb-3 bg-gray-100 p-2 rounded-lg">
                        {CONDITIONS.map((condition) => (
                          <TouchableOpacity
                            key={condition}
                            className={`mb-1 px-3 py-2 rounded ${itemCondition === condition ? "bg-blue-500" : "bg-white"}`}
                            onPress={() => {
                              setItemCondition(condition);
                              setShowConditionPicker(false);
                            }}
                          >
                            <Text
                              className={
                                itemCondition === condition
                                  ? "text-white"
                                  : "text-gray-700"
                              }
                            >
                              {condition}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}

                    {/* Is New */}
                    <View className="flex-row items-center justify-between mb-3">
                      <Text>Mark as new item</Text>
                      <Switch
                        value={isNewItem}
                        onValueChange={setIsNewItem}
                        trackColor={{ false: "#D1D5DB", true: "#1DA1F2" }}
                      />
                    </View>
                  </View>
                )}

                {/* Media preview */}
                {mediaUrl ? (
                  <View className="mt-3 relative">
                    <Image
                      source={{ uri: mediaUrl }}
                      className="h-48 w-full rounded-lg"
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      onPress={handleRemoveImage}
                      className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
                    >
                      <X size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View className="p-4 border-t border-gray-200">
            <View className="flex-row justify-between items-center">
              <View className="flex-row">
                <TouchableOpacity onPress={handleAddImage} className="mr-4">
                  <ImageIcon size={20} color="#1DA1F2" />
                </TouchableOpacity>
                {!isMarketListing && (
                  <>
                    <TouchableOpacity className="mr-4">
                      <MapPin size={20} color="#1DA1F2" />
                    </TouchableOpacity>
                    <TouchableOpacity className="mr-4">
                      <Smile size={20} color="#1DA1F2" />
                    </TouchableOpacity>
                    <TouchableOpacity className="mr-4">
                      <Calendar size={20} color="#1DA1F2" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <BarChart size={20} color="#1DA1F2" />
                    </TouchableOpacity>
                  </>
                )}
              </View>

              {/* Character counter */}
              <View>
                {tweetContent.length > 0 && (
                  <Text
                    className={`${isOverLimit ? "text-red-500" : isNearLimit ? "text-yellow-500" : "text-gray-500"}`}
                  >
                    {remainingChars}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ComposeTweetModal;
