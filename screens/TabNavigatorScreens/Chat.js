// src/screens/ChatScreen.js

import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

const API_GATEWAY_URL = 'http://192.168.43.67:5000'; // Adjust if necessary
const ADMIN_USER_ID = '1'; // Define admin user ID

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [chatId, setChatId] = useState(null);
  const flatListRef = useRef();

  const userId = 6

  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Fetch chat history
        const historyResponse = await fetch(`${API_GATEWAY_URL}/api/chat/history/${userId}`);
        if (!historyResponse.ok) {
          throw new Error('Failed to fetch chat history');
        }
        const userChats = await historyResponse.json();

        // Check if a chat with admin exists
        let existingChat = userChats.find(chat => 
          (chat.senderId === userId && chat.receiverId === ADMIN_USER_ID) ||
          (chat.senderId === ADMIN_USER_ID && chat.receiverId === userId)
        );

        if (existingChat) {
          setChatId(existingChat.chatId);
          setMessages(existingChat.messages);
        } else {
          // Create a new chat
          const createResponse = await fetch(`${API_GATEWAY_URL}/api/chat/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              senderId: userId,
              receiverId: ADMIN_USER_ID,
            }),
          });

          if (!createResponse.ok) {
            throw new Error('Failed to create new chat');
          }

          const createData = await createResponse.json();
          setChatId(createData.chatId);
          setMessages(createData.messages);
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };

    initializeChat();
  }, [userId]);

  // Polling for new messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      if (chatId) {
        try {
          const chatResponse = await fetch(`${API_GATEWAY_URL}/api/chat/${chatId}`);
          if (!chatResponse.ok) {
            throw new Error('Failed to fetch chat messages');
          }
          const chatData = await chatResponse.json();
          setMessages(chatData.messages);
        } catch (error) {
          console.error('Error fetching chat messages:', error);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [chatId]);

  const sendMessage = async () => {
    if (messageText.trim() === '') return;

    try {
      const sendResponse = await fetch(`${API_GATEWAY_URL}/api/chat/${chatId}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: userId,
          message: messageText,
        }),
      });

      if (!sendResponse.ok) {
        throw new Error('Failed to send message');
      }

      const sendData = await sendResponse.json();
      setMessages(sendData.messages);
      setMessageText('');

      // Scroll to the bottom after sending a message
      flatListRef.current.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessageItem = ({ item }) => {
    const isSender = item.senderId === userId;
    return (
      <View className={`mb-2 flex-row ${isSender ? 'justify-end' : 'justify-start'}`}>
        <View className={`max-w-3/4 p-2 rounded-lg ${isSender ? 'bg-blue-500' : 'bg-gray-300'}`}>
          <Text className={`text-white ${isSender ? 'text-right' : 'text-left'}`}>{item.message}</Text>
          <Text className="text-xs text-gray-200 mt-1">
            {new Date(item.timestamp).toLocaleTimeString()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1" 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View className="flex-1 bg-white p-4">
        <Text className="text-xl font-bold mb-4">Chat with Admin</Text>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.messageId}
          renderItem={renderMessageItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        <View className="flex-row items-center border-t border-gray-200 pt-2">
          <TextInput
            className="flex-1 p-2 bg-gray-100 rounded-full mr-2"
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          <TouchableOpacity 
            className="bg-blue-500 rounded-full p-3"
            onPress={sendMessage}
          >
            <Text className="text-white font-bold">Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
