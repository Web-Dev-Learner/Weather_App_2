import{ View, Text, StyleSheet, Button, TextInput,Image,TouchableOpacity}from 'react-native'




import React from 'react'
import Constants from 'expo-constants'
import { useState,useRef ,useEffect} from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
const Weather =() =>{
    const [loc,setLoc]=useState("london");
    const [wdata,setWdata]=useState({});
    
    let action=useRef(false);
    //<Button title = "click" onPress={()=>apiData()}/>
    useEffect(()=>{
        if (action.current==false){
            initialData();
            action.current=true;
        }
    },[wdata]);
    async function initialData(){
        const response=await fetch(`https://api.weatherapi.com/v1/current.json?key=b5563401497d4e4dbda81654242303&q=london`,{mode:"cors"});
        let data=await response.json()
        setWdata(data);        
    }
    async function apiData(){
        const response=await fetch(`https://api.weatherapi.com/v1/current.json?key=b5563401497d4e4dbda81654242303&q=${loc}`,{mode:"cors"});
        let data=await response.json()
        setWdata(data); 
    }
    function render_content(){
        if (action.current ==true){
            
            let last_update=wdata.current.last_updated.split(" ");
            let last_time_updated=last_update[1];
           
        return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Weather App</Text>
                
            </View>

           

            <View style={styles.inputContainer}>
            
                <TextInput 

                style={styles.input}



                placeholder="Enter a city"
                value={
                    loc
                }
                onChangeText={
                    (text)=>{setLoc(text)}
                }
                
                />

            <TouchableOpacity style={styles.button} onPress={()=>apiData()}>
            <Feather name="search" size={24} color="black" />
            </TouchableOpacity>
            </View>
           
             
               
      
           

            <View>
                <View style={styles.cityInfo}>

                    <Text style={styles.cityName}>{wdata.location.name}</Text>
                    <Text style={styles.countryName}>{wdata.location.country}</Text>
                </View>
                
                <View style={styles.weatherInfo}>
                <View>
                <Image style={styles.weatherIcon} source={{uri:`http:${wdata.current.condition.icon}` }}/>
                </View>

                <View style={styles.temperature}>
                    <Text style={styles.tempText}>{wdata.current.temp_c}</Text>
                    <MaterialCommunityIcons name="temperature-celsius" size={24} color="black" />
                    </View>

                    <Text style={styles.conditionText}>{wdata.current.condition.text}</Text>
                </View>
            </View>

            <View style={styles.footer}>
              <View style={styles.infoItem}>
                <FontAwesome5 name="wind" size={24} color="black" />
                    <Text>{wdata.current.wind_kph}</Text>
                </View>

                <View style={styles.infoItem}>
                <Ionicons name="water" size={24} color="black" />
                    <Text>{wdata.current.humidity}</Text>
                </View>
                
                <View style={styles.infoItem}> 
                <AntDesign name="clockcircle" size={24} color="black" />
                    <Text>{last_time_updated}</Text>  
                </View>  
            </View>

        </View>
        )
            }
    }
    
    return(
        render_content()
    )
}

export default Weather

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor:'white',
        paddingTop:Constants.statusBarHeight,
       
  
      },
      header:{
          alignItems:'center',
          backgroundColor:'#6a5acd',
          height:80,
          justifyContent:'center',
          
      },
      headerTitle:{
          fontSize:29,
          fontWeight:'bold',
          color: 'white',
          
         
      },
  
     // inputContainer to style the box contain TextInput & Button
     // input style is for TextInput to customize or align 

   

     
      inputContainer: {
          backgroundColor: '#f0f0f0',
          padding: 10,
          margin: 20,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          
      },
      input: {
          flex: 1,
          marginRight: 10,
          paddingVertical: 8,
          paddingHorizontal: 15,
          backgroundColor: '#f0f0f0',
          borderRadius: 5,
          fontSize: 16,
         
          
          
      },
      button:{
           backgroundColor:"gray",
          
          padding: 10,
          borderRadius: 5,
      },
      


     
      cityInfo:{
        flex:1,
        margin:10,
        padding:10,
        alignItems: 'center',
        marginVertical: 20,

      },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    countryName: {
        display:'flex',
        fontSize: 1,
        color: 'black',
        justifyContent:'center',
        alignItems:'center',
        
    },
    weatherInfo:{

        alignItems: 'center',
        justifyContent: 'center',
      },
    weatherIcon: {
        width: 100,
        height: 100,
        marginBottom: 20,
       
    },
    temperature: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tempText: {
        fontSize: 48,
        fontWeight: 'bold',
    },
    conditionText: {
        fontSize: 19,
        color: 'grey',
    },

      
    footer:{

        flexDirection:'row',
        alignContent:'center',
        
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
        paddingHorizontal: 20,
        paddingVertical: 90,

          
    },
    infoItem: {
        alignItems: 'center',
    },
    
   

  
    
});
