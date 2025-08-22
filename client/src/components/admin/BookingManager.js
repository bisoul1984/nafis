import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookingAPI } from '../../services/api';

const BookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real booking data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        try {
          const apiBookings = await bookingAPI.getAllBookings();
          setBookings(apiBookings);
                } catch (apiError) {
          console.log('API not available, using localStorage data');
          // Fallback to localStorage data if API is not available
          const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
          setBookings(storedBookings);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load booking data');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const [services] = useState([
    { id: 1, name: 'Foot Reflexology', price: 120, duration: '60 min' },
    { id: 2, name: 'Deep Tissue Massage', price: 150, duration: '90 min' },
    { id: 3, name: 'Aromatherapy Session', price: 100, duration: '45 min' },
    { id: 4, name: 'Hot Stone Therapy', price: 180, duration: '75 min' },
    { id: 5, name: 'Swedish Massage', price: 130, duration: '60 min' },
    { id: 6, name: 'Thai Massage', price: 140, duration: '90 min' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  const [formData, setFormData] = useState({
    client: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    serviceId: '',
    appointmentDate: '',
    startTime: '',
    notes: ''
  });

  const statusOptions = [
    { value: 'confirmed', label: 'Confirmed', color: 'bg-green-100 text-green-800' },
    { value: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-800' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  useEffect(() => {
    if (editingBooking) {
      setFormData({
        client: {
          firstName: editingBooking.client?.firstName || '',
          lastName: editingBooking.client?.lastName || '',
          email: editingBooking.client?.email || '',
          phone: editingBooking.client?.phone || ''
        },
        serviceId: editingBooking.service?._id || editingBooking.serviceId || '',
        appointmentDate: editingBooking.appointmentDate || editingBooking.date || '',
        startTime: editingBooking.startTime || editingBooking.time || '',
        notes: editingBooking.notes?.client || editingBooking.notes || ''
      });
    } else {
      setFormData({
        client: {
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        },
        serviceId: '',
        appointmentDate: '',
        startTime: '',
        notes: ''
      });
    }
  }, [editingBooking]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const selectedService = services.find(s => s.id === parseInt(formData.serviceId));
    
    if (editingBooking) {
      // Update existing booking
      setBookings(prev => prev.map(booking => 
        booking._id === editingBooking._id 
          ? {
              ...booking,
              client: formData.client,
              service: { 
                _id: selectedService.id,
                name: selectedService.name, 
                duration: selectedService.duration, 
                price: selectedService.price 
              },
              appointmentDate: formData.appointmentDate,
              startTime: formData.startTime,
              duration: selectedService.duration,
              amount: selectedService.price,
              notes: { client: formData.notes },
              updatedAt: new Date().toISOString()
            }
          : booking
      ));
      
      // Update localStorage
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const updatedBookings = existingBookings.map(booking => 
        booking._id === editingBooking._id 
          ? {
              ...booking,
              client: formData.client,
              service: { 
                _id: selectedService.id,
                name: selectedService.name, 
                duration: selectedService.duration, 
                price: selectedService.price 
              },
              appointmentDate: formData.appointmentDate,
              startTime: formData.startTime,
              duration: selectedService.duration,
              amount: selectedService.price,
              notes: { client: formData.notes },
              updatedAt: new Date().toISOString()
            }
          : booking
      );
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    } else {
      // Create new booking
      const newBooking = {
        _id: Math.max(...bookings.map(b => b._id || 0)) + 1,
        client: formData.client,
        service: { 
          _id: selectedService.id,
          name: selectedService.name, 
          duration: selectedService.duration, 
          price: selectedService.price 
        },
        appointmentDate: formData.appointmentDate,
        startTime: formData.startTime,
        duration: selectedService.duration,
        amount: selectedService.price,
        status: 'confirmed',
        notes: { client: formData.notes },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setBookings(prev => [...prev, newBooking]);
      
      // Save to localStorage
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      existingBookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));
    }
    
    setShowModal(false);
    setEditingBooking(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(prev => prev.filter(booking => booking._id !== id));
      
      // Update localStorage
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const updatedBookings = existingBookings.filter(booking => booking._id !== id);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setBookings(prev => prev.map(booking => 
      booking._id === id 
        ? { ...booking, status: newStatus, updatedAt: new Date().toISOString() }
        : booking
    ));
    
    // Update localStorage
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = existingBookings.map(booking => 
      booking._id === id 
        ? { ...booking, status: newStatus, updatedAt: new Date().toISOString() }
        : booking
    );
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  const filteredBookings = bookings
    .filter(booking => {
      // Only show confirmed and completed bookings (booked information)
      const isBooked = booking.status === 'confirmed' || booking.status === 'completed';
      const matchesStatus = filterStatus === 'all' ? isBooked : booking.status === filterStatus;
      const matchesDate = !filterDate || booking.appointmentDate === filterDate;
      const matchesSearch = !searchTerm || 
        (booking.client?.firstName + ' ' + booking.client?.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.client?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.service?.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStatus && matchesDate && matchesSearch;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.appointmentDate + ' ' + a.startTime);
          bValue = new Date(b.appointmentDate + ' ' + b.startTime);
          break;
        case 'client':
          aValue = a.client?.firstName + ' ' + a.client?.lastName;
          bValue = b.client?.firstName + ' ' + b.client?.lastName;
          break;
        case 'amount':
          aValue = a.amount || a.finalAmount || 0;
          bValue = b.amount || b.finalAmount || 0;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption ? statusOption.color : 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption ? statusOption.label : status;
  };

  const totalRevenue = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + (b.amount || b.finalAmount || 0), 0);

  const bookedBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'completed').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading booking data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Bookings</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Booked</p>
              <p className="text-2xl font-bold text-gray-900">{bookedBookings}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-blue-600">{bookings.filter(b => b.status === 'completed').length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">{confirmedBookings}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🔍</span>
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="all">All Booked</option>
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* Date Filter */}
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
          >
            Add New Booking
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  <button
                    onClick={() => {
                      setSortBy('id');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                    className="flex items-center space-x-1 hover:text-gray-900"
                  >
                    <span>ID</span>
                    {sortBy === 'id' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  <button
                    onClick={() => {
                      setSortBy('client');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                    className="flex items-center space-x-1 hover:text-gray-900"
                  >
                    <span>Client</span>
                    {sortBy === 'client' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  <button
                    onClick={() => {
                      setSortBy('date');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                    className="flex items-center space-x-1 hover:text-gray-900"
                  >
                    <span>Date & Time</span>
                    {sortBy === 'date' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Duration</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  <button
                    onClick={() => {
                      setSortBy('status');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                    className="flex items-center space-x-1 hover:text-gray-900"
                  >
                    <span>Status</span>
                    {sortBy === 'status' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  <button
                    onClick={() => {
                      setSortBy('amount');
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    }}
                    className="flex items-center space-x-1 hover:text-gray-900"
                  >
                    <span>Amount</span>
                    {sortBy === 'amount' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
                             {filteredBookings.map((booking) => (
                 <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50">
                   <td className="py-3 px-4 text-gray-900">#{booking._id}</td>
                   <td className="py-3 px-4">
                     <div>
                       <div className="font-medium text-gray-900">
                         {booking.client?.firstName && booking.client?.lastName 
                           ? `${booking.client.firstName} ${booking.client.lastName}`
                           : booking.client?.email || 'Unknown Client'
                         }
                       </div>
                     </div>
                   </td>
                   <td className="py-3 px-4">
                     <div className="text-sm">
                       <div className="text-gray-900">{booking.client?.email || 'N/A'}</div>
                       <div className="text-gray-500">{booking.client?.phone || 'N/A'}</div>
                     </div>
                   </td>
                   <td className="py-3 px-4 text-gray-900">{booking.service?.name || 'Unknown Service'}</td>
                   <td className="py-3 px-4">
                     <div>
                       <div className="font-medium text-gray-900">{new Date(booking.appointmentDate).toLocaleDateString()}</div>
                       <div className="text-sm text-gray-500">{booking.startTime}</div>
                     </div>
                   </td>
                   <td className="py-3 px-4 text-gray-900">{booking.duration} min</td>
                  <td className="py-3 px-4">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                      className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(booking.status)}`}
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </td>
                                     <td className="py-3 px-4 font-medium text-gray-900">${booking.amount || booking.finalAmount || 0}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingBooking(booking);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredBookings.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No bookings found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingBooking ? 'Edit Booking' : 'Add New Booking'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingBooking(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.client.firstName}
                        onChange={(e) => setFormData({
                          ...formData, 
                          client: {...formData.client, firstName: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.client.lastName}
                        onChange={(e) => setFormData({
                          ...formData, 
                          client: {...formData.client, lastName: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.client.email}
                      onChange={(e) => setFormData({
                        ...formData, 
                        client: {...formData.client, email: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.client.phone}
                      onChange={(e) => setFormData({
                        ...formData, 
                        client: {...formData.client, phone: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service *
                    </label>
                    <select
                      required
                      value={formData.serviceId}
                      onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {services.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name} - ${service.price} ({service.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.appointmentDate}
                        onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time *
                      </label>
                      <select
                        required
                        value={formData.startTime}
                        onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Any special requests or notes..."
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditingBooking(null);
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                    >
                      {editingBooking ? 'Update Booking' : 'Create Booking'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingManager; 