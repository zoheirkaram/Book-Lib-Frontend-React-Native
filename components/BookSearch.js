import { StyleSheet, Text, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import Colors from '../constants/Colors'
import { getBookListBySearchTerm } from '../services/BooksService'
import BookCard from './BookCard'

export default function BookSearch ({searchTerm}) {

   let [bookList, setBookList] = useState([]);

   useEffect(() => {      
      getBookListBySearchTerm(searchTerm)
         .then((result) => {
            setBookList([...result]);
         })
         .catch((exception) => {
            console.log(exception);
         })
   }, [searchTerm]);

   console.log(bookList);
   const booksCards = bookList?.map((bookData) => <BookCard bookData={bookData} key={bookData.bookDataId}></BookCard>);

  return (
    <ScrollView>
      {bookList?.length > 0 ? (
               booksCards
            ) : (
               <>
                  <Text style={styles.textHeader}>Nothing To Show</Text>
               </>
            )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
   textHeader: {
      alignSelf: "center",
      fontWeight: '500',
      color: Colors.Primary,
      fontSize: 18,
      marginTop: 16
   }
})