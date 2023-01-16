import { View, Text } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice.js';
import { selectBasketItems } from '../features/basketSlice.js';
import { useDispatch } from 'react-redux';

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();

    useMemo(() => {
        
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        },{});

        setGroupedItemsInBasket(groupedItems);
    },[items]);

    console.log(groupedItemsInBasket);

  return (
    <View>
      <Text>BasketScreen</Text>
    </View>
  )
};

export default BasketScreen;