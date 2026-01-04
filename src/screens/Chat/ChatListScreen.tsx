import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { ChatStackParamList } from "../../navigation/types";

/* ---------------- TYPES ---------------- */

type ChatListNavProp = NativeStackNavigationProp<
  ChatStackParamList,
  "ChatList"
>;

type Conversation = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup?: boolean;
};

/* ---------------- DUMMY DATA ---------------- */

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Festival Group",
    lastMessage: "Let's celebrate together! 🎉",
    time: "Now",
    unread: 3,
    isGroup: true,
  },
  {
    id: "2",
    name: "Priya Sharma",
    lastMessage: "Thank you for the gift! 🎁",
    time: "10:23 AM",
    unread: 2,
  },
  {
    id: "3",
    name: "Arjun Mehta",
    lastMessage: "When will you send the envelope?",
    time: "9:15 AM",
    unread: 0,
  },
  {
    id: "4",
    name: "Neha Patel",
    lastMessage: "The festival celebration was amazing!",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "5",
    name: "Vikram Singh",
    lastMessage: "Check out this location for our meetup",
    time: "Yesterday",
    unread: 1,
  },
  {
    id: "6",
    name: "Sneha Gupta",
    lastMessage: "I sent you a digital envelope",
    time: "Monday",
    unread: 0,
  },
];

/* ---------------- SCREEN ---------------- */

export default function ChatListScreen() {
  const navigation = useNavigation<ChatListNavProp>();

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFDF5" }}>
      {/* Header (NO BACK BUTTON – TAB ROOT) */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: "700",
            color: "#000080",
          }}
        >
          Messages
        </Text>

        <TouchableOpacity
          style={{
            marginLeft: "auto",
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: "#FFAA33",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View
        style={{
          backgroundColor: "#FFF7D6",
          marginHorizontal: 20,
          paddingHorizontal: 15,
          borderRadius: 16,
          flexDirection: "row",
          alignItems: "center",
          height: 50,
          marginBottom: 20,
        }}
      >
        <Ionicons name="search-outline" size={20} color="#6B6B6B" />
        <TextInput
          placeholder="Search conversations"
          style={{ marginLeft: 10, fontSize: 16, flex: 1 }}
          placeholderTextColor="#999"
        />
      </View>

      {/* Chat list */}
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#F2EEDA",
            }}
            onPress={() =>
              navigation.navigate("ChatConversation", {
                chatId: item.id,
                isGroup: item.isGroup,
                title: item.name,
              })
            }
          >
            {/* Avatar */}
            <View
              style={{
                width: 55,
                height: 55,
                borderRadius: 35,
                backgroundColor: "#FFE9C2",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.isGroup ? (
                <Ionicons name="people" size={28} color="#000080" />
              ) : (
                <Text style={{ fontWeight: "700", color: "#CC7A00" }}>
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </Text>
              )}
            </View>

            {/* Text Area */}
            <View style={{ flex: 1, marginLeft: 15 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "600",
                    color: "#000070",
                  }}
                >
                  {item.name}
                </Text>

                {item.isGroup && (
                  <Text
                    style={{
                      fontSize: 12,
                      backgroundColor: "#DCE0FF",
                      color: "#000080",
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 10,
                      marginLeft: 8,
                    }}
                  >
                    Group
                  </Text>
                )}
              </View>

              <Text style={{ color: "#5A5A5A", marginTop: 2 }}>
                {item.lastMessage}
              </Text>
            </View>

            {/* Right side */}
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontSize: 12, color: "#6B6B6B" }}>
                {item.time}
              </Text>

              {item.unread > 0 && (
                <View
                  style={{
                    backgroundColor: "#FF3A30",
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {item.unread}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
