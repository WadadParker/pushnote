import { NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Home from "./screens/Home";
import AuthNavigation from "./AuthNavigation";
import ImageFullScreen from "./screens/ImageFullScreen/ImageFullScreen";
import TaskForm from "./screens/TaskStackScreen/normalTask/NormalTask";
import RecurringTaskForm from "./screens/TaskStackScreen/recurringTask/RecurringTask";
import { useData } from "./context/AppContext";

import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

// Stack, let's play UNO with our screens

const HomeStack = createNativeStackNavigator();



// Below here is Tab Navigation, based on tabs, it will render those screens

const Tab = createBottomTabNavigator();

const TabGroup=()=>
{
    const {state:{user:{isManager}}} = useData();

    return (
        <Tab.Navigator
            screenOptions={({route,navigation})=>({
                tabBarIcon: ({color,focused,size})=>{
                    let iconName;
                    if(route.name==="Home"){
                        iconName="home"
                    }
                    else if(route.name==="Chat")
                    {
                        iconName="md-chatbubbles-outline"
                    }
                    else if(route.name==="Reports")
                    {
                        return <Foundation name="graph-bar" size={size} color={color} />
                    }
                    else if(route.name==="Leaderboard")
                    {
                        return <MaterialIcons name="leaderboard" size={size} color={color} />
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor:"#573AFF"
            })}
        >
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Chat" component={Home} />
            {isManager
            ?<Tab.Screen name="Reports" component={Home} />
            :<Tab.Screen name="Leaderboard" component={Home} />}
        </Tab.Navigator>
    )
}

// Top tabs

const TopTab = createMaterialTopTabNavigator();

const TopTabGroup=()=>
{
    return (
    <TopTab.Navigator>
        <TopTab.Screen name="Single Task" component={TaskForm} />
        <TopTab.Screen name="Recurring Task" component={RecurringTaskForm} />
    </TopTab.Navigator>
    )
}

const HomeStackGroup=()=>
{
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Board" component={TabGroup} options={{headerShown:false}}/>
            <HomeStack.Screen name="ImageFullScreen" component={ImageFullScreen}  options={{presentation:"fullScreenModal",headerShown:false}}/>
            <HomeStack.Screen name="Task" component={TopTabGroup} />
        </HomeStack.Navigator>
    )
}

const Navigation=()=>
{
    const {authState:{isRegistered}} = useData();
    if(isRegistered)
    {
    return (
        <NavigationContainer>
            <HomeStackGroup />
        </NavigationContainer>
    )}
    return <AuthNavigation />
}

export default Navigation;

{/* <Tab.Screen name="Home" component={Home} 
                options={{
                    tabBarIcon: ()=> <Octicons name="home" size={24} color="black" />
                }}
            /> */
//it's said it can be done like this, but it is not best way to do, hence we do it in Tab.Navigator itself        
}
// The color focus and size property is native from Tab.Navigator only
