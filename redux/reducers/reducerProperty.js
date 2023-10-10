import { createReducer } from '@reduxjs/toolkit'
import { setProperties,removeProperty, updateProperty, addProperty } from '../actions/actionProperty'

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
    .addCase(addProperty, (state, action) => {
        const { data, key } = action.payload
        state.properties = {
            ...state.properties,
            [key]: { ...state.properties[key], ...data }
          }
    })
})

export default reducerProperty