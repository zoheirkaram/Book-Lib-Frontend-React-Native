import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { Chip, Card } from "@rneui/themed";
import { getOpenLibraryBookDetails } from "../services/BooksService";
import OpenURLButton from "../components/OpenURLButton";
import Color from "../constants/Colors";

const BookDetailScreen = ({ route, navigation }) => {
   let { isbn } = route.params;
   let [bookDetails, setBookDetails] = useState({});
   let [isLoading, setIsLoading] = useState(false);

   useLayoutEffect(() => {
      navigation.setOptions({
         headerShown: false,
      });
   }, []);

   useEffect(() => {
      setIsLoading(true);
      getOpenLibraryBookDetails(isbn)
         .then((result) => {
            setBookDetails(result);
         })
         .finally(() => {
            setIsLoading(false);
         });
   }, []);

   const placesChips = bookDetails?.places?.slice(0, 5)?.map((place, index) => <Chip containerStyle={{ margin: 1, alignItems: "center", width: 150 }} title={place.name} key={index}></Chip>);
   const peopleChips = bookDetails?.people?.slice(0, 5)?.map((person, index) => <Chip containerStyle={{ margin: 1, alignItems: "center", width: 150 }} title={person.name} key={index}></Chip>);

   if (isLoading) {
      return (
         <SafeAreaView className="bg-white flex-1 justify-center flex-row">
            <ActivityIndicator size="large" color={Color.Primary}></ActivityIndicator>
         </SafeAreaView>
      );
   } else {
      return (
         <SafeAreaView className="bg-white">
            <View className="flex-row p-4 items-center space-x-2">
               <ChevronLeftIcon
                  size={35}
                  color={Color.Primary}
                  onPress={() => {
                     navigation.goBack();
                  }}
               />
               <View className="flex-1">
                  <Text className="font-bold text-xl" style={{ color: Color.Primary }}>
                     {bookDetails?.title}
                  </Text>
               </View>
            </View>
            <ScrollView className="bg-gray-100" contentContainerStyle={{ alignItems: "center" }}>
               {bookDetails?.coverUrl && <Image className="w-48 h-80 py-4 mt-4 rounded-lg" source={{ uri: bookDetails?.coverUrl }}></Image>}
               {!bookDetails?.coverUrl && <Image className="w-48 h-48 py-4 mt-4 rounded-lg" source={require("../assets/book.png")}></Image>}
               <Text className="text-base text-gray-600 mt-4">{bookDetails?.numberOfpages} Pages</Text>
               <Text className="text-base text-gray-600 mt-4">Published on {bookDetails?.publishDate}</Text>
               <OpenURLButton url={bookDetails?.infoURL} buttonStyle={{ marginTop: 15, borderRadius: 25, width: 200, backgroundColor: Color.Primary }}>
                  Read More
               </OpenURLButton>
               <View className="flex-row">
                  <View>
                     <Card>
                        <Card.Title style={{ fontWeight: "500" }}>Places</Card.Title>
                        {placesChips}
                     </Card>
                  </View>
                  <View>
                     <Card>
                        <Card.Title style={{ fontWeight: "500" }}>People</Card.Title>
                        {peopleChips}
                     </Card>
                  </View>
               </View>
            </ScrollView>
         </SafeAreaView>
      );
   }
};

export default BookDetailScreen;
