import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from 'CryptoTracker/src/constants/colors';

const CoinMarketItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.priceText}>{parseFloat(item.price_usd).toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderColor: Colors.zircon,
        borderWidth: 1,
        padding: 16,
        margin: 8,
        alignItems: 'center' 
    },
    nameText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    priceText: {
        color: '#fff',
    }
});

export default CoinMarketItem;