import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Formik } from 'formik';

export default function Others() {
  return (
    <View style={styles.othercontainer}>
      <Text style={styles.othertop}>Other Expenses</Text>
      <Formik
        initialValues={{ detail: '', amountpaid: '', receipt: '' }}
        onSubmit={values=>console.log(values)}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View style={styles.otherform}>
            <TextInput style={styles.otherinput}
              placeholder="Enter Details"
              onChangeText={handleChange('detail')}
              value={values.detail}
            />
            <TextInput style={styles.otherinput}
              placeholder="Amountpaid"
              onChangeText={handleChange('amountpaid')}
              value={values.amountpaid}
            />
            <TextInput style={styles.otherinput}
              placeholder="receipt details"
              onChangeText={handleChange('receipt')}
              value={values.receipt}
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  othercontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  othertop: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  otherform: {
    marginTop:10,
    width:'90%',

  },
  otherinput: {
    borderColor:'black',
    borderWidth: 1,
    marginTop: 3,
    borderRadius: 5,
    height: 40,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 3
  }
});
