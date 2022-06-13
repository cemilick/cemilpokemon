import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Comfortaa from '../../components/Comfortaa';
import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ms} from 'react-native-size-matters';
import {colors} from '../../res/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {getPokemon} from './redux/action';
import {BASE_URL} from '../../helpers/apiAccess';

export default function Index({navigation}) {
  const {user} = useSelector(state => state.global);
  const {pokemon} = useSelector(state => state.pokemon);
  const [endpoint, setEndpoint] = useState(`${BASE_URL}/pokemon/?limit=20`);
  // const [pokemon, setPokemon] = useState({});
  const dispatch = useDispatch();

  useMemo(() => {
    dispatch(getPokemon(endpoint));
    console.log(pokemon, 'pokemon');
  }, [endpoint]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{uri: user.photo}}
          style={styles.profile}
          resizeMode="contain"
        />
        <View>
          <Comfortaa style={{color: colors.primaryDark}}>Logout</Comfortaa>
        </View>
      </View>
      <FlatList
        data={pokemon.results}
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: ms(20),
        }}>
        {pokemon.previous ? (
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: ms(10),
              borderRadius: ms(5),
            }}
            onPress={() => setEndpoint(pokemon.previous)}>
            <Comfortaa style={{color: colors.primaryDark}}>
              Sebelumnya
            </Comfortaa>
          </TouchableOpacity>
        ) : (
          <></>
        )}
        {pokemon.next ? (
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: ms(10),
              borderRadius: ms(5),
            }}
            onPress={() => setEndpoint(pokemon.next)}>
            <Comfortaa style={{color: colors.primaryDark}}>
              Selanjutnya
            </Comfortaa>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
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
