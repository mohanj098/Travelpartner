import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { ANDROID_CLIENT_ID, WEB_CLIENT_ID } from "@env";
import StoreData from "../db/StoreData";
import * as GoogleSignIn from "expo-google-sign-in";

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get("window");

export default function Login({ setauth, setuser }) {
  initAsync = async () => {
    await GoogleSignIn.initAsync({
      clientId: ANDROID_CLIENT_ID,
      webClientId: WEB_CLIENT_ID,
    });
  };

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    const authentication = user.auth;
    const res = authentication.accessToken;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${res}`);
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => {
        StoreData("username", data.given_name).then(
          StoreData("useremail", data.email).then(()=>{
            setuser(data.given_name);
            setauth(true);
          })
        );
      })
      .catch((e) => console.log(e));
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        _syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert("failed in signin");
      console.log(message);
    }
  };
  useEffect(() => {
    initAsync();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => signInAsync()} activeOpacity={0.8}>
        <Image
          style={styles.googlelogo}
          source={require("../assets/google.png")}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Login with google</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: (height - 100) / 2,
  },
  googlelogo: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 15,
  },
});
