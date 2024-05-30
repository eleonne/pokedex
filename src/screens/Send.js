import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, SafeAreaView, FlatList } from 'react-native'
import { Button, Icon, IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import getStyles from '../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'

const base_url = 'https://walrus-app-7bjo6.ondigitalocean.app'

export default function Send(props) {
    const theme = useSelector((state) => state.app.theme)
    const captured = useSelector((state) => state.app.captured)
    const { AppStyles, SendStyles } = getStyles(['AppStyles', 'SendStyles'], theme)
    const [players, setPlayers] = useState([])

    useEffect(() => {
        axios.get(base_url + '/api/players-list').then((response) => {
            setPlayers(response.data)
        })
    }, [])
    console.log(captured)

    const sendPokemon = (playerName) => {
        const asString = JSON.stringify(captured)
        axios.post(base_url + '/api/send', {
            'list': asString,
            'name': playerName
        }).then((response) => {
            props.navigation.navigate('Captured')
        })
    }

    return (
        <SafeAreaView style={[AppStyles.container]}>
            <View style={[AppStyles.container]}>
                <Text>You are Sending {captured.length} Pokemons</Text>
                <FlatList
                    data={players}
                    renderItem={({ item }) => <TouchableOpacity onPress={() => sendPokemon(item.name)} style={AppStyles.rowContainer}>
                            <Image
                                source={{uri: base_url + '/img/' + item.picture}}
                                width={128}
                                height={128}
                                style={AppStyles.rowImage}
                                />
                            <View style={AppStyles.rowTextContainer}>
                                <Text style={AppStyles.rowTitle}>
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
                <Button
                    icon=''
                    mode='contained-tonal'
                    onPress={() => props.navigation.navigate('Captured')}
                    >
                    Back
                </Button>
            </View>
        </SafeAreaView>
    )
}