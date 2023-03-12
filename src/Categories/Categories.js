import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Dimensions, ImageBackground, Text, Image, View, StyleSheet, TextInput, Platform, } from "react-native";
import { db } from "../../firebase";
import {
  collection,
  onSnapshot,
  query,
  limit,
  getDocs,
  where,
  updateDoc,
  doc,
  orderBy
} from "firebase/firestore";

export default function Categories() {

  const [dataCategory, setDataCategory] = useState([]);
  const [keyword, setKeyword] = useState("chairs");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);




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
  const getProducts = async () => {
    const collectionRef = collection(db, "categories");

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, products } = docSnapshot.data();
      acc[title] = products;
      setCategories(acc);
      console.log(acc[title]);
      return acc;
    }, {});

    return categoryMap;
  };

  // alert(JSON.stringify(products))

  useEffect(() => {
    loadDataCategory();
    const getCategoryMap = async () => {
      const categorymap = await getProducts();
      setProducts(categorymap[keyword]);
    };

    getCategoryMap();

  }, [keyword]);

  return (
    <ScrollView>
      <View>
        <ScrollView horizontal={true}>

          {dataCategory.map((item) => {
            return (
              <View style={{ padding: 20 }} key={item.id}>
                <Text style={{ alignSelf: 'center', fontWeight: "bold" }}
                  onPress={() => { setKeyword(item.title) }}
                > {item.title}</Text>


              </View>

            )
          })}
        </ScrollView>
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingStart: 20, marginVertical: 15, textTransform: 'uppercase' }}>{keyword}</Text>
        {products ? (<View style={styles.section} >
          {products.map((item, index) => {
            return (
              <View key={index} style={styles.ViewCard} >
                {item.image === "" ? (<Image source={require(`../../assets/defualtImages/def.jpg`)} style={{ width: 150, height: 150 }}></Image>)
                  : (<Image source={{ uri: `${item.image}` }} style={{ width: 150, height: 160 }}></Image>)}

                <Text style={{ fontWeight: 'bold', padding: 3, fontSize: 17 }} >{item.name}</Text>
                <Text style={{ paddingStart: 3, fontSize: 14 }} >{item.price} LE</Text>

              </View>

            );
          })}
        </View>) : (
          <View  style={styles.ViewCardEmpty} >
            <Image source={require(`../../assets/defualtImages/giphy.gif`)} style={{width:350 }}></Image>
          </View>
        )}

      </View>


    </ScrollView>
  )
}
const styles = StyleSheet.create({

  cateImage: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ViewCard: {
    marginHorizontal: 14,
    padding: 12,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  ViewCardEmpty: {
    marginHorizontal: 14,
    padding: 12,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 10,
  }
})