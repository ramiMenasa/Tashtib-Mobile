import {Text, View, Image, ScrollView, Keyboard } from "react-native";
import Button from "./button";
import Input from "./input";
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Formik } from "formik"
// import * as Yup from 'yup'
import React from "react";

function Login({ navigation }) {
    const [inputs, setInputs] = React.useState({
        email: '',
        password: ''
    }); 
    const [errors, setErrors] = React.useState({});
    // const {email, password} = userInfo

    const validate = () => {
        Keyboard.dismiss();
        if(!inputs.email){
            handleError('Please enter valid email' , 'email');
        }
    };
    const handleOnChange = (text, input) => {
        setInputs(prevState => ({...prevState, [input] :text}))
    };

    // const handleOnChange = (value, fieldName) => {
    //     setInputs({...userInfo , [fieldName]:value})
    // };

    const handleError = (errorMessage , input) => {
        setErrors(prevState => ({...prevState, [input]: errorMessage}))
    };
    return (
        <>
            <ScrollView style={{ backgroundColor: '#A0D5D3' }}>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <Image source={require('../../assets/images/logo.png')} style={{ width: 200, height: 200, marginTop: 25 }}></Image>
                </View>
                <Input label="Email" 
                iconName="user" 
                placeholder="Enter your email address"
                error={Input.length==0? "Please enter your name": " "} 
                // error={errors.email} 
                // onFocus={() => {
                //     handleError(null, 'email');
                // }}
                secureTextEntry={false}
                // onChangeText={text => handleOnChange(text, 'email')}
                 />
                <Input 
                label="Password" 
                iconName="lock" 
                placeholder="Enter your password" 
                // error="Enter an valid password" 
                error={Input.length==0? "Please enter your name": " "}
                passicon={'eye'}
                // onChangeText={text => handleOnChange(text, 'password')}
                 />
                <Button title="Login" onPress={validate} />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, textAlign: 'center', justifyContent: 'center' }}>Or create new account :
                        <Text style={{ color: 'royalblue' }} onPress={() => navigation.navigate('Register')}> Sign up </Text>
                    </Text>
                    {/* <br /> */}
                </View>
            </ScrollView>
        </>
    );
}

export default Login