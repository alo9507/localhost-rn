import React from "react";
import { Text, Button } from "react-native"
import StoreContext from "../../../../store/StoreContext";

const Account = (props) => {
    const [appState, setAppState] = React.useContext(StoreContext);
    console.log(props)
    async function signOut() {
        let authResult = await appState.authManager.signOut()
        props.route.params.dispatch({ type: "IS_NOT_AUTHENTICATED" })
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