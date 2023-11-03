//import cloud functions and email templates here
import { app } from '../config/configFirebase'
import { getFunctions, httpsCallable } from "firebase/functions"
import { systemEmailHTMLTemplate } from '../email/emailTemplates'
import { systemEmailSubjectTemplates } from '../email/emailSubjectTemplates'
import { systemEmailContentTemplates } from '../email/emailContentTemplates'
import { systemEmailFromNameTemplates } from '../email/emailFromNameTemplates'
import ConfigEmail from '../config/configEmail'

const UtilsEmail = {
    mergeTemplateWithContent: function(payload){
        const {emailContentTemplate, HTMLTemplate} = payload
        const mergedHTMLTemplate = HTMLTemplate.replace('%emailContent%', emailContentTemplate);
        return mergedHTMLTemplate   
    },
    mergeFieldsWithContent: function(payload){
        const { mergeFieldsArray, emailContentTemplate } = payload
        let contentTemplate = systemEmailContentTemplates[emailContentTemplate]
        for(let mergeField of mergeFieldsArray){
            contentTemplate = contentTemplate.replace(mergeField.field, mergeField.value)
        }
       return contentTemplate
    },
    sendSingleTemplateEmail: async function(payload){
        console.log(JSON.stringify(payload))
        //destruct payload mergefields array requires [{field: '%firstName%', value: 'string'}]
        const { emailSubjectTemplate, fromEmailNameTemplate, fromEmail, recipient, emailContentTemplate, mergeFieldsArray, configEmail =  ConfigEmail} = payload
        //merge content with variables
        const mergedContentTemplate = await UtilsEmail.mergeFieldsWithContent({mergeFieldsArray, emailContentTemplate})
        //merge template with content
        const mergedHTMLTemplate = await UtilsEmail.mergeTemplateWithContent({emailContentTemplate: mergedContentTemplate, HTMLTemplate: systemEmailHTMLTemplate})
        try{
            const functions = getFunctions(app)
            sendEmail = httpsCallable(functions, 'sendSingleEmailWithTemplate');
            const response  = await sendEmail({
                body: mergedHTMLTemplate, 
                subject: systemEmailSubjectTemplates[emailSubjectTemplate], 
                fromName: systemEmailFromNameTemplates[fromEmailNameTemplate], 
                fromEmail,
                recipient, 
                config: configEmail
            })

            if(!response.error){
                console.log('I succeeded Tommy boy')
                return { success: true }
            }else{
                return { error: response.error }
            }
            
        }catch(error){
            return {error: error}
        }
    }
}

export default UtilsEmail