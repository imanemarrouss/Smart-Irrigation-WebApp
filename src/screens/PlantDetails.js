import { View, Text, Image } from 'react-native';

export const PlantDetails = ( {route} ) => {
  const { asset } = route.params;

  return (
    <View>
      <Image source={{ uri: asset.uri }} style={{ width: '100%', height: 300 }} />
      <Text>{asset.title}</Text>
      {/* Ajoutez ici les autres informations de la plante */}
    </View>
  );
}