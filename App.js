import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/Home/home';
import Login from './src/Login/login';
import Profile from './src/Profile/Profile';
import { SafeAreaView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Register from './src/Login/register';
import RegCust from './src/Login/regcust';
import RegClient from './src/Login/regclient';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName='Home' useLegacyImplementation={true}>
      <Drawer.Screen name="Home" component={TabBottom} options />
      <Drawer.Screen name="Profile" component={Profile} />

    </Drawer.Navigator>
  );
}


function TabBottom() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ai" component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color="black" size={40} />
          ),
        }}
      />
      <Tab.Screen name="login" component={Login}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="login" color="black" size={40} />
          ),
        }}
      />
      {/* <Tab.Screen name="profile" component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <FontAwesome name="user" color="black" size={40} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
          <Stack.Screen name="drawer" component={MyDrawer}
          options={{ headerShown: false }}/>
          <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="regcust" component={RegCust} />
        <Stack.Screen name="regclient" component={RegClient} />
      </Stack.Navigator >
    </NavigationContainer >
  );
}

