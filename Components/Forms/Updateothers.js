import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import Getdata from "../../db/GetData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Reviewschema = yup.object({
  detail: yup.string().required(),
  amountpaid: yup
    .number()
    .typeError("Must be a Number")
    .positive("Invalid, Only positive numbers are allowed")
    .required("Amount Paid is required"),
});

const {width, height} = Dimensions.get("window")
export default function Others(props) {
  const index = props.index;
  const subindex = props.subindex;
  const indata = props.data;
  const setupdate= props.setupdate;
  const extra=props.extra;
  const setextra=props.setextra;
  const [acdet, setdet] = useState(false);
  const [acpaid, setpaida] = useState(false);
  const [acrec, setres] = useState(false);
  const [accard, setcard] = useState(false);
  const [acstore, setstore] = useState(false);

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.othercontainer}>
        <Text style={styles.othertop}>Other Expense</Text>
        <Formik
          initialValues={{
            detail: indata[0],
            amountpaid: indata[1],
            receipt: indata[2],
            payment: indata[3],
            stored: indata[4],
          }}
          onSubmit={(values) => {
            const finalvalue = {
              detail: values.detail.trim(),
              amountpaid: values.amountpaid.trim(),
              receipt: values.receipt.trim(),
              payment: values.payment.trim(),
              stored: values.stored.trim(),
            };
            Getdata("trip")
              .then((value) => JSON.parse(value))
              .then((result) => {
                var value=result;
                value[index].othertotal+=(parseInt(finalvalue.amountpaid) - parseInt(indata[1]));
                value[index].total+=(parseInt(finalvalue.amountpaid) - parseInt(indata[1]));
                value[index].other[subindex]=finalvalue;
                AsyncStorage.setItem('trip', JSON.stringify(value)).then(()=>{setextra(!extra); setupdate([false, null, null])})
                .catch(e=>console.log(e));
              })
              .catch((e) => console.log(e))
              .catch((e) => {
                console.log(e);
              });
          }}
          validationSchema={Reviewschema}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldTouched,
          }) => (
            <View style={styles.otherform}>
              <View style={styles.box}>
                <View style={{flexDirection: "row" }}>
                  <Text style={styles.info}>Details</Text>
                  <Text style={{ color: "red" }}>*</Text>
                </View>
                <TextInput
                  style={
                    acdet === true ? styles.otherinputactive : styles.otherinput
                  }
                  placeholder="Enter Details"
                  onChangeText={handleChange("detail")}
                  value={values.detail}
                  onBlur={() => {
                    setFieldTouched("detail", true);
                    setdet(false);
                  }}
                  onFocus={() => {
                    setdet(true);
                  }}
                />
                <Text style={styles.otherforerror}>
                  {touched.detail && errors.detail}
                </Text>
              </View>
              <View style={styles.box}>
                <View style={{  flexDirection: "row" }}>
                  <Text style={styles.info}>Amount Paid(in rupees)</Text>
                  <Text style={{ color: "red" }}>*</Text>
                </View>
                <TextInput
                  style={
                    acpaid === true
                      ? styles.otherinputactive
                      : styles.otherinput
                  }
                  placeholder="Amountpaid"
                  keyboardType="numeric"
                  onChangeText={handleChange("amountpaid")}
                  value={values.amountpaid}
                  onBlur={() => {
                    setFieldTouched("amountpaid", true);
                    setpaida(false);
                  }}
                  onFocus={() => {
                    setpaida(true);
                  }}
                />
                <Text style={styles.otherforerror}>
                  {touched.amountpaid && errors.amountpaid}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.info}>Receipt Details(to be shared)</Text>
                <TextInput
                  style={
                    acrec === true ? styles.otherinputactive : styles.otherinput
                  }
                  onChangeText={handleChange("receipt")}
                  value={values.receipt}
                  onBlur={() => {
                    setres(false);
                  }}
                  onFocus={() => {
                    setres(true);
                  }}
                />
                <Text style={styles.otherforerror}>
                  {touched.receipt && errors.receipt}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.info}>
                  Payment Details(for your refrence only)
                </Text>
                <TextInput
                  style={
                    accard === true
                      ? styles.otherinputactive
                      : styles.otherinput
                  }
                  onChangeText={handleChange("payment")}
                  placeholder="e.g. Card used for payment"
                  value={values.payment}
                  onBlur={() => {
                    setcard(false);
                  }}
                  onFocus={() => {
                    setcard(true);
                  }}
                />
                <Text style={styles.otherforerror}>
                  {touched.payment && errors.payment}
                </Text>
              </View>

              <View style={styles.box}>
                <Text style={styles.info}>
                  Receipt Details(for your refrence only)
                </Text>
                <TextInput
                  style={
                    acstore === true
                      ? styles.otherinputactive
                      : styles.otherinput
                  }
                  placeholder="e.g. Receipt located at"
                  onChangeText={handleChange("stored")}
                  value={values.stored}
                  onBlur={() => {
                    setstore(false);
                  }}
                  onFocus={() => {
                    setstore(true);
                  }}
                />
                <Text style={styles.otherforerror}>
                  {touched.stored && errors.stored}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                activeOpacity={0.8}
              >
                <Text style={{ color: "white" }}>SAVE</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  othercontainer: {
    backgroundColor: "#d5def5",
    marginTop: 20,
    textAlign: "center",
    flex: 1,
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  othertop: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  otherform: {
    marginTop: 10,
    width: "100%",
    padding: 10,
  },
  otherinput: {
    borderColor: "black",
    borderBottomWidth: 1,
    borderRadius: 5,
    height: 40,
    textAlign: "left",
    justifyContent: "center",
    fontSize: 15,
    marginTop: 5,
    paddingLeft: 10,
  },
  otherinputactive: {
    borderBottomWidth: 2,
    borderRadius: 5,
    height: 35,
    textAlign: "left",
    justifyContent: "center",
    fontSize: 15,
    marginTop: 5,
    paddingLeft: 10,
    borderColor: "blue",
  },
  otherforerror: {
    color: "red",
  },
  box: {
    margin: 5,
  },
  info: {
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#129620",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    fontSize: 20,
    width: "80%",
    marginHorizontal: "10%"
  },
});
