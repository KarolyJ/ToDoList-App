import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Button,
  Pressable,
} from "react-native";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";
import { FIREBASE_AUTH } from "../../Firebase";

export default function CreateAccountPage({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const auth = FIREBASE_AUTH;

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Now you can LogIn");
      navigation.navigate("LogInScreen");
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      sendEmailVerification(auth.currentUser);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
        ></TextInput>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <>
          <Pressable
            style={({ pressed }) => [
              pressed ? { opacity: 0.9 } : {},
              styles.registerBtn,
            ]}
            onPress={() => signUp()}
          >
            <View>
              <Text>Register</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("LogInScreen")}
            style={styles.backButton}
          >
            <Text>Back</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#6a8f7b",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  registerBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#32754f",
  },
  backButton: {
    height: 50,
    width: "80%",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
