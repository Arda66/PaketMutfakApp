// src/screens/OrderDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface OrderDetailScreenProps {
  route: any; 
}

const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({ route }) => {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <Text>Order ID: {order.id}</Text>
      <Text>Address: {order.address}</Text>
      <Button title="Update Status" onPress={() => console.log('Update Status')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default OrderDetailScreen;
