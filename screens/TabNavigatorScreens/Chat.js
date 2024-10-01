import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';

const API_GATEWAY_URL = 'http://192.168.43.67:8084'; 
const ADMIN_USER_ID = '1'; 
const INITIAL_MESSAGE = { 
  messageId: 'system1', 
  message: 'Welcome! Feel free to clarify any questions, problems, or doubts you may have.', 
  senderId: ADMIN_USER_ID, 
  timestamp: new Date().toISOString() 
};

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [chatId, setChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const flatListRef = useRef();

  const userId = '6';

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
          console.log(`Chat initialized. ChatId: ${existingChat.chatId}, ReceiverId: ${ADMIN_USER_ID}, SenderId: ${userId}`);
          
          // Check if INITIAL_MESSAGE is already present
          const hasInitialMessage = existingChat.messages.some(msg => msg.messageId === INITIAL_MESSAGE.messageId);
          if (!hasInitialMessage) {
            setMessages([INITIAL_MESSAGE, ...existingChat.messages]);
          } else {
            setMessages(existingChat.messages);
          }
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
          console.log(`New chat created. ChatId: ${createData.chatId}, ReceiverId: ${ADMIN_USER_ID}, SenderId: ${userId}`);
          
          // Add INITIAL_MESSAGE if not included in createData.messages
          const hasInitialMessage = createData.messages.some(msg => msg.messageId === INITIAL_MESSAGE.messageId);
          if (!hasInitialMessage) {
            setMessages([INITIAL_MESSAGE, ...createData.messages]);
          } else {
            setMessages(createData.messages);
          }
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
        Alert.alert('Error', error.message);
      } finally {
        setIsLoading(false);
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

          // Append only new messages
          setMessages(prevMessages => {
            const existingMessageIds = new Set(prevMessages.map(msg => msg.messageId));
            const newMessages = chatData.messages.filter(msg => !existingMessageIds.has(msg.messageId));
            if (newMessages.length > 0) {
              return [...prevMessages, ...newMessages];
            }
            return prevMessages;
          });

        } catch (error) {
          console.error('Error fetching chat messages:', error);
          // Optionally, show a non-intrusive notification or silently handle the error
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [chatId]);

  const sendMessage = async () => {
    if (messageText.trim() === '') return;

    setIsSending(true);
    const tempMessageId = `temp-${Date.now()}`; // Temporary ID for optimistic UI

    const newMessage = {
      messageId: tempMessageId, // Temporary ID
      message: messageText,
      senderId: userId, // Correct sender ID as a string
      timestamp: new Date().toISOString(),
    };

    // Optimistically add the message to the chat
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessageText('');

    try {
      const sendResponse = await fetch(`${API_GATEWAY_URL}/api/chat/${chatId}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: userId, // Ensure the senderId is correct
          message: messageText,
        }),
      });

      if (!sendResponse.ok) {
        throw new Error('Failed to send message');
      }

      const sendData = await sendResponse.json();
      console.log('sendData:', sendData);

      // Replace the temporary message with the one from the server
      setMessages(prevMessages => prevMessages.map(msg => {
        if (msg.messageId === tempMessageId) {
          return sendData.messages.find(serverMsg => serverMsg.messageId === sendData.messages.slice(-1)[0].messageId) || msg;
        }
        return msg;
      }));

      // Scroll to the bottom after sending a message
      flatListRef.current.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message. Please try again.');
      
      // Remove the optimistically added message
      setMessages(prevMessages => prevMessages.filter(msg => msg.messageId !== tempMessageId));
    } finally {
      setIsSending(false);
    }
  };

  const renderMessageItem = ({ item }) => {
    const isSender = item.senderId === userId; // Determines if the message is from the user

    return (
      <View 
        style={{ 
          flexDirection: 'row', 
          justifyContent: isSender ? 'flex-end' : 'flex-start', // Aligns message accordingly
          marginBottom: 10 
        }}
      >
        <View 
          style={{
            maxWidth: '75%',
            alignItems: isSender ? 'flex-end' : 'flex-start', // Aligns text accordingly
          }}
        >
          {/* Label "You" or "Admin" */}
          <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 3, color: '#555' }}>
            {isSender ? 'You' : 'Admin'}
          </Text>

          <View
            style={{
              backgroundColor: isSender ? '#007bff' : '#28a745', // Blue for user, green for admin
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: 'white', fontSize: 14 }}>
              {item.message}
            </Text>
            <Text style={{ color: '#d1d1d1', fontSize: 10, marginTop: 5 }}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading Chat...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Chat</Text>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.messageId}
          renderItem={renderMessageItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        />
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: '#eee', paddingVertical: 10 }}>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: '#f1f1f1',
              padding: 10,
              borderRadius: 20,
              marginRight: 10,
            }}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          <TouchableOpacity 
            style={{
              backgroundColor: isSending ? '#aaa' : '#007bff',
              borderRadius: 50,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={sendMessage}
            disabled={isSending}
          >
            {isSending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
