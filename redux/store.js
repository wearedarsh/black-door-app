import { configureStore } from '@reduxjs/toolkit'
import reducerProperty from './reducers/reducerProperty'
import reducerGroups from './reducers/reducerGroups'

const store = configureStore({
    reducer: {
        propertyState : reducerProperty,
        groupsState: reducerGroups
    }   
})

export default store