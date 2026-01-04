import React from "react";
import { View, Text } from "react-native";

const emojis = ["❤️", "😂", "👍", "😮", "😢"];

export default function EmojiBar({ onSelect }: any) {
    return (
        <View style={{ flexDirection: "row", padding: 8 }}>
            {emojis.map(e => (
                <Text
                    key={e}
                    style={{ fontSize: 24, marginHorizontal: 6 }}
                    onPress={() => onSelect(e)}
                >
                    {e}
                </Text>
            ))}
        </View>
    );
}
