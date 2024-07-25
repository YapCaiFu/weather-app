import { StyleSheet } from "react-native";
import fonts from "../../theme/fonts";
import { Colors } from "../../theme";

export const styles = StyleSheet.create({
    buttonLabel: {
        ...fonts(10, 'medium'),
        color: Colors.themeGreen06,
    },
    buttonActiveLabel: {
        ...fonts(10, 'bold'),
        color: Colors.themeGreen,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    subheaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: Colors.yellow50,
    },
    subheaderLeftContainer: {
        flex: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    subheaderRightContainer: {
        flex: 0.3,
        alignItems: 'flex-end'
    },
    searchLabel: {
        ...fonts(14, 'normal')
    },
    headerContainer: {
        flex: 1,
        backgroundColor: Colors.themeGreen06
    },
    subheader2Container: {
        padding: 7,
        backgroundColor: Colors.lighterGrey,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});
