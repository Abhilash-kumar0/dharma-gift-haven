import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(255, 253, 208, 0.9)", // soft cream top
          "rgba(255, 255, 255, 0.95)", // white middle
          "rgba(255, 252, 236, 0.7)",  // pastel yellow bottom
          "rgba(254, 247, 205, 0.6)",  // hint of peach/pink
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBg}
      >
        <View style={styles.inner}>{children}</View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientBg: { flex: 1, minHeight: '100%' }, // fills full background
  inner: { flex: 1, paddingHorizontal: 16 }
});

export default AppLayout;
