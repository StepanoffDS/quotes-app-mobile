import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Quote {
  id: string;
  text: string;
  source?: string;
}

const STORAGE_KEY = 'quotes';

export async function getQuotes(): Promise<Quote[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading quotes:', error);
    return [];
  }
}

export async function saveQuotes(quotes: Quote[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
  } catch (error) {
    console.error('Error saving quotes:', error);
  }
}
