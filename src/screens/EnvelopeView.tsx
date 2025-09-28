// src/screens/EnvelopeView.tsx
import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import AppLayout from "../components/AppLayout";

// Mock envelopeData - replace with real API if needed
const envelopeData = [
    { id: 1, sender: "Ramesh", message: "Happy Birthday 🎉" },
    { id: 2, sender: "Sita", message: "Best Wishes 🙏" },
];

const EnvelopeView = () => {
    const route = useRoute<any>();
    const navigation = useNavigation();
    const { id } = route.params || {}; // coming from navigate()

    const [showDialog, setShowDialog] = useState(false);
    const [thanksSent, setThanksSent] = useState(false);

    // Envelope lookup
    const envelope = useMemo(() => {
        return envelopeData.find((env) => env.id === Number(id)) || envelopeData[0];
    }, [id]);

    const senderName = envelope.sender || "Anonymous";
    const amount = "₹2,100";
    const message =
        envelope.message ||
        "Wishing you joy, prosperity and a blessed future together.";

    const handleBack = () => {
        navigation.goBack();
    };

    const handleSendThanks = () => {
        setThanksSent(true);
        setShowDialog(false);

        Toast.show({
            type: "success",
            text1: "Thanks sent!",
            text2: `Your message has been delivered to ${senderName}`,
            position: "top",
            visibilityTime: 2000,
            autoHide: true,
        });
    };

    return (
        <AppLayout>
            <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Gift Envelope</Text>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <Text style={styles.subText}>You received a gift from</Text>
                <Text style={styles.senderName}>{senderName}</Text>

                <TouchableOpacity
                    style={styles.envelopeCard}
                    onPress={() => setShowDialog(true)}
                >
                    <Ionicons name="gift" size={40} color="#FF6600" />
                    <Text style={styles.amount}>{amount}</Text>
                </TouchableOpacity>
            </View>

            {/* Dialog simulation */}
            {showDialog && (
                <View style={styles.dialog}>
                    <Text style={styles.dialogTitle}>Gift from {senderName}</Text>
                    <Text style={styles.dialogText}>{message}</Text>
                    <Text style={styles.dialogAmount}>{amount}</Text>

                    {!thanksSent ? (
                        <TouchableOpacity style={styles.btn} onPress={handleSendThanks}>
                            <Text style={styles.btnText}>Send Thanks 🙏</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={{ color: "green", marginTop: 10 }}>
                            Thanks already sent ✔
                        </Text>
                    )}

                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: "#999" }]}
                        onPress={() => setShowDialog(false)}
                    >
                        <Text style={styles.btnText}>Close</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
        </AppLayout>
    );
};

export default EnvelopeView;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#003366",
        padding: 14,
    },
    backBtn: { marginRight: 10 },
    headerTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    subText: { fontSize: 14, color: "#800000" },
    senderName: {
        fontSize: 20,
        fontWeight: "700",
        color: "#003366",
        marginVertical: 8,
    },
    envelopeCard: {
        backgroundColor: "#fff9e6",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 30,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    amount: { fontSize: 18, color: "#FF6600", marginTop: 8 },
    dialog: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    dialogTitle: { fontSize: 18, fontWeight: "700", color: "#003366" },
    dialogText: { fontSize: 14, marginVertical: 8, color: "#333" },
    dialogAmount: { fontSize: 20, fontWeight: "bold", color: "#FF6600" },
    btn: {
        backgroundColor: "#FF6600",
        padding: 12,
        borderRadius: 8,
        marginTop: 12,
        alignItems: "center",
    },
    btnText: { color: "#fff", fontWeight: "600" },
});
