// src/screens/BankDetailsScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { showMessage } from "react-native-flash-message";
import AppLayout from "../../components/AppLayout";

type BankAccount = {
    id: number;
    bankName: string;
    accountNumber: string;
    ifsc: string;
    accountType: "Savings" | "Current";
    isPrimary: boolean;
};

// Default accounts
const defaultAccounts: BankAccount[] = [
    {
        id: 1,
        bankName: "State Bank of India",
        accountNumber: "************1234",
        ifsc: "SBIN0001234",
        accountType: "Savings",
        isPrimary: true,
    },
    {
        id: 2,
        bankName: "HDFC Bank",
        accountNumber: "************5678",
        ifsc: "HDFC0005678",
        accountType: "Current",
        isPrimary: false,
    },
];

const BankDetailsScreen = () => {
    const navigation = useNavigation();

    const [accounts, setAccounts] = useState<BankAccount[]>(defaultAccounts);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingAccount, setEditingAccount] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        bankName: "",
        accountNumber: "",
        confirmAccountNumber: "",
        ifsc: "",
        accountType: "Savings" as "Savings" | "Current",
        isPrimary: false,
    });

    const handleBack = () => {
        if (showAddForm || showEditForm) {
            setShowAddForm(false);
            setShowEditForm(false);
            setEditingAccount(null);
            resetForm();
        } else {
            navigation.goBack();
        }
    };

    const resetForm = () => {
        setFormData({
            bankName: "",
            accountNumber: "",
            confirmAccountNumber: "",
            ifsc: "",
            accountType: "Savings",
            isPrimary: false,
        });
    };

    const handleEdit = (id: number) => {
        const account = accounts.find((acc) => acc.id === id);
        if (account) {
            setFormData({
                bankName: account.bankName,
                accountNumber: account.accountNumber.replace(/\*/g, ""),
                confirmAccountNumber: account.accountNumber.replace(/\*/g, ""),
                ifsc: account.ifsc,
                accountType: account.accountType,
                isPrimary: account.isPrimary,
            });
            setEditingAccount(id);
            setShowEditForm(true);
        }
    };

    const handleDelete = (id: number) => {
        setAccounts((prev) => prev.filter((acc) => acc.id !== id));
        showMessage({ message: "Bank account removed successfully", type: "success" });
    };

    const handleSetPrimary = (id: number) => {
        setAccounts((prev) =>
            prev.map((acc) => ({
                ...acc,
                isPrimary: acc.id === id,
            }))
        );
        showMessage({ message: "Primary account updated successfully", type: "success" });
    };

    const handleSubmit = () => {
        if (formData.accountNumber !== formData.confirmAccountNumber) {
            showMessage({ message: "Account numbers do not match", type: "danger" });
            return;
        }

        if (showAddForm) {
            const newAccount: BankAccount = {
                id: Date.now(),
                bankName: formData.bankName,
                accountNumber: formData.accountNumber.replace(/\d(?=\d{4})/g, "*"),
                ifsc: formData.ifsc,
                accountType: formData.accountType,
                isPrimary: formData.isPrimary || accounts.length === 0,
            };

            if (newAccount.isPrimary) {
                setAccounts((prev) => prev.map((acc) => ({ ...acc, isPrimary: false })));
            }

            setAccounts((prev) => [...prev, newAccount]);
            showMessage({ message: "Bank account added successfully", type: "success" });
        } else if (showEditForm && editingAccount) {
            setAccounts((prev) =>
                prev.map((acc) => {
                    if (acc.id === editingAccount) {
                        return {
                            ...acc,
                            bankName: formData.bankName,
                            accountNumber: formData.accountNumber.replace(/\d(?=\d{4})/g, "*"),
                            ifsc: formData.ifsc,
                            accountType: formData.accountType,
                            isPrimary: formData.isPrimary ? true : acc.isPrimary,
                        };
                    }
                    if (formData.isPrimary) {
                        return { ...acc, isPrimary: acc.id === editingAccount };
                    }
                    return acc;
                })
            );
            showMessage({ message: "Bank account updated successfully", type: "success" });
        }

        setShowAddForm(false);
        setShowEditForm(false);
        setEditingAccount(null);
        resetForm();
    };

    return (
        <AppLayout>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={20} color="#1E40AF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        {showAddForm ? "Add Bank Account" : showEditForm ? "Edit Bank Account" : "Bank Accounts"}
                    </Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                    {/* List of accounts */}
                    {!showAddForm && !showEditForm && (
                        <>
                            {accounts.map((account) => (
                                <View key={account.id} style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <View>
                                            <Text style={styles.bankName}>{account.bankName}</Text>
                                            <Text style={styles.accountNumber}>{account.accountNumber}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => handleEdit(account.id)}>
                                            <Ionicons name="pencil" size={16} color="#000080" />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.meta}>IFSC: {account.ifsc}</Text>
                                    <Text style={styles.meta}>Account Type: {account.accountType}</Text>

                                    <View style={styles.actions}>
                                        {account.isPrimary ? (
                                            <View style={styles.primaryBadge}>
                                                <Ionicons name="checkmark" size={12} color="green" />
                                                <Text style={styles.primaryText}>Primary Account</Text>
                                            </View>
                                        ) : (
                                            <TouchableOpacity
                                                style={styles.primaryButton}
                                                onPress={() => handleSetPrimary(account.id)}
                                            >
                                                <Text style={styles.primaryButtonText}>Set as Primary</Text>
                                            </TouchableOpacity>
                                        )}

                                        {!account.isPrimary && (
                                            <TouchableOpacity
                                                style={styles.removeButton}
                                                onPress={() => handleDelete(account.id)}
                                            >
                                                <Text style={styles.removeButtonText}>Remove</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            ))}

                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => setShowAddForm(true)}
                            >
                                <Text style={styles.addButtonText}>Add New Bank Account</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {/* Add/Edit form */}
                    {(showAddForm || showEditForm) && (
                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder="Bank Name"
                                value={formData.bankName}
                                onChangeText={(text) => setFormData((p) => ({ ...p, bankName: text }))}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Account Number"
                                value={formData.accountNumber}
                                onChangeText={(text) => setFormData((p) => ({ ...p, accountNumber: text }))}
                                secureTextEntry
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Account Number"
                                value={formData.confirmAccountNumber}
                                onChangeText={(text) => setFormData((p) => ({ ...p, confirmAccountNumber: text }))}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="IFSC Code"
                                value={formData.ifsc}
                                onChangeText={(text) => setFormData((p) => ({ ...p, ifsc: text }))}
                            />

                            {/* Account Type */}
                            <View style={styles.radioGroup}>
                                <TouchableOpacity
                                    style={styles.radioOption}
                                    onPress={() => setFormData((p) => ({ ...p, accountType: "Savings" }))}
                                >
                                    <Ionicons
                                        name={formData.accountType === "Savings" ? "radio-button-on" : "radio-button-off"}
                                        size={18}
                                        color="#FF7F32"
                                    />
                                    <Text style={styles.radioLabel}>Savings</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.radioOption}
                                    onPress={() => setFormData((p) => ({ ...p, accountType: "Current" }))}
                                >
                                    <Ionicons
                                        name={formData.accountType === "Current" ? "radio-button-on" : "radio-button-off"}
                                        size={18}
                                        color="#FF7F32"
                                    />
                                    <Text style={styles.radioLabel}>Current</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Primary account */}
                            <View style={styles.switchRow}>
                                <Text style={styles.switchLabel}>Set as primary account</Text>
                                <Switch
                                    value={formData.isPrimary}
                                    trackColor={{ false: "#D9CFC7", true: "#FF8C00" }}
                                    thumbColor={"#fff"}
                                    onValueChange={(value) => setFormData((p) => ({ ...p, isPrimary: value }))}
                                />
                            </View>

                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.submitButtonText}>
                                    {showAddForm ? "Add Account" : "Update Account"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </View>
        </AppLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingVertical: 16 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    backButton: { marginRight: 8 },
    headerTitle: { fontSize: 18, fontWeight: "600", color: "#1E40AF" },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
         // subtle shadow (keeps card feel)
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 1,
    },
    cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
    bankName: { fontSize: 16, fontWeight: "500", color: "#000080" },
    accountNumber: { fontSize: 14, color: "#4B5563" },
    meta: { fontSize: 12, color: "#6B7280", marginBottom: 2 },

    actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
    primaryBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#ECFDF5", padding: 6, borderRadius: 6 },
    primaryText: { fontSize: 12, color: "green", marginLeft: 4 },
    primaryButton: { borderWidth: 1, borderColor: "#000080", borderRadius: 6, paddingVertical: 4, paddingHorizontal: 8 },
    primaryButtonText: { fontSize: 12, color: "#000080" },
    removeButton: { borderWidth: 1, borderColor: "#DC2626", borderRadius: 6, paddingVertical: 4, paddingHorizontal: 8 },
    removeButtonText: { fontSize: 12, color: "#DC2626" },

    addButton: { backgroundColor: "#F97316", borderRadius: 8, paddingVertical: 12, marginTop: 12, alignItems: "center" },
    addButtonText: { color: "#fff", fontWeight: "500" },

    form: { marginTop: 12 },
    input: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        fontSize: 14,
    },

    radioGroup: { flexDirection: "row", marginTop: 8, marginBottom: 12 },
    radioOption: { flexDirection: "row", alignItems: "center", marginRight: 16 },
    radioLabel: { marginLeft: 6, fontSize: 14, color: "#374151" },

    switchRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    switchLabel: { fontSize: 14, color: "#374151" },

    submitButton: { backgroundColor: "#F97316", borderRadius: 8, paddingVertical: 12, alignItems: "center", marginTop: 8 },
    submitButtonText: { color: "#fff", fontWeight: "500" },
});

export default BankDetailsScreen;
