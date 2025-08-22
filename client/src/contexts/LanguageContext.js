import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Header
    header: {
      tagline: 'Professional Foot Reflexology & Wellness Services'
    },
    
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      booking: 'Book Now',
  
      testimonials: 'Testimonials',
      faq: 'FAQ',
      contact: 'Contact',
      shop: 'Shop',
      login: 'Login',
      register: 'Register',
      profile: 'Profile',
      dashboard: 'Dashboard',
      logout: 'Logout'
    },

    // Homepage
    home: {
      hero: {
        title: {
          line1: 'Relieve Stress & Improve Health',
          line2: 'with Professional Foot Reflexology'
        },
        subtitle: 'Experience the ancient healing art of reflexology for complete wellness and relaxation',
        cta: 'Book Your Session',
        learnMore: 'Learn More',
        freeEbook: {
          title: 'Free Wellness Guide',
          description: 'Get our comprehensive guide to reflexology benefits and techniques',
          cta: 'Download Free Guide'
        },
        scrollText: 'Scroll to explore',
        trust: {
          rating: '4.9/5 Rating',
          clients: '500+ Happy Clients',
          certified: 'Certified Practitioner'
        }
      },
      benefits: {
        title: 'Benefits of Reflexology',
        stressRelief: 'Stress Relief',
        circulation: 'Improved Circulation',
        detoxification: 'Detoxification',
        relaxation: 'Deep Relaxation',
        painRelief: 'Pain Relief',
        energyBoost: 'Energy Boost'
      },
      services: {
        title: 'Our Services',
        viewAll: 'View All Services',
        relaxation: 'Relaxation Reflexology',
        deepTissue: 'Deep Tissue Foot Work',
        meridian: 'Meridian-Focused Healing'
      },
      testimonials: {
        title: 'What Our Clients Say',
        viewAll: 'View All Testimonials'
      },
      newsletter: {
        title: 'Stay Connected',
        subtitle: 'Get wellness tips and special offers delivered to your inbox',
        placeholder: 'Enter your email',
        subscribe: 'Subscribe',
        success: 'Thank you for subscribing!'
      },
      quickLinks: {
        title: 'Quick Links',
        subtitle: 'Explore our services and resources',
        aboutDesc: 'Learn about our mission and approach to wellness',
        servicesDesc: 'Discover our range of reflexology treatments',
        bookingDesc: 'Schedule your appointment online',
        contactDesc: 'Get in touch with our team'
      },
      trust: {
        title: 'Why Choose Us',
        certified: 'Certified Practitioner',
        experienced: '10+ Years Experience',
        secure: 'Secure & Private',
        natural: 'Natural Healing'
      }
    },

    // About
    about: {
      title: 'About Reflexology',
      subtitle: 'Discover the ancient healing art that connects your feet to your entire body',
      whatIs: {
        title: 'What is Reflexology?',
        description: 'Reflexology is a natural healing art based on the principle that there are reflexes in the feet, hands, and ears that correspond to every part, gland, and organ of the body. Through application of pressure on these reflexes, reflexology relieves tension, improves circulation, and helps promote the natural function of the related areas of the body.'
      },
      history: {
        title: 'History & Origins',
        description: 'Reflexology has been practiced for thousands of years, with evidence of its use in ancient Egypt, China, and India. The modern form of reflexology was developed in the early 20th century by Dr. William Fitzgerald and later refined by Eunice Ingham.'
      },
      benefits: {
        title: 'Benefits of Reflexology',
        list: [
          'Reduces stress and anxiety',
          'Improves blood circulation',
          'Promotes detoxification',
          'Relieves pain and tension',
          'Enhances energy levels',
          'Supports immune system',
          'Improves sleep quality',
          'Balances body systems'
        ]
      },
      practitioner: {
        title: 'Meet Your Practitioner',
        name: 'Nafis',
        credentials: 'Certified Reflexologist',
        experience: '10+ Years Experience',
        description: 'With over a decade of experience in reflexology and holistic healing, I am dedicated to helping clients achieve optimal wellness through the ancient art of foot reflexology.'
      }
    },

    // Services
    services: {
      title: 'Our Services',
      subtitle: 'Professional reflexology treatments tailored to your needs',
      categories: {
        relaxation: 'Relaxation',
        therapeutic: 'Therapeutic',
        premium: 'Premium',
        addon: 'Add-ons'
      },
      booking: 'Book Now',
      duration: 'Duration',
      price: 'Price',
      benefits: 'Benefits',
      whatToExpect: 'What to Expect',
      contraindications: 'Contraindications'
    },

    // Booking
    booking: {
      title: 'Book Your Session',
      subtitle: 'Choose your preferred service and time',
      selectService: 'Select Service',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      personalInfo: 'Personal Information',
      healthForm: 'Health Information',
      notes: 'Special Requests',
      total: 'Total',
      bookNow: 'Confirm Booking',
      confirmation: 'Booking Confirmation',
      success: 'Your booking has been confirmed!'
    },

    // Contact
    contact: {
      title: 'Contact Us',
      subtitle: 'Get in touch with us',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      hours: 'Business Hours',
      message: 'Send us a message',
      send: 'Send Message',
      success: 'Message sent successfully!'
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      success: 'Success!',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      close: 'Close',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      reset: 'Reset',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      all: 'All',
      none: 'None',
      yes: 'Yes',
      no: 'No',
      optional: 'Optional',
      required: 'Required',
      minutes: 'minutes',
      hours: 'hours',
      days: 'days',
      weeks: 'weeks',
      months: 'months',
      years: 'years',
      learnMore: 'Learn More'
    }
  },

  am: {
    // Header
    header: {
      tagline: 'የተሰማሩ የእግር ሪፌክስሎጂ እና የጤና አገልግሎቶች'
    },
    
    // Navigation
    nav: {
      home: 'ዋና ገጽ',
      about: 'ስለ እኛ',
      services: 'አገልግሎቶች',
      booking: 'ያስያዙ',
  
      testimonials: 'የደንበኞች አስተያየት',
      faq: 'የተለመዱ ጥያቄዎች',
      contact: 'አድራሻ',
      shop: 'ድህረ ገጽ',
      login: 'ግብይት',
      register: 'ይመዝገቡ',
      profile: 'መገለጫ',
      dashboard: 'ዳሽቦርድ',
      logout: 'ይውጡ'
    },

    // Homepage
    home: {
      hero: {
        title: {
          line1: 'ጫና ያስወግዱ እና ጤናዎን ያሻሽሉ',
          line2: 'የተሰማሩ የእግር ሪፌክስሎጂ አማካሪ አገልግሎት በኩል'
        },
        subtitle: 'ለሙሉ ደህንነት እና ዕረፍት የጥንት የፈውስ ስነ-ስርዓት የሪፌክስሎጂ ስራ ያስተንትኑ',
        cta: 'የእርስዎ ክፍለ ጊዜ ያስያዙ',
        learnMore: 'የበለጠ ይወቁ',
        freeEbook: {
          title: 'ነፃ የጤና መመሪያ',
          description: 'የሪፌክስሎጂ ጥቅሞች እና ቴክኒኮች የሚያካትት ሰፊ መመሪያ ያግኙ',
          cta: 'ነፃ መመሪያ ያውርዱ'
        },
        scrollText: 'ለመመልከት ያሸብልሉ',
        trust: {
          rating: '4.9/5 ደረጃ',
          clients: '500+ ደስ የሚሉ ደንበኞች',
          certified: 'የተረጋገጠ አማካሪ'
        }
      },
      benefits: {
        title: 'የሪፌክስሎጂ ጥቅሞች',
        stressRelief: 'ጫና መፍቻ',
        circulation: 'የደም ዝውውር ማሻሻያ',
        detoxification: 'መርዛማ ንጥረ ነገሮች ማስወገጃ',
        relaxation: 'ጥልቅ ዕረፍት',
        painRelief: 'ህመም መፍቻ',
        energyBoost: 'ኃይል ማሳደጊያ'
      },
      services: {
        title: 'የእኛ አገልግሎቶች',
        viewAll: 'ሁሉንም አገልግሎቶች ይመልከቱ',
        relaxation: 'የዕረፍት ሪፌክስሎጂ',
        deepTissue: 'ጥልቅ ስፖንጅ የእግር ስራ',
        meridian: 'የመሪዲያን ያተኩረ ፈውስ'
      },
      testimonials: {
        title: 'የደንበኞቻችን አስተያየት',
        viewAll: 'ሁሉንም አስተያየቶች ይመልከቱ'
      },
      newsletter: {
        title: 'ተገኙ',
        subtitle: 'የጤና ምክሮች እና ልዩ ቅናሾች በኢሜይልዎ ይደርሳሉ',
        placeholder: 'ኢሜይልዎን ያስገቡ',
        subscribe: 'ይመዝገቡ',
        success: 'ለመመዝገብዎ አመሰግናለሁ!'
      },
      quickLinks: {
        title: 'ፈጣን አገናኞች',
        subtitle: 'የእኛ አገልግሎቶች እና ሀብቶች ያስሱ',
        aboutDesc: 'የእኛ ተልእኮ እና የጤና አቀራረብ ይወቁ',
        servicesDesc: 'የእኛ የሪፌክስሎጂ ሕክምናዎች ክልል ያውቁ',
        bookingDesc: 'የመያያዣዎን በመስመር ላይ ያስያዙ',
        contactDesc: 'ከቡድናችን ጋር ያግኙ'
      },
      trust: {
        title: 'ለምን እንደምንመርጡን',
        certified: 'የተረጋገጠ አማካሪ',
        experienced: '10+ ዓመት ስራ ልምድ',
        secure: 'ደህንነቱ የተጠበቀ እና ግል',
        natural: 'ተፈጥሯዊ ፈውስ'
      }
    },

    // About
    about: {
      title: 'ስለ ሪፌክስሎጂ',
      subtitle: 'እግሮችዎን ከሰውነትዎ ሁሉ ጋር የሚያገናኝ የጥንት ፈውስ ስነ-ስርዓት ያውቁ',
      whatIs: {
        title: 'ሪፌክስሎጂ ምንድን ነው?',
        description: 'ሪፌክስሎጂ በእግሮች፣ እጆች እና ጆሮዎች ውስጥ ያሉ ሪፌክሶች ከሰውነት እያንዳንዱ ክፍል፣ እጢ እና ድምጽ ጋር የሚዛመዱ መርሆ ላይ የተመሰረተ ተፈጥሯዊ ፈውስ ስነ-ስርዓት ነው። በእነዚህ ሪፌክሶች ላይ ጫና በመጫን ሪፌክስሎጂ ጫና ያስወግዳል፣ የደም ዝውውር ያሻሽላል እና የተዛመዱ የሰውነት ክፍሎች ተፈጥሯዊ ስራ እንዲያደግ ያግዛል።'
      },
      history: {
        title: 'ታሪክ እና መነሻ',
        description: 'ሪፌክስሎጂ ለሺህ ዓመታት የተሰራ ሲሆን በጥንታዊ ግብጽ፣ ቻይና እና ህንድ ውስጥ የመጠቀሙ ማስረጃ አለ። ዘመናዊው የሪፌክስሎጂ ቅርጸት በ20ኛው ክፍለ ዘመን መጀመሪያ ላይ በዶ/ር ዊሊያም ፊዝጀራልድ ተዘጋጅቷል እና በኋላ በዩኒስ ኢንግሃም ተሻሽሏል።'
      },
      benefits: {
        title: 'የሪፌክስሎጂ ጥቅሞች',
        list: [
          'ጫና እና ተስፋ መቁረጥ ያሻሽላል',
          'የደም ዝውውር ያሻሽላል',
          'መርዛማ ንጥረ ነገሮች ማስወገጃ ያጎላል',
          'ህመም እና ጫና ያስወግዳል',
          'የኃይል ደረጃዎች ያሳድጋል',
          'የመከላከያ ስርዓት ያጎላል',
          'የእንቅልፍ ጥራት ያሻሽላል',
          'የሰውነት ስርዓቶች ያመጣጣማል'
        ]
      },
      practitioner: {
        title: 'የእርስዎ አማካሪ ያውቁ',
        name: 'ናፊስ',
        credentials: 'የተረጋገጠ ሪፌክስሎጂ አማካሪ',
        experience: '10+ ዓመት ስራ ልምድ',
        description: 'ከ10 ዓመት በላይ የሪፌክስሎጂ እና የሙሉ ፈውስ ስራ ልምድ ያለኝ ሲሆን ደንበኞች በጥንታዊ የእግር ሪፌክስሎጂ ስነ-ስርዓት በመርዳት ጥሩ ደህንነት እንዲያገኙ የተሰማራሁ ነኝ።'
      }
    },

    // Services
    services: {
      title: 'የእኛ አገልግሎቶች',
      subtitle: 'የተሰማሩ የሪፌክስሎጂ ሕክምናዎች የተሰማሩ ናቸው',
      categories: {
        relaxation: 'ዕረፍት',
        therapeutic: 'ሕክምና',
        premium: 'ፕሪሚየም',
        addon: 'ተጨማሪዎች'
      },
      booking: 'ያስያዙ',
      duration: 'ጊዜ',
      price: 'ዋጋ',
      benefits: 'ጥቅሞች',
      whatToExpect: 'ምን እንደሚጠብቁ',
      contraindications: 'መተው ያለባቸው ነገሮች'
    },

    // Booking
    booking: {
      title: 'የእርስዎ ክፍለ ጊዜ ያስያዙ',
      subtitle: 'የተሻለውን አገልግሎት እና ጊዜ ይምረጡ',
      selectService: 'አገልግሎት ይምረጡ',
      selectDate: 'ቀን ይምረጡ',
      selectTime: 'ጊዜ ይምረጡ',
      personalInfo: 'የግል መረጃ',
      healthForm: 'የጤና መረጃ',
      notes: 'ልዩ ጥያቄዎች',
      total: 'ጠቅላላ',
      bookNow: 'የመያያዣ ማረጋገጫ',
      confirmation: 'የመያያዣ ማረጋገጫ',
      success: 'የመያያዣዎ ተረጋግጧል!'
    },

    // Contact
    contact: {
      title: 'አድራሻ',
      subtitle: 'ከእኛ ጋር ያግኙ',
      address: 'አድራሻ',
      phone: 'ስልክ',
      email: 'ኢሜይል',
      hours: 'የስራ ሰዓቶች',
      message: 'መልእክት ይላኩልን',
      send: 'መልእክት ይላኩ',
      success: 'መልእክቱ በተሳካቸ ሁኔታ ተልኳል!'
    },

    // Common
    common: {
      loading: 'በመጫን ላይ...',
      error: 'የሆነ ነገር ተሳስቷል',
      success: 'ተሳክቷል!',
      cancel: 'ይሰርዙ',
      save: 'ያስቀምጡ',
      edit: 'ያርቱ',
      delete: 'ያስወግዱ',
      view: 'ይመልከቱ',
      close: 'ያዝዙ',
      next: 'ቀጣይ',
      previous: 'የቀድሞ',
      submit: 'ያስገቡ',
      reset: 'ዳግም ያስጀምሩ',
      search: 'ፈልግ',
      filter: 'ያጣሩ',
      sort: 'ያዘዝ',
      all: 'ሁሉም',
      none: 'ምንም',
      yes: 'አዎ',
      no: 'አይ',
      optional: 'አማራጭ',
      required: 'ያስፈልጋል',
      minutes: 'ደቂቃዎች',
      hours: 'ሰዓቶች',
      days: 'ቀናት',
      weeks: 'ሳምንታት',
      months: 'ወራት',
      years: 'ዓመታት',
      learnMore: 'የበለጠ ይወቁ'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key} for language: ${language}`);
        return key;
      }
    }
    
    return value || key;
  };

  const switchLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const value = {
    language,
    switchLanguage,
    t,
    translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 