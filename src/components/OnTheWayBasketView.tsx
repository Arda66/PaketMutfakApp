import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Basket, Order} from '../types';
import OrderCard from './OrderCard';
import Icon from 'react-native-vector-icons/FontAwesome';

interface OnTheWayBasketViewProps {
  basket: Basket;
  orders: Order[];
  courier: string;
  onOrderDelivered: (orderId: string) => void;
}

const OnTheWayBasketView: React.FC<OnTheWayBasketViewProps> = ({
  basket,
  orders,
  courier,
  onOrderDelivered,
}) => {
  const [deliveredOrders, setDeliveredOrders] = useState<string[]>([]);

  const markAsDelivered = (orderId: string) => {
    setDeliveredOrders(prev => [...prev, orderId]);
    onOrderDelivered(orderId);
  };

  const markAsNotDelivered = (orderId: string) => {
    setDeliveredOrders(prev => prev.filter(id => id !== orderId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.basketHeader}>
        <Text style={styles.headerText}>Basket {basket.id}</Text>
      </View>
      {basket.orders.map(orderId => {
        const order = orders.find(o => o.id === orderId);
        return order ? (
          <View key={order.id} style={styles.orderContainer}>
            <OrderCard order={order} />
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.tickContainer}
                onPress={() => markAsDelivered(order.id)}>
                <Icon
                  name="check"
                  size={30}
                  color={deliveredOrders.includes(order.id) ? 'green' : 'black'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tickContainer}
                onPress={() => markAsNotDelivered(order.id)}>
                <Icon
                  name="times"
                  size={30}
                  color={!deliveredOrders.includes(order.id) ? 'red' : 'black'}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null;
      })}
      <Text style={styles.courierText}>Courier : {courier}</Text>
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
    marginTop: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
  courierText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'center',
    color: 'black',
    textDecorationLine: 'underline',
  },
  tickContainer: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 5,
  },
});

export default OnTheWayBasketView;
