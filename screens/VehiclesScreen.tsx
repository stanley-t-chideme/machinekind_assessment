import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, FlatList, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { Text } from '../components/Themed';
import { getCurrentUser } from '../store/auth/slice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getVehicles, removeVehicle } from '../store/vehicle/slice';
import { IVehicle } from '../store/vehicle/types';

export default function VehiclesScreen() {
  const user = useAppSelector(getCurrentUser)
  const vehicles = useAppSelector(state => {
    return getVehicles(state, user)
  });
  const dispatch = useAppDispatch();
  const navigator = useNavigation();

  const onDelete = (id: string | number) => {
    Alert.alert(
      "Delete vehicle",
      "Are you sure you want to delete this vehicle?",
      [
        {
          text: "No",
          onPress: () => { },
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            if (user !== null)
              dispatch(removeVehicle({
                owner: user,
                id: id
              }))
          },
          style: "destructive"
        }
      ]
    )

  }

  const navigateToView = (id: string | number) => {
    navigator.navigate("VehicleView", { id: id })
  }

  React.useEffect(() => {
  }, [vehicles])

  const renderVehicle = ({ item }: { item: IVehicle }) => {
    return <TouchableNativeFeedback style={{}} onPress={() => { navigateToView(item.id) }}>
      <View style={{}}>
        <View style={{ justifyContent: "space-between", padding: 15, paddingBottom: 0, flexDirection: "row", alignItems: "flex-end", borderRadius: 10 }}>
          <View style={{

          }}>
            <View style={styles.textView}>
              <Text style={styles.label}>MAKE: </Text>
              <Text style={styles.value}>{item.make}</Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.label}>MODEL: </Text>
              <Text style={styles.value}>{item.model}</Text>
            </View>
            <View style={styles.textView}>
              <Text style={styles.label}>ENGINE: </Text>
              <Text style={styles.value}>{item.engine}</Text>
            </View>
          </View>
          <View style={{}}>
            <Text style={{ fontSize: 22, fontWeight: "800" }}>{item.year}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 15,
            alignItems: "center"
          }}
        >
          <TouchableOpacity style={{ marginHorizontal: 2 }} onPress={() => {
            navigateToView(item.id)
          }}>
            <Text style={{ marginVertical: 5, marginHorizontal: 10, color: "lightblue" }}>View</Text>
          </TouchableOpacity>
          <RenderSeperatorY />
          <TouchableOpacity style={{ marginHorizontal: 2 }} onPress={() => {
            navigateToView(item.id)
          }}>
            <Text style={{ marginVertical: 5, marginHorizontal: 10, color: "lightgreen" }}>Update</Text>
          </TouchableOpacity>
          <RenderSeperatorY />
          <TouchableOpacity style={{ marginHorizontal: 2 }} onPress={() => { onDelete(item.id) }}>
            <Text style={{ marginVertical: 5, marginHorizontal: 10, color: "red" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableNativeFeedback>
  }

  const RenderSeperatorY = () => {
    return (
      <View style={{
        width: 1,
        height: "60%",
        backgroundColor: "#CEDCCE",
      }}
      />
    );
  }

  const RenderSeperatorX = () => {
    return (
      <View style={{
        width: '100%',
        height: 1,
        backgroundColor: "#CEDCCE",
      }}
      />
    );
  }

  const renderEmpty = () => {
    return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", minHeight: 702 }}>
      <Ionicons name="eye-off-outline" size={95} style={{ marginVertical: 30 }} />
      <Text style={{ letterSpacing: 2 }}>No Vehicles to display!</Text>
    </View>
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => `${item.id}-${index}`}
        data={[
          ...vehicles,
          ...vehicles,
          ...vehicles,
          ...vehicles,
          ...vehicles,
          ...vehicles,
          ...vehicles,
          ...vehicles,
          ...vehicles,
          ...vehicles,
          ...vehicles,
          ...vehicles,
        ]}
        renderItem={renderVehicle}
        ItemSeparatorComponent={RenderSeperatorX}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", padding: 10
  },
  label: {
    fontWeight: "bold",
    letterSpacing: 1
  },
  textView: {
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  value: {

  }
});
