import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { COLORS, SIZES } from '../../styles/theme';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Keluar', 'Apakah kamu yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: logout },
    ]);
  };

  const menuItems = [
    { icon: 'heart-outline', title: 'Resep Favorit', screen: null },
    { icon: 'bookmark-outline', title: 'Tersimpan', screen: null },
    { icon: 'notifications-outline', title: 'Notifikasi', screen: null },
    { icon: 'settings-outline', title: 'Pengaturan', screen: null },
    { icon: 'help-circle-outline', title: 'Bantuan', screen: null },
    { icon: 'information-circle-outline', title: 'Tentang Dapur Mama', screen: null },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(user?.name || 'M')[0]?.toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Mama'}</Text>
        <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Resep</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Tutorial</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Favorit</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuCard}>
        {menuItems.map((item, i) => (
          <TouchableOpacity key={i} style={styles.menuItem}>
            <Ionicons name={item.icon} size={22} color={COLORS.textLight} />
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Dapur Mama v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: 40 },
  header: { paddingTop: 60, paddingHorizontal: SIZES.padding, paddingBottom: 12 },
  headerTitle: { fontSize: SIZES.xxl, fontWeight: 'bold', color: COLORS.text },

  profileCard: {
    backgroundColor: COLORS.white, marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radiusLarge, padding: 24, alignItems: 'center',
    marginBottom: 16, borderWidth: 1, borderColor: COLORS.border,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
  },
  avatarText: { color: COLORS.white, fontSize: SIZES.title, fontWeight: 'bold' },
  name: { fontSize: SIZES.xl, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
  email: { fontSize: SIZES.md, color: COLORS.textLight, marginBottom: 20 },

  statsRow: { flexDirection: 'row', alignItems: 'center' },
  statItem: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: SIZES.xl, fontWeight: 'bold', color: COLORS.primary },
  statLabel: { fontSize: SIZES.xs, color: COLORS.textMuted, marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: COLORS.border },

  menuCard: {
    backgroundColor: COLORS.white, marginHorizontal: SIZES.padding,
    borderRadius: SIZES.radius, overflow: 'hidden', marginBottom: 16,
    borderWidth: 1, borderColor: COLORS.border,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 16,
    paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  menuTitle: { flex: 1, marginLeft: 14, fontSize: SIZES.base, color: COLORS.text },

  logoutButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginHorizontal: SIZES.padding, paddingVertical: 14,
    backgroundColor: COLORS.white, borderRadius: SIZES.radius,
    borderWidth: 1, borderColor: COLORS.error,
  },
  logoutText: { fontSize: SIZES.base, color: COLORS.error, fontWeight: '600', marginLeft: 8 },

  version: {
    textAlign: 'center', fontSize: SIZES.xs, color: COLORS.textMuted,
    marginTop: 20,
  },
});
