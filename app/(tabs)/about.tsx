import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>About Me</Text>
        <Text style={styles.headerSubtitle}>Get to know me better</Text>
      </View>

      {/* Education Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="school" size={24} color="#6366f1" />
          <Text style={styles.cardTitle}>Education</Text>
        </View>
        <View style={styles.educationItem}>
          <Text style={styles.educationPeriod}>2022 - Present</Text>
          <Text style={styles.educationTitle}>Institut Teknologi dan Kesehatan Mahardika Cirebon</Text>
          <Text style={styles.educationDetail}>Program Studi Informatika - Semester 5</Text>
        </View>
      </View>

      {/* Skills Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="code-slash" size={24} color="#6366f1" />
          <Text style={styles.cardTitle}>Technical Skills</Text>
        </View>
        <View style={styles.skillsGrid}>
          {[
            { name: 'React Native', level: 85 },
            { name: 'JavaScript', level: 90 },
            { name: 'TypeScript', level: 80 },
            { name: 'UI/UX Design', level: 75 },
            { name: 'HTML/CSS', level: 95 },
            { name: 'Node.js', level: 70 },
          ].map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text style={styles.skillPercent}>{skill.level}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${skill.level}%` }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Experience Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="briefcase" size={24} color="#6366f1" />
          <Text style={styles.cardTitle}>Experience</Text>
        </View>
        <View style={styles.experienceItem}>
          <Text style={styles.experiencePeriod}>2024 - Present</Text>
          <Text style={styles.experienceTitle}>Freelance Mobile Developer</Text>
          <Text style={styles.experienceDetail}>
            Mengembangkan aplikasi mobile menggunakan React Native untuk berbagai client
          </Text>
        </View>
        <View style={styles.experienceItem}>
          <Text style={styles.experiencePeriod}>2023 - 2024</Text>
          <Text style={styles.experienceTitle}>UI/UX Designer</Text>
          <Text style={styles.experienceDetail}>
            Mendesain interface untuk aplikasi web dan mobile dengan fokus pada user experience
          </Text>
        </View>
      </View>

      {/* Interests Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="heart" size={24} color="#6366f1" />
          <Text style={styles.cardTitle}>Interests</Text>
        </View>
        <View style={styles.interestsContainer}>
          {[
            { icon: '📱', name: 'Mobile Dev' },
            { icon: '🎨', name: 'UI Design' },
            { icon: '🌐', name: 'Web Tech' },
            { icon: '📚', name: 'Learning' },
            { icon: '🎵', name: 'Music' },
            { icon: '✈️', name: 'Travel' },
          ].map((interest, index) => (
            <View key={index} style={styles.interestItem}>
              <Text style={styles.interestIcon}>{interest.icon}</Text>
              <Text style={styles.interestName}>{interest.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    padding: 30,
    backgroundColor: '#8B4513',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 12,
  },
  educationItem: {
    marginBottom: 12,
  },
  educationPeriod: {
    fontSize: 14,
    color: '#8B4513',
    fontWeight: '600',
    marginBottom: 4,
  },
  educationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  educationDetail: {
    fontSize: 14,
    color: '#6b7280',
  },
  skillsGrid: {
    marginTop: 8,
  },
  skillItem: {
    marginBottom: 16,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  skillPercent: {
    fontSize: 12,
    color: '#8B4513',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B4513',
    borderRadius: 3,
  },
  experienceItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  experiencePeriod: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
    marginBottom: 4,
  },
  experienceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  experienceDetail: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestItem: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  interestIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  interestName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
});