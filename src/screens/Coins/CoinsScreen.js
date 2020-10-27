import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import Http from 'CryptoTracker/src/libs/http';
import CoinItem from 'CryptoTracker/src/components/ListItem/CoinItem';
import Colors from 'CryptoTracker/src/constants/colors';
import CoinSearch from 'CryptoTracker/src/components/Input/CoinSearch';

class CoinsScreen extends Component {
    state = {
        coins: [],
        allCoins: [],
        isLoading: false
    }

    componentDidMount = () => {
       this.getCoins();
    }

    getCoins = async () => {
        this.setState({ isLoading: true });
        const res = await Http.instance.get('https://api.coinlore.net/api/tickers/');
        
        this.setState({ coins: res.data, allCoins: res.data, isLoading: false });
    }

    handlePress = (coin) => {
        this.props.navigation.navigate('CoinDetails', { coin })
    }

    handleSearch = (query) => {
        const { allCoins } = this.state;
        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) || 
                coin.symbol.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({ coins: coinsFiltered });
    }

    render() {
        const { coins, isLoading } = this.state;

        return (
            <View style={ styles.container }>
                <CoinSearch onChange={this.handleSearch} />
                { isLoading ?
                    <ActivityIndicator
                        style={ styles.loader } 
                        color="#fff" 
                        size="large" 
                    /> :
                    null 
                }
                <FlatList 
                    data={coins}
                    renderItem={({ item }) => 
                    <CoinItem 
                        item={item} 
                        onPress={() => this.handlePress(item)} 
                    />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
    },
    titleText: {
        textAlign: "center",
        margin: 16
    },
    btn: {
        padding: 8,
        backgroundColor: "#004E98",
        borderRadius: 50,
        margin: 16
    },
    btnText: {
        color: '#ebebeb',
        textAlign: 'center'
    },
    loader: {
        marginTop: 60
    }
});

export default CoinsScreen;