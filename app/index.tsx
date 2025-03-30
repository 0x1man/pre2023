import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AuthScreen from "./components/AuthScreen";
import FeedScreen from "./components/FeedScreen";

export default function App() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate checking for authentication status
  useEffect(() => {
    // In a real app, this would check for a stored token or session
    const checkAuthStatus = async () => {
      try {
        // Simulate API call or token validation
        setTimeout(() => {
          // For demo purposes, default to not authenticated
          setIsAuthenticated(false);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // In a real app, this would clear tokens/session
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#1DA1F2" />
        <Text className="mt-4 text-gray-600">Loading...</Text>
      </View>
    );
  }

  return isAuthenticated ? (
    <FeedScreen />
  ) : (
    <AuthScreen onAuthenticated={handleAuthenticated} />
  );
}
