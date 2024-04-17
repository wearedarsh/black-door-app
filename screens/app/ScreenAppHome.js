import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
//style
import { colors } from '../../assets/style/theme'
//components
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader';
import ComponentAppHomeWelcome from '../../components/componentAppHomeWelcome';
//firebase
import { app } from '../../config/configFirebase'
import { getFirestore, onSnapshot, getDoc, collection, query, orderBy, limit } from 'firebase/firestore'
//redux
import { useSelector } from 'react-redux'


const ScreenAppHome = ({navigation}) => {
    //local state
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState(false)
    const [propertyData, setPropertyData] = useState({
        id: '',
        heroImageURL: 'hero',
        location: 'location',
        price: 'price',
        title: 'title',
        squareFeet: 'square feet'
    })
    //redux state
    const userAuthDoc = useSelector(state => state.userAuthState.authDoc)
    const firstName = userAuthDoc.firstName
    console.log(firstName)
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
                let propertyDataTemp = {}
                snapshot.forEach((doc) => {
                    const data = doc.data()
                    propertyDataTemp = {
                        id: doc.id,
                        heroImageURL: data.heroImageURL,
                        location: data.location,
                        price: data.price,
                        title: data.title,
                        squareFeet: data.squareFeet
                    }
                })
                setPropertyData(propertyDataTemp)
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
            {propertyData.id && (<ComponentAppHomeWelcome onPress={() => {navigation.navigate('StackAppProperty', {screen: 'ScreenAppPropertyListings', params : {key: propertyData.id}})}} image={propertyData.heroImageURL} location={propertyData['location'].toUpperCase()} cta={'VIEW LISTINGS'} size={propertyData['squareFeet'].toUpperCase()} value={propertyData['price'].toUpperCase()} title={`WELCOME, ${firstName.toUpperCase()}`} />)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: { 
        color: colors.white
    }
})

export default ScreenAppHome