import React from 'react';
import ReactCrop from 'react-image-crop'
import App from './App';
// import { IconName } from "react-icons/fa";
// import { IconName } from "react-icons/fa";
import {
  StyleSheet,
  View
} from 'react-native';
// const [imageUrl, setImageUrl] = useState(null);
  // useEffect(() => {
  //   if (selectedImage) {
  //     setImageUrl(URL.createObjectURL(selectedImage));
  //   }
  // }, [selectedImage]);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header: {
    height: 40,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#03A9F4',
    zIndex: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  input_box: {
    width: 550,
    height: 550,
    backgroundColor: '#333',
    marginBottom: 10
  }
});
export default function HeaderFooter() {
    return (
        <View style={styles.container}>
          {/* <View style={[styles.header]}></View> */}
          <View style={[styles.row]}>
            <View style={[styles.input_box]}>
              <App/>
            </View> 
            <View style={[styles.input_box]}>
                <App/>
            </View>  
            <View style={[styles.input_box]}>
            </View> 
          </View> 
        </View> 
    );
}