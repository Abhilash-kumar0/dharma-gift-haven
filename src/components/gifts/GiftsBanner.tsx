// src/components/gifts/GiftsBanner.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GiftsBanner = () => {
    return (
        <LinearGradient
            colors={['#800000', '#FF9933']} // replace with dharma-maroon and dharma-saffron
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.banner}
        >
            <Text style={styles.title}>Digital Shagun</Text>
            <Text style={styles.subtitle}>
                Create and send virtual Shagun envelopes for all your special occasions
            </Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    banner: {
        paddingVertical: 32, // py-8
        paddingHorizontal: 24, // px-6
    },
    title: {
        fontSize: 24, // text-2xl
        fontWeight: 'bold',
        marginBottom: 8, // mb-2
        color: 'white',
    },
    subtitle: {
        fontSize: 14, // text-sm
        opacity: 0.9,
        marginBottom: 16, // mb-4
        color: 'white',
    },
});

export default GiftsBanner;
