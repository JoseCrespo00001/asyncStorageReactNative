import react, {useEffect,useState} from  'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {

    const [inputTexto, guardarInputTexto] = useState("");
    const [nombrestorage, guardarNombreStorage] = useState("");

    useEffect(() => {
      obtenerDatos();
    },[])



    const guardarDatos = async () => {
      // Guarda los datos en el almacenamiento de la app.
      try {
        await AsyncStorage.setItem("nombre", inputTexto)
        guardarNombreStorage(inputTexto)
        
      } catch (error) {
        console.log("ERROR")
      }
    }

    const obtenerDatos = async () => {
      // Obtener los datos en el almacenamiento de la app.
      try {
         const nombre = await AsyncStorage.getItem( "nombre" )
         guardarNombreStorage(nombre);
        
      } catch (error) {
        console.log("ERROR")
      }
    }

    const eliminarDatos = async () => {
      // Elimina los datos del almacenamiento de la app.
      try {
        await AsyncStorage.removeItem('nombre')
        guardarNombreStorage("")
      } catch (error) {
        console.log("Error eliminando datos.")}
    }

 

  return (
    <>
      {nombrestorage ?  <Text style = {styles.tit}> Hi: {nombrestorage}</Text> : null}
      <View style = {styles.contenedor}>
       
        <TextInput
        placeholder='Name'
        style = {styles.input}
        onChangeText={texto => guardarInputTexto(texto)}
        />
        <Button
          
          title='Save'
          color="#485BFF"
          onPress={() => guardarDatos()}
        />

        {nombrestorage ? 
        <TouchableHighlight
        onPress={ () => eliminarDatos() }
        style = {styles.btnEliminar}
        >
          <Text
          style = {styles.textoEliminar}
          >Delete &times;</Text>
        </TouchableHighlight> : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contenedor:{
    flex:1,
    backgroundColor:"#f5f5f5",
    alignItems:"center",
    justifyContent:"center"

  },
  input:{

    borderBottomWidth:1,
    width:300,
    height:40,

  },
  btnEliminar:{
    margin:20,
    justifyContent:"center",
    backgroundColor:"#485BFF",
    borderRadius:30,
    width:300,
    height:40,
    

  },
  textoEliminar:{
    color:"#f5f5f5",
    textAlign:"center",
    fontSize:18,
    fontWeight:"500"
  },
  tit:{
    fontSize:30,
    fontWeight:"300",
    color:"#767676",
    marginVertical:30,
    textAlign:"center",
    marginTop:100
    
  }


});
