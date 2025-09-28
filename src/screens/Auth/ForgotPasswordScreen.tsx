// src/screens/auth/ForgotPasswordScreen.tsx
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

type Props = {
  navigation: any;
};

const showAlert = (message: string) => Alert.alert("Error", message);

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleReset = async () => {
    if (!email.trim()) {
      showAlert("Please enter your email.");
      return;
    }
    if (!emailRegex.test(email)) {
      showAlert("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));

      // Mock success
      Alert.alert(
        "Success",
        "Password reset link has been sent to your email."
      );
      navigation.goBack();
    } catch (error) {
      console.error(error);
      showAlert("Failed to send reset link. Please try again.");
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
          {/* App Title */}
          <Text style={styles.title}>Dharma Gifts</Text>
          <View style={styles.divider} />

          {/* Card */}
          <LinearGradient
            colors={["#ffffffff", "#fdfde1ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>Forgot Password</Text>
            <Text style={styles.cardDesc}>
              Enter your email to reset your password
            </Text>

            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
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

            {/* Reset Button */}
            <TouchableOpacity onPress={handleReset} disabled={isLoading}>
              <LinearGradient
                colors={["#FF8C00", "#FFD700"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Send Reset Link</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Back to Login */}
            <Text style={styles.footerText}>
              Remember your password?{" "}
              <Text
                style={styles.footerLink}
                onPress={() => navigation.goBack()}
              >
                Sign In
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
  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: "#444",
  },
  footerLink: {
    color: "#000080",
    fontWeight: "bold",
  },
  footer: {
    fontSize: 12,
    color: "#991b1b",
    marginTop: 24,
    textAlign: "center",
  },
});
