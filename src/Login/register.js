import React from "react";
import {Text, View, Image, ScrollView } from "react-native";
import Button from "./button";
function Register({ navigation }){

    return (
        <>
            <ScrollView style={{ backgroundColor: '#ADD4D3' }}>
            <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <Image source={require('../../assets/images/logo.png')} style={{ width: 200, height: 200, marginTop: 25 }}></Image>
                </View>
                <Button  title="Sign up as a Client" onPress={() => navigation.navigate('regclient')} />
                <Button title="Sign up as a Customer" onPress={() => navigation.navigate('regcust')} />
            </ScrollView>

        </>
    )
}

export default Register