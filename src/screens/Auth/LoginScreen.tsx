// src/screens/auth/LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import AppLayout from "../../components/AppLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthNavigator";

// Props type
type Props = NativeStackScreenProps<AuthStackParamList, "Login"> & {
  setIsLoggedIn: (val: boolean) => void;
};

// Utility alert function
const showAlert = (message: string) => Alert.alert("Error", message);

export default function LoginScreen({ navigation, setIsLoggedIn }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simple email regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async () => {
  if (!email.trim()) {
    showAlert("Please enter your email.");
    return;
  }
  if (!emailRegex.test(email)) {
    showAlert("Please enter a valid email address.");
    return;
  }
  if (!password) {
    showAlert("Please enter your password.");
    return;
  }

  setIsLoading(true);

  try {
    // ✅ Type-safe Promise
    await new Promise<void>((resolve) => setTimeout(resolve, 1200));

    // Mock login success

    setIsLoggedIn(true);
  } catch (error) {
    console.error(error);
    showAlert("Login failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <AppLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* App title */}
          <Text style={styles.title}>Dharma Gifts</Text>
          <View style={styles.divider} />

          {/* Login Card */}
          <LinearGradient
            colors={["#ffffffff", "#fdfde1ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>Welcome Back</Text>
            <Text style={styles.cardDesc}>Login to access your account</Text>

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter your email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter your password"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#888" />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
              <LinearGradient
                colors={["#FF8C00", "#FFD700"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Sign In</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Signup Link */}
            <Text style={styles.signup}>
              Don’t have an account?{" "}
              <Text style={styles.signupLink} onPress={() => navigation.navigate("Signup")}>
                Sign Up
              </Text>
            </Text>
          </LinearGradient>

          {/* Footer */}
          <Text style={styles.footer}>
            © {new Date().getFullYear()} Dharma Gifts. All rights reserved.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000080",
    textAlign: "center",
    marginBottom: 8,
  },
  divider: {
    height: 4,
    width: 60,
    borderRadius: 999,
    backgroundColor: "#fbbf24",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    borderRadius: 12,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000080",
    textAlign: "center",
    marginBottom: 4,
  },
  cardDesc: {
    textAlign: "center",
    color: "#666",
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  eyeIcon: {
    padding: 4,
  },
  forgot: {
    color: "#000080",
    textAlign: "right",
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  signup: {
    textAlign: "center",
    color: "#444",
    fontSize: 14,
  },
  signupLink: {
    color: "#000080",
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    color: "#991b1b",
    marginTop: 24,
    fontSize: 12,
  },
});
