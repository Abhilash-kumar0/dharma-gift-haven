import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import {
    RouteProp,
    useRoute,
    useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import { ChatStackParamList, Message } from "../../navigation/types";
import MessageBubble from "../../components/chat/MessageBubble";
import EmojiBar from "../../components/chat/EmojiBar";
import ActionSheet from "../../components/chat/ActionSheet";
import VoiceRecorder from "../../components/chat/VoiceRecorder";

/* ---------------- ROUTE & NAV TYPES ---------------- */

type ChatConversationRouteProp = RouteProp<
    ChatStackParamList,
    "ChatConversation"
>;

type ChatConversationNavProp = NativeStackNavigationProp<
    ChatStackParamList,
    "ChatConversation"
>;

/* ---------------- MOCK CURRENT USER ---------------- */

const CURRENT_USER_ID = "me";

/* ---------------- SCREEN ---------------- */

export default function ChatConversationScreen() {
    const route = useRoute<ChatConversationRouteProp>();
    const navigation = useNavigation<ChatConversationNavProp>();

    const { chatId, isGroup, title } = route.params;

    /* ---------------- STATE ---------------- */

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hello 👋",
            senderId: "user1",
            senderName: "Rohit",
            type: "text",
            createdAt: Date.now(),
        },
        {
            id: "2",
            text: "Hi, welcome to the group!",
            senderId: CURRENT_USER_ID,
            type: "text",
            createdAt: Date.now(),
        },
    ]);

    const [input, setInput] = useState("");
    const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
    const [replyMsg, setReplyMsg] = useState<Message | null>(null);
    const [editMsg, setEditMsg] = useState<Message | null>(null);
    const [showEmoji, setShowEmoji] = useState(false);

    /* ---------------- HELPERS ---------------- */

    const isMe = (msg: Message) => msg.senderId === CURRENT_USER_ID;

    /* ---------------- SEND / UPDATE MESSAGE ---------------- */

    const handleSend = () => {
        if (!input.trim()) return;

        if (editMsg) {
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === editMsg.id
                        ? { ...m, text: input, edited: true }
                        : m
                )
            );
            setEditMsg(null);
        } else {
            const newMsg: Message = {
                id: Date.now().toString(),
                text: input,
                senderId: CURRENT_USER_ID,
                type: "text",
                createdAt: Date.now(),
                replyTo: replyMsg?.id,
            };

            setMessages((prev) => [...prev, newMsg]);
        }

        setInput("");
        setReplyMsg(null);
    };

    /* ---------------- ACTIONS ---------------- */

    const deleteForMe = () => {
        if (!selectedMsg) return;
        setMessages((prev) => prev.filter((m) => m.id !== selectedMsg.id));
        setSelectedMsg(null);
    };

    const deleteForEveryone = () => {
        if (!selectedMsg) return;
        setMessages((prev) =>
            prev.map((m) =>
                m.id === selectedMsg.id
                    ? { ...m, deletedForAll: true }
                    : m
            )
        );
        setSelectedMsg(null);
    };

    const pinMessage = () => {
        if (!selectedMsg) return;
        setMessages((prev) =>
            prev.map((m) =>
                m.id === selectedMsg.id ? { ...m, pinned: true } : m
            )
        );
        setSelectedMsg(null);
    };

    const addReaction = (emoji: string) => {
        if (!selectedMsg) return;
        setMessages((prev) =>
            prev.map((m) =>
                m.id === selectedMsg.id
                    ? { ...m, reaction: emoji }
                    : m
            )
        );
        setShowEmoji(false);
        setSelectedMsg(null);
    };

    /* ---------------- UI ---------------- */

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFDF5" }}>
            {/* HEADER WITH BACK + ACTIONS */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderBottomWidth: 1,
                    borderBottomColor: "#EEE",
                }}
            >
                {/* Back */}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000080" />
                </TouchableOpacity>

                {/* Title */}
                <View style={{ marginLeft: 12 }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#000080" }}>
                        {title || "Chat"}
                    </Text>
                    {isGroup && (
                        <Text style={{ fontSize: 12, color: "#777" }}>
                            Group chat
                        </Text>
                    )}
                </View>

                {/* Actions */}
                <View style={{ flexDirection: "row", marginLeft: "auto" }}>
                    <TouchableOpacity
                        style={{ marginHorizontal: 10 }}
                        onPress={() => Alert.alert("Call", "Call (UI only)")}
                    >
                        <Ionicons name="call-outline" size={22} color="#000080" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginHorizontal: 10 }}
                        onPress={() => Alert.alert("Video", "Video call (UI only)")}
                    >
                        <Ionicons name="videocam-outline" size={22} color="#000080" />
                    </TouchableOpacity>

                    {isGroup && (
                        <TouchableOpacity
                            style={{ marginHorizontal: 10 }}
                            onPress={() =>
                                Alert.alert(
                                    "Group Info",
                                    "Group info screen will be added later"
                                )
                            }
                        >
                            <Ionicons
                                name="information-circle-outline"
                                size={22}
                                color="#000080"
                            />
                        </TouchableOpacity>
                    )}

                </View>
            </View>

            {/* MESSAGE LIST */}
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <MessageBubble
                        item={item}
                        isMe={isMe(item)}
                        isGroup={isGroup}
                        onLongPress={() => setSelectedMsg(item)}
                    />
                )}
            />

            {/* EMOJI BAR */}
            {showEmoji && <EmojiBar onSelect={addReaction} />}

            {/* REPLY PREVIEW */}
            {replyMsg && (
                <View
                    style={{
                        padding: 8,
                        backgroundColor: "#FFEFD6",
                        marginHorizontal: 12,
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ fontSize: 12 }}>
                        Replying to: {replyMsg.text}
                    </Text>
                </View>
            )}

            {/* INPUT BAR */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    backgroundColor: "#FFF7D6",
                }}
            >
                <TouchableOpacity>
                    <Ionicons name="attach" size={24} color="#000080" />
                </TouchableOpacity>

                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Message..."
                    style={{
                        flex: 1,
                        backgroundColor: "#FFF",
                        marginHorizontal: 10,
                        borderRadius: 20,
                        paddingHorizontal: 14,
                    }}
                />

                <TouchableOpacity onPress={handleSend}>
                    <Ionicons name="send" size={24} color="#FFAA33" />
                </TouchableOpacity>
            </View>

            {/* ACTION SHEET */}
            {selectedMsg && (
                <ActionSheet
                    isMe={isMe(selectedMsg)}
                    onEdit={() => {
                        setEditMsg(selectedMsg);
                        setInput(selectedMsg.text || "");
                        setSelectedMsg(null);
                    }}
                    onDelete={deleteForMe}
                    onDeleteAll={deleteForEveryone}
                    onReply={() => {
                        setReplyMsg(selectedMsg);
                        setSelectedMsg(null);
                    }}
                    onPin={pinMessage}
                    onEmoji={() => setShowEmoji(true)}
                    onClose={() => setSelectedMsg(null)}
                />
            )}
        </View>
    );
}
