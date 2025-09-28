// src/components/gifts/EnvelopeWorkflow.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const steps = [
    {
        icon: <MaterialCommunityIcons name="calendar-check" size={20} color="#003366" />, // dharma-blue
        title: "Received an Invitation?",
        description: "Got invited to a celebration? It's time to send a Shagun envelope.",
    },
    {
        icon: <MaterialCommunityIcons name="gift" size={20} color="#800000" />, // dharma-maroon
        title: "Create a Digital Envelope",
        description: "Choose an occasion, set an amount and personalize with a message.",
    },
    {
        icon: <MaterialCommunityIcons name="credit-card" size={20} color="#003366" />, // dharma-blue
        title: "Add Your Contribution",
        description: "Enter the amount and pay securely using your preferred method.",
    },
    {
        icon: <MaterialCommunityIcons name="send" size={20} color="#FF9933" />, // dharma-orange
        title: "Send to Recipient",
        description: "Choose from your contacts and send your blessings instantly.",
    },
    {
        icon: <MaterialCommunityIcons name="sparkles" size={20} color="#FFD700" />, // dharma-gold
        title: "Celebrate Together",
        description: "Recipients get notified and can claim funds through the app.",
    },
];

const EnvelopeWorkflow = () => {
    const animatedValues = useRef(steps.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        animatedValues.forEach((anim, index) => {
            Animated.timing(anim, {
                toValue: 1,
                duration: 500,
                delay: index * 200,
                useNativeDriver: true,
            }).start();
        });
    }, []);

    return (
        <View style={styles.container}>
            {steps.map((step, index) => {
                const opacity = animatedValues[index];
                return (
                    <Animated.View
                        key={index}
                        style={[styles.stepContainer, { opacity }]}
                    >
                        {/* Connector line */}
                        {index < steps.length - 1 && <View style={styles.connector} />}

                        {/* Icon */}
                        <View style={styles.iconWrapper}>{step.icon}</View>

                        {/* Step content */}
                        <View style={styles.contentWrapper}>
                            <Text style={styles.title}>{step.title}</Text>
                            <Text style={styles.description}>{step.description}</Text>
                        </View>
                    </Animated.View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
    },
    stepContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        position: 'relative',
        alignItems: 'flex-start',
    },
    connector: {
        position: 'absolute',
        left: 20,
        top: 40,
        bottom: -24,
        width: 2,
        backgroundColor: 'rgba(255, 215, 0, 0.3)', // dharma-gold/30
        zIndex: 0,
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.2)', // dharma-gold/20
        elevation: 2,
        zIndex: 10,
    },
    contentWrapper: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.1)',
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        color: '#003366', // dharma-blue
    },
    description: {
        fontSize: 12,
        color: '#555',
        marginTop: 4,
    },
});

export default EnvelopeWorkflow;
