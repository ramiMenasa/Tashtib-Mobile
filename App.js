import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/Home/home';
import Login from './src/Login/login';
import Profile from './src/Profile/Profile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Register from './src/Login/register';
import RegCust from './src/Login/regcust';
import RegClient from './src/Login/regclient';
import Categories from './src/Categories/Categories';
import { Provider } from 'react-redux';
import store from './src/Store/Store';
import Product from './src/Product/Product';
import ViewProfile from './src/ViewProfile/ViewProfile';
import Cart from './src/Cart/cart';
import { useSelector } from 'react-redux';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyDrawer() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    
    <Drawer.Navigator initialRouteName='Tashtib'  useLegacyImplementation={true} >
      <Drawer.Screen name="Tashtib" component={TabBottom} options={{headerTransparent:true}} />
      {currentUser? <Drawer.Screen name="Profile" component={Profile} />:
            <Drawer.Screen name="login" component={Login} />
          }


    </Drawer.Navigator>
  );
}

function TabBottom() {
  return (
    <Tab.Navigator
    initialRouteName='Home'
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'Cart') {
          iconName = focused ? 'cart' : 'cart-outline';
        } else if (route.name === 'Categories') {
          iconName = focused ? 'grid' : 'grid-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
    })}
  >

    
      <Tab.Screen name="Home" component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '',
        }}
      />
      
      <Tab.Screen name="Categories" component={Categories}
        options={{
          headerShown: false,
          tabBarLabel: '',
        }}
      />
      <Tab.Screen name="Cart" component={Cart}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarBadge:5,

        }}
      />
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator >
        
          <Stack.Screen name="drawer" component={MyDrawer}
          options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Register as customer" component={RegCust} />
        <Stack.Screen name="Register as client" component={RegClient} />
        <Stack.Screen name="ViewProfile" component={ViewProfile} />
        <Stack.Screen name="Product" component={Product} options={{headerTransparent:true,headerTitle:""}} />

      </Stack.Navigator >
    </NavigationContainer >
    </Provider>
  );
}

