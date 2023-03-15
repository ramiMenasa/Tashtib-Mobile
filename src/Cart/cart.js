import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet,ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { TouchableOpacity } from "react-native";
function Cart() {


    const [getDB, setGetDB] = useState("");
    const [getCustomer, setGetCustomer] = useState({});
    const [getProvider, setGetProvider] = useState({});
    const [getEngineer, setGetEngineer] = useState({});
    const [getUser, setGetUser] = useState({});
    const [getcart, setCart] = useState([]);


    const { currentUser } = useSelector((state) => state.user);

    const getData = () => {
        const q = query(
            collection(db, "providers"),
            where("email", "==", currentUser.email)
        );

        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                setGetProvider({ ...doc.data(), id: doc.id });
                if (getProvider) {
                    setGetUser({ ...doc.data(), id: doc.id });
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
                    setCart(doc.data().cart);
                    setGetDB("users");
                }
                console.log(doc.id, " => ", doc.data());
                console.log(getCustomer);
            });
        });
        console.log(getDB);

        return getDB;
    };

    console.log(getDB);

    useEffect(() => {
        if (currentUser) {
            getData();
            console.log(getDB);
        } else {
            console.log("no user");
        }
    }, [currentUser, getDB]);

    const removeFromCart = (item) => {
        const index = getUser?.cart.findIndex(({ id }) => id === item.id);
        getUser?.cart.splice(index, 1);
    
        const docRef = doc(db, getDB, getUser?.id);
    
        updateDoc(docRef, {
          cart: getUser?.cart,
        })
          .then(() => {
            toast("item removed from cart");
          })
          .catch((error) => {
            console.log("ERROR" + error);
          });
      };

      function addQuantity(item){
        const index = getUser?.cart.findIndex(({ name }) => name === item.name);
        getUser.cart[index].quantity += 1;
        const docRef = doc(db, getDB, getUser?.id);

        updateDoc(docRef, {
            cart:getUser?.cart
        })
          .then(() => {
            toast("item removed from cart");
          })
          .catch((error) => {
            console.log("ERROR" + error);
          });
          calcTotal()
      }
      function minusQuantity(item){
        const index = getUser?.cart.findIndex(({ name }) => name === item.name);
        if (getUser.cart[index].quantity>1) {
            getUser.cart[index].quantity -= 1;
            const docRef = doc(db, getDB, getUser?.id);
    
            updateDoc(docRef, {
                cart:getUser?.cart
            })
              .then(() => {
                toast("item removed from cart");
              })
              .catch((error) => {
                console.log("ERROR" + error);
              });
        } else{
            removeFromCart(item)
        }

        calcTotal();
      }  
      function calcTotal (){
        let total=0;
        getcart.forEach(element => {
            total += (element.quantity*element.price)
        });
        return(total)
      }


    return (
        <>
        <ScrollView style={styles.scrollContainer}>
            <View style={{ paddingTop: 20 }}>
                <Text style={{ fontSize: 26, marginBottom: 30, marginLeft: 50, fontWeight: 'bold' }}>Shopping Cart</Text>
                <View>
                    {getcart.length === 0 ? (
                        <Text>no items</Text>
                    ) : (

                        getcart?.map((item, index) => {
                            return (
                                <View key={item.name} style={styles.mainCardView}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.subCardView}>
                                            <Image
                                                source={{uri:`${item.image}`}}
                                                resizeMode="contain"
                                                style={{
                                                    width: 100,
                                                    height:100,
                                                }}
                                            />
                                        </View>
                                        <View style={{ marginLeft: 30 }}>
                                            <Text
                                                style={{
                                                    fontSize: 20,
                                                    color: 'black',
                                                    fontWeight: 'bold',
                                                    //   fontFamily: Fonts.nunitoBold,
                                                    textTransform: 'capitalize',
                                                }}>
                                                {item.name}
                                            </Text>
                                            <View
                                                style={{
                                                    marginTop: 4,
                                                    borderWidth: 0,
                                                    width: '85%',
                                                }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text
                                                        style={{
                                                            color: 'black',
                                                            fontSize: 18,
                                                        }}>
                                                        Price:
                                                    </Text>
                                                    <Text style={{ color: 'grey', fontSize: 18, marginLeft: 7 }}>{item.price}$</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15 }}>
                                                    <View
                                                        style={{
                                                            height: 17,
                                                            borderWidth: 1,
                                                            width: 17,
                                                            marginRight: 10,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderColor: 'grey'
                                                        }}>
                                                        <Icon name="minus" style={{ color: 'grey' }} onPress={()=>{minusQuantity(item)}} ></Icon>
                                                    </View>
                                                    <Text style={{ marginRight: 10 }}>{item.quantity}</Text>
                                                    <View
                                                        style={{
                                                            height: 17,
                                                            borderWidth: 1,
                                                            width: 17,
                                                            marginRight: 30,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderColor: 'grey'
                                                        }}>
                                                        <Icon name="plus" style={{ color: 'grey' }} onPress={()=>{addQuantity(item)}}></Icon>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text
                                                        style={{
                                                            color: 'black',
                                                            fontSize: 18,
                                                        }}>
                                                        Total:
                                                    </Text>
                                                    <Text style={{ color: 'grey', fontSize: 18, marginLeft: 7 }}>{item.price*item.quantity}$</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            height: 30,
                                            borderWidth: 1,
                                            width: 30,
                                            //   marginLeft: -26,
                                            marginRight: 30,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 10,
                                            borderColor: 'brown'
                                        }}>
                                        <Icon name="trash" style={{ color: 'brown' }} onPress={()=>removeFromCart(item)}></Icon>
                                    </View>
                                </View>
                            )
                        })

                    )}

                </View>
            </View>
            </ScrollView>
            <View style={styles.conatinerPriceButton}>
                    <Text style={styles.price} >Total : {calcTotal()}  LE</Text>
                    <TouchableOpacity  >
                        <View style={styles.button}>
                        <Text style={styles.addText} >Pay with Card</Text>
                    </View>
                                        
                    </TouchableOpacity>
                </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainCardView: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        //   shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
        marginTop: 6,
        marginBottom: 6,
        marginLeft:20,
        marginRight: 20,
    },
    subCardView: {
        height: 100,
        width: 100,
        borderRadius: 25,
        //   backgroundColor: 'grey',
        //   borderColor: 'black',
        //   borderWidth: 1,
        //   borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
    },
    conatinerPriceButton: {
        alignSelf:'center',
        width:400,
        borderTopWidth:1,
        borderTopColor:'grey',
        position:'absolute',
         bottom: 0,

    },
    button: {
        alignSelf:'center',
        flex:1,
        width: 370,
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
    },
    price: {
        padding: 12,
        fontSize: 24,
        fontWeight: 'bold',
    },
    scrollContainer:{
        flex: 1,
        // marginTop: Platform.OS === 'android' ? 100 : 0,    
        marginBottom:120,
    }

});
export default Cart