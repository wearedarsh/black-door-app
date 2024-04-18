import React, { useState } from 'react'
import {View, TouchableOpacity, Text, StyleSheet, ImageBackground, Platform } from 'react-native'
//components
import ComponentLogo from '../../components/componentLogo'
import ComponentHeroTitle from '../../components/componentHeroTitle'
import ComponentBackButton from '../../components/componentBackButton'
import ComponentOnboardInput from '../../components/componentOnboardInput'
import ComponentOnboardSubmitBtn from '../../components/componentOnboardSubmitBtn'
//style
import { colors } from '../../assets/style/theme'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { setLoading } from '../../redux/actions/actionLoading'


const ScreenLoginForgottenPassword = ({navigation}) => {
    //redux
    const dispatch = useDispatch()
    const loading = useSelector(state => state.loadingState.loading)
    //local state
    const [feedback, setFeedback] = useState(false)
    const [formValues, setFormValues] = useState({
        emailAddress: ''
    })
    //update form fields
    const updateFormFields = (value, key) => {
        setFormValues({
            ...formValues,
            [key]: value
        })
    }
    //form submit
    const formSubmit = () => {
        
    }

    return (
        <View style={styles.container}>
            {loading && <Modal visible={true} transparent={true}><View style={styles.modalView}><ComponentAppLoadingIndicator /></View></Modal>}
            {feedback && <Modal visible={true} transparent={true}><View style={styles.modalView}><ComponentAppFeedback title={feedback.title} icon={feedback.icon} /></View></Modal>}
            <ImageBackground source={require('../../assets/img/onboard-bgr.png')} style={styles.backgroundImage}>
                <View style={{flex:2}}>
                    <View style={{marginTop:64}}>
                        <ComponentBackButton onPress={() => {navigation.navigate('ScreenLoginEnterDetails')}} />
                        <ComponentLogo />
                    </View>
                </View>
                <View style={{flex:8, justifyContent: 'flex-start'}}>
                    <ComponentHeroTitle title="FORGOTTEN PASSWORD" style={{marginVertical:48}} />
                    <View style={styles.form}>
                        <ComponentOnboardInput label="EMAIL ADDRESS" value={formValues.emailAddress} onChangeText={newValue => updateFormFields(newValue, 'emailAddress')} />
                        <Text style={styles.label}>ENTER YOUR EMAIL ADDRESS AND WE'LL SEND YOU AN EMAIL TO RESET YOUR PASSWORD</Text>
                    </View>
                </View>
                <View style={{height:80, backgroundColor:colors.primary, width:'100%', flexDirection: 'row'}}>
                    <ComponentOnboardSubmitBtn label="RESET PASSWORD" onPress={()=>{}} />
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {        
        flex: 1,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 16,
        fontFamily: 'primary-regular',
        letterSpacing: 3,
        paddingLeft: Platform.OS === 'ios' ? 3 : 0
    },
    forgotten: {
        width:'100%',
        height: 48,
        marginTop: 32
    },
    forgottenText: {
        textAlign: 'center',
        color: colors.white,
        fontFamily: 'primary-regular',
        fontSize: 16,
        letterSpacing: 3,
        paddingLeft: Platform.OS === 'ios' ? 3 : 0
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    authBtn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    authBtnText:{
        color: colors.white,
        fontSize: 20,
        fontFamily: 'primary-regular',
        letterSpacing: 3,
        paddingLeft: 3
    },
    form:{
        width:'100%',
        paddingHorizontal: 32
    },

    
})

export default ScreenLoginForgottenPassword