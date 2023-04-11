import React, { useLayoutEffect, useState } from 'react'
import { View, Text, Image, TextInput, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlusCircleIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/Categories';
import BookSearch from '../components/BookSearch';
import Color from "../constants/Colors";

const HomeScreen = () => {
   const navigation = useNavigation();
   const [showing, setShowing] = useState('Category');
   const [searchTerm, setSearchTerm] = useState('');

   useLayoutEffect(() => {
      navigation.setOptions({
         headerShown: false,
      });
   }, []);

   function gotoAddBook() {
      navigation.navigate('Add Book');
   }

   const handelSearchTerm = (search) => {
      setShowing(search?.length == 0 ? 'Category' : '');
      setSearchTerm(search)
   }

   return (
      <SafeAreaView className="bg-white pt-5">         
         <View className="flex-row pd-3 pb-3 items-center mx-4 space-x-2">
            <Image source={require("../assets/book.png")} className="h-7 w-7 bg-white p-4 rounded-full"></Image>
            <View className="flex-1">
               <Text className="font-bold text-xl">
                  Book Library
               </Text>
            </View>
            <PlusCircleIcon size={35} color={Color.Secondary} onPress={() => gotoAddBook()}/>
         </View>
         <View className="flex-row items-center space-x-2 pb-2 mx-4">
            <View className="flex-row flex-1 space-x-2 bg-gray-200 p-2">
               <TextInput className="flex-1" placeholder="Search your library ..." keyboard="default" onChangeText={search => handelSearchTerm(search)} value={searchTerm}/>
            </View>            
         </View>
         <ScrollView className="bg-gray-100"
                     contentContainerStyle={{paddingBottom: 100}}>
            { showing == "Category" ?               
               <Categories></Categories> :
               <BookSearch searchTerm={searchTerm}></BookSearch>
            }
         </ScrollView>
      </SafeAreaView>
   );
}

export default HomeScreen