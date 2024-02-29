import {StyleSheet} from "react-native";
import Colors from "../../Constant/Color";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'flex-end',
    },
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 25,
        marginRight: 10,
        flex: 1,
        alignItems: 'flex-end',
    },
    textInput: {
        flex: 1,
        marginHorizontal: 10,
        maxHeight: 120
    },
    icon: {
        marginHorizontal: 5,
        paddingBottom: 13,
    },
    buttonContainer: {
        backgroundColor: Colors.light.tint,
        borderRadius: 25,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default styles;