import React from 'react';
import { Leaf, Heart, User, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCard from '../common/AnimatedCard';
import StaggeredContainer from '../common/StaggeredContainer';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Leaf className="w-12 h-12 text-green-600" />,
      title: 'Natural Healing',
      description: 'Experience the power of natural reflexology techniques that promote healing and wellness.'
    },
    {
      icon: <Heart className="w-12 h-12 text-pink-600" />,
      title: 'Stress Relief',
      description: 'Reduce stress and anxiety through targeted pressure point therapy and relaxation techniques.'
    },
    {
      icon: <User className="w-12 h-12 text-blue-600" />,
      title: 'Pain Management',
      description: 'Alleviate chronic pain and discomfort through specialized reflexology treatments.'
    },
    {
      icon: <Moon className="w-12 h-12 text-purple-600" />,
      title: 'Better Sleep',
      description: 'Improve sleep quality and achieve deeper, more restful sleep patterns.'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Benefits of Reflexology
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how professional reflexology can transform your health and well-being
          </p>
        </div>
        
        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" direction="up" staggerDelay={0.15}>
          {benefits.map((benefit, index) => (
            <AnimatedCard
              key={index}
              delay={index * 0.1}
              className="p-6"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </AnimatedCard>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  );
};

export default BenefitsSection; 