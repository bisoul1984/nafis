import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import { Footprints, HeartHandshake, Star } from 'lucide-react';

const ServicesPage = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Footprints className="w-16 h-16 text-pink-500" />,
      title: "Relaxation Reflexology",
      duration: "60 minutes",
      price: "$75",
      description: "A gentle, relaxing session focused on stress relief and overall relaxation.",
      benefits: ["Reduces stress", "Improves sleep", "Promotes relaxation"]
    },
    {
      icon: <HeartHandshake className="w-16 h-16 text-purple-500" />,
      title: "Therapeutic Reflexology",
      duration: "90 minutes",
      price: "$110",
      description: "A comprehensive session targeting specific health concerns and promoting healing.",
      benefits: ["Pain relief", "Improved circulation", "Enhanced healing"]
    },
    {
      icon: <Star className="w-16 h-16 text-yellow-500" />,
      title: "Premium Wellness Session",
      duration: "120 minutes",
      price: "$140",
      description: "Our most comprehensive session including advanced techniques and aromatherapy.",
      benefits: ["Deep relaxation", "Full body wellness", "Aromatherapy included"]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Services - Nafis Reflexology | Professional Reflexology Services</title>
        <meta name="description" content="Explore our range of professional reflexology services designed to promote healing, relaxation, and overall wellness." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-r from-pink-500 to-purple-600">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Our Services
              </h1>
              <p className="text-xl lg:text-2xl text-pink-100 mb-8">
                Professional reflexology services for healing, relaxation, and wellness
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, threshold: 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex justify-center mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600">{service.duration}</span>
                      <span className="text-2xl font-bold text-pink-600">{service.price}</span>
                    </div>
                    <p className="text-gray-700 mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <span className="text-pink-500 mr-2">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 bg-gray-50">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                    >
                      Book This Service
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-pink-500 to-purple-600">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Book Your Session?
              </h2>
              <p className="text-xl text-pink-100 mb-8">
                Choose the service that best fits your needs and schedule your appointment today.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Book Now
              </motion.button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage; 