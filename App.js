import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from 'CryptoTracker/src/screens/Coins/CoinsStack';
import FavoritesStack from 'CryptoTracker/src/screens/Favorites/FavoritesStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from 'CryptoTracker/src/constants/colors';

const Tabs = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tabs.Navigator
                tabBarOptions={{
                    tintCOlor: '#fefefe',
                    style:  {
                        backgroundColor: Colors.blackPearl
                    }
                }}
            >
                <Tabs.Screen
                    name="Coins"
                    component={ CoinsStack }
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Image 
                                style={{ tintColor: color, width: size, height: size }}
                                source={ require('CryptoTracker/src/assets/bank.png') } 
                            />
                        )
                    }}
                />

                <Tabs.Screen
                    name="Favorites"
                    component={ FavoritesStack }
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Image 
                                style={{ tintColor: color, width: size, height: size }}
                                source={ require('CryptoTracker/src/assets/star.png') } 
                            />
                        )
                    }}
                />
            </Tabs.Navigator>
        </NavigationContainer>
    );
};

export default App;
