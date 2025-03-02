import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Notification } from "@/constants/types";
import { useRouter } from "expo-router";
import { fetchAllNotifications } from "@/constants/api";

export default function Notifications() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const notificationsData = await fetchAllNotifications();
        setNotifications(notificationsData);
      } catch (error) {
        console.error("Error loading notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const markAsRead = useCallback((id: string) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );

      fadeAnim.setValue(1);
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({ ...notification, read: true }))
      );

      fadeAnim.setValue(1);
    });
  }, []);

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity onPress={() => markAsRead(item.id)}>
      <Animated.View style={[styles.notificationItem, !item.read && styles.unread, { opacity: fadeAnim }]}>
        <Image
          source={require("@/assets/images/avatars/avatar-icon-1.png")}
          style={styles.avatar}
        />
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationMessage}>{item.message}</Text>
          <Text style={styles.notificationDate}>{item.date}</Text>
        </View>
        {!item.read && <View style={styles.unreadIndicator} />}
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        {notifications.length > 0 && (
          <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
            <Text style={styles.markAllButtonText}>Marcar todas como leídas</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.notificationsContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.light.mediumLightBlue} />
            <Text style={styles.loadingText}>Cargando notificaciones...</Text>
          </View>
        ) : notifications.length > 0 ? (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderNotification}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Image source={require("@/assets/images/avatars/avatar-icon-1.png")} style={styles.emptyImage} />
            <Text style={styles.emptyTitle}>No hay notificaciones</Text>
            <Text style={styles.emptyText}>No tienes notificaciones por el momento.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.dark.tabIconSelected,
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: Colors.light.background,
  },
  markAllButton: {
    backgroundColor: Colors.light.background,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  markAllButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.light.mediumDarkBlue,
  },
  notificationsContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    marginTop: -20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },  
  listContainer: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: Colors.light.background,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  unread: {
    backgroundColor: Colors.light.lightBlue,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  unreadIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light.tabIconSelected,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
