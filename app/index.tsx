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
import { useTheme } from '../contexts/ThemeContext';

export default function Index() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const router = useRouter();
  const { colors } = useTheme();

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

  const styles = createStyles(colors);

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

const createStyles = (
  colors: ReturnType<typeof import('../utils/theme').getColors>,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      color: colors.text,
      lineHeight: 36,
    },
    quoteSource: {
      fontSize: 18,
      textAlign: 'right',
      color: colors.textSecondary,
      fontWeight: '500',
    },
    emptyContainer: {
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 20,
      color: colors.textTertiary,
      marginBottom: 10,
    },
    emptySubtext: {
      fontSize: 16,
      color: colors.textDisabled,
    },
    buttonContainer: {
      padding: 20,
      gap: 10,
    },
    button: {
      backgroundColor: colors.card,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    primaryButton: {
      backgroundColor: colors.primary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    primaryButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
    },
  });
