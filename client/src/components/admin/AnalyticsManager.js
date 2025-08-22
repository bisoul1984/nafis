import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnalyticsManager = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedChart, setSelectedChart] = useState('revenue');

  // Mock data for analytics
  const [analyticsData] = useState({
    revenue: {
      daily: [120, 150, 180, 200, 160, 220, 190, 240, 280, 300, 250, 320, 290, 350, 380, 400, 360, 420, 450, 480, 500, 520, 540, 560, 580, 600, 620, 640, 660, 680],
      weekly: [850, 1200, 1400, 1600, 1800, 2000, 2200, 2400],
      monthly: [5200, 6800, 7200, 7800, 8200, 8800, 9200, 9600, 10000, 10400, 10800, 11200]
    },
    bookings: {
      daily: [8, 12, 15, 18, 14, 20, 16, 22, 25, 28, 24, 30, 26, 32, 35, 38, 34, 40, 42, 45, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66],
      weekly: [60, 85, 100, 115, 130, 145, 160, 175],
      monthly: [380, 520, 580, 640, 680, 720, 760, 800, 840, 880, 920, 960]
    },
    services: {
      'Foot Reflexology': 45,
      'Deep Tissue Massage': 30,
      'Aromatherapy Session': 25,
      'Hot Stone Therapy': 15,
      'Swedish Massage': 35,
      'Thai Massage': 20
    },
    clientRetention: 78,
    averageRating: 4.8,
    totalClients: 156,
    repeatClients: 89
  });

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'booking',
      message: 'New booking: Sarah Johnson - Foot Reflexology',
      time: '2 minutes ago',
      amount: 120
    },
    {
      id: 2,
      type: 'completion',
      message: 'Service completed: Michael Chen - Deep Tissue Massage',
      time: '15 minutes ago',
      amount: 150
    },
    {
      id: 3,
      type: 'cancellation',
      message: 'Booking cancelled: Lisa Anderson - Hot Stone Therapy',
      time: '1 hour ago',
      amount: 180
    },
    {
      id: 4,
      type: 'review',
      message: 'New 5-star review from Emma Davis',
      time: '2 hours ago'
    },
    {
      id: 5,
      type: 'booking',
      message: 'New booking: David Wilson - Aromatherapy Session',
      time: '3 hours ago',
      amount: 100
    }
  ]);

  const periods = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'Last 12 Months' }
  ];

  const charts = [
    { value: 'revenue', label: 'Revenue', icon: '💰' },
    { value: 'bookings', label: 'Bookings', icon: '📅' },
    { value: 'services', label: 'Services', icon: '🛠️' },
    { value: 'clients', label: 'Clients', icon: '👥' }
  ];

  const getDataForPeriod = (dataType, period) => {
    return analyticsData[dataType][period] || [];
  };

  const getTotalRevenue = () => {
    const data = getDataForPeriod('revenue', selectedPeriod);
    return data.reduce((sum, val) => sum + val, 0);
  };

  const getTotalBookings = () => {
    const data = getDataForPeriod('bookings', selectedPeriod);
    return data.reduce((sum, val) => sum + val, 0);
  };

  const getAverageRevenue = () => {
    const data = getDataForPeriod('revenue', selectedPeriod);
    return data.length > 0 ? Math.round(data.reduce((sum, val) => sum + val, 0) / data.length) : 0;
  };

  const getAverageBookings = () => {
    const data = getDataForPeriod('bookings', selectedPeriod);
    return data.length > 0 ? Math.round(data.reduce((sum, val) => sum + val, 0) / data.length) : 0;
  };

  const renderRevenueChart = () => {
    const data = getDataForPeriod('revenue', selectedPeriod);
    const maxValue = Math.max(...data);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
          <div className="text-sm text-gray-500">
            Total: ${getTotalRevenue().toLocaleString()}
          </div>
        </div>
        <div className="h-64 flex items-end space-x-1">
          {data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-pink-500 to-pink-300 rounded-t"
                style={{ height: `${(value / maxValue) * 100}%` }}
              />
              <div className="text-xs text-gray-500 mt-1">
                {selectedPeriod === 'daily' ? index + 1 : 
                 selectedPeriod === 'weekly' ? `W${index + 1}` : 
                 selectedPeriod === 'monthly' ? `M${index + 1}` : index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBookingsChart = () => {
    const data = getDataForPeriod('bookings', selectedPeriod);
    const maxValue = Math.max(...data);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Bookings Trend</h3>
          <div className="text-sm text-gray-500">
            Total: {getTotalBookings()} bookings
          </div>
        </div>
        <div className="h-64 flex items-end space-x-1">
          {data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                style={{ height: `${(value / maxValue) * 100}%` }}
              />
              <div className="text-xs text-gray-500 mt-1">
                {selectedPeriod === 'daily' ? index + 1 : 
                 selectedPeriod === 'weekly' ? `W${index + 1}` : 
                 selectedPeriod === 'monthly' ? `M${index + 1}` : index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderServicesChart = () => {
    const services = analyticsData.services;
    const total = Object.values(services).reduce((sum, val) => sum + val, 0);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Service Distribution</h3>
          <div className="text-sm text-gray-500">
            Total: {total} bookings
          </div>
        </div>
        <div className="space-y-3">
          {Object.entries(services).map(([service, count]) => (
            <div key={service} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-pink-500 rounded"></div>
                <span className="text-sm font-medium text-gray-700">{service}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-pink-500 h-2 rounded-full"
                    style={{ width: `${(count / total) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderClientsChart = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{analyticsData.totalClients}</div>
              <div className="text-sm text-gray-600">Total Clients</div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{analyticsData.repeatClients}</div>
              <div className="text-sm text-gray-600">Repeat Clients</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Retention</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - analyticsData.clientRetention / 100)}`}
                  className="text-green-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-900">{analyticsData.clientRetention}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Client retention rate</p>
              <p className="text-xs text-gray-500">Based on repeat bookings</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Satisfaction</h3>
          <div className="flex items-center space-x-4">
            <div className="text-4xl">⭐</div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{analyticsData.averageRating}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'revenue':
        return renderRevenueChart();
      case 'bookings':
        return renderBookingsChart();
      case 'services':
        return renderServicesChart();
      case 'clients':
        return renderClientsChart();
      default:
        return renderRevenueChart();
    }
  };

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h2>
            <p className="text-gray-600">Track your business performance and insights</p>
          </div>
          <div className="flex space-x-2">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedPeriod === period.value
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${getTotalRevenue().toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
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
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalBookings()}</p>
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
              <p className="text-sm font-medium text-gray-600">Avg. Revenue/Day</p>
              <p className="text-2xl font-bold text-gray-900">${getAverageRevenue()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
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
              <p className="text-sm font-medium text-gray-600">Avg. Bookings/Day</p>
              <p className="text-2xl font-bold text-gray-900">{getAverageBookings()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chart Selector and Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex space-x-2">
            {charts.map((chart) => (
              <button
                key={chart.value}
                onClick={() => setSelectedChart(chart.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedChart === chart.value
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{chart.icon}</span>
                <span>{chart.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {renderChart()}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                  activity.type === 'booking' ? 'bg-green-500' :
                  activity.type === 'completion' ? 'bg-blue-500' :
                  activity.type === 'cancellation' ? 'bg-red-500' :
                  'bg-yellow-500'
                }`}>
                  {activity.type === 'booking' ? '📅' :
                   activity.type === 'completion' ? '✅' :
                   activity.type === 'cancellation' ? '❌' :
                   '⭐'}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
              {activity.amount && (
                <div className="text-sm font-medium text-green-600">
                  ${activity.amount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generate Report</h3>
            <p className="text-sm text-gray-600 mb-4">Create detailed business reports</p>
            <button className="btn btn-primary w-full">Generate Report</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📧</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Data</h3>
            <p className="text-sm text-gray-600 mb-4">Export analytics data to CSV</p>
            <button className="btn btn-outline w-full">Export Data</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Settings</h3>
            <p className="text-sm text-gray-600 mb-4">Configure analytics preferences</p>
            <button className="btn btn-outline w-full">Open Settings</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsManager; 