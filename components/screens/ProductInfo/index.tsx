import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { COLOURS } from '../../common/constants';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductInfo = ({route, navigation}) => {
  const {productID} = route.params;

  const [product, setProduct] = useState({});

  const width = Dimensions.get('window').width;

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
     async function getItem() {
        let response = await api.get(`items/${productID}`);
        setProduct(response.data);
      }
      getItem()

    });

    return unsubscribe;
  }, [navigation]);


  const addToCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        Toast.show(
          'Item Added Successfully to cart',
          Toast.SHORT,
        );
        navigation.navigate('MyCart');
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        Toast.show(
          'Item Added Successfully to cart',
          Toast.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    }
  };

  const renderProduct = ({item, index}) => {
    return (
      <View
        style={{
          width: width,
          height: 340,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: item}}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
      }}>
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView>
        <View
          style={{
            width: '100%',
            backgroundColor: COLOURS.backgroundLight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
              paddingLeft: 16,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.white,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={[product.image, product.image, product.image] || null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            style={{paddingTop:15}}
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              marginTop: 32,
            }}>
            {product.image
              ? [product.image, product.image, product.image].map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={`key-${index}`}
                      style={{
                        width: '16%',
                        height: 2.4,
                        backgroundColor: COLOURS.black,
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                      }}></Animated.View>
                  );
                })
              : null}
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 6,
          }}>
          
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 4,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                letterSpacing: 0.5,
                marginVertical: 4,
                color: COLOURS.black,
                maxWidth: '84%',
              }}>
              {product.name}
            </Text>
            <Ionicons
              name="link-outline"
              style={{
                fontSize: 24,
                color: COLOURS.blue,
                backgroundColor: COLOURS.blue + 10,
                padding: 8,
                borderRadius: 100,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              opacity: 0.5,
              lineHeight: 20,
              maxWidth: '85%',
              maxHeight: 44,
              marginBottom: 18,
            }}>
            {product.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 14,
              borderBottomColor: COLOURS.backgroundLight,
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                alignItems: 'center',
              }}>
              <View
                style={{
                  color: COLOURS.blue,
                  backgroundColor: COLOURS.backgroundLight,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  borderRadius: 100,
                  marginRight: 10,
                }}>
                <Entypo
                  name="location-pin"
                  style={{
                    fontSize: 16,
                    color: COLOURS.blue,
                  }}
                />
              </View>
              <Text>We deliver your items cleaned {'\n'} within 24 hours and at the time required.</Text>
            </View>
            <Entypo
              name="chevron-right"
              style={{
                fontSize: 22,
                color: COLOURS.backgroundDark,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 16,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                maxWidth: '85%',
                color: COLOURS.black,
                marginBottom: 4,
              }}>
              &#163; {product.price}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => addToCart(product.id)}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: COLOURS.blue,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: 'uppercase',
            }}>
            {'Add to cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductInfo;