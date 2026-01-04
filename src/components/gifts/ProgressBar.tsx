import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
    step: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
    const progressWidth = (step / totalSteps) * 100;

    return (
        <View style={styles.container}>
            <View style={[styles.progress, { width: `${progressWidth}%` }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 4,
        backgroundColor: '#E5E7EB', // gray-200
        borderRadius: 9999,
        marginBottom: 24,
    },
    progress: {
        height: 4,
        backgroundColor: '#E86A33', // dharma-orange
        borderRadius: 9999,
    },
});

export default ProgressBar;
