import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Color from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const CategoryCard = ({ title, onPress }) => {
   return (
     <TouchableOpacity onPress={onPress} className="mr-2 items-center align-middle" style={{ backgroundColor: Color.Secondary, width: 150, borderRadius: 10}}>
        <LinearGradient colors={["#7484a8", "#3b5998", "#192f6a"]} style={{borderRadius: 10, width: 150}}>
            <Text className="text-white text-center font-bold py-4 px-1">{title}</Text>
         </LinearGradient>
      </TouchableOpacity>
   );
};

export default CategoryCard;
