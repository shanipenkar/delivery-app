/* rnfe - react native functional export component */
import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { ChevronDownIcon, UserIcon } from "react-native-heroicons/outline";

const HomeScreen = () => {
  const navigation = useNavigation(); // access to the navigation object
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, //header is not shown
    });
  }, []);
  return (
    // SafeAreaView is a component that makes sure that the content is not hidden behind the status bar
    <SafeAreaView className="bg-white pt-5">
      <Text>
        {/* Header */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />  
          {/* flex-1 will make the view  take the most of the place and push the other to the sides (put the user icon on the right side) */}
          <View className="flex-1"> 
            <Text className="font-bold text-grey-400 text-xs">
              Deliver Now!
            </Text>
            <Text className="font-bold text-xl">
              Current Location
              <ChevronDownIcon size={20} color="#00CCBB" />
            </Text>
          </View>
          <UserIcon size={35} color="#00CCBB"/>
        </View>
      </Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
