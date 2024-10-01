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

const Services = ({ navigation }) => {
  const [servicePackages, setServicePackages] = useState([]);

  // Function to activate a package
  const postActivatePackage = async (packageId, userId) => {
    try {
      const response = await fetch(`http://192.168.43.67:5000/activatePackage/${packageId}?userId=${userId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // Show success alert with package title
        Alert.alert('Success', `Package "${getPackageTitle(packageId)}" activated successfully!`);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to activate package.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while activating the package.');
    }
  };

  // Load packages data
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`http://192.168.43.67:5000/getAllPackages`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: null,
        });

        if (response.ok) {
          const result = await response.json();
          const formattedPackages = result.map((pkg) => ({
            id: pkg.id,
            title: pkg.name,
            price: `${pkg.price} Rs`,
            data: pkg.description, // Description from API
            validity: `${pkg.validity_period} days`, // Use validity_period field
            is_active: pkg._active, // Use _active field from API
            created_at: pkg.created_at,
            updated_at: pkg.updated_at,
          }));

          setServicePackages(formattedPackages);
        } else {
          const errorData = await response.json();
          Alert.alert('Error', errorData.message || 'Failed to load packages.');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while fetching packages.');
      }
    };

    fetchPackages();
  }, []);

  const clickActivateButton = (packageId) => {
    Alert.alert('Success', `Package "${getPackageTitle(packageId)}" activated successfully!`);
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
        <Text className="font-bold text-lg">{item.title}</Text>
      </View>
      <Text className="text-gray-700 mb-1">Price: {item.price}</Text>
      <Text className="text-gray-700 mb-1">Details: {item.data}</Text>
      <Text className="text-gray-700 mb-1">Validity: {item.validity}</Text>
      {/* The button is always enabled, even if the package is already active */}
      <TouchableOpacity
        onPress={() => clickActivateButton(item.id, 6)} // Replace 6 with actual userId
        className="bg-green-500 rounded-lg py-2 px-3"
      >
        <Text className="text-white text-center">Activate</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-white py-4 px-4">
      <Pressable
        onPress={() => navigation.navigate('ActivePackages')}
        className="bg-green-500 py-3 rounded-lg mb-6"
      >
        <Text className="text-lg text-white font-bold text-center">See Active Packages</Text>
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
