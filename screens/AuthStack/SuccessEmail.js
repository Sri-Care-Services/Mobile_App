import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons';

const Success = ({ navigation }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate('DetailsEmail');
        }, 4000);
    
      }, [navigation]);

  return (
    <View className='flex-1 bg-white items-center justify-center mt-[-36]' >
      <Ionicons name="checkmark-circle" size={72} color="#22C55E" />
      <Text className='text-base' >Done</Text>
    </View>
  )
}

export default Success