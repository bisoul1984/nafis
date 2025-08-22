import React, { useState, useRef, useEffect } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const SwipeableCard = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  onSwipeUp, 
  onSwipeDown,
  threshold = 100,
  className = "",
  showArrows = true,
  showActions = true
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  const cardRef = useRef(null);

  const handleDragStart = () => {
    setIsDragging(true);
    setSwipeDirection(null);
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    
    const { offset, velocity } = info;
    const swipe = Math.abs(offset.x) * velocity.x;
    const swipeY = Math.abs(offset.y) * velocity.y;

    if (Math.abs(offset.x) > threshold || Math.abs(swipe) > 500) {
      if (offset.x > 0) {
        handleSwipeRight();
      } else {
        handleSwipeLeft();
      }
    } else if (Math.abs(offset.y) > threshold || Math.abs(swipeY) > 500) {
      if (offset.y > 0) {
        handleSwipeDown();
      } else {
        handleSwipeUp();
      }
    } else {
      // Reset position
      x.set(0);
      y.set(0);
    }
  };

  const handleSwipeLeft = () => {
    setSwipeDirection('left');
    setIsAnimating(true);
    x.set(-300);
    setTimeout(() => {
      onSwipeLeft?.();
      resetCard();
    }, 300);
  };

  const handleSwipeRight = () => {
    setSwipeDirection('right');
    setIsAnimating(true);
    x.set(300);
    setTimeout(() => {
      onSwipeRight?.();
      resetCard();
    }, 300);
  };

  const handleSwipeUp = () => {
    setSwipeDirection('up');
    setIsAnimating(true);
    y.set(-300);
    setTimeout(() => {
      onSwipeUp?.();
      resetCard();
    }, 300);
  };

  const handleSwipeDown = () => {
    setSwipeDirection('down');
    setIsAnimating(true);
    y.set(300);
    setTimeout(() => {
      onSwipeDown?.();
      resetCard();
    }, 300);
  };

  const resetCard = () => {
    x.set(0);
    y.set(0);
    setIsAnimating(false);
    setSwipeDirection(null);
  };

  const handleActionClick = (action) => {
    switch (action) {
      case 'left':
        handleSwipeLeft();
        break;
      case 'right':
        handleSwipeRight();
        break;
      case 'up':
        handleSwipeUp();
        break;
      case 'down':
        handleSwipeDown();
        break;
      default:
        break;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Swipe Indicators */}
      {showArrows && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Left Arrow */}
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            animate={{ 
              opacity: isDragging && x.get() < -50 ? 1 : 0,
              scale: isDragging && x.get() < -50 ? 1 : 0.8
            }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft className="w-8 h-8 text-red-500" />
          </motion.div>
          
          {/* Right Arrow */}
          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2"
            animate={{ 
              opacity: isDragging && x.get() > 50 ? 1 : 0,
              scale: isDragging && x.get() > 50 ? 1 : 0.8
            }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-8 h-8 text-green-500" />
          </motion.div>
        </div>
      )}

      {/* Main Card */}
      <motion.div
        ref={cardRef}
        style={{ x, y, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.02 }}
        className={`
          relative cursor-grab active:cursor-grabbing
          bg-white dark:bg-slate-800 rounded-xl shadow-lg
          border border-gray-200 dark:border-slate-600
          ${isAnimating ? 'pointer-events-none' : ''}
        `}
      >
        {/* Swipe Background Indicators */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          {/* Left Swipe Background */}
          <motion.div
            className="absolute left-0 top-0 w-full h-full bg-red-500 flex items-center justify-center"
            animate={{ 
              opacity: isDragging && x.get() < -50 ? 0.1 : 0 
            }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-12 h-12 text-white" />
          </motion.div>
          
          {/* Right Swipe Background */}
          <motion.div
            className="absolute right-0 top-0 w-full h-full bg-green-500 flex items-center justify-center"
            animate={{ 
              opacity: isDragging && x.get() > 50 ? 0.1 : 0 
            }}
            transition={{ duration: 0.2 }}
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        {/* Card Content */}
        <div className="relative z-10 p-6">
          {children}
        </div>
      </motion.div>

      {/* Action Buttons */}
      {showActions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center space-x-4 mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleActionClick('left')}
            className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleActionClick('right')}
            className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200"
          >
            <Check className="w-6 h-6" />
          </motion.button>
        </motion.div>
      )}

      {/* Swipe Direction Indicator */}
      <AnimatePresence>
        {swipeDirection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium"
          >
            Swiped {swipeDirection}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SwipeableCard;
