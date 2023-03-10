import React from "react";
import {Text, View, Image, ScrollView } from "react-native";
import Button from "./button";
function Register({ navigation }){

    return (
        <>
            <ScrollView style={{ backgroundColor: '#A0D5D3' }}>
            <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <Image source={require('../../assets/images/logo.png')} style={{ width: 200, height: 200, marginTop: 25 }}></Image>
                </View>
                <Button  title="Sign up as a Client" onPress={() => navigation.navigate('Register as client')} />
                <Button title="Sign up as a Customer" onPress={() => navigation.navigate('Register as customer')} />
            </ScrollView>

        </>
    )
}

export default Register