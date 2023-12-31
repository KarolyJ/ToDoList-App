import { View, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ListItem({ListText, delFromList}) {
    return(
        <View>  
            <BouncyCheckbox
                size={25}
                fillColor="red"
                unfillColor="#FFFFFF"
                text= {ListText}
                iconStyle={{ borderColor: "red" }}
                />
            <Icon name="close" size={20} onPress={delFromList}/>
        </View>
    )
}

const styles = StyleSheet.create({
    ItemContainer: {
        flexDirection: 'row',
    },
});