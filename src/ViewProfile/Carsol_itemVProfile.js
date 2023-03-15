import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width 
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH *0.95)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={ {uri:`${item.image}`}}
        style={styles.image}
      />
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={{alignSelf:'center'}}> {item.caption}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 170,
  },
  titleText:{
     fontWeight: '600',
    fontSize: 18 ,
    alignSelf:'center'
  },
 
})

export default CarouselCardItem