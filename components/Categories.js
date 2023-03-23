import React, {useEffect, useState} from "react";
import { View, Text, ScrollView } from "react-native";
import { getAllGenres, getBookListByGenreId } from "../services/BooksService";
import BookCard from "./BookCard";
import CategoryCard from "./CategoryCard";
import Color from '../constants/Colors';

export default function Categories() {

   let [data, setData] = useState();
   let [genre, setGenre] = useState()
   let [bookList, setBookList] = useState();

   useEffect(() => {
      getAllGenres()
         .then((result) => {
            setData([...result]);
         })
         .catch((exception) => {
            console.log(exception);
         })
   }, []);

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
         <ScrollView horizontal 
                     showsHorizontalScrollIndicator={false}
                     contentContainerStyle={{
                        paddingHorizontal: 15,
                        paddingTop: 10
                     }}>
            {categoryCards}
         </ScrollView>
         <View className="px-4 py-4 flex-row">
            {genre?.title && <Text className="flex-1 rounded-lg w-20 h-15 text-center py-3 font-bold text-lg bg-gray-200" style={{color: Color.Primary}}>{genre?.title}</Text>}
         </View>     
         <ScrollView>
            {booksCards}
         </ScrollView> 
      </View>

   );
};
 