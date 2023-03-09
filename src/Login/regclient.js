import React from "react";
import { ScrollView, View , Image } from "react-native";
import Button from "./button";
// import { Dropdown } from "react-native-material-dropdown";
import Input from "./input";
function RegClient(){
   // let role = [{
   //    value: 'Engineer'
   // }, 
   // {
   //    value: 'Provider'
   // }]
     return(
        <>
        <ScrollView style={{ backgroundColor: '#A0D5D3' }}> 
            <View>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    {/* <Image source={require('./splash.png')} style={{ width: 200, height: 200, marginTop: 25 }}></Image> */}
                    <Image source={require('../../assets/images/logo.png')} style={{ width: 200, height: 200, marginTop: 25 }}></Image>

                </View>
                <Input label="Name" 
                iconName="user" 
                placeholder="Enter your name" 
                // error={Input.length==0? "Please enter your name": " "}
                secureTextEntry={false}
                 />

                <Input label="Username" 
                iconName="user-o" 
                placeholder="Enter your username" 
                secureTextEntry={false}
                 />

                <Input label="Email address" 
                iconName="map-marker" 
                placeholder="Enter your email address" 
                secureTextEntry={false}
                 />

                <Input label="Phone number" 
                iconName="phone" 
                placeholder="Enter your phone number" 
                secureTextEntry={false}
                 />

                <Input 
                label="Password" 
                iconName="lock" 
                placeholder="Enter your password" 
                // error="Enter an valid password" 
                passicon={'eye'}
                 />

                <Input 
                label="Confirm password" 
                iconName="lock" 
                placeholder="Confirm your password" 
                // error="Enter an valid password" 
                passicon={'eye'}
                 />
               {/* <Dropdown label="Select your role"
               data={role} /> */}
                <Button title="Sign up" onPress={()=> console.log("signed up")} />
              
            </View>
            </ScrollView>
        </>
     )
}
export default RegClient
