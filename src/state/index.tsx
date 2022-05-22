import { configureStore,createAction } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'

import application from './application/reducer'

const PERSISTED_KEYS: string[] = ['user', 'transactions']

const store = configureStore({
    reducer: {
        application,
    }
})

export const updateVersion = createAction<void>('global/updateVersion')

store.dispatch(updateVersion())

export default store;
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
