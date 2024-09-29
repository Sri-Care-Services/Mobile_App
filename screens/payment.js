import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PaymentScreen = ({ navigation }) => {
  const route = useRoute();
  const { selectedBill, totalAmount, allBills } = route.params || {}; // Data from previous screen
  const [userId, setUserId] = useState(123); // Dummy user ID for testing
  const [paymentDate] = useState(new Date().toISOString().slice(0, 10)); // Current Date in 'YYYY-MM-DD'

  // Function to make the API call for payment using fetch
  const makePayment = async (amount) => {
    try {
      const response = await fetch('YOUR_API_URL_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId, // Replace with the actual user ID
          amount,
          paymentDate,
        }),
      });

      if (response.ok) {
        const result = await response.json(); // Assuming the API returns JSON response
        Alert.alert('Payment Successful', `You have successfully paid ${amount} Rs.`);
        navigation.goBack(); // Navigate back after payment
      } else {
        throw new Error('Payment failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Payment Failed', error.message);
    }
  };

  // Handle payment for a single bill
  const handlePaySingleBill = () => {
    if (selectedBill) {
      makePayment(selectedBill.amount);
    }
  };

  // Handle payment for all bills
  const handlePayAllBills = () => {
    if (totalAmount) {
      makePayment(totalAmount);
    }
  };

  return (
    <View className="flex-1 px-5 bg-white pt-2">
      <Text className="text-2xl text-black font-bold mb-4">
        Payment Summary
      </Text>

      {/* If paying for a single bill */}
      {selectedBill && (
        <View className="p-4 rounded-lg border border-gray-300 bg-white mb-4">
          <Text className="text-lg font-semibold text-black">Package:</Text>
          <Text className="text-lg font-bold text-black">{selectedBill.name}</Text>
          <Text className="text-base text-black mt-2">Amount: {selectedBill.amount} Rs</Text>
          <Text className="text-base text-black mt-2">Duration: {selectedBill.duration}</Text>

          {/* Proceed to pay button */}
          <TouchableOpacity
            onPress={handlePaySingleBill}
            className="mt-4 p-4 rounded-lg bg-green-500"
          >
            <Text className="text-center text-white text-lg">
              Pay {selectedBill.amount} Rs
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* If paying for all bills */}
      {allBills && (
        <View className="p-4 rounded-lg border border-gray-300 bg-white">
          <Text className="text-lg font-semibold text-black">Total Amount to Pay:</Text>
          <Text className="text-xl font-bold text-black mt-2">{totalAmount} Rs</Text>

          {/* Proceed to pay button */}
          <TouchableOpacity
            onPress={handlePayAllBills}
            className="mt-4 p-4 rounded-lg bg-blue-500"
          >
            <Text className="text-center text-white text-lg">
              Pay All {totalAmount} Rs
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PaymentScreen;
