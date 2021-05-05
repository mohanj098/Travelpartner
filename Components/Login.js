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
import * as AuthSession from "expo-auth-session"

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get("window");

export default function Login({ setshow }) {
  const redirectUri= AuthSession.makeRedirectUri({native: 'myapp/oauthredirect', useProxy: true});
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "615841166081-huvhd1k6p8ie6033caccalp89dkca4lt.apps.googleusercontent.com",
    androidClientId:ANDROID_CLIENT_ID,
    webClientId : WEB_CLIENT_ID,
    scopes: [
      "https://www.googleapis.com/auth/drive.appdata",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.apps.readonly",
      "https://www.googleapis.com/auth/drive",
      "profile",
      "email",
    ],

  });
  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log(response);
      StoreData("authtoken", authentication.accessToken).then(() => {
        setshow(false);
      });
    } else {
      console.log(response);
    }
  }, [response]);

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
