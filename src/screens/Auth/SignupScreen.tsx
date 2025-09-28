// src/screens/auth/SignupScreen.tsx
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

const showAlert = (message: string) => Alert.alert("Error", message);

type Props = {
  navigation: any;
  setIsLoggedIn: (val: boolean) => void;
};

export default function SignupScreen({ navigation, setIsLoggedIn }: Props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignup = async () => {
    if (!fullName.trim()) {
      showAlert("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      showAlert("Please enter your email.");
      return;
    }
    if (!emailRegex.test(email)) {
      showAlert("Please enter a valid email address.");
      return;
    }
    if (!password) {
      showAlert("Please enter a password.");
      return;
    }
    if (!agree) {
      showAlert("Please accept Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));

      // Mock signup success
      // TODO: Replace with real API call & secure token storage
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      showAlert("Signup failed. Please try again.");
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

          {/* Signup Card */}
          <LinearGradient
            colors={["#ffffffff", "#fdfde1ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>Create Account</Text>
            <Text style={styles.cardDesc}>Join Dharma Gifts today</Text>

            {/* Full Name */}
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter your full name"
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Email */}
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

            {/* Password */}
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

            {/* Terms & Checkbox */}
            <TouchableOpacity style={styles.checkboxWrapper} onPress={() => setAgree(!agree)}>
              <Ionicons
                name={agree ? "checkmark-circle" : "ellipse-outline"}
                size={20}
                color={agree ? "#000080" : "#888"}
              />
              <Text style={styles.checkboxText}>
                I agree to the{" "}
                <Text style={styles.link}>Terms of Service</Text> and{" "}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Create Account Button */}
            <TouchableOpacity onPress={handleSignup} disabled={isLoading}>
              <LinearGradient
                colors={["#FF8C00", "#FFD700"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Create Account</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Already have account */}
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text style={styles.footerLink} onPress={() => navigation.navigate("Login")}>
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
  eyeIcon: {
    padding: 4,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#444",
    flex: 1,
    flexWrap: "wrap",
  },
  link: {
    color: "#000080",
    fontWeight: "bold",
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
