import React, { useState } from "react";
import {
    View,
    Text,
    Switch,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AppLayout from "../../components/AppLayout";


// ---------------------
// Types
// ---------------------
type SwitchItem = {
    type: "switch";
    label: string;
    icon: { name: string; alt: string };
    stateKey: "darkMode"; // extend later if needed
};

type LinkItem = {
    type: "link";
    label: string;
    icon: string;
    value?: string;
    path: string;
};

type SettingsItem = SwitchItem | LinkItem;

type SettingsSection = {
    title: string;
    items: SettingsItem[];
};

// ---------------------
// JSON Sections
// ---------------------
const settingsSections: SettingsSection[] = [
    {
        title: "Appearance",
        items: [
            {
                type: "switch",
                label: "Dark Mode",
                icon: { name: "sunny", alt: "moon" },
                stateKey: "darkMode",
            },
        ],
    },
    {
        title: "Regional Settings",
        items: [
            {
                type: "link",
                label: "Language",
                icon: "globe-outline",
                value: "English",
                path: "LanguageScreen",
            },
            {
                type: "link",
                label: "Country",
                icon: "globe-outline",
                value: "India",
                path: "CountryScreen",
            },
            {
                type: "link",
                label: "Currency",
                icon: "cash-outline",
                value: "INR (₹)",
                path: "CurrencyScreen",
            },
        ],
    },
    {
        title: "Security",
        items: [
            {
                type: "link",
                label: "Security Questions",
                icon: "shield-checkmark-outline",
                path: "SecurityQuestionsScreen",
            },
        ],
    },
];

// ---------------------
// Component
// ---------------------
export default function SettingsScreen() {
    const navigation = useNavigation();

    // individual state variables for switches
    const [darkMode, setDarkMode] = useState(false);

    // map state keys → values
    const stateMap: Record<string, boolean> = {
        darkMode,
    };

    // map state keys → setters
    const setStateMap: Record<string, React.Dispatch<React.SetStateAction<boolean>>> = {
        darkMode: setDarkMode,
    };

    return (
        <AppLayout>
            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode="never"         // Android smooth effect
                bounces={true}                 // iOS bounce effect
                decelerationRate="normal"      // can also try "fast" for iOS-like
                scrollEventThrottle={10}
                style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={20} color="#1E3A8A" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Settings</Text>
                </View>
                {/* Render Sections (cards) */}
                {settingsSections.map((section, sectionIdx) => (
                    <View key={sectionIdx} style={styles.cardContainer}>
                        {/* Pale header area (same background as card container) */}
                        <LinearGradient
                            colors={[
                                "#fdedbbff", // dark blue (left)
                                "#fafafaff"  // light cream (right)
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ padding: 12, borderRadius: 6 }} // keep padding + optional rounded corners
                        >
                            <View>
                                <Text style={{ fontWeight: "500", color: "#000080" }}>{section.title}</Text>
                            </View>
                        </LinearGradient>

                        {/* White list rows inside the pale card */}
                        {section.items.map((item, itemIdx) => {
                            const isLast = itemIdx === section.items.length - 1;
                            const rowStyles = [
                                styles.itemRow,
                                itemIdx > 0 && styles.itemBorderTop,
                                isLast && styles.itemRowLast,
                            ];

                            if (item.type === "switch") {
                                return (
                                    <View key={itemIdx} style={rowStyles}>
                                        <Ionicons
                                            name={stateMap[item.stateKey] ? item.icon.alt : item.icon.name}
                                            size={20}
                                            color="#1E1E1E"
                                            style={styles.icon}
                                        />
                                        <Text style={styles.cardText}>{item.label}</Text>
                                        <Switch
                                            value={stateMap[item.stateKey]}
                                            onValueChange={setStateMap[item.stateKey]}
                                            trackColor={{ false: "#D9CFC7", true: "#FF8C00" }}
                                            thumbColor={"#fff"}
                                        />
                                    </View>
                                );
                            }

                            if (item.type === "link") {
                                return (
                                    <TouchableOpacity
                                        key={itemIdx}
                                        style={rowStyles}
                                        onPress={() => console.log("Navigate to:", item.path)}
                                    >
                                        <Ionicons
                                            name={item.icon}
                                            size={20}
                                            color="#1E1E1E"
                                            style={styles.icon}
                                        />
                                        <Text style={styles.cardText}>{item.label}</Text>
                                        <View style={styles.valueWrap}>
                                            {item.value ? <Text style={styles.valueText}>{item.value}</Text> : null}
                                            <Ionicons name="chevron-forward" color="#000080" style={{ marginLeft: 8 }} />
                                        </View>
                                    </TouchableOpacity>
                                );
                            }

                            return null;
                        })}
                    </View>
                ))}
            </ScrollView>
        </AppLayout>
    );
}

// ---------------------
// Styles (card-focused changes)
// ---------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
    },

    header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    backBtn: { padding: 6, marginRight: 8 },
    headerTitle: { fontSize: 18, fontWeight: "600", color: "#1E3A8A" },

    /* ---- Card container: pale rounded background ---- */
    cardContainer: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#FFFAE8", // pale yellow card background
        borderWidth: 1,
        borderColor: "#FFD58050",
        // subtle shadow (keeps card feel)
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 1,
    },

    /* ---- White item rows ---- */
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF", // white rows
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    itemBorderTop: {
        borderTopWidth: 1,
        borderColor: "#FFF3DA", // subtle divider between rows
    },
    itemRowLast: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },

    icon: {
        marginRight: 12,
    },
    cardText: {
        flex: 1,
        fontSize: 15,
        color: "#1E1E1E",
    },

    valueWrap: {
        flexDirection: "row",
        alignItems: "center",
    },
    valueText: {
        color: "#000080",
    },
});
