// src/components/BasketView.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Basket, Courier, Order} from '../types';
import CourierSelector from './CourierSelector';
import OrderCard from './OrderCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
interface BasketViewProps {
  basket: Basket;
  couriers?: Courier[];
  orders: Order[];
  onRemoveOrder: (basketId: string, orderId: string) => void;
  onAddOrder: (basketId: string, orderId: string) => void;
  allOrders: Order[];
  setBasketStatus: (status: string) => void;
}

const BasketView: React.FC<BasketViewProps> = ({
  basket,
  couriers,
  orders,
  allOrders,
  onRemoveOrder,
  onAddOrder,
  setBasketStatus,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [selectedCourier, setSelectedCourier] = useState<Courier | null>(null);
  // Filter orders that are not already in the basket and are not already in any basket
  const availableOrders = allOrders.filter(
    order => !basket.orders.includes(order.id) && order.status !== 'IN_BASKET',
  );

  return (
    <View style={styles.container}>
      <View style={styles.basketHeader}>
        <Text style={styles.headerText}>Basket {basket.id}</Text>
        {availableOrders.length > 0 && (
          <TouchableOpacity onPress={() => setIsDropdownOpen(true)}>
            <Icon name="plus-circle" size={30} color="orange" />
          </TouchableOpacity>
        )}
        {selectedCourier && availableOrders.length >= 0 && (
          <TouchableOpacity onPress={() => setBasketStatus('ON_THE_WAY')}>
            <Text style={styles.deliveryButton}>Ready for Delivery</Text>
          </TouchableOpacity>
        )}
      </View>
      {basket.orders.map(orderId => {
        const order = orders.find(o => o.id === orderId);
        return order ? (
          <View key={order.id} style={styles.orderContainer}>
            <OrderCard order={order} />
            <TouchableOpacity
              onPress={() => onRemoveOrder(basket.id, order.id)}>
              <Icon name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ) : null;
      })}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDropdownOpen}
        onRequestClose={() => setIsDropdownOpen(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Select an order to add to the basket:</Text>
            <Picker
              selectedValue={selectedOrderId}
              onValueChange={itemValue => setSelectedOrderId(itemValue)}
              style={{width: 200, height: 180}}>
              {availableOrders.map(order => (
                <Picker.Item
                  key={order.id}
                  label={`Order ID: ${order.id}`}
                  value={order.id}
                />
              ))}
            </Picker>
            <Button
              title="Confirm"
              onPress={() => {
                if (selectedOrderId) {
                  onAddOrder(basket.id, selectedOrderId);
                  setSelectedOrderId('');
                  setIsDropdownOpen(false);
                }
              }}
            />
          </View>
        </View>
      </Modal>
      {couriers && (
        <CourierSelector
          couriers={couriers}
          onAssign={courierId =>
            setSelectedCourier(couriers.find(c => c.id === courierId) || null)
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  basketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  deliveryButton: {
    backgroundColor: 'green',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});

export default BasketView;
