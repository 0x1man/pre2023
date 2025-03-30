import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Menu, Search, Bell } from "lucide-react-native";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onMenuPress?: () => void;
}

const Header = ({
  title = "Home",
  showBackButton = false,
  onMenuPress = () => {},
}: HeaderProps) => {
  const router = useRouter();

  return (
    <View className="bg-white border-b border-gray-200 px-4 py-3 flex-row items-center justify-between">
      <View className="flex-row items-center">
        {showBackButton ? (
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Text className="text-blue-500 text-lg">Back</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onMenuPress} className="mr-3">
            <Menu size={24} color="#000" />
          </TouchableOpacity>
        )}

        {!showBackButton && (
          <Image
            source={require("../../assets/images/icon.png")}
            className="w-7 h-7"
            resizeMode="contain"
          />
        )}

        {title && <Text className="text-lg font-bold ml-3">{title}</Text>}
      </View>

      <View className="flex-row items-center">
        <TouchableOpacity className="mr-5">
          <Search size={22} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Bell size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
