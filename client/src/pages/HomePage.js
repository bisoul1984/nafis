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