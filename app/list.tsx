import { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { getQuotes, saveQuotes, Quote } from '../utils/storage';

export default function QuotesList() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadQuotes();
    }, []),
  );

  useEffect(() => {
    filterQuotes();
  }, [searchQuery, quotes]);

  const loadQuotes = async () => {
    const loadedQuotes = await getQuotes();
    setQuotes(loadedQuotes);
    setFilteredQuotes(loadedQuotes);
  };

  const filterQuotes = () => {
    if (!searchQuery.trim()) {
      setFilteredQuotes(quotes);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = quotes.filter(
      (quote) =>
        quote.text.toLowerCase().includes(query) ||
        (quote.source ?? '').toLowerCase().includes(query),
    );
    setFilteredQuotes(filtered);
  };

  const handleEdit = (quote: Quote) => {
    router.push({
      pathname: '/edit',
      params: {
        id: quote.id,
        text: quote.text,
        source: quote.source,
      },
    });
  };

  const handleDelete = (quoteId: string) => {
    Alert.alert(
      'Удалить цитату',
      'Вы уверены, что хотите удалить эту цитату?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            const updatedQuotes = quotes.filter((q) => q.id !== quoteId);
            await saveQuotes(updatedQuotes);
            setQuotes(updatedQuotes);
          },
        },
      ],
    );
  };

  const renderQuote = ({ item }: { item: Quote }) => (
    <View style={styles.quoteCard}>
      <Text style={styles.quoteText}>"{item.text}"</Text>
      {item.source && <Text style={styles.quoteSource}>— {item.source}</Text>}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.editButtonText}>Редактировать</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}>Удалить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='Поиск по тексту или источнику...'
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {filteredQuotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {searchQuery ? 'Ничего не найдено' : 'Нет сохраненных цитат'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredQuotes}
          renderItem={renderQuote}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  listContent: {
    padding: 20,
  },
  quoteCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 12,
    color: '#333',
    lineHeight: 26,
  },
  quoteSource: {
    fontSize: 16,
    textAlign: 'right',
    color: '#666',
    marginBottom: 12,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
});
