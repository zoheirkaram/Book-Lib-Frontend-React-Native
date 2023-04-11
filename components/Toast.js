import React, {useEffect, useRef} from "react";
import { Animated, Text } from "react-native";

const Toast = (props) => {

   const opacity = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      Animated.sequence([
         Animated.timing(opacity, {
            Value: 1,
            duration: 500,
            useNativeDriver: true
         }),
         Animated.delay(2000),
         Animated.timing(opacity, {
            value: 0,
            duration: 500,
            useNativeDriver: true
         })
      ]).start(() => {
         props.OnHide();
      })
   },[]);

   return(
      <Animated.View style={{
         opacity,
         transform: [{
            translateY: opacity.interpolate({
               inputRange: [0, 1],
               outputRange: [-20, 0]
            })
         }],
         margin: 10,
         marginBottom: 15,
         backgroundColor: "white",
         padding: 10,
         borderRadius: 4,
         shadowColor: "black",
         shadowOffset:{
            width: 0,
            height: 3
         },
         shadowOpacity: 0.15,
         shadowRadius: 5,
         elevation: 6
      }}>
         <Text>{props.message}</Text>
      </Animated.View>
   );
}

export default Toast;