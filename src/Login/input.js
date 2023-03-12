import React from "react";
import { View , Text , StyleSheet,TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
// import { TextInput } from "react-native-web";
const Input = ({
    label,
    iconName,
    name,
    placeholder,
    error,
    password,
    passicon,
    ...props
}) => { 
    const [hidePassword , setHidePassword] = React.useState(password)
    
    return (
        <View 
        style={styles.container} >
            <Text style={styles.label}>{label}</Text>
            <View style={styles.input}>
                <Icon style={styles.icon} name={iconName} size={20} color={'darkblue'}> </Icon>
                <TextInput 
                
                name={name}
                placeholder={placeholder}
                secureTextEntry = {!hidePassword}
                autoCorrect = {false}
                style={styles.textinput} 
                {...props}
                ></TextInput>
                <Icon 
                    onPress={() => setHidePassword(!hidePassword)}
                    name={passicon} style={styles.iconEye} size={15} color={'darkblue'}></Icon>
                
               
            </View>
            {error && (
                <Text style={{color:'red'}}>{error}</Text>
            )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        margin:10,
        justifyContent:'center'
        // borderColor: error
        // ? 'red'
        // : IsFocused 
        // ? 'darkblue' 
        // : 'gray'
    },
    label:{
        fontSize:18,
        color: "darkblue",
        marginBottom:10
    },
    input: {
        backgroundColor: 'ghostwhite',
        height: 50,
        borderWidth:2,
        flex:1,
        flexDirection:'row',
        borderColor: 'cadetblue',
        borderRadius:25,  
    },
    textinput :{
        height:40,
        color: 'darkblue' ,
        width: '80%',
    },
    icon:{
        margin:10,
        marginLeft:20
    },
    iconEye:{
        marginTop:10,
    }

})
export default Input