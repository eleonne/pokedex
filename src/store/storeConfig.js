import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import appReducer from './reducers/app'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

export const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel1,
};

const reducers = combineReducers({
    app: appReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
    let store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }),
    })
    let persistor = persistStore(store)
    return {store, persistor}
}