import React from "react";
import { Text, Button } from "react-native"
import StoreContext from "../../../../store/StoreContext";

const Account = (props) => {
    const [appState, _] = React.useContext(StoreContext);

    const signOut = async () => {
        let _ = await appState.authManager.signOut(appState.authManager.authSession.accessToken)
        appState.dispatch({ type: "IS_NOT_AUTHENTICATED" })
    }

    return (
        <>
            <Text>Account</Text>
            <Button title="Close" onPress={() => props.navigation.pop()} />
            <Button title="Sign Out" onPress={signOut} />
        </>
    )
}

export default Account