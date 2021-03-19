import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as yup from "yup";
import Addother from "../../db/Addother";

const Reviewschema = yup.object({
  detail: yup.string().required(),
  amountpaid: yup
  .number()
  .typeError("Must be a Number")
  .positive("Invalid, Only positive numbers are allowed")
  .required("Amount Paid is required"),
  receipt: yup.string().required()

})

export default function Others(props) {
  const navigate=props.navigate
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.othercontainer}>
        <Text style={styles.othertop}>Other Expenses</Text>
        <Formik
          initialValues={{ detail: "", amountpaid: "", receipt: "" }}
          onSubmit={(values) => Addother(values, props.showother,props.index)}
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
            <View style={styles.otherform}>
              <TextInput
                style={styles.otherinput}
                placeholder="Enter Details"
                onChangeText={handleChange("detail")}
                value={values.detail}
                onBlur={handleBlur("detail")}
              />
              <Text style={styles.otherforerror}>
                {touched.detail && errors.detail}
              </Text>
              <TextInput
                style={styles.otherinput}
                placeholder="Amountpaid"
                onChangeText={handleChange("amountpaid")}
                value={values.amountpaid}
                onBlur={handleBlur("amountpaid")}
              />
              <Text style={styles.otherforerror}>
                {touched.amountpaid && errors.amountpaid}
              </Text>
              <TextInput
                style={styles.otherinput}
                placeholder="receipt details"
                onChangeText={handleChange("receipt")}
                value={values.receipt}
                onBlur={handleBlur("receipt")}
              />
              <Text style={styles.otherforerror}>
                {touched.receipt && errors.receipt}
              </Text>
              <Button onPress={handleSubmit} color="green" title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  othercontainer: {
    textAlign: "center",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    opacity: 0.8,
  },
  othertop: {
    fontSize: 25,
    marginTop: 40,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  otherform: {
    marginTop: 60,
    width: "90%",
  },
  otherinput: {
    borderColor: "black",
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,
    height: 40,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 3,
  },
  otherforerror:{
    color: "red",
  }
});
