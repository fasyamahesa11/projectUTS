import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

// Key untuk storage
const MESSAGES_KEY = 'portfolio_messages';

export default function MessagesScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);

  // Load messages dari storage saat component mount
  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const messagesJson = await SecureStore.getItemAsync(MESSAGES_KEY);
      if (messagesJson) {
        const loadedMessages = JSON.parse(messagesJson);
        setMessages(loadedMessages);
      }
    } catch (error) {
      console.log('Error loading messages:', error);
    }
  };

  const saveMessages = async (updatedMessages: any[]) => {
    try {
      await SecureStore.setItemAsync(MESSAGES_KEY, JSON.stringify(updatedMessages));
      setMessages(updatedMessages);
    } catch (error) {
      console.log('Error saving messages:', error);
    }
  };

  const clearAllMessages = async () => {
    if (messages.length === 0) {
      Alert.alert('Info', 'Tidak ada pesan untuk dihapus.');
      return;
    }

    Alert.alert(
      'Hapus Semua Pesan',
      `Yakin ingin menghapus semua ${messages.length} pesan?`,
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
            setMessages([]);
            Alert.alert('Berhasil!', 'Semua pesan telah dihapus.');
          }
        }
      ]
    );
  };

  const deleteMessage = async (messageId: string) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    await saveMessages(updatedMessages);
    Alert.alert('Berhasil', 'Pesan telah dihapus.');
  };

  if (messages.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pesan Masuk</Text>
          <View style={styles.placeholder} />
        </View>
        
        <View style={styles.emptyState}>
          <Ionicons name="mail-open-outline" size={64} color="#9ca3af" />
          <Text style={styles.emptyTitle}>Belum ada pesan</Text>
          <Text style={styles.emptyText}>
            Semua pesan yang dikirim melalui form kontak akan muncul di sini.
          </Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => router.push('/(tabs)/contact')}
          >
            <Text style={styles.contactButtonText}>Pergi ke Form Kontak</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pesan Masuk ({messages.length})</Text>
        <TouchableOpacity onPress={clearAllMessages} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <ScrollView style={styles.messagesList}>
        {messages.map((message, index) => (
          <View key={message.id} style={styles.messageCard}>
            <View style={styles.messageHeader}>
              <View style={styles.senderInfo}>
                <Text style={styles.senderName}>{message.name}</Text>
                <Text style={styles.senderEmail}>{message.email}</Text>
              </View>
              <View style={styles.messageActions}>
                <Text style={styles.timestamp}>{message.timestamp}</Text>
                <TouchableOpacity 
                  onPress={() => deleteMessage(message.id)}
                  style={styles.deleteIcon}
                >
                  <Ionicons name="close" size={16} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.messageText}>{message.message}</Text>
            
            <View style={styles.messageFooter}>
              <Text style={styles.messageId}>Pesan #{index + 1}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Styles tetap sama seperti sebelumnya
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#8B4513',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  deleteButton: {
    padding: 8,
  },
  placeholder: {
    width: 40,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
  contactButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  messagesList: {
    flex: 1,
    padding: 16,
  },
  messageCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  senderInfo: {
    flex: 1,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  senderEmail: {
    fontSize: 12,
    color: '#6366f1',
  },
  messageActions: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 10,
    color: '#9ca3af',
    marginBottom: 4,
  },
  deleteIcon: {
    padding: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  messageFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 8,
  },
  messageId: {
    fontSize: 10,
    color: '#9ca3af',
    fontFamily: 'monospace',
  },
});