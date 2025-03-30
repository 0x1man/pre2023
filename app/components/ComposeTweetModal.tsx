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
} from "react-native";
import {
  X,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Smile,
  BarChart,
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
}

const ComposeTweetModal = ({
  visible = true,
  onClose = () => {},
  onTweet = () => {},
  editMode = false,
  tweetToEdit = { id: "", content: "", mediaUrl: "" },
}: ComposeTweetModalProps) => {
  const [tweetContent, setTweetContent] = useState(
    editMode ? tweetToEdit.content : "",
  );
  const [mediaUrl, setMediaUrl] = useState(
    editMode && tweetToEdit.mediaUrl ? tweetToEdit.mediaUrl : "",
  );
  const maxCharCount = 280;

  const handleTweet = () => {
    if (tweetContent.trim() && tweetContent.length <= maxCharCount) {
      onTweet(tweetContent, mediaUrl);
      setTweetContent("");
      setMediaUrl("");
      onClose();
    }
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
              onPress={handleTweet}
              disabled={tweetContent.length === 0 || isOverLimit}
              className={`px-4 py-1.5 rounded-full ${tweetContent.length > 0 && !isOverLimit ? "bg-[#1DA1F2]" : "bg-[#8ED0F9]"}`}
            >
              <Text className="text-white font-bold">
                {editMode ? "Update" : "Tweet"}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 p-4">
            {/* User info and tweet input */}
            <View className="flex-row">
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=user123",
                }}
                className="h-10 w-10 rounded-full mr-3"
              />
              <View className="flex-1">
                <TextInput
                  className="text-base min-h-[120px]"
                  placeholder="What's happening?"
                  multiline
                  value={tweetContent}
                  onChangeText={setTweetContent}
                  autoFocus
                />

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
