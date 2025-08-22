import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import BookingManager from '../components/admin/BookingManager';
import ServiceManager from '../components/admin/ServiceManager';
import AnalyticsManager from '../components/admin/AnalyticsManager';
import SettingsManager from '../components/admin/SettingsManager';
import { bookingAPI } from '../services/api';
import StatusIndicator, { StatusBadge, StatusDot } from '../components/common/StatusIndicator';

const DashboardPage = () => {
  const { user, login, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Demo admin credentials
  const demoAdmin = {
    email: 'admin@nafis.com',
    password: 'admin123'
  };

  // Handle admin login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    
    if (loginForm.email === demoAdmin.email && loginForm.password === demoAdmin.password) {
      // Create demo admin user
      const adminUser = {
        _id: 'demo_admin_001',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@nafis.com',
        role: 'admin',
        isAdmin: true
      };
      
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(adminUser));
      localStorage.setItem('token', 'demo_token_admin');
      
      // Trigger auth success event
      window.dispatchEvent(new CustomEvent('auth-success', {
        detail: {
          user: adminUser,
          token: 'demo_token_admin'
        }
      }));
      
      // Reload the page to update auth state
      window.location.reload();
    } else {
      alert('Invalid credentials. Use admin@nafis.com / admin123');
    }
  };

  // Fetch real booking data from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API first
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

  // Calculate stats dynamically from booking data
  const calculateStats = () => {
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    const totalRevenue = bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + (b.amount || b.finalAmount || 0), 0);
    const monthlyRevenue = bookings.filter(b => b.status === 'completed' && new Date(b.appointmentDate).getMonth() === new Date().getMonth()).reduce((sum, b) => sum + (b.amount || b.finalAmount || 0), 0);
    const activeUsers = new Set(bookings.map(b => b.client?._id || b.client)).size;
    const services = new Set(bookings.map(b => b.service?._id || b.service)).size;

    return {
      totalBookings,
      confirmedBookings,
      completedBookings,
      totalRevenue,
      monthlyRevenue,
      activeUsers,
      services
    };
  };

  const stats = calculateStats();

  // Get recent booked appointments (confirmed and completed only)
  const recentBookings = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .sort((a, b) => new Date(b.appointmentDate + ' ' + b.startTime) - new Date(a.appointmentDate + ' ' + a.startTime))
    .slice(0, 5);

  const [services] = useState([
    { id: 1, name: 'Foot Reflexology', price: 120, duration: '60 min', category: 'Reflexology', active: true },
    { id: 2, name: 'Deep Tissue Massage', price: 150, duration: '90 min', category: 'Massage', active: true },
    { id: 3, name: 'Aromatherapy Session', price: 100, duration: '45 min', category: 'Wellness', active: true },
    { id: 4, name: 'Hot Stone Therapy', price: 180, duration: '75 min', category: 'Therapy', active: false },
  ]);

  // Show admin login form if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white pt-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">Access the Nafis Reflexology Dashboard</p>
            </div>
            
            <form onSubmit={handleAdminLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="admin@nafis.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="admin123"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                Login as Admin
              </button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <strong>Demo Credentials:</strong><br />
                Email: admin@nafis.com<br />
                Password: admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if user is admin
  if (!user.role || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white pt-16 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">You don't have permission to access the admin dashboard.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Dashboard</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'bookings', name: 'Bookings', icon: '📅' },
    { id: 'services', name: 'Services', icon: '🛠️' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📅</span>
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
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.monthlyRevenue}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
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
              <p className="text-sm font-medium text-gray-600">Confirmed Bookings</p>
              <p className="text-2xl font-bold text-green-600">{stats.confirmedBookings}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Services</p>
              <p className="text-2xl font-bold text-gray-900">{stats.services}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🛠️</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Booked Appointments</h3>
          <button className="text-pink-600 hover:text-pink-700 font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Client</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date & Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
                             {recentBookings.map((booking) => (
                 <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50">
                   <td className="py-3 px-4 text-gray-900">
                     {booking.client?.firstName && booking.client?.lastName 
                       ? `${booking.client.firstName} ${booking.client.lastName}`
                       : booking.client?.email || 'Unknown Client'
                     }
                   </td>
                   <td className="py-3 px-4 text-gray-900">{booking.service?.name || 'Unknown Service'}</td>
                   <td className="py-3 px-4 text-gray-900">
                     {new Date(booking.appointmentDate).toLocaleDateString()} at {booking.startTime}
                   </td>
                   <td className="py-3 px-4">
                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                       booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                       booking.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                       'bg-gray-100 text-gray-800'
                     }`}>
                       {booking.status}
                     </span>
                   </td>
                   <td className="py-3 px-4 font-medium text-gray-900">${booking.amount || booking.finalAmount || 0}</td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );

  const renderBookings = () => <BookingManager />;

  const renderServices = () => {
    // Calculate service statistics from booking data
    const serviceStats = () => {
      const serviceCounts = {};
      const serviceRevenue = {};
      
             bookings.forEach(booking => {
         const serviceName = booking.service?.name || 'Unknown Service';
         serviceCounts[serviceName] = (serviceCounts[serviceName] || 0) + 1;
         if (booking.status === 'completed') {
           serviceRevenue[serviceName] = (serviceRevenue[serviceName] || 0) + (booking.amount || booking.finalAmount || 0);
         }
       });
      
      return { serviceCounts, serviceRevenue };
    };

    const { serviceCounts, serviceRevenue } = serviceStats();
    const uniqueServices = Object.keys(serviceCounts);

    return (
      <div className="space-y-6">
        {/* Service Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Services</p>
                <p className="text-2xl font-bold text-gray-900">{uniqueServices.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🛠️</span>
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
                <p className="text-sm font-medium text-gray-600">Most Popular</p>
                <p className="text-lg font-bold text-blue-600">
                  {Object.entries(serviceCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⭐</span>
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
                <p className="text-sm font-medium text-gray-600">Total Service Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  ${Object.values(serviceRevenue).reduce((sum, revenue) => sum + revenue, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Service Performance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Service Performance</h3>
            <button className="btn btn-primary">Add New Service</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Total Bookings</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Avg. Price</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {uniqueServices.map((service, index) => {
                  const bookings = serviceCounts[service];
                  const revenue = serviceRevenue[service] || 0;
                  const avgPrice = bookings > 0 ? Math.round(revenue / bookings) : 0;
                  
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{service}</td>
                      <td className="py-3 px-4 text-gray-900">{bookings}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">${revenue}</td>
                      <td className="py-3 px-4 text-gray-900">${avgPrice}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                          <button className="text-red-600 hover:text-red-700 text-sm">Deactivate</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderUsers = () => {
         // Calculate client statistics
     const clientStats = () => {
       const uniqueClients = new Set(bookings.map(b => b.client?._id || b.client?.email || b.client));
       const totalClients = uniqueClients.size;
       
       // Count repeat clients (clients with more than 1 booking)
       const clientBookingCounts = {};
       bookings.forEach(booking => {
         const clientId = booking.client?._id || booking.client?.email || booking.client;
         clientBookingCounts[clientId] = (clientBookingCounts[clientId] || 0) + 1;
       });
       const repeatClients = Object.values(clientBookingCounts).filter(count => count > 1).length;
       
       // Count new clients this month
       const currentMonth = new Date().getMonth();
       const thisMonthClients = new Set(
         bookings
           .filter(b => new Date(b.appointmentDate).getMonth() === currentMonth)
           .map(b => b.client?._id || b.client?.email || b.client)
       );
       const newThisMonth = thisMonthClients.size;
       
       return { totalClients, repeatClients, newThisMonth };
     };

    const { totalClients, repeatClients, newThisMonth } = clientStats();

         // Generate client list with real data
     const generateClientList = () => {
       const clientData = {};
       
       bookings.forEach(booking => {
         const clientId = booking.client?._id || booking.client?.email || booking.client;
         const clientName = booking.client?.firstName && booking.client?.lastName 
           ? `${booking.client.firstName} ${booking.client.lastName}`
           : booking.client?.email || 'Unknown Client';
         
         if (!clientData[clientId]) {
           clientData[clientId] = {
             name: clientName,
             email: booking.client?.email || `${clientName.toLowerCase().replace(' ', '.')}@email.com`,
             phone: booking.client?.phone || `+1 (555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
             totalBookings: 0,
             totalSpent: 0,
             lastVisit: booking.appointmentDate
           };
         }
         
         clientData[clientId].totalBookings++;
         if (booking.status === 'completed') {
           clientData[clientId].totalSpent += (booking.amount || booking.finalAmount || 0);
         }
         
         if (new Date(booking.appointmentDate) > new Date(clientData[clientId].lastVisit)) {
           clientData[clientId].lastVisit = booking.appointmentDate;
         }
       });
       
       return Object.values(clientData).sort((a, b) => b.totalBookings - a.totalBookings);
     };

    const clientList = generateClientList();

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
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
                <p className="text-sm font-medium text-gray-600">Repeat Clients</p>
                <p className="text-2xl font-bold text-green-600">{repeatClients}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔄</span>
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
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-2xl font-bold text-purple-600">{newThisMonth}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🆕</span>
              </div>
            </div>
          </motion.div>
        </div>

              {/* Client List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Client Database</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search clients..."
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button className="btn btn-primary">Export Data</button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Phone</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Total Bookings</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Last Visit</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Total Spent</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clientList.map((client, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{client.name}</td>
                    <td className="py-3 px-4 text-gray-900">{client.email}</td>
                    <td className="py-3 px-4 text-gray-900">{client.phone}</td>
                    <td className="py-3 px-4 text-gray-900">{client.totalBookings}</td>
                                         <td className="py-3 px-4 text-gray-900">{new Date(client.lastVisit).toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">${client.totalSpent}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                        <button className="text-green-600 hover:text-green-700 text-sm">Message</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">Showing {clientList.length} of {totalClients} clients</p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 bg-pink-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => {
    // Calculate analytics data from booking information
    const analyticsData = () => {
             // Monthly booking trends
       const monthlyBookings = {};
       bookings.forEach(booking => {
         const month = new Date(booking.appointmentDate).toLocaleString('default', { month: 'short' });
         monthlyBookings[month] = (monthlyBookings[month] || 0) + 1;
       });

       // Service popularity
       const servicePopularity = {};
       bookings.forEach(booking => {
         const serviceName = booking.service?.name || 'Unknown Service';
         servicePopularity[serviceName] = (servicePopularity[serviceName] || 0) + 1;
       });

       // Revenue by month
       const monthlyRevenue = {};
       bookings.filter(b => b.status === 'completed').forEach(booking => {
         const month = new Date(booking.appointmentDate).toLocaleString('default', { month: 'short' });
         monthlyRevenue[month] = (monthlyRevenue[month] || 0) + (booking.amount || booking.finalAmount || 0);
       });

       // Client retention (repeat bookings)
       const clientBookings = {};
       bookings.forEach(booking => {
         const clientId = booking.client?._id || booking.client?.email || booking.client;
         clientBookings[clientId] = (clientBookings[clientId] || 0) + 1;
       });
      const repeatClients = Object.values(clientBookings).filter(count => count > 1).length;
      const totalClients = Object.keys(clientBookings).length;
      const retentionRate = totalClients > 0 ? Math.round((repeatClients / totalClients) * 100) : 0;

      return { monthlyBookings, servicePopularity, monthlyRevenue, retentionRate };
    };

    const { monthlyBookings, servicePopularity, monthlyRevenue, retentionRate } = analyticsData();

    return (
      <div className="space-y-6">
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
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
                <p className="text-sm font-medium text-gray-600">Client Retention</p>
                <p className="text-2xl font-bold text-green-600">{retentionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔄</span>
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
                <p className="text-sm font-medium text-gray-600">Avg. Booking Value</p>
                               <p className="text-2xl font-bold text-purple-600">
                 ${bookings.length > 0 ? Math.round(bookings.reduce((sum, b) => sum + (b.amount || b.finalAmount || 0), 0) / bookings.length) : 0}
               </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
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
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-blue-600">
                  {bookings.length > 0 ? Math.round((bookings.filter(b => b.status === 'completed').length / bookings.length) * 100) : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Bookings Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Bookings</h3>
            <div className="space-y-3">
              {Object.entries(monthlyBookings).map(([month, count]) => (
                <div key={month} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(count / Math.max(...Object.values(monthlyBookings))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Popularity Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Popularity</h3>
            <div className="space-y-3">
              {Object.entries(servicePopularity)
                .sort(([,a], [,b]) => b - a)
                .map(([service, count]) => (
                <div key={service} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 truncate max-w-32">{service}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(count / Math.max(...Object.values(servicePopularity))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                ${Object.values(monthlyRevenue).reduce((sum, revenue) => sum + revenue, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                ${Object.values(monthlyRevenue).length > 0 ? Math.round(Object.values(monthlyRevenue).reduce((sum, revenue) => sum + revenue, 0) / Object.values(monthlyRevenue).length) : 0}
              </p>
              <p className="text-sm text-gray-600">Average Monthly Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {Object.keys(monthlyRevenue).length}
              </p>
              <p className="text-sm text-gray-600">Active Months</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className="space-y-6">
        {/* Business Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <input
                type="text"
                defaultValue="Nafis Reflexology"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input
                type="email"
                defaultValue="info@nafisreflexology.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                defaultValue="123 Wellness Street, City, State 12345"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Booking Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  defaultValue="09:00"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <input
                  type="time"
                  defaultValue="18:00"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Booking Lead Time (hours)</label>
              <input
                type="number"
                defaultValue="1"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Bookings per Day</label>
              <input
                type="number"
                defaultValue="20"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cancellation Policy (hours)</label>
              <input
                type="number"
                defaultValue="24"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive booking confirmations and updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">SMS Notifications</p>
                <p className="text-sm text-gray-500">Send booking reminders via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Admin Notifications</p>
                <p className="text-sm text-gray-500">Notify admin of new bookings and cancellations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">System Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-700">Total Bookings</p>
              <p className="text-lg font-semibold text-gray-900">{bookings.length}</p>
            </div>
                         <div>
               <p className="text-sm font-medium text-gray-700">Active Services</p>
               <p className="text-lg font-semibold text-gray-900">{new Set(bookings.map(b => b.service?._id || b.service?.name)).size}</p>
             </div>
             <div>
               <p className="text-sm font-medium text-gray-700">Total Clients</p>
               <p className="text-lg font-semibold text-gray-900">{new Set(bookings.map(b => b.client?._id || b.client?.email)).size}</p>
             </div>
            <div>
              <p className="text-sm font-medium text-gray-700">System Version</p>
              <p className="text-lg font-semibold text-gray-900">v1.0.0</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Reset to Defaults
          </button>
          <button className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
            Save Changes
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'bookings':
        return renderBookings();
      case 'services':
        return renderServices();
      case 'users':
        return renderUsers();
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Nafis Reflexology</title>
        <meta name="description" content="Admin dashboard for managing Nafis Reflexology business operations" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white pt-16">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.firstName}!</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Last updated: {new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-8">
            <nav className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-pink-100 text-pink-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default DashboardPage; 