import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoListPage from "./exponents/pages/DoListPage";
import LoginPage from "./exponents/pages/LoginPage";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./Firebase";
import CreateAccountPage from "./exponents/pages/CreateAccountPage";
import ForgotPasswordPage from "./exponents/pages/ForgotPasswordPage";

//TODO if only the user is logged in, then he can see his own list of Dos

/* createNativeStackNavigator is a function that returns an object containing 2 properties:
Screen and Navigator. Both of them are React components used for configuring the navigator.
The Navigator should contain Screen elements as its children to define the configuration for routes. */
const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();
const OutsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="My ToDos"
        component={DoListPage}
        options={{ headerShown: false }}
      />
    </InsideStack.Navigator>
  );
}

function OutsideLayout() {
  return (
    <OutsideStack.Navigator initialRouteName="SignInScreen">
      <OutsideStack.Screen
        name="LogInScreen"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <OutsideStack.Screen
        name="RegisterScreen"
        component={CreateAccountPage}
        options={{ headerShown: false }}
      />
      <OutsideStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordPage}
        options={{ headerShown: false }}
      />
    </OutsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);
  try {
    if (user !== null && user.emailVerified) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={InsideLayout}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={OutsideLayout}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  } catch (error) {
    console.log(error);
  }

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       {user && user.emailVerified ? (
  //         <Stack.Screen
  //           name="Home"
  //           component={InsideLayout}
  //           options={{ headerShown: false }}
  //         />
  //       ) : (
  //         <>
  //           <Stack.Screen
  //             name="SignIn"
  //             component={OutsideLayout}
  //             options={{ headerShown: false }}
  //           />
  //           {/* This is the screen we show if the user isn't signed in already (we couldn't find a token). */}
  //         </>
  //       )}
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

  // );
}
