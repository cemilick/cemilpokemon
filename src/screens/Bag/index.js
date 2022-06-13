import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {ms} from 'react-native-size-matters';
import {colors} from '../../res/colors';
import Comfortaa from '../../components/Comfortaa';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
export default function Index({navigation}) {
  const {user} = useSelector(state => state.global);
  const pokemon = user.pokemon;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      BackHandler.addEventListener('hardwareBackPress', () => {
        BackHandler.exitApp();
        return true;
      });
      return true;
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primaryDark,
            paddingHorizontal: ms(20),
            paddingVertical: ms(10),
            borderRadius: ms(5),
          }}
          onPress={() => navigation.goBack()}>
          <Comfortaa>Kembali</Comfortaa>
        </TouchableOpacity>

        <Comfortaa size={20} type="Bold">
          My Bag
        </Comfortaa>
      </View>
      {pokemon ? (
        <FlatList
          data={pokemon}
          numColumns={2}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                padding: ms(15),
                backgroundColor: colors.primaryLight,
                marginHorizontal: ms(10),
                marginVertical: ms(9),
                width: ms(160),
                borderRadius: ms(5),
              }}
              onPress={() => navigation.navigate('Detail', {url: item.url})}>
              <Comfortaa style={{color: colors.primaryDark}}>
                {item.name}
              </Comfortaa>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View
          style={{
            width: widthPercentageToDP('100%'),
            height: hp('100%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Comfortaa>Kamu Belum Memiliki Pokemon Sama Sekali!</Comfortaa>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    height: hp('100%'),
  },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: ms(20),
    paddingVertical: ms(10),
    alignItems: 'center',
    marginBottom: ms(7),
  },
  profile: {
    width: ms(50),
    height: ms(50),
    borderRadius: ms(50),
  },
});
