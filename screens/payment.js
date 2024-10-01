import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PaymentScreen = ({ navigation }) => {
  const route = useRoute();
  const { selectedBill, totalAmount, allBills, handlePayment } = route.params || {}; // Get handlePayment
  const [userId, setUserId] = useState(123); // Dummy user ID for testing
  const [paymentDate] = useState(new Date().toISOString().slice(0, 10)); // Current Date in 'YYYY-MM-DD'

  // State for card details
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Function to handle payment (mock implementation)
  const completePayment = (paidBillIds) => {
    Alert.alert('Payment Successful', `You have successfully paid ${totalAmount} Rs.`);
    handlePayment(paidBillIds); // Call handlePayment to update the bills list in HomeScreen
    navigation.goBack(); // Go back to HomeScreen after payment
  };

  // Handle payment for a single bill
  const handlePaySingleBill = () => {
    if (selectedBill && cardNumber && expiryDate && cvv) {
      completePayment([selectedBill.id]); // Pass the selected bill ID
    } else {
      Alert.alert('Invalid Card Details', 'Please provide valid card details.');
    }
  };

  // Handle payment for all bills
  const handlePayAllBills = () => {
    if (totalAmount && cardNumber && expiryDate && cvv) {
      const allBillIds = allBills.map((bill) => bill.id); // Get all bill IDs
      completePayment(allBillIds);
    } else {
      Alert.alert('Invalid Card Details', 'Please provide valid card details.');
    }
  };

  return (
    <View className="flex-1 px-5 bg-white pt-2 mt-6">
      <Text className="text-3xl text-black font-bold mb-4">
        Payment Summary
      </Text>

      {/* If paying for a single bill */}
      {selectedBill && (
        <View className="p-4 rounded-lg border border-gray-300 bg-white mb-4">
          <Text className="text-lg font-semibold text-black">Package:</Text>
          <Text className="text-lg font-bold text-black">{selectedBill.name}</Text>
          <Text className="text-base text-black mt-2">Amount: {selectedBill.amount} Rs</Text>
          <Text className="text-base text-black mt-2">Duration: {selectedBill.duration}</Text>
        </View>
      )}

      {/* If paying for all bills */}
      {allBills && (
        <View className="p-4 rounded-lg border border-gray-300 bg-white">
          <Text className="text-lg font-semibold text-black">Total Amount to Pay:</Text>
          <Text className="text-xl font-bold text-black mt-2">{totalAmount} Rs</Text>

          {/* Bill Details */}
          <ScrollView className="max-h-48 mt-4">
            {allBills.map((bill) => (
              <View key={bill.id} className="mb-2">
                <Text className="text-lg font-bold text-black">{bill.name}</Text>
                <Text className="text-base text-black">Amount: {bill.amount} Rs</Text>
                <Text className="text-base text-black">Duration: {bill.duration}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Card Details Section */}
      <View className="p-4 mb-4 mt-5 rounded-lg border border-gray-300 bg-white">
        <Text className="text-lg font-semibold text-black">Enter Card Details</Text>
        <TextInput
          placeholder="Card Number"
          keyboardType="numeric"
          maxLength={16}
          value={cardNumber}
          onChangeText={setCardNumber}
          className="p-3 mt-2 border border-gray-300 rounded-lg"
        />
        <TextInput
          placeholder="Expiry Date (MM/YY)"
          keyboardType="numeric"
          maxLength={5}
          value={expiryDate}
          onChangeText={setExpiryDate}
          className="p-3 mt-2 border border-gray-300 rounded-lg"
        />
        <TextInput
          placeholder="CVV"
          keyboardType="numeric"
          maxLength={3}
          value={cvv}
          onChangeText={setCvv}
          className="p-3 mt-2 border border-gray-300 rounded-lg"
        />
      </View>

      {/* Proceed to pay button */}
      {selectedBill && (
        <TouchableOpacity
          onPress={handlePaySingleBill}
          className="mt-4 p-4 rounded-lg bg-green-500"
        >
          <Text className="text-center text-white text-lg">
            Pay {selectedBill.amount} Rs
          </Text>
        </TouchableOpacity>
      )}

      {/* Proceed to pay button for all bills */}
      {allBills && (
        <TouchableOpacity
          onPress={handlePayAllBills}
          className="mt-4 p-4 rounded-lg bg-blue-500"
        >
          <Text className="text-center text-white text-lg">
            Make payment
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PaymentScreen;
