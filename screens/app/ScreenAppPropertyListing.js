import React, { useEffect, useState } from 'react'
import { View, Platform, StyleSheet, FlatList} from 'react-native'
//style
import { colors } from '../../assets/style/theme'
//components
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader'
import ComponentAppPropertyListing from '../../components/componentAppPropertyListing'
import ComponentAppTitle from '../../components/componentAppTitle'
//utils
import UtilsFirestore from '../../utils/utilsFirestore'
import UtilsHelpers from '../../utils/utilsHelpers'
//firestore
import { app } from '../../config/configFirebase'
import { getFirestore, query, collection, where, orderBy, onSnapshot } from 'firebase/firestore'

const ScreenAppPropertyListing = ({navigation}) => {
    //local state
    const [feedback, setFeedback] = useState(false)
    const [loading, setLoading] = useState(false)
    const [properties, setProperties] = useState(null)
    //firestore
    const db = getFirestore(app)
    //effect
    useEffect(() => {
        setLoading(true)
        //specify query for firestore
        const collectionRef = collection(db, 'properties')
        const whereDeleteRef = where("isDeleted", "==", false)
        const whereActiveRef = where("isActive", "==", true)
        const orderByRef = orderBy("listedAt", "desc")
        const queryRef = query(collectionRef, whereDeleteRef, whereActiveRef, orderByRef)
        //create realtime updates listener for properties
        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            //map data to array for flatlist
            const propertiesArray = snapshot.docs.map((doc) => {
                return {
                    data:doc.data(),
                    id: doc.id,
                }
            })
          //update local state with new array
          setProperties(propertiesArray)
        })
        setLoading(false)
        //callback function on unmount
        return () => {
            unsubscribe()
        }
    },[])

    const convertDateForDisplay = async(date) => {
        const dateObject = await UtilsFirestore.convertFirestoreTimestampToDateObject({date})
        const dateToDisplay = await UtilsHelpers.localeDateString({dateObject, locale:'en-UK', options: {day: "numeric", month:"short", hour: "numeric", minute: "numeric"}})
        return dateToDisplay
    }

    return(
        <>
        <ComponentAppBrandingHeader gradient={true} />
            <View style={styles.container}>
            <ComponentAppTitle title={'EXCLUSIVE FOR YOU'} />
                <FlatList
                data={properties}
                renderItem={({ item }) => {
                    const dateObject = item.data.listedAt.toDate()
                    const dateToDisplay = dateObject.toLocaleDateString('en-UK', {year:"numeric",  month:"short", day: 'numeric'})
                    return (
                        <ComponentAppPropertyListing image={item.data.heroImageURL} title={item.data.title.toUpperCase()} location={item.data.location.toUpperCase()} size={item.data.squareFeet.toUpperCase()} cta={'VIEW PROPERTY'} heightPercent={70} badge={item.data.isSold ? 'SOLD' : item.data.isUnderOffer ? 'UNDER OFFER' : 'LISTED: ' + dateToDisplay} marginBottom={16} onPress={() => {navigation.navigate('ScreenAppPropertyView', {key: item.id})}}  />
                    )
                    }
                }
                keyExtractor={(item) => item.id}
                showVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:Platform.OS === 'ios' ? 128 : 100,
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

export default ScreenAppPropertyListing