import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Platform } from 'react-native'
//styles
import { colors } from '../../assets/style/theme'
//components
import ComponentAppCarousel from '../../components/componentAppCarousel'
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader'
import ComponentAppIconCopy from '../../components/componentAppIconCopy'
import ComponentAppBtnPrimary from '../../components/componentAppBtnPrimary'
import ComponentAppBtnSecondary from '../../components/componentAppBtnSecondary'
import ComponentAppSpacerView from '../../components/componentAppSpacerView'
//firebase
import { app } from '../../config/configFirebase'
import { getFirestore, onSnapshot, getDoc, collection, doc } from 'firebase/firestore'

const ScreenAppPropertyView = ({ navigation, route }) => {
    //local variables
    const { key } = route.params
    
    //local state
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState(false)
    const [carouselData, setCarouselData] = useState([])
    const [propertyData, setPropertyData] = useState({
        groups:[],
        heroImageURL: '',
        isActive: false,
        isDeleted: false,
        isSold: false,
        isUnderOffer: false,
        bedrooms: '',
        bathrooms: '',
        listedAt: '',
        location: '',
        price: '',
        shortDescription: '',
        longDescription: '',
        squareFeet: '',
        title: ''
    })
    //firestore
    const db = getFirestore(app)
    const collectionRef = collection(db, 'properties')
    const docRef = doc(collectionRef, key)

    //fetch data
    useEffect(() => {
        //real time updates
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            const propertyData = snapshot.data()
            const imageData = propertyData.heroImageURL
            const imageArray = [imageData]
            //set property data
            setPropertyData(propertyData)
            setCarouselData(imageArray)
        })
        //unsubscribe on unmount
        return () => {
            unsubscribe()
        }
    }, [])

    return(
        <>
        <ComponentAppBrandingHeader gradient={false} backButton={true} onPress={()=>{navigation.navigate('ScreenAppPropertyListing')}} />
        <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.container}>
                { <ComponentAppCarousel data={carouselData} heightPercent={50} /> }
                <View style={styles.content}>
                    <Text style={{...styles.header}}>{propertyData.title.toUpperCase()}</Text>
                    <Text style={{...styles.copy}}>{propertyData.shortDescription.toUpperCase()}</Text>
                    <ComponentAppIconCopy iconName={'map-outline'} copy={propertyData.location.toUpperCase()} marginTop={32} />
                    <ComponentAppIconCopy iconName={'resize-outline'} copy={propertyData.squareFeet.toUpperCase()} />
                    <ComponentAppIconCopy iconName={'pricetag-outline'} copy={propertyData.price.toUpperCase()} />
                    <View style={styles.row}>
                        <ComponentAppIconCopy iconName={'water-outline'} copy={propertyData.bathrooms.toUpperCase() + ' BATHS'} />
                        <ComponentAppIconCopy iconName={'bed-outline'} copy={propertyData.bedrooms.toUpperCase() + ' BEDS'} />
                    </View>
                    <ComponentAppSpacerView height={16} />
                    <ComponentAppBtnPrimary label={'REQUEST VIEWING'} onPress={()=>{}} marginTop={16} />
                    <ComponentAppBtnSecondary icon={false} label={'DOWNLOAD FLOORPLAN'} />
                    <ComponentAppSpacerView height={32} />
                    <Text style={{...styles.copy}}>{propertyData.longDescription.toUpperCase()}</Text>
                </View>
            </ScrollView>

        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.slate,

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    wrapper: {
        backgroundColor: colors.slate,
        marginTop: Platform.OS === 'ios' ? 98 : 70
    },
    content: {
        padding: 32
    },
    header: { 
        color: colors.white,
        fontFamily: 'primary-medium',
        fontSize:21,
        textAlign: 'center',
        marginBottom: 32, 
        letterSpacing: 5,
        paddingLeft: Platform.OS === 'ios' ? 5 : 0
    },
    copy: {
        color: colors.white,
        fontFamily:'primary-regular',
        textAlign: 'center',
        fontSize:12,
        letterSpacing: 3,
        paddingLeft: Platform.OS === 'ios' ? 3 : 0
    }

})

export default ScreenAppPropertyView