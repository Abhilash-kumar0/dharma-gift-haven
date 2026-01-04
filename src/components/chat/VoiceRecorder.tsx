import React from "react";
import { View, Text } from "react-native";

export default function VoiceRecorder() {
  return (
    <View
      style={{
        height: 40,
        backgroundColor: "#EEE",
        borderRadius: 20,
        justifyContent: "center",
        paddingHorizontal: 16,
      }}
    >
      <Text>🎙 Recording waveform ────</Text>
    </View>
  );
}
