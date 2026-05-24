import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { COLORS, SIZES } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

export default function RecipeDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      const data = await api.getRecipeById(id);
      setRecipe(data);
    } catch (error) {
      console.error('Fetch recipe error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color={COLORS.primary} /></View>;
  }

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Resep tidak ditemukan</Text>
      </View>
    );
  }

  const ingredients = recipe.ingredients || [
    '500g ayam', '3 siung bawang putih', '2 cm jahe',
    '1 sdt garam', '1/2 sdt merica', '2 sdm minyak goreng',
  ];

  const steps = recipe.steps || recipe.instructions || [
    'Cuci bersih ayam dan potong sesuai selera.',
    'Haluskan bawang putih dan jahe.',
    'Lumuri ayam dengan bumbu halus, garam, dan merica. Diamkan 30 menit.',
    'Panaskan minyak dalam wajan, goreng ayam hingga kecoklatan.',
    'Angkat dan sajikan hangat.',
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.image || 'https://via.placeholder.com/400/FFF8F0/E07A2F?text=Resep' }} style={styles.image} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>{recipe.title || recipe.name}</Text>

          {/* Meta */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={18} color={COLORS.primary} />
              <Text style={styles.metaText}>{recipe.cookTime || '30 menit'}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="people-outline" size={18} color={COLORS.primary} />
              <Text style={styles.metaText}>{recipe.servings || '4 porsi'}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="flame-outline" size={18} color={COLORS.primary} />
              <Text style={styles.metaText}>{recipe.difficulty || 'Mudah'}</Text>
            </View>
          </View>

          {/* Description */}
          {recipe.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Deskripsi</Text>
              <Text style={styles.description}>{recipe.description}</Text>
            </View>
          )}

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bahan-bahan</Text>
            {ingredients.map((item, i) => (
              <View key={i} style={styles.ingredientItem}>
                <View style={styles.bullet} />
                <Text style={styles.ingredientText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Steps */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Langkah-langkah</Text>
            {(Array.isArray(steps) ? steps : steps.split('\n').filter(Boolean)).map((step, i) => (
              <View key={i} style={styles.stepItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{i + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
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

  imageContainer: { position: 'relative' },
  image: { width: '100%', height: 280, backgroundColor: COLORS.inputBg },
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
    borderBottomWidth: 2, borderBottomColor: COLORS.primary,
  },
  description: { fontSize: SIZES.base, color: COLORS.textLight, lineHeight: 24 },

  ingredientItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  bullet: {
    width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.primary, marginRight: 10,
  },
  ingredientText: { fontSize: SIZES.base, color: COLORS.text, flex: 1 },

  stepItem: { flexDirection: 'row', marginBottom: 16 },
  stepNumber: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 2,
  },
  stepNumberText: { color: COLORS.white, fontSize: SIZES.sm, fontWeight: 'bold' },
  stepText: { fontSize: SIZES.base, color: COLORS.text, flex: 1, lineHeight: 22 },
});
