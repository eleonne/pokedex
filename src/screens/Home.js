import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import getStyles from '../styles';
import { getPokemonPicture, delay } from '../libs/Utils';
import { useSelector, useDispatch } from 'react-redux'
import { appSlice, capture, resetPokeballs, throwPokeballs } from '../store/reducers/app'
import { Camera, useCameraDevice, useFrameProcessor, runAtTargetFps, useCameraFormat } from 'react-native-vision-camera'
import { useTensorflowModel } from 'react-native-fast-tflite';
import { useResizePlugin } from 'vision-camera-resize-plugin';
import { Button, Icon, IconButton } from 'react-native-paper';
import SoundPlayer from 'react-native-sound-player'
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

const BKG_IMAGE = require('../assets/imgs/pokedex_open.png')
const POKEBALL = require('../assets/imgs/pokeball.png')
const pokemonList = require('../store/pokemon.json');

export default function Home(props) {

    const theme = useSelector((state) => state.app.theme)
    const captured = useSelector((state) => state.app.captured)
    const pokeballs = useSelector((state) => state.app.pokeballs)

    const device = useCameraDevice('back')
    const camera = useRef(null)
    const dispatch = useDispatch()
    const { AppStyles } = getStyles(['AppStyles', 'colors'], theme)
    const buffer = []
    const soundEvents = {onFinishedPlaying: null}

    const objectDetection = useTensorflowModel(require('../assets/pokedex_91.tflite'))
    const model = objectDetection.state === "loaded" ? objectDetection.model : undefined
    const { resize } = useResizePlugin()

    const [detected, setDetected] = useState({ "name": "", "id": "-1" })
    const [soundPlaying, setSoundPlaying] = useState('NOTHING')
    const [mode, setMode] = useState({
        value: 'SLEEPING',
    })

    const pkList = [
        "Abra", "Aerodactyl", "Alakazam", "Arbok", "Arcanine", "Articuno", "Beedrill", "Bellsprout",
        "Blastoise", "Bulbasaur", "Butterfree", "Caterpie", "Chansey", "Charizard", "Charmander", "Charmeleon", "Clefable", "Clefairy", "Cloyster", "Cubone", "Dewgong",
        "Diglett", "Ditto", "Dodrio", "Doduo", "Dragonair", "Dragonite", "Dratini", "Drowzee", "Dugtrio", "Eevee", "Ekans", "Electabuzz",
        "Electrode", "Exeggcute", "Exeggutor", "Farfetchd", "Fearow", "Flareon", "Gastly", "Gengar", "Geodude", "Gloom",
        "Golbat", "Goldeen", "Golduck", "Golem", "Graveler", "Grimer", "Growlithe", "Gyarados", "Haunter", "Hitmonchan",
        "Hitmonlee", "Horsea", "Hypno", "Ivysaur", "Jigglypuff", "Jolteon", "Jynx", "Kabuto",
        "Kabutops", "Kadabra", "Kakuna", "Kangaskhan", "Kingler", "Koffing", "Krabby", "Lapras", "Lickitung", "Machamp",
        "Machoke", "Machop", "Magikarp", "Magmar", "Magnemite", "Magneton", "Mankey", "Marowak", "Meowth", "Metapod",
        "Mew", "Mewtwo", "Moltres", "Mrmime", "Muk", "Nidoking", "Nidoqueen", "Nidorina", "Nidorino", "Ninetales",
        "Oddish", "Omanyte", "Omastar", "Onix", "Paras", "Parasect", "Persian", "Pidgeot", "Pidgeotto", "Pidgey",
        "Pikachu", "Pinsir", "Poliwag", "Poliwhirl", "Poliwrath", "Ponyta", "Porygon", "Primeape", "Psyduck", "Raichu",
        "Rapidash", "Raticate", "Rattata", "Rhydon", "Rhyhorn", "Sandshrew", "Sandslash", "Scyther", "Seadra",
        "Seaking", "Seel", "Shellder", "Slowbro", "Slowpoke", "Snorlax", "Spearow", "Squirtle", "Starmie", "Staryu",
        "Tangela", "Tauros", "Tentacool", "Tentacruel", "Vaporeon", "Venomoth", "Venonat", "Venusaur", "Victreebel",
        "Vileplume", "Voltorb", "Vulpix", "Wartortle", "Weedle", "Weepinbell", "Weezing", "Wigglytuff", "Zapdos", "Zubat"
    ]
    const blackList = []

    // useEffect(() => {
    //     soundEvents.onFinishedPlaying = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
    //         console.log('finished playing',)
    //         if (soundPlaying == 'POKEMON') {
    //             console.log('play battle next')
    //             setSoundPlaying('BATTLE')
    //             SoundPlayer.playSoundFile("pokemon_battle", 'mp3')
    //         } else {
    //             SoundPlayer.stop()
    //         }
    //     })
    // }, [])

    useLayoutEffect(() => {
        SoundPlayer.unmount()
    }, [])

    SoundPlayer.onFinishedPlaying(({ success }) => {
        if (soundPlaying == 'POKEMON') {
            setSoundPlaying('BATTLE')
            SoundPlayer.playSoundFile("pokemon_battle", 'mp3')
        } else {
            SoundPlayer.stop()
        }
    })

    useEffect(() => {
        try {
            // play the file tone.mp3
            if (detected.id !== '-1') {
                setSoundPlaying('POKEMON')
                SoundPlayer.playSoundFile("pokemon_" + detected.id, 'mp3')
                setMode({
                    value: 'CAPTURING'
                })
            }
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }, [detected])

    useEffect(() => {
        if (pokeballs === 0)
            navigateToCapturedScreen()
    }, [pokeballs])

    const updateSharedValue = Worklets.createRunOnJS(v => {
        const threshold = 2
        console.log(v)
        if (blackList.includes(v)) return
        const isCaptured = captured.find(pkmn => {
            if (pkmn.id === pokemonList[v].id)
                return true
            return false
        })
        if (isCaptured) return

        if (buffer.length == threshold) {
            buffer.push(v)
            if (buffer[0] === buffer[1] & buffer[1] === buffer[2])
                setDetected(pokemonList[v])
            else {
                buffer.push(v)
            }
            buffer.length = 0
        } else if (buffer.length < threshold) {
            buffer.push(v)
        } else if (buffer.length > threshold) {
            buffer.length = 0
            buffer.push(v)
        }
    });

    const frameProcessor = useFrameProcessor((frame) => {
        'worklet'

        if (model == null) return

        if (mode.value != 'SCANNING') return

        runAtTargetFps(5, () => {
            // 1. Resize 4k Frame to 192x192x3 using vision-camera-resize-plugin
            const threshold = 0.95
            const resized = resize(frame, {
                scale: {
                    width: 224,
                    height: 224,
                },
                pixelFormat: 'rgb',
                dataType: 'float32',
            })
            // 2. Run model with given input buffer synchronously
            const outputs = model.runSync([resized])
            const pkmns = outputs[0]
            let potential = []
            let max = -1
            let index = -1
            for (let i = 0; i < 150; i++) {
                if (pkmns[i] >= threshold) {
                    potential.push({ 'pokemon': pkList[i], 'pred': pkmns[i] })
                    if (pkmns[i] > max) {
                        max = pkmns[i]
                        index = i
                    }
                }
            }
            if (index > -1) {
                updateSharedValue(pkList[index])
            }
        })


    }, [model, mode])

    const format = useCameraFormat(device, [
        { minFps: 1, maxFps: 16 }
    ])

    const startStopScan = () => {
        if (mode.value == 'SLEEPING') {
            setMode({
                'value': 'SCANNING'
            })
        } else if (mode.value == 'SCANNING') {
            setMode({
                'value': 'SLEEPING'
            })
        }
    }

    const throwPokeball = () => {
        if (pokeballs == 0)
            navigateToCapturedScreen()
        if (detected.id !== "-1") {
            camera.current.takeSnapshot({
                quality: 90
            }).then((file) => {
                CameraRoll.saveAsset(`file://${file.path}`, {
                    type: 'photo',
                }).then(async (uri) => {
                    const res = {
                        ...detected,
                        // picture: uri
                    }
                    setMode({ value: 'CAPTURED' })
                    SoundPlayer.playSoundFile("pokemon_capture", 'mp3')
                    await delay(4000);
                    setMode({ value: 'SCANNING' })
                    dispatch(throwPokeballs())
                    dispatch(capture(res))
                    setDetected({ "name": "", "id": "-1" })
                })
            })
        }
    }

    const navigateToCapturedScreen = () => {
        if (mode.value == 'SCANNING')
            setMode({ value: 'SLEEPING' })
        props.navigation.navigate('Captured')
    }

    return (
        <SafeAreaView style={[AppStyles.container]}>
            <View style={[AppStyles.container]}>
                <Camera
                    ref={camera}
                    device={device}
                    orientation='portrait'
                    style={StyleSheet.absoluteFill}
                    frameProcessor={frameProcessor}
                    pixelFormat="yuv"
                    fps={7}
                    format={format}
                    isActive={mode.value === 'SCANNING'}
                />
                {
                    (mode.value === 'CAPTURED') ?
                        <Image
                                // source={getPokemonPicture(detected.id)}
                                source={getPokemonPicture('pokeball')}
                                width={128}
                                style={AppStyles.captureGif}
                            /> : null
                }
                <Image source={BKG_IMAGE} style={AppStyles.banner} />
                <Text style={AppStyles.modeText}>{detected.name}</Text>
                <Button textColor={theme.colors.text} onPress={() => navigateToCapturedScreen()} style={AppStyles.captured}>Captured: {captured.length}</Button>
                <Button textColor={theme.colors.text} style={AppStyles.pokeballs}>Pokeballs: {pokeballs}</Button>
                <View style={AppStyles.spriteContainer}>
                    <Image
                        // source={getPokemonPicture(detected.id)}
                        source={getPokemonPicture(detected.id)}
                        width={128}
                        style={AppStyles.pokemonSprite}
                    />
                </View>
                {
                    (mode.value === 'SLEEPING') ?
                        <View style={AppStyles.scanButtonContainer}>
                            <Button
                                onPress={() => startStopScan()}
                                icon='pokeball'
                                style={AppStyles.scanButton}
                                mode="contained-tonal"
                                size={128}
                                containerColor={false}
                            >
                                Start/Stop Scan
                            </Button>
                        </View> : null
                }
                <View style={AppStyles.descriptionContainer}>
                    <Text style={AppStyles.descriptionText}>
                        {detected.desc}
                    </Text>
                </View>
                {
                    (mode.value === 'CAPTURING') ?
                        <IconButton
                            icon={({ size, color, direction }) => (
                                <>
                                    <Image
                                        source={POKEBALL}
                                        style={[
                                            {
                                                transform: [{ scaleX: direction === 'rtl' ? -1 : 1 }],
                                            },
                                            {
                                                resizeMode: 'cover',
                                                height: size,
                                                width: size,
                                                //   tintColor: color
                                            }
                                        ]}
                                    />
                                    <Text style={AppStyles.pokeball_txt}>{pokeballs}</Text>
                                </>
                            )}
                            style={AppStyles.pokeball}
                            onPress={() => throwPokeball()}
                            size={64}
                            disabled={mode.value !== 'CAPTURING'}
                            mode="contained-tonal"
                            containerColor={false}
                        /> : null
                }
            </View>
        </SafeAreaView>
    )

}