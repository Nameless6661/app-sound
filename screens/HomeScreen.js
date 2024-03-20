import { StyleSheet, Text, SafeAreaView, ScrollView, View, Image, Pressable, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";

const HomeScreen = () => {
  const [userProfile, setUserProfile] = useState();
  const [recentlyplayed, setRecentlyPlayed] = useState([]);

  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if(currentTime < 12){
      return "Buenos Dias";
    }else if(currentTime < 16){
      return "Buenas Tardes";
    }else{
      return "Buenas Noches"
    }
  }
  const message = greetingMessage();
  const getProfile = async () =>{
    const accessToken = await AsyncStorage.getItem("token");
    try{
      const response = await fetch("https://api.spotify.com/v1/me",{
        headers:{
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setUserProfile(data);
      return data;
    }catch(err){
      console.log(err.message)
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  console.log(userProfile);
  const getRecentlyPlayedSongs = async() =>{
    const accessToken = await AsyncStorage.getItem("token");
    try{
      const response = await axios({
        method:"GET",
        url:"https://api.spotify.com/v1/me/player/recently-played?limit=4",
        headers:{
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const tracks = response.data.items
      setRecentlyPlayed(tracks);

    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getRecentlyPlayedSongs();
  },[])
  console.log(recentlyplayed)
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{flex:1}}>
    <ScrollView style={{marginTop:50}}>
      <View style={{padding:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              resizeBody: "cover",
            }}
            source={{}}
          />
          <Text style={{marginLeft:10,fontSize:20, fontWeight:"bold", color:"white" }}>{message}</Text>
        </View>

        <MaterialCommunityIcons name="lightning-bolt-outline" size={24} color="white" />
      </View>

      <View style={{marginHorizontal:12, marginVertical:5, flexDirection:"row", alignItems:"center",gap:10}}>
        <Pressable style={{backgroundColor:"#282828", padding:10, borderRadius:30}}>
            <Text style={{fontSize:15,color:"white"}}>Música</Text>
        </Pressable>

        <Pressable style={{backgroundColor:"#282828", padding:10, borderRadius:30}}>
            <Text style={{fontSize:15,color:"white"}}>Podcasts & shows</Text>
        </Pressable>
      </View>

      <View style={{height:10}}/>

      <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-between"}}>

        <Pressable
        style={{
          marginBottom:10,
          flexDirection:"row",
          alignItems:"center",
          gap:10,
          flex:1,
          marginHorizontal:10,
          marginVertical:8,
          backgroundColor:"#202020",
          borderRadius:4,
          elevation:3,

        }}
        
        >
          <LinearGradient colors={["#33006F", "#FFFFFF"]}>
            <Pressable style={{width:55,height:55,justifyContent:"center",alignItems:"center"}}>
            <AntDesign name="heart" size={24} color="white" />
            </Pressable>
          </LinearGradient>

          <Text style={{color:"white",fontSize:13,fontWeight:"bold"}}>
            Tus me gusta
          </Text>
        </Pressable>

        <View style={{
          marginBottom:10,
          flexDirection:"row",
          alignItems:"center",
          gap:10,
          flex:1,
          marginHorizontal:10,
          marginVertical:8,
          backgroundColor:"#202020",
          borderRadius:4,
          elevation:3,

        }}>

          <Image style={{width:55,height:55}} source={{uri:"https://i.pravatar.cc/100"}}/>
          <View style={styles.randomArtist}>
            <Text style={{color:"white",fontSize:13,fontWeight:"bold"}}>
              Hiphop Tamhiza
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})