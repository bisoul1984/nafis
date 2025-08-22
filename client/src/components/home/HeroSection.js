import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedButton from '../common/AnimatedButton';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-start pt-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-secondary-200 dark:bg-secondary-800 rounded-full opacity-20"
          animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-12 h-12 bg-accent-200 dark:bg-accent-800 rounded-full opacity-20"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Heading with Enhanced Typography */}
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-gray-900 dark:text-white mb-4 sm:mb-6 font-features-display text-gradient leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Experience Professional
              <br />
              <span className="text-primary-600 dark:text-primary-400">Foot Reflexology</span>
            </motion.h1>

            {/* Subtitle with Enhanced Readability */}
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-readable-wide text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover the ancient healing art of reflexology for stress relief, improved circulation, 
              and holistic wellness. Our expert therapists provide personalized treatments in a serene, 
              professional environment.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/booking"
                className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
              >
                Book Your Session
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">10+</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-heading">
                  Years Experience
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-readable">
                  Professional reflexology expertise
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">500+</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-heading">
                  Happy Clients
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-readable">
                  Satisfied customers and positive reviews
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent-600 dark:text-accent-400">100%</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-heading">
                  Natural Healing
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-readable">
                  Holistic and natural treatment approach
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default HeroSection; 