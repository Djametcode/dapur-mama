import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity,
  FlatList, RefreshControl, ActivityIndicator, Image,
} from 'react-native';
import { COLORS, SIZES } from '../../styles/theme';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

const CATEGORIES = [
  { id: '1', name: 'Sarapan', icon: '🌅' },
  { id: '2', name: 'Makan Siang', icon: '☀️' },
  { id: '3', name: 'Makan Malam', icon: '🌙' },
  { id: '4', name: 'Camilan', icon: '🍿' },
  { id: '5', name: 'Minuman', icon: '🥤' },
  { id: '6', name: 'Kue', icon: '🎂' },
];

const PLACEHOLDER_IMG = 'https://via.placeholder.com/200/FFF8F0/E07A2F?text=Makanan';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [recipesRes, tutorialsRes, blogsRes] = await Promise.all([
        api.getRecipes({ limit: 6 }),
        api.getTutorials({ limit: 5 }),
        api.getBlogs({ limit: 3 }),
      ]);
      setRecipes(Array.isArray(recipesRes) ? recipesRes : recipesRes.data || []);
      setTutorials(Array.isArray(tutorialsRes) ? tutorialsRes : tutorialsRes.data || []);
      setBlogs(Array.isArray(blogsRes) ? blogsRes : blogsRes.data || []);
    } catch (error) {
      console.error('Fetch data error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const onRefresh = () => { setRefreshing(true); fetchData(); };

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('RecipeDetail', { id: item.id || item._id })}
    >
      <Image source={{ uri: item.image || item.thumbnail || PLACEHOLDER_IMG }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle} numberOfLines={2}>{item.title || item.name}</Text>
        <View style={styles.recipeMeta}>
          <Ionicons name="time-outline" size={12} color={COLORS.textMuted} />
          <Text style={styles.recipeMetaText}>{item.cookTime || item.duration || '30 mnt'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTutorialCard = ({ item }) => (
    <TouchableOpacity
      style={styles.tutorialCard}
      onPress={() => navigation.navigate('TutorialDetail', { id: item.id || item._id })}
    >
      <Image source={{ uri: item.thumbnail || item.image || PLACEHOLDER_IMG }} style={styles.tutorialImage} />
      <View style={styles.tutorialOverlay}>
        <Ionicons name="play-circle" size={32} color={COLORS.white} />
      </View>
      <View style={styles.tutorialInfo}>
        <Text style={styles.tutorialTitle} numberOfLines={1}>{item.title || item.name}</Text>
        <Text style={styles.tutorialDuration}>{item.duration || '10 mnt'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Halo, 👋</Text>
          <Text style={styles.userName}>{user?.name || 'Mama'}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(user?.name || 'M')[0]?.toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color={COLORS.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari resep, tutorial..."
          placeholderTextColor={COLORS.placeholder}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Kategori</Text>
      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryChip}>
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />

      {/* Featured Recipes */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Resep Pilihan</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Resep')}>
          <Text style={styles.seeAll}>Lihat Semua →</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recipes}
        numColumns={2}
        keyExtractor={(item, i) => (item.id || item._id || i).toString()}
        renderItem={renderRecipeCard}
        columnWrapperStyle={styles.recipeRow}
        scrollEnabled={false}
        contentContainerStyle={styles.recipeGrid}
        ListEmptyComponent={<Text style={styles.emptyText}>Belum ada resep</Text>}
      />

      {/* Latest Tutorials */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Tutorial Terbaru</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Tutorial')}>
          <Text style={styles.seeAll}>Lihat Semua →</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={tutorials}
        keyExtractor={(item, i) => (item.id || item._id || i).toString()}
        renderItem={renderTutorialCard}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tutorialList}
        ListEmptyComponent={<Text style={styles.emptyText}>Belum ada tutorial</Text>}
      />

      {/* Latest Blogs */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Blog Terbaru</Text>
      </View>
      {blogs.length > 0 ? blogs.map((item, i) => (
        <TouchableOpacity
          key={item.id || item._id || i}
          style={styles.blogCard}
          onPress={() => navigation.navigate('BlogDetail', { id: item.id || item._id })}
        >
          <Image source={{ uri: item.image || item.thumbnail || PLACEHOLDER_IMG }} style={styles.blogImage} />
          <View style={styles.blogInfo}>
            <Text style={styles.blogTitle} numberOfLines={2}>{item.title || item.name}</Text>
            <Text style={styles.blogDate}>{item.date || item.createdAt || ''}</Text>
          </View>
        </TouchableOpacity>
      )) : (
        <Text style={styles.emptyText}>Belum ada blog</Text>
      )}

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SIZES.padding, paddingTop: 60, paddingBottom: 8,
  },
  greeting: { fontSize: SIZES.base, color: COLORS.textLight },
  userName: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.text },
  avatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: COLORS.white, fontSize: SIZES.lg, fontWeight: 'bold' },

  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white,
    marginHorizontal: SIZES.padding, marginTop: 16, marginBottom: 8,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: SIZES.radius,
    borderWidth: 1, borderColor: COLORS.border,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: SIZES.base, color: COLORS.text },

  categoryList: { paddingHorizontal: SIZES.padding, paddingVertical: 8 },
  categoryChip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    marginRight: 10, borderWidth: 1, borderColor: COLORS.border,
  },
  categoryIcon: { fontSize: 16, marginRight: 6 },
  categoryName: { fontSize: SIZES.sm, color: COLORS.text, fontWeight: '500' },

  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SIZES.padding, marginTop: 20, marginBottom: 8,
  },
  sectionTitle: {
    fontSize: SIZES.lg, fontWeight: 'bold', color: COLORS.text,
    paddingHorizontal: SIZES.padding, marginTop: 20, marginBottom: 8,
  },
  seeAll: { fontSize: SIZES.sm, color: COLORS.primary, fontWeight: '600' },

  recipeGrid: { paddingHorizontal: SIZES.padding },
  recipeRow: { justifyContent: 'space-between' },
  recipeCard: {
    width: '48%', backgroundColor: COLORS.white, borderRadius: SIZES.radius,
    overflow: 'hidden', marginBottom: 12, borderWidth: 1, borderColor: COLORS.border,
  },
  recipeImage: { width: '100%', height: 120, backgroundColor: COLORS.inputBg },
  recipeInfo: { padding: 10 },
  recipeTitle: { fontSize: SIZES.md, fontWeight: '600', color: COLORS.text, marginBottom: 4 },
  recipeMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  recipeMetaText: { fontSize: SIZES.xs, color: COLORS.textMuted },

  tutorialList: { paddingHorizontal: SIZES.padding },
  tutorialCard: {
    width: 200, height: 120, borderRadius: SIZES.radius, overflow: 'hidden',
    marginRight: 12, backgroundColor: COLORS.inputBg,
  },
  tutorialImage: { width: '100%', height: '100%' },
  tutorialOverlay: {
    ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  tutorialInfo: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 8, backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tutorialTitle: { fontSize: SIZES.sm, color: COLORS.white, fontWeight: '600' },
  tutorialDuration: { fontSize: SIZES.xs, color: COLORS.white },

  blogCard: {
    flexDirection: 'row', marginHorizontal: SIZES.padding, marginBottom: 12,
    backgroundColor: COLORS.white, borderRadius: SIZES.radius, overflow: 'hidden',
    borderWidth: 1, borderColor: COLORS.border,
  },
  blogImage: { width: 90, height: 90, backgroundColor: COLORS.inputBg },
  blogInfo: { flex: 1, padding: 12, justifyContent: 'center' },
  blogTitle: { fontSize: SIZES.md, fontWeight: '600', color: COLORS.text, marginBottom: 4 },
  blogDate: { fontSize: SIZES.xs, color: COLORS.textMuted },

  emptyText: { textAlign: 'center', color: COLORS.textMuted, padding: 20, fontSize: SIZES.md },
});
