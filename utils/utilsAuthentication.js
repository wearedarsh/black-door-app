export default UtilsAuthentication = {
    setAuthUser: async function(payload){
        const { dispatch, authToken, authUserData } = payload
        dispatch({type: 'authentication/set', payload: {authToken: authToken, authUserData: authUserData}})
    },
    logoutAuthUser: async function(payload){
        const { dispatch } = payload
        dispatch({type: 'authentication/logout'})
    }
}