import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Check, AlertCircle } from 'lucide-react';

const PullToRefresh = ({ 
  onRefresh, 
  children, 
  threshold = 80,
  className = "",
  disabled = false
}) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState(null); // 'success', 'error', null
  
  const containerRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const handleTouchStart = (e) => {
    if (disabled || isRefreshing) return;
    
    const scrollTop = containerRef.current?.scrollTop || 0;
    if (scrollTop > 0) return; // Only allow pull when at top
    
    startY.current = e.touches[0].clientY;
    currentY.current = startY.current;
  };

  const handleTouchMove = (e) => {
    if (disabled || isRefreshing) return;
    
    const scrollTop = containerRef.current?.scrollTop || 0;
    if (scrollTop > 0) return;
    
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    
    if (deltaY > 0) {
      e.preventDefault();
      const distance = Math.min(deltaY * 0.5, threshold * 2);
      setPullDistance(distance);
      setIsPulling(distance > 10);
    }
  };

  const handleTouchEnd = async () => {
    if (disabled || isRefreshing) return;
    
    if (pullDistance >= threshold) {
      // Trigger refresh
      setIsRefreshing(true);
      setRefreshStatus(null);
      
      try {
        await onRefresh();
        setRefreshStatus('success');
        setTimeout(() => {
          setRefreshStatus(null);
        }, 2000);
      } catch (error) {
        setRefreshStatus('error');
        setTimeout(() => {
          setRefreshStatus(null);
        }, 3000);
      } finally {
        setIsRefreshing(false);
      }
    }
    
    // Reset pull state
    setPullDistance(0);
    setIsPulling(false);
  };

  const getRefreshIcon = () => {
    if (refreshStatus === 'success') {
      return <Check className="w-6 h-6 text-green-500" />;
    } else if (refreshStatus === 'error') {
      return <AlertCircle className="w-6 h-6 text-red-500" />;
    } else {
      return (
        <motion.div
          animate={{ rotate: isRefreshing ? 360 : 0 }}
          transition={{ 
            duration: 1, 
            repeat: isRefreshing ? Infinity : 0,
            ease: "linear"
          }}
        >
          <RefreshCw className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </motion.div>
      );
    }
  };

  const getRefreshText = () => {
    if (refreshStatus === 'success') {
      return 'Refreshed successfully!';
    } else if (refreshStatus === 'error') {
      return 'Refresh failed. Try again.';
    } else if (isRefreshing) {
      return 'Refreshing...';
    } else if (pullDistance >= threshold) {
      return 'Release to refresh';
    } else {
      return 'Pull down to refresh';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Pull to Refresh Indicator */}
      <AnimatePresence>
        {(isPulling || isRefreshing || refreshStatus) && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-0 left-0 right-0 z-50 flex items-center justify-center py-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-600"
          >
            <div className="flex items-center space-x-3">
              {getRefreshIcon()}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {getRefreshText()}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <AnimatePresence>
        {isPulling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 right-0 z-40 h-1 bg-gray-200 dark:bg-slate-700"
          >
            <motion.div
              className="h-full bg-primary-500"
              style={{
                width: `${Math.min((pullDistance / threshold) * 100, 100)}%`
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Container */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`
          relative overflow-auto
          ${isPulling || isRefreshing ? 'select-none' : ''}
        `}
        style={{
          transform: isPulling ? `translateY(${Math.min(pullDistance, threshold)}px)` : 'translateY(0)',
          transition: isPulling ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {/* Pull Indicator */}
        <AnimatePresence>
          {isPulling && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ 
                    rotate: pullDistance >= threshold ? 180 : 0,
                    scale: pullDistance >= threshold ? 1.2 : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.div>
                <span className="text-sm">
                  {pullDistance >= threshold ? 'Release to refresh' : 'Pull to refresh'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className={isPulling ? 'pointer-events-none' : ''}>
          {children}
        </div>
      </div>

      {/* Status Messages */}
      <AnimatePresence>
        {refreshStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`
              absolute top-4 left-1/2 transform -translate-x-1/2 z-50
              px-4 py-2 rounded-full text-sm font-medium shadow-lg
              ${refreshStatus === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
              }
            `}
          >
            {refreshStatus === 'success' ? '✓ Refreshed!' : '✗ Refresh failed'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PullToRefresh;
