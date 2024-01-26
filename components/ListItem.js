import { View, StyleSheet, TouchableOpacity } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ListItem({ ListText, delFromList }) {
  return (
    <View style={styles.ItemContainer}>
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        text={ListText}
        iconStyle={{ borderColor: "red" }}
      />
      <TouchableOpacity onPress={delFromList}>
        <Icon name="close" size={20} style={{ marginLeft: 20 }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  ItemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
});
