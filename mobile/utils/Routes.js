import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, Text, View, Button } from 'react-native';
// import CatalogoView from './views/CatalogoView/CatalogoView';
// import CarritoView from './views/CarritoView/CarritoView';
import CatalogoView from '../views/CatalogoView/CatalogoView';
import CarritoView from '../views/CarritoView/CarritoView';
// import PerfilView from '../views/Profiles/profile';
import HabDesView from '../views/Hab-Des/hab-des';
import SolVendView from '../views/SolicitudesVendedor/SolicitudesVend';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PedidosView from '../views/PedidosView/PedidosView';
import MyProductsView from '../views/CatalogoView/MyProductsView';
import VentasView from '../views/PedidosView/VentasView';
import AdminReportesView from '../views/AdminReportesView/AdminReportesView';

import UserProfile from '../views/Profiles/profile';


const Tab = createBottomTabNavigator();

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

export function TabsUser() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Tab.Screen name="Catalogo" component={CatalogoView} 
          options={{
            tabBarLabel: 'Catalogo',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="shopping-bag" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name="Carrito" component={CarritoView}
          options={{
            tabBarLabel: 'Carrito',
            tabBarIcon: ({ color }) => (
              // <FontAwesome5 name="" color={color} size={26} />
              <FontAwesome5 name="shopping-cart" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name="Pedidos" component={PedidosView}
          options={{
            tabBarLabel: 'Mis Pedidos',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="receipt" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen 
          name="Mi Perfil" 
          component={UserProfile}
          options={{
            tabBarLabel: 'Mi Perfil',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  
export function TabsSeller() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Tab.Screen name="Mis Produtos" component={MyProductsView} 
          options={{
            tabBarLabel: 'Catalogo',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="shopping-bag" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name="Ventas" component={VentasView}
          options={{
            tabBarLabel: 'Mis Ventas',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="receipt" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen 
          name="Mi Perfil" 
          component={UserProfile}
          options={{
            tabBarLabel: 'Mi Perfil',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  export function TabsAdmin() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Tab.Screen name="Solicitudes Vendedor" component={SolVendView} 
          options={{
            tabBarLabel: 'Solicitudes',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="envelope" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name="Hab-Des-Usuarios" component={HabDesView}
          options={{
            tabBarLabel: 'Usuarios / Vendedores',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="users" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name="Reportes" component={AdminReportesView}
          options={{
            tabBarLabel: 'Reportes',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="file" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen 
        name="Mi Perfil" 
        component={UserProfile}
        options={{
          tabBarLabel: 'Mi Perfil',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" color={color} size={26} />
          ),
        }}
        />
      </Tab.Navigator>
    );
  }