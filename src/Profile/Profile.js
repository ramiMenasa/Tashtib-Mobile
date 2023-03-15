import React, { useEffect, useState } from "react";
import { RefreshControl, Text, View, Image, StyleSheet, ScrollView, Button, TextInput, Pressable } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './Carsol_itemProfile'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation"
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { json, Link, useHistory } from "react-router-dom";
import { logoutInitiate } from "../Store/Actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
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

import Input from "../Login/input";
import { TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";


function Profile(props) {
    let spetialization = [
        'Civil Engineer',
        'Interior Designer',
        'Electrical Engineer',
        'Mechanical Engineer',
        'Mechaelectrical Engineer',
        'Telecom Engineer',
        'Energy Engineer',
        'Archetect',
        'Painting Contractor',
        'Electrical Contractor',
        'Floor Contractor',
        'Plumbing Contractor',
        'Carpentry contractor',
        'Blacksmith contractor',
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
    // return currentUser ? props.navigation.push("Profile") : props.navigation.push("login");


    const dispatch = useDispatch();
    const reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+).*$/);
    const regPass = new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    );
    const [getProvidor, setGetProvidor] = useState({});
    const [getEngineer, setGetEngineer] = useState({});
    const [getCustomer, setGetCustomer] = useState({});
    const [getUser, setGetUser] = useState({});
    const [getAddress, setAddress] = useState([]);
    const [getFeedback, setFeedback] = useState([]);
    const [getPortofolio, setPortofolio] = useState([]);
    const [getDB, setGetDB] = useState("");
    const [getWishList, setWhishList] = useState([]);
    const [getcart, setCart] = useState([]);
    const [getMessage, setMessage] = useState([]);
    // const history = useHistory();

    useEffect(() => {
        if (currentUser) getData();
        else 
        props.navigation.push("login");
    }, [currentUser, props]);

    const getData = () => {
        const q = query(
            collection(db, "providers"),
            where("email", "==", currentUser.email)
        );

        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                setGetProvidor({ ...doc.data(), id: doc.id });
                if (getProvidor) {
                    setGetUser({ ...doc.data(), id: doc.id });
                    setAddress(doc.data().address);
                    setFeedback(doc.data().feedback);
                    setMessage(doc.data().messages);
                    setPortofolio(doc.data().portofolio);
                    setWhishList(doc.data().wishlist);
                    setCart(doc.data().cart);
                    setGetDB("providers");
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
                setGetEngineer({ ...doc.data(), id: doc.id });
                if (getEngineer) {
                    setGetUser({ ...doc.data(), id: doc.id });
                    setAddress(doc.data().address);
                    setFeedback(doc.data().feedback);
                    setMessage(doc.data().messages);
                    setPortofolio(doc.data().portofolio);
                    setWhishList(doc.data().wishlist);
                    setCart(doc.data().cart);
                    setGetDB("engineers");
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
                setGetCustomer({ ...doc.data(), id: doc.id });
                if (getCustomer) {
                    setGetUser({ ...doc.data(), id: doc.id });
                    setAddress(doc.data().address);
                    setFeedback(doc.data().feedback);
                    setMessage(doc.data().messages);
                    setPortofolio(doc.data().portofolio);
                    setWhishList(doc.data().wishlist);
                    setCart(doc.data().cart);
                    setGetDB("users");
                }
                console.log(doc.id, " => ", doc.data());
            });
        });


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

    const handleAuth = () => {
        if (currentUser) {
            dispatch(logoutInitiate());
            // props.navigation.navigate("Home")
        }
    };

    const submitData = (e) => {
        e.preventDefault();
    };


    // const handleButtonComment = () => {
    //     getUser.feedback.push({
    //         comment: userData.comment,
    //         rating: userData.rating,
    //     });

    //     const docRef = doc(db, getDB, getUser.id);

    //     updateDoc(docRef, {
    //         feedback: getUser.feedback,
    //         rate: getUser.rate,
    //     })
    //         .then(() => {
    //             console.log("done feedback");
    //         })
    //         .catch((error) => {
    //             console.log("ERROR" + error);
    //         });

    //     userData.comment = "";
    //     userData.rating = "";
    // };
    const handleButtonAddress = (value) => {
        getUser.address.push({ city: value.city, street: value.street });

        const docRef = doc(db, getDB, getUser.id);

        updateDoc(docRef, {
            address: getUser.address,
        })
            .then(() => {
                console.log("done address");
            })
            .catch((error) => {
                console.log("ERROR" + error);
            });
    };
    const handleButtonEdit = (value) => {
        const docRef = doc(db, getDB, getUser.id);

        updateDoc(docRef, {
            name: value.name,
            username: value.username,
            experience: value.experience,
            email: value.email,
            spetialization: value.spetialization,
        })
            .then(() => {
                console.log("done edit ");
            })
            .catch((error) => {
                console.log("ERROR" + error);
            });

    };
    const handleButtonChangePassword = (value) => {
        const docRef = doc(db, getDB, getUser.id);

        updateDoc(docRef, {
            password: value.newPassword,
        })
            .then(() => {
                console.log("done change Password ");
            })
            .catch((error) => {
                console.log("ERROR" + error);
            });
    };
    const removeFromCart = (index) => {
        getUser.cart.splice(index, 1);

        const docRef = doc(db, getDB, getUser.id);

        updateDoc(docRef, {
            cart: getUser.cart,
        })
            .then(() => {
                console.log("remove cart");
            })
            .catch((error) => {
                console.log("ERROR" + error);
            });
    }
    const removeFromWhishList = (index) => {
        getUser.wishlist.splice(index, 1);

        const docRef = doc(db, getDB, getUser.id);

        updateDoc(docRef, {
            wishlist: getUser.wishlist,
        })
            .then(() => {
                console.log("remove wishlist");
            })
            .catch((error) => {
                console.log("ERROR" + error);
            });
    }
    const removeFromMessage = (index) => {
        getUser.messages.splice(index, 1);

        const docRef = doc(db, getDB, getUser.id);

        updateDoc(docRef, {
            messages: getUser.messages,
        })
            .then(() => {
                console.log("remove Message");
            })
            .catch((error) => {
                console.log("ERROR" + error);
            });
    }
    // alert(JSON.stringify( getUser))
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
                        <Text style={styles.TextHeader}>HI , {getUser.name}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 4 }}>
                            {drawStar(calcRating())}
                        </View>
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
                        <Ionicons style={{ paddingTop: 3 }} name={'cart'} size={25} color={'black'} />
                        <Text style={styles.TextLink} > Cart </Text>
                    </CollapseHeader>

                    <CollapseBody>
                        {getcart.length === 0 ? (<Text style={styles.noYet}>No products to show!</Text>) : (
                            <View style={styles.container}>
                                <DataTable>
                                    <DataTable.Header >
                                        <DataTable.Title><Text>No</Text></DataTable.Title>
                                        <DataTable.Title><Text>Name</Text></DataTable.Title>
                                        <DataTable.Title><Text>Price</Text></DataTable.Title>
                                        <DataTable.Title><Text>Quantity</Text></DataTable.Title>
                                        <DataTable.Title><Text>Action</Text></DataTable.Title>

                                    </DataTable.Header>
                                    {getcart?.map((item, index) => (
                                        <DataTable.Row key={index}>
                                            <DataTable.Cell><Text>{index + 1}</Text></DataTable.Cell>
                                            <DataTable.Cell><Text>{item.name}</Text></DataTable.Cell>
                                            <DataTable.Cell><Text>{item.price}</Text></DataTable.Cell>
                                            <DataTable.Cell><Text>{item.quantity}</Text></DataTable.Cell>
                                            <DataTable.Cell style={{ justifyContent: 'space-between' }}>

                                                <Pressable style={{ marginRight: 3 }}  onPress={() => { navigation.navigate("Product", { item: item }) }}>
                                                    <Foundation style={{ marginRight: 10 }} name={'eye'} size={25} color={'#009688'} />
                                                </Pressable>
                                                <Pressable style onPress={() => removeFromCart(index)}>
                                                    <Foundation style={{ margin: 3 }} name={'x'} size={25} color={'black'} />
                                                </Pressable>
                                            </DataTable.Cell>
                                        </DataTable.Row>))}
                                </DataTable>
                            </View>)}


                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>

                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <Ionicons style={{ paddingTop: 3 }} name={'heart-circle'} size={25} color={'black'} />
                        <Text style={styles.TextLink} > WishList </Text>
                    </CollapseHeader>
                    <CollapseBody>
                        {getWishList.length === 0 ? (<Text style={styles.noYet} >No wishlist to show!</Text>) : (
                            <View style={styles.container}>
                                <DataTable>
                                    <DataTable.Header  >
                                        <DataTable.Title><Text>No</Text></DataTable.Title>
                                        <DataTable.Title><Text>Name</Text></DataTable.Title>
                                        <DataTable.Title><Text>Role</Text></DataTable.Title>
                                        <DataTable.Title><Text>Action</Text></DataTable.Title>

                                    </DataTable.Header>
                                    {getWishList?.map((item, index) => (
                                        <DataTable.Row key={index}>
                                            <DataTable.Cell><Text>{index + 1}</Text> </DataTable.Cell>
                                            <DataTable.Cell><Text>{item.name}</Text> </DataTable.Cell>
                                            <DataTable.Cell><Text>{item.role}</Text> </DataTable.Cell>
                                            <DataTable.Cell style={{ justifyContent: 'space-between' }}>
                                                {item.role === "Engineer" || item.role === "Provider" ? (
                                                <Pressable style={{ marginRight: 3 }} onPress={() => { navigation.navigate("ViewProfile", { item: item }) }}>
                                                    <Foundation style={{ marginRight: 10 }} name={'eye'} size={25} color={'#009688'} />
                                                </Pressable>
                                                ) : (<Pressable style={{ marginRight: 3 }} onPress={() => { navigation.navigate("Product", { item: item }) }}>
                                                    <Foundation style={{ marginRight: 10 }} name={'eye'} size={25} color={'#009688'} />
                                                </Pressable>
                                                )}
                                                <Pressable style onPress={() => removeFromWhishList(index)}>
                                                    <Foundation style={{ margin: 3 }} name={'x'} size={25} color={'black'} />
                                                </Pressable>
                                            </DataTable.Cell>
                                        </DataTable.Row>))}
                                </DataTable>
                            </View>)}

                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>

                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <FontAwesome5 style={{ paddingTop: 3 }} name={'comment-alt'} size={25} color={'black'} />

                        <Text style={styles.TextLink} > Messages </Text>
                    </CollapseHeader>
                    <CollapseBody>
                        {getMessage.length === 0 ? (<Text style={styles.noYet}>No Messages to show!</Text>) :

                            (getMessage?.map((message, index) => (
                                <View key={index} style={styles.chatBubble} className="chat-bubble_right d-flex justify-content-between mb-2 align-items-center">
                                    <View >
                                        <Text style={styles.userName} >{message.name}</Text>
                                        <Text style={styles.userMessage}>{message.text}</Text>
                                    </View>
                                    <View>
                                        <Foundation style={{ paddingRight: 7 }} onPress={() => { onRefresh(), removeFromMessage(index) }} name={'x'} size={25} color={'black'} />
                                    </View>
                                </View>

                            )))}

                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>

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

                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>
                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <Ionicons style={{ paddingTop: 3 }} name={'location-sharp'} size={25} color={'black'} />

                        <Text style={styles.TextLink} > Add Address </Text>
                    </CollapseHeader>
                    <CollapseBody>
                        {getAddress?.map((address, index) => {
                            return (
                                <>
                                    <View key={address.street} style={{ paddingLeft: 35, marginBottom: 6 }} >
                                        <Text style={{ fontWeight: '600', fontSize: 18 }}>
                                            {address.city}
                                        </Text>
                                        <Text>{address.street}</Text>
                                    </View>
                                </>
                            );
                        })}
                        <Formik
                            initialValues={{ city: "", street: "" }}
                            validationSchema={Yup.object({
                                city: Yup.string()
                                    .required('Required')
                                ,
                                street: Yup.string().required('Required'),
                            })}
                            onSubmit={values => {
                                handleButtonAddress(values);
                                values.city = "";
                                values.street = "";
                                onRefresh();
                            }}
                        // onsubmit 
                        >
                            {props => (

                                <View style={styles.containerForm}>
                                    <TextInput style={styles.input} value={props.values.city} onChangeText={props.handleChange("city")} placeholder="enter city" />

                                    {props.touched.city && props.errors.city ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.city} </Text>) : null}

                                    <TextInput style={styles.input}
                                        value={props.values.street}
                                        onChangeText={props.handleChange("street")}
                                        placeholder="enter street" />

                                    {props.touched.street && props.errors.street ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.street} </Text>) : null}

                                    <TouchableOpacity onPress={props.handleSubmit} >
                                        <View style={styles.button}>
                                            <Text style={styles.addText}>ADD</Text>
                                        </View>

                                    </TouchableOpacity>


                                </View>


                            )}


                        </Formik>
                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>
                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <FontAwesome5 style={{ paddingTop: 3 }} name={'edit'} size={23} color={'black'} />

                        <Text style={styles.TextLink} > Edit Details </Text>
                    </CollapseHeader>
                    <CollapseBody>
                        <Formik
                            initialValues={{ name: `${getUser.name}`, username: `${getUser.username}`, email: `${getUser.email}`, spetialization: `${getUser.spetialization}`, experience: `${getUser.experience}` }}
                            validationSchema={Yup.object({
                                name: Yup.string()
                                    .required('Required')
                                ,
                                username: Yup.string().required('Required'),
                                email: Yup.string().required('Required').email('emailValid'),
                                spetialization: Yup.string().required('Required'),
                                experience: Yup.string().required('Required'),

                            })}
                            onSubmit={values => {

                                handleButtonEdit(values)
                                onRefresh();
                            }}
                        >
                            {props => (

                                <View style={styles.containerForm}>
                                    <TextInput style={styles.input} value={props.values.name} onChangeText={props.handleChange("name")} placeholder="enter name" />

                                    {props.touched.name && props.errors.name ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.name} </Text>) : null}

                                    <TextInput style={styles.input}
                                        value={props.values.username}
                                        onChangeText={props.handleChange("username")}
                                        placeholder="enter userName" />

                                    {props.touched.username && props.errors.username ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.username} </Text>) : null}

                                    <TextInput style={styles.input}
                                        value={props.values.email}
                                        onChangeText={props.handleChange("email")}
                                        placeholder="enter email" />

                                    {props.touched.email && props.errors.email ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.email} </Text>) : null}

                                    <TextInput style={styles.input}
                                        value={props.values.experience}
                                        onChangeText={props.handleChange("experience")}
                                        placeholder="enter experience" />

                                    {props.touched.experience && props.errors.experience ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.experience} </Text>) : null}

                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <SelectDropdown buttonStyle={styles.input} defaultButtonText={`${getUser.spetialization}`}
                                            onSelect={props.handleChange('spetialization')}
                                            value={props.values.spetialization}
                                            data={spetialization}
                                        />
                                    </View>
                                    {props.touched.spetialization && props.errors.spetialization ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.spetialization} </Text>) : null}


                                    <TouchableOpacity onPress={props.handleSubmit} >
                                        <View style={styles.button}>
                                            <Text style={styles.addText}>Edit</Text>
                                        </View>

                                    </TouchableOpacity>


                                </View>


                            )}


                        </Formik>

                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>

                    </CollapseBody>
                </Collapse>

                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <FontAwesome5 style={{ paddingTop: 3 }} name={'key'} size={23} color={'black'} />

                        <Text style={styles.TextLink} > Change Password </Text>
                    </CollapseHeader>
                    <CollapseBody>
                        <Formik
                            initialValues={{ currentPassword: "", newPassword: "", confirmPassword: "" }}
                            validationSchema={Yup.object({
                                currentPassword: Yup.string()
                                    .required('Required')
                                    .matches(getUser.password, "password isn't correct")
                                ,
                                newPassword: Yup.string().required('Required')
                                    .matches(regPass, "invalid Password"),
                                confirmPassword: Yup.string().required('Required')
                                    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')

                            })}
                            onSubmit={values => {
                                alert(JSON.stringify(values));
                                handleButtonChangePassword(values);
                                onRefresh();


                            }}
                        >
                            {props => (

                                <View style={styles.containerForm}>
                                    <TextInput style={styles.input}
                                        value={props.values.currentPassword}
                                        secureTextEntry={true}
                                        onChangeText={props.handleChange("currentPassword")} placeholder="enter current password" />

                                    {props.touched.currentPassword && props.errors.currentPassword ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.currentPassword} </Text>) : null}

                                    <TextInput style={styles.input}
                                        value={props.values.newPassword}
                                        secureTextEntry={true}
                                        onChangeText={props.handleChange("newPassword")}
                                        placeholder="enter new password" />

                                    {props.touched.newPassword && props.errors.newPassword ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.newPassword} </Text>) : null}

                                    <TextInput style={styles.input}
                                        value={props.values.confirmPassword}
                                        secureTextEntry={true}
                                        onChangeText={props.handleChange("confirmPassword")}
                                        placeholder=" confirm new password" />

                                    {props.touched.confirmPassword && props.errors.confirmPassword ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.confirmPassword} </Text>) : null}
                                    <TouchableOpacity onPress={props.handleSubmit} >
                                        <View style={styles.button}>
                                            <Text style={styles.addText}>Change Password</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                            )}
                        </Formik>
                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>
                    </CollapseBody>
                </Collapse>
                <CollapseHeader style={styles.HeaderCollapse}>
                    <Ionicons style={{ paddingTop: 3 }} name={'log-out-outline'} size={23} color={'black'} />
                    <Text style={styles.TextLink} onPress={handleAuth} > Logout </Text>
                </CollapseHeader>
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
        width: 123,
        height: 123,
        borderRadius: 75,
        marginRight: 15,

    },
    TextHeader: {
        fontSize: 22,
        fontWeight: 'bold'
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
})
