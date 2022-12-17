import React from 'react';
import ReactCrop from 'react-image-crop'
import Bar from './Bar';
import App from './App';
import './App.css';
import { StyleSheet, View } from 'react-native';
const styles = StyleSheet.create({
  centre:{
      margin: 'auto',
      width: '90%',
  },
  margin:{
    marginTop:'70px'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign:'center'
  },
  header: {
    height: 40,
    left: 0,
    right: 0,
    top: 100,
    zIndex: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0
  },
  address:{
    marginTop:5,
    fontSize: '16.5px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '25%',
    minHeight:'38px',
    // border: '0.5px solid whiteSmoke',
    // backgroundColor:'#1d222a',
    color:'#f5e8e4'
  },
  
  input_box: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '30%',
    // border: '0.5px solid #f5e8e4',
    borderRadius: '7px',
    backgroundColor:'#09232b'
  },
  output_box: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '35%',
    minHeight: '400px',
    // border: '0.5px solid #f5e8e4',
    borderRadius: '7px',
    backgroundColor:'#09232b'
  }
});
export default function HeaderFooter() {
    return (
      <>
        <View style= {[styles.margin]}></View>
        <View style={[styles.centre]}>
              <Bar/>
        </View>
        <View style= {[styles.margin]}></View>
        
        <View style={[styles.centre]}>
          <View style={[styles.container]}>
             <View style={[styles.address]}>MAGNITUDE INPUT</View> 
             <View style={[styles.address]}>THE RESULT</View> 
             <View style={[styles.address]}>PHASE INPUT</View> 
          </View>
        </View>
        <View style={[styles.centre]}>
          <View style={[styles.container]}>
            <View style={[styles.row]}>
              <View style={[styles.input_box]}>
                <App imgId={'mag'}/>
              </View>     
              <View style={[styles.output_box]}>
              </View>
              <View style={[styles.input_box]}>
                <App imgId={'phase'}/>
              </View> 
            </View> 
          </View> 
        </View>
      </>

    );
}