import React, { useState } from 'react';
import './card.css'; 

const Card = () => {
  const initialImages = [
    {
      src: 'https://i.ibb.co/qCkd9jS/img1.jpg',
      title: 'Switzerland',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
    },
    {
      src: 'https://i.ibb.co/jrRb11q/img2.jpg',
      title: 'Finland',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
    },
    {
      src: 'https://i.ibb.co/NSwVv8D/img3.jpg',
      title: 'Iceland',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
    },
    {
      src: 'https://i.ibb.co/Bq4Q0M8/img4.jpg',
      title: 'Australia',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
    },
    {
      src: 'https://i.ibb.co/jTQfmTq/img5.jpg',
      title: 'Netherland',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
    },
    {
      src: 'https://i.ibb.co/RNkk6L0/img6.jpg',
      title: 'Ireland',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
    },
  ];

  const [images, setImages] = useState(initialImages);

  const nextSlide = () => {
    setImages((prevImages) => {
      const firstImage = prevImages[0];
      const restImages = prevImages.slice(1);
      return [...restImages, firstImage];
    });
  };

  const prevSlide = () => {
    setImages((prevImages) => {
      const lastImage = prevImages[prevImages.length - 1];
      const restImages = prevImages.slice(0, prevImages.length - 1);
      return [lastImage, ...restImages];
    });
  };

  return (
    <div>
      <hr className="w-[75%] mx-auto border-black border-2 rounded-full my-5" />
      <h1 className='font-extrabold mx-auto text-center  text-green-700'>Our Special Domains</h1>
      <div className="card-container">
     
    <div className="container">
      <div className="slide">
        {images.map((image, index) => (
          <div
            key={index}
            className={`item ${index === 0 ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image.src})` }}
          >
            <div className="content">
              <div className="name">{image.title}</div>
              <div className="des">{image.description}</div>
              <button>See More</button>
            </div>
          </div>
        ))}
      </div>
      <div className="button">
        <button className="prev" onClick={prevSlide}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <button className="next" onClick={nextSlide}>
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
    
  </div>
  <hr className="w-[75%] mx-auto border-black border-2 rounded-full my-5" />
  </div>
    
  );
};

export default Card;
