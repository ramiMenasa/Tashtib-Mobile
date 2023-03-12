import { View, Text, Image } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';

export default function Product({ navigation, route }) {
    const item = route.params.item;

    return (
        <>
        <ScrollView style={{flex:1 ,}}> 
            <View >
                <Image source={{ uri: `${item.image}` }} style={{ height: 500 }}></Image>

                <View  >
                    <Text style={styles.Title}>{item.name}</Text>
                    {/* <Text style={styles.price} >{item.price}$</Text> */}
                </View>

                <View>
                    <Text style={styles.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                    </Text>
                </View>
            </View>

        </ScrollView>
            <View style={styles.conatinerPriceButton}>
                    <Text style={styles.price} >{item.price}LE</Text>
                    <TouchableOpacity  >
                        <View style={styles.button}>
                            <Text style={styles.addText}>Add to Cart</Text>
                        </View>
                    </TouchableOpacity>
                </View>

        </>
    )
}

const styles = StyleSheet.create({
    Title: {
        fontSize: 26,
        fontWeight: 'bold',
        padding: 10,
        textTransform: 'capitalize'
    },
    price: {
        padding: 12,
        fontSize: 24,
        fontWeight: 'bold',
    },
    conatinerPriceButton: {
        width:410,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        borderTopWidth:1,
        borderTopColor:'grey',
        position:'absolute',
         bottom: 0,

    },
    description: {
        padding: 12,
        color: 'dimgrey',
        textAlign: 'justify'
    },
    button: {
        flex:1,
        width: 140,
        height: 45,
        backgroundColor: 'black',
        borderRadius: 5,
        margin:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
    },
    addText:{
        color:"white",
        fontWeight:'bold',
    }
})