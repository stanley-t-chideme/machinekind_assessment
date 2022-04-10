import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';
import { Alert, Animated, Button, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { getCurrentUser } from '../store/auth/slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addVehicle } from '../store/vehicle/slice';
import { IVehicle } from '../store/vehicle/types';
import { RootStackScreenProps } from '../types';

export default function QRCodeScannerScreen({ navigation }: RootStackScreenProps<'QRCodeScanner'>) {
  const [scanned, setScanned] = useState<boolean>(false)
  const [torched, setTorched] = useState<boolean>(false)
  const navigator = useNavigation();
  const appDispatch = useAppDispatch();
  const user = useAppSelector(getCurrentUser)

  const handleQRCodeScanned = ({ type, data }: { type: any; data: any }) => {
    const result = data.toLocaleLowerCase().split(",")
    const vehicle: IVehicle = {
      id: 1,
      engine: result[0],
      make: result[1].split("make:")[1].trim(),
      model: result[2].split("model:")[1].trim(),
      year: Number.parseInt(result[3].split("year:")[1].trim()),
    }

    if (user !== null) {
      appDispatch(addVehicle({
        owner: user,
        vehicle: vehicle,
      }))
      setScanned(true)
      Alert.alert(
        "Vehicle Added",
        "Vehicle information has been scanned.",
        [
          {
            text: "Ok",
            onPress: () => {
              navigator.goBack();
            },
            style: "destructive"
          }
        ]
      )
    }
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned === true ? undefined : handleQRCodeScanned}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: -50,
          bottom: 0,
          flex: 1
        }}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      >
      </BarCodeScanner>
      <View style={{ backgroundColor: 'transparent', flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30, fontWeight: "700", color: "white", marginBottom: 40 }}>Scan QRCode</Text>
        <Animated.View>
          <Ionicons name="scan-outline" size={250} color="white" />
        </Animated.View>
      </View>
      <Pressable onPress={() => {
      }} style={{ position: 'absolute', bottom: '2%', left: '2%', elevation: 10, backgroundColor: 'grey', borderRadius: 100, padding: 10 }}>
        <Ionicons name="flashlight" size={30} color="white" />
      </Pressable>
      <Pressable
        onPress={() => {
          navigator.goBack();
        }}
        style={{ position: 'absolute', bottom: '2%', right: '2%', elevation: 10, backgroundColor: 'grey', borderRadius: 100, padding: 10 }}>
        <Ionicons name="close" size={30} color="white" />
      </Pressable>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 800,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
