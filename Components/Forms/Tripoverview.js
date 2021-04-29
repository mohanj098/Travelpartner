import React from "react";
import { StyleSheet, Text, TextInput, View, Button, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as yup from "yup";
import AddTrip from "../../db/AddTrip";

const Reviewschema = yup.object({
  title: yup.string().required(),
});

const SendtoTrip = async (values) => {
  try {
    const value = await AddTrip(values);
    if (value === true) {
      Alert.alert("Trip added click on card to know more");
    } else {
      console.log("false");
    }
  } catch (e) {
    console.log(e);
  }
};

export default function Tripoverview({navigation }) {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.tripovercontainer}
    >
      <Formik
        initialValues={{ title: "" }}
        onSubmit={(value) => {
          const values={title: value.title.toLowerCase()}
          SendtoTrip(values)
            .then(()=>{navigation.navigate("Home")})
            .catch((e) => {
              console.log(e);
            });
        }}
        validationSchema={Reviewschema}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.tripform}>
            <TextInput
              style={styles.triptitle}
              placeholder="Title of Trip"
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
            />
            <Text style={styles.triperror}>
              {touched.title && errors.title}
            </Text>
            <View style={styles.tripbutton}>
              <Button
                color="green"
                marginTop={17}
                onPress={handleSubmit}
                title="Save"
              />
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  tripovercontainer: {
    marginTop: 45,
    flex: 1,
    width: "100%",
  },
  tripform: {
    marginTop: 30,
    justifyContent: "space-evenly",
  },
  tripbutton: {
    marginTop: 40,
    marginHorizontal: "15%",
  },
  triptitle: {
    borderBottomWidth: 2,
    borderColor: "black",
    width: "90%",
    margin: "5%",
    height: 50,
    fontSize: 15,
  },
  triperror: {
    color: "red",
    marginHorizontal: "5%",
  },
});
