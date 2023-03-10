import React, { useState } from "react";
import { Text, View, Image, StyleSheet, ScrollView, Button } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../Home/Carsol-item'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import {Separator} from "native-base"

function Profile({ navigation }) {

    const image = [
        { img: require('../../assets/defualtImages/hero-1.jpg') },
        { img: require('../../assets/defualtImages/hero-2.jpg') }
    ]
    const [index, setIndex] = useState(0)
    const isCarousel = React.useRef(null);


    return (
        <>
            <ScrollView style={styles.Container}>
                <View style={styles.Header}>
                    <Image source={require('../../assets/defualtImages/def.jpg')} style={styles.ImageHeader}></Image>
                    <View>
                        <Text style={styles.TextHeader}>HI , Rami</Text>
                        <View style={{ flexDirection: 'row', marginTop: 4 }}>
                            <Ionicons name={'star'} size={15} color={'black'} />
                            <Ionicons name={'star'} size={15} color={'black'} />
                            <Ionicons name={'star'} size={15} color={'black'} />
                            <Ionicons name={'star'} size={15} color={'black'} />
                            <Ionicons name={'star-outline'} size={15} color={'black'} />

                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20, }}>
                    <Carousel
                        layout="tinder"
                        layoutCardOffset={9}
                        ref={isCarousel}
                        data={image}
                        renderItem={CarouselCardItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        inactiveSlideShift={0}
                        onSnapToItem={(index) => setIndex(index)}
                        useScrollView={true}
                    />
                    <Pagination
                        dotsLength={image.length}
                        activeDotIndex={index}
                        carouselRef={isCarousel}
                        dotStyle={{
                            zIndex: 1,
                            width: 10,
                            height: 10,
                            borderRadius: 15,
                            backgroundColor: 'rgba(0, 0, 0,1)'
                        }}
                        inactiveDotOpacity={0.8}
                        inactiveDotScale={0.5}
                        tappableDots={true}
                    />

                </View>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <Ionicons style={{ paddingTop: 3 }} name={'ios-information-circle'} size={25} color={'black'} />
                        <Text style={styles.TextLink} > Info </Text>
                    </CollapseHeader>
                    <CollapseBody style={{}}>
                        <View style={{ marginLeft: 20 }}>
                            <View style={{}}>
                                <Text style={styles.TextInfo}>Name :
                                    <Text style={styles.TextData} > Ramy </Text>
                                </Text>
                            </View>
                            <View style={{}}>
                                <Text style={styles.TextInfo}>Email :
                                    <Text style={styles.TextData} > ramimenasa@gmail.com </Text>
                                </Text>
                            </View>
                            <View style={{}}>
                                <Text style={styles.TextInfo}>Phone :
                                    <Text style={styles.TextData} > 01212592969 </Text>
                                </Text>
                            </View>
                            <View style={{}}>
                                <Text style={styles.TextInfo}>Address :
                                    <Text style={styles.TextData} > Minya - Taha Hassen </Text>
                                </Text>
                            </View>
                            <View style={{}}>
                                <Text style={styles.TextInfo}>Role :
                                    <Text style={styles.TextData} > Engineer </Text>
                                </Text>
                            </View>
                            <View style={{}}>
                                <Text style={styles.TextInfo}>Spectialization :
                                    <Text style={styles.TextData} > btngan </Text>
                                </Text>

                            </View>
                            <View style={{}}>
                                <Text style={styles.TextInfo}>Experience :
                                    <Text style={styles.TextData} > gamila gdn </Text>
                                </Text>

                            </View>

                        </View>
                        <Text style={{alignSelf:'center'}}>__________________________________________________</Text>

                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <Text style={styles.TextLink} > Cart </Text>
                    </CollapseHeader>
                    <CollapseBody>

                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <Text style={styles.TextLink} > WishList </Text>
                    </CollapseHeader>
                    <CollapseBody>

                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <Text style={styles.TextLink} > Messages </Text>
                    </CollapseHeader>
                    <CollapseBody>

                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <Text style={styles.TextLink} > Feedbacks </Text>
                    </CollapseHeader>
                    <CollapseBody>

                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <Text style={styles.TextLink} > Add Portfolio </Text>
                    </CollapseHeader>
                    <CollapseBody>

                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <Text style={styles.TextLink} > Add Address </Text>
                    </CollapseHeader>
                    <CollapseBody>

                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <Text style={styles.TextLink} > Edit Details </Text>
                    </CollapseHeader>
                    <CollapseBody>

                    </CollapseBody>
                </Collapse>




            </ScrollView>

        </>
    );
}

export default Profile

const styles = StyleSheet.create({
    Container: {
        backgroundColor: 'white'
    },
    Header: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',

    },
    ImageHeader: {
        width: 125,
        height: 125,
        borderRadius: 75,
        marginRight: 15,

    },
    TextHeader: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    TextLink: {
        fontSize: 22, fontWeight: '500',
    },
    TextInfo: {
        fontSize: 18, fontWeight: '500', paddingVertical: 5,
    },
    TextData: {
        fontSize: 17, fontWeight: '400'
    }
    ,HeaderCollapse:{
        flexDirection: 'row',backgroundColor:'white',paddingVertical:10, borderColor:'white',borderWidth:1,paddingStart:5,
    }


})
