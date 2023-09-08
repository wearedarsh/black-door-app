import React from 'react'
import { View, Platform, StyleSheet, FlatList} from 'react-native'
//style
import { colors } from '../../assets/style/theme'
//components
import ComponentAppBrandingHeader from '../../components/componentAppBrandingHeader'
import ComponentAppPropertyListing from '../../components/componentAppPropertyListing'
import ComponentAppTitle from '../../components/componentAppTitle'

const ScreenAppPropertyListing = () => {
    const data = [
        {id:0, title:'PENTHOUSE ONE', imageURL:'https://www.wearedarsh.com/blkdr/demo-property-images/01.png', location: 'NYC', size:'3,100 SQ FT', badge: false},
        {id:1, title:'PENTHOUSE TWO', imageURL:'https://www.wearedarsh.com/blkdr/demo-property-images/01.png', location: 'SF', size:'2,200 SQ FT', badge: 'PINKLES BUM'},
        {id:2, title:'PENTHOUSE THREE', imageURL:'https://www.wearedarsh.com/blkdr/demo-property-images/01.png', location: 'FLORIDA', size:'1,800 SQ FT', badge: false},
        {id:3, title:'PENTHOUSE FOUR', imageURL:'https://www.wearedarsh.com/blkdr/demo-property-images/01.png', location: 'LONDON', size:'5,000 SQ FT', badge: false}]
    return(
        <>
        <ComponentAppBrandingHeader gradient={true} />
        
            <View style={styles.container}>
            <ComponentAppTitle title={'EXCLUSIVE FOR YOU'} />
                <FlatList
                data={data}
                renderItem={({ item }) => <ComponentAppPropertyListing title={item.title} location={item.location} size={item.size} cta={'VIEW PROPERTY'} heightPercent={70} badge={item.badge}  />}
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