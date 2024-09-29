import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons';

const CustomDrawer = (props) => {
    const { navigation } = props;

  return (
    <View className='flex-1 bg-white px-5'>
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={{backgroundColor: '#FFFFFF'}}
        >
            <View className='flex-row  items-center mt-2' >
                <TouchableOpacity className='' onPress={() => navigation.closeDrawer() } >
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>
                <Image 
                    source={require('../assets/png/logo.png')}
                    resizeMode='contain'
                    className='flex-1 h-20 w-auto justify-self-center'
                    />
            </View>

            <Pressable className='flex-row items-center mt-4' onPress={() => navigation.navigate('Profile') } >
                <Image 
                    source={require('../assets/png/profile_image.png')}
                    resizeMode='contain'
                    className='h-10 w-10 mx-2 rounded-full'
                    />
                <View className='flex ml-3' >
                    <Text className='text-lg text-gray-500 font-medium mt-[-3]' >
                        Siri Perera
                    </Text>
                    <Text className='text-base text-gray-500 font-normal mt-[-5]' >
                        siriperera@gmail.com
                    </Text>
                </View>
                <View className='flex-1 items-end' >
                    <Ionicons name="chevron-forward" size={30} color="gray" />
                </View> 
            </Pressable>

            <View className='mt-12 px-3' >
                <DrawerItemList {...props} />
            </View>

        </DrawerContentScrollView>
        
        <TouchableOpacity className='items-center bg-green-500 rounded-xl py-2 mb-10' onPress={() => navigation.navigate('GetStarted') }>
            <Text className='text-lg text-white font-medium' >Log Out</Text>
        </TouchableOpacity>

    </View>
  )
}

export default CustomDrawer