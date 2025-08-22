import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, AlertCircle, Info } from 'lucide-react';

const StatusIndicator = ({ 
  status, 
  size = "medium", 
  showIcon = true, 
  showText = true,
  className = "",
  animated = true 
}) => {
  const statusConfig = {
    success: {
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: CheckCircle,
      text: 'Success',
      pulseColor: 'bg-green-500'
    },
    error: {
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: XCircle,
      text: 'Error',
      pulseColor: 'bg-red-500'
    },
    warning: {
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      icon: AlertCircle,
      text: 'Warning',
      pulseColor: 'bg-yellow-500'
    },
    info: {
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: Info,
      text: 'Info',
      pulseColor: 'bg-blue-500'
    },
    pending: {
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      icon: Clock,
      text: 'Pending',
      pulseColor: 'bg-gray-500'
    },
    loading: {
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      icon: Clock,
      text: 'Loading',
      pulseColor: 'bg-primary-500'
    }
  };

  const sizeConfig = {
    small: {
      padding: 'px-2 py-1',
      textSize: 'text-xs',
      iconSize: 'w-3 h-3'
    },
    medium: {
      padding: 'px-3 py-1.5',
      textSize: 'text-sm',
      iconSize: 'w-4 h-4'
    },
    large: {
      padding: 'px-4 py-2',
      textSize: 'text-base',
      iconSize: 'w-5 h-5'
    }
  };

  const config = statusConfig[status] || statusConfig.info;
  const sizeStyle = sizeConfig[size];
  const Icon = config.icon;

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={animated ? containerVariants : {}}
      initial="initial"
      animate="animate"
      whileHover={animated ? "hover" : {}}
      className={`
        inline-flex items-center gap-2 rounded-full border
        ${config.bgColor} ${config.borderColor} ${config.color}
        ${sizeStyle.padding} ${sizeStyle.textSize}
        transition-all duration-300
        ${className}
      `}
    >
      {/* Animated pulse dot for loading status */}
      {status === 'loading' && animated && (
        <motion.div
          variants={pulseVariants}
          animate="pulse"
          className={`w-2 h-2 rounded-full ${config.pulseColor}`}
        />
      )}

      {/* Icon */}
      {showIcon && (
        <motion.div
          initial={animated ? { rotate: -180, opacity: 0 } : {}}
          animate={animated ? { rotate: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Icon className={sizeStyle.iconSize} />
        </motion.div>
      )}

      {/* Text */}
      {showText && (
        <motion.span
          initial={animated ? { x: -10, opacity: 0 } : {}}
          animate={animated ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="font-medium"
        >
          {config.text}
        </motion.span>
      )}
    </motion.div>
  );
};

// Status Badge component for more compact display
export const StatusBadge = ({ status, size = "small", className = "" }) => {
  return (
    <StatusIndicator 
      status={status} 
      size={size} 
      showIcon={false} 
      showText={true}
      className={className}
    />
  );
};

// Status Dot component for minimal display
export const StatusDot = ({ status, size = "medium", className = "" }) => {
  const statusConfig = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
    pending: 'bg-gray-500',
    loading: 'bg-primary-500'
  };

  const sizeConfig = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4'
  };

  const config = statusConfig[status] || statusConfig.info;
  const sizeStyle = sizeConfig[size];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        rounded-full ${config} ${sizeStyle}
        ${status === 'loading' ? 'animate-pulse' : ''}
        ${className}
      `}
    />
  );
};

export default StatusIndicator;
