import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

// Key untuk storage
const MESSAGES_KEY = 'portfolio_messages';

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [savedMessages, setSavedMessages] = useState<any[]>([]);
  const router = useRouter();

  // Load messages dari storage saat component mount
  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const messagesJson = await SecureStore.getItemAsync(MESSAGES_KEY);
      if (messagesJson) {
        const messages = JSON.parse(messagesJson);
        setSavedMessages(messages);
      }
    } catch (error) {
      console.log('Error loading messages:', error);
    }
  };

  const saveMessages = async (messages: any[]) => {
    try {
      await SecureStore.setItemAsync(MESSAGES_KEY, JSON.stringify(messages));
      setSavedMessages(messages);
    } catch (error) {
      console.log('Error saving messages:', error);
    }
  };

  const contactMethods = [
    {
      icon: 'mail',
      title: 'Email',
      value: 'fasya.mahesa@email.com',
      action: () => Linking.openURL('mailto:fasyamahesa011@email.com'),
      color: '#8B4513',
    },
    {
      icon: 'call',
      title: 'Phone',
      value: '+62 88220411341',
      action: () => Linking.openURL('tel:+6288220411341'),
      color: '#A0522D',
    },
    {
      icon: 'location',
      title: 'Location',
      value: 'Cirebon, Jawa Barat',
      action: () => Linking.openURL('https://www.google.com/maps/place/Jl.+Kesepuhan,+Kesepuhan,+Kec.+Lemahwungkuk,+Kota+Cirebon,+Jawa+Barat+45114/@-6.7268991,108.5682779,17z/data=!3m1!4b1!4m6!3m5!1s0x2e6ee2800fef2d8d:0xc24480e24c2f881c!8m2!3d-6.7269044!4d108.5708528!16s%2Fg%2F1hm1ynnpw?entry=ttu&g_ep=EgoyMDI1MTAyNy4wIKXMDSoASAFQAw%3D%3D'),
      color: '#D4AF37',
    },
  ];

  const socialMedia = [
    {
      icon: 'logo-github',
      name: 'GitHub',
      username: '@fasyamahesa11',
      url: 'https://github.com/fasyamahesa11',
      color: '#8B4513',
    },
    {
      icon: 'logo-linkedin',
      name: 'LinkedIn',
      username: '@fasyamahesa',
      url: 'https://linkedin.com',
      color: '#A0522D',
    },
    {
      icon: 'logo-instagram',
      name: 'Instagram',
      username: '@fasyamashh__',
      url: 'https://www.instagram.com/fasyamashh__/',
      color: '#D4AF37',
    },
    {
      icon: 'logo-twitter',
      name: 'Twitter',
      username: '@11folders__',
      url: 'https://twitter.com',
      color: '#8B4513',
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = async () => {
    // Validasi form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      Alert.alert('Error', 'Harap isi semua field!');
      return;
    }

    // Validasi email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Format email tidak valid!');
      return;
    }

    // Buat message object dengan timestamp
    const newMessage = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
      timestamp: new Date().toLocaleString('id-ID')
    };

    // Simpan ke storage
    const updatedMessages = [...savedMessages, newMessage];
    await saveMessages(updatedMessages);

    // Tampilkan notifikasi sukses
    Alert.alert(
      'Sukses! 🎉',
      `Pesan dari ${formData.name} berhasil disimpan!\n\nTotal pesan tersimpan: ${updatedMessages.length}`,
      [
        { 
          text: 'Lihat Semua Pesan', 
          onPress: () => router.push('/(tabs)/messages')
        },
        { 
          text: 'OK', 
          onPress: () => {
            // Reset form
            setFormData({
              name: '',
              email: '',
              message: ''
            });
          }
        }
      ]
    );
  };

  const clearAllMessages = async () => {
    if (savedMessages.length === 0) {
      Alert.alert('Info', 'Tidak ada pesan untuk dihapus.');
      return;
    }

    Alert.alert(
      'Hapus Semua Pesan',
      `Yakin ingin menghapus semua ${savedMessages.length} pesan yang tersimpan?`,
      [
        { 
          text: 'Batal', 
          style: 'cancel' 
        },
        { 
          text: 'Hapus Semua', 
          style: 'destructive',
          onPress: async () => {
            await SecureStore.deleteItemAsync(MESSAGES_KEY);
            setSavedMessages([]);
            Alert.alert('Berhasil!', 'Semua pesan telah dihapus.');
          }
        }
      ]
    );
  };

  const handleSocialPress = (name: string, url: string) => {
    Linking.openURL(url).catch(err => 
      Alert.alert('Error', `Tidak bisa membuka ${name}`)
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Get In Touch</Text>
        <Text style={styles.headerSubtitle}>Let's work together!</Text>
      </View>

      {/* Contact Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.contactCards}>
          {contactMethods.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactCard}
              onPress={item.action}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon as any} size={24} color="#fff" />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{item.title}</Text>
                <Text style={styles.contactValue}>{item.value}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Social Media */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Social Media</Text>
        <View style={styles.socialGrid}>
          {socialMedia.map((social, index) => (
            <TouchableOpacity
              key={index}
              style={styles.socialCard}
              onPress={() => handleSocialPress(social.name, social.url)}
              activeOpacity={0.7}
            >
              <View style={[styles.socialIcon, { backgroundColor: social.color }]}>
                <Ionicons name={social.icon as any} size={24} color="#fff" />
              </View>
              <Text style={styles.socialName}>{social.name}</Text>
              <Text style={styles.socialUsername}>{social.username}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Contact Form */}
      <View style={styles.section}>
        <View style={styles.formHeader}>
          <Text style={styles.sectionTitle}>Send Message</Text>
          {savedMessages.length > 0 && (
            <TouchableOpacity 
              style={styles.messageCountContainer}
              onPress={() => router.push('/(tabs)/messages')}
              activeOpacity={0.7}
            >
              <Text style={styles.messageCount}>
                📨 {savedMessages.length} pesan
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.formCard}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan nama Anda"
              placeholderTextColor="#9ca3af"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="masukkan.email@example.com"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tulis pesan Anda di sini..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={formData.message}
              onChangeText={(text) => handleInputChange('message', text)}
            />
          </View>

          <View style={styles.formActions}>
            <TouchableOpacity 
              style={[
                styles.submitButton,
                (!formData.name || !formData.email || !formData.message) && styles.submitButtonDisabled
              ]}
              onPress={handleFormSubmit}
              activeOpacity={0.8}
              disabled={!formData.name || !formData.email || !formData.message}
            >
              <Text style={styles.submitButtonText}>Simpan Pesan</Text>
              <Ionicons name="save" size={16} color="#fff" />
            </TouchableOpacity>

            {savedMessages.length > 0 && (
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={clearAllMessages}
                activeOpacity={0.7}
              >
                <Text style={styles.clearButtonText}>Hapus Semua</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Fasya Mahesa. All rights reserved.</Text>
        {savedMessages.length > 0 && (
          <Text style={styles.footerSubtext}>
            {savedMessages.length} pesan tersimpan di perangkat
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

// Styles tetap sama seperti sebelumnya
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
    color: '#F5F5DC',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  messageCountContainer: {
    backgroundColor: '#F5F5DC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  messageCount: {
    fontSize: 12,
    color: '#8B4513',
    fontWeight: '600',
  },
  contactCards: {
    gap: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    color: '#6b7280',
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  socialCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  socialName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  socialUsername: {
    fontSize: 12,
    color: '#6b7280',
  },
  formCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 14,
    color: '#374151',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#8B4513',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
  },
  clearButtonText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 10,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
});