import 'react-native-gesture-handler';

import React from 'react'
import { Provider } from 'react-redux'
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from "./src/App";
import { PersistGate } from 'redux-persist/integration/react'
import StoreConfig from './src/store/storeConfig'
import TrackPlayer from 'react-native-track-player';

const sc = StoreConfig()

const Redux = () => (
    <Provider store={sc.store}>
        <PersistGate loading={null} persistor={sc.persistor}>
            <App />
        </PersistGate>
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
TrackPlayer.registerPlaybackService(() => require('./src/service'));