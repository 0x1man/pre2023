import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Home, Search, Bell, User, ShoppingBag } from "lucide-react-native";

interface BottomNavigationProps {
  activeTab?: string;
}

const BottomNavigation = ({ activeTab = "home" }: BottomNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = activeTab || "home";

  const navigateTo = (route: string) => {
    switch (route) {
      case "home":
        router.push("/");
        break;
      case "search":
        router.push("/search");
        break;
      case "notifications":
        router.push("/notifications");
        break;
      case "market":
        router.push("/market");
        break;
      case "profile":
        router.push("/profile");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <View className="flex-row items-center justify-around bg-white border-t border-gray-200 h-14 w-full">
      <TouchableOpacity
        className="flex-1 items-center justify-center h-full"
        onPress={() => navigateTo("home")}
      >
        <Home
          size={24}
          color={currentTab === "home" ? "#1DA1F2" : "#657786"}
          strokeWidth={currentTab === "home" ? 2.5 : 2}
        />
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 items-center justify-center h-full"
        onPress={() => navigateTo("search")}
      >
        <Search
          size={24}
          color={currentTab === "search" ? "#1DA1F2" : "#657786"}
          strokeWidth={currentTab === "search" ? 2.5 : 2}
        />
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 items-center justify-center h-full"
        onPress={() => navigateTo("notifications")}
      >
        <Bell
          size={24}
          color={currentTab === "notifications" ? "#1DA1F2" : "#657786"}
          strokeWidth={currentTab === "notifications" ? 2.5 : 2}
        />
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 items-center justify-center h-full"
        onPress={() => navigateTo("market")}
      >
        <ShoppingBag
          size={24}
          color={currentTab === "market" ? "#1DA1F2" : "#657786"}
          strokeWidth={currentTab === "market" ? 2.5 : 2}
        />
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 items-center justify-center h-full"
        onPress={() => navigateTo("profile")}
      >
        <User
          size={24}
          color={currentTab === "profile" ? "#1DA1F2" : "#657786"}
          strokeWidth={currentTab === "profile" ? 2.5 : 2}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;
