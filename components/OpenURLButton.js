import React, {useCallback} from 'react';
import {Alert, Linking } from 'react-native';
import { Button } from '@rneui/base';

export default function OpenURLButton ({url, buttonStyle, children}) {
   const handlePress = useCallback(async () => {
     const supported = await Linking.canOpenURL(url);
 
     if (supported) {
       await Linking.openURL(url);
     } else {
       Alert.alert(`Don't know how to open this URL: ${url}`);
     }
   }, [url]);
 
   return <Button title={children} buttonStyle={buttonStyle} onPress={handlePress} />;
 };

