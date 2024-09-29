import { View, Text, Image, TextInput, TouchableOpacity, Modal, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import GoBackHeader from '../components/GoBackHeader';
import { makeAuthenticatedRequest } from '../auth/AuthHelper';
import { Ionicons } from '@expo/vector-icons';

const Profile = ({ navigation }) => {
  // Profile data states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); // Track password state

  // Modal states for password change
  const [isModalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userId = 6; // Example user ID

  // Fetch User Profile
  const fetchUserProfile = async (userId) => {
    const path = `/user/view-profile/${userId}`;
    const method = 'GET';
    const body = null;

    const response = await makeAuthenticatedRequest(path, method, body);

    if (response.success) {
      const user = response.data.users;
      setEmail(user.email || '');
      setName(user.name || '');
      setCity(user.city || '');
      setPhone(user.phoneNumber || '');
      setPassword(''); // Reset password field on profile load
    } else {
      console.error('Failed to fetch user profile:', response.message);
    }
  };
  
  useEffect(() => {
    fetchUserProfile(userId); // Fetch user profile when the component loads
  }, []); 

  // Save Changes button handler
  const handleSaveChanges = async (userId) => {
    const path = `/user/update-profile/${userId}`;
    const method = 'PUT';

    // Construct the body of the request
    const body = {
      email,
      name,
      city,
      role: 'CUSTOMER', // Assuming the role is constant for this user
      password: password
    };

    console.log('Request body: ', body); // Log request body to check what is being sent

    const response = await makeAuthenticatedRequest(path, method, body);
    
    console.log('API Response: ', response); // Debug response from the API
    
    if (response.success) {
      console.log('Profile Updated: ', body);
      alert('Profile updated successfully!');
    } else {
      console.error('Failed to update profile:', response.message);
      alert('Failed to update profile.');
    }
  };

  // Handle Password Change Submission
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setPassword(newPassword); // Set new password to profile
    setModalVisible(false); // Close modal after password is set
  };

  return (
    <View className='flex-1 bg-white'>
      <GoBackHeader />

      {/* Profile Content */}
      <View className='inline-flex items-center relative mt-6'>
        <Image
          source={require('../assets/png/profile_image.png')}
          resizeMode='contain'
          className='h-36 w-36 rounded-full'
        />
        <View className='absolute bottom-3 right-36'>
          <Ionicons name="camera" size={28} color={'#22c55e'} />
        </View>
      </View>

      <View className='flex-1 items-start justify-start px-8 mt-7'>
        <View>
          <Text className='text-lg text-gray-400/90 font-medium'>
            Name
          </Text>
          <TextInput
            className='text-lg text-gray-500 font-normal px-6 mt-2.5'
            value={name}
            onChangeText={setName}
            placeholder='Enter Name'
            keyboardType='default'
          />
        </View>

        <View className='mt-6'>
          <Text className='text-lg text-gray-400/90 font-medium'>
            Email
          </Text>
          <TextInput
            className='text-lg text-gray-500 font-normal px-6 mt-2.5'
            value={email}
            onChangeText={setEmail}
            placeholder='Enter Email'
            keyboardType='default'
          />
        </View>

        <View className='mt-6'>
          <Text className='text-lg text-gray-400/90 font-medium'>
            City
          </Text>
          <TextInput
            className='text-lg text-gray-500 font-normal px-6 mt-2.5'
            value={city}
            onChangeText={setCity}
            placeholder='Enter City'
            keyboardType='default'
          />
        </View>

        {/* Button to open password change modal */}
        <TouchableOpacity onPress={() => setModalVisible(true)} className='w-full mt-8'>
          <Text className='text-lg text-gray-500/80 font-medium text-center'>
            Change Password
          </Text>
        </TouchableOpacity>

        <View className='flex-1 w-full justify-end mb-10'>
          <TouchableOpacity className='items-center bg-green-500 rounded-xl py-2' onPress={() => handleSaveChanges(6)}>
            <Text className='text-lg text-white font-medium'>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for changing password */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back button press
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text className="text-lg text-gray-600 font-medium mb-4">Change Password</Text>
            
            <TextInput
              className='text-lg text-gray-500 font-normal px-6 mt-2.5'
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder='New Password'
              secureTextEntry
            />

            <TextInput
              className='text-lg text-gray-500 font-normal px-6 mt-2.5'
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder='Confirm Password'
              secureTextEntry
            />

            <View className="flex-row justify-between mt-4">
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="gray" />
              <Button title="Change" onPress={handleChangePassword} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
