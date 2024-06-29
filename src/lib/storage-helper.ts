import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveStorageData = async (key: string, value: any) => {
  const valueString = JSON.stringify(value);

  await AsyncStorage.setItem(key, valueString);
};

export const getStorageData = async (key: string) => {
  const data = await AsyncStorage.getItem(key);

  if (!data) return null;

  const result = JSON.parse(data);

  return result;
};

export const removeStorageData = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export const clearStorageData = async () => {
  await AsyncStorage.clear();
};
