const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    maxlength: [100, 'Service name cannot exceed 100 characters']
  },
  nameAmharic: {
    type: String,
    trim: true,
    maxlength: [100, 'Amharic service name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  descriptionAmharic: {
    type: String,
    maxlength: [500, 'Amharic description cannot exceed 500 characters']
  },
  longDescription: {
    type: String,
    maxlength: [2000, 'Long description cannot exceed 2000 characters']
  },
  longDescriptionAmharic: {
    type: String,
    maxlength: [2000, 'Amharic long description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: ['relaxation', 'therapeutic', 'premium', 'addon'],
    default: 'relaxation'
  },
  duration: {
    type: Number,
    required: [true, 'Service duration is required'],
    min: [15, 'Duration must be at least 15 minutes'],
    max: [180, 'Duration cannot exceed 180 minutes']
  },
  price: {
    type: Number,
    required: [true, 'Service price is required'],
    min: [0, 'Price cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'ETB', 'EUR']
  },
  benefits: [{
    type: String,
    maxlength: [200, 'Benefit description cannot exceed 200 characters']
  }],
  benefitsAmharic: [{
    type: String,
    maxlength: [200, 'Amharic benefit description cannot exceed 200 characters']
  }],
  whatToExpect: [{
    type: String,
    maxlength: [300, 'Expectation description cannot exceed 300 characters']
  }],
  whatToExpectAmharic: [{
    type: String,
    maxlength: [300, 'Amharic expectation description cannot exceed 300 characters']
  }],
  contraindications: [{
    type: String,
    maxlength: [200, 'Contraindication description cannot exceed 200 characters']
  }],
  contraindicationsAmharic: [{
    type: String,
    maxlength: [200, 'Amharic contraindication description cannot exceed 200 characters']
  }],
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  videoUrl: String,
  isActive: {
    type: Boolean,
    default: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  maxBookingsPerDay: {
    type: Number,
    default: 10
  },
  requiresConsultation: {
    type: Boolean,
    default: false
  },
  ageRestriction: {
    minAge: {
      type: Number,
      default: 0
    },
    maxAge: {
      type: Number,
      default: 120
    }
  },
  tags: [String],
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  availability: {
    monday: { type: Boolean, default: true },
    tuesday: { type: Boolean, default: true },
    wednesday: { type: Boolean, default: true },
    thursday: { type: Boolean, default: true },
    friday: { type: Boolean, default: true },
    saturday: { type: Boolean, default: true },
    sunday: { type: Boolean, default: false }
  },
  timeSlots: [{
    startTime: {
      type: String,
      required: true,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
    },
    endTime: {
      type: String,
      required: true,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  }]
}, {
  timestamps: true
});

// Virtual for formatted duration
serviceSchema.virtual('formattedDuration').get(function() {
  const hours = Math.floor(this.duration / 60);
  const minutes = this.duration % 60;
  
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else {
    return `${minutes}m`;
  }
});

// Virtual for formatted price
serviceSchema.virtual('formattedPrice').get(function() {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: this.currency
  }).format(this.price);
});

// Indexes for better query performance
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ isPopular: 1, isActive: 1 });
serviceSchema.index({ isFeatured: 1, isActive: 1 });
serviceSchema.index({ sortOrder: 1 });

// Pre-save middleware to ensure only one primary image
serviceSchema.pre('save', function(next) {
  if (this.images && this.images.length > 0) {
    const primaryImages = this.images.filter(img => img.isPrimary);
    if (primaryImages.length > 1) {
      // Keep only the first primary image
      let foundPrimary = false;
      this.images.forEach(img => {
        if (img.isPrimary && !foundPrimary) {
          foundPrimary = true;
        } else {
          img.isPrimary = false;
        }
      });
    }
  }
  next();
});

// Static method to get active services
serviceSchema.statics.getActiveServices = function() {
  return this.find({ isActive: true }).sort({ sortOrder: 1, name: 1 });
};

// Static method to get popular services
serviceSchema.statics.getPopularServices = function() {
  return this.find({ isActive: true, isPopular: true }).sort({ sortOrder: 1 });
};

// Static method to get featured services
serviceSchema.statics.getFeaturedServices = function() {
  return this.find({ isActive: true, isFeatured: true }).sort({ sortOrder: 1 });
};

// Method to check if service is available on a specific day
serviceSchema.methods.isAvailableOnDay = function(dayOfWeek) {
  const dayMap = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
  };
  
  const dayName = dayMap[dayOfWeek];
  return this.availability[dayName] || false;
};

// JSON serialization
serviceSchema.methods.toJSON = function() {
  const service = this.toObject();
  service.formattedDuration = this.formattedDuration;
  service.formattedPrice = this.formattedPrice;
  return service;
};

module.exports = mongoose.model('Service', serviceSchema); 