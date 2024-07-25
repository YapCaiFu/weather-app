import { StyleSheet } from "react-native";
import fonts from "../../theme/fonts";
import { Colors } from "../../theme";

export const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyLabel: {
        ...fonts(16),
        color: Colors.textLightGrey,
    },
    headerContainer: {
        flex: 1,
        backgroundColor: Colors.themeGreen06
    },
    headerLabel: {
        ...fonts(20),
        color: Colors.White
    }
});
