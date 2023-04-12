import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import BookDetailScreen from "../screens/BookDetailScreen";
import AddBookScreen from '../screens/AddBookScreen';


const Stack = createStackNavigator();

function MainNavigator() {
   return (
      <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Book Details' component={BookDetailScreen} />
      <Stack.Screen name='Add Book' component={AddBookScreen} />
   </Stack.Navigator>
   );
}

export default MainNavigator;
