import { createReducer } from '@reduxjs/toolkit'
import { setUserAuth, removeUserAuth } from '../actions/actionUserAuth'

const initialState = {
    authToken: '',
    authDoc: {},
    authIsAdmin: null
}

const reducerUserAuth = createReducer(initialState, (builder) => {
    builder
    .addCase(setUserAuth, (state, action) => {
        const { authToken, authDoc, authIsAdmin } = action.payload
        state.authToken = authToken
        state.authDoc = authDoc
        state.authIsAdmin = authIsAdmin
    })
    .addCase(removeUserAuth, (state, action) => {
        state.authToken = ''
        state.authDoc = {}
        state.authIsAdmin = null
    })
})

export default reducerUserAuth