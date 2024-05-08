// src/components/CourierSelector.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker'; // Updated import
import {Courier} from '../types';

interface CourierSelectorProps {
  couriers: Courier[];
  onAssign: (courierId: string) => void;
}

const CourierSelector: React.FC<CourierSelectorProps> = ({
  couriers,
  onAssign,
}) => {
  const [selectedCourier, setSelectedCourier] = React.useState<string | null>(
    null,
  );

  return (
    <View style={styles.container}>
      <Text>Select a Courier:</Text>
      <Picker
        selectedValue={selectedCourier}
        onValueChange={itemValue => {
          console.log('itemValue', itemValue);
          itemValue &&
            (setSelectedCourier(itemValue.toString()),
            onAssign(itemValue.toString()));
        }}>
        <Picker.Item label="Select a courier" value={null} />
        {couriers.map(courier => (
          <Picker.Item
            key={courier.id}
            label={courier.name}
            value={courier.id}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default CourierSelector;
