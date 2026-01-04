import React, { useRef, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    StyleSheet,
    Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dialog, Portal, Button, Provider as PaperProvider } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const EnvelopeView = () => {
    const navigation = useNavigation();
    const { params } = useRoute();
    const envelopeId = params?.id ?? 0;

    // Example static envelope data - replace with actual data fetch
    const envelopeData = [
        {
            id: 0,
            sender: "Sharma Family",
            message:
                "Wishing you a lifetime of love and happiness on your special day. Congratulations!",
            amount: "₹2,100",
        },
        // add more envelopes here
    ];

    const envelope = envelopeData.find((env) => env.id === envelopeId) || envelopeData[0];

    const [opened, setOpened] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [thanksSent, setThanksSent] = useState(false);

    // Animation value for flap rotation
    const flapAnim = useRef(new Animated.Value(0)).current;

    const openEnvelope = () => {
        Animated.timing(flapAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start(() => {
            setOpened(true);
            setShowDialog(true);
        });
    };

    // Interpolated flap rotation
    const flapRotate = flapAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "-90deg"], // flap rotates upwards to reveal envelope
    });

    return (
        <PaperProvider>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={24} color="#1B2A49" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Gift Envelope</Text>
                </View>

                {/* Sender info */}
                <View style={styles.senderContainer}>
                    <Text style={styles.senderLabel}>You received a gift from</Text>
                    <Text style={styles.senderName}>{envelope.sender}</Text>
                </View>

                {/* Envelope */}
                <View style={styles.envelopeWrapper}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={openEnvelope}
                        disabled={opened}
                    >
                        <View style={styles.envelopeShadow}>
                            <Animated.View
                                style={[
                                    styles.envelopeFlap,
                                    {
                                        transform: [{ rotateX: flapRotate }],
                                    },
                                ]}
                            />
                            <View style={styles.envelopeBody}>
                                {opened ? (
                                    <View style={styles.amountCard}>
                                        <Icon name="currency-inr" size={26} color="#FF8D00" />
                                        <Text style={styles.amountText}>{envelope.amount}</Text>
                                        <Text style={styles.amountLabel}>Gift Amount</Text>
                                    </View>
                                ) : (
                                    <Text style={styles.tapText}>Tap to open</Text>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Gift message dialog */}
                <Portal>
                    <Dialog
                        visible={showDialog}
                        onDismiss={() => setShowDialog(false)}
                        style={styles.dialog}
                    >
                        <Dialog.Title style={styles.dialogTitle}>Auspicious Gift</Dialog.Title>
                        <Dialog.Content style={styles.dialogContent}>
                            <Icon
                                name="gift-outline"
                                size={40}
                                color="#FF8D00"
                                style={{ marginBottom: 12 }}
                            />
                            <View style={styles.dialogAmountCard}>
                                <Icon name="currency-inr" color="#FF8D00" size={22} />
                                <Text style={styles.dialogAmountText}>{envelope.amount}</Text>
                            </View>
                            <Text style={styles.message}>{envelope.message}</Text>
                            <Text style={styles.fromText}>From: {envelope.sender}</Text>
                        </Dialog.Content>
                        <Dialog.Actions style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                            <Button
                                mode="contained"
                                onPress={() => {
                                    setThanksSent(true);
                                    setShowDialog(false);
                                }}
                                disabled={thanksSent}
                                style={styles.thanksButton}
                                labelStyle={styles.thanksLabel}
                            >
                                {thanksSent ? "Thanks Sent!" : "Send Thanks"}
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FEF9E7" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingTop: 16,
        paddingBottom: 20,
    },
    headerTitle: {
        color: "#1B2A49",
        fontWeight: "700",
        fontSize: 20,
        marginLeft: 12,
    },
    senderContainer: { alignItems: "center", marginVertical: 40 },
    senderLabel: { color: "#8B3510", fontSize: 14, marginBottom: 6 },
    senderName: { color: "#1B2A49", fontWeight: "700", fontSize: 24 },
    envelopeWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
    envelopeShadow: {
        width: width * 0.7,
        height: 180,
        backgroundColor: "#FFD966",
        borderRadius: 16,
        shadowColor: "#d38500",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
        overflow: "hidden",
    },
    envelopeFlap: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: 90,
        backgroundColor: "#FFAB40",
        borderBottomWidth: 2,
        borderColor: "#d38500",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backfaceVisibility: "hidden",
        zIndex: 10,
    },
    envelopeBody: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    amountCard: {
        alignItems: "center",
        backgroundColor: "#FFFDED",
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 30,
        shadowColor: "#F8B500",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 15,
        shadowOpacity: 0.5,
        elevation: 8,
    },
    amountText: {
        fontSize: 28,
        color: "#1B2A49",
        fontWeight: "800",
        marginBottom: 6,
    },
    amountLabel: {
        fontSize: 14,
        color: "#8B3510",
    },
    tapText: {
        marginTop: 10,
        backgroundColor: "white",
        paddingVertical: 5,
        paddingHorizontal: 14,
        borderRadius: 12,
        color: "#1B2A49",
        fontWeight: "600",
        fontSize: 14,
    },
    dialog: {
        backgroundColor: "#FFF7DC",
        borderRadius: 20,
        marginHorizontal: 16,
    },
    dialogTitle: {
        color: "#8B3510",
        fontWeight: "700",
        fontSize: 22,
        textAlign: "center",
        paddingBottom: 8,
    },
    dialogContent: {
        alignItems: "center",
    },
    dialogAmountCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFDED",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: "#F8B500",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 12,
        shadowOpacity: 0.4,
        elevation: 5,
    },
    dialogAmountText: {
        fontWeight: "700",
        fontSize: 26,
        color: "#1B2A49",
        marginLeft: 10,
    },
    message: {
        fontSize: 14,
        textAlign: "center",
        color: "#1B2A49",
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    fromText: {
        fontSize: 12,
        color: "#346A7C",
    },
    thanksButton: {
        width: "100%",
        backgroundColor: "#FF9F00",
        borderRadius: 12,
    },
    thanksLabel: {
        fontWeight: "700",
    },
});

export default EnvelopeView;
