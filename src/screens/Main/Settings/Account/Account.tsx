import React from "react";
import { View, Button } from "react-native";
import StoreContext from "../../../../store/StoreContext";

const Account = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);

    function close() {
        props.navigation.pop()
    }

    function forgotPassword() {
        props.navigation.navigate("ForgotPassword")
    }

    return (
        <>
            <View>
                <Button title="Close" onPress={close} />
                <Button title="Forgot Password" onPress={forgotPassword} />
            </View>
        </>
    );
};

export default Account;
