const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Client is required']
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service is required']
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Therapist is required']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [15, 'Duration must be at least 15 minutes']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online', 'gift-card'],
    default: 'cash'
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'ETB', 'EUR']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  finalAmount: {
    type: Number,
    required: [true, 'Final amount is required'],
    min: [0, 'Final amount cannot be negative']
  },
  notes: {
    client: {
      type: String,
      maxlength: [500, 'Client notes cannot exceed 500 characters']
    },
    therapist: {
      type: String,
      maxlength: [500, 'Therapist notes cannot exceed 500 characters']
    },
    admin: {
      type: String,
      maxlength: [500, 'Admin notes cannot exceed 500 characters']
    }
  },
  healthForm: {
    hasCompleted: {
      type: Boolean,
      default: false
    },
    healthConditions: [String],
    allergies: [String],
    medications: [String],
    pregnancy: {
      type: Boolean,
      default: false
    },
    pregnancyWeeks: Number,
    recentInjuries: [String],
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    }
  },
  sessionDetails: {
    pressurePoints: [String],
    techniques: [String],
    clientFeedback: {
      comfort: {
        type: Number,
        min: 1,
        max: 10
      },
      pressure: {
        type: Number,
        min: 1,
        max: 10
      },
      overallExperience: {
        type: Number,
        min: 1,
        max: 10
      },
      comments: String
    },
    therapistNotes: {
      areasWorked: [String],
      clientResponse: String,
      recommendations: String,
      followUpNeeded: {
        type: Boolean,
        default: false
      },
      followUpDate: Date
    }
  },
  reminders: {
    emailSent: {
      type: Boolean,
      default: false
    },
    smsSent: {
      type: Boolean,
      default: false
    },
    emailSentDate: Date,
    smsSentDate: Date
  },
  cancellation: {
    cancelledBy: {
      type: String,
      enum: ['client', 'therapist', 'admin', 'system']
    },
    cancelledAt: Date,
    reason: String,
    refundAmount: Number,
    refundProcessed: {
      type: Boolean,
      default: false
    }
  },
  rescheduling: {
    originalDate: Date,
    originalTime: String,
    rescheduledBy: {
      type: String,
      enum: ['client', 'therapist', 'admin']
    },
    rescheduledAt: Date,
    reason: String
  },
  giftCard: {
    used: {
      type: Boolean,
      default: false
    },
    giftCardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GiftCard'
    },
    amountUsed: Number
  },
  addOns: [{
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    },
    name: String,
    price: Number,
    duration: Number
  }],
  package: {
    isPackageBooking: {
      type: Boolean,
      default: false
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package'
    },
    sessionsRemaining: Number
  }
}, {
  timestamps: true
});

// Virtual for formatted appointment date
bookingSchema.virtual('formattedDate').get(function() {
  return this.appointmentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for formatted time
bookingSchema.virtual('formattedTime').get(function() {
  return `${this.startTime} - ${this.endTime}`;
});

// Virtual for formatted amount
bookingSchema.virtual('formattedAmount').get(function() {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: this.currency
  }).format(this.finalAmount);
});

// Virtual for appointment status
bookingSchema.virtual('isUpcoming').get(function() {
  const now = new Date();
  const appointmentDateTime = new Date(this.appointmentDate);
  appointmentDateTime.setHours(parseInt(this.startTime.split(':')[0]));
  appointmentDateTime.setMinutes(parseInt(this.startTime.split(':')[1]));
  
  return appointmentDateTime > now && this.status === 'confirmed';
});

// Virtual for appointment status
bookingSchema.virtual('isPast').get(function() {
  const now = new Date();
  const appointmentDateTime = new Date(this.appointmentDate);
  appointmentDateTime.setHours(parseInt(this.endTime.split(':')[0]));
  appointmentDateTime.setMinutes(parseInt(this.endTime.split(':')[1]));
  
  return appointmentDateTime < now;
});

// Indexes for better query performance
bookingSchema.index({ client: 1, appointmentDate: -1 });
bookingSchema.index({ therapist: 1, appointmentDate: 1 });
bookingSchema.index({ status: 1, appointmentDate: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ appointmentDate: 1, startTime: 1 });

// Pre-save middleware to calculate final amount
bookingSchema.pre('save', function(next) {
  if (this.isModified('amount') || this.isModified('discount')) {
    this.finalAmount = this.amount - this.discount;
  }
  next();
});

// Static method to get upcoming bookings
bookingSchema.statics.getUpcomingBookings = function(userId, limit = 10) {
  const now = new Date();
  return this.find({
    client: userId,
    appointmentDate: { $gte: now },
    status: { $in: ['pending', 'confirmed'] }
  })
  .populate('service', 'name duration price')
  .populate('therapist', 'firstName lastName')
  .sort({ appointmentDate: 1, startTime: 1 })
  .limit(limit);
};

// Static method to get past bookings
bookingSchema.statics.getPastBookings = function(userId, limit = 10) {
  const now = new Date();
  return this.find({
    client: userId,
    appointmentDate: { $lt: now },
    status: { $in: ['completed', 'cancelled', 'no-show'] }
  })
  .populate('service', 'name duration price')
  .populate('therapist', 'firstName lastName')
  .sort({ appointmentDate: -1, startTime: -1 })
  .limit(limit);
};

// Static method to check availability
bookingSchema.statics.checkAvailability = function(therapistId, date, startTime, endTime, excludeBookingId = null) {
  const query = {
    therapist: therapistId,
    appointmentDate: date,
    status: { $in: ['pending', 'confirmed'] },
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
      }
    ]
  };
  
  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }
  
  return this.findOne(query);
};

// Method to cancel booking
bookingSchema.methods.cancelBooking = function(cancelledBy, reason) {
  this.status = 'cancelled';
  this.cancellation = {
    cancelledBy,
    cancelledAt: new Date(),
    reason
  };
  
  // Calculate refund if payment was made
  if (this.paymentStatus === 'paid') {
    this.cancellation.refundAmount = this.finalAmount;
    this.paymentStatus = 'refunded';
  }
  
  return this.save();
};

// Method to reschedule booking
bookingSchema.methods.rescheduleBooking = function(newDate, newStartTime, newEndTime, rescheduledBy, reason) {
  this.rescheduling = {
    originalDate: this.appointmentDate,
    originalTime: `${this.startTime} - ${this.endTime}`,
    rescheduledBy,
    rescheduledAt: new Date(),
    reason
  };
  
  this.appointmentDate = newDate;
  this.startTime = newStartTime;
  this.endTime = newEndTime;
  
  return this.save();
};

// JSON serialization
bookingSchema.methods.toJSON = function() {
  const booking = this.toObject();
  booking.formattedDate = this.formattedDate;
  booking.formattedTime = this.formattedTime;
  booking.formattedAmount = this.formattedAmount;
  booking.isUpcoming = this.isUpcoming;
  booking.isPast = this.isPast;
  return booking;
};

module.exports = mongoose.model('Booking', bookingSchema); 