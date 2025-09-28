import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AppLayout from "../../components/AppLayout";

export default function WelcomeScreen({ navigation }: any) {
  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Dharma Gifts</Text>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>
          Your destination for meaningful spiritual gifts
        </Text>
        {/* Gradient Card */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={["#ffffffff", "#fdfde1ff"]} // gradient background
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            {/* Sign In Button with Gradient */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.buttonWrapper}
            >
              <LinearGradient
                colors={["#FF8C00", "#FFD700"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.signInButton}
              >
                <Text style={styles.signInText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Create Account Button */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Signup")}
              style={styles.createButton}
            >
              <Text style={styles.createText}>Create Account</Text>
            </TouchableOpacity>

            {/* Terms & Policy */}
            <Text style={styles.terms}>
              By continuing, you agree to our{" "}
              <Text style={styles.link}>Terms of Service</Text> and{" "}
              <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </LinearGradient>
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#000080", // Deep Blue
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
  subtitle: {
    fontSize: 16,
    color: "#6B7280", // Tailwind gray-500
    textAlign: "center",
    marginBottom: 24,
  },
  cardWrapper: {
    width: "100%",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    overflow: "hidden", // keeps gradient inside rounded corners
  },
  card: {
    padding: 25,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonWrapper: {
    width: "100%",
    marginBottom: 12,
  },
  signInButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  signInText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  createButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFD700",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  createText: {
    fontWeight: "500",
    color: "#3A3A3A",
    fontSize: 16,
  },
  terms: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
  link: {
    color: "#000080",
    fontWeight: "500",
  },
});
