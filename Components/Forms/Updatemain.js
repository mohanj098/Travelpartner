import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as yup from "yup";
import { TextInputMask } from "react-native-masked-text";
import GetData from "../../db/GetData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Reviewschema = yup.object({
  departureplace: yup.string().required("Departure Place is Required"),
  arrivalplace: yup.string().required("Arrival Place is Required"),
  mode: yup.string().required("Mode of Travel is required"),
  distance: yup
    .number()
    .typeError("Must be a Number")
    .positive("Invalid, Only positive numbers are allowed")
    .required("Distance is required"),
  fare: yup.number().required("Fare is required").typeError("Must be a Number"),
  pnr: yup.string().required("PNR is required"),
  remarks: yup.string(),
});

const { width, height } = Dimensions.get("window");
export default function Mainform(props) {
  const data = props.data;
  const index = props.index;
  const extra = props.extra;
  const departuredata = data[0].split("\n", 3);
  const arrivaldata = data[1].split("\n", 3);
  const setextra = props.setextra;
  const subindex = props.subindex;
  const setupdate = props.setupdate;
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainformcontainer}>
        <Text style={styles.mainformtop}>Travel Expense</Text>
        <Formik
          initialValues={{
            departuredate: departuredata[0].split("{", 2)[1].split("}", 2)[0],
            departuretime: departuredata[1].split("{", 2)[1].split("}", 2)[0],
            departureplace: departuredata[2].split("{", 2)[1].split("}", 2)[0],
            arrivaldate: arrivaldata[0].split("{", 2)[1].split("}", 2)[0],
            arrivaltime: arrivaldata[1].split("{", 2)[1].split("}", 2)[0],
            arrivalplace: arrivaldata[2].split("{", 2)[1].split("}", 2)[0],
            mode: data[2],
            distance: data[3],
            fare: data[4],
            pnr: data[5],
            remarks: data[6],
            stored: data[7],
          }}
          onSubmit={(values) => {
            const finalvalue = {
              departure: {
                date: values.departuredate.trim(),
                time: values.departuretime.trim(),
                place: values.departureplace.trim(),
              },
              arrival: {
                date: values.arrivaldate.trim(),
                time: values.arrivaltime.trim(),
                place: values.arrivalplace.trim(),
              },
              mode: values.mode.trim(),
              distance: values.distance.trim(),
              fare: values.fare.trim(),
              pnr: values.pnr.trim(),
              remarks: values.remarks.trim(),
              stored: values.stored.trim(),
            };
            GetData("trip")
              .then((value) => JSON.parse(value))
              .then((result) => {
                var value = result;
                value[index].maintotal +=
                  parseInt(finalvalue.fare) - parseInt(data[4]);
                value[index].total +=
                  parseInt(finalvalue.fare) - parseInt(data[4]);
                value[index].main[subindex] = finalvalue;
                AsyncStorage.setItem("trip", JSON.stringify(value))
                  .then(() => {
                    setextra(!extra);
                    setupdate([false, null, null]);
                  })
                  .catch((e) => console.log(e));
              })
              .catch((e) => console.log(e))
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
            <View style={styles.mainformform}>
              <View style={styles.block}>
                <Text style={styles.info}>Departure</Text>
                <View style={styles.deparr}>
                  <View style={styles.drblock}>
                    <Text style={styles.drblocktext}>Date</Text>
                    {/* <TextInput
                      style={styles.mainforminputdeparr}
                      placeholder="Date"
                      onChangeText={handleChange("departuredate")}
                      onBlur={handleBlur("departuredate")}
                      value={values.departuredate}
                    /> */}
                    <TextInputMask
                      style={styles.mainforminputdeparr}
                      placeholder="DD/MM/YYYY"
                      type={"datetime"}
                      options={{
                        format: "DD/MM/YYYY",
                      }}
                      keyboardType="numeric"
                      value={values.departuredate}
                      onChangeText={handleChange("departuredate")}
                    />
                  </View>
                  <View style={styles.drblock}>
                    <Text style={styles.drblocktext}>Time(24 hr)</Text>
                    {/* <TextInput
                      style={styles.mainforminputdeparr}
                      placeholder="Time"
                      onChangeText={handleChange("departuretime")}
                      onBlur={handleBlur("departuretime")}
                      value={values.departuretime}
                    /> */}
                    <TextInputMask
                      style={styles.mainforminputdeparr}
                      placeholder="HH::MM"
                      type={"datetime"}
                      options={{
                        format: "HH:MM",
                      }}
                      value={values.departuretime}
                      keyboardType="numeric"
                      onChangeText={handleChange("departuretime")}
                    />
                  </View>
                  <View style={styles.drblock}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.drblocktext}>Place</Text>
                      <Text style={{ color: "red" }}>*</Text>
                    </View>
                    <TextInput
                      style={styles.mainforminputdeparr}
                      placeholder="Place"
                      onChangeText={handleChange("departureplace")}
                      onBlur={handleBlur("departureplace")}
                      value={values.departureplace}
                    />
                  </View>
                </View>
                <Text style={styles.mainforerror}>
                  {touched.departureplace && errors.departureplace}
                </Text>
              </View>
              <View style={styles.block}>
                <Text style={styles.info}>Arrival</Text>
                <View style={styles.deparr}>
                  <View style={styles.drblock}>
                    <Text style={styles.drblocktext}>Date</Text>
                    {/* <TextInput
                      style={styles.mainforminputdeparr}
                      placeholder="Date"
                      onChangeText={handleChange("arrivaldate")}
                      onBlur={handleBlur("arrivaldate")}
                      value={values.arrivaldate}
                    /> */}
                    <TextInputMask
                      style={styles.mainforminputdeparr}
                      placeholder="DD/MM/YYYY"
                      type={"datetime"}
                      keyboardType="numeric"
                      options={{
                        format: "DD/MM/YYYY",
                      }}
                      value={values.arrivaldate}
                      onChangeText={handleChange("arrivaldate")}
                    />
                  </View>
                  <View style={styles.drblock}>
                    <Text style={styles.drblocktext}>Time(24 hr)</Text>
                    {/* <TextInput
                      style={styles.mainforminputdeparr}
                      placeholder="Time"
                      onChangeText={handleChange("arrivaltime")}
                      onBlur={handleBlur("arrivaltime")}
                      value={values.arrivaltime}
                    /> */}
                    <TextInputMask
                      style={styles.mainforminputdeparr}
                      placeholder="HH::MM"
                      type={"datetime"}
                      keyboardType="numeric"
                      options={{
                        format: "HH:MM",
                      }}
                      value={values.arrivaltime}
                      onChangeText={handleChange("arrivaltime")}
                    />
                  </View>
                  <View style={styles.drblock}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.drblocktext}>Place</Text>
                      <Text style={{ color: "red" }}>*</Text>
                    </View>
                    <TextInput
                      style={styles.mainforminputdeparr}
                      placeholder="Place"
                      onChangeText={handleChange("arrivalplace")}
                      onBlur={handleBlur("arrivalplace")}
                      value={values.arrivalplace}
                    />
                  </View>
                </View>
                <Text style={styles.mainforerror}>
                  {touched.arrivalplace && errors.arrivalplace}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.specialblock}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.info}>Mode of Travel</Text>
                    <Text style={{ color: "red" }}>*</Text>
                  </View>
                  <TextInput
                    style={styles.mainforminput1}
                    placeholder="Mode of Travel"
                    onChangeText={handleChange("mode")}
                    onBlur={handleBlur("mode")}
                    value={values.mode}
                  />
                  <Text style={styles.mainforerror}>
                    {touched.mode && errors.mode}
                  </Text>
                </View>
                <View style={styles.specialblock}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.info}>Distance(in km)</Text>
                    <Text style={{ color: "red" }}>*</Text>
                  </View>
                  <TextInput
                    style={styles.mainforminput1}
                    placeholder="Distance(in km)"
                    keyboardType="numeric"
                    onChangeText={handleChange("distance")}
                    onBlur={handleBlur("distance")}
                    value={values.distance}
                  />
                  <Text style={styles.mainforerror}>
                    {touched.distance && errors.distance}
                  </Text>
                </View>
              </View>
              <View style={styles.block}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.info}>Fare(in rupees)</Text>
                  <Text style={{ color: "red" }}>*</Text>
                </View>
                <TextInput
                  keyboardType="numeric"
                  style={styles.mainforminput}
                  placeholder="Fare"
                  onChangeText={handleChange("fare")}
                  onBlur={handleBlur("fare")}
                  value={values.fare}
                />
                <Text style={styles.mainforerror}>
                  {touched.fare && errors.fare}
                </Text>
              </View>
              <View style={styles.block}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.info}>PNR/Ticket Number</Text>
                  <Text style={{ color: "red" }}>*</Text>
                </View>
                <TextInput
                  style={styles.mainforminput}
                  placeholder="PNR number/Ticket number"
                  onChangeText={handleChange("pnr")}
                  onBlur={handleBlur("pnr")}
                  value={values.pnr}
                />
                <Text style={styles.mainforerror}>
                  {touched.pnr && errors.pnr}
                </Text>
              </View>
              <View style={styles.block}>
                <Text style={styles.info}>Remarks(is any)</Text>
                <TextInput
                  style={styles.mainforminput}
                  placeholder="Any Remarks"
                  onChangeText={handleChange("remarks")}
                  onBlur={handleBlur("remarks")}
                  value={values.remarks}
                />
              </View>
              <View style={styles.block}>
                <Text style={styles.info}>
                  Ticket Information(For your Refrence only)
                </Text>
                <TextInput
                  style={styles.mainforminput}
                  placeholder="i.e. Payment Method, etc."
                  onChangeText={handleChange("stored")}
                  onBlur={handleBlur("stored")}
                  value={values.stored}
                />
                <Text style={styles.mainforerror}>
                  {touched.remarks && errors.remarks}
                </Text>
              </View>
              <Button onPress={handleSubmit} title="Submit" color="#129620" />
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  mainformcontainer: {
    textAlign: "center",
    flex: 1,
    backgroundColor: "#d5def5",
    alignItems: "center",
    marginTop: 20,
    opacity: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  mainformtop: {
    fontSize: 25,
    margin: 5,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  mainformform: {
    backgroundColor: "#d5def5",
    marginTop: 5,
    width: "100%",
    padding: 10,
    borderRadius: 20,
  },
  mainforminput: {
    borderColor: "black",
    borderBottomWidth: 1,
    shadowRadius: 3,
    borderRadius: 5,
    height: 40,
    textAlign: "left",
    paddingLeft: 5,
    fontSize: 15,
  },

  mainforminput1: {
    borderColor: "black",
    borderBottomWidth: 1,
    shadowRadius: 3,
    borderRadius: 5,
    height: 40,
    textAlign: "left",
    paddingLeft: 5,
    fontSize: 15,
    width: "90%",
  },
  mainformerror: {
    color: "red",
    fontSize: 15,
  },

  deparr: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainforminputdeparr: {
    borderColor: "black",
    borderWidth: 1,
    shadowRadius: 3,
    borderRadius: 5,
    fontSize: 13,
    height: 35,
    textAlign: "left",
    paddingLeft: 5,
  },
  mainforerror: {
    color: "red",
  },
  info: {
    fontSize: 15,
    fontWeight: "bold",
  },
  drblock: {
    width: "30%",
  },
  specialblock: {
    width: "50%",
  },
  button: {
    backgroundColor: "#129620",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    fontSize: 20,
    width: "100%",
  },
});
