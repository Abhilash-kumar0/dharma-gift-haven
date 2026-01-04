import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface StepNavigationProps {
    handleBack: () => void;
    step: number;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ handleBack, step }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Icon name="arrow-back-outline" size={20} color="#1E3A8A" />
            </TouchableOpacity>
            <View>
                <Text style={styles.title}>Create Shagun Envelope</Text>
                <Text style={styles.subtitle}>Step {step} of 3</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButton: {
        padding: 6,
        marginRight: 8,
        borderRadius: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1E3A8A', // dharma-blue
    },
    subtitle: {
        fontSize: 12,
        color: '#6B7280', // gray-500
    },
});

export default StepNavigation;
