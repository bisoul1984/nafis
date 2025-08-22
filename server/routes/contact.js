const express = require('express');
const router = express.Router();

// @route   POST /api/contact
// @desc    Send contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide name, email and message' });
    }
    
    // TODO: Implement email sending logic
    console.log('Contact form submission:', { name, email, message });
    
    res.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


