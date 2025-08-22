import React from 'react';
import { Link } from 'react-router-dom';

const ServicesPreview = () => {
  const services = [
    {
      name: 'Foot Reflexology',
      duration: '60 min',
      price: '$75',
      description: 'Complete foot reflexology treatment targeting all pressure points.'
    },
    {
      name: 'Hand Reflexology',
      duration: '45 min',
      price: '$55',
      description: 'Therapeutic hand reflexology for stress relief and relaxation.'
    },
    {
      name: 'Ear Reflexology',
      duration: '30 min',
      price: '$40',
      description: 'Specialized ear reflexology for targeted healing.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional reflexology treatments tailored to your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.name}
              </h3>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600">{service.duration}</span>
                <span className="text-2xl font-bold text-purple-600">{service.price}</span>
              </div>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <Link
                to="/booking"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-200"
          >
            View All Services
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview; 