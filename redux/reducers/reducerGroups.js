import { createReducer } from "@reduxjs/toolkit"
import { setGroups } from '../actions/actionGroups'

const initialState = {
    groups: {}
}

const reducerGroups = createReducer(initialState, (builder) => {
    builder
        .addCase(setGroups, (state, action) => {
            const { data } = action.payload
            return {
                ...state,
                groups: data
            }
        })
       

})

export default reducerGroups