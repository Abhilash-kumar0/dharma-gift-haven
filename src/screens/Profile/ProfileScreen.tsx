import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import AppLayout from "../../components/AppLayout";
import LinearGradient from "react-native-linear-gradient";

const profileSections = [
  {
    title: "Account Settings",
    items: [
      { icon: "settings", label: "Settings", path: "Settings" },
      { icon: "user", label: "Personal Information", path: "PersonalInfo" },
      { icon: "bell", label: "Notifications", path: "Notification" }
    ]
  },
  {
    title: "Financial",
    items: [
      { icon: "credit-card", label: "Bank Account Details", path: "BankDetails" },
      { icon: "clock", label: "Transaction History", path: "TranstionHistory" }
    ]
  },
  {
    title: "Security & Compliance",
    items: [
      { icon: "shield", label: "KYC Verification", path: "KYC" }
    ]
  },
  {
    title: "Legal",
    items: [
      { icon: "file-text", label: "Terms and Conditions", path: "Terms" },
      { icon: "file-text", label: "Privacy Policy", path: "Privacy" },
      { icon: "help-circle", label: "Help & Support", path: "Support" }
    ]
  }
];

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Logout", "Logged out successfully");
    // Add real logout logic here
  };

  return (
    <AppLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode="never"         // Android smooth effect
        bounces={true}                 // iOS bounce effect
        decelerationRate="normal"      // can also try "fast" for iOS-like
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Profile Header */}
        <View style={{ alignItems: "center", paddingVertical: 24 }}>
          <View style={{ position: "relative" }}>
            <Image
              source={{ uri: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww" }}
              style={{ width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: "#FFD580" }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "#ff5900",
                padding: 6,
                borderRadius: 20
              }}
              onPress={() => navigation.navigate("PersonalInfo" as never)}
            >
              <Icon name="settings" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 8, color: "#000080" }}>
            Rahul Agarwal
          </Text>
          <Text style={{ fontSize: 14, color: "#800000" }}>rahul.agarwal@example.com</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "green", marginRight: 6 }} />
            <Text style={{ fontSize: 12, color: "#000080" }}>Verified Account</Text>
          </View>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, idx) => (
          <View
            key={idx}
            style={{
              marginBottom: 16,
              borderRadius: 12,
              overflow: "hidden",
              backgroundColor: "#FFFAE8", // pale yellow card background
              borderWidth: 1,
              borderColor: "#FFD58050",
              // subtle shadow (keeps card feel)
              shadowColor: "#000",
              shadowOpacity: 0.03,
              shadowOffset: { width: 0, height: 1 },
              shadowRadius: 4,
              elevation: 1,
            }}
          >
            <LinearGradient
              colors={[
                "#fdedbbff", // dark blue (left)
                "#fafafaff"  // light cream (right)
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ padding: 12, borderRadius: 6 }} // keep padding + optional rounded corners
            >
              <Text style={{ fontWeight: "500", color: "#000080" }}>
                {section.title}
              </Text>
            </LinearGradient>
            {section.items.map((item, itemIdx) => (
              <TouchableOpacity
                key={itemIdx}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 14,
                  borderTopWidth: itemIdx > 0 ? 1 : 0,
                  borderColor: "#FFD58030",
                  backgroundColor: "#fff"
                }}
                onPress={() => navigation.navigate(item.path as never)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon name={item.icon} size={20} color="#000080" style={{ marginRight: 10 }} />
                  <Text style={{ color: "#000080" }}>{item.label}</Text>
                </View>
                <Icon name="chevron-right" size={18} color="#000080" />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#ff000050",
            padding: 14,
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={handleLogout}
        >
          <Icon name="log-out" size={18} color="#ff0000" style={{ marginRight: 6 }} />
          <Text style={{ color: "#ff0000" }}>Logout</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: "center", fontSize: 12, color: "#000080", marginTop: 16 }}>
          App Version 1.0.0
        </Text>
      </ScrollView>
    </AppLayout>
  );
};

export default ProfileScreen;
