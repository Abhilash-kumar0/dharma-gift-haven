import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import LinearGradient from "react-native-linear-gradient";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name as never);
          }
        };

        // 🔹 Special center Scanner button
        if (route.name === "Scanner") {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.scannerButton}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#FF6A00", "#FF9900"]}
                style={styles.scannerGradient}
              >
                {options.tabBarIcon &&
                  options.tabBarIcon({
                    focused: isFocused,
                    color: "#fff",
                    size: 28,
                  })}
              </LinearGradient>
            </TouchableOpacity>
          );
        }

        // 🔹 Normal Tabs with active background highlight
        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            style={styles.tab}
          >
            <View
              style={[
                styles.iconWrapper,
                isFocused && styles.activeIconWrapper,
              ]}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused ? "#FF6A00" : "#000080",
                  size: 24,
                })}
                <Text
                style={{
                  color: isFocused ? "#FF6A00" : "#000080",
                  fontSize: 12,
                  marginTop: 4,
                }}
                >
                {label as string}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: -3 },
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: Platform.OS === "ios" ? 20 : 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconWrapper: {
    width: 60,
    height: 60,
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,106,0,0.15)", // 🔥 semi-transparent orange
  },
  scannerButton: {
    position: "relative",
    top: -30,
    alignItems: "center",
    justifyContent: "center",
  },
  scannerGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});
