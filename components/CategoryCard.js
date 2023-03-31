import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Color from "../constants/Colors";

const CategoryCard = ({title, onPress}) => {

  return (
    <TouchableOpacity onPress={onPress} className="mr-2 items-center align-middle rounded-lg" style={{backgroundColor: Color.PlusButtonColor, width: 150}}>      
      <Text className="text-white text-center font-bold py-4 px-1">{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard