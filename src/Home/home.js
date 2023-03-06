import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { db } from "../../firebase";
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




function Home({ navigation }) {

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
      if(keyword==="engineers"){
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
              image : doc.data().image
            }))
          );
        });
        
      }else if(keyword==="providers"){
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
              image : doc.data().image
            }))
          );
        });
      }else{
        const dataRefPro = collection(db, "categories");
        onSnapshot(dataRefPro, (snapshot) => {
          setDataProFilter(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              name: doc.data().name,
              title: doc.data().title,
              products: doc.data().products,
              spetialization: doc.data().spetialization,
              image : doc.data().image
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
            image : doc.data().image
          }))
        );
      });
    };
    
    // console.log(getUser2.cart)
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
            image : doc.data().image
          }))
        );
      });
    };
    const loadDataCategory = async () => {
      const collectionRef = collection(db, "categories");

      const q = query(collectionRef, limit(4));

      onSnapshot(q, (snapshot) => {
        setDataCategory(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            products: doc.data().products,
            spetialization: doc.data().spetialization,
            image : doc.data().image
            // name: doc.data().name
          }))
        );
      });
    };
    // const loadDataProd = async () => {
    //   onSnapshot(dataProdColl, (snapshot) => {
    //     setDataProd(
    //       snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         name: doc.data().name,
    //         category: doc.data().category,
    //         spetialization: doc.data().spetialization,
    //         price:doc.data().price
    //       }))
    //     );
    //   });
    // };
    // const { currentUser } = useSelector((state) => state.user);
    // const addToCart=(item)=>{
    //   const added = getUser2.cart.find(({id})=>id===item.id)
    //   // let quantity=parseInt("1")
    //   console.log(added)
    // if (!added) {
    //   getUser2.cart.push({name:item.name,id:item.id,role:item.role})
    //   const docRef = doc(db, getDB, getUser2.id);
    //   updateDoc(docRef, {
    //     cart: getUser2.cart,
    //   })
    //     .then(() => {
    //       console.log("done cart");
    //     })
    //     .catch((error) => {
    //       console.log("ERROR" + error);
    //     });}else{
    //     //  console.log(getUser2.cart.Quantity)
    //     }
    // }
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
    // const getData2 = () => {
    //   const q = query(
    //     collection(db, "providers"),
    //     where("email", "==", currentUser.email)
    //   );
  
    //   onSnapshot(q, (snapshot) => {
    //     snapshot.docs.forEach((doc) => {
    //       setGetProvidor({ ...doc.data(), id: doc.id });
    //       if (getProvidor) {
    //         setGetUser2({ ...doc.data(), id: doc.id });
    //         setGetDB("providers");
    //       }
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //   });
  
    //   const q2 = query(
    //     collection(db, "engineers"),
    //     where("email", "==", currentUser.email)
    //   );
  
    //   onSnapshot(q2, (snapshot) => {
    //     snapshot.docs.forEach((doc) => {
    //       setGetEngineer({ ...doc.data(), id: doc.id });
    //       if (getEngineer) {
    //         setGetUser2({ ...doc.data(), id: doc.id });
    //         setGetDB("engineers");
    //       }
  
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //   });
  
    //   const q3 = query(
    //     collection(db, "users"),
    //     where("email", "==", currentUser.email)
    //   );
  
    //   onSnapshot(q3, (snapshot) => {
    //     snapshot.docs.forEach((doc) => {
    //       setGetCustomer({ ...doc.data(), id: doc.id });
    //       if (getCustomer) {
    //         setGetUser2({ ...doc.data(), id: doc.id });
    //         setGetDB("users");
    //       }
    //       console.log(doc.id, " => ", doc.data());
    //     });
    //   });
    // };
    // const exists = (movie) => {
    //   if (getUser2.wishlist.filter((item) => item.id === movie.id).length > 0) {
    //     return true;
    //   }
  
    //   return false;
    // };
    
    useEffect(() => {
      loadDataEng();
      loadDataCont();
      loadDataCategory();
      loadDataFilter();
    
      }, [keyword]);

    return (
        <>
              <View >
                <Text style={{fontSize:20,fontWeight:'bold'}}>Popular Engineer </Text>
                {dataEng.map((item,index) => {
                  return (
                        <View key={index} >
                            <Text >{item.name}</Text>
                            <Text >{item.role}</Text>
                        </View>  
                        
                  );
                })}
              </View>


        
        </>

    );

}

export default Home;