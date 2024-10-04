import { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';

export default function useAlbumFetcher(albumName) {
  const [albumAssets, setAlbumAssets] = useState([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    async function fetchAlbum() {
      if (permissionResponse && permissionResponse.status !== 'granted') {
        await requestPermission();
      }
      const fetchedAlbum = await MediaLibrary.getAlbumAsync(albumName);
      if (fetchedAlbum) {
        const albumAssets = await MediaLibrary.getAssetsAsync({ album: fetchedAlbum }, { sortedBy: ['creationTime'] });
        const formattedAssets = albumAssets.assets.map(asset => ({
          id: asset.id,
          uri: asset.uri,
          title: asset.filename,
          creationTime: asset.creationTime
        }));
        setAlbumAssets(formattedAssets);
      }
    }
    if (permissionResponse) {
      fetchAlbum();
    }
  }, [permissionResponse, albumName]);

  return albumAssets;
}
