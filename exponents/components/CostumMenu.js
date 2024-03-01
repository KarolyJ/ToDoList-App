import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../../Firebase";

const auth = FIREBASE_AUTH;

const Divider = () => <View style={styles.divider} />;

export default function CostumMenu() {
  return (
    <MenuProvider style={styles.container}>
      <Menu>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {
              top: -20,
            },
          }}
        >
          <Entypo name="dots-three-vertical" size={24} color="black" />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
            },
          }}
        >
          <MenuOption text="Sign Out" onSelect={() => auth.signOut()} />
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#7F8487",
  },
});
