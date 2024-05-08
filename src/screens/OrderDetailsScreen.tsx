// src/screens/OrderDetailScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

interface OrderDetailScreenProps {
  route: any;
}

const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({route}) => {
  const {order} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.orderId}>Order ID: {order.id}</Text>
      <Text style={styles.adressTitle}>Address:</Text>
      <Text style={styles.address}> {order.address}</Text>
      <Text style={styles.statusTitle}>Status: </Text>
      <Text style={styles.status}>{order.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  orderId: {
    marginBottom: 20,
    color: '#1a73e8',
    fontSize: 24,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  adressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#151a17',
  },
  address: {
    fontSize: 18,
    color: '#236338',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#151a17',
  },
  status: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default OrderDetailScreen;
