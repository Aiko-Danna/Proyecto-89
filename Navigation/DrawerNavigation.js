import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import ProfileScreen from '../Screens/Profile';
import LoginScreen from '../Screens/LoginScreen';
import Logout from '../Screens/Logout';
import CustomSidebarMenu from '../Screens/CustomSidebarMenu';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component{
    constructor(props){
        super(props);
        this.state={
          light_theme: true
        };
    }

    render(){
        return (
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: "#e91e63",
                    inactiveTintColor: this.state.light_theme? "black": "white",
                    itemStyle: { marginVertical: 5 }
                }}
                drawerContent={props => <CustomSidebarMenu {...props} />}
            >
                <Drawer.Screen 
                    name="Home"
                    component={StackNavigator} 
                    options={{ unmountOnBlur: true }}
                />
                <Drawer.Screen 
                    name="Profile" 
                    component={ProfileScreen} 
                    options={{ unmountOnBlur: true }}
                />
                <Drawer.Screen 
                    name="Logout" 
                    component={Logout} 
                    options={{ unmountOnBlur: true }}
                />
            </Drawer.Navigator>
        );
    }
};