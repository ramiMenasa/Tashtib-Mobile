import {Text, View, Image, ScrollView, Keyboard } from "react-native";
import Button from "./button";
import Input from "./input";
import { useState,useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { loginInitiate } from "../Store/Actions/AuthAction";
import { NavigationContainer } from "@react-navigation/native";

function Login(props) {

const { currentUser } = useSelector((state) => state.user)
 const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("")
  const [passErr, setPassErr] = useState("")

  useEffect(() => {
    console.log(currentUser)
    if(currentUser){
        props.navigation.navigate("Profile");
    }
  }, [currentUser])
  const handleSubmit = () => {
    // e.preventDefault()

    dispatch(loginInitiate(email, password))
    
    if(email.length== 0){
        setEmailErr("Email is Required")
    }else{
        setEmailErr("")
    }

    if(password.length == 0){
        setPassErr("Password is Required")
    }else{
        setPassErr("")
    }
}
    return (
        <>
            <ScrollView style={{ backgroundColor: '#A0D5D3'}}>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <Image source={require('../../assets/images/logo.png')} style={{ width: 200, height: 200, marginTop: 25 }}></Image>
                </View>
                <Input label="Email" 
                iconName="user" 
                placeholder="Enter your email address"
                onChangeText={(email) => setEmail(email)}
                error={emailErr}
                secureTextEntry={false}
                 />

                <Input 
                label="Password" 
                iconName="lock" 
                placeholder="Enter your password" 
                error={passErr}
                onChangeText={(password) => setPassword(password)}
                passicon={'eye'}
                 />
                <Button title="Login" onPress={() => handleSubmit()}/>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, textAlign: 'center', justifyContent: 'center' }}>Or create new account :
                        <Text style={{ color: 'royalblue' }} onPress={() => props.navigation.navigate('Register')}> Sign up </Text>
                    </Text>
                    {/* <br /> */}
                </View>
            </ScrollView>
        </>
    );
}

export default Login
