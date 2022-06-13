import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Modal,
  Animated,
  Easing,
  DrawerLayoutAndroidBase,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {getDetailPokemon} from './redux/action';
import {useDispatch, useSelector} from 'react-redux';
import {ms} from 'react-native-size-matters';
import Comfortaa from '../../components/Comfortaa';
import {colors} from '../../res/colors';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';

export default function Index({route}) {
  const dispatch = useDispatch();
  const {detailPokemon} = useSelector(state => state.detailPokemon);
  const {user} = useSelector(state => state.global);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [success, setSuccess] = useState(null);
  const [pokemon, setPokemon] = useState(user.pokemon);
  const [catched, setCatched] = useState(false);
  const rarity = (detailPokemon?.base_experience / 20)?.toFixed(0);
  const initialValue = useState(
    new Animated.Value(-widthPercentageToDP('100%')),
  )[0];
  const leftValue = useState(
    new Animated.Value(-widthPercentageToDP('100%')),
  )[0];

  const search = (key, arr) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].name === key) {
        return true;
      }
    }
    return false;
  };

  useMemo(() => {
    if (pokemon) setCatched(search(detailPokemon?.name, pokemon));
    console.log(catched, 'catched');
  }, [detailPokemon]);

  const catchButton = useCallback(() => {
    if (!catched)
      return (
        <TouchableOpacity
          style={{
            backgroundColor: 'coral',
            padding: ms(10),
            borderRadius: ms(5),
            marginTop: ms(10),
          }}
          onPress={() => {
            setModalVisible(true);
            Animated.timing(leftValue, {
              toValue: 0,
              duration: 10000,
              useNativeDriver: true,
            }).start(() => {
              setModalVisible(false);
              Animated.timing(leftValue).reset();
              setModalVisible2(true);
              setSuccess(catchPokemon(detailPokemon));
            });
            console.log(leftValue);
          }}>
          <Comfortaa type="Bold">Coba Tangkap Pokemon</Comfortaa>
        </TouchableOpacity>
      );
    else
      return (
        <Comfortaa
          type="Bold"
          style={{
            backgroundColor: 'green',
            padding: ms(10),
            borderRadius: ms(5),
            marginTop: ms(10),
          }}>
          Pokemon Sudah Dimiliki
        </Comfortaa>
      );
  }, [catched]);

  const catchPokemon = detailPokemon => {
    const result = (((Math.random() * 100) % rarity) + 1).toFixed(0);
    console.log(pokemon);
    console.log(result == rarity);

    if (result == rarity) {
      if (pokemon) {
        database()
          .ref('users/' + user._id)
          .update({
            pokemon: [
              ...pokemon,
              {
                _id: detailPokemon.id,
                name: detailPokemon.name,
                photo:
                  detailPokemon?.sprites?.other['official-artwork']
                    ?.front_default,
              },
            ],
          });
        setPokemon([
          ...pokemon,
          {
            _id: detailPokemon.id,
            name: detailPokemon.name,
            photo:
              detailPokemon?.sprites?.other['official-artwork']?.front_default,
          },
        ]);
      } else {
        database()
          .ref('users/' + user._id)
          .update({
            pokemon: [
              {
                _id: detailPokemon.id,
                name: detailPokemon.name,
                photo:
                  detailPokemon?.sprites?.other['official-artwork']
                    ?.front_default,
              },
            ],
          });
        setPokemon([
          {
            _id: detailPokemon.id,
            name: detailPokemon.name,
            photo:
              detailPokemon?.sprites?.other['official-artwork']?.front_default,
          },
        ]);
      }

      return true;
    } else return false;
  };

  useEffect(() => {
    dispatch(getDetailPokemon(route.params.url));
  }, []);

  return (
    <View
      style={{
        backgroundColor: colors.primaryDark,
        height: heightPercentageToDP('100%'),
      }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
          setSuccess(null);
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: heightPercentageToDP('100%'),
            width: widthPercentageToDP('100%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {success ? (
            <Comfortaa>Sukses Menangkap Pokemon</Comfortaa>
          ) : (
            <Comfortaa>Gagal Menangkap Pokemon</Comfortaa>
          )}
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            height: heightPercentageToDP('100%'),
            width: widthPercentageToDP('100%'),
            paddingHorizontal: ms(10),
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              overflow: 'hidden',
            }}>
            <Animated.View
              style={{
                width: widthPercentageToDP('100%') - ms(20),
                height: ms(30),
                backgroundColor: colors.primary,
                transform: [
                  {
                    translateX: leftValue,
                  },
                ],
                // paddingLeft: leftValue,
              }}
            />
          </View>
        </View>
      </Modal>
      <View style={{alignItems: 'center', marginBottom: ms(20)}}>
        <Image
          source={{
            uri: detailPokemon?.sprites?.other['official-artwork']
              ?.front_default,
          }}
          style={{width: ms(300), height: ms(300)}}
          resizeMode="contain"
        />
        <Comfortaa size={ms(20)}>
          {detailPokemon?.name?.toUpperCase()}
        </Comfortaa>
        <Comfortaa>Pity Rate : {((1 / rarity) * 100).toFixed(1)}%</Comfortaa>
        {catchButton()}
      </View>
      <Comfortaa
        style={{
          paddingVertical: ms(10),
          width: widthPercentageToDP('100%'),
          textAlign: 'center',
          backgroundColor: colors.primaryLight,
          color: colors.primaryDark,
          marginBottom: ms(20),
        }}>
        Profile
      </Comfortaa>
      <View style={{padding: ms(10)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Comfortaa style={styles.headerTable}>Height</Comfortaa>
          <Comfortaa style={styles.headerTable}>Weight</Comfortaa>
          <Comfortaa style={styles.headerTable}>Species</Comfortaa>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Comfortaa style={styles.tableContent}>
            {detailPokemon?.height} cm
          </Comfortaa>
          <Comfortaa style={styles.tableContent}>
            {detailPokemon?.weight} kg
          </Comfortaa>
          <Comfortaa style={styles.tableContent}>
            {detailPokemon?.species.name}
          </Comfortaa>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: ms(10),
        }}>
        <View>
          <Comfortaa type="Bold" size={17} style={{marginTop: ms(10)}}>
            Type
          </Comfortaa>
          <FlatList
            data={detailPokemon?.types}
            renderItem={({item}) => (
              <Comfortaa>▶ {item?.type?.name} </Comfortaa>
            )}
          />
        </View>
        <View>
          <Comfortaa type="Bold" size={17} style={{marginTop: ms(10)}}>
            Ability
          </Comfortaa>
          <FlatList
            data={detailPokemon?.abilities}
            renderItem={({item}) => (
              <Comfortaa>▶ {item?.ability?.name} </Comfortaa>
            )}
          />
        </View>
        <View>
          <Comfortaa type="Bold" size={17} style={{marginTop: ms(10)}}>
            Moves
          </Comfortaa>
          <FlatList
            data={detailPokemon?.moves}
            renderItem={({item}) => (
              <Comfortaa>▶ {item?.move?.name} </Comfortaa>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTable: {
    paddingVertical: ms(10),
    backgroundColor: colors.primary,
    width: (widthPercentageToDP('100%') - ms(20)) / 3,
    textAlign: 'center',
    color: colors.primaryDark,
    borderWidth: 1,
    borderColor: 'white',
  },
  tableContent: {
    paddingVertical: ms(10),
    width: (widthPercentageToDP('100%') - ms(20)) / 3,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderTopWidth: 0,
  },
});
