import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import { packages } from '../../packages'; // Adjust the path as necessary

const Services = ({ navigation }) => {
  const [servicePackages, setServicePackages] = useState([]);

  // Load packages data
  useEffect(() => {
    const formattedPackages = packages.map((pkg, index) => ({
      id: index + 1, // Assign an id based on index for simplicity
      title: pkg.name,
      price: `${pkg.price} Rs`,
      data: pkg.description, // Using description instead of data field
      is_active: false,
      created_at: pkg.created_at,
      updated_at: pkg.updated_at,
    }));

    setServicePackages(formattedPackages);
  }, []);

  // Function to activate a package
  const activatePackage = (packageId) => {
    setServicePackages((prevPackages) =>
      prevPackages.map((pkg) =>
        pkg.id === packageId ? { ...pkg, is_active: true } : pkg
      )
    );
    Alert.alert('Success', `Package "${getPackageTitle(packageId)}" activated!`);
  };

  // Helper function to get package title by ID
  const getPackageTitle = (packageId) => {
    const pkg = servicePackages.find((p) => p.id === packageId);
    return pkg ? pkg.title : 'Unknown Package';
  };

  // Render function for each package
  const renderPackage = ({ item }) => (
    <View className="bg-gray-100 rounded-lg p-4 w-full mb-4">
      <View className="flex-row items-center mb-2">
        <Text className="text-2xl mr-2">{item.icon}</Text>
        <Text className="font-bold text-lg">{item.title}</Text>
      </View>
      <Text className="text-gray-700 mb-1">Price: {item.price}</Text>
      <Text className="text-gray-700 mb-1">Details: {item.data}</Text>
      <TouchableOpacity
        onPress={() => activatePackage(item.id)}
        disabled={item.is_active}
        className={`${
          item.is_active ? 'bg-gray-400' : 'bg-green-500'
        } rounded-lg py-2 px-3`}
      >
        <Text className="text-white text-center">
          {item.is_active ? 'Activated' : 'Activate'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-white py-4 px-4">
      <Pressable
        onPress={() => navigation.navigate('ActivePackages')}
        className="bg-green-500 py-3 rounded-lg mb-6"
      >
        <Text className="text-lg text-white font-bold text-center">
          See Active Packages
        </Text>
      </Pressable>

      <Text className="text-2xl font-bold mb-4">All Packages</Text>

      <FlatList
        data={servicePackages}
        renderItem={renderPackage}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default Services;
