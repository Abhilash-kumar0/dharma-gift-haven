import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Text,
    Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { celebrationTypes } from '../components/gifts/data/celebrationTypes';
import StepNavigation from '../components/gifts/StepNavigation';
import ProgressBar from '../components/gifts/ProgressBar';
import CelebrationType from '../components/gifts/CelebrationType';
import EnvelopeDetails from '../components/gifts/EnvelopeDetails';
import SenderDetails from '../components/gifts/SenderDetails';
import EnvelopePreview from '../components/gifts/EnvelopePreview';
import { AppStackParamList } from '../navigation/types';
import AppLayout from '../components/AppLayout';

type CreateEnvelopeNavigationProp = NativeStackNavigationProp<
    AppStackParamList,
    'CreateEnvelope'
>;

const CreateEnvelopeScreen: React.FC = () => {
    const navigation = useNavigation<CreateEnvelopeNavigationProp>();

    const [step, setStep] = useState(1);
    const [celebrationType, setCelebrationType] = useState('');
    const [amount, setAmount] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [message, setMessage] = useState('');
    const [senderName, setSenderName] = useState('');

    const selectedCelebration = celebrationTypes.find(c => c.id === celebrationType);
    const bgColors = selectedCelebration?.colors || ['#FFFFFF', '#FFFFFF'];

    const handleNext = () => {
        if (step === 1 && !celebrationType) {
            Alert.alert('Error', 'Please select a celebration type');
            return;
        }
        if (step === 2) {
            if (!amount || parseFloat(amount) <= 0) {
                Alert.alert('Error', 'Please enter a valid amount');
                return;
            }
            if (!recipientName) {
                Alert.alert('Error', 'Please enter recipient name');
                return;
            }
        }
        if (step === 3 && !senderName) {
            Alert.alert('Error', 'Please enter your name');
            return;
        }

        if (step === 3) {
            const envelopeId = Date.now().toString();
            navigation.navigate('EnvelopePayment', { envelopeId });
        } else {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
        else navigation.goBack();
    };

    return (
        <AppLayout>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <StepNavigation step={step} handleBack={handleBack} />
                    <ProgressBar step={step} totalSteps={3} />

                    {step === 1 && (
                        <CelebrationType
                            celebrationType={celebrationType}
                            setCelebrationType={setCelebrationType}
                            celebrationTypes={celebrationTypes}
                        />
                    )}

                    {step === 2 && (
                        <EnvelopeDetails
                            amount={amount}
                            setAmount={setAmount}
                            recipientName={recipientName}
                            setRecipientName={setRecipientName}
                            message={message}
                            setMessage={setMessage}
                            bgColors={bgColors}
                        />
                    )}

                    {step === 3 && (
                        <>
                            <SenderDetails
                                senderName={senderName}
                                setSenderName={setSenderName}
                                bgColors={bgColors}
                            />
                            <EnvelopePreview
                                celebrationType={celebrationType}
                                recipientName={recipientName}
                                senderName={senderName}
                                amount={amount}
                                message={message}
                                selectedCelebration={selectedCelebration}
                            />
                        </>
                    )}

                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                            <Text style={styles.buttonText}>
                                {step === 3 ? 'Proceed to Payment' : 'Continue'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </AppLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 80,
    },
    buttonWrapper: {
        marginTop: 20,
    },
    nextButton: {
        backgroundColor: '#FB923C',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default CreateEnvelopeScreen;
