import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik, getIn } from "formik";
import * as yup from "yup";
import Addmain from "../../db/Addmain";


const Reviewschema = yup.object({
  // departure: yup.object({
  //   date: yup.string().required(),
  //   time: yup.string().required(),
  //   place: yup.string().required(),
  // }),
  // arrival: {
  //   date: yup.string().required(),
  //   time: yup.string().required(),
  //   place: yup.string().required(),
  // },
  mode: yup.string().required("Mode of Travel is required"),
  distance: yup
    .number()
    .typeError("Must be a Number")
    .positive("Invalid, Only positive numbers are allowed")
    .required("Distance is required"),
  fare: yup.string().required("Fare is required"),
  pnr: yup.string().required("PNR is required"),
  remarks: yup.string(),
});



export default function Mainform(props) {
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainformcontainer}>
        <Text style={styles.mainformtop}>Travel details</Text>
        <Formik
          initialValues={{
            departure: {
              date: "",
              time: "",
              place: "",
            },
            arrival: {
              date: "",
              time: "",
              place: "",
            },
            mode: "",
            distance: "",
            fare: "",
            pnr: "",
            remarks: "",
          }}
          onSubmit={(values) => Addmain(values, props.showmain, props.index)}
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
              <View>
                <Text style={styles.deptext}>Departure</Text>
                <View style={styles.deparr}>
                  <TextInput
                    style={styles.mainforminputdeparr}
                    placeholder="Date"
                    onChangeText={handleChange("departure.date")}
                    onBlur={handleBlur("departure.date")}
                    value={values.departure.date}
                  />
                  <TextInput
                    style={styles.mainforminputdeparr}
                    placeholder="Time"
                    onChangeText={handleChange("departure.time")}
                    onBlur={handleBlur("departure.time")}
                    value={values.departure.time}
                  />
                  <TextInput
                    style={styles.mainforminputdeparr}
                    placeholder="Place"
                    onChangeText={handleChange("departure.place")}
                    onBlur={handleBlur("departure.place")}
                    value={values.departure.place}
                  />
                </View>
              </View>
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.deptext}>Arrival</Text>
                <View style={styles.deparr}>
                  <TextInput
                    style={styles.mainforminputdeparr}
                    placeholder="Date"
                    onChangeText={handleChange("arrival.date")}
                    onBlur={handleBlur("arrival.date")}
                    value={values.arrival.date}
                  />
                  <TextInput
                    style={styles.mainforminputdeparr}
                    placeholder="Time"
                    onChangeText={handleChange("arrival.time")}
                    onBlur={handleBlur("arrival.time")}
                    value={values.arrival.time}
                  />
                  <TextInput
                    style={styles.mainforminputdeparr}
                    placeholder="Place"
                    onChangeText={handleChange("arrival.place")}
                    onBlur={handleBlur("arrival.place")}
                    value={values.arrival.place}
                  />
                </View>
              </View>
              <TextInput
                style={styles.mainforminput}
                placeholder="Mode of Travel"
                onChangeText={handleChange("mode")}
                onBlur={handleBlur("mode")}
                value={values.mode}
              />
              <Text style={styles.mainforerror}>
                {touched.mode && errors.mode}
              </Text>
              <TextInput
                style={styles.mainforminput}
                placeholder="Distance in km"
                onChangeText={handleChange("distance")}
                onBlur={handleBlur("distance")}
                value={values.distance}
              />
              <Text style={styles.mainforerror}>
                {touched.distance && errors.distance}
              </Text>
              <TextInput
                style={styles.mainforminput}
                placeholder="Fare"
                onChangeText={handleChange("fare")}
                onBlur={handleBlur("fare")}
                value={values.fare}
              />
              <Text style={styles.mainforerror}>
                {touched.fare && errors.fare}
              </Text>
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
              <TextInput
                style={styles.mainforminput}
                placeholder="Any Remarks"
                onChangeText={handleChange("remarks")}
                onBlur={handleBlur("remarks")}
                value={values.remarks}
              />
              <Text style={styles.mainforerror}>
                {touched.remarks && errors.remarks}
              </Text>
              <Button onPress={handleSubmit} title="Submit" />
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
    backgroundColor: "#fff",
    alignItems: "center",
    opacity: 0.8,
  },
  mainformtop: {
    fontSize: 25,
    margin: 5,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  mainformform: {
    marginTop: 10,
    width: "90%",
  },
  mainforminput: {
    borderColor: "black",
    borderWidth: 1,
    shadowRadius: 3,
    borderRadius: 5,
    height: 40,
    textAlign: "center",
    fontSize: 20,
    marginVertical: 8,
  },
  mainformerror: {
    color: "red",
    fontSize: 15,
    marginVertical: 3,
  },

  deparr: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainforminputdeparr: {
    borderColor: "black",
    width: "28%",
    borderWidth: 1,
    margin: 6,
    shadowRadius: 3,
    borderRadius: 5,
    fontSize: 15,
    height: 40,
    textAlign: "center",
  },
  deptext: {
    fontSize: 18,
    fontWeight: "200",
    textTransform: "uppercase",
  },
  mainforerror: {
    color: "red",
  },
});
