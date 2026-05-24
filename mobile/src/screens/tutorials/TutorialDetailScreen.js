import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { COLORS, SIZES } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

export default function TutorialDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTutorial();
  }, [id]);

  const loadTutorial = async () => {
    try {
      const data = await api.getTutorialById(id);
      setTutorial(data);
    } catch (error) {
      console.error('Fetch tutorial error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  if (!tutorial) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Tutorial tidak ditemukan</Text>
      </View>
    );
  }

  const steps = tutorial.steps || [
    'Siapkan semua bahan yang diperlukan.',
    'Panaskan wajan dengan api sedang.',
    'Masukkan bumbu dan tumis hingga harum.',
    'Tambahkan bahan utama dan aduk rata.',
    'Masak hingga matang dan sajikan.',
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Video Player Placeholder */}
        <View style={styles.videoContainer}>
          <Image source={{ uri: tutorial.thumbnail || tutorial.image || 'https://via.placeholder.com/400/2D6A4F/FFF8F0?text=Tutorial' }} style={styles.videoPlaceholder} />
          <View style={styles.playOverlay}>
            <Ionicons name="play-circle" size={64} color={COLORS.white} />
          </View>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>{tutorial.title || tutorial.name}</Text>

          {/* Meta */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={18} color={COLORS.primary} />
              <Text style={styles.metaText}>{tutorial.duration || '10 menit'}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="bar-chart-outline" size={18} color={COLORS.primary} />
              <Text style={styles.metaText}>{tutorial.level || 'Pemula'}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deskripsi</Text>
            <Text style={styles.description}>{tutorial.description || 'Tutorial memasak langkah demi langkah.'}</Text>
          </View>

          {/* Steps */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Langkah-langkah</Text>
            {steps.map((step, i) => (
              <View key={i} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{i + 1}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              </View>
            ))}
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

  videoContainer: { position: 'relative' },
  videoPlaceholder: { width: '100%', height: 260, backgroundColor: '#1a1a1a' },
  playOverlay: {
    ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center',
  },
  backBtn: {
    position: 'absolute', top: 50, left: 16,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.overlay, justifyContent: 'center', alignItems: 'center',
  },

  content: { padding: SIZES.padding, paddingBottom: 40 },
  title: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.text, marginBottom: 12 },

  metaRow: { flexDirection: 'row', gap: 20, marginBottom: 20 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: SIZES.md, color: COLORS.textLight },

  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: SIZES.lg, fontWeight: 'bold', color: COLORS.text,
    marginBottom: 12, paddingBottom: 8,
    borderBottomWidth: 2, borderBottomColor: COLORS.secondary,
  },
  description: { fontSize: SIZES.base, color: COLORS.textLight, lineHeight: 24 },

  stepItem: { flexDirection: 'row', marginBottom: 16 },
  stepNumber: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.secondary,
    justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 2,
  },
  stepNumberText: { color: COLORS.white, fontSize: SIZES.sm, fontWeight: 'bold' },
  stepContent: { flex: 1 },
  stepText: { fontSize: SIZES.base, color: COLORS.text, lineHeight: 22 },
});
