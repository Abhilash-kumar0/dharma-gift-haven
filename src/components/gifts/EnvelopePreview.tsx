import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface SelectedCelebration {
  id: string;
  name: string;
  colors: string[]; // Gradient colors
  image: any;       // Local image
  primaryColor: string;
  description: string;
}

interface EnvelopePreviewProps {
  celebrationType: string;
  recipientName: string;
  senderName: string;
  amount: string;
  message: string;
  selectedCelebration?: SelectedCelebration;
}

const EnvelopePreview: React.FC<EnvelopePreviewProps> = ({
  celebrationType,
  recipientName,
  senderName,
  amount,
  message,
  selectedCelebration,
}) => {
  const gradientColors = selectedCelebration?.colors || ['#FFFFFF', '#FFFFFF'];

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.title}>{selectedCelebration?.name} Envelope</Text>

      <View style={styles.detailsBox}>
        <View style={styles.row}>
          <Text style={styles.label}>To:</Text>
          <Text style={styles.value}>{recipientName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>From:</Text>
          <Text style={styles.value}>{senderName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={[styles.value, styles.amount]}>₹{amount}</Text>
        </View>
      </View>

      {message ? (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>"{message}"</Text>
        </View>
      ) : null}

      {selectedCelebration?.image && (
        <Image source={selectedCelebration.image} style={styles.image} />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: '#7D1128', // dharma-maroon
  },
  detailsBox: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontWeight: '600',
    color: '#222',
  },
  amount: {
    color: '#7D1128',
    fontWeight: '700',
  },
  messageBox: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  messageText: {
    fontStyle: 'italic',
    textAlign: 'center',
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 12,
  },
});

export default EnvelopePreview;
