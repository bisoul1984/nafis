import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Youtube, 
  MessageCircle,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();





  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: <Facebook className="w-5 h-5" />, 
      href: 'https://facebook.com/nafisreflexology',
      color: 'hover:bg-blue-600'
    },
    { 
      name: 'Instagram', 
      icon: <Instagram className="w-5 h-5" />, 
      href: 'https://instagram.com/nafisreflexology',
      color: 'hover:bg-pink-600'
    },
    { 
      name: 'YouTube', 
      icon: <Youtube className="w-5 h-5" />, 
      href: 'https://youtube.com/nafisreflexology',
      color: 'hover:bg-red-600'
    },
    { 
      name: 'WhatsApp', 
      icon: <MessageCircle className="w-5 h-5" />, 
      href: 'https://wa.me/1234567890',
      color: 'hover:bg-green-600'
    },
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      text: '123 Wellness Street, City, State 12345',
      href: null
    },
    {
      icon: <Phone className="w-5 h-5" />,
      text: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      text: 'info@nafisreflexology.com',
      href: 'mailto:info@nafisreflexology.com'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      text: 'Mon-Sat: 9:00 AM - 6:00 PM',
      href: null
    },
  ];



  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    N
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                      Nafis Reflexology
                    </h3>
                    <p className="text-sm text-gray-300">
                      Your journey to wellness starts here
                    </p>
                  </div>
                </div>
                




                {/* Social Links */}
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-gray-700 rounded-xl flex items-center justify-center text-gray-300 transition-all duration-300 ${social.color} hover:text-white hover:scale-110 shadow-lg`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>





            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white border-b border-pink-500/30 pb-2">
                Contact Info
              </h4>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="text-pink-400 mt-1 flex-shrink-0">
                      {info.icon}
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-300 hover:text-pink-400 transition-colors duration-300 text-sm leading-relaxed"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {info.text}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-6"
              >
                <Link
                  to="/booking"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Book Now
                  <ArrowUp className="w-4 h-4 ml-2 rotate-45" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700/50 bg-black/20">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-gray-400 text-sm text-center md:text-left"
              >
                © {currentYear} Nafis Reflexology. All rights reserved.
              </motion.div>

              {/* Legal Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-6 text-sm"
              >
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/accessibility"
                  className="text-gray-400 hover:text-pink-400 transition-colors duration-300"
                >
                  Accessibility
                </Link>
              </motion.div>
            </div>
            
            {/* Developer Credit */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 pt-4 border-t border-gray-700/30"
            >
              <div className="text-center">
                <p className="text-gray-400 text-sm font-medium">
                  Designed and built by{' '}
                  <a
                    href="https://www.wondwossendev.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300 transition-colors duration-300 font-semibold underline"
                  >
                    Wondwossen Hailhu
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:from-pink-600 hover:to-purple-700 transition-all duration-300 z-40 group"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
      </motion.button>
    </footer>
  );
};

export default Footer; 