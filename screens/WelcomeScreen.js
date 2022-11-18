
import { useState } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, Image, Text, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/ui/Button';
function WelcomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState([]);

  const pickImage = async () => {
    setIsLoading(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [4, 3],
      quality: 1,
    });
    setIsLoading(false);
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri ? [result.uri] : result.selected);
    }

  };

  return (
    <View>
      <View style={styles.rootContainer} >
        <Button children={"Pick an image from camera roll"} onPress={pickImage} />
      </View>
      <View>
        {isLoading ? <View style={{ justifyContent: 'center', alignSelf: 'center', alignContent: 'center', zIndex: 0, width: '100%',position:'absolute',height: 350 }}>
          <ActivityIndicator color="white" /></View> : <FlatList
          data={image}
          renderItem={({ item }) => (
            <View style={{ flex: 3, flexDirection: 'column', margin: 1 }}>

              <Image style={styles.imageThumbnail} source={{ uri: item.uri }} />

            </View>
          )}
          numColumns={3}
          keyExtractor={(index) => index.uri}
        />}
      </View>

    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  container: {
    flex: 3,
    justifyContent: 'center',
    // backgroundColor: 'white',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: 'pink'
  }
});