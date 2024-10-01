import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { login } from '../../auth/AuthHelper'; 

const SignUpEmail = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to handle login
    const handleLogin = async () => {
        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if (result.success) {
            Alert.alert('Login Successful', 'You have been logged in successfully!');
            navigation.navigate('HomeScreen'); 
        } else {
            Alert.alert('Login Failed', result.message || 'Invalid credentials. Please try again.');
        }
    };

    return (
        <View className='flex-1 bg-white'>
            <Text className='text-4xl text-center font-bold text-green-600 mt-32'>
                Sri Care <Text className='text-green-500' >Services</Text>
            </Text>

            <View className='items-center px-8 mt-14'>
                <Text className='text-lg text-center font-bold'>
                    Enter your email address and password
                </Text>

                <TextInput
                    className='w-full bg-gray-100 border-2 border-gray-200 rounded-lg px-5 py-1.5 mt-6 text-base'
                    value={email}
                    onChangeText={onChangeEmail}
                    placeholder={'Enter Email'}
                    keyboardType={'default'}
                />

                <TextInput
                    className='w-full bg-gray-100 border-2 border-gray-200 rounded-lg px-5 py-1.5 mt-4 text-base'
                    value={password}
                    onChangeText={onChangePassword}
                    placeholder={'Enter Password'}
                    keyboardType={'default'}
                    secureTextEntry={true}
                />

                <Pressable className='self-start mt-2' onPress={() => navigation.navigate('ResetPassword')}>
                    <Text className='text-sm text-black font-medium ml-2'>Forgot Password?</Text>
                </Pressable>

                <Pressable
                    onPress={handleLogin}
                    className='w-full h-11 justify-center bg-green-500 rounded-lg py-2.5 mt-5'
                    disabled={loading} 
                >
                    <Text className='text-white text-base text-center font-semibold'>
                        {loading ? 'Logging In...' : 'Log In'}
                    </Text>
                </Pressable>

                <View className='flex-row items-center mt-8'>
                    <View className='flex-1 h-0.5 bg-gray-200' />
                    <Text className='text-base text-gray-500 mx-4'>or</Text>
                    <View className='flex-1 h-0.5 bg-gray-200' />
                </View>

                <Pressable
                    onPress={() => navigation.navigate('SignUp')}
                    className='w-full h-11 justify-center bg-gray-200 rounded-lg py-2.5 mt-8'
                >
                    <View className='flex-row items-center justify-center space-x-2'>
                        <Text className='inline text-base text-gray-500 font-semibold'>Sign Up</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

export default SignUpEmail;
