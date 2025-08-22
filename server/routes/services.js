const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// @route   GET /api/services
// @desc    Get all active services
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, popular, limit = 10, page = 1 } = req.query;
    
    let query = { isActive: true };
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by featured
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    // Filter by popular
    if (popular === 'true') {
      query.isPopular = true;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const services = await Service.find(query)
      .sort({ sortOrder: 1, name: 1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Service.countDocuments(query);
    
    res.json({
      services,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        hasNext: skip + services.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/services/popular
// @desc    Get popular services
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const services = await Service.getPopularServices();
    res.json(services);
  } catch (error) {
    console.error('Error fetching popular services:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/services/featured
// @desc    Get featured services
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const services = await Service.getFeaturedServices();
    res.json(services);
  } catch (error) {
    console.error('Error fetching featured services:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/services/categories
// @desc    Get service categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Service.distinct('category');
    const categoryData = await Promise.all(
      categories.map(async (category) => {
        const count = await Service.countDocuments({ 
          category, 
          isActive: true 
        });
        return { name: category, count };
      })
    );
    
    res.json(categoryData);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/services/:id
// @desc    Get service by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    if (!service.isActive) {
      return res.status(404).json({ message: 'Service not available' });
    }
    
    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/services
// @desc    Create a new service
// @access  Private/Admin
router.post('/', [auth, admin], async (req, res) => {
  try {
    const {
      name,
      nameAmharic,
      description,
      descriptionAmharic,
      longDescription,
      longDescriptionAmharic,
      category,
      duration,
      price,
      currency,
      benefits,
      benefitsAmharic,
      whatToExpect,
      whatToExpectAmharic,
      contraindications,
      contraindicationsAmharic,
      images,
      videoUrl,
      isPopular,
      isFeatured,
      sortOrder,
      maxBookingsPerDay,
      requiresConsultation,
      ageRestriction,
      tags,
      seo,
      availability,
      timeSlots
    } = req.body;

    const service = new Service({
      name,
      nameAmharic,
      description,
      descriptionAmharic,
      longDescription,
      longDescriptionAmharic,
      category,
      duration,
      price,
      currency,
      benefits,
      benefitsAmharic,
      whatToExpect,
      whatToExpectAmharic,
      contraindications,
      contraindicationsAmharic,
      images,
      videoUrl,
      isPopular,
      isFeatured,
      sortOrder,
      maxBookingsPerDay,
      requiresConsultation,
      ageRestriction,
      tags,
      seo,
      availability,
      timeSlots
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/services/:id
// @desc    Update a service
// @access  Private/Admin
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete a service (soft delete)
// @access  Private/Admin
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Soft delete - set isActive to false
    service.isActive = false;
    await service.save();

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/services/:id/toggle-featured
// @desc    Toggle featured status
// @access  Private/Admin
router.patch('/:id/toggle-featured', [auth, admin], async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.isFeatured = !service.isFeatured;
    await service.save();

    res.json(service);
  } catch (error) {
    console.error('Error toggling featured status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PATCH /api/services/:id/toggle-popular
// @desc    Toggle popular status
// @access  Private/Admin
router.patch('/:id/toggle-popular', [auth, admin], async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.isPopular = !service.isPopular;
    await service.save();

    res.json(service);
  } catch (error) {
    console.error('Error toggling popular status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/services/search
// @desc    Search services
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, duration } = req.query;
    
    let query = { isActive: true };
    
    // Text search
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { nameAmharic: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { descriptionAmharic: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } }
      ];
    }
    
    // Category filter
    if (category) {
      query.category = category;
    }
    
    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    
    // Duration filter
    if (duration) {
      query.duration = { $lte: parseInt(duration) };
    }
    
    const services = await Service.find(query)
      .sort({ sortOrder: 1, name: 1 });
    
    res.json(services);
  } catch (error) {
    console.error('Error searching services:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 