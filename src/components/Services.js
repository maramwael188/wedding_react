import React from 'react';
import { Link } from 'react-router-dom';
import weddingress from '../assets/images/wedd.jpg';
import makeup from '../assets/images/makeup.jpg';
import beauty from '../assets/images/beauty.png';
import photographer from '../assets/images/ph.png'; 
import car from '../assets/images/car.jpg';
import honeymoon from '../assets/images/honeymoon.png';

const services = [
  { name: 'Wedding Dresses', image: weddingress , link: '/dress' },
  { name: 'Makeup Artists', image: makeup, link: '/makeup' },
  { name: 'Beauty Centers', image: beauty, link: '/beauty-center' },
  { name: 'Photographers', image: photographer, link: '/photographer' },
  { name: 'Cars', image: car , link: '/cars' },
  { name: 'Honeymoon Trips', image: honeymoon, link: '/trips' },
];

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-white bg-pink-500 p-4 rounded-lg">
        Available Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Link to={service.link} key={index}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="w-full h-48 relative">
            <img src={service.image} alt={service.name}  className="w-full h-full object-contain"/>
            </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-pink-500">{service.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
