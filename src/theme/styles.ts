import { StyleSheet } from "react-native";
import Colors from "./colors";
import fonts from "./fonts";

export default StyleSheet.create({
    flatListContainer: {
        flexGrow: 1,
        backgroundColor: Colors.White,
    },
    subheader2Container: {
        padding: 7,
        backgroundColor: Colors.lighterGrey,
        alignItems: 'flex-end',
    },
    overallContainer: {
        flex: 1,
    },
    separator: {
        borderBottomColor: Colors.lightGrey,
        borderBottomWidth: 1,
    },
    resultLabel: {
        ...fonts(10),
        color: Colors.textLightGrey,
    },
});
