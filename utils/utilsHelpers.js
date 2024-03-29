import { Dimensions } from 'react-native'

const UtilsHelpers = {
    showAndHideFeedback: function(payload){
        const { dispatch, message, icon, visible, duration = 4000 } = payload
        dispatch({ type: 'feedback/show', payload: {message: message, icon: icon, visible: visible} });
        clearTimeout(timer);
        let timer = UtilsHelpers.startTimer(duration, ()=>{
            dispatch({ type: 'feedback/hide', payload: {message: message, icon: icon, visible: visible} });
        })
    },
    startTimer: function(duration, callback){
        setTimeout(callback, duration)
    },
    nextFormFocus: function(payload){
        return () => {
            const { ref } = payload
            ref.current.focus()
        }
    },
    clearFormValuesObject: function(payload){
        const { object, setFunction } = payload
        let keys = Object.keys(object)
        let updatedObject = {};
        keys.forEach((value) => {
            if(typeof object[value] === 'string'){
                updatedObject[value] = ""
            }else if(typeof object[value] === 'object'){
                updatedObject[value] = {}
            }else if(typeof object[value] === 'boolean'){
                updatedObject[value] = false
            }else if(Array.isArray(object[value])){
                updatedObject[value] = []
            }
        }) 
        setFunction({
            ...object,
            ...updatedObject
        }); 
    },
    scrollToTop: function(payload){
        const { ref, animated } = payload
        ref.current.scrollTo({x:0, y:0, animated: animated}); 
    },
    localeDateString: function(payload){
        const { locale = 'en-UK', dateObject, options = {}} = payload
        const localeDateString = dateObject.toLocaleString(locale, options)
        return localeDateString
    },
    stringToDate: function(payload){
        const { day, month, year } = payload
        console.log(JSON.stringify(payload))
        const convertedDate = new Date(year, month - 1, day)

        return convertedDate
    },
    isValidDate: function(payload){
        const { date } = payload
        return date instanceof Date && !isNaN(date)
    },
    splitDateObjectToStrings: function(payload){
        const { date } = payload
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return { day, month, year }
    }
}

export default UtilsHelpers