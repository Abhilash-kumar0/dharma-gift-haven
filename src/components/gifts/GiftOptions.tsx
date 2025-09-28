// src/components/gifts/GiftOptions.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GiftOptions = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Choose an Option</Text>

                <View style={styles.optionCard}>    
                    <View style={styles.optionLeft}>
                        <View style={[styles.iconContainer, {  backgroundColor: "#FEE2E2", }]}>
                            <MaterialCommunityIcons name="gift" size={24} color="#8B0000" />
                        </View>
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.optionTitle}>Virtual Shagun Envelope</Text>
                            <Text style={styles.optionDesc}>
                                Create and send digital envelopes
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.optionButton, { backgroundColor: "#FF9933" }]}>
                        <Text style={styles.optionButtonText}>Create →</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.optionCard}>
                    <View style={styles.optionLeft}>
                        <View style={[  styles.iconContainer, { backgroundColor: "#DBEAFE", }]}>
                            <MaterialCommunityIcons
                            name="credit-card-outline"
                            size={24}
                            color="#1E3A8A"
                        />
                        </View>    
                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.optionTitle}>Recharge Paper Envelope</Text>
                            <Text style={styles.optionDesc}>
                                Add funds to your physical Shagun
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.optionButton, { backgroundColor: "#1E3A8A" }]}>
                        <Text style={styles.optionButtonText}>Recharge →</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#003366', // dharma-blue
        marginBottom: 16,
    },
    section: {
        padding: 0,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1E3A8A",
        marginBottom: 12,
    },
    optionCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    optionLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: "600", 
        color: "#1E3A8A",
    },
    optionDesc: {
        fontSize: 12,
        color: "#555",
    },
    optionButton: {
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    optionButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 12,
    },
});

export default GiftOptions;
