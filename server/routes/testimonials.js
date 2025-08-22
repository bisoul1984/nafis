const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Sample testimonials data (in a real app, this would come from a database)
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Amazing reflexology session! I felt completely relaxed and rejuvenated. The therapist was very professional and knowledgeable.',
    date: '2024-01-15',
    verified: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    comment: 'Excellent service! The foot reflexology helped relieve my stress and improved my sleep quality. Highly recommended!',
    date: '2024-01-10',
    verified: true
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    rating: 4,
    comment: 'Very relaxing experience. The staff is friendly and the facility is clean. Will definitely come back.',
    date: '2024-01-08',
    verified: true
  },
  {
    id: 4,
    name: 'David Thompson',
    rating: 5,
    comment: 'Outstanding reflexology treatment! I had chronic foot pain and after just one session, I felt significant improvement.',
    date: '2024-01-05',
    verified: true
  },
  {
    id: 5,
    name: 'Lisa Wang',
    rating: 5,
    comment: 'The best reflexology experience I\'ve ever had. Professional service, clean environment, and amazing results.',
    date: '2024-01-03',
    verified: true
  }
];

// @route   GET /api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    // In a real app, you would fetch from database
    // const testimonials = await Testimonial.find().sort({ date: -1 });
    
    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/testimonials/:id
// @desc    Get testimonial by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const testimonial = testimonials.find(t => t.id === parseInt(req.params.id));
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    console.error('Get testimonial error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/testimonials
// @desc    Create a new testimonial
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    // Validate input
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    if (!comment || comment.trim().length < 10) {
      return res.status(400).json({ message: 'Comment must be at least 10 characters long' });
    }
    
    // In a real app, you would save to database
    const newTestimonial = {
      id: testimonials.length + 1,
      name: `${req.user.firstName} ${req.user.lastName}`,
      rating: parseInt(rating),
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
      verified: false
    };
    
    testimonials.unshift(newTestimonial);
    
    res.status(201).json(newTestimonial);
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/testimonials/:id
// @desc    Update testimonial (admin only)
// @access  Private/Admin
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const testimonial = testimonials.find(t => t.id === parseInt(req.params.id));
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    const { rating, comment, verified } = req.body;
    
    if (rating !== undefined) testimonial.rating = parseInt(rating);
    if (comment !== undefined) testimonial.comment = comment.trim();
    if (verified !== undefined) testimonial.verified = verified;
    
    res.json(testimonial);
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial (admin only)
// @access  Private/Admin
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const index = testimonials.findIndex(t => t.id === parseInt(req.params.id));
    
    if (index === -1) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    testimonials.splice(index, 1);
    
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 