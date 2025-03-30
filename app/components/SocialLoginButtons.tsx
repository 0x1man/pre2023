import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Twitter, Github, Mail } from "lucide-react-native";

interface SocialLoginButtonsProps {
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
  onTwitterLogin?: () => void;
  onGithubLogin?: () => void;
}

const SocialLoginButtons = ({
  onGoogleLogin = () => console.log("Google login pressed"),
  onAppleLogin = () => console.log("Apple login pressed"),
  onTwitterLogin = () => console.log("Twitter login pressed"),
  onGithubLogin = () => console.log("Github login pressed"),
}: SocialLoginButtonsProps) => {
  return (
    <View className="w-full bg-white p-4 rounded-lg">
      <Text className="text-gray-700 text-center mb-4 font-medium">
        Or continue with
      </Text>

      <View className="flex-row justify-center space-x-4 mb-4">
        {/* Google Button */}
        <TouchableOpacity
          onPress={onGoogleLogin}
          className="bg-white border border-gray-300 rounded-full p-3 w-14 h-14 items-center justify-center shadow-sm"
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
            }}
            style={{ width: 24, height: 24 }}
            contentFit="contain"
          />
        </TouchableOpacity>

        {/* Apple Button */}
        <TouchableOpacity
          onPress={onAppleLogin}
          className="bg-black border border-gray-300 rounded-full p-3 w-14 h-14 items-center justify-center shadow-sm"
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
            }}
            style={{ width: 24, height: 24 }}
            contentFit="contain"
            tintColor="white"
          />
        </TouchableOpacity>

        {/* Twitter Button */}
        <TouchableOpacity
          onPress={onTwitterLogin}
          className="bg-[#1DA1F2] border border-gray-300 rounded-full p-3 w-14 h-14 items-center justify-center shadow-sm"
        >
          <Twitter size={24} color="white" />
        </TouchableOpacity>

        {/* Github Button */}
        <TouchableOpacity
          onPress={onGithubLogin}
          className="bg-[#333] border border-gray-300 rounded-full p-3 w-14 h-14 items-center justify-center shadow-sm"
        >
          <Github size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center my-2">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500 text-sm">or</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <TouchableOpacity className="mt-2 bg-gray-100 py-3 px-4 rounded-full flex-row items-center justify-center border border-gray-300">
        <Mail size={18} color="#4B5563" />
        <Text className="ml-2 text-gray-700 font-medium">
          Continue with email
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SocialLoginButtons;
