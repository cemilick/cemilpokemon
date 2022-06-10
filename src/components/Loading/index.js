import {Dimensions, Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

import AnimatedLottieView from 'lottie-react-native';
import loader from '../../assets/loaders/loader-primary.json';
import Comfortaa from '../Comfortaa';

export default function Index({transparent = true}) {
  const {loading} = useSelector(state => state.global);
  const styles = StyleSheet.create({
    loaderContainer: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      backgroundColor: 'rgba(0,0,0,0.5)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  const styles2 = StyleSheet.create({
    loaderContainer: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      backgroundColor: 'rgba(0,0,0,1)',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <Modal visible={loading} transparent={true} animationType="fade">
      {transparent ? (
        <View style={styles.loaderContainer}>
          <AnimatedLottieView source={loader} autoPlay loop autoSize />
          <Comfortaa>Loading Gaes . . . </Comfortaa>
        </View>
      ) : (
        <View style={styles2.loaderContainer}>
          <AnimatedLottieView source={loader} autoPlay loop autoSize />
          <Comfortaa>Loading Gaes . . . </Comfortaa>
        </View>
      )}
    </Modal>
  );
}
