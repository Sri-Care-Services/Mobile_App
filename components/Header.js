import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';

const Header = ({ navigation }) => {
  return (
    <View className='flex-row items-center justify-between px-4 py-2 bg-white' >
        <Pressable onPress={() => navigation.openDrawer()}>
            <Entypo name="list" size={28} color="black" />
        </Pressable>

        <Text className='text-2xl font-bold text-green-600 my-4'>
            Sri Care <Text className='text-green-500' >Services</Text>
        </Text>
        
        <Pressable onPress={() => navigation.navigate('Profile')} >
            <Image className='h-7 w-7 rounded-full'
                source={require('../assets/png/profile_image.png')}
                resizeMode="contain"
                accessible={true}
                accessibilityLabel={'TrashSmart Logo'}
            />
        </Pressable>

    </View>
  )
}

export default Header