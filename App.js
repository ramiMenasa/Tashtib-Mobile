import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/Home/home';
import Login from './src/Login/login';
import Profile from './src/Profile/Profile';
import Register from './src/Login/register';
import RegCust from './src/Login/regcust';
import RegClient from './src/Login/regclient';

const Stack = createNativeStackNavigator();
const Tab =createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return(
//     <Drawer.Navigator>

//     </Drawer.Navigator>
//   )
  
// }


function TabBottom() {  
    return(
    <Tab.Navigator> 
            <Tab.Screen name="Home" component={Home}  
            options={{
              tabBarLabel:'',
              tabBarIcon: () => (
                <MaterialCommunityIcons name="home" color="black" size={40} />
              ),
            }}       
            />
            <Tab.Screen name="login" component={Login}  
            options={{
              tabBarLabel:'',
              tabBarIcon: () => (
                <MaterialCommunityIcons name="login" color="black" size={40} />
              ),}}       
            />     
            <Tab.Screen name="profile" component={Profile}  
            options={{
              tabBarLabel:'',
              tabBarIcon: () => (
                <FontAwesome name="user" color="black" size={40} />
              ),}}       
            />
          </Tab.Navigator>
    )
  }
  

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="tap" component={TabBottom}
          options={{ headerShown: false }}/>
          {/* <Stack.Screen name="drawer" component={MyDrawer}
          options={{ headerShown: false }}/> */}
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="regcust" component={RegCust} />
        <Stack.Screen name="regclient" component={RegClient} />


      </Stack.Navigator >
    </NavigationContainer >
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
