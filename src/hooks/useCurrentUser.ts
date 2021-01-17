import { useContext } from 'react'
import StoreContext from "../store/StoreContext";

const useCurrentUser = () => {
    const [appState, setAppState] = useContext(StoreContext);
    const currentUser = appState.user

    const updateCurrentUser = (patch) => {
        console.log("current user updated", patch)
        setAppState({ type: "UPDATE_USER", payload: patch })
    }

    return [currentUser, updateCurrentUser]
}

export default useCurrentUser