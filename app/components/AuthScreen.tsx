import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Twitter } from "lucide-react-native";
import LoginForm from "./LoginForm";
import SocialLoginButtons from "./SocialLoginButtons";

interface AuthScreenProps {
  onAuthenticated?: () => void;
}

const AuthScreen = ({ onAuthenticated = () => {} }: AuthScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'signup'

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center items-center px-6 py-10 bg-white">
            {/* Twitter Logo */}
            <View className="mb-8 items-center">
              <Twitter size={48} color="#1DA1F2" />
              <Text className="text-2xl font-bold mt-4 text-gray-900">
                {activeTab === "login"
                  ? "Log in to Twitter"
                  : "Join Twitter today"}
              </Text>
            </View>

            {/* Tab Selector */}
            <View className="flex-row w-full mb-6 border-b border-gray-200">
              <TouchableOpacity
                className={`flex-1 py-3 ${activeTab === "login" ? "border-b-2 border-blue-500" : ""}`}
                onPress={() => setActiveTab("login")}
              >
                <Text
                  className={`text-center font-medium ${activeTab === "login" ? "text-blue-500" : "text-gray-500"}`}
                >
                  Log in
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 py-3 ${activeTab === "signup" ? "border-b-2 border-blue-500" : ""}`}
                onPress={() => setActiveTab("signup")}
              >
                <Text
                  className={`text-center font-medium ${activeTab === "signup" ? "text-blue-500" : "text-gray-500"}`}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Form */}
            {activeTab === "login" && (
              <LoginForm onLogin={handleLogin} isLoading={isLoading} />
            )}

            {/* Sign Up Form - Would be similar to login form but with additional fields */}
            {activeTab === "signup" && (
              <View className="w-full max-w-sm">
                <Text className="text-center text-gray-600 mb-6">
                  Create your account to start tweeting, following others, and
                  engaging with the community.
                </Text>
                <LoginForm onLogin={handleLogin} isLoading={isLoading} />
              </View>
            )}

            {/* Social Login Options */}
            <View className="w-full max-w-sm mt-6">
              <SocialLoginButtons
                onGoogleLogin={() => handleSocialLogin("google")}
                onAppleLogin={() => handleSocialLogin("apple")}
                onTwitterLogin={() => handleSocialLogin("twitter")}
                onGithubLogin={() => handleSocialLogin("github")}
              />
            </View>

            {/* Terms and Privacy */}
            <Text className="text-xs text-gray-500 text-center mt-8 px-4">
              By signing up, you agree to our Terms of Service and Privacy
              Policy, including Cookie Use. Twitter may use your contact
              information, including your email address and phone number for
              purposes outlined in our Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthScreen;
