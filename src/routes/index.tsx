import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Characters from '../screens/Characters';

export type RootBottomParamList = {
  Characters: undefined;
};

export const Routes = () => {
  const Tab = createBottomTabNavigator<RootBottomParamList>();

  return (
    <NavigationContainer>
      <Tab.Navigator>
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
      </Tab.Navigator>
    </NavigationContainer>
  );
};
