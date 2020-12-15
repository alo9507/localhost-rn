import React, { useEffect, useState } from "react";
import { Text } from "react-native";

const Matches = (props) => {

    const [matches, setMatches] = useState([])

    useEffect(() => {
        async function getMatches() {
            try {
                const users = await appState.userRepository.getIncomingNods({ id: appState.user.id, ...location })
                setState({ ...state, users, loading: false })
            } catch (e) {
                setState({ ...state, loading: false, error: e })
            }
        }

        getMatches()
    }, [matches])

    return (
        <>
            <Text>Matches</Text>
        </>
    );
};

export default Matches;
