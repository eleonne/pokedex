import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, SafeAreaView, FlatList } from 'react-native'
import { Button, Icon, IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { resetPokeballs, resetCaptured } from '../store/reducers/app'
import getStyles from '../styles';
import { getPokemonPicture } from '../libs/Utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SoundPlayer from 'react-native-sound-player'

export default function Captured(props) {
    const dispatch = useDispatch()
    const theme = useSelector((state) => state.app.theme)
    const captured = useSelector((state) => state.app.captured)
    const pokeballs = useSelector((state) => state.app.pokeballs)
    const { AppStyles } = getStyles(['AppStyles', 'colors'], theme)
    const [pokeballsClickCount, setPokeballsClickCount] = useState(0)
    const [capturedClickCount, setCapturedClickCount] = useState(0)
    const [sendClickCount, setSendClickCount] = useState(0)

    const pokeballClick = () => {
        if (pokeballsClickCount > 10) {
            setPokeballsClickCount(0)
            dispatch(resetPokeballs())
        } else {
            setPokeballsClickCount(pokeballsClickCount + 1)
        }
    }

    const capturedClick = () => {
        if (capturedClickCount > 10) {
            setCapturedClickCount(0)
            dispatch(resetCaptured())
        } else {
            setCapturedClickCount(capturedClickCount + 1)
        }
    }

    const sendClick = () => {
        if (sendClickCount > 10) {
            setSendClickCount(0)
            props.navigation.navigate('Send')
        } else {
            setSendClickCount(sendClickCount + 1)
        }
    }

    const rowClick = (pokemon) => {
        try {
            // play the file tone.mp3
            console.log(pokemon)
            if (pokemon.id !== '-1') {
                SoundPlayer.playSoundFile("pokemon_" + pokemon.id, 'mp3')
            }
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }

    return (
        <SafeAreaView style={[AppStyles.container]}>
            <View style={[AppStyles.container]}>
                <Button
                    icon=''
                    mode='contained-tonal'
                    onPress={() => props.navigation.navigate('Home')}
                    >
                    Back
                </Button>
                <Text style={AppStyles.descriptionText}>You still have {pokeballs} Pokeballs</Text>
                <View style={AppStyles.row}>
                    <Button
                        icon='pokeball'
                        onPress={() => pokeballClick()}>
                        Reset Pokeballs
                    </Button>
                    <Button
                        icon='pokeball'
                        onPress={() => capturedClick()}>
                        Reset Captured
                    </Button>
                </View>
                <View style={AppStyles.row}>
                    
                </View>
                <Text style={AppStyles.rowTitle}>You've Captured {captured.length} Pokemons</Text>
                <FlatList
                    data={captured}
                    renderItem={({ item }) => <TouchableOpacity onPress={() => rowClick(item)} style={AppStyles.rowContainer}>
                            <Image
                                source={getPokemonPicture(item.id)}
                                width={128}
                                style={AppStyles.rowImage}
                                />
                            <View style={AppStyles.rowTextContainer}>
                                <Text style={AppStyles.rowTitle}>
                                    {item.id} - {item.name}
                                </Text>
                                <Text style={AppStyles.descriptionText}> 
                                    {item.desc}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
                <Button
                    icon='send'
                    mode='contained-tonal'
                    onPress={() => sendClick()}
                    >
                    Send
                </Button>
                

            </View>
        </SafeAreaView>
    )
}