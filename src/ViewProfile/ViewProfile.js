import React, { useEffect, useState } from "react";
import { RefreshControl, Text, View, Image, StyleSheet, ScrollView, Button, TextInput, Pressable } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './Carsol_itemVProfile'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { logoutInitiate } from "../Store/Actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import Textarea from 'react-native-textarea';
import { DataTable } from 'react-native-paper';
import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
} from "firebase/firestore";

import { db, storage } from "../../firebase";
import * as Yup from "yup";
import { Formik } from "formik";

import { TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";


function ViewProfile({ navigation, route }) {
    const param = route.params.item;
    let rate = [
        '1',
        '2',
        '3',
        '4',
        '5',
    ]



    const [index, setIndex] = useState(0)
    const isCarousel = React.useRef(null);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 0);
    }, []);


    const { currentUser } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const [getProvidor, setGetProvidor] = useState({});
    const [getEngineer, setGetEngineer] = useState({});
    const [getCustomer, setGetCustomer] = useState({});
    const [getDBViewer, setGetDBViewer] = useState("");
    const [getViewProvidor, setGetViewProvidor] = useState({});
    const [getViewEngineer, setGetViewEngineer] = useState({});
    const [getViewUser, setGetViewUser] = useState({});
    const [getViewer, setGetViewer] = useState({});
    const [getUser, setGetUser] = useState({});
    const [getAddress, setAddress] = useState([]);
    const [getFeedback, setFeedback] = useState([]);
    const [getPortofolio, setPortofolio] = useState([]);
    const [getDB, setGetDB] = useState("");
    const [getMessage, setMessage] = useState([]);
    useEffect(() => {
        // if(currentUser)
        getData();
        getViewerData();
        //    getViewerData();
    }, [currentUser]);

    const getData = () => {
        if (param.role === "Provider") {
            const docRef = doc(db, "providers", param.id);
            onSnapshot(docRef, (snapshot) => {
                setGetProvidor({ ...snapshot.data(), id: snapshot.id });
                setGetUser({ ...snapshot.data(), id: snapshot.id });
                setAddress(snapshot.data().address);
                setFeedback(snapshot.data().feedback);
                setMessage(snapshot.data().messages);
                setPortofolio(snapshot.data().portofolio);
                setGetDB("providers");
            });
        } else if (param.role === "Engineer") {
            const docRef = doc(db, "engineers", param.id);
            onSnapshot(docRef, (snapshot) => {
                setGetEngineer({ ...snapshot.data(), id: snapshot.id });
                setGetUser({ ...snapshot.data(), id: snapshot.id });
                setAddress(snapshot.data().address);
                setFeedback(snapshot.data().feedback);
                setMessage(snapshot.data().messages);
                setPortofolio(snapshot.data().portofolio);
                setGetDB("engineers");
            });
        } else {
            const docRef = doc(db, "users", param.id);
            onSnapshot(docRef, (snapshot) => {
                setGetCustomer({ ...snapshot.data(), id: snapshot.id });
                setGetUser({ ...snapshot.data(), id: snapshot.id });
                setAddress(snapshot.data().address);
                setMessage(snapshot.data().messages);
                setGetDB("users");
            });
        }

    };
    const getViewerData = () => {
        if (currentUser) {
            const q = query(
                collection(db, "providers"),
                where("email", "==", currentUser.email)
            );

            onSnapshot(q, (snapshot) => {
                snapshot.docs.forEach((doc) => {
                    setGetViewProvidor({ ...doc.data(), id: doc.id });
                    if (getViewProvidor) {
                        setGetViewer({ ...doc.data(), id: doc.id });
                        setGetDBViewer("providers");
                    }
                    console.log(doc.id, " => ", doc.data());
                });
            });

            const q2 = query(
                collection(db, "engineers"),
                where("email", "==", currentUser.email)
            );

            onSnapshot(q2, (snapshot) => {
                snapshot.docs.forEach((doc) => {
                    setGetViewEngineer({ ...doc.data(), id: doc.id });
                    if (getViewEngineer) {
                        setGetViewer({ ...doc.data(), id: doc.id });
                        setGetDBViewer("engineers");
                    }

                    console.log(doc.id, " => ", doc.data());
                });
            });

            const q3 = query(
                collection(db, "users"),
                where("email", "==", currentUser.email)
            );

            onSnapshot(q3, (snapshot) => {
                snapshot.docs.forEach((doc) => {
                    setGetViewUser({ ...doc.data(), id: doc.id });
                    if (getViewUser) {
                        setGetViewer({ ...doc.data(), id: doc.id });
                        setGetDBViewer("users");
                    }
                    console.log(doc.id, " => ", doc.data());
                });
            });
        } else console.log("You Should Signin First");
    };




    const calcRating = () => {
        getUser.rate = 0;
        let count = 0;

        getFeedback?.forEach((element, index) => {
            getUser.rate += parseInt(element.rating);
            count = index;
        });
        getUser.rate = getUser.rate / (count + 1);

        return getUser.rate;
    };
    const drawStar = (rateing) => {
        let rate = parseInt(rateing);
        var star = [];
        for (let index = 0; index < rate; index++) {
            star.push(<Ionicons key={index} name={'star'} size={15} color={'black'} />);
        }
        for (let index = 0; index < 5 - rate; index++) {
            star.push(<Ionicons key={index + 10} name={'star-outline'} size={15} color={'black'} />);
        }

        return star;
    };




    const handleButtonComment = (value) => {
        if(value.rating==='')
        {
          getUser.feedback.push({
            comment: value.comment,
            rating: 0,
          })
        }else{
        getUser.feedback.push({
          comment: value.comment,
          rating: value.rating,
        });}
    

        const docRef = doc(db, getDB, getUser.id);

        updateDoc(docRef, {
            feedback: getUser.feedback,
            rate: getUser.rate,
        })
            .then(() => {
                console.log("done feedback");
            })
            .catch((error) => {
                console.log("ERROR" + error);
            });
    };
    const sendMessage = (value) => {
        const docRef2 = doc(db, getDB, getUser.id);
        getUser.messages.push({
            text: value.message,
            name: getViewer.name,
            uid: getViewer.id,
            role: getViewer.role,
        });
        updateDoc(docRef2, {
            messages: getUser.messages,
        })
            .then(() => {
                alert("Message Sent Succussfully");
                console.log("message sent successfully");
            })
            .catch((error) => {
                console.log("Error" + error);
            });
            
        value.message = ""
    };

    const exists = (wish) => {
        if (getViewer?.wishlist?.filter((item) => item.id === wish.id).length > 0) {
            return true;
        }

        return false;
    };

    const addToWhishList = (item) => {
        const added = getViewer?.wishlist.find(({ id }) => id === item.id);
        console.log(added);
        if (!added) {
            getViewer?.wishlist.push({
                name: item.name,
                id: item.id,
                role: item.role,
            });

            const docRef = doc(db, getDBViewer, getViewer?.id);
            updateDoc(docRef, {
                wishlist: getViewer?.wishlist,
            })
                .then(() => {
                    toast("added to wishlist");
                })
                .catch((error) => {
                    console.log("ERROR" + error);
                });
        } else {
            toast("Item is already added!");
        }
    };
    const removeFromWhishList = (item) => {
        const index = getViewer?.wishlist.findIndex(({ id }) => id === item.id);
        getViewer?.wishlist.splice(index, 1);

        const docRef = doc(db, getDBViewer, getViewer?.id);

        updateDoc(docRef, {
            wishlist: getViewer?.wishlist,
        })
            .then(() => {
                toast("item removed from wishlist");
            })
            .catch((error) => {
                console.log("ERROR" + error);
            });
    };






    return (
        <>
            <ScrollView style={styles.Container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                <View style={styles.Header}>
                    {getUser.image === "" ? (<Image source={require('../../assets/defualtImages/def.jpg')} style={styles.ImageHeader}></Image>)
                        : (<Image source={{ uri: (`${getUser.image}`) }} style={styles.ImageHeader}></Image>)
                    }
                    <View>
                        <Text style={styles.TextHeader}>HI ,</Text>
                        <Text style={styles.TextHeader}>{getUser.name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                                {drawStar(calcRating())}
                            </View>
                        </View>
                        {currentUser ? (
                            exists(getUser) ? (
                                <TouchableOpacity style={styles.buttonwish} onPress={() => removeFromWhishList(getUser)}>
                                    <Text style={styles.text}>Added </Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.buttonwish} onPress={() => addToWhishList(getUser)}>
                                    <Text style={styles.text}>Add to wishlist </Text>
                                </TouchableOpacity>
                            )
                        ) : (
                            <TouchableOpacity style={styles.buttonwish} onPress={() => navigation.navigate('login')}>
                                <Text style={styles.text}>Add to wishlist </Text>
                            </TouchableOpacity>

                        )}


                    </View>
                </View>
                <View style={{ marginTop: 20, }}>
                    <Carousel
                        layout="tinder"
                        layoutCardOffset={9}
                        ref={isCarousel}
                        data={getPortofolio}
                        renderItem={CarouselCardItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        inactiveSlideShift={0}
                        onSnapToItem={(index) => setIndex(index)}
                        useScrollView={true}
                    />
                    <Pagination
                        dotsLength={getPortofolio.length}
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
                        <Ionicons style={{ paddingTop: 3 }} name={'ios-information-circle'} size={23} color={'black'} />
                        <Text style={styles.TextLink} > Info </Text>
                    </CollapseHeader>
                    <CollapseBody style={{}}>
                        <View style={{ marginLeft: 20 }}>
                            <View style={{}}>
                                <Text style={styles.TextInfo}>Name :
                                    <Text style={styles.TextData} > {getUser.name}</Text>
                                </Text>
                            </View>
                            <View style={{}}>
                                <Text style={styles.TextInfo}>Email :
                                    <Text style={styles.TextData} > {getUser.email} </Text>
                                </Text>
                            </View>
                            <View style={{}}>
                                <Text style={styles.TextInfo}>Phone :
                                    <Text style={styles.TextData} > {getUser.phone} </Text>
                                </Text>
                            </View>
                            <View style={{}}>
                                <Text style={styles.TextInfo}>Address :
                                    <Text style={styles.TextData} > {getUser.street} </Text>
                                </Text>
                                {getAddress?.map((address, index) => {
                                    return (
                                        <>
                                            <View key={address.street}>
                                                <Text>
                                                    {address.city}
                                                </Text>
                                                <Text>{address.street}</Text>
                                            </View>
                                        </>
                                    );
                                })}

                            </View>

                            <View style={{}}>
                                {getUser.role === "customer" ? null :
                                    (
                                        <View style={{}}>
                                            <Text style={styles.TextInfo}>Role :
                                                <Text style={styles.TextData} > {getUser.role} </Text>
                                            </Text>

                                            <Text style={styles.TextInfo}>Specialization :
                                                <Text style={styles.TextData} >{getUser.spetialization}</Text>
                                            </Text>

                                            <Text style={styles.TextInfo}>Experience :
                                                <Text style={styles.TextData} >{getUser.experience}</Text>
                                            </Text>
                                        </View>)}

                            </View>

                        </View>
                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>

                    </CollapseBody>
                </Collapse>

                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <FontAwesome5 style={{ paddingTop: 3 }} name={'comment-alt'} size={25} color={'black'} />

                        <Text style={styles.TextLink} > Messages </Text>
                    </CollapseHeader>
                    <CollapseBody>
                        <Formik
                            initialValues={{ message: "", }}
                            validationSchema={Yup.object({
                                message: Yup.string()
                                    .required('Required')
                                ,
                            })}
                            onSubmit={values => {
                                sendMessage(values)
                                values.message = ""
                                onRefresh()
                            }}
                        // onsubmit 
                        >
                            {props => (

                                <View style={styles.text_container}>
                                    <Textarea
                                        containerStyle={styles.textareaContainer}
                                        style={styles.textarea}
                                        // onChangeText={this.onChange}
                                        // defaultValue={this.state.text}
                                        // maxLength={120}
                                        placeholder={'Send message'}
                                        placeholderTextColor={'#c7c7c7'}
                                        onChangeText={props.handleChange('message')}
                                    />
                                    {props.touched.message && props.errors.message ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.message} </Text>) : null}


                                    {currentUser ? (<Pressable style={styles.button} onPress={props.handleSubmit}>
                                        <Text style={styles.text}>Send</Text>
                                    </Pressable>
                                    ) : (
                                        <Pressable style={styles.button} onPress={() => { navigation.navigate('login') }}>
                                            <Text style={styles.text}>Send</Text>
                                        </Pressable>

                                    )}
                                </View>


                            )}


                        </Formik>


                        {/* <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text> */}

                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <FontAwesome5 style={{ paddingTop: 3 }} name={'comment'} size={25} color={'black'} />
                        <Text style={styles.TextLink} > Feedbacks </Text>
                    </CollapseHeader>
                    <CollapseBody>
                        {getFeedback.length === 0 ? (<Text style={styles.noYet}>No Feedback to show!</Text>) :
                            (getFeedback?.map((feedback, index) => (
                                <View style={{ backgroundColor: 'lightsteelblue', margin: 6, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                                    key={index}
                                >
                                    <Text style={{ padding: 15, fontSize: 17, fontWeight: 'bold' }}>
                                        {feedback.comment}
                                    </Text>
                                    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'flex-end' }} className="m-4 d-flex justify-content-end w-25">
                                        {drawStar(feedback.rating)}
                                    </View>
                                </View>
                            )))}


                        <Formik
                            initialValues={{ comment: "", rating: "" }}
                            validationSchema={Yup.object({
                                comment: Yup.string()
                                    .required('Required')
                                ,
                            })}
                            onSubmit={values => {
                                handleButtonComment(values),
                                values.comment = "",
                                values.rating = "",
                                onRefresh()
                            }}
                        // onsubmit 
                        >
                            {props => (

                                <View style={styles.text_container}>
                                    <Textarea
                                        containerStyle={styles.textareaContainer}
                                        style={styles.textarea}
                                        // onChangeText={this.onChange}
                                        // defaultValue={this.state.text}
                                        // maxLength={120}
                                        placeholder={'Leave Feedback'}
                                        placeholderTextColor={'#c7c7c7'}
                                        onChangeText={props.handleChange('comment')}
                                    />
                                    {props.touched.comment && props.errors.comment ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.comment} </Text>) : null}

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 340, marginTop: 15 }}>
                                        <SelectDropdown buttonStyle={{ width: 100 }} defaultButtonText={`rating`}
                                            onSelect={props.handleChange('rating')}
                                            data={rate}
                                        />
                                        <View style={{ flexDirection: 'row', marginTop: 4 }}>
                                            {drawStar(props.values.rating)}
                                        </View>
                                    </View>

                                    {props.touched.rating && props.errors.rating ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.rating} </Text>) : null}

                                    {currentUser ? (<TouchableOpacity style={styles.button} tybe={'reset'} onPress={props.handleSubmit}>
                                        <Text style={styles.text}>Comment</Text>
                                    </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('login') }}>
                                            <Text style={styles.text}>Comment</Text>
                                        </TouchableOpacity>

                                    )}
                                </View>


                            )}


                        </Formik>
                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>

                    </CollapseBody>
                </Collapse>



            </ScrollView>

        </>
    );
}

export default ViewProfile

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
        width: 123,
        height: 123,
        borderRadius: 75,
        marginRight: 15,

    },
    TextHeader: {
        fontSize: 22,
        fontWeight: 'bold',

    },
    TextLink: {
        fontSize: 22, fontWeight: '400',
    },
    TextInfo: {
        fontSize: 18, fontWeight: '500', paddingVertical: 5,
    },
    TextData: {
        fontSize: 17, fontWeight: '400'
    }
    , HeaderCollapse: {
        flexDirection: 'row', backgroundColor: 'white', paddingVertical: 10, borderColor: 'white', borderWidth: 1, paddingStart: 5,
    }
    , userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'sienna',
        padding: 10,

    },
    userMessage: {
        fontSize: 17,
        paddingLeft: 10,
        paddingBottom: 7,
    },
    chatBubble: {
        margin: 6,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: 'white',
        flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2, alignItems: 'center'
    },
    noYet: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    input: {
        width: 350,
        height: 45,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        width: 150,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    }, containerForm: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',


    },

    table_head: {
        fontWeight: 'bold',
    },
    container: {
        paddingHorizontal: 30,
    },
    btn1: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        // paddingVertical: 8,
        // paddingHorizontal: 22,
        borderRadius: 9,
        // elevation: 3,
        backgroundColor: '#009688',
        // margin:5,
    },
    btn2: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        // paddingVertical: 8,
        // paddingHorizontal: 22,
        borderRadius: 9,
        // elevation: 3,
        backgroundColor: 'black',
        // margin:5,
    },
    text: {
        fontSize: 15,
        lineHeight: 21,
        // fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    text_container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textareaContainer: {
        height: 100,
        padding: 5,
        backgroundColor: 'white',
        color: 'black',
        borderWidth: 1,

    },
    textarea: {
        textAlignVertical: 'top',
        height: 100,
        fontSize: 18,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#009688',
        marginTop: 15,
    },
    buttonwish: {
        alignItems: 'center',
        width: 140,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 4,
        backgroundColor: 'black',
        marginTop: 7,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})
