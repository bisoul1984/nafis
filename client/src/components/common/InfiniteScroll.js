import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChevronUp } from 'lucide-react';

const InfiniteScroll = ({ 
  children, 
  onLoadMore, 
  hasMore = true,
  loading = false,
  threshold = 100,
  className = "",
  showScrollToTop = true,
  scrollToTopThreshold = 500
}) => {
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const loadingRef = useRef(null);

  // Intersection Observer for infinite scroll
  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !loading && !isLoading) {
      loadMore();
    }
  }, [hasMore, loading, isLoading]);

  // Load more content
  const loadMore = async () => {
    if (!hasMore || loading || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await onLoadMore();
    } catch (err) {
      setError(err.message || 'Failed to load more content');
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to top functionality
  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const scrollTop = containerRef.current.scrollTop;
    setShowScrollToTopButton(scrollTop > scrollToTopThreshold);
  }, [scrollToTopThreshold]);

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: containerRef.current,
      rootMargin: `${threshold}px`,
      threshold: 0.1
    });
    
    observerRef.current = observer;
    
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, threshold]);

  // Add scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Re-observe loading element when it changes
  useEffect(() => {
    if (observerRef.current && loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }
  }, [hasMore, loading]);

  return (
    <div className={`relative ${className}`}>
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="overflow-auto max-h-full"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Content */}
        <div className="space-y-4">
          {children}
          
          {/* Loading Indicator */}
          <AnimatePresence>
            {(loading || isLoading) && (
              <motion.div
                ref={loadingRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-center py-8"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  >
                    <Loader2 className="w-6 h-6 text-primary-500" />
                  </motion.div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Loading more...
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* End of Content */}
          {!hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400"
            >
              <div className="text-center">
                <div className="w-16 h-px bg-gray-300 dark:bg-gray-600 mx-auto mb-4" />
                <p className="text-sm">You've reached the end</p>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
                      <span className="text-red-600 dark:text-red-400 text-sm font-medium">!</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {error}
                    </p>
                    <button
                      onClick={loadMore}
                      className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 font-medium"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && showScrollToTopButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-200"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm flex items-center justify-center z-40"
          >
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-xl border border-gray-200 dark:border-slate-600">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <Loader2 className="w-6 h-6 text-primary-500" />
                </motion.div>
                <span className="text-gray-700 dark:text-gray-300">
                  Loading new content...
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InfiniteScroll;
