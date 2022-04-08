import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeData = async ({key, value}:{
  key: string,
  value: any
}) => {
  try {
    if (typeof value === 'object') {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(`@machinekind/app/${key}`, jsonValue)
    }
    else {      
      await AsyncStorage.setItem(`@machinekind/app/${key}`, value)
    }
  } catch (e) {
    // saving error
  }
}

export const getData = async ({
  key, isObject = false
}: {
    key: string;
    isObject?: boolean;
}) => {
  try {
    if (isObject) {
      const value = await AsyncStorage.getItem(`@machinekind/app/${key}`)    
      return value
    }
    else {
      const jsonValue = await AsyncStorage.getItem(`@machinekind/app/${key}`)
      return jsonValue != null ? JSON.parse(jsonValue) : null;      
    }
  } catch(e) {
    // error reading value
  }
}