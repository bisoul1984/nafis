import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const LoginPage = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Get the intended destination from location state, or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

     const handleSubmit = async (e) => {
     e.preventDefault();
     setIsLoading(true);
     setError('');

     try {
       // For demo purposes, let's create a simple login
       // In a real app, this would call your API
       let userData = null;
       
       if (formData.email === 'admin@nafis.com' && formData.password === 'admin123') {
         // Simulate API call delay
         await new Promise(resolve => setTimeout(resolve, 1000));
         
         userData = {
           id: '1',
           email: formData.email,
           firstName: 'Admin',
           lastName: 'User',
           role: 'admin',
           avatar: null
         };
       
       } else if (formData.email === 'fikertetadesse@gmail.com' && formData.password === 'passionated') {
         // Simulate API call delay
         await new Promise(resolve => setTimeout(resolve, 1000));
         
         userData = {
           id: '3',
           email: formData.email,
           firstName: 'Fiker',
           lastName: 'Tadesse',
           role: 'admin',
           avatar: null
         };
       } else {
         throw new Error('Invalid email or password');
       }

       // Create a mock token
       const mockToken = 'demo_token_' + Date.now();
       
       // Store user data in localStorage for demo purposes
       localStorage.setItem('user', JSON.stringify(userData));
       localStorage.setItem('token', mockToken);
       
       // Update the auth context manually
       // Since we're bypassing the API, we need to manually set the auth state
       const authEvent = new CustomEvent('auth-success', {
         detail: {
           user: userData,
           token: mockToken
         }
       });
       window.dispatchEvent(authEvent);
       
       // Navigate to dashboard
       navigate(from, { replace: true });
       
     } catch (err) {
       setError(err.message || 'Login failed. Please try again.');
     } finally {
       setIsLoading(false);
     }
   };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Nafis Reflexology</title>
        <meta name="description" content="Sign in to your Nafis Reflexology account to manage appointments and view your profile" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                N
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nafis Reflexology</h1>
              </div>
            </Link>
                         <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Access</h2>
             <p className="text-gray-600">Sign in to manage bookings, services, and business operations.</p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4"
                >
                  <div className="flex items-center">
                    <span className="text-red-600 mr-2">⚠️</span>
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                </motion.div>
              )}

                             {/* Demo Credentials Info */}
               <motion.div
                 variants={itemVariants}
                 className="bg-blue-50 border border-blue-200 rounded-lg p-4"
               >
                 <h4 className="text-blue-900 font-medium mb-2">Admin Demo Credentials:</h4>
                 <div className="text-sm text-blue-800 space-y-1">
                   <p><strong>Owner:</strong> fikertetadesse@gmail.com / passionated</p>
                   <p><strong>Admin:</strong> admin@nafis.com / admin123</p>
                 </div>
               </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Enter your email"
                />
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div variants={itemVariants} className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={itemVariants}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium py-3 px-4 rounded-lg hover:from-pink-600 hover:to-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <motion.div variants={itemVariants} className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
            </motion.div>

            {/* Social Login Buttons */}
            <motion.div variants={itemVariants} className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
                <span className="mr-2">📧</span>
                Google
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
                <span className="mr-2">📘</span>
                Facebook
              </button>
            </motion.div>
          </motion.div>

                     {/* Admin Notice */}
           <motion.div variants={itemVariants} className="text-center mt-6">
             <p className="text-gray-600 text-sm">
               This login is for business administrators only. 
               <br />
               Clients can book appointments without creating an account.
             </p>
           </motion.div>

          {/* Back to Home */}
          <motion.div variants={itemVariants} className="text-center mt-4">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage; 