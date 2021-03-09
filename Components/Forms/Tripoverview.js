import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik';
import { MaterialIcons } from '@expo/vector-icons';
import * as yup from 'yup';
import AddTrip from '../../db/AddTrip';

const Reviewschema = yup.object({
    From: yup
        .string()
        .required(),
    To: yup
        .string()
        .required(),
    month: yup
        .string()
})

const SendtoTrip = async (values) => {
    try {
        const value = await AddTrip(values);
        if(value===true){
            Alert.alert("Done")
        }
        else{
            console.log("false")
        }
    }
    catch (e) {
        console.log(e);
    }

}

export default function Tripoverview({navigation}) {
    return (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.tripovercontainer}>
            <Formik
                initialValues={{ From: '', To: '', month: '' }}
                onSubmit={values => { SendtoTrip(values); navigation.navigate('Home')}}
                validationSchema={Reviewschema}
            >
                {({ handleBlur, handleChange, handleSubmit, values, errors, touched }) => (
                    <View style={styles.tripform}>
                        <View style={styles.tofrom}>
                            <View style={styles.indicon}>
                                <TextInput style={styles.tripinput}
                                    placeholder="From"
                                    onChangeText={handleChange('From')}
                                    onBlur={handleBlur('From')}
                                    value={values.From}
                                />
                                <Text style={styles.triperror}>{touched.From && errors.From}</Text>
                            </View >
                            <MaterialIcons name="compare-arrows" size={35} color="blue" />
                            <View style={styles.indicon}>
                                <TextInput style={styles.tripinput}
                                    placeholder="To"
                                    onChangeText={handleChange('To')}
                                    onBlur={handleBlur('To')}
                                    value={values.To}
                                />
                                <Text style={styles.triperror}>{touched.To && errors.To}</Text>
                            </View>

                        </View>
                        <View style={styles.month}>
                            <TextInput style={styles.tripinput}
                                placeholder="Month of travel"
                                onChangeText={handleChange('month')}
                                onBlur={handleBlur('month')}
                                value={values.month}
                            />
                            <Text style={styles.triperror}>{touched.month && errors.month}</Text>

                        </View>
                        <View style={styles.tripbutton}>
                            <Button color="green" marginTop={17} onPress={handleSubmit} title="Submit" />
                        </View>

                    </View>
                )}


            </Formik>
        </KeyboardAwareScrollView>

    )
}

const styles = StyleSheet.create({
    tripovercontainer: {
        marginTop: 45,
        flex: 1,
        width: '100%',
        borderColor: 'red',
        borderWidth: 1,
    },
    tripinput: {
        textAlign: 'center',
        width: '90%',
        borderColor: 'black',
        borderBottomWidth: 1,
        fontWeight: 'bold',
        height: 40,
        fontSize: 15,
    },
    tripform: {
        marginTop: 30,
        justifyContent: 'space-evenly'
    },
    tofrom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-around',
    },
    month: {
        marginHorizontal: '20%',
        width: '60%',
        marginTop: 20,
        alignItems: 'center',
    },
    tripbutton: {
        marginTop: 20,
        marginHorizontal: '15%'
    },
    indicon: {
        flex: 1,
        alignItems: 'center',
        width: '35%',
        height: 80,
    },
    triperror: {
        color: 'red',
    }
})