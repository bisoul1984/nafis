import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Heart, MessageCircle, Share2 } from 'lucide-react';
import StaggeredContainer from '../common/StaggeredContainer';
import PullToRefresh from '../common/PullToRefresh';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  const allTestimonials = [
    { 
      id: 1, 
      name: 'Almaz Tesfaye', 
      role: 'Regular Client', 
      content: 'The reflexology sessions at Nafis have completely transformed my approach to wellness. The therapists are incredibly skilled and the atmosphere is so calming. I feel rejuvenated after every visit.', 
      rating: 5, 
      image: '/images/testimonials/client1.jpg', 
      likes: 24, 
      comments: 8, 
      date: '2024-01-15' 
    },
    { 
      id: 2, 
      name: 'Semret Yohannes', 
      role: 'Wellness Enthusiast', 
      content: 'As someone who deals with stress daily, finding Nafis Reflexology was a game-changer. The foot reflexology sessions help me relax and maintain my mental clarity. Highly recommend!', 
      rating: 5, 
      image: '/images/testimonials/client2.jpg', 
      likes: 31, 
      comments: 12, 
      date: '2024-01-20' 
    },
    { 
      id: 3, 
      name: 'Emebet Kassahun', 
      role: 'Health Conscious', 
      content: 'The attention to detail and personalized care at Nafis is outstanding. Each session is tailored to my specific needs, and I can feel the difference in my overall health and energy levels.', 
      rating: 5, 
      image: '/images/testimonials/client3.jpg', 
      likes: 19, 
      comments: 5, 
      date: '2024-01-25' 
    }
  ];

  const handleRefresh = () => {
    setTestimonials([...allTestimonials]);
  };

  const handleLike = (id) => {
    setTestimonials(prev => 
      prev.map(testimonial => 
        testimonial.id === id 
          ? { ...testimonial, likes: testimonial.likes + 1 }
          : testimonial
      )
    );
  };

  const handleShare = (testimonial) => {
    if (navigator.share) {
      navigator.share({
        title: `Testimonial from ${testimonial.name}`,
        text: testimonial.content,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(testimonial.content);
      alert('Testimonial copied to clipboard!');
    }
  };

  useEffect(() => {
    setTestimonials(allTestimonials);
  }, []);

  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Enhanced Typography */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-display-2 font-display font-bold text-gray-900 dark:text-white mb-4 font-features-display">
            What Our Clients Say
          </h2>
          <p className="text-lead text-readable-wide text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover why our clients choose Nafis Reflexology for their wellness journey. 
            Read authentic testimonials from satisfied customers who have experienced the 
            transformative power of professional reflexology.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <PullToRefresh onRefresh={handleRefresh} className="max-h-96">
          <StaggeredContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="h-full">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg h-full">
                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 text-primary-200 dark:text-primary-700 mb-4" />

                    {/* Testimonial Content with Enhanced Typography */}
                    <div className="mb-6">
                      <p className="text-readable text-gray-700 dark:text-gray-300 mb-4 font-features">
                        "{testimonial.content}"
                      </p>
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white text-heading">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-accent">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-600">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(testimonial.id)}
                          className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors duration-200"
                        >
                          <Heart className="w-4 h-4" />
                          <span className="text-xs font-medium">{testimonial.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-xs font-medium">{testimonial.comments}</span>
                        </button>
                      </div>
                      <button
                        onClick={() => handleShare(testimonial)}
                        className="text-gray-500 hover:text-green-500 transition-colors duration-200"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Date */}
                    <div className="mt-3 text-xs text-gray-400 dark:text-gray-500 text-caption">
                      {new Date(testimonial.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </StaggeredContainer>
        </PullToRefresh>
      </div>
    </section>
  );
};

export default TestimonialsSection; 