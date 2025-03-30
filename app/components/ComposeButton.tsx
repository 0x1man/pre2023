import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ComposeButtonProps {
  onPress?: () => void;
}

const ComposeButton = ({ onPress }: ComposeButtonProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Default behavior - could be opening a modal or navigating
      console.log("Compose post button pressed");
      // Example: router.push('/compose');
    }
  };

  return (
    <View className="absolute bottom-20 right-5 z-10">
      <TouchableOpacity
        className="bg-blue-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        activeOpacity={0.8}
        onPress={handlePress}
      >
        <Feather name="edit-2" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ComposeButton;
