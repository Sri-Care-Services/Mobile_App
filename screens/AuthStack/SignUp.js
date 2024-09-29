import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import GoBack from '../../components/GoBack';
import { BASE_URL } from '@env';

const Details = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');
    const [name, onChangeName] = useState('');
    const [password, onChangePassword] = useState('');
    const [confirmPassword, onChangeConfirmPassword] = useState('');
    const [city, onChangeCity] = useState('');
    const [role, onChangeRole] = useState('CUSTOMER');
    
    const [focusedInput, setFocusedInput] = useState(null);

    // Function to handle user registration
    const handleRegistration = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Password Mismatch', 'Please ensure that the passwords match.');
            return;
        }

        const userData = {
            email,
            name,
            password,
            city,
            role
        };

        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Registration Successful', 'You have registered successfully!');
                navigation.navigate('GetStartedAndSignIn'); 
            } else {
                Alert.alert('Registration Failed' || 'Please try again.');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred. Please try again later.');
            console.error(error);
        }
    };

    return (
        <View className='flex-1 bg-white'>
            <GoBack />
            <View className='flex-1 px-8 mt-8'>
                <FontAwesome6 name="contact-card" size={36} color="lightgray" />
                
                <Text className='text-black text-2xl font-bold mt-5'>
                    Your details
                </Text>
                <Text className='text-gray-500 text-base leading-5 mt-3'>
                    Please provide your personal details to continue. This information will help us to create your account and personalize your experience.
                </Text>

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-5 text-base font-light ${focusedInput === 'email' ? 'border-2 border-green-400' : ''}`}
                    value={email}
                    onChangeText={onChangeEmail}
                    placeholder={'Email'}
                    keyboardType={'default'}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}    
                />

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-4 text-base font-light ${focusedInput === 'name' ? 'border-2 border-green-400' : ''}`}
                    value={name}
                    onChangeText={onChangeName}
                    placeholder={'Name'}
                    keyboardType={'default'}
                    onFocus={() => setFocusedInput('name')}
                    onBlur={() => setFocusedInput(null)}    
                />

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-4 text-base font-light ${focusedInput === 'city' ? 'border-2 border-green-400' : ''}`}
                    value={city}
                    onChangeText={onChangeCity}
                    placeholder={'City'}
                    keyboardType={'default'}
                    onFocus={() => setFocusedInput('city')}
                    onBlur={() => setFocusedInput(null)}    
                />

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-4 text-base font-light ${focusedInput === 'password' ? 'border-2 border-green-400' : ''}`}
                    value={password}
                    onChangeText={onChangePassword}
                    placeholder={'Enter Password'}
                    keyboardType={'default'}
                    secureTextEntry={true} // Hide password input
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}    
                />

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-4 text-base font-light ${focusedInput === 'confirmPassword' ? 'border-2 border-green-400' : ''}`}
                    value={confirmPassword}
                    onChangeText={onChangeConfirmPassword}
                    placeholder={'Confirm Password'}
                    keyboardType={'default'}
                    secureTextEntry={true} // Hide password input
                    onFocus={() => setFocusedInput('confirmPassword')}
                    onBlur={() => setFocusedInput(null)}    
                />

                <View className='flex-1 justify-end mb-16'>
                    <Pressable onPress={handleRegistration} className='w-full bg-green-500 rounded-xl py-3.5'>
                        <Text className='text-white text-lg text-center font-semibold'>Continue</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default Details;
