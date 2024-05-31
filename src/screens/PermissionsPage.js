import React, { useCallback, useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import { Camera } from 'react-native-vision-camera'
import { Button } from 'react-native-paper';

const BANNER_IMAGE = require('../assets/imgs/pokedex_closed.jpg')
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function PermissionsPage(props) {
    const [cameraPermissionStatus, setCameraPermissionStatus] = useState('not-determined')

    const requestCameraPermission = useCallback(async () => {
        console.log('Requesting camera permission...')
        const permission = await Camera.requestCameraPermission()
        console.log(`Camera permission status: ${permission}`)

        if (permission === 'denied') await Linking.openSettings()
        setCameraPermissionStatus(permission)
    }, [])

    useEffect(() => {
        if (cameraPermissionStatus === 'granted' ) props.navigation.replace('Home')
    }, [cameraPermissionStatus])

    return (
        <View style={styles.container}>
            <Image source={BANNER_IMAGE} style={styles.banner} />
            <Text style={styles.welcome}>Welcome to{'\n'}The Pokedex App.</Text>
            <View style={styles.permissionsContainer}>
                {
                    cameraPermissionStatus !== 'granted' 
                    ?   <Text style={styles.permissionText}>
                            The Pokedex needs <Text style={styles.bold}>Camera permission</Text>.{' '}
                            <Text style={styles.hyperlink} onPress={requestCameraPermission}>
                                Grant
                            </Text>
                        </Text>
                    :   <Button
                            icon=''
                            mode='contained-tonal'
                            onPress={() => props.navigation.navigate('Home')}
                            >
                            Start Capturing
                        </Button>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 38,
        fontWeight: 'bold',
        maxWidth: '80%',
        top: deviceHeight / 2
    },
    banner: {
        resizeMode: 'cover',
        // flex: 1,
        position: 'absolute',
        // ...StyleSheet.absoluteFillObject,
        // opacity: 0.4,
        // bottom: 10,
        // left: 10,
        height: deviceHeight,
        width: deviceWidth,
    },
    container: {
        flex: 1,
        // height: deviceHeight,
        width: deviceWidth,
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    permissionsContainer: {
        marginTop: 4,
        top: deviceHeight / 2
    },
    permissionText: {
        fontSize: 17,
    },
    hyperlink: {
        color: '#007aff',
        fontWeight: 'bold',
    },
    bold: {
        fontWeight: 'bold',
    },
})