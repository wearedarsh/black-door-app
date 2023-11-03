import React from 'react'
import { View, StyleSheet } from 'react-native'
//styles
import { colors } from '../../assets/style/theme'
//components
import ComponentAppBtnSecondary from '../../components/componentAppBtnSecondary'
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader'
import ComponentAppTitle from '../../components/componentAppTitle'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'
//email stuff
import UtilsEmail from '../../utils/utilsEmail'
import ConfigEmail from '../../config/configEmail'

const ScreenAppSettings = () => {

    const testEmailStuff = async () => {
        try{
            const response = await UtilsEmail.sendSingleTemplateEmail({
                emailSubjectTemplate: 'invite', 
                fromEmailNameTemplate: 'adminStandard', 
                fromEmail: 'harley@wearedarsh.com',
                recipient: 'info@wearedarsh.com', 
                mergeFieldsArray: [{field: '%firstName%', value: 'Tom'},{field: '%inviteCode%',value: '4345'}], 
                emailContentTemplate: 'invite'
            })
            if(!response.error){
                console.log('I am sending an email')
            }else{
                console.log('I have tried to send but I cant: ' + response.error)
            }
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
            <ComponentAppBrandingHeader />
            <View style={styles.container}>
            <ComponentAppTitle title={'SETTINGS'} />
                
                <View style={styles.form}>
                    <ComponentAppBtnPrimary  label="CHANGE PASSWORD" onPress={()=>{testEmailStuff()}} />
                    <ComponentAppBtnSecondary  label="LOG OUT" iconName={'exit-outline'} />
                    
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    form: {
        paddingHorizontal: 32, 
        width:'100%',
        flex:1,
        justifyContent: 'center'
    },
    container: {
        paddingTop:Platform.OS === 'ios' ? 128 : 100,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.slate,
    }
})

export default ScreenAppSettings