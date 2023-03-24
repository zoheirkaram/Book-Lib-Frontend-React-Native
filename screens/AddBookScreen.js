import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TextInput } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import Color from "../constants/Colors";
import { getAllGenres } from "../services/BooksService";

const AddBookScreen = ({ route, navigation }) => {

   useLayoutEffect(() => {
      navigation.setOptions({
         headerShown: false,
      });
   }, []);

   let [open, setOpen] = useState(false);
   let [value, setValue] = useState();
   let [bookName, setBookName] = useState();
   let [description, setDescription] = useState();
   let [isbn, setIsbn] = useState();
   let [genres, setGenres] = useState()
   let [selectedGenre, setSelectedGenre] = useState();

   useEffect(() => {
      getAllGenres()
         .then((result) => {
            setGenres([...result]);
            console.log(genres);
         })
         .catch((exception) => {
            console.log(exception);
         })
   }, []);

   return (
      <SafeAreaView>
         <View className="flex-row pd-3 pb-3 items-center space-x-2">
            <ChevronLeftIcon
               size={35}
               color={Color.Primary}
               onPress={() => {
                  navigation.goBack();
               }}
            />
            <View className="flex-1">
               <Text className="font-bold text-xl" style={{ color: Color.Primary }}>
                  Add Book
               </Text>
            </View>
         </View>
         <View className="flex-row px-4 py-2">            
            <TextInput onChange={setBookName} value={bookName} placeholder="Book Name" className="bg-white p-1 flex-1"></TextInput>            
         </View>
         <View className="flex-row px-4 py-2">
            <TextInput onChange={setDescription} value={description} placeholder="Description" numberOfLines={3} maxLength={100} className="bg-white p-1 flex-1"></TextInput>
         </View>
         <View className="flex-row px-4 py-2">            
            <TextInput onChange={setIsbn} value={isbn} placeholder="ISBN" className="bg-white p-1 flex-1"></TextInput>            
         </View>
         <View className="flex-row px-4 py-2">
            <DropDownPicker 
               open={open}
               setOpen={setOpen}
               items={genres}
               itemKey="genreId"
               value={value}
               setValue={setValue}
               onSelectItem={(item) => {
                  //setSelectedGenre(item);
                  console.log(item);
               }}
               textStyle={{color: 'gray'}}               
            />
         </View>
      </SafeAreaView>
   );
};

export default AddBookScreen;
