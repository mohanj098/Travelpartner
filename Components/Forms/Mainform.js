import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik';
import * as yup from 'yup';
import StoreData from '../../db/StoreData';

export default function Mainform(props) {
    const navigate=props.navigate
    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}>
            <View style={styles.mainformcontainer}>
                <Text style={styles.mainformtop}>mainform details</Text>
                <Formik
                    initialValues={{ name: '', ecode: '', dept: '', desig: '', pay: '', account: '' }}
                    onSubmit={values => (StoreData('', values).then(props.setshow(false)))}
                    validationSchema={Reviewschema}
                >
                    {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
                        <View style={styles.mainformform}>
                            <TextInput style={styles.mainforminput}
                                placeholder="Name"
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            <Text style={styles.mainformerror}>{touched.name && errors.name}</Text>
                            <TextInput style={styles.mainforminput}
                                placeholder="Employee Code"
                                onChangeText={handleChange('ecode')}
                                onBlur={handleBlur('ecode')}
                                value={values.ecode}
                            />
                            <Text style={styles.mainformerror}>{touched.ecode && errors.ecode}</Text>
                            <TextInput style={styles.mainforminput}
                                placeholder="Department/Center"
                                onChangeText={handleChange('dept')}
                                onBlur={handleBlur('dept')}
                                value={values.dept}
                            />
                            <Text style={styles.mainformerror}>{touched.dept && errors.dept}</Text>
                            <TextInput style={styles.mainforminput}
                                placeholder="Designation"
                                onChangeText={handleChange('desig')}
                                onBlur={handleBlur('desig')}
                                value={values.desig}
                            />
                            <Text style={styles.mainformerror}>{touched.desig && errors.desig}</Text>
                            <TextInput style={styles.mainforminput}
                                placeholder="Basic Pay with grade pay"
                                onChangeText={handleChange('pay')}
                                onBlur={handleBlur('pay')}
                                value={values.pay}
                            />
                            <Text style={styles.mainformerror}>{touched.pay && errors.pay}</Text>
                            <TextInput style={styles.mainforminput}
                                placeholder="Bank Account number"
                                onChangeText={handleChange('account')}
                                onBlur={handleBlur('account')}
                                value={values.account}
                            />
                            <Text style={styles.mainformerror}>{touched.account && errors.account}</Text>
                            <Button onPress={handleSubmit} title="Submit" />
                        </View>
                    )}
                </Formik>
                <StatusBar style="auto" />
            </View>
        </KeyboardAwareScrollView>
    )
}


const styles = StyleSheet.create({
    mainformcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8
    },
    mainformtop: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    mainformform: {
        marginTop: 10,
        width: '90%',

    },
    mainforminput: {
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
    mainformerror: {
        color: 'red',
        fontSize: 15,
        marginVertical: 3
    },
});