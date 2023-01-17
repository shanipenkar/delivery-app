import { View, SafeAreaView, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice.js";
import { selectBasketItems } from "../features/basketSlice.js";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { ScrollView } from "react-native";
import { urlFor } from "../sanity.js";
import {
  removeFromBasket,
  selectBasketTotal,
} from "../features/basketSlice.js";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border=[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver In 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white pay-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} X</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-20 w-20 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">{items[0]?.price} ₪</Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">{basketTotal} ₪</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">10 ₪</Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">{basketTotal + 10} ₪</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('PreparingOrderScreen')} className="rounded-lg bg-[#00CCBB] p-4">
            <Text className="text-center text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
