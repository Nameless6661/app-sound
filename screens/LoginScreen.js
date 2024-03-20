import { StyleSheet, Text, View, SafeAreaView, Pressable, Button } from "react-native";
import React ,{useEffect} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as AppAuth from "expo-app-auth";
import AsyncStore from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";




const LoginScreen = () => {
     const navigation = useNavigation();
    useEffect(() => {
        const checkTokenValidity = async () => {
            const accessToken = await AsyncStore.getItem("token");
            const expirationDate = await AsyncStore.getItem("expirationDate");
            console.log("access token", accessToken);
            console.log("expiration date", expirationDate);

            if(accessToken && expirationDate){
                const currentTime = Date.now();
                if(currentTime < parseInt(expirationDate)){
                    //aqui el token aun es valido
                    navigation.replace("Main");
                }else{
                    //token se expira asi que necesitamos quitarlo del async storage
                    AsyncStore.removeItem("token");
                    AsyncStore.removeItem("expirationDate");
                }
            }
        }

        checkTokenValidity();
    },[])
    async function authenticate () {
        const config ={
            issuer:"https://accounts.spotify.com",
            clientId:"fd3a9256d01d4ad9897aa4626610a116",
            scopes:[
                "user-read-email",
                "user-library-read",
                "user-read-recently-played",
                "user-top-read",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public"
            ],
            redirectUrl:"exp://192.168.100.12:8081/--/spotify-auth-callback"
        }
        const result = await AppAuth.authAsync(config);
        console.log(result);
        console.log(redirectUrl)
        if(result.accessToken){
            const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
            AsyncStore.setItem("token",result.accessToken);
            AsyncStore.setItem("expirationDate", expirationDate.toString());
            navigation.navigate("Main")
        }
    }

    const handleLogin = () =>{
      navigation.navigate("Main")
    }
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <MaterialCommunityIcons
          style={{ textAlign: "center" }}
          name="music-circle"
          size={80}
          color="white"
        />
        <Button title="Login" onPress={handleLogin}/>
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Millones de canciones gratis en SounVibes!
        </Text>
          
        <View style={{ height: 80 }} />
        <Pressable
          style={{
            backgroundColor: "#1DB954",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginVertical:10
          }}
        >
          <Text>Iniciar sesión con SoundVibes </Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
          }}
        >
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text style={{fontWeight:"500", color:"white", textAlign:"center", flex:1}}>Continuar con número telefónico </Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
          }}
        >
          <AntDesign name="google" size={24} color="red" />
          <Text style={{fontWeight:"500", color:"white", textAlign:"center", flex:1}}>Continuar con Google </Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
          }}
        >
          <Entypo name="facebook" size={24} color="blue" />
          <Text style={{fontWeight:"500", color:"white", textAlign:"center", flex:1}}>Iniciar sesión con Facebook </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
