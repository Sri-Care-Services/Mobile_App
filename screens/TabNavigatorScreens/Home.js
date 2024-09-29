import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  const [userName, setUserName] = useState('User'); // Static user name for demonstration

  // New Dummy package data (as provided)
  const [packages, setPackages] = useState([
    {
      name: '📱 Social Media Unlimited',
      description: '1 GB data for social media apps including Facebook, WhatsApp, and Instagram.',
      price: 899,
      validity_period: 24,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-10T00:00:00Z',
    },
    {
      name: '🎥 Streaming Package',
      description: '2 GB data for streaming services including YouTube, Netflix, and Disney+.',
      price: 1299,
      validity_period: 24,
      created_at: '2024-02-01T00:00:00Z',
      updated_at: '2024-02-10T00:00:00Z',
    },
    {
      name: '🎮 Gaming Package',
      description: '3 GB data for gaming apps including PUBG, Fortnite, and Call of Duty.',
      price: 1499,
      validity_period: 24,
      created_at: '2024-03-01T00:00:00Z',
      updated_at: '2024-03-10T00:00:00Z',
    },
    {
      name: '💼 Business Package',
      description: '5 GB data for business applications like Email, Zoom, and Google Drive.',
      price: 1999,
      validity_period: 24,
      created_at: '2024-04-01T00:00:00Z',
      updated_at: '2024-04-10T00:00:00Z',
    },
    {
      name: '👨‍👩‍👧‍👦 Family Package',
      description: '4 GB data for family use, supporting apps like Facebook, WhatsApp, Instagram, and YouTube.',
      price: 1599,
      validity_period: 24,
      created_at: '2024-05-01T00:00:00Z',
      updated_at: '2024-05-10T00:00:00Z',
    },
    {
      name: '🌐 Unlimited Package',
      description: 'Unlimited data for all apps without restrictions.',
      price: 2999,
      validity_period: 24,
      created_at: '2024-06-01T00:00:00Z',
      updated_at: '2024-06-10T00:00:00Z',
    },
  ]);

  // Dummy bill data associated with packages
  const [bills, setBills] = useState([
    {
      id: 1,
      packageId: 1,
      name: 'Social Media Unlimited',
      duration: 'January 2024',
      amount: 899,
      description: 'Usage bill for Social Media Unlimited package',
    },
    {
      id: 2,
      packageId: 2,
      name: 'Streaming Package',
      duration: 'February 2024',
      amount: 1299,
      description: 'Usage bill for Streaming Package',
    },
    {
      id: 3,
      packageId: 5,
      name: 'Family Package',
      duration: 'March 2024',
      amount: 1599,
      description: 'Usage bill for Family Package',
    },
  ]);

  const [selectedBill, setSelectedBill] = useState(null); // State for storing selected individual bill

  // Calculate total outstanding amount
  const totalOutstanding = bills.reduce((acc, bill) => acc + bill.amount, 0);

  const handleBillSelect = (bill) => {
    setSelectedBill(bill);
  };

  const handlePaymentProceed = (billToPay) => {
    if (billToPay) {
      // Proceed with payment for a specific bill
      navigation.navigate('PaymentScreen', { selectedBill: billToPay });
    }
  };

  const handlePayAllBills = () => {
    // Proceed with payment for all bills
    navigation.navigate('PaymentScreen', { totalAmount: totalOutstanding, allBills: bills });
  };

  const handleCancelSelection = () => {
    setSelectedBill(null); // Reset the selected bill
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
