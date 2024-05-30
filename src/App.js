import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import configs from './app.config'
import {useSelector, useDispatch} from 'react-redux'
import Home from './screens/Home'
import PermissionsPage from './screens/PermissionsPage'
import Captured from './screens/Captured'
import Send from './screens/Send'
import getStyles from './styles'
import { Camera } from 'react-native-vision-camera'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Stack = createNativeStackNavigator();
export default function App() { 

    const theme = useSelector((state) => state.app.theme)
    const cameraPermission = Camera.getCameraPermissionStatus()
    const showPermissionsPage = cameraPermission !== 'granted'

    const {AppStyles} = getStyles(['AppStyles'], theme)
    return (
        <NavigationContainer>
            <GestureHandlerRootView style={AppStyles.container}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        statusBarStyle: 'dark',
                        animationTypeForReplace: 'push',
                    }}
                    initialRouteName={showPermissionsPage ? 'PermissionsPage' : 'Home'}>
                    <Stack.Screen name="PermissionsPage" component={PermissionsPage}/>
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="Captured" component={Captured}/>
                    <Stack.Screen name="Send" component={Send}/>
                </Stack.Navigator>
            </GestureHandlerRootView>
        </NavigationContainer>
    )
}