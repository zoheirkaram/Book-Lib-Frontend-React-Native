import { View, Image, Text, TouchableOpacity, TouchableWithoutFeedback, Alert } from "react-native";
import { BookOpenIcon, PencilSquareIcon } from "react-native-heroicons/outline";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Color from "../constants/Colors";

export default function BookCard({ bookData }) {
   let navigation = useNavigation();
   let frontImageUrl = null;
   let authorNames = "-";

   frontImageUrl = bookData?.images.filter((image) => image.description == "Front")[0]?.url;
   authorNames = bookData?.authors.map((author) => author.name).join(", ");

   async function onBookPress (isbn) {
      navigation.navigate("Book Details", { isbn: isbn });
   };

   const editBook = () => {
      //Alert.alert(`Edit ${bookData?.book?.title}`);
      navigation.navigate("Add Book", {bookData: bookData});
   }

   return (
      <TouchableOpacity className="flex-row bg-white mx-4 p-2 rounded-lg border-gray-200 border-2" onPress={() => onBookPress(bookData?.book?.isbn)}>
         {
            frontImageUrl ? 
            <Image className="py-4 pr-4 rounded-lg" style={{resizeMode: "stretch", width: 112, height: 160}}  source={{ uri: frontImageUrl }} /> :
            <Image className="py-4 pr-4 rounded-lg" style={{resizeMode: "stretch", width: 112, height: 160}} source={require("../assets/book.png")} />
         }
         <View className="flex-col flex-shrink">
            <View className="flex-row items-center">
               <View className="flex-1">                  
                  <Text className="text-gray-500 mx-3 font-bold">{bookData?.book?.title}</Text>
               </View>
               <TouchableWithoutFeedback>
                  <TouchableOpacity>
                     <PencilSquareIcon size={20} color={Color.Primary} style={{marginRight: 5}} onPress={editBook}/>
                  </TouchableOpacity>
               </TouchableWithoutFeedback>
            </View>
            <Text className="text-gray-500 mx-3 pt-2">{authorNames}</Text>
            <Text className="text-gray-500 mx-3 pt-2 italic">{bookData?.book?.description}</Text>
            <View className="flex-row items-center mx-3 space-x-1">
               <BookOpenIcon size={20} color={Color.Primary} style={{ marginTop: 10 }} />
               <Text className="text-gray-500 mx-3 pt-2 font-bold">ISBN</Text>
               <Text className="text-gray-500 mx-3 pt-2">{bookData?.book?.isbn}</Text>
            </View>
            <View class="flex-row">
               <Text className="text-gray-500 mx-3 pt-2">{bookData?.book?.publisher?.name}</Text>
            </View>
         </View>
      </TouchableOpacity>
   );
}
