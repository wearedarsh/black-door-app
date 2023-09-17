import { configureStore } from '@reduxjs/toolkit'
import reducerProperty from './reducers/reducerProperty'

const store = configureStore({
    reducer: {
        propertyState : reducerProperty
    }
})

export default store