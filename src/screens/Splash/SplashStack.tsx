import Launch from "../Launch";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./Splash"

const SplashStack = createStackNavigator();
function SplashStackScreens() {
    return (
        <SplashStack.Navigator>
            <SplashStack.Screen
                name="Splash"
                component={Splash}
                options={{ title: "Splash" }}
            />
        </SplashStack.Navigator>
    )
}

export default Splash;