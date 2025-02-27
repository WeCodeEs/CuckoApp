import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable } from "@/components/ui/pressable";
import { Colors } from "@/constants/Colors";
import { Cog } from "lucide-react-native";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Pedido Listo",
      message: "Tu pedido #1234 está listo para recoger.",
      date: "Hoy, 12:45 PM",
      read: false,
    },
    {
      id: "2",
      title: "Promoción Especial",
      message: "¡Café 2x1 solo por hoy!",
      date: "Ayer, 5:30 PM",
      read: true,
    },
    {
      id: "3",
      title: "Nuevo Mensaje",
      message: "Tu pedido #1229 ha sido confirmado.",
      date: "Ayer, 10:15 AM",
      read: true,
    },
]);

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity onPress={() => markAsRead(item.id)}>
      <View style={[styles.notificationItem, !item.read && styles.unread]}>
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
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <Pressable onPress={() => console.log("Ir a configuración de notificaciones")}>
          <Cog size={28} color={Colors.light.mediumLightBlue} />
        </Pressable>
      </View>

      {/* Lista de Notificaciones */}
      {notifications.length > 0 ? (
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
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Transferir Dinero</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    backgroundColor: Colors.light.background,
    paddingVertical: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  listContainer: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "white",
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
    backgroundColor: "#f9f9f9",
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
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.light.mediumLightBlue,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyImage: {
    width: 150,
    height: 150,
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.light.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});