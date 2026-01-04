import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface SenderDetailsProps {
    senderName: string;
    setSenderName: (name: string) => void;
    bgColors: string[]; // Gradient colors from selected celebration
}

const SenderDetails: React.FC<SenderDetailsProps> = ({
    senderName,
    setSenderName,
    bgColors,
}) => {
    return (
        <LinearGradient
            colors={bgColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <Text style={styles.heading}>Sender Details</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Your Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={senderName}
                    onChangeText={setSenderName}
                />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
    },
    heading: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#1E3A8A',
    },
    inputGroup: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
        color: '#1E3A8A',
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
});

export default SenderDetails;
