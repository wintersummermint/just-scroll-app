/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import ProgressiveImage from './ProgressiveImage';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [hasError, setErrors] = useState(false);
  const [data, setData] = useState([]);

  async function fetchData() {
    Promise.all([
      fetch('https://some-random-api.ml/meme'),
      fetch('https://some-random-api.ml/img/dog'),
      fetch('https://some-random-api.ml/meme'),
    ])
      .then(async ([aa, bb, cc]) => {
        const a = await aa.json();
        const b = await bb.json();
        const c = await cc.json();
        return [a, b, c];
      })
      .then(responseText => {
        console.log(responseText);
        setData(responseText);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function renderMore() {
    Promise.all([
      fetch('https://some-random-api.ml/meme'),
      fetch('https://some-random-api.ml/img/koala'),
      fetch('https://some-random-api.ml/img/cat'),
    ])
      .then(async ([aa, bb, cc]) => {
        const a = await aa.json();
        const b = await bb.json();
        const c = await cc.json();
        return [a, b, c];
      })
      .then(responseText => {
        setData(data.concat(responseText));
      })
      .catch(err => {
        console.log(err);
      });
  }
  // Render Footer
  const renderFooter = () => {
    try {
      // Check If Loading
      if (!data) {
        return <ActivityIndicator />;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
      <View
          style={{
            paddingTop : 5,
            backgroundColor: '#507df8',
            height: 50,
            marginBottom: 10,
          }}>
          <Text style={{color: 'white', fontSize: 30, paddingLeft: 10}}>
            FakeBook Scroll
          </Text>
        </View>
        <View style={{backgroundColor: '#ccc'}}>
          <FlatList
            // Data
            data={data}
            // Render Items
            renderItem={({item}) => (
              <View
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: 'white',
                  height : 320,
                  marginBottom : 10,
                  padding : 10
                }}>
                <Text style={{fontWeight : 'bold', fontSize : 20, paddingBottom : 10}}>User</Text>
                <Text style={{paddingBottom : 5}}>🤣🤣 {item.caption || 'Dog!'}</Text>
                <ProgressiveImage
                  fadeDuration={500}
                  style={{width: 'auto', height: 280}}
                  source={{uri: item.link || item.image}}
                  progressiveRenderingEnabled={true}
                />
                
              </View>
            )}
            // Item Key
            keyExtractor={(link, index) => String(`${link}${index}`)}

            // // Footer (Activity Indicator)
            ListFooterComponent={renderFooter}
            // // On End Reached (Takes a function)
            onEndReached={renderMore}
            // // How Close To The End Of List Until Next Data Request Is Made
            // onEndReachedThreshold={0}
            // // Refreshing (Set To True When End Reached)
            // refreshing={false}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
