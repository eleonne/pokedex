import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';
import appConfig from './app.config';

const window = Dimensions.get('window')
const screenWidth = window.width;
const screenHeight = window.height
var theme = null

const _styles = {
    'colors': () => theme.colors,
    'AppStyles': () => StyleSheet.create({
        container: {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : 0,
            backgroundColor: theme.colors.background
        },
        spriteContainer: {
            marginTop: Platform.OS === 'ios' ? 0 : -29,
            // backgroundColor: theme.colors.backgroundTransparent,
            top: 0,
            left: 0,
            width: '100%',
            height: 100,
            paddingRight: Math.round(window.width * 15 / 100),
        },
        pokemonSprite: {
            width: 128,
            resizeMode: 'cover',
            height: 128,
            // backgroundColor: theme.colors.background
        },
        pokemonName: {
            justifyContent: 'center',
            textAlign: 'right',
            width: '100%',
            top: 0,
            right: 0,
            color: theme.colors.text,
            fontWeight: 'bold',
            fontSize: 22,
            // position: 'absolute',
            marginTop: 10,
            marginRight: 10,
        },
        pokeball: {
            bottom: 0,
            right:0,
            position: 'absolute',
            marginRight: 10,
            marginBottom: 10,
        },
        pokeball_txt: {
            color: theme.colors.text
        },
        captured: {
            top: 0,
            right: 0,
            marginTop: 5,
            marginRight: 5,
            position: 'absolute',
            color: theme.colors.text,
            fontSize: 15
        },
        pokeballs: {
            top: 30,
            right: 0,
            marginTop: 5,
            marginRight: 5,
            position: 'absolute',
            color: theme.colors.text,
            fontSize: 15
        },
        scanButton: {
            width: '60%',
            fontSize: 55
        },
        scanButtonContainer: {
            paddingStart: screenWidth * 20 / 100,
            top: (screenHeight / 2) + 20,
        },
        banner: {
            resizeMode: 'stretch',
            position: 'absolute',
            height: screenHeight,
            width: screenWidth,
        },
        modeText: {
            width: '85%',
            textAlign: 'center',
            fontSize: 25,
            fontWeight: 'bold',
            color: theme.colors.warning,
            top: (screenHeight / 2) - (screenWidth / 2),
        },
        descriptionContainer: {
            width: '80%',
            height: (screenHeight / 2) - (screenWidth / 2) - 40,
            bottom: 0,
            left: 0,
            position: 'absolute',
            backgroundColor: theme.colors.backgroundTransparent,
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20,
            marginRight: Math.round(screenWidth * 15 / 100),
            padding: 10,
            textAlign: 'justify'
        },
        descriptionText: {
            color: theme.colors.text,
            fontSize: 18,
        },
        rowContainer: {
            flex: 1,
            flexDirection: 'row',
            borderBottomColor: theme.colors.primary,
            borderBottomWidth: StyleSheet.hairlineWidth
        },
        rowImage: {
            flex: 0.3,
        },
        rowTextContainer: {
            flex: 0.7,
        },
        rowTitle: {
            fontSize: 22,
            fontWeight: 'bold',
            color: theme.colors.highlight
        },
        row: { 
            // flex: 1,
            flexDirection: 'row'
        },
        sendBtn: {
            flex: 1
        },
        captureGif: {
            position: 'absolute',
            top: (screenHeight / 2) - Math.round(screenWidth * 35 / 100),
            width: Math.round(screenWidth * 85 / 100),
            height: Math.round(screenWidth * 75 / 100),
            resizeMode: 'cover',
            // height: 128,
        }
    }),
    'SendStyles': () => StyleSheet.create({
        
    })
}

const getStyles = (styles, _theme) => {
    theme = _theme
    response = {}
    for (i in styles)
        response[styles[i]] = _styles[styles[i]]()
    return response
}
export default getStyles