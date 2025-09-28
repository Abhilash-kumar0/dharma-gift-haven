import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Modal,
    Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";



type Envelope = { id: string; name: string };
type Notification = { id: string; title: string; description: string; time: string };

interface Props {
    unopenedEnvelopes: Envelope[];
    notificationData: Notification[];
    unreadNotifications: Notification[];
    handleNavigateToEnvelope: (id: string) => void;
    cartCount: number;
}

const HeaderMenus: React.FC<Props> = ({
    unopenedEnvelopes,
    notificationData,
    unreadNotifications,
    handleNavigateToEnvelope,
    cartCount,
}) => {
    const [activePopup, setActivePopup] = useState<"envelopes" | "notifications" | "cart" | null>(
        null
    );

    const togglePopup = (popup: "envelopes" | "notifications" | "cart") => {
        setActivePopup(activePopup === popup ? null : popup);
    };

    const closePopup = () => setActivePopup(null);

    return (
        <View style={styles.container}>
            {/* Envelope Icon */}
            <TouchableOpacity style={styles.iconButton} onPress={() => togglePopup("envelopes")}>
                <MaterialIcons name="mail-outline" size={22} color="#003366" />
                {unopenedEnvelopes.length > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{unopenedEnvelopes.length}</Text>
                    </View>
                )}
            </TouchableOpacity>

            {/* Notification Icon */}
            <TouchableOpacity style={styles.iconButton} onPress={() => togglePopup("notifications")}>
                <Ionicons name="notifications-outline" size={22} color="#003366" />
                {unreadNotifications.length > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{unreadNotifications.length}</Text>
                    </View>
                )}
            </TouchableOpacity>

            {/* Cart Icon */}
            <TouchableOpacity style={styles.iconButton} onPress={() => togglePopup("cart")}>
                <FontAwesome5 name="shopping-bag" size={20} color="#003366" />
                {cartCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{cartCount}</Text>
                    </View>
                )}
            </TouchableOpacity>

            {/* Popup Modal */}
            <Modal visible={!!activePopup} transparent animationType="fade">
                <Pressable style={styles.overlay} onPress={closePopup}>
                    <Pressable style={styles.popupCard}>
                        {activePopup === "envelopes" && (
                            <>
                                <Text style={styles.title}>Your Envelopes</Text>
                                <Text style={styles.subText}>Click to open your gift</Text>
                                <View style={styles.separator} />
                                <FlatList
                                    showsVerticalScrollIndicator={false} 
                                    data={unopenedEnvelopes}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.itemRow}
                                            onPress={() => {
                                                closePopup();
                                                handleNavigateToEnvelope(item.id);
                                            }}
                                        >
                                            <View style={styles.itemIcon}>
                                                <MaterialIcons name="mail" size={20} color="#FF6600" />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.itemTitle}>{item.name}</Text>
                                                <Text style={styles.itemSub}>Tap to open</Text>
                                            </View>
                                            <View style={styles.dot} />
                                        </TouchableOpacity>
                                    )}
                                />
                                <View style={styles.separator} />
                                <TouchableOpacity>
                                    <Text style={styles.link}>View All Envelopes</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {activePopup === "notifications" && (
                            <>
                                <Text style={styles.title}>Notifications</Text>
                                <Text style={styles.subText}>Stay updated with your activity</Text>
                                <View style={styles.separator} />
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={notificationData}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.itemRow}>
                                            <Ionicons
                                                name="notifications"
                                                size={20}
                                                color={index < unreadNotifications.length ? "red" : "#999"}
                                            />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.itemTitle}>{item.title}</Text>
                                                <Text style={styles.itemSub}>{item.description}</Text>
                                                <Text style={styles.itemTime}>{item.time}</Text>
                                            </View>
                                        </View>
                                    )}
                                />
                                <View style={styles.separator} />
                                <TouchableOpacity>
                                    <Text style={styles.link}>View All Notifications</Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {activePopup === "cart" && (
                            <>
                                <Text style={styles.title}>Your Cart</Text>
                                <Text style={styles.subText}>Item in your shopping bag</Text>
                                <View style={styles.separator} />
                                <Text style={styles.itemSub}>{cartCount} items in your cart</Text>
                                <View style={styles.separator} />
                                <TouchableOpacity>
                                    <Text style={styles.link}>View Cart</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", padding: 10 },
    iconButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#fff9e6",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 6,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    badge: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: "red",
        borderRadius: 10,
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderWidth: 1,
        borderColor: "#fff",
    },
    badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
    overlay: {
        flex: 1,
        // backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        padding: 10,
    },
    popupCard: {
        marginTop: 40,
        width: 300,
        maxHeight: 500,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    title: { fontWeight: "700", fontSize: 16, marginBottom: 4, color: "#800000", textAlign: "center" },
    subText: { fontSize: 13, color: "#666", marginBottom: 6 , textAlign: "center" },
    separator: { height: 1, backgroundColor: "#eee", marginVertical: 6 },
    itemRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
    itemIcon: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: "#fff9e6",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    itemTitle: { fontSize: 14, color: "#003366", fontWeight: "600" },
    itemSub: { fontSize: 12, color: "#666" },
    itemTime: { fontSize: 11, color: "#999", marginTop: 2 },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "red",
        marginLeft: 6,
    },
    link: { textAlign: "center", marginTop: 10, fontSize: 14, color: "#FF6600", fontWeight: "600" },
});

export default HeaderMenus;
