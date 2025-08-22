import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon, Palette, Clock, Eye, EyeOff } from 'lucide-react';

const ThemeSwitcher = ({ className = "" }) => {
  const { 
    theme, 
    setTheme,
    toggleTheme, 
    colorPalette, 
    setColorPaletteTheme, 
    autoTheme, 
    toggleAutoTheme,
    highContrast,
    toggleHighContrast,
    reducedMotion,
    toggleReducedMotion
  } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions = [
    { id: 'light', name: 'Light', icon: Sun, color: 'bg-yellow-400' },
    { id: 'dark', name: 'Dark', icon: Moon, color: 'bg-slate-700' },
    { id: 'warm', name: 'Warm', icon: Sun, color: 'bg-orange-500' },
    { id: 'cool', name: 'Cool', icon: Moon, color: 'bg-blue-500' }
  ];

  const paletteOptions = [
    { id: 'default', name: 'Default', color: 'bg-gradient-to-r from-primary-500 to-secondary-500' },
    { id: 'warm', name: 'Warm', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { id: 'cool', name: 'Cool', color: 'bg-gradient-to-r from-blue-500 to-green-500' },
    { id: 'purple', name: 'Purple', color: 'bg-gradient-to-r from-purple-500 to-pink-500' }
  ];

  const containerVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Theme Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-slate-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Palette className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </motion.div>
        
        {/* Active theme indicator */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
          theme === 'light' ? 'bg-yellow-400' :
          theme === 'dark' ? 'bg-slate-700' :
          theme === 'warm' ? 'bg-orange-500' :
          'bg-blue-500'
        }`} />
      </motion.button>

      {/* Theme Options Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-600 p-4 z-50"
          >
            {/* Theme Selection */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Theme
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <motion.button
                      key={option.id}
                      variants={itemVariants}
                      onClick={() => {
                        if (theme !== option.id) {
                          setTheme(option.id);
                        }
                        setIsOpen(false);
                      }}
                      className={`p-3 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
                        theme === option.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-slate-600 hover:border-primary-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className={`w-4 h-4 mr-2 ${option.color.replace('bg-', 'text-')}`} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {option.name}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Color Palette Selection */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Color Palette
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {paletteOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    variants={itemVariants}
                    onClick={() => {
                      setColorPaletteTheme(option.id);
                      setIsOpen(false);
                    }}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                      colorPalette === option.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-slate-600 hover:border-primary-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-full h-3 rounded ${option.color} mb-2`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {option.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Auto Theme Toggle */}
            <motion.div variants={itemVariants} className="mb-4">
              <button
                onClick={() => toggleAutoTheme()}
                className={`w-full p-3 rounded-lg border-2 transition-all duration-300 flex items-center justify-between ${
                  autoTheme
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-slate-600 hover:border-primary-300'
                }`}
              >
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Auto Theme
                  </span>
                </div>
                <div className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                  autoTheme ? 'bg-primary-500' : 'bg-gray-300 dark:bg-slate-600'
                }`} />
              </button>
            </motion.div>

            {/* Accessibility Options */}
            <div className="space-y-2">
              <motion.button
                variants={itemVariants}
                onClick={() => toggleHighContrast()}
                className={`w-full p-2 rounded-lg border-2 transition-all duration-300 flex items-center justify-between ${
                  highContrast
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-slate-600 hover:border-primary-300'
                }`}
              >
                <div className="flex items-center">
                  {highContrast ? (
                    <Eye className="w-4 h-4 mr-2 text-primary-500" />
                  ) : (
                    <EyeOff className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    High Contrast
                  </span>
                </div>
              </motion.button>

              <motion.button
                variants={itemVariants}
                onClick={() => toggleReducedMotion()}
                className={`w-full p-2 rounded-lg border-2 transition-all duration-300 flex items-center justify-between ${
                  reducedMotion
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-slate-600 hover:border-primary-300'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-2 flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      reducedMotion ? 'bg-primary-500' : 'bg-gray-400 dark:bg-slate-500'
                    }`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reduced Motion
                  </span>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
