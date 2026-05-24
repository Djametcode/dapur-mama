import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  ActivityIndicator, Image, TextInput, RefreshControl,
} from 'react-native';
import { COLORS, SIZES } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

const PLACEHOLDER_IMG = 'https://via.placeholder.com/200/FFF8F0/E07A2F?text=Resep';

export default function RecipeListScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', 'Sarapan', 'Makan Siang', 'Makan Malam', 'Camilan', 'Dessert'];

  const fetchRecipes = useCallback(async () => {
    try {
      const data = await api.getRecipes({ search, category: selectedCategory !== 'Semua' ? selectedCategory : '' });
      setRecipes(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error('Fetch recipes error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [search, selectedCategory]);

  useEffect(() => { fetchRecipes(); }, [fetchRecipes]);

  const onRefresh = () => { setRefreshing(true); fetchRecipes(); };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RecipeDetail', { id: item.id || item._id })}
    >
      <Image source={{ uri: item.image || item.thumbnail || PLACEHOLDER_IMG }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title || item.name}</Text>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={12} color={COLORS.textMuted} />
            <Text style={styles.metaText}>{item.cookTime || '30 mnt'}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="people-outline" size={12} color={COLORS.textMuted} />
            <Text style={styles.metaText}>{item.servings || '4 porsi'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resep Masakan</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color={COLORS.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari resep..."
          placeholderTextColor={COLORS.placeholder}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.filterChip, selectedCategory === item && styles.filterChipActive]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[styles.filterText, selectedCategory === item && styles.filterTextActive]}>{item}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
      />

      <FlatList
        data={recipes}
        keyExtractor={(item, i) => (item.id || item._id || i).toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Tidak ada resep ditemukan</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  header: { paddingTop: 60, paddingHorizontal: SIZES.padding, paddingBottom: 12 },
  headerTitle: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.text },

  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding, marginBottom: 8,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: SIZES.radius,
    borderWidth: 1, borderColor: COLORS.border,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: SIZES.base, color: COLORS.text },

  filterList: { paddingHorizontal: SIZES.padding, paddingVertical: 8 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16,
    marginRight: 8, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border,
  },
  filterChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { fontSize: SIZES.sm, color: COLORS.text },
  filterTextActive: { color: COLORS.white, fontWeight: '600' },

  list: { paddingHorizontal: SIZES.padding, paddingBottom: 20 },
  card: {
    flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: SIZES.radius,
    overflow: 'hidden', marginBottom: 12, borderWidth: 1, borderColor: COLORS.border,
  },
  image: { width: 110, height: 110, backgroundColor: COLORS.inputBg },
  info: { flex: 1, padding: 12, justifyContent: 'center' },
  title: { fontSize: SIZES.base, fontWeight: '600', color: COLORS.text, marginBottom: 8 },
  meta: { flexDirection: 'row', gap: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: SIZES.xs, color: COLORS.textMuted },

  emptyText: { textAlign: 'center', color: COLORS.textMuted, padding: 40, fontSize: SIZES.md },
});
