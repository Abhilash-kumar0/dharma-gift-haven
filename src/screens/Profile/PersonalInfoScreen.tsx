// src/screens/PersonalInfoScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import LinearGradient from "react-native-linear-gradient";
import AppLayout from "../../components/AppLayout";

// ---------------------
// Helper
// ---------------------
const notify = (message: string, type: "success" | "danger" | "info") => {
    showMessage({ message, type });
};

const PersonalInfoScreen = () => {
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState("Rahul");
    const [lastName, setLastName] = useState("Agarwal");
    const [address, setAddress] = useState("123 Main St, Mumbai, Maharashtra");
    const [phoneNumber, setPhoneNumber] = useState("+91 9876543210");
    const [newPhone, setNewPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpDialog, setShowOtpDialog] = useState(false);

    const handleSaveChanges = () => {
        notify("Personal information updated successfully!", "success");
    };

    const handleSendOtp = () => {
        if (newPhone) {
            setShowOtpDialog(true);
            notify("OTP sent to your new phone number", "info");
        } else {
            notify("Please enter a valid phone number", "danger");
        }
    };

    const handleVerifyOtp = () => {
        if (otp) {
            setPhoneNumber(newPhone);
            setShowOtpDialog(false);
            setNewPhone("");
            setOtp("");
            notify("Phone number verified successfully!", "success");
        } else {
            notify("Please enter a valid OTP", "danger");
        }
    };

    return (
        <AppLayout>
            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode="never"
                bounces={true}
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
                        <Ionicons name="arrow-back" size={20} color="#1E3A8A" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Personal Information</Text>
                </View>

                {/* Profile Card */}
                <View style={styles.card}>
                    <LinearGradient
                        colors={["#fdedbbff", "#fafafaff"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ padding: 12, borderRadius: 6 }}
                    >
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardHeaderText}>Profile Details</Text>
                        </View>
                    </LinearGradient>
                    <View style={styles.cardBody}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            value={firstName}
                            onChangeText={setFirstName}
                            style={styles.input}
                        />

                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            value={lastName}
                            onChangeText={setLastName}
                            style={styles.input}
                        />
                    </View>
                </View>

                {/* Contact Card */}
                <View style={styles.card}>
                    <LinearGradient
                        colors={["#fdedbbff", "#fafafaff"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ padding: 12, borderRadius: 6 }}
                    >
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardHeaderText}>Contact Information</Text>
                        </View>
                    </LinearGradient>
                    <View style={styles.cardBody}>
                        <Text style={styles.label}>Address</Text>
                        <TextInput
                            value={address}
                            onChangeText={setAddress}
                            style={styles.input}
                        />

                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.row}>
                            <TextInput
                                value={phoneNumber}
                                editable={false}
                                style={[styles.input, { flex: 1 }]}
                            />
                            <TouchableOpacity
                                style={styles.outlineBtn}
                                onPress={() => setShowOtpDialog(true)}
                            >
                                <Text style={styles.outlineBtnText}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveBtn} onPress={handleSaveChanges}>
                    <Text style={styles.saveBtnText}>Save Changes</Text>
                </TouchableOpacity>

                {/* OTP Modal */}
                <Modal
                    visible={showOtpDialog}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setShowOtpDialog(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            {/* Close Button */}
                            <TouchableOpacity
                                style={styles.closeIcon}
                                onPress={() => setShowOtpDialog(false)}
                            >
                                <Ionicons name="close" size={20} color="#333" />
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>Change Phone Number</Text>
                            <Text style={styles.modalDesc}>
                                Enter your new phone number and verify with OTP.
                            </Text>

                            <TextInput
                                value={newPhone}
                                onChangeText={setNewPhone}
                                placeholder="+91 xxxxxxxxxx"
                                style={styles.input}
                            />
                            <TouchableOpacity style={styles.outlineBtn} onPress={handleSendOtp}>
                                <Text style={styles.outlineBtnText}>Send OTP</Text>
                            </TouchableOpacity>

                            <TextInput
                                value={otp}
                                onChangeText={setOtp}
                                placeholder="Enter OTP"
                                style={styles.input}
                            />

                            <View style={styles.modalActions}>
                                <TouchableOpacity
                                    style={[styles.outlineBtn, { flex: 1, marginRight: 8 }]}
                                    onPress={() => setShowOtpDialog(false)}
                                >
                                    <Text style={styles.outlineBtnText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.saveBtn, { flex: 1 }]}
                                    onPress={handleVerifyOtp}
                                >
                                    <Text style={styles.saveBtnText}>Verify & Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </AppLayout>
    );
};

export default PersonalInfoScreen;

// Styles remain unchanged
const styles = StyleSheet.create({
    container: { flex: 1, paddingVertical: 16 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    backBtn: { padding: 6, marginRight: 8 },
    headerTitle: { fontSize: 18, fontWeight: "600", color: "#1E3A8A" },
    card: {
        borderWidth: 1,
        borderColor: "rgba(218,165,32,0.2)",
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: "#fff",
        overflow: "hidden",
        elevation: 2,
    },
    cardHeader: {},
    cardHeaderText: { fontWeight: "500", color: "#000080" },
    cardBody: { padding: 12 },
    label: { fontSize: 13, color: "#000080", marginBottom: 4 },
    input: {
        borderWidth: 1,
        borderColor: "rgba(218,165,32,0.3)",
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
    },
    row: { flexDirection: "row", alignItems: "center", gap: 8 },
    outlineBtn: {
        borderWidth: 1,
        borderColor: "#000080",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    outlineBtnText: { color: "#000080", fontWeight: "500" },
    saveBtn: {
        backgroundColor: "#FF7F32",
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
        marginBottom: 12,
    },
    saveBtnText: { color: "#fff", fontWeight: "600" },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
    },
    closeIcon: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
        padding: 4,
    },
    modalTitle: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
    modalDesc: { fontSize: 14, color: "#555", marginBottom: 12 },
    modalActions: { flexDirection: "row", marginTop: 12 },
});
