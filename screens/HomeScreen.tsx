import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { BarCodeScanner } from "expo-barcode-scanner";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [permissionGranted, setPermissionGranted] = React.useState<null | boolean>(null)
  const navigator = useNavigation()

  const requestDeviceCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setPermissionGranted(status === 'granted')
  }

  const navigateToScreen = async ({ path }: { path: string }) => {
    switch (path) {
      case 'QRCodeScanner':
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if (status === "granted")
          navigator.navigate("QRCodeScanner")
    }
  }

  React.useEffect(() => {
    requestDeviceCameraPermission();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle QRCode scanner</Text>
      <Ionicons name="qr-code" size={260} />
      <View>
        <Button
          title="Scan QRCode"
          onPress={async () => {
            navigateToScreen({ path: "QRCodeScanner" })
          }} />
        <View style={{ display: "flex", flexDirection: "row", marginVertical: 20 }}>
          <Ionicons name="checkmark-outline" size={18} style={{ marginRight: 5 }} color={permissionGranted ? "green" : "grey"} />
          <Text style={{ color: permissionGranted ? "green" : "grey" }}>Camera permission granted.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontWeight: "800",
    letterSpacing: 2,
    fontSize: 24,
    textAlign: "center"
  }
});
