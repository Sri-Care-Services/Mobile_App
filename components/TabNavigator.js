import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/TabNavigatorScreens/Home';
import Notifications from '../screens/TabNavigatorScreens/Notifications';
import Header from './Header';
import Services from '../screens/TabNavigatorScreens/Services';
import Chat from '../screens/TabNavigatorScreens/Chat';

import { Iconify } from 'react-native-iconify';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  return (
    <>
      <Header navigation={navigation} />
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            padding: 8,
            height: 64,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 8,
            fontWeight: 'bold',
          },
          tabBarIcon: ({color}) => {
            let iconSize = 30;

            if (route.name === 'Home') {
              return <Iconify icon={'bx:home'} size={iconSize} color={color} />;
            } else if (route.name === 'Services') {
              return <Iconify icon={'mdi:tools'} size={iconSize} color={color} />;
            } else if (route.name === 'Chat') {
              return <Iconify icon={'ic:baseline-chat'} size={iconSize - 3} color={color} />;
            } else if (route.name === 'Notifications') {
              return <Iconify icon={'mdi:notifications-none'} size={iconSize} color={color} />;
            }
          },
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: 'gray',
        })}
      >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Services" component={Services} />
          <Tab.Screen name="Chat" component={Chat} />
          <Tab.Screen name="Notifications" component={Notifications} />
      </Tab.Navigator>
    </>
  )
}

export default TabNavigator;