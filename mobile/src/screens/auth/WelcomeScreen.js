import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { COLORS, SIZES } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.logo}>🍳</Text>
          <Text style={styles.title}>Dapur Mama</Text>
          <Text style={styles.subtitle}>Masakan Rumahan untuk Keluarga Tercinta</Text>
        </View>

        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Ionicons name="restaurant" size={32} color={COLORS.primary} />
            <Text style={styles.featureTitle}>Resep Lezat</Text>
            <Text style={styles.featureDesc}>Ribuan resep rumahan</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="videocam" size={32} color={COLORS.primary} />
            <Text style={styles.featureTitle}>Tutorial Masak</Text>
            <Text style={styles.featureDesc}>Video langkah demi langkah</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="people" size={32} color={COLORS.primary} />
            <Text style={styles.featureTitle}>Komunitas</Text>
            <Text style={styles.featureDesc}>Berbagi dengan tetangga</Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Masuk</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerButtonText}>Daftar Sekarang</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 72,
    marginBottom: 16,
  },
  title: {
    fontSize: SIZES.header,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: SIZES.base,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 48,
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  featureTitle: {
    fontSize: SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: SIZES.xs,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  buttons: {
    gap: 12,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  registerButtonText: {
    color: COLORS.secondary,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
});
