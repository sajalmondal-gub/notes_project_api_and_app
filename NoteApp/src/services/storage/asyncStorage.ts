import AsyncStorage from '@react-native-async-storage/async-storage';

const FIRST_TIME_KEY = 'IS_FIRST_TIME_LAUNCH';

export const checkFirstTime = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(FIRST_TIME_KEY);
    return value === null;
  } catch (error) {
    return false;
  }
};

export const markFirstTimeCompleted = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(FIRST_TIME_KEY, 'false');
  } catch (error) {
    console.error(error);
  }
};
