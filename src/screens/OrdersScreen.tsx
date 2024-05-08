// src/screens/OrdersScreen.tsx
import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet, Pressable} from 'react-native';
import OrderCard from '../components/OrderCard';
import BasketView from '../components/BasketView';
import {Order, Courier, Basket} from '../types';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import OnTheWayBasketView from '../components/OnTheWayBasketView';

const OrdersScreen: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [baskets, setBaskets] = useState<Basket[]>([]);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [onTheWayBaskets, setOnTheWayBaskets] = useState<Basket[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<string[]>([]);

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrderIds(current =>
      current.includes(orderId)
        ? current.filter(id => id !== orderId)
        : [...current, orderId],
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await fetch('http://10.0.2.2:3000/orders');
        const couriersResponse = await fetch('http://10.0.2.2:3000/couriers');
        const basketsResponse = await fetch('http://10.0.2.2:3000/baskets');
        if (!ordersResponse.ok || !couriersResponse.ok || !basketsResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const ordersData = (await ordersResponse.json()) as Order[];
        const couriersData = (await couriersResponse.json()) as Courier[];
        const basketsData = (await basketsResponse.json()) as Basket[];
        setOrders(ordersData);
        setCouriers(couriersData);
        setBaskets(basketsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);
  const setBasketStatus = (
    basketId: string,
    status: string,
    courierName: string,
  ) => {
    // Find the courier
    const courier = couriers.find(c => c.name === courierName);

    // Find the basket
    const basketIndex = baskets.findIndex(basket => basket.id === basketId);
    if (basketIndex !== -1) {
      // Update the status
      const updatedBaskets = [...baskets];
      updatedBaskets[basketIndex].status = status;

      // If the status is "on the way", set the courier of the basket
      if (status === 'ON_THE_WAY' && courier) {
        updatedBaskets[basketIndex].courier = courier.name;

        const onTheWayBasket = updatedBaskets.splice(basketIndex, 1)[0];
        setOnTheWayBaskets(prevBaskets => [...prevBaskets, onTheWayBasket]);
        console.log('On the way basket : ', onTheWayBasket);
      }

      // Update the state
      setBaskets(updatedBaskets);
    }
  };
  const onRemoveOrder = (basketId: string, orderId: string) => {
    setBaskets(prevBaskets => {
      return prevBaskets
        .map(basket => {
          if (basket.id === basketId) {
            const updatedOrders = basket.orders.filter(id => id !== orderId);
            return updatedOrders.length > 0
              ? {...basket, orders: updatedOrders}
              : null;
          }
          return basket;
        })
        .filter(Boolean); // This ensures that empty baskets are removed
    });

    setOrders(prevOrders => {
      return prevOrders.map(order => {
        if (order.id === orderId) {
          // If it's the removed order, update its status to PREPARING
          return {...order, status: 'PREPARING'};
        }
        return order;
      });
    });
  };
  const onAddOrder = (basketId: string, orderId: string) => {
    setBaskets(prevBaskets =>
      prevBaskets.map(basket =>
        basket.id === basketId
          ? {...basket, orders: [...basket.orders, orderId]}
          : basket,
      ),
    );

    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? {...order, status: 'IN_BASKET'} : order,
      ),
    );
  };
  const createBasket = () => {
    // Generate a new basket ID, simple increment or UUID could be used
    const newBasketId = `${baskets.length + 1}`;
    const newBasket: Basket = {
      id: newBasketId,
      orders: selectedOrderIds,
      status: 'READY',
    };

    // Add new basket to baskets list
    setBaskets([...baskets, newBasket]);

    // Clear the selected orders from state
    setSelectedOrderIds([]);

    // Optionally, update orders to mark them as in a basket
    setOrders(currentOrders =>
      currentOrders.map(order =>
        selectedOrderIds.includes(order.id)
          ? {...order, status: 'IN_BASKET'}
          : order,
      ),
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.orderHeader}>
        <Text style={styles.header}>Pending Orders</Text>
        {selectedOrderIds.length > 0 && (
          <Pressable onPress={createBasket}>
            <FontAwesomeIcon name="shopping-basket" size={24} color="orange" />
          </Pressable>
        )}
      </View>

      {baskets
        .filter(basket => basket.status === 'READY')
        .map(basket => (
          <BasketView
            setBasketStatus={setBasketStatus}
            allOrders={orders}
            onAddOrder={onAddOrder}
            key={basket.id}
            basket={basket}
            couriers={couriers}
            orders={orders.filter(order => basket.orders.includes(order.id))}
            onRemoveOrder={onRemoveOrder} // Pass onRemoveOrder as a prop
          />
        ))}
      {orders
        .filter(order => order.status === 'PENDING')
        .map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      {orders
        .filter(
          order =>
            order.status === 'PREPARING' &&
            !baskets.some(b => b.orders.includes(order.id)),
        )
        .map(order => (
          <OrderCard
            key={order.id}
            order={order}
            onSelect={() => toggleOrderSelection(order.id)}
            isSelected={selectedOrderIds.includes(order.id)}
          />
        ))}

      <Text style={styles.header}>On the Way</Text>
      {onTheWayBaskets.map(basket => {
        const allOrdersDelivered = basket.orders.every(orderId =>
          deliveredOrders.includes(orderId),
        );
        return (
          !allOrdersDelivered && (
            <OnTheWayBasketView
              orders={orders.filter(order => basket.orders.includes(order.id))}
              key={basket.id}
              basket={basket}
              courier={basket.courier}
              onOrderDelivered={orderId =>
                setDeliveredOrders(prev => [...prev, orderId])
              }
            />
          )
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default OrdersScreen;
