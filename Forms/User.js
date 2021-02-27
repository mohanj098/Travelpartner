import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import StoreData from '../db/StoreData';

const Reviewschema = yup.object({
    name: yup
        .string()
        .required(),
    ecode: yup
        .string()
        .required(),
    dept: yup
        .string()
        .required(),
    desig: yup
        .string()
        .required(),
    pay: yup
        .string()
        .required(),
    account: yup
        .string()
        .required()
})

export default function User(props) {
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.usercontainer}>
                <Text style={styles.usertop}>user details</Text>
                <Formik
                    initialValues={{ name: '', ecode: '', dept: '', desig: '', pay: '', account: '' }}
                    onSubmit={values => (StoreData(values).then(props.setshow(false)))}
                    validationSchema={Reviewschema}
                >
                    {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
                        <View style={styles.userform}>
                            <TextInput style={styles.userinput}
                                placeholder="Name"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            <Text style={styles.usererror}>{touched.name && errors.name}</Text>
                            <TextInput style={styles.userinput}
                                placeholder="Employee Code"
                                onChangeText={handleChange('ecode')}
                                onBlur={handleBlur('ecode')}
                                value={values.ecode}
                            />
                            <Text style={styles.usererror}>{touched.ecode && errors.ecode}</Text>
                            <TextInput style={styles.userinput}
                                placeholder="Department/Center"
                                onChangeText={handleChange('dept')}
                                onBlur={handleBlur('dept')}
                                value={values.dept}
                            />
                            <Text style={styles.usererror}>{touched.dept && errors.dept}</Text>
                            <TextInput style={styles.userinput}
                                placeholder="Designation"
                                onChangeText={handleChange('desig')}
                                onBlur={handleBlur('desig')}
                                value={values.desig}
                            />
                            <Text style={styles.usererror}>{touched.desig && errors.desig}</Text>
                            <TextInput style={styles.userinput}
                                placeholder="Basic Pay with grade pay"
                                onChangeText={handleChange('pay')}
                                onBlur={handleBlur('pay')}
                                value={values.pay}
                            />
                            <Text style={styles.usererror}>{touched.pay && errors.pay}</Text>
                            <TextInput style={styles.userinput}
                                placeholder="Bank Account number"
                                onChangeText={handleChange('account')}
                                onBlur={handleBlur('account')}
                                value={values.account}
                            />
                            <Text style={styles.usererror}>{touched.account && errors.account}</Text>
                            <Button onPress={handleSubmit} title="Submit" />
                        </View>
                    )}
                </Formik>
                <StatusBar style="auto" />
            </View>

        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    usercontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8
    },
    usertop: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    userform: {
        marginTop: 10,
        width: '90%',

    },
    userinput: {
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 3,
        shadowRadius: 3,
        borderRadius: 5,
        height: 40,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 3
    },
    usererror: {
        color: 'red',
        fontSize: 15,
        marginVertical: 3
    },
});
