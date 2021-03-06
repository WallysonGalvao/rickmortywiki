import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Characters from '~/screens/Characters';
import Episodes from '~/screens/Episodes';
import Locations from '~/screens/Locations';
import Details from '~/screens/Details';

import { Character } from '~/types/common';

export type RootStackParamList = {
  BottomRoutes: undefined;
  Details: { character: Character };
};

export type RootBottomParamList = {
  Characters: undefined;
  Episodes: undefined;
  Locations: undefined;
};

export const BottomRoutes = () => {
  const Tab = createBottomTabNavigator<RootBottomParamList>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Characters">
      <Tab.Screen
        name="Characters"
        component={Characters}
        options={{
          tabBarLabel: 'Characters',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Episodes"
        component={Episodes}
        options={{
          tabBarLabel: 'Episodes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Locations"
        component={Locations}
        options={{
          tabBarLabel: 'Locations',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="globe" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Routes = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Group>
          <Stack.Screen name="BottomRoutes" component={BottomRoutes} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
