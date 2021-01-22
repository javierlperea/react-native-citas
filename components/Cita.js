/* 
Tengo una variante para Button que es TouchableHighlight, ya que el button es nativo y no es editable en estilos
    <Button 
        title="Eliminar"
    />

*/

import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'

// Recibo cada uno de los item que son los objetos del array
const Cita = ({ item, deletePaciente }) => {

    const handleDelete = (id) => {
        deletePaciente(id);
    }

    return (
        <View style={ styles.cita }>
            <View>
                <Text style={ styles.label }>Paciente: </Text>
                <Text style={ styles.text }>{ item.paciente }</Text>
            </View>

            <View>
                <Text style={ styles.label }>Propietario: </Text>
                <Text style={ styles.text }>{ item.propietario }</Text>
            </View>
            
            <View>
                <Text style={ styles.label }>Sintomas: </Text>
                <Text style={ styles.text }>{ item.sintomas }</Text>
            </View>

            <View> 
                <TouchableHighlight 
                    style={ styles.btnDelete }
                    onPress={ () => handleDelete(item.id) }
                >
                    <Text style={ styles.textBtnDelete }>Eliminar &times;</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cita: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,        
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20
    },
    text: {
        fontSize: 18
    },
    btnDelete: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10
    },
    textBtnDelete: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center'
    }
})
export default Cita;
