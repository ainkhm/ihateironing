import React,{ FC } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity, 
  Image,
} from 'react-native';
import { NavigationState, NavigationParams, NavigationScreenProp } from "react-navigation";
import { COLOURS } from '../../common/constants';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import useProducts from "../../hooks/useProducts";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const Home:FC<Props> = ({navigation}) => {

  const { products } = useProducts();

  const ProductCard = ({data}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductInfo', {id: data.id})}
        style={{
          width: '48%',
          marginVertical: 14,
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            borderRadius: 10,
            backgroundColor: COLOURS.backgroundLight,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          
          <Image
            source={{uri: data.image}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}>
          {data.name}
        </Text>
       
        <Text>&#163; {data.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{
      width: '100%',
      height: '100%',
      backgroundColor: COLOURS.white,
    }}>
   
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: 16,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('MyCart')} style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: COLOURS.backgroundLight,
          }}>
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
              }}
            />
            <Text>{2}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 10,
            padding: 16,
          }}>
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.black,
              fontWeight: '500',
              letterSpacing: 1,
              marginBottom: 10,
            }}>
            Ironing &amp; washing
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              lineHeight: 24,
            }}>
            DRY CLEANING &amp; LAUNDRY
            {'\n'}Collected and delivered to your door
          </Text>
        </View>
        <View
          style={{
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                Products
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: '400',
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                {products.length}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: '400',
              }}>
              SeeAll
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'start',
            }}>
            {products.map(data => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
        </View>

        <View
          style={{
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;