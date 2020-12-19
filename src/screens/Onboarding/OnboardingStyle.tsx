import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink',
        paddingTop: "100px"
    },
    image: {
        width: 320,
        height: 320,
        marginVertical: 32,
    },
    text: {
        // color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        // color: 'white',
        textAlign: 'center',
    },
    container: { flex: 1 },
});

export default styles