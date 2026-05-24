import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  ActivityIndicator, Image, RefreshControl,
} from 'react-native';
import { COLORS, SIZES } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

const PLACEHOLDER_IMG = 'https://via.placeholder.com/200/FFF8F0/2D6A4F?text=Tutorial';

export default function TutorialListScreen({ navigation }) {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTutorials = useCallback(async () => {
    try {
      const data = await api.getTutorials();
      setTutorials(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error('Fetch tutorials error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchTutorials(); }, [fetchTutorials]);

  const onRefresh = () => { setRefreshing(true); fetchTutorials(); };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TutorialDetail', { id: item.id || item._id })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.thumbnail || item.image || PLACEHOLDER_IMG }} style={styles.image} />
        <View style={styles.playBtn}>
          <Ionicons name="play" size={20} color={COLORS.white} />
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title || item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description || ''}</Text>
        <View style={styles.meta}>
          <Ionicons name="time-outline" size={12} color={COLORS.textMuted} />
          <Text style={styles.metaText}>{item.duration || '10 menit'}</Text>
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
        <Text style={styles.headerTitle}>Tutorial Memasak</Text>
      </View>

      <FlatList
        data={tutorials}
        keyExtractor={(item, i) => (item.id || item._id || i).toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>Belum ada tutorial</Text>}
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
    backgroundColor: COLORS.white, borderRadius: SIZES.radius,
    overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: COLORS.border,
  },
  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 180, backgroundColor: COLORS.inputBg },
  playBtn: {
    position: 'absolute', top: '50%', left: '50%',
    marginTop: -20, marginLeft: -20,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center',
  },
  info: { padding: 12 },
  title: { fontSize: SIZES.base, fontWeight: '600', color: COLORS.text, marginBottom: 4 },
  description: { fontSize: SIZES.sm, color: COLORS.textLight, marginBottom: 8 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: SIZES.xs, color: COLORS.textMuted },

  emptyText: { textAlign: 'center', color: COLORS.textMuted, padding: 40, fontSize: SIZES.md },
});
