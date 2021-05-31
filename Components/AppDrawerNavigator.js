import {createDrawerNavigator} from "react-navigation-drawer"
import CustomSideBarMenu from "./CustomSideBarMenu"
import Home from "../Screens/HomeScreen"
import Myfriends from "../Screens/MyFriends"
export const AppDrawerNavigator=createDrawerNavigator({
    Home:{screen:Home},
    FriendList:{screen:Myfriends}
},
{contentComponent:CustomSideBarMenu
},
{intialRouteName:"Home"})

