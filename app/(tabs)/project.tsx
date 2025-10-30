import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProjectsScreen() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Mobile App',
      description: 'Aplikasi e-commerce dengan fitur cart, payment gateway, dan user authentication',
      image: 'https://via.placeholder.com/300x200/6366f1/ffffff?text=E-Commerce',
      technologies: ['React Native', 'Firebase', 'Node.js'],
      status: 'Completed',
      github: 'https://github.com',
      demo: 'https://expo.dev',
    },
    {
      id: 2,
      title: 'Weather Forecast App',
      description: 'Aplikasi prakiraan cuaca dengan real-time updates dan location-based service',
      image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Weather',
      technologies: ['React Native', 'API Integration', 'Geolocation'],
      status: 'In Progress',
      github: 'https://github.com',
      demo: 'https://expo.dev',
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'Aplikasi manajemen tugas dengan drag & drop functionality dan reminders',
      image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Tasks',
      technologies: ['React Native', 'Redux', 'Push Notifications'],
      status: 'Completed',
      github: 'https://github.com',
      demo: 'https://expo.dev',
    },
    {
      id: 4,
      title: 'Social Media Dashboard',
      description: 'Dashboard analytics untuk media sosial dengan charts dan real-time data',
      image: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=Dashboard',
      technologies: ['React Native', 'Chart.js', 'REST API'],
      status: 'Planning',
      github: 'https://github.com',
      demo: 'https://expo.dev',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return '#10b981';
      case 'In Progress': return '#f59e0b';
      case 'Planning': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const handleGithubPress = (url: string) => {
    Linking.openURL(url).catch(err => 
      Alert.alert('Error', 'Tidak bisa membuka GitHub')
    );
  };

  const handleDemoPress = (url: string) => {
    Linking.openURL(url).catch(err => 
      Alert.alert('Error', 'Tidak bisa membuka demo')
    );
  };

  const handleProjectPress = (project: any) => {
    Alert.alert(
      project.title,
      project.description,
      [
        { text: 'Lihat Demo', onPress: () => handleDemoPress(project.demo) },
        { text: 'Lihat Code', onPress: () => handleGithubPress(project.github) },
        { text: 'Tutup', style: 'cancel' }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Projects</Text>
        <Text style={styles.headerSubtitle}>Showcase of my work</Text>
      </View>

      {/* Projects Grid */}
      <View style={styles.projectsContainer}>
        {projects.map((project) => (
          <TouchableOpacity 
            key={project.id} 
            style={styles.projectCard}
            onPress={() => handleProjectPress(project)}
            activeOpacity={0.7}
          >
            {/* Project Image */}
            <Image
              source={{ uri: project.image }}
              style={styles.projectImage}
            />
            
            {/* Project Status */}
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
              <Text style={styles.statusText}>{project.status}</Text>
            </View>

            {/* Project Content */}
            <View style={styles.projectContent}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectDescription}>{project.description}</Text>
              
              {/* Technologies */}
              <View style={styles.technologiesContainer}>
                {project.technologies.map((tech, index) => (
                  <View key={index} style={styles.techTag}>
                    <Text style={styles.techText}>{tech}</Text>
                  </View>
                ))}
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() => handleGithubPress(project.github)}
                  activeOpacity={0.6}
                >
                  <Ionicons name="logo-github" size={16} color="#374151" />
                  <Text style={styles.buttonText}>Code</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.demoButton]}
                  onPress={() => handleDemoPress(project.demo)}
                  activeOpacity={0.6}
                >
                  <Ionicons name="play-circle" size={16} color="#fff" />
                  <Text style={[styles.buttonText, styles.demoButtonText]}>Demo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats Footer */}
      <View style={styles.statsFooter}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{projects.length}</Text>
          <Text style={styles.statLabel}>Total Projects</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {projects.filter(p => p.status === 'Completed').length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {projects.filter(p => p.status === 'In Progress').length}
          </Text>
          <Text style={styles.statLabel}>In Progress</Text>
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
  projectsContainer: {
    padding: 16,
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: 160,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  projectContent: {
    padding: 16,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  technologiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  techTag: {
    backgroundColor: '#F5F5DC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  techText: {
    color: '#8B4513',
    fontSize: 10,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  demoButton: {
    backgroundColor: '#8B4513',
    marginRight: 0,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  demoButtonText: {
    color: '#fff',
  },
  statsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
});