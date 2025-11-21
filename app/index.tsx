import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getQuotes, Quote } from '../utils/storage';

export default function Index() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadQuotes();
    }, []),
  );

  const loadQuotes = async () => {
    const loadedQuotes = await getQuotes();
    setQuotes(loadedQuotes);
    if (loadedQuotes.length > 0) {
      selectRandomQuote(loadedQuotes);
    }
  };

  const selectRandomQuote = (quotesList: Quote[] = quotes) => {
    if (quotesList.length === 0) return;
    const randomIndex = Math.floor(Math.random() * quotesList.length);
    setCurrentQuote(quotesList[randomIndex]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {currentQuote ? (
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>"{currentQuote.text}"</Text>
            {Boolean(currentQuote.source) && (
              <Text style={styles.quoteSource}>— {currentQuote.source}</Text>
            )}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Нет сохраненных цитат</Text>
            <Text style={styles.emptySubtext}>Добавьте первую цитату!</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        {quotes.length > 1 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => selectRandomQuote()}
          >
            <Text style={styles.buttonText}>Новая цитата</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => router.push('/add')}
        >
          <Text style={styles.primaryButtonText}>Добавить цитату</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/list')}
        >
          <Text style={styles.buttonText}>Все цитаты</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  quoteContainer: {
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 24,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    lineHeight: 36,
  },
  quoteSource: {
    fontSize: 18,
    textAlign: 'right',
    color: '#666',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: '#999',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#bbb',
  },
  buttonContainer: {
    padding: 20,
    gap: 10,
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
