import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomTabBar from "../components/CustomTabBar";

// Screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import ScannerScreen from "../screens/ScannerScreen";
import GiftsScreen from "../screens/GiftsScreen";
import ChatStackNavigator from "./ChatStackNavigator";

export type TabParamList = {
    Home: undefined;
    Gifts: undefined;
    Scanner: undefined;
    Profile: undefined;
    Chat: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabs() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Gifts"
                component={GiftsScreen}
                options={{
                    tabBarLabel: "Gifts",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "gift" : "gift-outline"}
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Scanner"
                component={ScannerScreen}
                options={{
                    tabBarLabel: "Scan",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="scan-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            {/* ✅ CHAT STACK INSIDE TAB */}
            <Tab.Screen
                name="Chat"
                component={ChatStackNavigator}
                options={{
                    tabBarLabel: "Chat",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "chatbubble" : "chatbubble-outline"}
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
