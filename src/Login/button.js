import React from "react";
import { TouchableOpacity , Text} from "react-native";

const Button = ({title, onPress = () => {},btnErr}) => {
    return (
        <TouchableOpacity onPress={onPress}  disabled={btnErr} 
        style={{
            activeOpacity: 0.7,
            height:50,
            margin:50,
            backgroundColor: 'cadetblue',
            justifyContent: 'center',
            alignItems:'center',
            borderRadius: 25
        }}>
            <Text style={{color:'white' , fontSize: 18, fontWeight:'bold'}}>{title}</Text>
        </TouchableOpacity>
    );
}

export default Button