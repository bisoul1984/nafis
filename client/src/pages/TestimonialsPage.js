import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

const TestimonialsPage = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Amazing experience! The reflexology session was incredibly relaxing and helped with my stress levels significantly. I highly recommend Nafis Reflexology.",
      service: "Relaxation Reflexology"
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Professional service and excellent results. My circulation has improved and I feel much more energized after each session.",
      service: "Therapeutic Reflexology"
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      text: "The staff is wonderful and the atmosphere is so peaceful. I've been coming regularly and noticed a big improvement in my sleep quality.",
      service: "Premium Wellness Session"
    },
    {
      name: "David Wilson",
      rating: 5,
      text: "Outstanding service! The reflexology treatment helped relieve my chronic foot pain. The therapist was very knowledgeable and professional.",
      service: "Therapeutic Reflexology"
    },
    {
      name: "Lisa Thompson",
      rating: 5,
      text: "I love the holistic approach here. The sessions are not just relaxing but truly therapeutic. My overall wellness has improved dramatically.",
      service: "Premium Wellness Session"
    },
    {
      name: "Robert Davis",
      rating: 5,
      text: "Great experience from start to finish. The booking was easy, the facility is clean, and the treatment was exactly what I needed for stress relief.",
      service: "Relaxation Reflexology"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Client Testimonials - Nafis Reflexology | What Our Clients Say</title>
        <meta name="description" content="Read what our clients say about their reflexology experiences at Nafis Reflexology. Real testimonials from satisfied customers." />
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
                Client Testimonials
              </h1>
              <p className="text-xl lg:text-2xl text-pink-100 mb-8">
                What our clients say about their reflexology experiences
              </p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 lg:py-24">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, threshold: 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-pink-600">{testimonial.service}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
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
                Our Success Numbers
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "500+", label: "Happy Clients" },
                { number: "4.9", label: "Average Rating" },
                { number: "1000+", label: "Sessions Completed" },
                { number: "98%", label: "Client Satisfaction" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, threshold: 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-pink-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-700 font-medium">
                    {stat.label}
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
                Ready to Experience the Benefits?
              </h2>
              <p className="text-xl text-pink-100 mb-8">
                Join our satisfied clients and book your reflexology session today.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Book Your Session
              </motion.button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TestimonialsPage; 