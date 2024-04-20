import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, Text, View, Button } from 'react-native';
// import CatalogoView from './views/CatalogoView/CatalogoView';
// import CarritoView from './views/CarritoView/CarritoView';
import CatalogoView from '../views/CatalogoView/CatalogoView';
import CarritoView from '../views/CarritoView/CarritoView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
        <Tab.Screen name="Pedidos" component={HomeScreen}
          options={{
            tabBarLabel: 'Mis Pedidos',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="receipt" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen 
          name="Mi Perfil" 
          component={HomeScreen}
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
        <Tab.Screen name="Mis Produtos" component={CatalogoView} 
          options={{
            tabBarLabel: 'Catalogo',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="shopping-bag" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name="Mis Ventas" component={HomeScreen}
          options={{
            tabBarLabel: 'Mis Pedidos',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="receipt" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen 
          name="Mi Perfil" 
          component={HomeScreen}
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