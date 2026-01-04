import React from "react";
import { View, Text } from "react-native";

export default function ActionSheet({
    onEdit,
    onDelete,
    onDeleteAll,
    onReply,
    onPin,
    onEmoji,
}: any) {
    return (
        <View style={{ backgroundColor: "#FFF7D6", padding: 16 }}>
            <Text onPress={onEdit}>✏️ Edit</Text>
            <Text onPress={onDelete}>🗑 Delete for me</Text>
            <Text onPress={onDeleteAll}>🚫 Delete for everyone</Text>
            <Text onPress={onReply}>↩ Reply</Text>
            <Text onPress={onPin}>📌 Pin</Text>
            <Text onPress={onEmoji}>😊 React</Text>
        </View>
    );
}
