import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react';

const ZoomableImage = ({ 
  src, 
  alt, 
  className = "", 
  maxZoom = 3,
  minZoom = 0.5,
  initialZoom = 1
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(initialZoom);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Touch state for pinch zoom
  const [touchStart, setTouchStart] = useState(null);
  const [initialDistance, setInitialDistance] = useState(0);
  const [initialScale, setInitialScale] = useState(1);

  const calculateDistance = (touches) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Pinch gesture
      setTouchStart(e.touches);
      setInitialDistance(calculateDistance(e.touches));
      setInitialScale(scale);
    } else if (e.touches.length === 1) {
      // Single touch for dragging
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    
    if (e.touches.length === 2 && touchStart) {
      // Handle pinch zoom
      const currentDistance = calculateDistance(e.touches);
      const scaleFactor = currentDistance / initialDistance;
      const newScale = Math.max(minZoom, Math.min(maxZoom, initialScale * scaleFactor));
      setScale(newScale);
    } else if (e.touches.length === 1 && isDragging) {
      // Handle dragging
      const newX = e.touches[0].clientX - dragStart.x;
      const newY = e.touches[0].clientY - dragStart.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(minZoom, Math.min(maxZoom, scale * delta));
    setScale(newScale);
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) { // Left click only
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const zoomIn = () => {
    const newScale = Math.min(maxZoom, scale * 1.2);
    setScale(newScale);
  };

  const zoomOut = () => {
    const newScale = Math.max(minZoom, scale * 0.8);
    setScale(newScale);
  };

  const reset = () => {
    setScale(initialZoom);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  const rotate = () => {
    setRotation(rotation + 90);
  };

  const toggleZoom = () => {
    if (isZoomed) {
      reset();
      setIsZoomed(false);
    } else {
      setScale(2);
      setIsZoomed(true);
    }
  };

  // Add event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [scale, position, isDragging, dragStart]);

  return (
    <div className={`relative ${className}`}>
      {/* Image Container */}
      <div
        ref={containerRef}
        className={`
          relative overflow-hidden rounded-lg cursor-zoom-in
          ${isZoomed ? 'cursor-move' : ''}
        `}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={toggleZoom}
      >
        <motion.img
          ref={imageRef}
          src={src}
          alt={alt}
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            transformOrigin: 'center',
            x: position.x,
            y: position.y
          }}
          className="w-full h-full object-cover select-none"
          drag={isZoomed}
          dragConstraints={containerRef}
          dragElastic={0.1}
        />
      </div>

      {/* Controls */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/80 backdrop-blur-sm rounded-full p-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                zoomOut();
              }}
              className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <ZoomOut className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                zoomIn();
              }}
              className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <ZoomIn className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                rotate();
              }}
              className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                reset();
                setIsZoomed(false);
              }}
              className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom Indicator */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium"
          >
            {Math.round(scale * 100)}%
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!isZoomed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          <div className="text-white text-center">
            <ZoomIn className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Click to zoom • Pinch to zoom on mobile</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ZoomableImage;
