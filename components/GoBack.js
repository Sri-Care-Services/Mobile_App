import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GoBack = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()} className='flex-row items-center justify-start ml-4 mt-8 bg-white' >
        <Ionicons name="chevron-back" size={28} color="#22C55E" />
        <Text className='text-lg text-green-500 font-semibold'>Back</Text>
    </Pressable>
  )
}

export default GoBack