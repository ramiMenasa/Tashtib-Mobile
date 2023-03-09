import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Dimensions, ImageBackground, Text, Image, View, StyleSheet, TextInput , Platform } from "react-native";
import { db } from "../../firebase";
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './Carsol-item'
import SelectDropdown from 'react-native-select-dropdown'



import {
    collection,
    onSnapshot,
    query,
    limit,
    getDocs,
    where,
    updateDoc,
    doc
} from "firebase/firestore";
import { SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from "react-native";



function Home({ navigation }) {
    const image = [
        { img: require('./hero-1.jpg') },
        { img: require('./hero-2.jpg') }
    ]
    const countries = ["providers", "Engineers", "Catigories",]

    const [index, setIndex] = useState(0)

    const isCarousel = React.useRef(null);
    const [dataEng, setDataEng] = useState([]);
    const [dataCont, setDataCont] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataEngFilter, setDataEngFilter] = useState([]);
    const [dataContFilter, setDataContFilter] = useState([]);
    const [dataProFilter, setDataProFilter] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [keyword, setKeyword] = useState("providers");
    const [operation, setOperation] = useState("");
    const dataEngColl = query(collection(db, "engineers"), limit(4));
    const dataContColl = query(collection(db, `providers`), limit(4));

    const loadDataFilter = async () => {
        if (keyword === "engineers") {
            const dataRefEng = collection(db, "engineers");
            onSnapshot(dataRefEng, (snapshot) => {
                setDataEngFilter(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        name: doc.data().name,
                        role: doc.data().role,
                        phone: doc.data().phone,
                        rate: doc.data().rate,
                        spetialization: doc.data().spetialization,
                        image: doc.data().image
                    }))
                );
            });

        } else if (keyword === "providers") {
            const dataRefCont = collection(db, "providers");
            onSnapshot(dataRefCont, (snapshot) => {
                setDataContFilter(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        name: doc.data().name,
                        role: doc.data().role,
                        phone: doc.data().phone,
                        rate: doc.data().rate,
                        spetialization: doc.data().spetialization,
                        image: doc.data().image
                    }))
                );
            });
        } else {
            const dataRefPro = collection(db, "categories");
            onSnapshot(dataRefPro, (snapshot) => {
                setDataProFilter(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        name: doc.data().name,
                        title: doc.data().title,
                        products: doc.data().products,
                        spetialization: doc.data().spetialization,
                        image: doc.data().image
                    }))
                );
            });

        }

    };
    const loadDataEng = async () => {
        onSnapshot(dataEngColl, (snapshot) => {
            setDataEng(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                    role: doc.data().role,
                    phone: doc.data().phone,
                    rate: doc.data().rate,
                    spetialization: doc.data().spetialization,
                    image: doc.data().image
                }))
            );
        });
    };

    const loadDataCont = async () => {
        onSnapshot(dataContColl, (snapshot) => {
            setDataCont(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name,
                    role: doc.data().role,
                    phone: doc.data().phone,
                    rate: doc.data().rate,
                    spetialization: doc.data().spetialization,
                    image: doc.data().image
                }))
            );
        });
    };
    const loadDataCategory = async () => {
        const collectionRef = collection(db, "categories");

        const q = query(collectionRef);

        onSnapshot(q, (snapshot) => {
            setDataCategory(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    title: doc.data().title,
                    products: doc.data().products,
                    spetialization: doc.data().spetialization,
                    image: doc.data().image
                    // name: doc.data().name
                }))
            );
        });
    };
    const handleFilter = (e) => {
        let value = e.target.value;
        // setSortValue(value);
        setOperation("filter");
        setKeyword(value);
    };

    const handleRest = async () => {
        setOperation("");
        setSearchValue("");
        setSortValue("");
        loadDataEng();
        loadDataCont();
        // loadDataProd();
        loadDataCategory();
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        loadDataEng();
        loadDataCont();
        // loadDataProd();
        loadDataCategory();
    };

    useEffect(() => {
        loadDataEng();
        loadDataCont();
        loadDataCategory();
        loadDataFilter();

    }, [keyword]);

    return (
        <>
            <SafeAreaView style={styles.droidSafeArea}>
                <ScrollView>

                    <View>
                        <ScrollView horizontal={true}>

                            {dataCategory.map((item) => {
                                return (
                                    <View style={{ padding: 20 }} key={item.id}>
                                        {item.image? (<Image source={{ uri: `${item.image}` }} style={styles.cateImage}></Image>)
                                            : (<Image source={require(`./defprod.jpg`)}  style={styles.cateImage}></Image>)}
                                        <Text style={{ alignSelf: 'center', fontWeight: "bold" }}
                                        // onPress={() => { navigation.navigate("Movie", { id: movie.id }) }}
                                        > {item.title}</Text>


                                    </View>

                                )
                            })}
                        </ScrollView>
                        <View style={{ position: 'relative' }}>
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
                                    // bottom:45,
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
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', paddingStart: 20, marginBottom: 15 }}>Filter by category </Text>

                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.writeTasksWrapper}>

                        <View style={{ alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }} >
                                <SelectDropdown
                                    style={styles.input}
                                    data={countries}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                />
                                <TextInput style={styles.input} placeholder={"search"}></TextInput>

                            </View>

                            <TouchableOpacity  >
                                <View style={styles.button}>
                                    <Text style={{ color: 'white' }}>Reset</Text>
                                </View>

                            </TouchableOpacity>

                        </View>
                    </KeyboardAvoidingView>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', paddingStart: 20, marginVertical: 15 }}>Popular Engineers </Text>


                    <View style={styles.section} >
                        {dataEng.map((item, index) => {
                            return (
                                <View key={index} style={styles.ViewCard} >
                                    {item.image === "" ? (<Image source={require(`./def.jpg`)} style={{ width: 150, height: 150 }}></Image>)
                                        : (<Image source={{ uri: `${item.image}` }} style={{ width: 150, height: 150 }}></Image>)}

                                    <Text >{item.name}</Text>
                                    <Text >{item.role}</Text>
                                </View>

                            );
                        })}
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', paddingStart: 20, marginVertical: 15 }}>Popular Providers </Text>

                    <View style={styles.section} >
                        {dataCont.map((item, index) => {
                            return (
                                <View key={index} style={styles.ViewCard} >
                                    {item.image === "" ? (<Image source={require(`./def.jpg`)} style={{ width: 150, height: 150 }}></Image>)
                                        : (<Image source={{ uri: `${item.image}` }} style={{ width: 150, height: 150 }}></Image>)}
                                    <Text >{item.name}</Text>
                                    <Text >{item.role}</Text>
                                </View>

                            );
                        })}
                    </View>


                </ScrollView>
            </SafeAreaView>
        </>

    );

}

const styles = StyleSheet.create({

    cateImage: {
        height: 80,
        width: 80,
        borderRadius: 10,
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 1 : 0
    },
    input: {
        paddingVertical: 8,
        marginHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 173,
        paddingHorizontal: 15,
    },
    writeTasksWrapper: {
        position: 'relative',
        // bottom: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    button: {
        marginTop: 12,
        width: 120,
        height: 40,
        backgroundColor: 'black',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    section: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    ViewCard: {
        marginHorizontal: 15,
        padding: 8,
    }
});


export default Home;