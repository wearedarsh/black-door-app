const UtilsValidation = {
    isEmail: function(payload){
        const { email } = payload
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailPattern.test(email)){
            return true
        }else{
            return false
        }
    },
    isUKMobile: function(payload){
        const { mobile } = payload
        const ukPhoneNumberPattern = /^(\+44|0)(\d{10,10})$/
        if(ukPhoneNumberPattern.test(mobile)){
            return true
        }else{
            return false
        }
    },
    isValidPassword: function(payload){
        const { password } = payload
         
        if (password.trim().length < 8) {
            return {error: 'Please enter a password that is 8 characters or more'}
        }

        if (/\s/g.test(password.trim())) {
            return {error: 'Password cannot contain spaces'}
        }
        
          // Check for at least one uppercase letter
          // if (!/[A-Z]/.test(password)) {
          //   return false;
          // }
        
          // Check for at least one lowercase letter
          // if (!/[a-z]/.test(password)) {
          //   return false;
          // }
        
          // Check for at least one digit
          // if (!/\d/.test(password)) {
          //   return false;
          // }
        
          // Check for at least one special character
          // if (!/[!@#$%&*]/.test(password)) {
          //   return false;
          // }
          return {isValid: true}
    },
    inputsPopulated: function(payload){
        const { data } = payload
        let populated = true
        let formValues = Object.values(data)
        formValues.forEach((value) => {
            if(typeof value === "string" && value.trim().length === 0){
                populated = false
            }
        })
        return populated
    },
    doMatch: function(payload){
        const { inputA, inputB } = payload
        if(inputA.trim() === inputB.trim()){
            return true
        }else{
            return false
        }
    },
    showHideFeedback: function(payload){
        const { duration = 2000, setterFunc, data } = payload
        setterFunc(data)
        const timer = setInterval(clearTimer, duration)
        function clearTimer(){
            clearInterval(timer)
            setterFunc(false)
        }
    }
}

export default UtilsValidation