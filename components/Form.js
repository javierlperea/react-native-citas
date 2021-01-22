import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableHighlight, TextInput, ScrollView, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Form = ({ citas, setCitas, setShowForm, saveStorageData }) => {

    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    
    // Mostrar u ocultar el date picker
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleDateConfirm = (date) => {
        // Modificar el formato de la fecha mediante un arreglo (toLocaleDateString)
        const dateOptions = { year: 'numeric', month: 'long', day: '2-digit'};
        setFecha(date.toLocaleDateString('es-Es', dateOptions));
        hideDatePicker();
    };
    
    // Mostrar u ocultar el time picker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        // Modificar el formato de la hora mediante un arreglo (to local date string)
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: false };
        setHora(time.toLocaleString('en-US', timeOptions));
        hideTimePicker();
    };

    
    // Crear Nueva Cita
    const handleCreateNewDate = () => {
        if( paciente.trim() === '' ||
            propietario.trim() === '' ||
            telefono.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' || 
            sintomas.trim() === '' ) 
        {
            // Muestra mensaje de error cuando no se completan todos los campos
            showAlert();
            
        } else {
            // Crea una nueva cita
            const cita = { paciente, propietario, telefono, fecha, hora, sintomas }
            // agrega un id aleatorio a mi arreglo cita
            cita.id = shortid.generate();

            // Agregar al state
            const newCita = [ ...citas, cita ];
            setCitas( newCita );

            // Agregar la cita al storage, como newCita es un arreglo tengo que realizar la conversion a string
            saveStorageData( JSON.stringify(newCita) )

            // Ocultar el formulario 
            setShowForm( false );
        }

    }
    
    // Alert message para errores
    const showAlert = () => {
        Alert.alert(
            'Error',                                // Titulo
            'Debe completar todos los campos',      // Descripcion
            [{
                text: 'OK'                          // Array de Botones
            }]
        )
    }

    return (
        <ScrollView style={ styles.form }>
            <View>
                <Text style={ styles.label }>Paciente:</Text>
                <TextInput 
                    style={ styles.input }
                    onChangeText={ (text) => setPaciente(text) }
                    />
            </View>

            <View>
                <Text style={ styles.label }>Propietario:</Text>
                <TextInput 
                    style={ styles.input }
                    onChangeText={ (text) => setPropietario(text) }
                    />
            </View>

            <View>
                <Text style={ styles.label }>Teléfono Contacto:</Text>
                <TextInput 
                    style={ styles.input }
                    keyboardType="numeric"
                    onChangeText={ (number) => setTelefono(number) }
                    />
            </View>

            <View>
                <Text style={ styles.label }>Fecha:</Text>
                <Button title="Selecciona la fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    locale="es-ES"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                    />
                <Text>{ fecha }</Text>
            </View>

            <View>
                <Text style={ styles.label }>Hora:</Text>
                <Button title="Selecciona la hora" onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    locale="es-ES"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}
                    is24Hour
                />
                <Text>{ hora }</Text>
            </View>

            <View>
                <Text style={ styles.label }>Sintomas:</Text>
                <TextInput 
                    multiline
                    style={ styles.input }
                    onChangeText={ (text) => setSintomas(text) }
                />
            </View>

            <View> 
                <TouchableHighlight 
                    style={ styles.btnSave }
                    onPress={ () => handleCreateNewDate() }
                >
                    <Text style={ styles.textBtnSave }>Guardar Cita</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%'
    },
    label : {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 40,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    btnSave: {
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 20
    },
    textBtnSave: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center'
    }
})
export default Form;