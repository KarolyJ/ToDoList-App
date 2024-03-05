import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../../Firebase";

export default function ForgotPasswordPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const resetUserPassword = async () => {
    setLoading(true);
    try {
      const response = await sendPasswordResetEmail(auth, email);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <>
          <Pressable
            style={({ pressed }) => [
              pressed ? { opacity: 0.9 } : {},
              styles.resetPassBtn,
            ]}
            onPress={() => resetUserPassword()}
          >
            <View>
              <Text>Reset Password</Text>
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
    </KeyboardAvoidingView>
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
    marginLeft: 0,
  },
  resetPassBtn: {
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
