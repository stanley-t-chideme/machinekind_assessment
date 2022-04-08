import React from 'react';
import { Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { getCurrentUser } from '../store/auth/slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getVehicleById, updateVehicle } from '../store/vehicle/slice';
import { IVehicle } from '../store/vehicle/types';
import { RootStackScreenProps } from '../types';

export default function VehicleViewScreen({ navigation, route }: RootStackScreenProps<'VehicleView'>) {
  const { params } = route
  const [vehicle, setVehicle] = React.useState<IVehicle>()
  const dispatch = useAppDispatch();
  const user = useAppSelector(getCurrentUser)

  const selectedVehicle = useAppSelector((state) => {
    return getVehicleById(state, params.id, user)
  })


  React.useEffect(() => {
    setVehicle(selectedVehicle)
  }, [selectedVehicle])

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>{`Vehicle ID: ${vehicle?.id}`} </Text>

      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Make: </Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          value={vehicle?.make}
          onChange={({ nativeEvent: { text } }) => {
            setVehicle((state) => {
              if (state !== undefined) {
                return {
                  ...state,
                  make: text.trim()
                }
              }
            })
          }}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Model: </Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          value={vehicle?.model}
          onChange={({ nativeEvent: { text } }) => {
            setVehicle((state) => {
              if (state !== undefined) {
                return {
                  ...state,
                  model: text.trim()
                }
              }
            })
          }}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Year: </Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          value={vehicle?.year.toString()}
          onChange={({ nativeEvent: { text } }) => {
            setVehicle((state) => {
              if (state !== undefined) {
                return {
                  ...state,
                  year: Number.parseInt(text.trim())
                }
              }
            })
          }}
        />
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 10
        }}>
        <Button
          title="Update"
          disabled={
            selectedVehicle!.year == vehicle?.year
            && selectedVehicle!.make.trim() == vehicle?.make.trim()
            && selectedVehicle!.model.trim() == vehicle?.model.trim()
          }
          onPress={() => {
            if (vehicle !== undefined && user !== null)
              dispatch(updateVehicle({
                owner: user,
                vehicle: vehicle
              }))
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: 'center',
  },
  label: {
    fontWeight: "900",
    letterSpacing: 2,
    fontSize: 16,
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flexGrow: 2,
  },
});
