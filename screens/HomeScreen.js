import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlusCircleIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import Color from "../constants/Colors";

const HomeScreen = () => {
   const navigation = useNavigation();

   useLayoutEffect(() => {
      navigation.setOptions({
         headerShown: false,
      });
   }, []);

   function gotoAddBook() {
      navigation.navigate('Add Book');
   }

   return (
      <SafeAreaView className="bg-white pt-5">
         <View className="flex-row pd-3 pb-3 items-center mx-4 space-x-2">
            <Image source={{ uri: "https://www.drupal.org/files/project-images/screenshot_361.png" }} className="h-7 w-7 bg-gray-200 p-4 rounded-full"></Image>
            <View className="flex-1">
               <Text className="font-bold text-xl">
                  Book Library
               </Text>
            </View>
            <PlusCircleIcon size={35} color={Color.PlusButtonColor} onPress={() => gotoAddBook()}/>
         </View>
         <View className="flex-row items-center space-x-2 pb-2 mx-4">
            <View className="flex-row flex-1 space-x-2 bg-gray-200 p-2">
               <MagnifyingGlassIcon size={20} color="gray"/>
               <TextInput placeholder="Search your library.." keyboard="default"/>
            </View>            
         </View>

         <ScrollView className="bg-gray-100"
                     contentContainerStyle={{paddingBottom: 100}}>
            <Categories></Categories>
         </ScrollView>
      </SafeAreaView>
   );
}

export default HomeScreen