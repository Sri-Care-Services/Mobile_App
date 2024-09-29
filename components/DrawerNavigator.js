import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import CustomDrawer from './CustomDrawer';

import { Ionicons , MaterialIcons , AntDesign , MaterialCommunityIcons } from '@expo/vector-icons';
import Language from '../screens/DrawerNavigations/Language';
import Theme from '../screens/DrawerNavigations/Theme';
import ResetPassword from '../screens/DrawerNavigations/ResetPassword';
import Security from '../screens/DrawerNavigations/Security';
import ContactSupportTeam from '../screens/DrawerNavigations/ContactSupportTeam';
import TermsOfService from '../screens/DrawerNavigations/TermsOfService';
import PrivacyPolicy from '../screens/DrawerNavigations/PrivacyPolicy';
import RateUs from '../screens/DrawerNavigations/RateUs';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props}/>}
            screenOptions={{ 
                headerShown: false,
                drawerStyle: {
                  width: '95%',
                },
                drawerItemStyle: {
                  marginVertical: -0.5,
                },
                drawerActiveBackgroundColor: 'transparent',
                drawerActiveTintColor: '#6b7280',
                drawerInactiveTintColor: '#6b7280',
                drawerLabelStyle: {
                    marginLeft: -10,
                    fontWeight: 'semibold',
                    fontSize: 16.5,
                },
             }} 
            initialRouteName="Main">
            <Drawer.Screen 
                name="Main" 
                component={TabNavigator}
                options={{
                    drawerIcon: () => (
                      <Ionicons name="home-outline" size={22} color={'#22c55e'} />
                    ),
                    drawerItemStyle: {
                      display: 'none',
                    },
                  }} />
            <Drawer.Screen 
                name="Preferable Language" 
                component={Language}
                options={{
                    drawerIcon: () => (
                      <Ionicons name="globe-outline" size={22} color={'#22c55e'} />
                    ),
                  }}  />
            <Drawer.Screen 
                name="Theme" 
                component={Theme}
                options={{
                    drawerIcon: () => (
                      <Ionicons name="moon-outline" size={22} color={'#22c55e'} />
                    ),
                  }}  />
            <Drawer.Screen 
                name="Reset Password" 
                component={ResetPassword}
                options={{
                    drawerIcon: () => (
                      <MaterialIcons name="password" size={22} color={'#22c55e'} />
                    ),
                  }}  />
            <Drawer.Screen 
                name="Security" 
                component={Security}
                options={{
                    drawerIcon: () => (
                        <MaterialIcons name="lock-outline" size={22} color={'#22c55e'} />
                    ),
                  }}  />
            
            <Drawer.Screen 
                name="Contact Support Team" 
                component={ContactSupportTeam}
                options={{
                    drawerIcon: () => (
                        <AntDesign name="message1" size={22} color={'#22c55e'} />
                    ),
                    drawerItemStyle: {
                      marginTop: 45,
                    },
                  }}  />
            <Drawer.Screen 
                name="Terms of Service" 
                component={TermsOfService}
                options={{
                    drawerIcon: () => (
                        <Ionicons name="document-text-outline" size={22} color={'#22c55e'} />
                    ),
                  }}  />
            <Drawer.Screen 
                name="Privacy Policy" 
                component={PrivacyPolicy}
                options={{
                    drawerIcon: () => (
                        <MaterialCommunityIcons name="shield-outline" size={22} color={'#22c55e'} />
                    ),
                  }}  />
            <Drawer.Screen 
                name="Rate Us" 
                component={RateUs}
                options={{
                    drawerIcon: () => (
                        <MaterialCommunityIcons name="star-outline" size={24} color={'#22c55e'} />
                    ),
                  }}  />
        </Drawer.Navigator>
        );
}

export default DrawerNavigator;
