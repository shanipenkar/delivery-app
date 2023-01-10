/* rnfe - react native functional export component */
import { View, Text, SafeAreaView, Image, TextInput } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icons from "react-native-heroicons/outline";
import { ScrollView } from "react-native";
import Categories from "../components/Categories.js";
import FeaturedRow from "../components/FeaturedRow.js";
import SanityClient from "../sanity.js";

const HomeScreen = () => {
  const navigation = useNavigation(); // access to the navigation object
  const [featuredCategories, setFeaturedCategories] = useState([]); // state for featured categories

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, //header is not shown
    });
  }, []);

  useEffect(() => {
    SanityClient.fetch(
      `*[_type == "featured"] {
    ...,
    restaurants[]->{
      ...,
      dishes[]->
    }
  }`
    ).then((data) => {
      setFeaturedCategories(data);
    });
  }, []);

  return (
    // SafeAreaView is a component that makes sure that the content is not hidden behind the status bar
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 px-4">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-grey-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <Icons.ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <Icons.UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <Icons.MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Search Restaurants..."
            keyboardType="default"
          />
        </View>
        <Icons.AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured */}

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
