// src/components/gifts/HowItWorks.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import EnvelopeWorkflow from './EnvelopeWorkflow';

const HowItWorks = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <MaterialCommunityIcons name="information" size={20} color="#800000" style={styles.icon} />
                <Text style={styles.heading}>How It Works </Text>
            </View>

            {/* Workflow component */}
            <EnvelopeWorkflow />

            {/* CTA Button */}
            <View style={styles.buttonWrapper}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('CreateEnvelope')}
                >
                    <Text style={styles.buttonText}>Create Your First Envelope</Text>
                    <MaterialCommunityIcons name="arrow-right" size={16} color="#fff" style={{ marginLeft: 4 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: 'rgba(255, 235, 205, 0.2)', // dharma-cream/20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    icon: {
        marginRight: 8,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E3A8A', // dharma-blue
    },
    buttonWrapper: {
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF9933', // dharma-saffron
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 6,
    },
    buttonText: {
        fontWeight: '500',
        color: '#fff',
    },
});

export default HowItWorks;
