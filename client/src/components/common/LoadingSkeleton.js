import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ type = "card", count = 1, className = "" }) => {
  const shimmerVariants = {
    shimmer: {
      x: [-200, 200],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 1.5,
          ease: "easeInOut"
        }
      }
    }
  };

  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg overflow-hidden relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  variants={shimmerVariants}
                  animate="shimmer"
                />
              </div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2 overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                    variants={shimmerVariants}
                    animate="shimmer"
                  />
                </div>
                <div className="h-3 bg-gray-200 rounded w-2/3 overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                    variants={shimmerVariants}
                    animate="shimmer"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-200 rounded overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  variants={shimmerVariants}
                  animate="shimmer"
                />
              </div>
              <div className="h-3 bg-gray-200 rounded w-5/6 overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  variants={shimmerVariants}
                  animate="shimmer"
                />
              </div>
              <div className="h-3 bg-gray-200 rounded w-4/6 overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  variants={shimmerVariants}
                  animate="shimmer"
                />
              </div>
            </div>
          </div>
        );

      case "table":
        return (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-1/3 overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  variants={shimmerVariants}
                  animate="shimmer"
                />
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-4 flex items-center space-x-4">
                  <div className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      variants={shimmerVariants}
                      animate="shimmer"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded overflow-hidden relative">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                        variants={shimmerVariants}
                        animate="shimmer"
                      />
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 overflow-hidden relative">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                        variants={shimmerVariants}
                        animate="shimmer"
                      />
                    </div>
                  </div>
                  <div className="h-8 w-20 bg-gray-200 rounded overflow-hidden relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                      variants={shimmerVariants}
                      animate="shimmer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "button":
        return (
          <div className="h-10 bg-gray-200 rounded-lg overflow-hidden relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              variants={shimmerVariants}
              animate="shimmer"
            />
          </div>
        );

      default:
        return (
          <div className="bg-gray-200 rounded-lg p-4 overflow-hidden relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              variants={shimmerVariants}
              animate="shimmer"
            />
          </div>
        );
    }
  };

  return (
    <div className={className}>
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={count > 1 ? "mb-4" : ""}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
