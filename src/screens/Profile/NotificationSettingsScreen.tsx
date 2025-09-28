// src/screens/NotificationSettingsScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Switch,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { showMessage } from "react-native-flash-message";
import AppLayout from "../../components/AppLayout";

const NotificationSettingsScreen = () => {
    const navigation = useNavigation();
    const [settings, setSettings] = useState({
        allNotifications: true,
        messages: true,
        gifts: true,
        payments: true,
        newUsers: false,
    });

    // 🔔 Notify wrapper (cleaner)
    const notify = (msg: string, type: "success" | "info" | "danger" = "success") =>
        showMessage({ message: msg, type });

    const handleToggle = (key: keyof typeof settings) => {
        if (key === "allNotifications") {
            const newValue = !settings.allNotifications;
            setSettings({
                allNotifications: newValue,
                messages: newValue,
                gifts: newValue,
                payments: newValue,
                newUsers: newValue,
            });
        } else {
            const newSettings = { ...settings, [key]: !settings[key] };
            const allEnabled = ["messages", "gifts", "payments", "newUsers"].every(
                (k) => newSettings[k as keyof typeof settings]
            );
            newSettings.allNotifications = allEnabled;
            setSettings(newSettings);
        }
    };

    const handleSaveChanges = () => {
        notify("Notification settings updated successfully!", "success");
    };

    return (
        <AppLayout>
            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                bounces
                decelerationRate="normal"
                scrollEventThrottle={10}
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtn}
                    >
                        <Ionicons name="arrow-back" size={20} color="#1E40AF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notification Settings</Text>
                </View>

                {/* Card */}
                <View style={styles.card}>
                    <LinearGradient
                        colors={["#fdedbbff", "#fafafaff"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ padding: 12, borderRadius: 6 }}
                    >
                        <Text style={styles.cardHeaderText}>Push Notifications</Text>
                    </LinearGradient>

                    {/* All Notifications */}
                    {renderRow(
                        "notifications-outline",
                        "All Notifications",
                        settings.allNotifications,
                        () => handleToggle("allNotifications")
                    )}
                    <View style={styles.separator} />

                    {/* Individual */}
                    <View style={styles.innerContainer}>
                        {renderRow(
                            "chatbubble-outline",
                            "Message Notifications",
                            settings.messages,
                            () => handleToggle("messages")
                        )}
                        {renderRow(
                            "gift-outline",
                            "Gift Notifications",
                            settings.gifts,
                            () => handleToggle("gifts")
                        )}
                        {renderRow(
                            "card-outline",
                            "Payment Notifications",
                            settings.payments,
                            () => handleToggle("payments")
                        )}
                        {renderRow(
                            "person-add-outline",
                            "New User Notifications",
                            settings.newUsers,
                            () => handleToggle("newUsers")
                        )}
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveBtn} onPress={handleSaveChanges}>
                    <Text style={styles.saveBtnText}>Save Changes</Text>
                </TouchableOpacity>
            </ScrollView>
        </AppLayout>
    );
};

// ✅ helper to avoid repetition
const renderRow = (
    icon: string,
    label: string,
    value: boolean,
    onToggle: () => void
) => (
    <View style={styles.row}>
        <View style={styles.rowLeft}>
            <Ionicons name={icon} size={20} color="#1E1E1E" style={styles.icon} />
            <Text style={styles.rowText}>{label}</Text>
        </View>
        <Switch
            value={value}
            trackColor={{ false: "#D9CFC7", true: "#FF8C00" }}
            thumbColor={"#fff"}
            onValueChange={onToggle}
        />
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, paddingVertical: 16 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    backBtn: { padding: 6, marginRight: 8 },
    icon: { marginRight: 12 },
    headerTitle: { fontSize: 18, fontWeight: "600", color: "#1E3A8A" },
    card: {
        borderRadius: 12,
        backgroundColor: "#fff",
        elevation: 2,
        marginBottom: 16,
    },
    cardHeaderText: { fontWeight: "500", color: "#000080" },
    innerContainer: { paddingLeft: 16 },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    rowLeft: { flexDirection: "row", alignItems: "center" },
    rowText: { fontSize: 15, color: "#1E1E1E" },
    separator: { height: 1, backgroundColor: "#ddd", marginHorizontal: 12 },
    saveBtn: {
        backgroundColor: "#FF7F32",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        marginBottom: 12,
    },
    saveBtnText: { color: "#fff", fontWeight: "500" },
});

export default NotificationSettingsScreen;
