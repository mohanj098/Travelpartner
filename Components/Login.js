import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { ANDROID_CLIENT_ID, WEB_CLIENT_ID } from "@env";
import StoreData from "../db/StoreData";
import * as AuthSession from "expo-auth-session";
import firebase, { auth } from "firebase";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
  });
}

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get("window");

export default function Login({ setshow }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "615841166081-huvhd1k6p8ie6033caccalp89dkca4lt.apps.googleusercontent.com",
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    scopes: ["profile", "email"],
  });
  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      const res = authentication.accessToken;
      console.log(authentication);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${res}`);
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      })
      .then(response=>response.json())
      .then(data=>{
        StoreData('username', data.given_name).then(
          StoreData('useremail', data.email).then(
            setshow(true)
          )
        )
      })
      .catch(e=>console.log(e))
    } else {
      console.log(response);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => promptAsync()} activeOpacity={0.8}>
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
