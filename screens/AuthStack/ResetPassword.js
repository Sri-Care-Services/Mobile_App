import { View, Text, TextInput, Pressable, Modal } from 'react-native'
import React, {useState} from 'react'
import GoBack from '../../components/GoBack'
import { Ionicons } from '@expo/vector-icons';

const ResetPassword = ({ navigation }) => {
    const[forgotPassword, onChangeForgotPassword] = useState('')

    const [focusedInput, setFocusedInput] = useState(null);
    const [isModelVisible, setIsModalVisible] = useState(false)

  return (
    <View className='flex-1 bg-white' >
        <GoBack navigation={navigation} />

        <View className='flex-1 px-8 mt-8 relative' >
            <Ionicons name="lock-closed-outline" size={36} color="lightgray" />
            <Text className='text-2xl font-bold mt-3'>Forgot your password?</Text>
            <Text className='text-base text-gray-600 mt-1 font-normal'>Enter the email associated with your account.</Text>

            <TextInput
                className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-5 text-base font-light ${focusedInput === 'forgotPassword' ? 'border-2 border-green-400' : ''}`}
                value={forgotPassword}
                onChangeText={onChangeForgotPassword}
                placeholder={'Email Address'}
                keyboardType={'default'}
                onFocus={() => setFocusedInput('forgotPassword')}
                onBlur={() => setFocusedInput(null)}    
            />

            <View className='flex-row items-center mt-5'>
                <Text className='text-base text-gray-500 font-normal' >
                    Remember your password?
                </Text>
                <Pressable onPress={() => navigation.navigate('SignUpEmail')} >
                    <Text className='text-base text-green-500 font-bold' > Sign in.</Text>
                </Pressable>
            </View>

            <View className='flex-1 justify-end items-center mb-10'>
                <Pressable onPress={()=> setIsModalVisible(true) } className='w-full bg-green-500 rounded-xl py-3 '>
                    <Text className='text-white text-lg text-center font-semibold'>Continue</Text>
                </Pressable>
            </View>

            <Modal 
                visible={isModelVisible}
                onRequestClose={() => setIsModalVisible(false)}
                animationType='slide'
                transparent={true}
                >
                <View className='flex-1 bg-gray-400/25 justify-center items-center' >
                    <View className='bg-white justify-center items-center py-5 px-4 rounded-xl' >
                        <Text className='text-black text-lg font-semibold' >Check your email</Text>
                        <Text className='text-black text-sm text-center font-normal leading-5 mt-1' >We sent a link to reset your password{'\n'}to some@email.com</Text>
                        <View className='flex-wrap w-64 h-0.5 bg-gray-300 rounded-full mt-3' />
                        <Pressable className='mt-2' onPress={() => navigation.navigate('SignUpEmail')} >
                            <Text className='text-lg font-semibold text-[#007AFF]' >OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>
    </View>
  )
}

export default ResetPassword