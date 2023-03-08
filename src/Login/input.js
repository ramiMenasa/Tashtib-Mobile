import React from "react";
import { View , Text , StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from "react-native-web";
const Input = ({
    label,
    iconName,
    placeholder,
    error,
    password,
    passicon,
    onFocus = () => {},
    onBlur = () => {},
    ...props
}) => { 
    const [IsFocused, setIsFocused] = React.useState(false)
    const [hidePassword , setHidePassword] = React.useState(password)
    return (
        <View 
        style={styles.container} >
            <Text style={styles.label}>{label}</Text>
            <View style={styles.input}>
                <Icon style={styles.icon} name={iconName} size={20} color={'darkblue'}> </Icon>
                <TextInput 
                placeholder={placeholder}
                secureTextEntry = {!hidePassword}
                autoCorrect = {false}
                onFocus = {() =>{
                    onFocus(),
                    setIsFocused(true)
                }} 
                onBlur = {() => {
                    setIsFocused(false)
                }}
                style={styles.textinput} 
                {...props}
                ></TextInput>
                <Icon 
                    onPress={() => setHidePassword(!hidePassword)}
                    name={passicon} size={15} color={'darkblue'}></Icon>
                
               
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
        display: "inline-block",
        borderColor: 'cadetblue',
        borderRadius:25,  
    },
    textinput :{
        height:40,
        outlineStyle: 'none',
        color: 'darkblue' ,
        width: '80%',
    },
    icon:{
        margin:10,
        marginLeft:20
    }
})
export default Input