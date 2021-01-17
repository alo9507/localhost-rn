import { useContext } from 'react'
import StoreContext from "../../../../../store/StoreContext";
import EditProfileContext from "../store/EditProfileContext"
import useCurrentUser from "../../../../../hooks/useCurrentUser"

const useEditProfileState = () => {
    const [appState, setAppState] = useContext(StoreContext)
    const [editProfileState, setEditProfileState] = useContext(EditProfileContext);

    const [currentUser, updateCurrentUser] = useCurrentUser()

    const updateEditProfileState = (patch) => {
        setEditProfileState({ type: "UPDATE_USER_PATCH", payload: patch })
    }

    const submit = async () => {
        const result = await appState.userRepository.updateUser(editProfileState)
        updateCurrentUser(result)
    }

    return [editProfileState, updateEditProfileState, submit]
}

export default useEditProfileState