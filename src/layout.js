import React from 'react';
import ReactCrop from 'react-image-crop'
import Bar from './Bar';
import App from './App';
import { StyleSheet, View } from 'react-native';
const styles = StyleSheet.create({
  centre:{
      margin: 'auto',
      marginTop:'10px',
      width: '90%',
      border: '3px solid green',
      padding: '10px'
  },
  margin:{
    marginTop:'30px'
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
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '25%',
    minHeight:'35px',
    border: '3px solid green',
    backgroundColor:'#1d222a',
    color:'white'
  },
  
  input_box: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '31%',
    border: '3px solid green',
    backgroundColor:'#1d222a'
  },
  output_box: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '35%',
    minHeight: '400px',
    border: '3px solid green',
    backgroundColor:'#1d222a'
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