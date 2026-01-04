import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Theme {
    id: string;
    name: string;
    colors: string[];
    image: any;
    primaryColor: string;
    description: string;
}

interface EnvelopeThemeCardProps {
    theme: Theme;
    isSelected: boolean;
    onSelect: () => void;
}

const EnvelopeThemeCard: React.FC<EnvelopeThemeCardProps> = ({
    theme,
    isSelected,
    onSelect,
}) => {
    if (!theme) {
        console.warn('Theme is undefined');
        return null;
    }

    const gradientColors =
        theme.colors && theme.colors.length > 0 ? theme.colors : ['#ffffff', '#f0f0f0'];

    return (
        <TouchableOpacity
            style={[
                styles.cardContainer,
                isSelected && { borderColor: theme.primaryColor, borderWidth: 2 },
            ]}
            onPress={onSelect}
            activeOpacity={0.8}
        >
            <LinearGradient
                colors={gradientColors}
                style={styles.gradientCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {theme.image && (
                    <Image source={theme.image} style={styles.image} resizeMode="contain" />
                )}
                <Text style={styles.title}>{theme.name}</Text>
                <Text style={styles.description}>{theme.description}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        borderRadius: 12,
        margin: 4,
        borderColor: '#ccc',
        borderWidth: 2,
        overflow: 'hidden', // optional — can cause clipping issues
    },
    gradientCard: {
        alignItems: 'center',
        padding: 16,
        borderRadius: 10,
        height: 140, // fixed height for all cards
        justifyContent: 'center',
    },
    image: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    description: {
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
    },
});

export default EnvelopeThemeCard;
