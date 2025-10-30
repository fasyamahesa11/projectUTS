import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Import foto local dari assets
const profileImage = require('@/assets/images/asa.jpg');

export default function HomeScreen() {
  const router = useRouter();

  const handleAvatarPress = () => {
    Alert.alert(
      'Hello! 👋',
      'Selamat datang di portfolio Fasya Mahesa!',
      [{ text: 'Keren!', style: 'default' }]
    );
  };

  const handleCTAPress = () => {
    router.push('/(tabs)/project');
  };

  const handleSkillPress = (skill: string) => {
    Alert.alert(
      `Skill: ${skill}`,
      `Fasya memiliki pengalaman dalam ${skill}`,
      [{ text: 'Mantap!', style: 'default' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section dengan Background Text BESAR */}
      <View style={styles.header}>
        {/* Background Text BESAR FULL di Header */}
        <Text style={styles.headerBackgroundText}>PORTFOLIO</Text>
        
        <TouchableOpacity 
          style={styles.avatarContainer}
          onPress={handleAvatarPress}
          activeOpacity={0.8}
        >
          <Image
            source={profileImage}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.name}>Fasya Mahesa</Text>
        <Text style={styles.title}>Mobile Developer</Text>
        <Text style={styles.subtitle}>Informatika - Semester 5</Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>10+</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>2+</Text>
          <Text style={styles.statLabel}>Years</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5+</Text>
          <Text style={styles.statLabel}>Tech Skills</Text>
        </View>
      </View>

      {/* Quick Intro */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hello! 👋</Text>
        <Text style={styles.cardText}>
          Saya adalah mahasiswa aktif Program Studi Informatika di Institut Teknologi dan Kesehatan Mahardika Cirebon. 
          Passionate dalam pengembangan aplikasi mobile dan web development.
        </Text>
      </View>

      {/* Featured Skills */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Featured Skills</Text>
        <View style={styles.skillsContainer}>
          {['React Native', 'JavaScript', 'TypeScript', 'UI/UX Design'].map((skill, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.skillTag}
              onPress={() => handleSkillPress(skill)}
              activeOpacity={0.7}
            >
              <Text style={styles.skillText}>{skill}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* CTA Button */}
      <TouchableOpacity 
        style={styles.ctaButton}
        onPress={handleCTAPress}
        activeOpacity={0.8}
      >
        <Text style={styles.ctaText}>View My Projects</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#8B4513',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 280, // Pastikan header cukup tinggi untuk text besar
  },
  headerBackgroundText: {
    position: 'absolute',
    fontSize: 140, // SANGAT BESAR
    fontWeight: '900', // Extra bold
    color: 'rgba(255, 248, 225, 0.15)', // Cream transparan
    letterSpacing: 5, // Spasi antar huruf
    top: '40%', // Posisi vertikal tengah
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 0,
    textTransform: 'uppercase', // Pastikan huruf besar semua
    // Efek blur ringan untuk kesan premium
    textShadowColor: 'rgba(255, 248, 225, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    zIndex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  title: {
    fontSize: 18,
    color: '#F5F5DC',
    marginTop: 4,
    zIndex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#D4AF37',
    marginTop: 2,
    zIndex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -25,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    minWidth: 80,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  skillTag: {
    backgroundColor: '#F5F5DC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: '#8B4513',
    fontSize: 12,
    fontWeight: '500',
  },
  ctaButton: {
    flexDirection: 'row',
    backgroundColor: '#8B4513',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});