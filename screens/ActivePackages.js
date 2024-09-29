import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { styled } from 'nativewind';
import GoBack from '../components/GoBack';

// Importing activePackages from the module
import { activePackages as initialActivePackages } from '../packages'; // Adjust this path

const ActivePackages = () => {
  // Use activePackages data
  const [packages, setPackages] = useState(initialActivePackages);

  // Function to deactivate a package
  const deactivatePackage = (packageId) => {
    setPackages(prevPackages =>
      prevPackages.map(pkg =>
        pkg.name === packageId ? { ...pkg, is_active: false } : pkg
      )
    );
    const deactivatedPackage = packages.find(pkg => pkg.name === packageId);
    Alert.alert('Deactivated', `${deactivatedPackage.name} has been deactivated.`);
  };

  // Render each active package
  const renderPackage = ({ item }) => (
    <View className="bg-gray-200 rounded-lg p-4 w-full mb-4">
      <Text className="text-2xl">{item.name}</Text>
      <Text className="text-gray-700 mb-1">Price: {item.price} Rs</Text>
      <Text className="text-gray-700 mb-1">Description: {item.description}</Text>
      <Text className="text-gray-700 mb-1">Validity Period: {item.validity_period} days</Text>
      <TouchableOpacity
        onPress={() => deactivatePackage(item.name)}
        className="bg-red-500 rounded-lg py-2 px-3"
      >
        <Text className="text-white text-center">Deactivate</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-white py-4 px-4">
      <GoBack />
      <Text className="text-3xl text-center font-bold my-6">Active Packages</Text>
      {packages.length === 0 ? (
        <Text className="text-center text-lg">No active packages</Text>
      ) : (
        <FlatList
          data={packages.filter(pkg => pkg.is_active)} // Filter only active packages
          renderItem={renderPackage}
          keyExtractor={(item) => item.name}
          scrollEnabled={false} // Adjust based on scroll needs
        />
      )}
    </ScrollView>
  );
};

export default ActivePackages;
