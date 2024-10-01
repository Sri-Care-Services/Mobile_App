import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons';
import { logout } from '../auth/AuthHelper'

const CustomDrawer = (props) => {
    const { navigation } = props;

    const clickLogOut = () => {
        navigation.navigate('GetStartedAndSignIn');
        logout();
    }

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
                <Text className='text-2xl font-bold text-green-600 my-4 ml-9'>
                    Sri Care <Text className='text-green-500' >Services</Text>
                </Text>
            </View>

            <Pressable className='flex-row items-center mt-4' onPress={() => navigation.navigate('Profile') } >
                <Image 
                    source={require('../assets/users/user-1.jpg')}
                    resizeMode='contain'
                    className='h-10 w-10 mx-2 rounded-full'
                    />
                <View className='flex ml-3' >
                    <Text className='text-lg text-gray-500 font-medium mt-[-3]' >
                        Saman Perera
                    </Text>
                    <Text className='text-base text-gray-500 font-normal mt-[-5]' >
                        Saman@gmail.com
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
        
        <TouchableOpacity className='items-center bg-green-500 rounded-xl py-2 mb-10' onPress={() => clickLogOut() }>
            <Text className='text-lg text-white font-medium' >Log Out</Text>
        </TouchableOpacity>

    </View>
  )
}

export default CustomDrawer