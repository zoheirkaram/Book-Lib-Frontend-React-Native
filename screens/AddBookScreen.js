import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, TextInput, StyleSheet, Modal } from "react-native";
import { Button } from '@rneui/themed'
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, PlusCircleIcon } from "react-native-heroicons/outline";
import Color from "../constants/Colors";
import { getAllGenres, getAllPublishers, getAllAuthors, AddBook, AddGenre, AddAuthor, AddPublisher } from "../services/BooksService";

const ModalPopup = ({visible, children}) => {
   return (
      <Modal transparent visible={visible} animationType="fade">
         <View style={styles.modalBackground}>
            <View style={[styles.modalContainer]}>
               {children}
            </View>
         </View>
      </Modal>
   )
}

const ModalContent = ({title, visibleSetter, saveHandler}) => {

   const[value, setValue] = useState('')

   return(
      <View style={{alignItems: "center", backgroundColor: "#f1f1f1"}}>
      <View style={styles.modalHeader}>
         <Text className="text-lg">{title}</Text>
      </View>                  
      <View className="flex-row px-4 py-2">
         <TextInput placeholder="Enter a new value" onChangeText={setValue} value={value} className="bg-white p-2 flex-1 rounded-md"></TextInput>
      </View>
      <View className="flex-row items-center justify-center space-y-2 space-x-2">
         <Button onPress={() => {saveHandler(value)}} title="Save" buttonStyle={styles.dialogButton} containerStyle={styles.buttonContainer}></Button>
         <Button onPress={() => visibleSetter(false)} title="Close" buttonStyle={styles.dialogButton} containerStyle={styles.buttonContainer}></Button>
      </View>
   </View>
   );
}

const AddBookScreen = ({ route, navigation }) => {
   
   useLayoutEffect(() => {
      navigation.setOptions({
         headerShown: false,
      });
   }, []);

   useEffect(() => {
      getGenres();
      getAuthors();
      getPublishers();
   }, []);

   let [genres, setGenres] = useState([]);
   let [authors, setAuthors] = useState([]);
   let [publishers, setPublishers] = useState([]);

   let [genreModalVisible, setGenreModalVisible] = useState(false)
   let [authorModalVisible, setAuthorModalVisible] = useState(false)
   let [publisherModalVisible, setPublisherModalVisible] = useState(false)

   let [bookName, setBookName] = useState('');
   let [description, setDescription] = useState('');
   let [isbn, setIsbn] = useState('');
   let [imageUrl, setImageUrl] = useState('');
   let [selectedGenre, setSelectedGenre] = useState();
   let [selectedAuthor, setSelectedAuthor] = useState();
   let [selectedPublisher, setSelectedPublisher] = useState();

   const getGenres = () => {
      getAllGenres()
         .then((result) => {
            setGenres(result);
         })
         .catch((exception) => {
            console.log(exception);
         });
   };

   const getAuthors = () => {
      getAllAuthors()
         .then((result) => {
            setAuthors(result);
         })
         .catch((exception) => {
            console.log(exception);
         });
   };

   const getPublishers = () => {
      getAllPublishers()
         .then((result) => {
            setPublishers(result);
         })
         .catch((exception) => {
            console.log(exception);
         });
   };

   const saveBook = () => {
      let data  = {
         'Title': bookName,
         'Description': description,
         'ISBN': isbn,
         'GenreId': selectedGenre?.genreId,
         'PublisherId': selectedPublisher?.publisherId,
         'AuthorId': selectedAuthor?.authorId
      };

      AddBook(data).
      then(result => {
         console.log(result);
      })
      .catch(error => {
         console.log(error)
      })
   }

   const saveNewGenre = (genre) => {
      if (!genre){
         alert (`Please enter a genre`);

         return;
      }
      
      var found = genres.find(item => item.title == genre);

      if (found) {
         alert (`There is already a genre called ${genre}\nPlease update your entry!`);

         return;
      }
      
      AddGenre({Title: genre})
      .then((result) => {
         setSelectedGenre({genreId: result, title: genre});
         getGenres();
      })
      .catch(error => {
         console.log(error);
      })

      setGenreModalVisible(false);
   }

   const saveNewAuthor = (author) => {
      if (!author){
         alert (`Please enter a author`);

         return;
      }
      
      var found = authors.find(item => item.name == author);

      if (found) {
         alert (`There is already a author called ${author}\nPlease update your entry!`);

         return;
      }
      
      AddAuthor({Name: author})
      .then((result) => {
         setSelectedAuthor({authorId: result, name: author});
         getAuthors();
      })
      .catch(error => {
         console.log(error);
      })

      setAuthorModalVisible(false);
   }

   const saveNewPublisher = (publisher) => {
      if (!publisher){
         alert (`Please enter a publisher`);

         return;
      }
      
      var found = publishers.find(item => item.name == publisher);

      if (found) {
         alert (`There is already a publisher called ${publisher}\nPlease update your entry!`);

         return;
      }
      
      AddPublisher({Name: publisher})
      .then((result) => {
         setSelectedPublisher({publisherId: result, name: publisher});
         getPublishers();
      })
      .catch(error => {
         console.log(error);
      })

      setPublisherModalVisible(false);
   }

   return (
      <SafeAreaView>
         <ModalPopup visible={genreModalVisible}>
            <ModalContent title={"Add New Genre"} visibleSetter={setGenreModalVisible} saveHandler={saveNewGenre}/>
         </ModalPopup>
         <ModalPopup visible={authorModalVisible}>
            <ModalContent title={"Add New Author"} visibleSetter={setAuthorModalVisible} saveHandler={saveNewAuthor}/>
         </ModalPopup>
         <ModalPopup visible={publisherModalVisible}>
            <ModalContent title={"Add New Publisher"} visibleSetter={setPublisherModalVisible} saveHandler={saveNewPublisher}/>
         </ModalPopup>
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
                  Add Book
               </Text>
            </View>
         </View>
         <View className="flex-row px-4 py-2">
            <TextInput onChangeText={setBookName} value={bookName} placeholder="Book Name" className="bg-white p-1 flex-1"></TextInput>
         </View>
         <View className="flex-row px-4 py-2">
            <TextInput onChangeText={setDescription} value={description} placeholder="Description" numberOfLines={3} maxLength={100} className="bg-white p-1 flex-1"></TextInput>
         </View>
         <View className="flex-row px-4 py-2">
            <TextInput onChangeText={setIsbn} value={isbn} placeholder="ISBN" className="bg-white p-1 flex-1"></TextInput>
         </View>
         <View className="flex-row items-center">
            <Dropdown
               className="flex-1"
               style={styles.dropdown}
               placeholderStyle={styles.placeholderStyle}
               selectedTextStyle={styles.selectedTextStyle}
               inputSearchStyle={styles.inputSearchStyle}
               data={genres}
               search
               maxHeight={300}
               labelField="title"
               valueField="genreId"
               placeholder="Select genre"
               searchPlaceholder="Search..."
               value={selectedGenre}
               onChange={(item) => {
                  setSelectedGenre(item);
               }}
            />
            <PlusCircleIcon size={35} color={Color.PlusButtonColor} style={{ marginRight: 16 }} onPress={() => setGenreModalVisible(true)} />
         </View>

         <View className="flex-row items-center">
            <Dropdown
               className="flex-1"
               style={styles.dropdown}
               placeholderStyle={styles.placeholderStyle}
               selectedTextStyle={styles.selectedTextStyle}
               inputSearchStyle={styles.inputSearchStyle}
               data={authors}
               search
               maxHeight={300}
               labelField="name"
               valueField="authorId"
               placeholder="Select author"
               searchPlaceholder="Search..."
               value={selectedAuthor}
               onChange={(item) => {
                  setSelectedAuthor(item);
               }}
            />
            <PlusCircleIcon size={35} color={Color.PlusButtonColor} style={{ marginRight: 16 }} onPress={() => setAuthorModalVisible(true)} />
         </View>

         <View className="flex-row items-center">
            <Dropdown
               className="flex-1"
               style={styles.dropdown}
               placeholderStyle={styles.placeholderStyle}
               selectedTextStyle={styles.selectedTextStyle}
               inputSearchStyle={styles.inputSearchStyle}
               data={publishers}
               search
               maxHeight={300}
               labelField="name"
               valueField="publisherId"
               placeholder="Select publisher"
               searchPlaceholder="Search..."
               value={selectedPublisher}
               onChange={(item) => {
                  setSelectedPublisher(item);
               }}
            />
            <PlusCircleIcon size={35} color={Color.PlusButtonColor} style={{ marginRight: 16 }} onPress={() => setPublisherModalVisible(true)} />
         </View>
         <View className="flex-row px-4 py-2">
            <TextInput onChangeText={setImageUrl} value={imageUrl} placeholder="Image URL" className="bg-white p-1 flex-1"></TextInput>
         </View>

         <View className="flex-row items-center justify-center">
            <Button title="Save" buttonStyle={styles.button} containerStyle={styles.buttonContainer} onPress={() => saveBook()}></Button>
            <Button title="Reset" buttonStyle={styles.button} containerStyle={styles.buttonContainer} onPress={() => {}}></Button>
         </View>
      </SafeAreaView>
   );
};

export default AddBookScreen;

const styles = StyleSheet.create({
   dropdown: {
      marginHorizontal: 16,
      marginVertical: 8,
      height: 44,
      borderBottomColor: "gray",
      borderBottomWidth: 0.5,
      backgroundColor: "white",
      paddingLeft: 4,
   },
   icon: {
      marginRight: 5,
   },
   placeholderStyle: {
      fontSize: 14,
      color: "#999999",
   },
   selectedTextStyle: {
      fontSize: 16,
   },
   inputSearchStyle: {
      height: 40,
      fontSize: 16,
   },
   button: {
      paddingHorizontal: 8,
      paddingVertical: 6,
      backgroundColor: Color.Primary,
      borderRadius: 10,
      shadowColor: '#ddd',
      shadowOpacity: 0.5
   },
   dialogButton: {
      paddingHorizontal: 8,
      paddingVertical: 6,
      backgroundColor: Color.DialogPrimary,
      borderRadius: 10
   },
   buttonContainer: {
      width: 120,
      marginHorizontal: 10,
      marginVertical: 20,
   },
   modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: "center",
      alignItems: "center"
   },
   modalContainer: {
      width: "80%",
      backgroundColor: "#f1f1f1",
      paddingHorizontal: 10,
      paddingVertical: 25,
      borderRadius: 20,
      elevation: 20
   },
   modalHeader: {
      width: "100%",
      paddingHorizontal: 15,
      height: 40,
      alignItems: "flex-start",
      justifyContent: "center"
   }
});
