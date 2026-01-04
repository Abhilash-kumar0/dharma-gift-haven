import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface EnvelopeDetailsProps {
  amount: string;
  setAmount: (amount: string) => void;
  recipientName: string;
  setRecipientName: (name: string) => void;
  message: string;
  setMessage: (message: string) => void;
  bgColors: string[]; // Gradient colors from selected celebration
}

const EnvelopeDetails: React.FC<EnvelopeDetailsProps> = ({
  amount,
  setAmount,
  recipientName,
  setRecipientName,
  message,
  setMessage,
  bgColors,
}) => {
  return (
    <LinearGradient
      colors={bgColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.heading}>Envelope Details</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gift Amount (₹)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter amount"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Recipient Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Who are you sending this to?"
          value={recipientName}
          onChangeText={setRecipientName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Personal Message (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Add your blessings or wishes..."
          value={message}
          onChangeText={setMessage}
          multiline
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
    color: '#1E3A8A', // dharma-blue
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
  textarea: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
});

export default EnvelopeDetails;
