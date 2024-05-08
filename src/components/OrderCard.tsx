// src/components/OrderCard.tsx
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
interface OrderCardProps {
  order: {
    id: string;
    address: string;
    status: string;
  };
  onSelect?: (selected: boolean) => void; // Select handler
  isSelected?: boolean; // Is order selected
}

const OrderCard: React.FC<OrderCardProps> = ({order, onSelect, isSelected}) => {
  const {navigate} = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() => navigate('OrderDetail', {order})}
      style={styles.card}>
      {onSelect && isSelected !== undefined && (
        <CheckBox
          value={isSelected}
          onValueChange={onSelect}
          style={styles.checkbox}
        />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>Order ID: {order.id}</Text>
        <Text style={styles.details}>Address: {order.address}</Text>
        <Text style={styles.status}>Status: {order.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginLeft: 16,
    marginRight: 36,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
  },
  checkbox: {
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  status: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});

export default OrderCard;
