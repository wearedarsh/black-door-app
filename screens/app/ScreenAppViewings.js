import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
//style
import { colors } from '../../assets/style/theme'
//components
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader'
import ComponentAppViewingListing from '../../components/componentAppViewingListing'


const ScreenAppViewings = () => {

    const data = [
        {id:0, title:'PENTHOUSE ONE', date: '24-07-2023', time: '13:30', address:'2 Holdiford Road, Milford, Stafford, ST17 0UX'},
        {id:1, title:'PENTHOUSE TWO', date: '28-07-2023', time: '16:30', address:'2 Holdiford Road, Milford, Stafford, ST17 0UX'}
    ]
    return(
        <>
            <ComponentAppBrandingHeader />
            <View style={styles.container}>
                <FlatList
                data={data}
                renderItem={({ item }) => <ComponentAppViewingListing title={item.title.toUpperCase()} date={item.date.toUpperCase()} time={item.time.toUpperCase()} address={item.address.toUpperCase()} />}
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
        paddingTop:128,
        paddingHorizontal: 32,
        flex:1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.slate
    },
})

export default ScreenAppViewings