import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxSection = ({ 
  children, 
  speed = 0.5, 
  className = "",
  background = null,
  overlay = false,
  ...props 
}) => {
  const ref = useRef(null);
  const [elementTop, setElementTop] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const element = ref.current;
    if (element) {
      setElementTop(element.offsetTop);
    }
  }, []);

  const y = useTransform(scrollY, [elementTop - window.innerHeight, elementTop + window.innerHeight], [100 * speed, -100 * speed]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ y }}
      {...props}
    >
      {background && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      )}
      
      {overlay && (
        <motion.div
          className="absolute inset-0 bg-black/30 z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      )}
      
      <div className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
};

export default ParallaxSection;
