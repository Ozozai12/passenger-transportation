import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, userReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'your/action/type',
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});

export const persistor = persistStore(store);
