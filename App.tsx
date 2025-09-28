import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import FlashMessage from "react-native-flash-message";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      {/* FlashMessage overlay must be outside NavigationContainer */}
      <FlashMessage position="top" />
      <Toast />
    </>
  );
}
