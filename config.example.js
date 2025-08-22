module.exports = {
  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nafis-reflexology',

  // JWT Secret (Generate a strong secret for production)
  jwtSecret: process.env.JWT_SECRET || 'your_super_secret_jwt_key_here_change_in_production',

  // Frontend URL
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Stripe Configuration
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_your_stripe_secret_key_here',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_publishable_key_here',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_your_stripe_webhook_secret_here'
  },

  // Email Configuration (Gmail example)
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    user: process.env.SMTP_USER || 'your_email@gmail.com',
    pass: process.env.SMTP_PASS || 'your_app_password_here',
    from: process.env.EMAIL_FROM || 'Nafis Reflexology <your_email@gmail.com>'
  },

  // External Services
  calendly: {
    url: process.env.CALENDLY_URL || 'https://calendly.com/your-calendly-link'
  },

  sanity: {
    projectId: process.env.SANITY_PROJECT_ID || 'your_sanity_project_id',
    dataset: process.env.SANITY_DATASET || 'production',
    token: process.env.SANITY_TOKEN || 'your_sanity_token_here'
  },

  // Analytics
  analytics: {
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || 'G-XXXXXXXXXX',
    hotjarId: process.env.HOTJAR_ID || 'your_hotjar_id_here'
  },

  // File Upload (Cloudinary example)
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'your_cloudinary_cloud_name',
    apiKey: process.env.CLOUDINARY_API_KEY || 'your_cloudinary_api_key',
    apiSecret: process.env.CLOUDINARY_API_SECRET || 'your_cloudinary_api_secret'
  },

  // SMS Service (Twilio example)
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || 'your_twilio_account_sid',
    authToken: process.env.TWILIO_AUTH_TOKEN || 'your_twilio_auth_token',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '+1234567890'
  },

  // Payment Gateway (PayPal example)
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID || 'your_paypal_client_id',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || 'your_paypal_client_secret',
    mode: process.env.PAYPAL_MODE || 'sandbox'
  },

  // Security
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 12,
    sessionSecret: process.env.SESSION_SECRET || 'your_session_secret_here',
    cookieSecret: process.env.COOKIE_SECRET || 'your_cookie_secret_here'
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: process.env.LOG_FILE || 'logs/app.log'
  },

  // CORS Origins (comma-separated)
  corsOrigins: process.env.CORS_ORIGINS ? 
    process.env.CORS_ORIGINS.split(',') : 
    ['http://localhost:3000', 'https://nafisreflexology.com'],

  // Redis (for caching and sessions)
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  },

  // AWS S3 (for file storage)
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'your_aws_access_key',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'your_aws_secret_key',
    region: process.env.AWS_REGION || 'us-east-1',
    s3Bucket: process.env.AWS_S3_BUCKET || 'nafis-reflexology-uploads'
  },

  // Google Maps API
  googleMaps: {
    apiKey: process.env.GOOGLE_MAPS_API_KEY || 'your_google_maps_api_key'
  },

  // WhatsApp Business API
  whatsapp: {
    apiToken: process.env.WHATSAPP_API_TOKEN || 'your_whatsapp_api_token',
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || 'your_whatsapp_phone_number_id'
  },

  // Newsletter Service (Mailchimp example)
  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY || 'your_mailchimp_api_key',
    listId: process.env.MAILCHIMP_LIST_ID || 'your_mailchimp_list_id',
    serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX || 'us1'
  },

  // Monitoring (Sentry example)
  sentry: {
    dsn: process.env.SENTRY_DSN || 'your_sentry_dsn_here'
  },

  // Backup Configuration
  backup: {
    enabled: process.env.BACKUP_ENABLED === 'true' || false,
    schedule: process.env.BACKUP_SCHEDULE || '0 2 * * *',
    retentionDays: parseInt(process.env.BACKUP_RETENTION_DAYS) || 30
  },

  // Feature Flags
  features: {
    emailVerification: process.env.ENABLE_EMAIL_VERIFICATION !== 'false',
    smsNotifications: process.env.ENABLE_SMS_NOTIFICATIONS === 'true',
    analytics: process.env.ENABLE_ANALYTICS !== 'false',
    chatWidget: process.env.ENABLE_CHAT_WIDGET !== 'false',
    multiLanguage: process.env.ENABLE_MULTI_LANGUAGE !== 'false',
    darkMode: process.env.ENABLE_DARK_MODE !== 'false'
  },

  // Business Information
  business: {
    name: 'Nafis Reflexology',
    email: 'info@nafisreflexology.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Wellness Street',
      city: 'City',
      state: 'State',
      zipCode: '12345',
      country: 'US'
    },
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: 'Closed'
    }
  }
}; 