import React, { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderMenus from "../components/HeaderMenus";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../navigation/Types";


// -----------------------------
// Types
// -----------------------------
type HomeScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, "MainTabs">;

type Envelope = { id: string; name: string };
type Notification = { id: string; title: string; description: string; time: string };
type Cart = { count: number };

// -----------------------------
// Mock Data
// -----------------------------
const featuredGifts = [
  { id: 1, title: "Traditional Red Envelope", price: "₹199", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500", badge: "Best Seller" },
  { id: 2, title: "Golden Paisley Envelope", price: "₹249", image: "https://images.unsplash.com/photo-1607082349566-1873425fabe1?w=500" },
  { id: 3, title: "Mandala Gift Pack", price: "₹399", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", badge: "New" },
  { id: 4, title: "Lotus Design Envelope", price: "₹149", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500" },
];

// Dummy API functions
const fetchEnvelopes = async (): Promise<Envelope[]> => [
  { id: "1", name: "Welcome Gift" },
  { id: "2", name: "Special Offer" },
];

const fetchNotifications = async (): Promise<Notification[]> => [
  { id: "1", title: "Order Shipped", description: "Your order is on the way", time: "2h ago" },
  { id: "2", title: "New Gift Added", description: "Check out new arrivals", time: "5h ago" },
];

const fetchCart = async (): Promise<Cart> => ({ count: 3 });

// -----------------------------
// Component
// -----------------------------
const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [envelopes, setEnvelopes] = useState<Envelope[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [cart, setCart] = useState<Cart>({ count: 0 });

  useEffect(() => {
    const loadData = async () => {
      const envelopeData = await fetchEnvelopes();
      const notificationData = await fetchNotifications();
      const cartData = await fetchCart();

      setEnvelopes(envelopeData);
      setNotifications(notificationData);
      setCart(cartData);
    };

    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <LinearGradient
        colors={[
          "rgba(255, 253, 208, 0.9)",
          "rgba(255, 255, 255, 0.95)",
          "rgba(255, 252, 236, 0.7)",
          "rgba(254, 247, 205, 0.6)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.scrollBg}
      >
        {/* Sticky Header */}
        <View style={styles.header}>
          <View style={styles.logoWrapper}>
            <Text style={styles.logoText}>
              Shagun<Text style={{ color: "#ff6600" }}>Pe</Text>
            </Text>
            <Text style={styles.welcome}>Welcome back, Rahul</Text>
          </View>

          <HeaderMenus
            unopenedEnvelopes={envelopes}
            notificationData={notifications}
            unreadNotifications={notifications.slice(0, 1)}
            handleNavigateToEnvelope={(id) => navigation.navigate("EnvelopeView", { id })}
            cartCount={cart.count}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Digital Gift Section */}
          <Text style={styles.sectionHeading}>Digital Gift Envelopes</Text>
          <Text style={styles.sectionSubHeading}>Traditional gifting meets modern technology</Text>

          {/* Large Card */}
          <View style={styles.cardLarge}>
            <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.cardLargeInner}>
              <View style={styles.cardContent}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>Send Your First Gift</Text>
                  <Text style={styles.cardSubtitle}>Create a memorable digital gift experience</Text>
                  <TouchableOpacity style={styles.cardButton}>
                    <Text style={styles.cardButtonText}>Explore Now →</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.iconCircle}>
                  <Ionicons name="gift-outline" size={40} color="#fff" />
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Small Cards Row */}
          <View style={styles.cardRow}>
            <LinearGradient colors={["#000046", "#1CB5E0"]} style={styles.cardSmall}>
              <View style={styles.icon}><Ionicons name="qr-code-outline" size={28} color="#fff" /></View>
              <Text style={styles.cardTitle2}>Redeem QR Code</Text>
              <Text style={styles.cardSubtitle2}>Scan & unlock your digital envelope</Text>
              <TouchableOpacity style={styles.cardButton2}>
                <Text style={styles.cardButtonText}>Scan Now →</Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient colors={["#cb2d3e", "#ef473a"]} style={styles.cardSmall}>
              <View style={styles.icon}><Ionicons name="gift-outline" size={28} color="#fff" /></View>
              <Text style={styles.cardTitle2}>Recharge Envelope</Text>
              <Text style={styles.cardSubtitle2}>Add balance to your paper envelope</Text>
              <TouchableOpacity style={styles.cardButton2}>
                <Text style={styles.cardButtonText}>Recharge →</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Special Offer Banner */}
          <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.offerBanner}>
            <Text style={styles.offerLabel}><Ionicons name="sparkles" size={14} color="#fff" /> Limited Time</Text>
            <Text style={styles.offerTitle}>Special Diwali Offer</Text>
            <Text style={styles.offerSubtitle}>Get 20% off on all gift envelopes this festive season!</Text>
            <TouchableOpacity style={styles.offerButton}><Text style={styles.offerButtonText}>Claim Now</Text></TouchableOpacity>
          </LinearGradient>

          {/* Featured Collections */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Collections</Text>
              <TouchableOpacity><Text style={styles.linkText}>View All</Text></TouchableOpacity>
            </View>
            <View style={styles.cardRow}>
              <LinearGradient colors={["#f7971e", "#ffd200"]} style={styles.card}>
                <Text style={styles.cardTitle}>Wedding Collection</Text>
                <Text style={styles.cardSubtitle}>Shagun envelopes</Text>
              </LinearGradient>
              <LinearGradient colors={["#f12711", "#f5af19"]} style={styles.card}>
                <Text style={styles.cardTitle}>Festival Gifts</Text>
                <Text style={styles.cardSubtitle}>Diwali specials</Text>
              </LinearGradient>
            </View>
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <TouchableOpacity><Text style={styles.linkText}>See All</Text></TouchableOpacity>
            </View>
            <View style={styles.categoryRow}>
              {[
                { name: "Envelopes", icon: "gift", colors: ["#f7971e", "#ffd200"] },
                { name: "Weddings", icon: "heart", colors: ["#cb2d3e", "#ef473a"] },
                { name: "Festivals", icon: "star", colors: ["#f7971e", "#f5af19"] },
                { name: "Explore", icon: "compass", colors: ["#6a11cb", "#2575fc"] },
              ].map((cat, idx) => (
                <View key={idx} style={styles.catWrapper}>
                  <LinearGradient colors={cat.colors} style={styles.catBox}>
                    <Ionicons name={cat.icon as any} size={28} color="#fff" />
                  </LinearGradient>
                  <Text style={styles.catText}>{cat.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Featured Gifts Grid */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Gifts</Text>
              <TouchableOpacity><Text style={styles.linkText}>View All</Text></TouchableOpacity>
            </View>
            <View style={styles.giftGrid}>
              {featuredGifts.map((item) => (
                <View key={item.id} style={styles.giftCard}>
                  <Image source={{ uri: item.image }} style={styles.giftImage} />
                  {item.badge && <View style={styles.badge}><Text style={styles.badgeText}>{item.badge}</Text></View>}
                  <Text style={styles.giftTitle}>{item.title}</Text>
                  <View style={styles.giftFooter}>
                    <Text style={styles.giftPrice}>{item.price}</Text>
                    <Ionicons name="cart-outline" size={20} color="#000066" />
                  </View>
                </View>
              ))}
            </View>
          </View>

        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingVertical: 60 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", paddingBottom: 10, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#eee", position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 },
  scrollBg: { flex: 1, borderRadius: 0, paddingHorizontal: 16, minHeight: "100%" },
  logoWrapper: { flexDirection: "column", alignItems: "flex-start" },
  logoText: { fontSize: 22, fontWeight: "700", color: "#000066" },
  welcome: { marginTop: 2, color: "#b34700", fontSize: 14 },
  sectionHeading: { marginTop: 20, fontSize: 20, fontWeight: "700", color: "#b34700" },
  sectionSubHeading: { color: "#333", marginBottom: 12 },
  cardLarge: { marginBottom: 20 },
  cardLargeInner: { borderRadius: 20, padding: 20, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, elevation: 6 },
  cardContent: { flexDirection: "row", alignItems: "center" },
  cardTitle: { fontSize: 20, fontWeight: "700", color: "#fff", marginBottom: 6 },
  cardSubtitle: { fontSize: 14, color: "rgba(255,255,255,0.85)", marginBottom: 16 },
  cardButton: { backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 12, paddingVertical: 10, paddingHorizontal: 16, alignSelf: "flex-start" },
  cardButton2: { width: "100%", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 12, paddingVertical: 10, paddingHorizontal: 16, alignItems: "center", borderWidth: 0.5, borderColor: "#fff", borderStyle: "solid" },
  cardButtonText: { color: "#fff", fontSize: 12, fontWeight: "500" },
  iconCircle: { width: 60, height: 60, borderRadius: 25, backgroundColor: "rgba(255,255,255,0.15)", justifyContent: "center", alignItems: "center", marginLeft: 16 },
  cardRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, gap: 10 },
  cardSmall: { flex: 1, borderRadius: 16, padding: 10, justifyContent: "space-evenly" },
  card: { flex: 1, justifyContent: "center", borderRadius: 16, padding: 16, marginRight: 10, height: 100, shadowColor: "#000", shadowOpacity: 0.8, shadowRadius: 4, elevation: 6 },
  icon: { width: 50, height: 50, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.15)", justifyContent: "center", alignItems: "center", marginBottom: 12 },
  cardTitle2: { fontSize: 16, fontWeight: "600", color: "#fff", marginBottom: 4 },
  cardSubtitle2: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginBottom: 20 },
  offerBanner: { borderRadius: 16, padding: 20, marginBottom: 20, gap: 8 },
  offerLabel: { color: "#fff", fontSize: 12, marginBottom: 6 },
  offerTitle: { color: "#fff", fontSize: 20, fontWeight: "700" },
  offerSubtitle: { color: "#eee", fontSize: 14, marginBottom: 10 },
  offerButton: { backgroundColor: "#fff", padding: 10, borderRadius: 20, width: 120, alignItems: "center" },
  offerButtonText: { color: "#6a11cb", fontWeight: "600" },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#000066" },
  linkText: { color: "#ff6600", fontWeight: "600" },
  categoryRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  catWrapper: { alignItems: "center", flex: 1 },
  catBox: { width: 60, height: 60, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 6, shadowColor: "#000", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 10 },
  catText: { fontSize: 12, fontWeight: "500", color: "#000066", textAlign: "center" },
  giftGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  giftCard: { backgroundColor: "#fff", borderRadius: 12, marginBottom: 14, width: "48%", padding: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  giftImage: { height: 100, borderRadius: 8, marginBottom: 6 },
  giftTitle: { fontSize: 14, fontWeight: "600", color: "#660000", marginBottom: 4 },
  giftFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  giftPrice: { fontSize: 14, fontWeight: "700", color: "#6a11cb" },
  badge: { position: "absolute", top: 6, right: 6, backgroundColor: "red", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
});

export default HomeScreen;
