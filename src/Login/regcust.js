import React from "react";
import { ScrollView, View , Image , Text , StyleSheet,TouchableOpacity, } from "react-native";
import { Form, FormItem } from 'react-native-form-component';
import Button from "./button";
import SelectDropdown from 'react-native-select-dropdown'
import Input from "./input";
import { useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { registerInitiate } from "../Store/Actions/AuthAction";
import { db } from "../../firebase";
import {
     collection,
     addDoc,
     onSnapshot,
     query,
     limit,
     getDocs,
     where,
     updateDoc,
     serverTimestamp,
     doc
   } from "firebase/firestore"


const reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+).*$/);
const regPass = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
const regPhone = RegExp(/^01[0125][0-9]{8}$/);

function RegCust(){
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [role, setRole] = useState("");
    const [nameErr, setNameErr] = useState("")
    const [usernameErr, setUsernameErr] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [emailRegErr, setEmailRegErr] = useState(false)
    const [passRegErr, setPassRegErr] = useState(false)
    const [phoneRegErr, setPhoneRegErr] = useState(false)
    const [phoneErr, setPhoneErr] = useState("")
    const [cityErr, setCityErr] = useState("")
    const [streetErr, setStreetErr] = useState("")
    const [passErr, setPassErr] = useState("")
    const [confirmErr, setConfirmErr] = useState("")
    const dispatch = useDispatch();
    const handleSubmit = async(e) => {
      // e.preventDefault();
      //   if(name.length == 0){
      //      setNameErr("Name is Required")
      //   }
      //   else if (name.length < 3){
      //      setNameErr("Name must be more than 3 char")
      //   }
      //   else {
      //      setNameErr("")
      //   }
      //   if(username.length == 0){
      //      setUsernameErr("Username is Required")
      //   }
      //   else if (username.length < 3){
      //      setUsernameErr("Username must be more than 3 char")
      //   }
      //   else {
      //      setUsernameErr("")
      //   }
      //   if(email.length == 0){
      //       setEmailErr("Email is Required")
      //   }
      //   else if(!reg.test(email)) {
      //      setEmailRegErr(true)
      //      setEmailErr("Invalid  email address")
      //   }
      //   else{
      //       setEmailErr("")
      //   }
      //   if(phone.length == 0){
      //      setPhoneErr("Phone is Required")
      //   }
      //   else if (phone.length < 3){
      //      setPhoneErr("Phone must be 11 number")
      //   }
      //   else if(!regPhone.test(phone)) {
      //    setPhoneRegErr(true)
      //    setPhoneErr("Invalid Phone number")
      //   }
      //   else {
      //      setPhoneErr("")
      //   }
      //   if(city.length == 0){
      //      setCityErr("City is Required")
      //   }
      //   else if (city.length < 3){
      //      setCityErr("City must be 3 char or more")
      //   }
      //   else {
      //      setCityErr("")
      //   }
      //   if(street.length == 0){
      //      setStreetErr("Street is Required")
      //   }
      //   else if (street.length < 3){
      //      setStreetErr("Street must be 3 char or more")
      //   }
      //   else {
      //      setStreetErr("")
      //   }
      //   if(password.length == 0){
      //       setPassErr("Password is Required")
      //   }
      //   else if(password.length < 8){
      //      setPassErr("Password must be more than 8 ")
      //   }
      //   else if (!regPass.test(password))
      //   {
      //      setPassRegErr(true)
      //      setPassErr("Password should contain uppercase & lowercase letters & special character & numbers")
      //   }
      //   else{
      //       setPassErr("")
      //   }
      //   if(confirmpassword.length == 0){
      //      setConfirmErr("Confirm Password is Required")
      //  }
      //   else if(confirmpassword != password){
      //     setConfirmErr("Confirm Password and Password must be the same ")
      //  }
      //   else{
      //      setConfirmErr("")
      //  }
      if(name.length == 0){
         setNameErr("Name is Required")
      }
      else if (name.length < 3){
         setNameErr("Name must be more than 3 char")
      }
      else if(username.length == 0){
         setUsernameErr("Username is Required")
      }
      else if (username.length < 3){
         setUsernameErr("Username must be more than 3 char")
      }
      else if(email.length == 0){
          setEmailErr("Email is Required")
      }
      else if(!reg.test(email)) {
         setEmailRegErr(true)
         setEmailErr("Invalid  email address")
      }
      else if(phone.length == 0){
         setPhoneErr("Phone is Required")
      }
      else if (phone.length < 3){
         setPhoneErr("Phone must be 11 number")
      }
      else if(!regPhone.test(phone)) {
       setPhoneRegErr(true)
       setPhoneErr("Invalid Phone number")
      }
      else if(city.length == 0){
         setCityErr("City is Required")
      }
      else if (city.length < 3){
         setCityErr("City must be 3 char or more")
      }
      else if(street.length == 0){
         setStreetErr("Street is Required")
      }
      else if (street.length < 3){
         setStreetErr("Street must be 3 char or more")
      }
      else if(password.length == 0){
          setPassErr("Password is Required")
      }
      else if(password.length < 8){
         setPassErr("Password must be more than 8 ")
      }
      else if (!regPass.test(password))
      {
         setPassRegErr(true)
         setPassErr("Password should contain uppercase & lowercase letters & special character & numbers")
      }
      else if(confirmpassword.length == 0){
         setConfirmErr("Confirm Password is Required")
     }
      else if(confirmpassword != password){
        setConfirmErr("Confirm Password and Password must be the same ")
     }
    
     else{
         setNameErr("")
         setUsernameErr("")
         setEmailErr("")
         setPhoneErr("")
         setCityErr("")
         setStreetErr("")
         setPassErr("")
         setConfirmErr("")
   
   
         props.navigation.navigate("Profile");
       dispatch(
         registerInitiate(
           email,
           password,
           username,
           phone
         )
       );
       const q = query(
         collection(db, "users"),
         where("email", "==", email)
       );
   
       var newUser;
       const data = await getDocs(q);
       console.log(data);
       data.forEach((doc) => {
         newUser = doc.data();
         console.log(doc.id, " => ", doc.data());
       });
   
       console.log(newUser);
       
   
         if (!newUser && !name&&!username&& !email && !phone && !city && !street &&
            !password && !confirmpassword && nameErr && usernameErr && emailErr && phoneErr && cityErr && streetErr && passErr && confirmErr
         &&passRegErr && emailRegErr ) {
           console.log("email does not exists");
           addDoc(collection(db, "users"), {
            
             name: name,
             username: username,
             password: password,
             email: email.toLowerCase(),
             emailFormated: email,
             image: "",
             role: "customer",
             wishlist: [],
             address: [{ city: city, street: street }],
             messages: [],
             phone: phone,
             cart: [],
             timestamp: serverTimestamp(),
           })
             .then(function (res) {
               alert("added successfuly ");
             })
             .catch(function (error) {
               alert("ERROR " + error);
             });
           // push record to Firebase
         }
       // }
     };
    }
     return(
        <>
            <ScrollView style={{ backgroundColor: '#A0D5D3' }}> 
            <View>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                <Image source={require('../../assets/images/logo.png')} style={{ width: 200, height: 200, marginTop: 25 }}></Image>
                </View>
                {/* <Form onButtonPress={(e)=>handleSubmit(e)} > */}
                  
                <Input label="Name" 
                iconName="user" 
                placeholder="Enter your name" 
                onChangeText={(name) => setName(name)}
                error={nameErr}
                secureTextEntry={false}
                 />

                <Input label="Username" 
                iconName="user-o" 
                placeholder="Enter your username" 
                onChangeText={(username) => setUsername(username)}
                
                error={usernameErr}
                secureTextEntry={false}
                 />

                <Input label="Email address" 
                iconName="key" 
                placeholder="Enter your email address" 
                onChangeText={(email) => setEmail(email)}
                error={emailErr}
                secureTextEntry={false}
                 />

                <Input label="Phone number" 
                iconName="phone" 
                placeholder="Enter your phone number"
                onChangeText={(phone) => setPhone(phone)}
                error={phoneErr}
                secureTextEntry={false}
                 />

                <Input label="Address" 
                iconName="map-marker" 
                placeholder="Enter your city" 
                onChangeText={(city) => setCity(city)}
                error={cityErr}
                secureTextEntry={false}
                 />
                <Input
                iconName="map-marker" 
                placeholder="Enter your street" 
                onChangeText={(street) => setStreet(street)}
                error={streetErr}
                secureTextEntry={false}
                 />

                <Input 
                label="Password" 
                iconName="lock" 
                placeholder="Enter your password" 
                onChangeText={(pass) => setPassword(pass)}
                error={passErr}
                passicon={'eye'}
                 />

                <Input 
                label="Confirm password" 
                iconName="lock" 
                placeholder="Confirm your password" 
                onChangeText={(confirmpass) => setConfirmpassword(confirmpass)}
                error={confirmErr}
                passicon={'eye'}
                 />
               {nameErr || usernameErr || emailErr || phoneErr || cityErr || streetErr || passErr || confirmErr
               ||passRegErr || emailRegErr?<Button title={"SignUp"} onPress={handleSubmit} btnErr={
                  true
                }></Button>:<Button title={"SignUp"} onPress={handleSubmit} btnErr={
                  false
                }></Button>}
             
               
                {/* </Form> */}
            </View>
            </ScrollView>
        </>
     )
}
export default RegCust