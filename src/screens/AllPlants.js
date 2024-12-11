import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router for web navigation
import useAlbumFetcher from '../components/AlbumFetcher';
import AddPlants from './AddPlants';
import './AllPlants.css'; // CSS file for styling

const numColumns = 2;

export function AllPlants() {
  const albumAssets = useAlbumFetcher('Plants');
  const navigate = useNavigate();

  const renderItem = (item) => (
    <AlbumEntry key={item.id} asset={item} navigate={navigate} />
  );

  const renderFooter = () => (
    // <div onClick={() => navigate('/add-plants')} className="image-footer">
    <div
    role="button"
    tabIndex={0}
    onClick={() => navigate('/add-plants')}
    onKeyPress={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        navigate('/add-plants');
      }
    }}
    className="image-footer"
  >
      <img src={require('../../assets/addPlantIcon.png')} alt="Add Plant" className="image-footer" />
    </div>
  );

  
  


  

  return (
    <div className="container">
      <div className="album-assets-container">
        {albumAssets.map(renderItem)}
        {renderFooter()}
      </div>
    </div>
  );
}

function AlbumEntry({ asset, navigate }) {
  return (
    <div className="image-back">
      <div
  role="button"
  tabIndex={0}
  onClick={() => navigate(`/light-control/${asset.id}`)}
  onKeyPress={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      navigate(`/light-control/${asset.id}`);
    }
  }}
>
      {/* <div onClick={() => navigate(`/light-control/${asset.id}`)}> */}
        <img src={asset.uri} alt={asset.title} className="image" />
        <div className="inner-shadow" />
        <p className="text-on-image">{asset.title.split('.').slice(0, -1).join('.')}</p>
      </div>
    </div>
  );
}

export default AllPlants;
