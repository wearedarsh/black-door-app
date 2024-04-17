import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
//style
import { colors } from '../../assets/style/theme'
//components
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader';
import ComponentAppPropertyListing from '../../components/componentAppPropertyListing';
//firebase
import { app } from '../../config/configFirebase'
import { getFirestore, onSnapshot, getDoc, collection, query, orderBy, limit } from 'firebase/firestore'


const ScreenAppHome = ({navigation}) => {
    //local state
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState(false)
    const [propertyData, setPropertyData] = useState([{
        heroImageURL: 'hero',
        location: 'location',
        price: 'price',
        title: 'title',
    }])
    //firestore
    const db = getFirestore(app)
    const collectionRef = collection(db, 'properties')
    const orderByRef = orderBy('listedAt', 'desc')
    const limitRef = limit(1)
    const queryRef = query(collectionRef, orderByRef, limitRef)
    //fetch data
    useEffect(() => {
        //real time updates
        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            if (!snapshot.empty) {
                const propertyData = []
                snapshot.forEach((doc) => {
                    propertyData.push({ id: doc.id, ...doc.data() })
                    
                })
                setPropertyData(propertyData)
            } else {
                console.log('No documents found in the collection.')
            }
        });
        //unsubscribe on unmount
        return () => {
            unsubscribe()
        }
    }, [])

    return(
        <View style={styles.container}>
            <ComponentAppBrandingHeader gradient={true} gradientHeight={300} gradientTo={'rgba(35, 31, 32, 0)'} />
            <ComponentAppPropertyListing onPress={() => {navigation.navigate('ScreenAppPropertyView', {key: propertyData[0].id})}} image={propertyData[0].heroImageURL} location={propertyData[0].location.toUpperCase()} cta={'VIEW'} size={propertyData[0].squareFeet.toUpperCase()} value={propertyData[0].price.toUpperCase()} title={propertyData[0].title.toUpperCase()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.slate,
    },
    text: { 
        color: colors.white
    }
})

export default ScreenAppHome