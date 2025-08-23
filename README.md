# Nafis Reflexology - Modern Wellness Web Application

A complete, modern web application for Nafis Reflexology, offering professional foot reflexology services with a focus on holistic healing and stress relief.

## Features

### Core Features
- **Modern Homepage** - Engaging hero section with conversion-driven CTAs
- **About Reflexology** - Educational content with interactive foot zone chart
- **Services Catalog** - Detailed service offerings with pricing and booking
- **Booking System** - Seamless appointment scheduling
- **Blog/Resource Hub** - CMS-powered wellness content
- **Testimonials** - Client reviews and success stories
- **FAQ Section** - Common questions and answers
- **Contact Information** - Multiple communication channels
- **E-Commerce Shop** - Wellness products and gift certificates

### Premium Features
- **Client Portal** - Booking history and progress tracking
- **Lead Magnet** - Free eBook "Reflexology at Home"
- **Multi-Language Support** - English and Amharic
- **Live Chat** - Real-time customer support
- **Interactive Foot Chart** - Educational tool for foot zones
- **Newsletter System** - Email marketing integration
- **Analytics** - Google Analytics and Hotjar integration

## Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Stripe** - Payment processing

### Additional Tools
- **Sanity.io** - Headless CMS
- **Calendly** - Appointment scheduling
- **Google Analytics** - Website analytics
- **Hotjar** - User behavior tracking

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nafis-reflexology
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## Project Structure

```
nafis-reflexology/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # CSS and Tailwind config
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── utils/            # Server utilities
├── public/               # Static files
└── docs/                 # Documentation
```

## Design System

### Colors
- **Primary Green**: `#7C9885` (Pastel green)
- **Secondary Lavender**: `#E6E6FA` (Light lavender)
- **Accent Beige**: `#F5F5DC` (Light beige)
- **Text Dark**: `#2D3748` (Dark gray)
- **Text Light**: `#718096` (Light gray)

### Typography
- **Headers**: Playfair Display
- **Body**: Inter
- **Accent**: Montserrat

### Design Principles
- Mobile-first responsive design
- Clean, minimalist aesthetic
- Generous white space
- Soft shadows and rounded corners
- Subtle animations and transitions

## Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Email Configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# External Services
CALENDLY_URL=your_calendly_url
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=production
SANITY_TOKEN=your_sanity_token

# Analytics
GOOGLE_ANALYTICS_ID=your_ga_id
HOTJAR_ID=your_hotjar_id
```

## Deployment

### Frontend (Vercel/Netlify)
1. Build the React app: `npm run build`
2. Deploy to Vercel or Netlify
3. Configure environment variables

### Backend (Heroku/Railway)
1. Set up MongoDB Atlas
2. Configure environment variables
3. Deploy to Heroku or Railway

## Performance

- Lighthouse Score: >90
- Mobile-first design
- Lazy loading for images
- Code splitting
- Optimized bundle size

## Security

- Helmet.js for security headers
- Rate limiting
- Input sanitization
- CORS configuration
- JWT authentication
- Secure payment processing

## Analytics & SEO

- Google Analytics integration
- Hotjar for user behavior
- Schema.org markup
- Meta tags optimization
- Sitemap generation
- Robots.txt configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: support@nafisreflexology.com
- Phone: +1 (555) 123-4567
- Website: https://nafisreflexology.com

---

**Built with love for wellness and healing** 