import React, { useState } from "react";
import { View, StyleSheet, Switch, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import WebBrowser from "expo-web-browser";


export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const openLink = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <Heading style={styles.sectionTitle}>Notificaciones</Heading>
        <View style={styles.option}>
          <Text style={styles.optionText}>Notificaciones Push</Text>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            trackColor={switchStyles.trackColor}
            thumbColor={pushNotifications ? switchStyles.thumbColor.active : switchStyles.thumbColor.inactive}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Notificaciones por Correo</Text>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={switchStyles.trackColor}
            thumbColor={emailNotifications ? switchStyles.thumbColor.active : switchStyles.thumbColor.inactive}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Heading style={styles.sectionTitle}>Legal</Heading>
        <Pressable style={styles.link} onPress={() => openLink("https://example.com/terms")}>
          <Text style={styles.linkText}>Términos y Condiciones</Text>
        </Pressable>
        <Pressable style={styles.link} onPress={() => openLink("https://example.com/privacy")}>
          <Text style={styles.linkText}>Política de Privacidad</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Heading style={styles.sectionTitle}>Información</Heading>
        <Text style={styles.versionText}>Versión de la App: {Constants.expoConfig?.version || "1.0.0"}</Text>
      </View>
    </SafeAreaView>
  );
}

const switchStyles = {
  trackColor: { false: Colors.light.borderBox, true: Colors.light.lightBlue },
  thumbColor: {
    active: Colors.light.mediumDarkBlue,
    inactive: Colors.dark.text,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "normal",
    marginBottom: 10,
    color: Colors.light.text,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  link: {
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 16,
    color: Colors.light.mediumDarkBlue,
  },
  versionText: {
    fontSize: 16,
    color: Colors.light.ash,
  },
});
