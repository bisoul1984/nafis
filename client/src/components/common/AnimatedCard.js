import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ 
  children, 
  className = "",
  hover = true,
  delay = 0,
  onClick,
  ...props 
}) => {
  const cardVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: "easeOut"
      }
    },
    hover: hover ? {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    } : {}
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { delay: delay + 0.2 }
    }
  };

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden ${className}`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d"
      }}
      {...props}
    >
      {/* Hover glow effect */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-secondary-500/10 opacity-0 rounded-xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Content with 3D perspective */}
      <motion.div
        className="relative z-10 p-6"
        variants={contentVariants}
        style={{
          transform: "translateZ(20px)"
        }}
      >
        {children}
      </motion.div>
      
      {/* Subtle border animation */}
      {hover && (
        <motion.div
          className="absolute inset-0 border-2 border-transparent rounded-xl"
          initial={{ borderColor: "transparent" }}
          whileHover={{ 
            borderColor: "rgba(124, 152, 133, 0.2)",
            transition: { duration: 0.3 }
          }}
        />
      )}
    </motion.div>
  );
};

export default AnimatedCard;
