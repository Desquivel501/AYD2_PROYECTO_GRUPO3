import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginView from './views/LoginView/LoginView';
import AppNavigator from './components/AppNavigator/AppNavigator';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CatalogoView from './views/CatalogoView/CatalogoView';
import ProductView from './views/ProductView/ProductView';
import EditView from './views/EditView/EditView';
import CarritoView from './views/CarritoView/CarritoView';

import { TabsUser, TabsSeller, TabsAdmin } from './utils/Routes';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// function TabsUser() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false
//       }}
//     >
//       <Tab.Screen name="Catalogo" component={CatalogoView} 
//         options={{
//           tabBarLabel: 'Catalogo',
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="shopping-bag" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen name="Carrito" component={CarritoView}
//         options={{
//           tabBarLabel: 'Carrito',
//           tabBarIcon: ({ color }) => (
//             // <FontAwesome5 name="" color={color} size={26} />
//             <FontAwesome5 name="shopping-cart" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen name="Pedidos" component={HomeScreen}
//         options={{
//           tabBarLabel: 'Mis Pedidos',
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="receipt" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen 
//         name="Mi Perfil" 
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Mi Perfil',
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="user" color={color} size={26} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// function TabsUser() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false
//       }}
//     >
//       <Tab.Screen name="Catalogo" component={CatalogoView} 
//         options={{
//           tabBarLabel: 'Catalogo',
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="shopping-bag" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen name="Carrito" component={CarritoView}
//         options={{
//           tabBarLabel: 'Carrito',
//           tabBarIcon: ({ color }) => (
//             // <FontAwesome5 name="" color={color} size={26} />
//             <FontAwesome5 name="shopping-cart" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen name="Pedidos" component={HomeScreen}
//         options={{
//           tabBarLabel: 'Mis Pedidos',
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="receipt" color={color} size={26} />
//           ),
//         }}
//       />
//       <Tab.Screen 
//         name="Mi Perfil" 
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Mi Perfil',
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="user" color={color} size={26} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

function HomeScreen({ navigation }) {
  return (
    <View style={{flex: 1}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')}
        />
        
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="UserMenu" component={TabsUser} />
          <Stack.Screen name="SellerMenu" component={TabsUser} />
          <Stack.Screen name="Product" component={ProductView} />
          <Stack.Screen name="Edit" component={EditView} />
          
          {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});