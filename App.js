import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoListPage from "./exponents/pages/DoListPage";
import LoginPage from "./exponents/pages/LoginPage";

//TODO create the Login page
//TODO learn how to change between pages
//TODO if only the user is logged in, then he can see his own list of Dos

/* createNativeStackNavigator is a function that returns an object containing 2 properties:
Screen and Navigator. Both of them are React components used for configuring the navigator.
The Navigator should contain Screen elements as its children to define the configuration for routes. */
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
