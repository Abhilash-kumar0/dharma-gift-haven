// src/screens/KYCVerificationScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { launchImageLibrary, launchCamera, Asset } from "react-native-image-picker";
import AppLayout from "../../components/AppLayout";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const KYCVerificationScreen = () => {

    const navigation = useNavigation();

    // ✅ Form State
    const [aadhaarNumber, setAadhaarNumber] = useState("");
    const [panNumber, setPanNumber] = useState("");
    const [aadhaarFront, setAadhaarFront] = useState<Asset | null>(null);
    const [aadhaarBack, setAadhaarBack] = useState<Asset | null>(null);
    const [panCard, setPanCard] = useState<Asset | null>(null);
    const [selfie, setSelfie] = useState<Asset | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // ✅ Aadhaar & PAN Validation
    const validateInputs = () => {
        const newErrors: { [key: string]: string } = {};

        if (!/^\d{12}$/.test(aadhaarNumber)) {
            newErrors.aadhaar = "Enter a valid 12-digit Aadhaar number.";
        }

        if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNumber)) {
            newErrors.pan = "Enter a valid PAN number (e.g., ABCDE1234F).";
        }

        if (!aadhaarFront) newErrors.aadhaarFront = "Upload Aadhaar front.";
        if (!aadhaarBack) newErrors.aadhaarBack = "Upload Aadhaar back.";
        if (!panCard) newErrors.panCard = "Upload PAN card.";
        if (!selfie) newErrors.selfie = "Upload a selfie.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ Submit with API placeholder
    const handleSubmit = async () => {
        if (!validateInputs()) return;

        try {
            // Simulated API call
            console.log("Submitting KYC data:", {
                aadhaarNumber,
                panNumber,
                aadhaarFront,
                aadhaarBack,
                panCard,
                selfie,
            });

            // TODO: Replace with real API call
            // const res = await api.post("/kyc/submit", { ... })

            Alert.alert("Success", "Your KYC has been submitted for verification.");
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    // ✅ File Upload logic (supports gallery + camera for selfie)
    const handleUpload = async (docType: string, useCamera = false) => {
        const picker = useCamera ? launchCamera : launchImageLibrary;
        const result = await picker({
            mediaType: "photo",
            quality: 0.8,
            selectionLimit: 1,
        });

        if (result.didCancel) {
            console.log(`${docType} selection cancelled`);
            return;
        }

        if (result.assets && result.assets.length > 0) {
            const file: Asset = result.assets[0];
            const safeFile = {
                ...file,
                fileName: file.fileName || file.uri?.split("/").pop() || "file.jpg",
            };

            if (docType === "Aadhaar Front") setAadhaarFront(safeFile);
            if (docType === "Aadhaar Back") setAadhaarBack(safeFile);
            if (docType === "PAN Card") setPanCard(safeFile);
            if (docType === "Selfie") setSelfie(safeFile);
        }
    };

    // ✅ Upload UI
    const renderUploadBox = (
        label: string,
        file: Asset | null,
        onPress: () => void,
        error?: string
    ) => (
        <View style={styles.uploadBoxWrapper}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={onPress}>
                {file ? (
                    <>
                        <Image source={{ uri: file.uri }} style={styles.previewImage} />
                        <Text style={styles.fileName} numberOfLines={1}>
                            {file.fileName}
                        </Text>
                    </>
                ) : (
                    <>
                        <Ionicons name="cloud-upload-outline" size={32} color="#6B6FD1" />
                        <Text style={styles.uploadText}>Tap to upload</Text>
                        <View style={styles.selectBtn}>
                            <Text style={styles.selectBtnText}>Select File</Text>
                        </View>
                    </>
                )}
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );

    return (
        <AppLayout>
            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode="never"         // Android smooth effect
                bounces={true}                 // iOS bounce effect
                decelerationRate="normal"      // can also try "fast" for iOS-like
                scrollEventThrottle={10}
                contentContainerStyle={styles.container}>
                {/* Header */}
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                >
                    <View style={styles.header}>
                        <Ionicons name="arrow-back" size={20} color="#1A237E" />
                        <Text style={styles.title}>KYC Verification</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.subtitle}>
                    Complete your KYC verification to unlock all features and increase transaction limits.
                </Text>

                {/* Identity Section */}
                <View style={styles.section}>
                                        <LinearGradient
                        colors={["#fdedbbff", "#fafafaff"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ padding: 12, borderRadius: 6, marginBottom: 12 }}
                    >
                        <View style={styles.cardHeader}> 
                            <Text style={styles.cardHeaderText}>Identity Information</Text>
                        </View>
                    </LinearGradient>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Aadhaar Number</Text>
                        <TextInput
                            style={styles.input}
                            value={aadhaarNumber}
                            onChangeText={setAadhaarNumber}
                            placeholder="e.g., 1234 5678 9012"
                            keyboardType="numeric"
                            maxLength={12}
                        />
                        {errors.aadhaar && <Text style={styles.errorText}>{errors.aadhaar}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>PAN Card Number</Text>
                        <TextInput
                            style={styles.input}
                            value={panNumber}
                            onChangeText={setPanNumber}
                            placeholder="e.g., ABCPD1234E"
                            autoCapitalize="characters"
                            maxLength={10}
                        />
                        {errors.pan && <Text style={styles.errorText}>{errors.pan}</Text>}
                    </View>
                </View>

                {/* Document Upload Section */}
                <View style={styles.section}>
                    <LinearGradient
                        colors={["#fdedbbff", "#fafafaff"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ padding: 12, borderRadius: 6, marginBottom: 12 }}
                    >
                        <View style={styles.cardHeader}> 
                            <Text style={styles.cardHeaderText}>Document Upload</Text>
                        </View>
                    </LinearGradient>

                    {renderUploadBox("Aadhaar Card (Front)", aadhaarFront, () =>
                        handleUpload("Aadhaar Front"), errors.aadhaarFront
                    )}
                    {renderUploadBox("Aadhaar Card (Back)", aadhaarBack, () =>
                        handleUpload("Aadhaar Back"), errors.aadhaarBack
                    )}
                    {renderUploadBox("PAN Card", panCard, () =>
                        handleUpload("PAN Card"), errors.panCard
                    )}
                    {renderUploadBox("Selfie", selfie, () =>
                        handleUpload("Selfie", true), errors.selfie
                    )}
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    <Text style={styles.submitBtnText}>Submit for Verification</Text>
                </TouchableOpacity>
            </ScrollView>
        </AppLayout>
    );
};

const styles = StyleSheet.create({
    container: { paddingVertical: 16, paddingBottom: 80 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    backBtn: { padding: 6, marginRight: 8 },
    title: { fontSize: 18, fontWeight: "600", color: "#1A237E", marginLeft: 8 },
    subtitle: { fontSize: 14, color: "#555", marginBottom: 20 },
    section: {
        borderWidth: 1,
        borderColor: "rgba(218,165,32,0.2)",
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: "#fff",
        overflow: "hidden",
        elevation: 2,
    },
    cardHeader: {},
    cardHeaderText: { fontWeight: "500", color: "#000080", },
    inputGroup: { padding: 12 },
    label: { fontSize: 14, fontWeight: "500", color: "#000080", marginBottom: 6 },
    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 10,
        padding: 12,
        backgroundColor: "#fff",
        fontSize: 14,
    },
    uploadBoxWrapper: { marginBottom: 10, padding:12},
    uploadBox: {
        borderWidth: 1,
        borderColor: "rgba(218,165,32,0.3)",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 1,
    },
    uploadText: { marginTop: 8, fontSize: 14, color: "#6B6FD1", textAlign: "center" },
    selectBtn: {
        marginTop: 10,
        backgroundColor: "#FFFBEA",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    selectBtnText: { color: "#000080", fontWeight: "500" },
    previewImage: { width: 80, height: 80, borderRadius: 8, marginBottom: 8 },
    fileName: { fontSize: 12, color: "#333", maxWidth: 150 },
    submitBtn: {
        backgroundColor: "#FF9800",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    submitBtnText: { color: "#fff", fontWeight: "500" },
    errorText: { color: "red", fontSize: 12, marginTop: 4 },
});

export default KYCVerificationScreen;
