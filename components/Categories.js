import React, {useEffect, useState} from "react";
import { View, Text, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { getAllGenres, getBookListByGenreId } from "../services/BooksService";
import BookCard from "./BookCard";
import CategoryCard from "./CategoryCard";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";

export default function Categories() {

   let [data, setData] = useState([]);
   let [genre, setGenre] = useState()
   let [bookList, setBookList] = useState([]);
   let [refreshing, setRefreshing] = useState(false);

   useEffect(() => {
      getAllGenres()
         .then((result) => {
            setData([...result]);
         })
         .catch((exception) => {
            console.log(exception);
         })
   }, []);   

   const onRefresh = () => {
      setRefreshing(true);

      getAllGenres()
      .then((result) => {
         setData([...result]);
      })
      .catch((exception) => {
         console.log(exception);
      })
      .finally(() => {
         setRefreshing(false);
      })
   }

   const categoryPressed = (genre) => {
      setGenre(genre);

      getBookListByGenreId(genre?.genreId)
         .then((result) => {
            setBookList([...result]);
         })
         .catch((exception) => {
            console.log(exception);
         });
   };

   const categoryCards = data?.map(item => <CategoryCard title={item.title} name={item.title} id={item.genreId} key={item.genreId} onPress={() => categoryPressed(item)}></CategoryCard>);
   const booksCards = bookList?.map((bookData) => <BookCard bookData={bookData} key={bookData.bookDataId}></BookCard>);

   return (
      <View>
         <ScrollView
            horizontal
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
               paddingHorizontal: 15,
               paddingTop: 10,
            }}>
            {categoryCards}
         </ScrollView>
         <View className="px-4 py-3 flex-row">
            {genre?.title && bookList?.length > 0 && (
               <LinearGradient colors={["#57C5B6", "#159895", "#192f6a"]} style={styles.genreTitle}>
                  <Text style={styles.genreTitle}>{genre?.title}</Text>
               </LinearGradient>
            )}
         </View>
         <ScrollView>
            {bookList?.length > 0 ? (
               booksCards
            ) : (
               <>
                  <Text style={styles.textHeader}>Nothing To Show</Text>
               </>
            )}
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   genreTitle: {
      flex: 1,
      borderRadius: 8,
      width: "100%",
      height: 40,
      textAlign: "center",
      alignItems: "center",
      paddingTop: 2,
      fontWeight: "700",
      fontSize: 16,
      lineHeight: 28,
      color: "white"
   },
   textHeader: {
      alignSelf: "center",
      fontWeight: '500',
      color: Colors.Primary,
      fontSize: 18,
      marginTop: 16
   }
});
 