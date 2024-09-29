import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Unread from '../NotificationsTopNavigator/Unread'
import Last07Days from '../NotificationsTopNavigator/Last07Days'
import All from '../NotificationsTopNavigator/All'

const Tab = createMaterialTopTabNavigator();

const Notifications = () => {
  return (
    <View className='flex-1 px-6 bg-white'>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIndicatorStyle: {
            backgroundColor: 'black',
            height: 2,
          },
          tabBarLabelStyle: {
            marginHorizontal: 0,
            fontWeight: 'bold',
            fontSize: 15,
          },
        })}
      >
        <Tab.Screen name="Unread" component={Unread} />
        <Tab.Screen name="Last 07 Days" component={Last07Days} />
        <Tab.Screen name="All" component={All} />
      </Tab.Navigator>
    </View>
  )
}

export default Notifications