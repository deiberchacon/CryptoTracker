import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import FavoritesEmptyState from 'CryptoTracker/src/components/Messages/FavoritesEmptyState'
import Storage from 'CryptoTracker/src/libs/storage'
import Colors from 'CryptoTracker/src/constants/colors';
import CoinItem from 'CryptoTracker/src/components/ListItem/CoinItem';

class FavoritesScreen extends Component {
    state = {
        favorites: [],
        isLoading: false
    }

    componentDidMount() {
        this.getFavorites();
        this.props.navigation.addListener('focus', this.getFavorites);
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus', this.getFavorites);
    }

    getFavorites = async () => {
        try {
            this.setState({ isLoading: true });
            const allKeys = await Storage.instance.getAllKeys();
            const keys = allKeys.filter(key => key.includes('favorite-'));
            const favs = await Storage.instance.multiGet(keys);

            const favorites = favs.map(fav => JSON.parse(fav[1]));

            this.setState({ favorites, isLoading: false });
        } catch (err) {
            console.log('get favorites error', err)
        }
    }

    handlePress = (coin) => {
        this.props.navigation.navigate('CoinDetails', { coin });
    }

    render() {
        const { favorites, isLoading } = this.state;

        return (
            <View style={ styles.container }>
                { isLoading 
                    ? <ActivityIndicator 
                        style={ styles.loader } 
                        color="#fff" 
                        size="large" 
                    />
                    : favorites.length > 0
                        ? <FlatList 
                            data={favorites}
                            renderItem={({item}) => 
                                <CoinItem item={item} onPress={() => this.handlePress(item) } />
                            }
                        /> 
                        : <FavoritesEmptyState /> 
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        flex: 1
    },
    loader: {
        marginTop: 60
    }
});

export default FavoritesScreen;