import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Footprints, Users, Calendar, Phone, Award, Star, Shield, Leaf } from 'lucide-react';

// Enhanced Components
import PageTransition from '../components/common/PageTransition';
import AnimatedButton from '../components/common/AnimatedButton';
import AnimatedCard from '../components/common/AnimatedCard';
import ParallaxSection from '../components/common/ParallaxSection';
import StaggeredContainer from '../components/common/StaggeredContainer';

// Components
import HeroSection from '../components/home/HeroSection';
import BenefitsSection from '../components/home/BenefitsSection';
import ServicesPreview from '../components/home/ServicesPreview';
import TestimonialsSection from '../components/home/TestimonialsSection';
import NewsletterSignup from '../components/home/NewsletterSignup';
import CTASection from '../components/home/CTASection';

// Hooks
import { useLanguage } from '../contexts/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <PageTransition>
      <Helmet>
        <title>Nafis Reflexology - Professional Foot Reflexology & Wellness Services</title>
        <meta name="description" content="Experience professional foot reflexology for stress relief, improved circulation, and holistic healing. Book your session today at Nafis Reflexology." />
        <meta name="keywords" content="reflexology, foot massage, stress relief, wellness, holistic healing, relaxation, therapy" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HealthAndBeautyBusiness",
            "name": "Nafis Reflexology",
            "description": "Professional foot reflexology and wellness services",
            "url": "https://nafisreflexology.com",
            "telephone": "+1-555-123-4567",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Wellness Street",
              "addressLocality": "City",
              "addressRegion": "State",
              "postalCode": "12345",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "40.7128",
              "longitude": "-74.0060"
            },
            "openingHours": "Mo-Sa 09:00-18:00",
            "priceRange": "$$",
            "serviceType": "Foot Reflexology",
            "areaServed": "Local Area",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Reflexology Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Relaxation Reflexology",
                    "description": "60-minute relaxation reflexology session"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Benefits Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <BenefitsSection />
        </motion.div>

        {/* Services Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, threshold: 0.1 }}
        >
          <ServicesPreview />
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, threshold: 0.1 }}
        >
          <TestimonialsSection />
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, threshold: 0.1 }}
        >
          <NewsletterSignup />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, threshold: 0.1 }}
        >
          <CTASection />
        </motion.div>

        {/* Quick Links */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, threshold: 0.1 }}
              className="text-center mb-12"
            >
                             <h2 className="text-3xl md:text-4xl font-display font-bold text-black dark:text-white mb-4" style={{ color: 'black' }}>
                 {t('home.quickLinks.title')}
               </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('home.quickLinks.subtitle')}
              </p>
            </motion.div>

            <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" direction="up" staggerDelay={0.15}>
              {[
                {
                  title: t('nav.about'),
                  description: t('home.quickLinks.aboutDesc'),
                  icon: <Footprints className="w-8 h-8 text-white" />,
                  link: '/about',
                  color: 'from-primary-500 to-primary-600'
                },
                {
                  title: t('nav.services'),
                  description: t('home.quickLinks.servicesDesc'),
                  icon: <Users className="w-8 h-8 text-white" />,
                  link: '/services',
                  color: 'from-secondary-500 to-secondary-600'
                },
                {
                  title: t('nav.booking'),
                  description: t('home.quickLinks.bookingDesc'),
                  icon: <Calendar className="w-8 h-8 text-white" />,
                  link: '/booking',
                  color: 'from-accent-500 to-accent-600'
                },
                {
                  title: t('nav.contact'),
                  description: t('home.quickLinks.contactDesc'),
                  icon: <Phone className="w-8 h-8 text-white" />,
                  link: '/contact',
                  color: 'from-primary-600 to-secondary-600'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link
                    to={item.link}
                    className="block card card-hover p-6 text-center h-full"
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-4 text-primary-600 dark:text-primary-400 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                      {t('common.learnMore')} →
                    </div>
                  </Link>
                </motion.div>
              ))}
            </StaggeredContainer>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, threshold: 0.1 }}
              className="text-center"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-8">
                {t('home.trust.title')}
              </h3>
              <StaggeredContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center" direction="scale" staggerDelay={0.1}>
                {[
                  { icon: <Award className="w-8 h-8 text-yellow-600" />, text: t('home.trust.certified') },
                  { icon: <Star className="w-8 h-8 text-yellow-500" />, text: t('home.trust.experienced') },
                  { icon: <Shield className="w-8 h-8 text-blue-600" />, text: t('home.trust.secure') },
                  { icon: <Leaf className="w-8 h-8 text-green-600" />, text: t('home.trust.natural') }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center"
                  >
                    <div className="mb-2">{item.icon}</div>
                    <p className="text-sm text-gray-700 font-medium">{item.text}</p>
                  </motion.div>
                ))}
              </StaggeredContainer>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default HomePage; 