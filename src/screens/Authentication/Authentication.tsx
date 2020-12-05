import Launch from "../Launch";
import { createStackNavigator } from "@react-navigation/stack";

const LoginStack = createStackNavigator();
function LoginStackScreens() {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen
                name="Login"
                component={Login}
                options={{ title: "Sign In/Sign Up" }}
            />
        </LoginStack.Navigator>
    )
}

export default LoginStackScreens