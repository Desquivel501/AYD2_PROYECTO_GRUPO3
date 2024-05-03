import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, LogBox  } from 'react-native';
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
import PedidoView from './views/PedidoView/PedidoView';

import { TabsUser, TabsSeller, TabsAdmin } from './utils/Routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import RegisterView from './views/RegisterView/RegisterView';
import RegisterVendedorView from './views/RegisterVendedorView/RegisterVendedorView';

LogBox.ignoreAllLogs();


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Login" component={LoginView} />
          <Stack.Screen name="RegisterUser" component={RegisterView} />
          <Stack.Screen name="RegisterVendedor" component={RegisterVendedorView} />
          <Stack.Screen name="UserMenu" component={TabsUser} />
          <Stack.Screen name="SellerMenu" component={TabsSeller} />
          <Stack.Screen name="AdminMenu" component={TabsAdmin} />
          <Stack.Screen name="Product" component={ProductView} />
          <Stack.Screen name="Edit" component={EditView} />
          <Stack.Screen name="Pedido" component={PedidoView} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
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