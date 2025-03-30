import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  Mail as AtSymbolIcon,
  Lock as LockClosedIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
} from "lucide-react-native";

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
  isLoading?: boolean;
}

const LoginForm = ({
  onLogin = () => {},
  isLoading = false,
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onLogin(email, password);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
      <Text className="text-2xl font-bold text-center mb-6 text-blue-500">
        Log in to Twitter
      </Text>

      <View className="mb-4">
        <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2 mb-1">
          <AtSymbolIcon size={20} color="#6b7280" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>
        {errors.email ? (
          <Text className="text-red-500 text-xs">{errors.email}</Text>
        ) : null}
      </View>

      <View className="mb-6">
        <View className="flex-row items-center border border-gray-300 rounded-md px-3 py-2 mb-1">
          <LockClosedIcon size={20} color="#6b7280" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {showPassword ? (
              <EyeOffIcon size={20} color="#6b7280" />
            ) : (
              <EyeIcon size={20} color="#6b7280" />
            )}
          </TouchableOpacity>
        </View>
        {errors.password ? (
          <Text className="text-red-500 text-xs">{errors.password}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        className={`w-full py-3 rounded-full ${isLoading ? "bg-blue-300" : "bg-blue-500"}`}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold text-center">Log in</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity className="mt-4">
        <Text className="text-blue-500 text-center">Forgot password?</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-600">Don't have an account? </Text>
        <TouchableOpacity>
          <Text className="text-blue-500 font-semibold">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
