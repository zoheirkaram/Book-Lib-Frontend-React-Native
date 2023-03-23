import { TailwindProvider } from 'tailwindcss-react-native'
import { NavigationContainer } from '@react-navigation/native'
// import { MainNavigator } from './navigations/MainNavigator';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import BookDetailScreen from "./screens/BookDetailScreen";
import AddBookScreen from './screens/AddBookScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        {/* <MainNavigator /> */}
        <Stack.Navigator>
         <Stack.Screen name='Home' component={HomeScreen} />
         <Stack.Screen name='Book Details' component={BookDetailScreen} />
         <Stack.Screen name='Add Book' component={AddBookScreen} />
      </Stack.Navigator>
      </TailwindProvider> 
    </NavigationContainer>
  );
}