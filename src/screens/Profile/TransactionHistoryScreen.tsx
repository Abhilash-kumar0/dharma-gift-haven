// src/screens/TransactionHistoryScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppLayout from "../../components/AppLayout";
import { useNavigation } from "@react-navigation/native";

type Transaction = {
    id: string;
    name: string;
    date: string;
    amount: string;
    type: "received" | "sent";
    txnId: string;
};

const dummyData: Transaction[] = [
    {
        id: "1",
        name: "Priya Sharma",
        date: "5 Apr 2025",
        amount: "+₹5,000",
        type: "received",
        txnId: "TRX12345",
    },
    {
        id: "2",
        name: "Vikram Singh",
        date: "3 Apr 2025",
        amount: "+₹2,000",
        type: "received",
        txnId: "TRX98765",
    },
    {
        id: "3",
        name: "Rohit Kumar",
        date: "28 Mar 2025",
        amount: "+₹1,000",
        type: "received",
        txnId: "TRX78912",
    },
    {
        id: "4",
        name: "Meena Verma",
        date: "25 Mar 2025",
        amount: "-₹750",
        type: "sent",
        txnId: "TRX45678",
    },
];

const TransactionHistoryScreen = () => {

    const navigation = useNavigation();

    const [activeTab, setActiveTab] = useState<"all" | "received" | "sent">("all");
    const [query, setQuery] = useState("");

    const filteredData = dummyData.filter((item) => {
        const matchTab =
            activeTab === "all" ? true : item.type === activeTab;
        const matchSearch = item.name.toLowerCase().includes(query.toLowerCase());
        return matchTab && matchSearch;
    });

    const renderItem = ({ item }: { item: Transaction }) => (
        <View style={styles.card}>
            <View style={styles.cardLeft}>
                <View style={styles.iconCircle}>
                    <Ionicons
                        name={
                            item.type === "received"
                                ? "arrow-down-circle-outline"
                                : "arrow-up-circle-outline"
                        }
                        size={20}
                        color={item.type === "received" ? "#16a34a" : "#dc2626"}
                    />
                </View>
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
            </View>
            <View style={styles.cardRight}>
                <Text
                    style={[
                        styles.amount,
                        { color: item.type === "received" ? "#16a34a" : "#dc2626" },
                    ]}
                >
                    {item.amount}
                </Text>
                <Text style={styles.txnId}>{item.txnId}</Text>
            </View>
        </View>
    );

    return (
        <AppLayout>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtn}
                    >
                        <Ionicons name="arrow-back" size={20} color="#1E3A8A" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Transtion History</Text>
                </View>
                {/* Search */}
                <View style={styles.searchBox}>
                    <Ionicons name="search-outline" size={18} color="#666" />
                    <TextInput
                        placeholder="Search transactions..."
                        style={styles.input}
                        value={query}
                        onChangeText={setQuery}
                    />
                </View>

                {/* Tabs */}
                <View style={styles.tabs}>
                    {["all", "received", "sent"].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tab,
                                activeTab === tab && styles.activeTab,
                            ]}
                            onPress={() => setActiveTab(tab as any)}
                        >
                            <Ionicons
                                name={
                                    tab === "all"
                                        ? "list"
                                        : tab === "received"
                                            ? "arrow-down-circle-outline"
                                            : "arrow-up-circle-outline"
                                }
                                size={16}
                                color={activeTab === tab ? "#000080" : "#333"}
                                style={{ marginRight: 6 }}
                            />
                            <Text
                                style={[
                                    styles.tabLabel,
                                    activeTab === tab && styles.activeTabLabel,
                                ]}
                            >
                                {tab === "all"
                                    ? "All"
                                    : tab === "received"
                                        ? "Received"
                                        : "Sent"}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Transactions */}
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: 12 }}
                />
            </View>
        </AppLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingVertical: 16 },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    backBtn: { padding: 6, marginRight: 8 },
    headerTitle: { fontSize: 18, fontWeight: "600", color: "#1E3A8A" },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fffcf5ff",
        borderRadius: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#f0e6d2",
        marginBottom: 16,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 15,
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#ddd",
        borderRadius: 12,
        marginBottom: 16,
        padding: 2,
    },
    tab: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 10,
    },
    activeTab: {
        backgroundColor: "#fff8f0",
        borderWidth: 1,
        borderColor: "#ff7f32",
    },
    tabLabel: {
        fontSize: 14,
        color: "#333",
    },
    activeTabLabel: {
        color: "#000080",
        fontWeight: "600",
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 12,
        marginBottom: 12,
        borderRadius: 10,
        // subtle shadow (keeps card feel)
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 1,
    },
    cardLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    iconCircle: {
        backgroundColor: "#f3f3f3",
        borderRadius: 20,
        padding: 6,
        marginRight: 12,
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#111",
    },
    date: {
        fontSize: 13,
        color: "#666",
    },
    cardRight: {
        alignItems: "flex-end",
    },
    amount: {
        fontSize: 15,
        fontWeight: "600",
    },
    txnId: {
        fontSize: 12,
        color: "#666",
    },
});

export default TransactionHistoryScreen;
