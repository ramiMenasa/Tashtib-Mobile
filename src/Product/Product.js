import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { db, storage } from "../../firebase";

import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
} from "firebase/firestore";

export default function Product({ navigation, route }) {
    const item = route.params.item;

      const [getDB, setGetDB] = useState("");
      const [getCustomer, setGetCustomer] = useState({});
      const [getProvider, setGetProvider] = useState({});
      const [getEngineer, setGetEngineer] = useState({});
      const [getUser, setGetUser] = useState({});

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
              setGetDB("users");
            }
            console.log(doc.id, " => ", doc.data());
            console.log(getCustomer);
          });
        });
        console.log(getDB);

        return getDB;
      };

      useEffect(() => {
        if(currentUser){
          getData();
        }
      }, []);
    
      
  const exists = (wish) => {
    if (getUser?.wishlist?.filter((item) => item.id === wish.id).length > 0) {
      return true;
    }

    return false;
  };

  const addToWhishList = (item) => {
    const added = getUser?.wishlist.find(({ id }) => id === item.id);
    console.log(added);
    if (!added) {
      
        getUser?.wishlist.push({
          name: item.name,
          id: item.id,
          role: item.spetialization,
          spetialization:item.spetialization,
          quantity:1,
          description:item.description,
          price:item.price,
          image:item.image,
        });
      
      const docRef = doc(db, getDB, getUser?.id);
      updateDoc(docRef, {
        wishlist: getUser?.wishlist,
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
    const index = getUser?.wishlist.findIndex(({ id }) => id === item.id);
    getUser?.wishlist.splice(index, 1);

    const docRef = doc(db, getDB, getUser?.id);

    updateDoc(docRef, {
      wishlist: getUser?.wishlist,
    })
      .then(() => {
        toast("item removed from wishlist");
      })
      .catch((error) => {
        console.log("ERROR" + error);
      });
  };

  const existsCart = (wish) => {
    if (getUser?.cart?.filter((item) => item.name === wish.name).length > 0) {
      return true;
    }

    return false;
  };

  const addToCart = (item) => {
      
        getUser?.cart.push({
            name:item.name,
            quantity:1,
            description:item.description,
            price:item.price,
            image:item.image,
            id:item.id 
        });
      
      const docRef = doc(db, getDB, getUser?.id);
      updateDoc(docRef, {
        cart: getUser?.cart,
      })
        .then(() => {
          toast("added to cart");
        })
        .catch((error) => {
          console.log("ERROR Cart" + error);
        });
     
  };
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



    return (
        <>
        <ScrollView style={{flex:1 ,marginBottom:55,}}> 
            <View >
                <Image source={{ uri: `${item.image}` }} style={{ height: 500 }}></Image>

                <View style={styles.conatinerNameWishlist} >
                    <Text style={styles.Title}>{item.name}</Text>
                    {currentUser ? (
                    exists(item) ? (
                      <Ionicons style={styles.iconHeart} name={'heart'} size={26} color={'red'}
                        onPress={() => removeFromWhishList(item)}
                      />
                    ) : (
                      <Ionicons style={styles.iconHeart} name={'heart-outline'} size={26} color={"red"}
                        onPress={() => addToWhishList(item)}
                      />
                    )
                  ) : (
                    <Ionicons style={styles.iconHeart} name={'heart-outline'} size={26} color={"red"}
                    onPress={() => navigation.navigate('login')}
                  />
                  )}               
                   </View>

                <View>
                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                </View>
            </View>

        </ScrollView>
            <View style={styles.conatinerPriceButton}>
                    <Text style={styles.price} >{item.price}LE</Text>
                    <TouchableOpacity  >
                    {currentUser ? (
                    existsCart(item) ? (
                        <View style={styles.button}>
                        <Text style={styles.addText} onPress={() => removeFromCart(item)}>Remove from Cart</Text>
                    </View>
                    ) : (
                        <View style={styles.button}>
                        <Text style={styles.addText} onPress={() => addToCart(item)}>Add to Cart</Text>
                    </View>
                    ) ) : (
                    <View style={styles.button}>
                    <Text style={styles.addText} onPress={() => navigation.navigate('login')}>Add to Cart</Text>
                </View>
                  )}
                    
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
        alignSelf:'center',
        width:400,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        borderTopWidth:1,
        borderTopColor:'grey',
        position:'absolute',
         bottom: 0,

    },
    conatinerNameWishlist: {
        flexDirection: 'row', 
        justifyContent: 'space-between',


    },

    description: {
        padding: 12,
        color: 'dimgrey',
        textAlign: 'justify'
    },
    button: {
        alignSelf:'flex-end',
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
    },
    iconHeart:{
        padding:13,
    }

})