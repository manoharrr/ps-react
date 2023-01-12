import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loginReducer from '../features/loginSlice';
import savingReducer from '../features/savingSlice';
import transactionReducer from '../features/transactionSlice';
import creditReducer from '../features/creditSlice';
import createUserReducer from '../features/createUserSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const reducers = combineReducers({
    login: loginReducer,
    savingAcc: savingReducer,
    transaction: transactionReducer,
    creditCard: creditReducer,
    createUser: createUserReducer
});

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);