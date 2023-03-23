import { View, Image, Text, TouchableOpacity } from "react-native";
import { BookOpenIcon } from "react-native-heroicons/outline";
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

   return (
      <TouchableOpacity className="flex-row bg-white mx-4 p-2 rounded-lg border-gray-200 border-2" onPress={() => onBookPress(bookData?.book?.isbn)}>
         <Image className="w-24 h-40 py-4 pr-4 rounded-lg" source={{ uri: frontImageUrl }}></Image>
         <View className="flex-col flex-shrink">
            <Text className="text-gray-500 mx-4 font-bold">{bookData?.book?.title}</Text>
            <Text className="text-gray-500 mx-4 pt-2">{authorNames}</Text>
            <Text className="text-gray-500 mx-4 pt-2 italic">{bookData?.book?.description}</Text>
            <View className="flex-row items-center mx-3 space-x-1">
               <BookOpenIcon size={20} color={Color.Primary} style={{ marginTop: 10 }}></BookOpenIcon>
               <Text className="text-gray-500 mx-4 pt-2 font-bold">ISBN</Text>
               <Text className="text-gray-500 mx-4 pt-2">{bookData?.book?.isbn}</Text>
            </View>
            <View class="flex-row">
               <Text className="text-gray-500 mx-4 pt-2">{bookData?.book?.publisher?.name}</Text>
            </View>
         </View>
      </TouchableOpacity>
   );
}
