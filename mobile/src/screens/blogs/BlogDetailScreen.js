import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { COLORS, SIZES } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

export default function BlogDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlog();
  }, [id]);

  const loadBlog = async () => {
    try {
      const data = await api.getBlogById(id);
      setBlog(data);
    } catch (error) {
      console.error('Fetch blog error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  if (!blog) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Artikel tidak ditemukan</Text>
      </View>
    );
  }

  const tags = blog.tags || ['Resep', 'Tips', 'Memasak'];

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: blog.image || 'https://via.placeholder.com/400/FFF8F0/E07A2F?text=Blog' }} style={styles.image} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>{blog.title || blog.name}</Text>

          {/* Tags */}
          <View style={styles.tagsRow}>
            {tags.map((tag, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Author & Date */}
          <View style={styles.authorRow}>
            <View style={styles.authorAvatar}>
              <Text style={styles.authorAvatarText}>{(blog.author || 'A')[0]?.toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.authorName}>{blog.author || 'Admin Dapur Mama'}</Text>
              <Text style={styles.date}>{blog.date || blog.createdAt || ''}</Text>
            </View>
          </View>

          {/* Content */}
          <View style={styles.section}>
            <Text style={styles.bodyText}>
              {blog.content || blog.body || blog.excerpt ||
                'Artikel ini membahas tips dan trik memasak untuk para mama di komunitas RT/RW. Semoga bermanfaat untuk memasak sehari-hari keluarga tercinta.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  errorText: { fontSize: SIZES.base, color: COLORS.textMuted },

  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 260, backgroundColor: COLORS.inputBg },
  backBtn: {
    position: 'absolute', top: 50, left: 16,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.overlay, justifyContent: 'center', alignItems: 'center',
  },

  content: { padding: SIZES.padding, paddingBottom: 40 },
  title: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.text, marginBottom: 12 },

  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  tag: {
    backgroundColor: COLORS.secondary + '20', paddingHorizontal: 12,
    paddingVertical: 4, borderRadius: 12,
  },
  tagText: { fontSize: SIZES.xs, color: COLORS.secondary, fontWeight: '600' },

  authorRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 20,
    paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  authorAvatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  authorAvatarText: { color: COLORS.white, fontSize: SIZES.lg, fontWeight: 'bold' },
  authorName: { fontSize: SIZES.md, fontWeight: '600', color: COLORS.text },
  date: { fontSize: SIZES.xs, color: COLORS.textMuted },

  section: { marginBottom: 24 },
  bodyText: { fontSize: SIZES.base, color: COLORS.text, lineHeight: 26 },
});
