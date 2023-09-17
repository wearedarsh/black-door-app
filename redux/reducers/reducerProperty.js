import { createReducer } from '@reduxjs/toolkit'
import { setProperties,removeProperty, updateProperty } from '../actions/actionProperty'

const initialState = {
    properties: {}
}

const reducerProperty = createReducer(initialState, (builder) => {
    builder
    .addCase(setProperties, (state, action) => {
        const { data } = action.payload
        state.properties = data
    })
    .addCase(removeProperty, (state, action) => {
        console.log('remove property')
    })
    .addCase(updateProperty, (state, action) => {
        console.log('update property')
    })

})

export default reducerProperty