import React from "react";
import { Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function SplashScreen() {
  return (
    <LinearGradient
      colors={["#FF9933", "#FFD700"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Text style={styles.title}>ShagunPe</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
});
