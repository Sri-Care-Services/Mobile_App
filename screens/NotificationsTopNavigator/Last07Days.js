import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Iconify } from 'react-native-iconify';

const AssignTasks = [
    { message: 'Garbage truck has dispatched', time: '3m ago', id: 'Bin 04' },
    { message: 'New dispatch notification', time: '30m ago', id: 'Bin 20' },
    { message: 'New dispatch notification', time: '45m ago', id: 'Bin 16' },
  ];

const AssignedItem = ({ message , time }) => (
    <View className='flex-row items-center bg-[#F3F3F3] my-2 py-2.5 px-4 rounded-xl' >
        
        <View className='bg-[#7ED957]/20 p-2 rounded-lg' >
          <Iconify icon="mingcute:truck-line" size={26} color="#46AA62" />
        </View>

        <Text className='flex-1 text-gray-500 text-base font-normal leading-5 ml-4 pr-3' numberOfLines={2} >{message}</Text>
            
        <Text className='text-black text-sm font-normal ' >{time}</Text>
    </View>
);


const Last07Days = () => {
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

export default Last07Days