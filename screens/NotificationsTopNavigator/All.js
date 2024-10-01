import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Iconify } from 'react-native-iconify';

const AssignTasks = [
    { message: 'Service Activated', time: '9 days ago', id: '20' },
    { message: 'Logged In', time: '9 days ago', id: '18' },
  ];

const AssignedItem = ({ message , time }) => (
    <View className='flex-row items-center bg-[#F3F3F3] my-2 py-2.5 px-4 rounded-xl' >
      
        <Text className='flex-1 text-gray-500 text-base font-normal leading-5 pr-3' numberOfLines={2} >{message}</Text>
            
        <Text className='text-black text-sm font-normal ' >{time}</Text>
    </View>
);


const All = () => {
  const renderAssignedItem = ({ item }) => <AssignedItem message={item.message} time={item.time} id={item.id} />;

  return (
    <View className='flex-1 bg-white' >
      <FlatList
          className='flex-1 mt-2.5'
          data={AssignTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderAssignedItem}
        />
    </View>
  )
}

export default All