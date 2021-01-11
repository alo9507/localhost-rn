import Chat from "./Chat"
import { createStackNavigator } from "@react-navigation/stack";
import React from "react"

const ChatStack = createStackNavigator();
function ChatStackNavigator() {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen
                name="Chat"
                component={Chat}
                options={{ title: "ChatStack" }}
            />
        </ChatStack.Navigator>
    )
}

export default ChatStackNavigator;