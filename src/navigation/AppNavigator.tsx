import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import type { AppStackParamList } from "./Types";
import SettingsScreen from "../screens/Profile/SettingScreen";
import PersonalInfoScreen from "../screens/Profile/PersonalInfoScreen";
import NotificationSettingsScreen from "../screens/Profile/NotificationSettingsScreen";
import BankDetailsScreen from "../screens/Profile/BankDetailsScreen";
import TransactionHistoryScreen from "../screens/Profile/TransactionHistoryScreen";
import KycVerificationScreen from "../screens/Profile/KycVerification";
import EnvelopeView from "../screens/EnvelopeView";

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: "#fff", }, // header background
                headerTintColor: "#000080",              // back button + icon color
                headerTitleStyle: { fontWeight: "600", fontSize: 18, color: "#000080" },
                headerBackTitle: "",                     // removes iOS "Back" text
            }}
        >
            <Stack.Screen
                name="MainTabs"
                component={MainTabs}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: "Settings" }} // <-- this becomes header title
            />
            <Stack.Screen
                name="PersonalInfo"
                component={PersonalInfoScreen}
                options={{ title: "Personal Info" }} // 👈 header title
            />
            <Stack.Screen
                name="Notification"
                component={NotificationSettingsScreen}
                options={{ title: "Notification Setting" }} // 👈 header title
            />
            <Stack.Screen
                name="BankDetails"
                component={BankDetailsScreen}
                options={{ title: "Bank Details" }} // 👈 header title
            />
            <Stack.Screen
                name="TranstionHistory"
                component={TransactionHistoryScreen}
                options={{ title: "Transaction History" }} // 👈 header title
            />
            <Stack.Screen
                name="KYC"
                component={KycVerificationScreen}
                options={{ title: "Kyc Verification" }} // 👈 header title
            />
                        {/* 👇 Add your new screen here */}
            <Stack.Screen
                name="EnvelopeView"
                component={EnvelopeView}
                options={{ title: "Envelope" }}
            />
        </Stack.Navigator>
    );
}
