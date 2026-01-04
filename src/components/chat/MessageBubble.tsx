import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../theme/colours";

export default function MessageBubble({ item, onLongPress }: any) {
    if (item.deletedForAll) {
        return (
            <Text style={{ alignSelf: "center", color: "#888" }}>
                Message deleted
            </Text>
        );
    }

    const isMe = item.sender === "me";

    return (
        <TouchableOpacity onLongPress={() => onLongPress(item)}>
            <View
                style={{
                    backgroundColor: isMe ? COLORS.bubbleMe : COLORS.bubbleOther,
                    padding: 12,
                    borderRadius: 14,
                    alignSelf: isMe ? "flex-end" : "flex-start",
                    maxWidth: "75%",
                    marginVertical: 6,
                }}
            >
                {item.pinned && <Text>📌</Text>}

                {item.replyTo && (
                    <Text style={{ fontSize: 12, color: COLORS.navy }}>
                        Reply: {item.replyTo.text}
                    </Text>
                )}

                {item.type === "voice" ? (
                    <Text>🎙 Voice message ────▶</Text>
                ) : (
                    <Text style={{ color: isMe ? "#FFF" : COLORS.navy }}>
                        {item.text}
                    </Text>
                )}

                {item.edited && <Text style={{ fontSize: 10 }}>(edited)</Text>}

                {item.reaction && (
                    <Text style={{ position: "absolute", bottom: -10, right: -5 }}>
                        {item.reaction}
                    </Text>
                )}
            </View>

            {isMe && (
                <Ionicons name="checkmark-done" size={14} color="green" />
            )}
        </TouchableOpacity>
    );
}
