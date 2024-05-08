// src/components/OrderDetailModal.tsx
import React from 'react';
import {Modal, View, Text, StyleSheet, Button} from 'react-native';

interface OrderDetailModalProps {
  visible: boolean;
  order: {
    id: string;
    address: string;
    items: Array<{id: string; name: string}>;
  };
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  visible,
  order,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.modal}>
        <Text>Order ID: {order.id}</Text>
        <Text>Address: {order.address}</Text>
        {order.items.map(item => (
          <Text key={item.id}>{item.name}</Text>
        ))}
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 20,
    marginTop: 50,
  },
});

export default OrderDetailModal;
