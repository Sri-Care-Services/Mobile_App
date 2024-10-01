import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import packages and bills data from the packages.js file
import { packages, bills as dummyBills } from '../../packages';

const Home = ({ navigation }) => {
  const [userName, setUserName] = useState('User'); // Static user name for demonstration
  const [bills, setBills] = useState(dummyBills); // Use imported dummy bills
  const [selectedBill, setSelectedBill] = useState(null); // State for storing selected individual bill

  // Calculate total outstanding amount
  const totalOutstanding = bills.reduce((acc, bill) => acc + bill.amount, 0);

  const handleBillSelect = (bill) => {
    setSelectedBill(bill);
  };

  const handlePaymentProceed = (billToPay) => {
    if (billToPay) {
      // Proceed with payment for a specific bill
      navigation.navigate('PaymentScreen', { selectedBill: billToPay, handlePayment });
    }
  };

  const handlePayAllBills = () => {
    // Proceed with payment for all bills
    navigation.navigate('PaymentScreen', { totalAmount: totalOutstanding, allBills: bills, handlePayment });
  };

  const handleCancelSelection = () => {
    setSelectedBill(null); // Reset the selected bill
  };

  // Callback to remove paid bills
  const handlePayment = (paidBillIds) => {
    // Filter out paid bills based on their IDs
    setBills(prevBills => prevBills.filter(bill => !paidBillIds.includes(bill.id)));
    setSelectedBill(null); // Reset the selected bill after payment
  };

  return (
    <View className='flex-1 px-5 bg-white pt-2'>
      <View className='flex-row justify-between items-center px-1'>
        <Text className='text-2xl text-black font-bold'>
          Hi, {userName}
        </Text>

        <View className='flex-row justify-between items-center space-x-2'>
          <Ionicons name="globe-outline" size={22} color="gray" />
          <Ionicons name="moon-outline" size={22} color="gray" />
        </View>
      </View>

      {/* Outstanding Package Bills */}
      <ScrollView className="mt-4">
        <Text className="text-xl text-black font-semibold mb-2">Outstanding Package Bills</Text>
        {bills.map((bill) => (
          <TouchableOpacity
            key={bill.id}
            onPress={() => handleBillSelect(bill)}
            className={`p-4 mb-4 rounded-lg border ${
              selectedBill && selectedBill.id === bill.id
                ? 'border-green-500 bg-green-100'
                : 'border-gray-300 bg-white'
            }`}
          >
            <Text className="text-lg font-bold text-black">{bill.name}</Text>
            <Text className="text-sm text-gray-600">{bill.description}</Text>
            <Text className="text-base text-black mt-2">Amount: {bill.amount} Rs</Text>
            <Text className="text-sm text-gray-600">Duration: {bill.duration}</Text>
          </TouchableOpacity>
        ))}

        {/* Total Outstanding Amount */}
        <View className="p-4 mt-4 rounded-lg border border-gray-300 bg-white">
          <Text className="text-lg font-semibold text-black">Total Outstanding Amount:</Text>
          <Text className="text-xl font-bold text-black mt-2">{totalOutstanding} Rs</Text>
        </View>
      </ScrollView>

      {/* Payment Summary for Selected Bill */}
      {selectedBill && (
        <View className="p-4 mt-4 rounded-lg bg-gray-100">
          <Text className="text-lg text-black font-semibold">Payment Summary</Text>
          <View className="flex-row justify-between mt-2">
            <Text className="text-base text-black">Package:</Text>
            <Text className="text-base text-black">{selectedBill.name}</Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-base text-black">Amount:</Text>
            <Text className="text-base text-black">{selectedBill.amount} Rs</Text>
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="text-base text-black">Duration:</Text>
            <Text className="text-base text-black">{selectedBill.duration}</Text>
          </View>

          <View className="flex-row justify-between mt-4">
            {/* Proceed to Pay Button */}
            <TouchableOpacity
              onPress={() => handlePaymentProceed(selectedBill)}
              className="p-4 rounded-lg bg-green-500 flex-grow mr-2"
            >
              <Text className="text-center text-white text-lg">Proceed to Pay {selectedBill.amount} Rs</Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={handleCancelSelection}
              className="p-4 rounded-lg bg-red-500 flex-grow ml-2"
            >
              <Text className="text-center text-white text-lg">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Pay All Bills Button */}
      {bills.length > 0 && (
        <TouchableOpacity
          onPress={handlePayAllBills}
          className="mt-4 p-4 rounded-lg bg-blue-500"
        >
          <Text className="text-center text-white text-lg">Pay All Bills ({totalOutstanding} Rs)</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Home;
