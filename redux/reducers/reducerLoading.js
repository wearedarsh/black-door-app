import { createReducer } from "@reduxjs/toolkit"
import { setLoading } from '../actions/actionLoading'

const initialState = {
    loading: false
}

const reducerLoading = createReducer(initialState, (builder) => {
    builder
        .addCase(setLoading, (state, action) => {
            const { loading } = action.payload
            state.loading = loading
        })
       
})

export default reducerLoading