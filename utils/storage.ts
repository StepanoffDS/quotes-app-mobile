import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Quote {
  id: string;
  text: string;
  source?: string;
  createdAt?: Date;
}

const STORAGE_KEY = 'quotes';

export async function getQuotes(): Promise<Quote[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const quotes = JSON.parse(data);
    return quotes.map((quote: Quote) => ({
      ...quote,
      createdAt: quote.createdAt ? new Date(quote.createdAt) : undefined,
    }));
  } catch (error) {
    console.error('Error loading quotes:', error);
    return [];
  }
}

export async function saveQuotes(quotes: Quote[]): Promise<void> {
  try {
    const quotesToSave = quotes.map((quote) => ({
      ...quote,
      createdAt: quote.createdAt
        ? quote.createdAt instanceof Date
          ? quote.createdAt.toISOString()
          : quote.createdAt
        : undefined,
    }));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(quotesToSave));
  } catch (error) {
    console.error('Error saving quotes:', error);
  }
}

export async function getQuoteById(id: string): Promise<Quote | null> {
  const quotes = await getQuotes();
  return quotes.find((quote) => quote.id === id) || null;
}
