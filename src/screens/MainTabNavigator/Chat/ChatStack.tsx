import Chat from "./Chat"
import { createStackNavigator } from "@react-navigation/stack";

const MatchesStack = createStackNavigator();
function ChatStack() {
    return (
        <MatchesStack.Navigator>
            <MatchesStack.Screen
                name="Matches"
                component={Chat}
                options={{ title: "Matches" }}
            />
        </MatchesStack.Navigator>
    )
}

export default ChatStack;