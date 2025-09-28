// src/screens/GiftsScreen.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import GiftsBanner from '../components/gifts/GiftsBanner';
import GiftOptions from '../components/gifts/GiftOptions';
import HowItWorks from '../components/gifts/HowItWorks';
import { SafeAreaView } from 'react-native-safe-area-context';

const GiftsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.wrapper}>
      {/* Top Gradient Header with Back Button */}
      <LinearGradient
        colors={['#dbc4c480', '#ddbd9e80']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={[
          "rgba(255, 253, 208, 0.9)", // soft cream top
          "rgba(255, 255, 255, 0.95)", // white middle
          "rgba(255, 252, 236, 0.7)",  // pastel yellow bottom
          "rgba(254, 247, 205, 0.6)",  // hint of peach/pink
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.scrollBg}
      >
        {/* Content */}

        <ScrollView contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"         // Android smooth effect
          bounces={true}                 // iOS bounce effect
          decelerationRate="normal"      // can also try "fast" for iOS-like
          scrollEventThrottle={10}  
        >
          <GiftsBanner />
          <GiftOptions />
          <HowItWorks />
        </ScrollView>

      </LinearGradient >
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFDF7', // light cream background
  },
  header: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)', // subtle circle behind arrow
  },
  scrollBg: {
    flex: 1,
    borderRadius: 0,
    minHeight: "100%",
    paddingBottom: 40,
  },
  container: {
    flexDirection: 'column',
    paddingBottom: 80,
  },
});

export default GiftsScreen;
