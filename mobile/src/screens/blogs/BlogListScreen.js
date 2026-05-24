import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  ActivityIndicator, Image, RefreshControl,
} from 'react-native';
import { COLORS, SIZES } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

const PLACEHOLDER_IMG = 'https://via.placeholder.com/200/FFF8F0/E07A2F?text=Blog';

export default function BlogListScreen({ navigation }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBlogs = useCallback(async () => {
    try {
      const data = await api.getBlogs();
      setBlogs(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error('Fetch blogs error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const onRefresh = () => { setRefreshing(true); fetchBlogs(); };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('BlogDetail', { id: item.id || item._id })}
    >
      <Image source={{ uri: item.image || item.thumbnail || PLACEHOLDER_IMG }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title || item.name}</Text>
        <Text style={styles.excerpt} numberOfLines={2}>{item.excerpt || item.description || ''}</Text>
        <View style={styles.meta}>
          <Ionicons name="person-outline" size={12} color={COLORS.textMuted} />
          <Text style={styles.metaText}>{item.author || 'Admin'}</Text>
          <Ionicons name="time-outline" size={12} color={COLORS.textMuted} style={{ marginLeft: 12 }} />
          <Text style={styles.metaText}>{item.date || item.createdAt || ''}</Text>
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
        <Text style={styles.headerTitle}>Blog Masak</Text>
      </View>

      <FlatList
        data={blogs}
        keyExtractor={(item, i) => (item.id || item._id || i).toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Belum ada artikel blog</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  header: { paddingTop: 60, paddingHorizontal: SIZES.padding, paddingBottom: 12 },
  headerTitle: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.text },

  list: { paddingHorizontal: SIZES.padding, paddingBottom: 20 },
  card: {
    flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: SIZES.radius,
    overflow: 'hidden', marginBottom: 12, borderWidth: 1, borderColor: COLORS.border,
  },
  image: { width: 110, height: 110, backgroundColor: COLORS.inputBg },
  info: { flex: 1, padding: 12, justifyContent: 'center' },
  title: { fontSize: SIZES.base, fontWeight: '600', color: COLORS.text, marginBottom: 4 },
  excerpt: { fontSize: SIZES.sm, color: COLORS.textLight, marginBottom: 8 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: SIZES.xs, color: COLORS.textMuted },

  emptyText: { textAlign: 'center', color: COLORS.textMuted, padding: 40, fontSize: SIZES.md },
});
