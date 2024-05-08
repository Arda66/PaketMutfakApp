import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface OrderDetailScreenProps {
  route: any;
}

const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({route}) => {
  const {order} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Order Details</Text>
        <Text style={styles.label}>Order ID:</Text>
        <Text style={[styles.value, styles.orderId]}>{order.id}</Text>
        <Text style={styles.label}>Address:</Text>
        <Text style={[styles.value, styles.address]}>{order.address}</Text>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.statusValue}>{order.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  orderId: {
    color: '#1a73e8', // Blue color for Order ID
  },
  address: {
    color: '#236338', // Green color for Address
  },
  card: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  statusValue: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default OrderDetailScreen;
