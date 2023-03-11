import React, { useEffect, useState } from "react";
import { RefreshControl, Text, View, Image, StyleSheet, ScrollView, Button, TextInput } from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../Home/Carsol-item'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation"
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { json, Link, useHistory } from "react-router-dom";
import { logoutInitiate } from "../Store/Actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
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

function Profile({ navigation }) {
    let spetialization =[
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

    const image = [
        { img: require('../../assets/defualtImages/hero-1.jpg') },
        { img: require('../../assets/defualtImages/hero-2.jpg') }
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
        // else history.push("login");
    }, [currentUser]);

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
    const [userData, setUserData] = useState({
        city: "",
        userName: "",
        title: "",
        caption: "",
        comment: "",
        rating: "",
        img: "",
        image: "",
        newPassword: "",
        confirmpassword: "",
    });

    const [error, setErros] = useState({
        name: null,
        username: null,
        image: null,
        email: null,
        role: null,
        spetialization: null,
        street: null,
        city: null,
        phone: null,
        experience: null,
        img: null,
        title: null,
        caption: null,
        comment: null,
        rating: null,
        password: null,
        newPassword: null,
        confirmpassword: null,
    });
    console.log(getWishList)

    const addUserData = (e) => {
        if (e.target.name === "img") {
            if (e.target.files[0]) {
                setUserData({
                    ...userData,
                    img: e.target.files[0],
                });
            }
            setErros({
                ...error,
                img:
                    e.target.value.length === 0
                        ? "This Field is Required"
                        : e.target.value.length < 3
                            ? "Min Length is 3 Char"
                            : null,
            });
        } else if (e.target.name === "title") {
            setUserData({
                ...userData,
                title: e.target.value,
            });

            setErros({
                ...error,
                title:
                    e.target.value.length === 0
                        ? "This Field is Required"
                        : e.target.value.length < 3
                            ? "Min Length is 3 Char"
                            : null,
            });
        } else if (e.target.name === "caption") {
            setUserData({
                ...userData,
                caption: e.target.value,
            });

            setErros({
                ...error,
                caption:
                    e.target.value.length === 0
                        ? "This Field is Required"
                        : e.target.value.length < 3
                            ? "Min Length is 3 Char"
                            : null,
            });
        } else if (e.target.name === "comment") {
            setUserData({
                ...userData,
                comment: e.target.value,
            });

            setErros({
                ...error,
                comment:
                    e.target.value.length === 0
                        ? "This Field is Required"
                        : e.target.value.length < 3
                            ? "Min Length is 3 Char"
                            : null,
            });
        } else if (e.target.name === "rating") {
            setUserData({
                ...userData,
                rating: e.target.value,
            });

            setErros({
                ...error,
                rating: e.target.value.length === 0 ? "This Field is Required" : null,
            });
        } else if (e.target.name === "city") {
            setUserData({
                ...userData,
                city: e.target.value,
            });

            setErros({
                ...error,
                city:
                    e.target.value.length === 0
                        ? "This Field is Required"
                        : e.target.value.length < 3
                            ? "Min Length is 3 Char"
                            : null,
            });
        } else if (e.target.name === "street") {
            setUserData({
                ...userData,
                street: e.target.value,
            });

            setErros({
                ...error,
                street:
                    e.target.value.length === 0
                        ? "This Field is Required"
                        : e.target.value.length < 3
                            ? "Min Length is 3 Char"
                            : null,
            });
        } else if (e.target.name === "newPassword") {
            setUserData({
                ...userData,
                newPassword: e.target.value,
            });

            setErros({
                ...error,
                newPassword:
                    e.target.value.length === 0
                        ? "This Field is Required"
                        : e.target.value.length < 8
                            ? "Min Length is 8"
                            : regPass.test(e.target.value)
                                ? ""
                                : "Invalid Password",
            });
        } else {
            setUserData({
                ...userData,
                confirmpassword: e.target.value,
            });

            setErros({
                ...error,
                confirmpassword:
                    e.target.value.length === 0
                        ? "This Field is Required"
                        : e.target.value.length < 8
                            ? "Min length is 8"
                            : e.target.value === userData.newPassword
                                ? ""
                                : "Password and confirm password should be the same",
            });
        }
    };
    const changeUserData = (e) => {
        if (e.target.name === "name") {
            setGetUser({
                ...getUser,
                name: e.target.value,
            });

            setErros({
                ...error,
                name:
                    e.target.value.length === 0
                        ? "This Field is Required"
                        : e.target.value.length < 3
                            ? "Min Length is 3 Char"
                            : null,
            });
        } else if (e.target.name === "email") {
            setGetUser({
                ...getUser,
                email: e.target.value,
            });

            setErros({
                ...error,
                email: reg.test(e.target.value) ? "" : "Invalid email address",
            });
        } else if (e.target.name === "image") {
            if (e.target.files[0]) {
                setGetUser({
                    ...getUser,
                    image: e.target.files[0],
                });
            }
            setErros({
                ...error,
                image: e.target.value.length === 0 ? "This Field is Required" : null,
            });
        } else if (e.target.name === "username") {
            setGetUser({
                ...getUser,
                username: e.target.value,
            });

            setErros({
                ...error,
                username:
                    e.target.value.length === 0
                        ? "This Field is Required"
                        : e.target.value.length < 3
                            ? "Min Length is 3 Char"
                            : null,
            });
        } else if (e.target.name === "role") {
            setGetUser({
                ...getUser,
                role: e.target.value,
            });

            setErros({
                ...error,
                role:
                    e.target.value.length === 0
                        ? "This Field is Required"
                        : e.target.value.length < 3
                            ? "Min Length is 3 Char"
                            : null,
            });
        } else if (e.target.name === "experience") {
            setGetUser({
                ...getUser,
                experience: e.target.value,
            });

            setErros({
                ...error,
                experience:
                    e.target.value.length === 0
                        ? "This Field is Required"
                        : e.target.value.length < 10
                            ? "Min Length is 10 Char"
                            : null,
            });
        } else if (e.target.name === "spetialization") {
            setGetUser({
                ...getUser,
                spetialization: e.target.value,
            });

            setErros({
                ...error,
                spetialization:
                    e.target.value.length === 0 ? "This Field is Required" : null,
            });
        } else if (e.target.name === "rate") {
            setGetUser({
                ...getUser,
                rate: e.target.value,
            });

            setErros({
                ...error,
                rate: e.target.value.length === 0 ? "This Field is Required" : null,
            });
        } else if (e.target.name === "phone") {
            setGetUser({
                ...getUser,
                phone: e.target.value,
            });

            setErros({
                ...error,
                phone:
                    e.target.value.length === 0
                        ? "This Field is Required"
                        : e.target.value.length < 11
                            ? "Min Length is 11"
                            : null,
            });
        } else if (e.target.name === "password") {
            setErros({
                ...error,
                password:
                    e.target.value.length === 0
                        ? "This Field is Required"
                        : e.target.value === getUser.password
                            ? ""
                            : "password is not correct",
            });
        }
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
        }
    };

    const submitData = (e) => {
        e.preventDefault();
    };

    const handleButtonPortfolio = () => {
        const name = new Date().getTime() + userData.img.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, userData.img);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    getUser.portofolio.push({
                        title: userData.title,
                        caption: userData.caption,
                        image: downloadURL,
                    });
                    console.log(getUser.portofolio);
                    const docRef = doc(db, getDB, getUser.id);

                    updateDoc(docRef, {
                        portofolio: getUser.portofolio,
                    })
                        .then(() => {
                            console.log("done portoflio");
                        })
                        .catch((error) => {
                            console.log("ERROR" + error);
                        });

                    userData.title = "";
                    userData.caption = "";
                    userData.img = "";
                });
            }
        );
    };
    const handleButtonComment = () => {
        getUser.feedback.push({
            comment: userData.comment,
            rating: userData.rating,
        });

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

        userData.comment = "";
        userData.rating = "";
    };
    const [getadd, setadd] = useState([])
    const handleButtonAddress = () => {
        getUser.address.push({ city: userData.city, street: userData.street });

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
    const handleButtonEdit = () => {
        const name = new Date().getTime() + getUser.image.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, getUser.image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const docRef = doc(db, getDB, getUser.id);

                    updateDoc(docRef, {
                        name: getUser.name,
                        username: getUser.username,
                        experience: getUser.experience,
                        email: getUser.email,
                        spetialization: getUser.spetialization,
                        image: downloadURL,
                    })
                        .then(() => {
                            console.log("done edit ");
                        })
                        .catch((error) => {
                            console.log("ERROR" + error);
                        });
                });
            }
        );
    };
    const handleButtonChangePassword = () => {
        const docRef = doc(db, getDB, getUser.id);

        updateDoc(docRef, {
            password: userData.newPassword,
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
                console.log("remove wishlist");
            })
            .catch((error) => {
                console.log("ERROR" + error);
            });
    }

    return (
        <>
            <ScrollView style={styles.Container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                <View style={styles.Header}>
                    <Image source={require('../../assets/defualtImages/def.jpg')} style={styles.ImageHeader}></Image>
                    <View>
                        <Text style={styles.TextHeader}>HI , Rami</Text>
                        <View style={{ flexDirection: 'row', marginTop: 4 }}>
                            {drawStar(3)}
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
                        <Ionicons style={{ paddingTop: 3 }} name={'ios-information-circle'} size={23} color={'black'} />
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
                                    <Text style={styles.TextData} > 01212392969 </Text>
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
                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>

                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <Ionicons style={{ paddingTop: 3 }} name={'cart'} size={25} color={'black'} />
                        <Text style={styles.TextLink} > Cart </Text>
                    </CollapseHeader>
                    <CollapseBody>

                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>

                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <Ionicons style={{ paddingTop: 3 }} name={'heart-circle'} size={25} color={'black'} />
                        <Text style={styles.TextLink} > WishList </Text>
                    </CollapseHeader>
                    <CollapseBody>
                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>

                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <FontAwesome5 style={{ paddingTop: 3 }} name={'comment-alt'} size={25} color={'black'} />

                        <Text style={styles.TextLink} > Messages </Text>
                    </CollapseHeader>
                    <CollapseBody>
                        {/* {getMessage.length === 0 ? (<h2 className="fs-5 text-center">No Messages to show!</h2>) :
                        
                        (getMessage?.map((message, index) => {
                          return ( */}

                        <View style={styles.chatBubble} className="chat-bubble_right d-flex justify-content-between mb-2 align-items-center" >
                            <View >
                                <Text style={styles.userName} >Ramy</Text>
                                <Text style={styles.userMessage}>i want you to talk, call me back if you intersted</Text>
                            </View>
                            <View>
                                <Foundation style={{ paddingRight: 7 }} onPress={() => removeFromMessage(index)} name={'x'} size={25} color={'black'} />
                            </View>
                        </View>
                        {/* );
                          }))} */}


                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>

                    </CollapseBody>
                </Collapse>
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <FontAwesome5 style={{ paddingTop: 3 }} name={'comment'} size={25} color={'black'} />
                        <Text style={styles.TextLink} > Feedbacks </Text>
                    </CollapseHeader>
                    <CollapseBody>
                        {/* {getFeedback.length === 0 ? (<Text style={styles.noYet}>No Feedback to show!</Text>) :
                            (getFeedback?.map((feedback, index) => {
                              return ( */}

                        <View style={{ backgroundColor: 'lightsteelblue', margin: 6, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                            key={index}
                        >
                            <Text style={{ padding: 15, fontSize: 17, fontWeight: 'bold' }}>
                                ai 7aga
                            </Text>
                            <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'flex-end' }} className="m-4 d-flex justify-content-end w-25">
                                {drawStar(4)}
                            </View>
                        </View>
                        {/* );
                             }))}  */}

                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>
                    </CollapseBody>
                </Collapse>
                {/* <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <FontAwesome5 style={{ paddingTop: 3 }} name={'magic'} size={25} color={'black'} />

                        <Text style={styles.TextLink} > Add Portfolio </Text>
                    </CollapseHeader>
                    <CollapseBody>
                        <Text style={{ alignSelf: 'center' }}>__________________________________________________</Text>

                    </CollapseBody>
                </Collapse> */}
                <Collapse  >
                    <CollapseHeader style={styles.HeaderCollapse}>
                        <Ionicons style={{ paddingTop: 3 }} name={'location-sharp'} size={25} color={'black'} />

                        <Text style={styles.TextLink} > Add Address </Text>
                    </CollapseHeader>
                    <CollapseBody>
                        {getadd?.map((address, index) => {
                            return (
                                <>
                                    <View style={{ paddingLeft: 35, marginBottom: 6 }} key={index}>
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
                                getadd.push({ city: values.city, street: values.street });
                                alert(JSON.stringify(getadd));
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
                            initialValues={{ name: "", userName: "", email: "", spetialization: "", experience: "" }}
                            validationSchema={Yup.object({
                                name: Yup.string()
                                    .required('Required')
                                ,
                                userName: Yup.string().required('Required'),
                                email: Yup.string().required('Required').email('emailValid'),
                                spetialization: Yup.string().required('Required'),
                                experience: Yup.string().required('Required'),

                            })}
                            onSubmit={values => {
                                alert(JSON.stringify(values));
                                onRefresh();


                            }}
                        >
                            {props => (

                                <View style={styles.containerForm}>
                                    <TextInput style={styles.input} value={props.values.name} onChangeText={props.handleChange("name")} placeholder="enter name" />

                                    {props.touched.name && props.errors.name ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.name} </Text>) : null}

                                    <TextInput style={styles.input}
                                        value={props.values.userName}
                                        onChangeText={props.handleChange("userName")}
                                        placeholder="enter userName" />

                                    {props.touched.userName && props.errors.userName ? (<Text style={{ color: "red", fontSize: 12 }}>{props.errors.userName} </Text>) : null}

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
                                        <SelectDropdown buttonStyle={styles.input}  defaultButtonText="Select your spetialization" 
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
                            initialValues={{ currentPassword: "", userName: "", email: "", spetialization: "", experience: "" }}
                            validationSchema={Yup.object({
                                currentPassword: Yup.string()
                                    .required('Required')
                                    .matches( userData.password,"password isn't correct")
                                ,
                                newPassword: Yup.string().required('Required')
                                .matches(regPass,"invalid Password"),
                                confirmPassword: Yup.string().required('Required')
                                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                           
                            })}
                            onSubmit={values => {
                                alert(JSON.stringify(values));
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
                                            <Text style={styles.addText}>Edit</Text>
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

                    <Text style={styles.TextLink} > Logout </Text>
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
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '20'
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



})
