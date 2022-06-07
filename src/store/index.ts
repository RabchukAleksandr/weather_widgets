import {configureStore, combineReducers} from "@reduxjs/toolkit";
import weatherReducer from './weather'

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {TypedUseSelectorHook, useDispatch,useSelector} from "react-redux";

const reducers = combineReducers({
    weatherReducer
});



const persistConfig = {
    key: 'root',
    storage,
    version:0
};

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const persistedReducer:any = persistReducer(persistConfig,reducers)

const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})



export default store