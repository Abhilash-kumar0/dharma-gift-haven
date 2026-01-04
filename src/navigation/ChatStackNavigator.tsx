import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatStackParamList } from "./Types";

import ChatListScreen from "../screens/Chat/ChatListScreen";
import ChatConversationScreen from "../screens/Chat/ChatCoversationScreen";


const Stack = createNativeStackNavigator<ChatStackParamList>();

export default function ChatStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ChatList" component={ChatListScreen} />
            <Stack.Screen
                name="ChatConversation"
                component={ChatConversationScreen}
            />
        </Stack.Navigator>
    );
}
