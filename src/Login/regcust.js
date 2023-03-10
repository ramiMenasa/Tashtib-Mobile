import React from "react";
import { ScrollView, View , Image } from "react-native";
import Button from "./button";
import Input from "./input";
import { useState } from "react";
// import { useSelector , useDispatch } from "react-redux";
// import { db } from "../../firebase";
// import {
//   collection,
//   onSnapshot,
//   query,
//   limit,
//   getDocs,
//   where,
//   updateDoc,
//   doc
// } from "firebase/firestore";
// import {registerInitiate} from '../Store/Actions/AuthAction'
// import { ToastContainer , toast } from "@jamsch/react-native-toastify";
// import "@jamsch/react-native-toastify"

const reg = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+).*$/);
const regPass = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
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
    const [phoneErr, setPhoneErr] = useState("")
    const [cityErr, setCityErr] = useState("")
    const [streetErr, setStreetErr] = useState("")
    const [passErr, setPassErr] = useState("")
    const [confirmErr, setConfirmErr] = useState("")

    const handleSubmit = () => {
        if(name.length == 0){
           setNameErr("Name is Required")
        }
        else if (name.length < 3){
           setNameErr("Name must be more than 3 char")
        }
        else {
           setNameErr("")
        }
        if(username.length == 0){
           setUsernameErr("Username is Required")
        }
        else if (username.length < 3){
           setUsernameErr("Username must be more than 3 char")
        }
        else {
           setUsernameErr("")
        }
        if(email.length == 0){
            setEmailErr("Email is Required")
        }
        else if(!reg.test(email)) {
           setEmailRegErr(true)
           setEmailErr("Invalid  email address")
        }
        else{
            setEmailErr("")
        }
        if(phone.length == 0){
           setPhoneErr("Phone is Required")
        }
        else if (phone.length < 3){
           setPhoneErr("Phone must be 11 number")
        }
        else {
           setPhoneErr("")
        }
        if(city.length == 0){
           setCityErr("City is Required")
        }
        else if (city.length < 3){
           setCityErr("City must be 3 char or more")
        }
        else {
           setCityErr("")
        }
        if(street.length == 0){
           setStreetErr("Street is Required")
        }
        else if (street.length < 3){
           setStreetErr("Street must be 3 char or more")
        }
        else {
           setStreetErr("")
        }
        if(password.length == 0){
            setPassErr("Password is Required")
        }
        else if(password.length < 8){
           setPassErr("Password must be more than 8 ")
        }
        else if (!regPass.test(password))
        {
           setPassRegErr(true)
           setPassErr("Invalid password")
        }
        else{
            setPassErr("")
        }
        if(confirmpassword.length == 0){
           setConfirmErr("Confirm Password is Required")
       }
        else if(confirmpassword != password){
          setConfirmErr("Confirm Password and Password must be the same ")
       }
        else{
           setConfirmErr("")
       }
    }
    // const history = useHistory();
    // const { currentUser } = useSelector((state) => state.user);
    //   useEffect(() => {
    //     if (currentUser) {
    //       //   console.log(currentUser);
    //       history.push("profile");
    //     }
    //   }, [currentUser, history]);   
    //   const submitData = async (e) => {
    //     e.preventDefault();
    //     dispatch(
    //       registerInitiate(
    //         userData.email,
    //         userData.password,
    //         userData.username,
    //         userData.phone
    //       )
    //     );
    
    //     const q = query(
    //       collection(db, "users"),
    //       where("email", "==", userData.email)
    //     );
    
    //     var newUser;
    //     const data = await getDocs(q);
    //     console.log(data);
    //     data.forEach((doc) => {
    //       newUser = doc.data();
    //       console.log(doc.id, " => ", doc.data());
    //     });
    
    //     console.log(newUser);
    //     console.log(userData.email)
    
    //     // if(userData.email !== ""){
    //       if (!newUser) {
    //         // handle error
    //         // toast("email already in use !");
    //         // alert("email already in use");
    //       // } else {
    //         console.log("email does not exists");
    //         addDoc(collection(db, "users"), {
    //           // ...userData,
    //           name: userData.name,
    //           username: userData.username,
    //           password: userData.password,
    //           email: userData.email.toLowerCase(),
    //           emailFormated: userData.email,
    //           image: "",
    //           role: "customer",
    //           wishlist: [],
    //           address: [{ city: userData.city, street: userData.street }],
    //           messages: [],
    //           phone: userData.phone,
    //           cart: [],
    //           timestamp: serverTimestamp(),
    //         })
    //           .then(function (res) {
    //             alert("added successfuly ");
    //           })
    //           .catch(function (error) {
    //             alert("ERROR " + error);
    //           });
    //         // push record to Firebase
    //       }
    //     // }
    //   };
     return(
        <>
            <ScrollView style={{ backgroundColor: '#ADD4D3' }}> 
            <View>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <Image source={require('../../assets/images/logo.png')} style={{ width: 200, height: 200, marginTop: 25 }}></Image>
                </View>
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
                iconName="url" 
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

                <Button title="Sign up" onPress={handleSubmit} />
            </View>
            </ScrollView>
        </>
     )
}
export default RegCust