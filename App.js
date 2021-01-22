/* 
** Cuando quiero renderizar un arreglo en web utilizo map de la siguiente forma:

{
  citas.map( cita => (
    <View>
      <Text>{ cita.paciente }</Text>
    </View>
  ))
} 

** Esta es la forma optimizada de .map() para dispositivos moviles, recibe props (data y renderItem) para renderizar y se escribe de la misma forma:

    <FlatList 
      data={ citas }                            // data contiene la informacion con la que voy a trabajar 
      renderItem={ ({item}) => (                // native siempre crea un item por eso, desestructuro item de --> renderItem={ (cita) => (
        // <View>
        //   <Text>{ item.paciente }</Text>     // Esto se reemplaza con el componente Citas
        // </View> 
        
      )}
      
      keyExtractor={ cita => cita.id }          // El key se pasa mediante keyExtractor={}
    /> 
*/



import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Platform, Keyboard } from 'react-native';
import Cita from './components/Cita';
import Form from './components/Form';

// intalar esta dependencia --> npm i @react-native-community/async-storage
import AsyncStorage from '@react-native-community/async-storage';


const App = () => {

  // Definir el state para las citas
  const [ citas, setCitas ] = useState( [] );
  const [showForm, setShowForm] = useState(false);

  // Traer las citas del storage
  useEffect(() => {
    
    const getCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');

        if(citasStorage) {
          // como citasStorage es un string tengo que realizar la conversion a un arreglo
          setCitas( JSON.parse(citasStorage) );
        }
      } catch (error) {
        console.log(error)
      }
    }
    getCitasStorage();
  }, [])

  
  // Guardar las citas en el storage
  const saveStorageData = async ( citasJSON ) => {
    try {
      AsyncStorage.setItem( 'citas', citasJSON )
    } catch (error) {
      console.log(error)
    }
  }

  // Elimina los pacientes del state
  const deletePaciente = (id) => {
    
    const citasFiltradas = citas.filter( cita => cita.id !== id );
    setCitas( citasFiltradas );
    // Llamo la funcion saveStorageData y como es un array lo convierto a string
    saveStorageData( JSON.stringify(citasFiltradas) );
    
    /**** Codigo viejo sin AsyncStorage
    //  setCitas( (state) => { return state.filter( cita => cita.id !== id ) }) } <-- copia el state completo(citas) y luego lo filtra
    setCitas( (citasActuales) => {
      return citasActuales.filter( cita => cita.id !== id )
    }) 
    */
  }

  // Muestra u oculta el formulario
  const showHideForm = () => {
    setShowForm( !showForm );
  }

  // ocultar teclado
  // const closeKeyboard = () => {
  //   Keyboard.dismiss();
  // }

  return (
    // <TouchableWithoutFeedback onPress={ closeKeyboard }>
      <View style={ styles.container }>

        <Text style={ styles.title }>Administrador de Citas</Text>
        {/* SHOW HIDDE BUTTON */}
        <View> 
          <TouchableHighlight 
                underlayColor='rgba(73,182,77,1,0.6)'
                style={ styles.btnNewCita }
                onPress={ showHideForm }
          >
            <Text style={ styles.textBtnNewCita }>{ showForm ? 'Volver' : 'Nueva Cita' }</Text>
          </TouchableHighlight>
        </View>

        <View style={ styles.content }>
          {
            showForm ? (
              <>
                <Text style={ styles.title }>Ingresar Nueva Cita</Text>
                <Form 
                  citas={ citas } 
                  setCitas={ setCitas } 
                  setShowForm={ setShowForm }
                  saveStorageData={ saveStorageData }
                />
              </>
            ) : (
              <>
                <Text style={ styles.title }>{ citas.length>0 ? 'Administra tus citas' : 'Ingresar nueva cita' }</Text>
                {/*  FlatListes similar a .map() sirve para mostrar cada uno de Items(cada objeto del array)  */}
                <FlatList
                  style={ styles.lists }
                  data={ citas }
                  // Llamo el componente Cita y le paso mediante props cada uno de los Items(que seria cada objeto del array) y la funcion deletePaciente
                  renderItem={ ({item}) => <Cita item={ item } deletePaciente={ deletePaciente } /> }
                  keyExtractor={ cita => cita.id }
                />
              </>
                )
          }
        </View>

      </View>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AA076B',
    flex: 1
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: Platform.OS === 'ios'  ? 40 : 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  lists: {
    flex: 1
  },
  btnNewCita: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10
},
textBtnNewCita: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center'
}
});

export default App;
