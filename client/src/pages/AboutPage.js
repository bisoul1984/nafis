import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <>
      <Helmet>
        <title>About Us - Nafis Reflexology | Professional Reflexology Services</title>
        <meta name="description" content="Learn about Nafis Reflexology's mission to provide professional reflexology services and promote wellness through natural healing techniques." />
        <meta name="keywords" content="about reflexology, wellness mission, natural healing, professional reflexology, Nafis Reflexology" />
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
                About Nafis Reflexology
              </h1>
              <p className="text-xl lg:text-2xl text-pink-100 mb-8">
                Dedicated to promoting wellness through professional reflexology services
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 lg:py-24">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                Our Mission
              </h2>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
                At Nafis Reflexology, we are committed to providing exceptional reflexology services 
                that promote natural healing and overall wellness. Our mission is to help clients 
                achieve balance, reduce stress, and improve their quality of life through 
                professional reflexology techniques.
              </p>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                We believe in the power of natural healing and strive to create a peaceful, 
                therapeutic environment where clients can relax, rejuvenate, and experience 
                the benefits of reflexology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, threshold: 0.1 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                Our Values
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: "🌟",
                  title: "Excellence",
                  description: "We maintain the highest standards of professional reflexology practice."
                },
                {
                  icon: "💚",
                  title: "Wellness",
                  description: "We promote holistic health and natural healing methods."
                },
                {
                  icon: "🤝",
                  title: "Care",
                  description: "We provide personalized care and attention to each client."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, threshold: 0.1 }}
                  className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 lg:py-24">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, threshold: 0.1 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                Our Team
              </h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Meet our dedicated team of certified reflexology professionals who are 
                passionate about helping you achieve optimal wellness.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Lead Reflexologist",
                  description: "Certified reflexologist with over 10 years of experience in natural healing therapies."
                },
                {
                  name: "Michael Chen",
                  role: "Wellness Specialist",
                  description: "Specializes in stress relief and circulation improvement through reflexology."
                },
                {
                  name: "Emily Rodriguez",
                  role: "Client Care Coordinator",
                  description: "Ensures every client receives personalized care and attention."
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, threshold: 0.1 }}
                  className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-700">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-pink-500 to-purple-600">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, threshold: 0.1 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Ready to Experience the Benefits?
              </h2>
              <p className="text-xl text-pink-100 mb-8">
                Book your reflexology session today and start your journey to better wellness.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Book Your Session
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage; 