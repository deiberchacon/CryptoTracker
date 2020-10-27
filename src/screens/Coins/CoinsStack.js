import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CoinsScreen from './CoinsScreen';
import CoinDetailsScreen from 'CryptoTracker/src/screens/CoinDetails/CoinDetailsScreen';
import Colors from 'CryptoTracker/src/constants/colors';

const Stack = createStackNavigator();

const CoinsStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.blackPearl,
                    shadowColor: Colors.blackPearl
                },
                headerTintColor:  Colors.white
            }}
        >
        
            <Stack.Screen 
                name="Coins" 
                component={ CoinsScreen } 
            />

            <Stack.Screen 
                name="CoinDetails" 
                component={ CoinDetailsScreen } 
            />
            
        </Stack.Navigator>
    );
}

export default CoinsStack;