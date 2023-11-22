import { configureStore } from '@reduxjs/toolkit'
import reducerProperty from './reducers/reducerProperty'
import reducerGroups from './reducers/reducerGroups'
import reducerUserAuth from './reducers/reducerUserAuth'
import reducerLoading from './reducers/reducerLoading'

const store = configureStore({
    reducer: {
        propertyState : reducerProperty,
        groupsState: reducerGroups,
        userAuthState: reducerUserAuth,
        loadingState: reducerLoading
    }   
})

export default store