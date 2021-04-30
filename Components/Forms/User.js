import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as yup from "yup";
import StoreData from "../../db/StoreData";
import Getdata from "../../db/GetData";

const Reviewschema = yup.object({
  name: yup.string().required("Name is required"),
  ecode: yup.string().required("Code is required"),
  dept: yup.string().required("Department is required"),
  desig: yup.string().required("Designtion is required"),
  pay: yup
    .number()
    .required("Basic Pay is required")
    .typeError("Must be a Number"),
  account: yup
    .number()
    .required("Account number is required")
    .typeError("Must be a Number"),
});

const {width, height} = Dimensions.get('window')

export default function User(props) {
  const [data, setdata] = useState([]);
  const [load, setload] = useState(true);
  useEffect(() => {
    Getdata("user")
      .then((value) => JSON.parse(value))
      .then((result) => {
        setdata(result);
        setload(false);
      })
      .catch((e) => console.log(e));
  }, [load]);
  const [namea, setnamea] = useState(false);
  const [codea, setcodea] = useState(false);
  const [desa, setdesa] = useState(false);
  const [depa, setdepa] = useState(false);
  const [paya, setpaya] = useState(false);
  const [acca, setaccaa] = useState(false);

  if (load) {
    return (
      <View
        style={{
          backgroundColor: "#d5def5",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  } else {
    return (
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.usercontainer}>
          <Text style={styles.usertop}>user details</Text>
          <Formik
            initialValues={
              data
                ? data
                : {
                    name: "",
                    ecode: "",
                    dept: "",
                    desig: "",
                    pay: "",
                    account: "",
                  }
            }
            onSubmit={(values) => {
              const finalvalues = {
                name: values.name.trim(),
                ecode: values.ecode.trim(),
                dept: values.dept.trim(),
                desig: values.desig.trim(),
                pay: values.pay.trim(),
                account: values.account.trim(),
              };
              StoreData("user", finalvalues).then(props.setshow(false));
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
              <View style={styles.userform}>
                <View style={styles.box}>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={styles.info}>Name</Text>
                    <Text style={{ color: "red" }}>*</Text>
                  </View>
                  <TextInput
                    style={
                      namea === true ? styles.userinputactive : styles.userinput
                    }
                    placeholder="Name"
                    onChangeText={handleChange("name")}
                    onBlur={() => {
                      setnamea(false);
                      touched.name = true;
                    }}
                    value={values.name}
                    onFocus={() => {
                      setnamea(true);
                    }}
                  />
                  <Text style={styles.usererror}>
                    {touched.name && errors.name}
                  </Text>
                </View>
                <View style={styles.box}>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={styles.info}>Employee Code</Text>
                    <Text style={{ color: "red" }}>*</Text>
                  </View>
                  <TextInput
                    style={
                      codea === true ? styles.userinputactive : styles.userinput
                    }
                    placeholder="Employee Code"
                    onChangeText={handleChange("ecode")}
                    onBlur={() => {
                      touched.ecode = true;
                      setcodea(false);
                    }}
                    value={values.ecode}
                    onFocus={() => {
                      setcodea(true);
                    }}
                  />
                  <Text style={styles.usererror}>
                    {touched.ecode && errors.ecode}
                  </Text>
                </View>
                <View style={styles.box}>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={styles.info}>Department</Text>
                    <Text style={{ color: "red" }}>*</Text>
                  </View>
                  <TextInput
                    style={
                      depa === true ? styles.userinputactive : styles.userinput
                    }
                    placeholder="Department/Center"
                    onChangeText={handleChange("dept")}
                    onBlur={() => {
                      touched.dept = true;
                      setdepa(false);
                    }}
                    value={values.dept}
                    onFocus={() => {
                      setdepa(true);
                    }}
                  />
                  <Text style={styles.usererror}>
                    {touched.dept && errors.dept}
                  </Text>
                </View>
                <View style={styles.box}>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={styles.info}>Designation</Text>
                    <Text style={{ color: "red" }}>*</Text>
                  </View>
                  <TextInput
                    style={
                      desa === true ? styles.userinputactive : styles.userinput
                    }
                    placeholder="Designation"
                    onChangeText={handleChange("desig")}
                    onBlur={() => {
                      touched.desig = true;
                      setdesa(false);
                    }}
                    value={values.desig}
                    onFocus={() => {
                      setdesa(true);
                    }}
                  />
                  <Text style={styles.usererror}>
                    {touched.desig && errors.desig}
                  </Text>
                </View>
                <View style={styles.box}>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={styles.info}>Basic Pay(in rupees)</Text>
                    <Text style={{ color: "red" }}>*</Text>
                  </View>
                  <TextInput
                    style={
                      paya === true ? styles.userinputactive : styles.userinput
                    }
                    placeholder="Basic Pay with grade pay"
                    onChangeText={handleChange("pay")}
                    onBlur={() => {
                      touched.pay = true;
                      setpaya(false);
                    }}
                    value={values.pay}
                    keyboardType="numeric"
                    onFocus={() => {
                      setpaya(true);
                    }}
                  />
                  <Text style={styles.usererror}>
                    {touched.pay && errors.pay}
                  </Text>
                </View>
                <View style={styles.box}>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={styles.info}>Account Number</Text>
                    <Text style={{ color: "red" }}>*</Text>
                  </View>

                  <TextInput
                    style={
                      acca === true ? styles.userinputactive : styles.userinput
                    }
                    placeholder="Bank Account number"
                    onChangeText={handleChange("account")}
                    onBlur={() => {
                      touched.account = true;
                      setaccaa(false);
                    }}
                    value={values.account}
                    keyboardType="numeric"
                    onFocus={() => {
                      setaccaa(true);
                    }}
                  />
                  <Text style={styles.usererror}>
                    {touched.account && errors.account}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#129620",
                    height: 35,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 15,
                  }}
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                >
                  <Text style={{ color: "#fff" }}>SAVE</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <StatusBar style="auto" />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  usercontainer: {
    alignSelf: "center",
    flex: 1,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "#f0f3fa",
    marginVertical: (height-600)/2
  },
  usertop: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    margin: 5,
  },
  userform: {
    marginTop: 10,
    width: "70%",
  },
  userinput: {
    borderWidth: 1,
    marginTop: 3,
    shadowRadius: 3,
    borderRadius: 5,
    height: 35,
    textAlign: "left",
    fontSize: 15,
    paddingLeft: 5,
    marginBottom: 3,
  },
  usererror: {
    color: "red",
    fontSize: 15,
    marginVertical: 0,
  },
  box: {
    marginTop: 2,
  },
  info: {
    fontSize: 15,
    fontWeight: "bold",
  },
  userinputactive: {
    borderWidth: 2,
    marginTop: 3,
    shadowRadius: 3,
    borderRadius: 5,
    height: 35,
    textAlign: "left",
    fontSize: 15,
    paddingLeft: 5,
    marginBottom: 3,
    borderColor: "blue",
  },
});
