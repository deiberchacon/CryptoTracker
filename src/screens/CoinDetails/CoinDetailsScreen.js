import React, { Component } from 'react';
import { 
    View,
    Text,
    Image,
    SectionList,
    FlatList,
    Pressable,
    Alert,
    StyleSheet,
    Platform 
} from 'react-native';
import Colors from 'CryptoTracker/src/constants/colors';
import Http from 'CryptoTracker/src/libs/http';
import CoinMarketItem from 'CryptoTracker/src/components/ListItem/CoinMarketItem';
import Storage from 'CryptoTracker/src/libs/storage';

class CoinDetailsScreen extends Component {
    state = {
        coin: {},
        markets: [],
        isFavorite: false
    }

    toggleFavorite = () => {
        if (this.state.isFavorite) {
            this.removeFavorite();
        } else {
            this.addFavorite();
        }
    }

    getFavorite = async () => {
        try {
            const key = `favorite-${this.state.coin.id}`;
            const favoriteStr = await Storage.instance.get(key);
            
            this.setState({ isFavorite: favoriteStr ? true : false });
        } catch (err) {
            console.log('get favorite error', err);
        }
    }

    addFavorite = async () => {
        const coin = JSON.stringify(this.state.coin);
        const key = `favorite-${this.state.coin.id}`;
        const stored = await Storage.instance.store(key, coin);

        if (stored) {
            this.setState({ isFavorite: true })
        }
    }

    removeFavorite = () => {

        Alert.alert('Remove favorite', 'Are you sure?', [
            {
                text: 'No',
                onPress: () => {},
                style: 'cancel'
            },
            {
                text: 'Yes',
                onPress: async () => {
                    const key = `favorite-${this.state.coin.id}`;
                    const removed = await Storage.instance.remove(key);

                    if (removed) {
                        this.setState({ isFavorite: false })
                    }
                },
                style: 'destructive'
            }
        ])
    }

    getSymbolIcon = (nameStr) => {
        if (nameStr) {
            const name = nameStr.toLowerCase().replace(' ', '-');
            return `https://c1.coinlore.com/img/25x25/${name}.png`;
        }
    }

    getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
        const markets = await Http.instance.get(url);

        this.setState({ markets });
    }

    componentDidMount() {
        const { coin } = this.props.route.params;

        this.props.navigation.setOptions({ title: coin.symbol });
        this.getMarkets(coin.id);
        this.setState({ coin }, () => {
            this.getFavorite();
        });
    }

    getSections = (coin) => {
        const section = [
            {
                title: 'Market cap',
                data: [coin.market_cap_usd]
            },
            {
                title: 'Volume 24th',
                data: [coin.volume24]
            },
            {
                title: 'Change 24h',
                data: [coin.percent_change_24h]
            },
        ];

        return section;
    }

    render() {
        const { coin, markets, isFavorite } = this.state;
        return (
            <View style={ styles.container }>
                <View style={ styles.subHeader }>
                    
                    <View style={styles.row}>
                        <Image style={ styles.iconImg } source={{ uri: this.getSymbolIcon(coin.name) }} />
                        <Text style={ styles.titleText }>{ coin.name }</Text>
                    </View>

                    <Pressable 
                        onPress={this.toggleFavorite}
                        style={[
                            styles.btnFavorite,
                            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd
                        ]}>
                        <Text style={styles.btnText}>{ isFavorite ? 'Remove favorite' : 'Add favorite'}</Text>
                    </Pressable>
                </View>

                <SectionList 
                    style={styles.section}
                    sections={this.getSections(coin)} 
                    keyExtractor={(item) => item} 
                    renderItem={({ item }) => 
                        <View style={styles.sectionItem}>
                            <Text style={styles.itemText}>{item}</Text>
                        </View>
                    }
                    renderSectionHeader={({ section }) => 
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionText}>{section.title}</Text>
                        </View>
                    }
                />

                <Text style={styles.marketsTitle}>Markets</Text>
                <FlatList
                    style={styles.list} 
                    horizontal={true}
                    data={markets}
                    renderItem={({item}) => <CoinMarketItem item={item} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    row: {
        flexDirection: 'row'
    },
    subHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        padding: 16,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.white,
        marginLeft: 8
    },
    iconImg: {
        width: 25,
        height: 25
    },
    section: {
        maxHeight: 220
    },
    list: {
        maxHeight: 100,
        paddingLeft: Platform.OS == 'ios' ? 16 : 0
    },
    sectionHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: Colors.white,
        fontSize: 14
    },
    sectionText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold'
    },
    marketsTitle: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 16,
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8
    },
    btnText: {
        color: Colors.white
    },
    btnFavoriteAdd: {
        backgroundColor: Colors.picton
    },
    btnFavoriteRemove: {
        backgroundColor: Colors.carmine
    }
});

export default CoinDetailsScreen;