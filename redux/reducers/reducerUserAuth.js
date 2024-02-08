import { createReducer } from '@reduxjs/toolkit'
import { setUserAuth, removeUserAuth, updateUserAuthDoc, updateUserAuthDocFields } from '../actions/actionUserAuth'

const initialState = {
    authUserKey: '',
    authId: '',
    authToken: '',
    authDoc: {},
    authIsAdmin: null,
    authExpoToken: ''
}

const reducerUserAuth = createReducer(initialState, (builder) => {
    builder
    .addCase(setUserAuth, (state, action) => {
        const { authToken, authDoc, authIsAdmin, authId, authUserKey, authExpoToken } = action.payload
        state.authUserKey = authUserKey
        state.authId = authId
        state.authToken = authToken
        state.authDoc = authDoc
        state.authIsAdmin = authIsAdmin
        state.authExpoToken = authExpoToken
    })
    .addCase(removeUserAuth, (state, action) => {
        state.authUserKey = ''
        state.authId = ''
        state.authToken = ''
        state.authDoc = {}
        state.authIsAdmin = null
        state.authExpoToken = ''
    })
    .addCase(updateUserAuthDoc, (state, action) => {
        const { authDoc } = action.payload
        return {
            ...state,
            authDoc
        }
    })
    .addCase(updateUserAuthDocFields, (state, action) => {
        const { fields } = action.payload
        return{
            ...state,
            authDoc : {
                ...state.authDoc,
                ...data
            }
        }
    })
})

export default reducerUserAuth