import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import DrawerNavigator from './components/DrawerNavigator';
import Profile from './screens/Profile';
import ResetPassword from './screens/AuthStack/ResetPassword';
import GetStartedAndSignIn from './screens/AuthStack/GetStartedAndSignIn';
import SignUp from './screens/AuthStack/SignUp';
import ActivePackages from './screens/ActivePackages';
import PaymentScreen from './screens/payment';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView className='flex-1 bg-white'>
        <Stack.Navigator screenOptions={ {headerShown: false} } initialRouteName="GetStartedAndSignIn">
          <Stack.Screen name="GetStartedAndSignIn" component={GetStartedAndSignIn} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="ActivePackages" component={ActivePackages} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
