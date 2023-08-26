//import cloud functions and email templates here
import { app } from '../config/firebase'
import { getFunctions, httpsCallable } from "firebase/functions";

const UtilsEmail = {
    mergeTemplatewithCopy: function(payload){
        const {emailContent, template} = payload
        const bodyMerged = template.replace('%emailContent%', emailContent);
        return bodyMerged   
    },
    sendSingleTemplateEmail: async function(payload){
        const { body, subject, fromName, recipient} = payload
        try{
            const functions = getFunctions(app)
            sendEmail = httpsCallable(functions, 'cloudFunctionSendSingleEmailWithTemplate');
            const response  = await sendEmail({body: body, subject: subject, fromName: fromName, recipient: recipient})
            return {response: response}
        }catch(error){
            return {error: error}
        }
        
    }
}

export default UtilsEmail