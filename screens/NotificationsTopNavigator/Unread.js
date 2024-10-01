import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Iconify } from 'react-native-iconify';

const AssignTasks = [
    { message: 'Service Deactivated', time: '2m ago', id: '20' },
    { message: 'Service activated', time: '2m ago', id: '16' },
    { message: 'Bill Payed', time: '3m ago', id: '04' },
    { message: 'Bill Payed', time: '4m ago', id: '05' },
    { message: 'Logged In', time: '5m ago', id: '06' },
  ];

const AssignedItem = ({ message , time }) => (
    <View className='flex-row items-center bg-[#F3F3F3] my-2 py-2.5 px-4 rounded-xl' >
        
        <Text className='flex-1 text-gray-500 text-base font-normal leading-5  pr-1' numberOfLines={2} >{message}</Text>
            
        <View className='flex items-end justify-center' >
            <Text className='text-black text-sm font-normal ' >{time}</Text>
            <TouchableOpacity>
                <Text className='text-green-500 text-base font-normal ' >Mark as read</Text>
            </TouchableOpacity>
        </View>
    </View>
);


const Unread = () => {
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

export default Unread