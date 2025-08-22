import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, CheckCircle, ArrowLeft, ArrowRight, Upload, FileText } from 'lucide-react';
import DragDropZone from '../components/common/DragDropZone';
import ZoomableImage from '../components/common/ZoomableImage';

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
    preferences: [],
    attachments: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Generate available time slots based on current time
  const generateTimeSlots = (selectedDate) => {
    const slots = [];
    const now = new Date();
    const selectedDateTime = new Date(selectedDate);
    
    // If selected date is today, start from current time + 1 hour
    const isToday = selectedDateTime.toDateString() === now.toDateString();
    const startHour = isToday ? Math.max(9, now.getHours() + 1) : 9;
    
    for (let hour = startHour; hour <= 18; hour++) {
      // For today, skip past times
      if (isToday && hour === now.getHours() && now.getMinutes() >= 30) {
        continue;
      }
      
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      
      // Add 30-minute slot if not the last hour and not past current time for today
      if (hour < 18) {
        if (!isToday || hour > now.getHours() || (hour === now.getHours() && now.getMinutes() < 30)) {
          slots.push(`${hour.toString().padStart(2, '0')}:30`);
        }
      }
    }
    return slots;
  };

  // Generate calendar dates (next 30 days)
  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  useEffect(() => {
    // Simulate fetching services from API
    setServices([
      {
        id: 1,
        name: "Relaxation Reflexology",
        description: "A gentle, soothing reflexology session designed to promote deep relaxation and stress relief.",
        duration: 60,
        price: 75,
        category: "relaxation",
        image: "https://images.pexels.com/photos/3771086/pexels-photo-3771086.jpeg?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        name: "Deep Tissue Foot Work",
        description: "Intensive reflexology treatment targeting deep-seated tension and chronic foot issues.",
        duration: 90,
        price: 95,
        category: "therapeutic",
        image: "https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        name: "Aromatherapy Session",
        description: "Combines reflexology with essential oils for enhanced relaxation and therapeutic benefits.",
        duration: 45,
        price: 65,
        category: "wellness",
        image: "https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg?w=400&h=300&fit=crop"
      },
      {
        id: 4,
        name: "Hot Stone Therapy",
        description: "Warm stones combined with reflexology for ultimate relaxation and muscle tension relief.",
        duration: 75,
        price: 85,
        category: "premium",
        image: "https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?w=400&h=300&fit=crop"
      }
    ]);
  }, []);

  // Update time slots every minute when a date is selected
  useEffect(() => {
    if (!selectedDate) return;

    const updateTimeSlots = () => {
      const timeSlots = generateTimeSlots(selectedDate);
      setAvailableTimes(timeSlots);
      
      // Clear selected time if it's no longer available
      if (selectedTime && !timeSlots.includes(selectedTime)) {
        setSelectedTime('');
      }
    };

    // Update immediately
    updateTimeSlots();

    // Update every minute
    const interval = setInterval(updateTimeSlots, 60000);

    return () => clearInterval(interval);
  }, [selectedDate, selectedTime]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedTime('');
    setSelectedDate('');
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
    // Generate time slots based on the selected date
    const timeSlots = generateTimeSlots(date);
    setAvailableTimes(timeSlots);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceToggle = (preference) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const handleFileUpload = (files) => {
    setFormData(prev => ({
      ...prev,
      attachments: files
    }));
  };

  const nextStep = () => {
    if (currentStep === 1 && !selectedService) {
      setError('Please select a service to continue');
      return;
    }
    if (currentStep === 2 && (!selectedDate || !selectedTime)) {
      setError('Please select both date and time to continue');
      return;
    }
    if (currentStep === 3 && (!formData.name || !formData.email || !formData.phone)) {
      setError('Please fill in all required fields');
      return;
    }
    
    setError('');
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Create the booking object
      const booking = {
        _id: Date.now(), // Simple ID generation
        client: {
          firstName: formData.name.split(' ')[0] || formData.name,
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone
        },
        service: {
          _id: selectedService.id,
          name: selectedService.name,
          duration: selectedService.duration,
          price: selectedService.price
        },
        appointmentDate: selectedDate,
        startTime: selectedTime,
        duration: selectedService.duration,
        amount: selectedService.price,
        status: 'confirmed',
        notes: { client: formData.notes },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save to localStorage for persistence
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      existingBookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - move to confirmation
      setCurrentStep(5);
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1: return selectedService;
      case 2: return selectedDate && selectedTime;
      case 3: return formData.name && formData.email && formData.phone;
      default: return true;
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep >= step 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}>
            {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
          {step < 4 && (
            <div className={`w-16 h-1 mx-2 ${
              currentStep > step ? 'bg-primary-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderServiceSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Choose Your Service</h2>
        <p className="text-sm sm:text-base text-gray-600 px-4">Select the perfect reflexology treatment for your needs</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative cursor-pointer rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
              selectedService?.id === service.id 
                ? 'ring-4 ring-primary-500 ring-opacity-50' 
                : 'hover:shadow-xl'
            }`}
            onClick={() => handleServiceSelect(service)}
          >
            <div className="relative h-40 sm:h-48">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            <div className="p-4 sm:p-6 bg-white">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{service.name}</h3>
                <span className="text-xl sm:text-2xl font-bold text-primary-500">${service.price}</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{service.description}</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm sm:text-base">{service.duration} min</span>
                </div>
                <span className="px-2 sm:px-3 py-1 bg-primary-100 text-primary-700 text-xs sm:text-sm font-medium rounded-full self-start sm:self-auto">
                  {service.category}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderDateTimeSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Select Date & Time</h2>
        <p className="text-sm sm:text-base text-gray-600 px-4">Choose when you'd like to visit us</p>
      </div>

      {/* Date Selection */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Available Dates</h3>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 sm:gap-2">
          {generateCalendarDates().map((date, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 sm:p-3 rounded-lg text-center transition-colors ${
                selectedDate && selectedDate.toDateString() === date.toDateString()
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleDateSelect(date)}
            >
              <div className="text-xs sm:text-sm font-medium">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-sm sm:text-lg font-bold">
                {date.getDate()}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Available Times</h3>
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live updates
            </div>
          </div>
          {availableTimes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No available times for today. Please select a future date.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
              {availableTimes.map((time) => (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 sm:p-3 rounded-lg text-center transition-colors text-sm sm:text-base ${
                    selectedTime === time
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );

  const renderPersonalInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">Personal Information</h2>
        <p className="text-sm sm:text-base text-gray-600 px-4">Tell us a bit about yourself</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
            placeholder="Any special requests or notes?"
          />
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['Quiet environment', 'Soft music', 'Essential oils', 'Hot towels', 'Extra pressure', 'Gentle pressure'].map((preference) => (
            <motion.button
              key={preference}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3 rounded-lg text-center transition-colors ${
                formData.preferences.includes(preference)
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              onClick={() => handlePreferenceToggle(preference)}
            >
              {preference}
            </motion.button>
          ))}
        </div>
      </div>

      {/* File Upload Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Additional Documents (Optional)</h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload any relevant documents like medical history, preferences, or special requirements
        </p>
        <DragDropZone
          onDrop={handleFileUpload}
          acceptedTypes={['image/*', 'application/pdf', 'text/plain']}
          maxFiles={5}
          maxSize={10 * 1024 * 1024} // 10MB
          className="mb-4"
        />
        {formData.attachments.length > 0 && (
          <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Uploaded Files ({formData.attachments.length})
            </h4>
            <div className="space-y-2">
              {formData.attachments.map((file, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-white dark:bg-slate-700 rounded border">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderReview = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Review Your Booking</h2>
        <p className="text-gray-600">Please confirm your details before proceeding</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-6">
        {/* Service Details */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Selected Service</h3>
          <div className="flex items-center space-x-4">
            <img
              src={selectedService.image}
              alt={selectedService.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h4 className="font-medium text-gray-900">{selectedService.name}</h4>
              <p className="text-gray-600">{selectedService.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedService.duration} minutes
                </span>
                <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                  {selectedService.category}
                </span>
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-2xl font-bold text-primary-500">${selectedService.price}</div>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Appointment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary-500" />
              <div>
                <div className="font-medium text-gray-900">Date</div>
                <div className="text-gray-600">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-primary-500" />
              <div>
                <div className="font-medium text-gray-900">Time</div>
                <div className="text-gray-600">{selectedTime}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Full Name</div>
              <div className="font-medium text-gray-900">{formData.name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-medium text-gray-900">{formData.email}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Phone</div>
              <div className="font-medium text-gray-900">{formData.phone}</div>
            </div>
            {formData.notes && (
              <div>
                <div className="text-sm text-gray-500">Special Notes</div>
                <div className="font-medium text-gray-900">{formData.notes}</div>
              </div>
            )}
          </div>
        </div>

        {/* Preferences */}
        {formData.preferences.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Preferences</h3>
            <div className="flex flex-wrap gap-2">
              {formData.preferences.map((preference) => (
                <span
                  key={preference}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                >
                  {preference}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Attachments */}
        {formData.attachments.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Uploaded Documents</h3>
            <div className="space-y-2">
              {formData.attachments.map((file, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{file.name}</div>
                    <div className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderConfirmation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-6"
      style={{ paddingTop: '3rem' }}
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900">Booking Confirmed!</h2>
      <p className="text-gray-600 text-lg">
        Thank you for choosing Nafis Reflexology. We've sent a confirmation email with all the details.
      </p>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto shadow-lg">
        <h3 className="font-semibold text-gray-900 mb-3 text-left">Booking Summary</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700 font-medium">Service:</span>
            <span className="font-semibold text-gray-900">{selectedService.name}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700 font-medium">Date:</span>
            <span className="font-semibold text-gray-900">
              {selectedDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700 font-medium">Time:</span>
            <span className="font-semibold text-gray-900">{selectedTime}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700 font-medium">Total:</span>
            <span className="font-bold text-primary-600 text-lg">${selectedService.price}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <p className="text-gray-600">
          We'll send you a reminder 24 hours before your appointment.
        </p>
        <p className="text-gray-600">
          If you need to make any changes, please contact us at least 24 hours in advance.
        </p>
      </div>
      
      <div className="pt-6">
        <button
          onClick={() => window.location.href = '/'}
          className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors"
        >
          Return to Home
        </button>
      </div>
    </motion.div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderServiceSelection();
      case 2: return renderDateTimeSelection();
      case 3: return renderPersonalInfo();
      case 4: return renderReview();
      case 5: return renderConfirmation();
      default: return renderServiceSelection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Hero Section */}
                  <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Book Your Reflexology Session
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Experience the healing power of reflexology. Book your appointment today and start your journey to wellness.
          </p>
        </div>

        {/* Step Indicator */}
        {currentStep < 5 && renderStepIndicator()}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 5 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 sm:mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto ${
                  isStepValid(currentStep)
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto ${
                  loading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Booking</span>
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
