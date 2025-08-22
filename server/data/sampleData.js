const sampleServices = [
  {
    name: "Relaxation Reflexology",
    nameAmharic: "የዕረፍት ሪፌክስሎጂ",
    description: "A gentle, soothing reflexology session designed to promote deep relaxation and stress relief.",
    descriptionAmharic: "ጥልቅ ዕረፍት እና ጫና መፍቻ የሚያጎላ የሚያረጋግጥ የሪፌክስሎጂ ክፍለ ጊዜ።",
    longDescription: "Our signature relaxation reflexology session combines ancient healing techniques with modern comfort. This 60-minute session focuses on gentle pressure application to reflex points that correspond to your entire body, promoting deep relaxation, improved circulation, and natural stress relief.",
    longDescriptionAmharic: "የእኛ የሚያረጋግጥ የዕረፍት ሪፌክስሎጂ ክፍለ ጊዜ የጥንት ፈውስ ቴክኒኮችን ከዘመናዊ አመቺነት ጋር ያጣምራል። ይህ 60-ደቂቃ ክፍለ ጊዜ በሰውነትዎ ሁሉ ላይ የሚዛመዱ ሪፌክስ ነጥቦች ላይ የሚደረገው የሚያረጋግጥ ጫና አተገባበር ለጥልቅ ዕረፍት፣ የደም ዝውውር ማሻሻያ እና ተፈጥሯዊ ጫና መፍቻ ያተኩራል።",
    category: "relaxation",
    duration: 60,
    price: 75,
    currency: "USD",
    benefits: [
      "Reduces stress and anxiety",
      "Improves blood circulation",
      "Promotes deep relaxation",
      "Enhances sleep quality",
      "Boosts energy levels"
    ],
    benefitsAmharic: [
      "ጫና እና ተስፋ መቁረጥ ያሻሽላል",
      "የደም ዝውውር ያሻሽላል",
      "ጥልቅ ዕረፍት ያጎላል",
      "የእንቅልፍ ጥራት ያሻሽላል",
      "የኃይል ደረጃዎች ያሳድጋል"
    ],
    whatToExpect: [
      "Comfortable reclining chair",
      "Gentle foot cleansing",
      "Relaxing atmosphere with soft music",
      "Professional pressure application",
      "Post-session consultation"
    ],
    whatToExpectAmharic: [
      "አመቺ የደጋግማ መጋረጃ",
      "የሚያረጋግጥ የእግር ማጽዳት",
      "ከሚያረጋግጥ ሙዚቃ ጋር የሚያረጋግጥ አካባቢ",
      "የስራ ልምድ ያለው ጫና አተገባበር",
      "የክፍለ ጊዜ በኋላ ውይይት"
    ],
    contraindications: [
      "Pregnancy (first trimester)",
      "Deep vein thrombosis",
      "Recent foot surgery",
      "Open wounds on feet"
    ],
    contraindicationsAmharic: [
      "የጉልምስና (የመጀመሪያ ሶስት ወር)",
      "ጥልቅ የደም ቧንቧ መደበኛ ማደጋገም",
      "የቅርብ ጊዜ የእግር ቀዶ ሕክምና",
      "በእግሮች ላይ የተከፈቱ ስቃዮች"
    ],
    images: [
      {
        url: "/images/services/relaxation-reflexology-1.jpg",
        alt: "Relaxation Reflexology Session",
        caption: "Gentle pressure application for deep relaxation",
        isPrimary: true
      },
      {
        url: "/images/services/relaxation-reflexology-2.jpg",
        alt: "Comfortable Treatment Room",
        caption: "Our serene treatment environment"
      }
    ],
    isPopular: true,
    isFeatured: true,
    sortOrder: 1,
    maxBookingsPerDay: 8,
    requiresConsultation: false,
    tags: ["relaxation", "stress-relief", "wellness", "beginner-friendly"],
    seo: {
      title: "Relaxation Reflexology - Stress Relief & Deep Relaxation",
      description: "Experience gentle reflexology for deep relaxation and stress relief. Book your 60-minute session today.",
      keywords: ["relaxation reflexology", "stress relief", "foot massage", "wellness"]
    }
  },
  {
    name: "Deep Tissue Foot Work",
    nameAmharic: "ጥልቅ ስፖንጅ የእግር ስራ",
    description: "Intensive reflexology treatment targeting deep-seated tension and chronic foot issues.",
    descriptionAmharic: "ጥልቅ የተቀመጠ ጫና እና የቆዩ የእግር ችግሮችን የሚያተኩር ጥብቅ የሪፌክስሎጂ ሕክምና።",
    longDescription: "Our deep tissue foot work session is designed for those seeking more intensive treatment. This 90-minute session uses stronger pressure techniques to address chronic tension, muscle knots, and deep-seated foot issues. Perfect for those with high stress levels or chronic foot discomfort.",
    longDescriptionAmharic: "የእኛ ጥልቅ ስፖንጅ የእግር ስራ ክፍለ ጊዜ የበለጠ ጥብቅ ሕክምና ለሚፈልጉ ሰዎች የተዘጋጀ ነው። ይህ 90-ደቂቃ ክፍለ ጊዜ የቆዩ ጫናዎችን፣ የጡንቻ መጠን እና ጥልቅ የተቀመጡ የእግር ችግሮችን ለመፍታት የበለጠ ጥብቅ የጫና ቴክኒኮችን ይጠቀማል። ለጥብቅ ጫና ወይም የቆዩ የእግር አለመመችነት ላላቸው ሰዎች ፍጹም ነው።",
    category: "therapeutic",
    duration: 90,
    price: 95,
    currency: "USD",
    benefits: [
      "Releases deep-seated tension",
      "Improves muscle flexibility",
      "Reduces chronic foot pain",
      "Enhances circulation",
      "Promotes healing"
    ],
    benefitsAmharic: [
      "ጥልቅ የተቀመጠ ጫና ያስወግዳል",
      "የጡንቻ ተስማሚነት ያሻሽላል",
      "የቆዩ የእግር ህመም ያሻሽላል",
      "የደም ዝውውር ያሻሽላል",
      "ፈውስ ያጎላል"
    ],
    whatToExpect: [
      "Comprehensive foot assessment",
      "Intensive pressure techniques",
      "Targeted problem area focus",
      "Post-treatment recommendations",
      "Follow-up care instructions"
    ],
    whatToExpectAmharic: [
      "ሁለገብ የእግር ግምገማ",
      "ጥብቅ የጫና ቴክኒኮች",
      "የተወሰኑ ችግር አካባቢዎች ላይ ያተኩራል",
      "የሕክምና በኋላ ምክሮች",
      "የተከታተል እንክብካቤ መመሪያዎች"
    ],
    contraindications: [
      "Pregnancy",
      "Recent foot injury",
      "Severe foot conditions",
      "Blood clotting disorders"
    ],
    contraindicationsAmharic: [
      "የጉልምስና",
      "የቅርብ ጊዜ የእግር ጉድለት",
      "ጥብቅ የእግር ሁኔታዎች",
      "የደም መደበኛ ማደጋገም ችግሮች"
    ],
    images: [
      {
        url: "/images/services/deep-tissue-foot-work-1.jpg",
        alt: "Deep Tissue Foot Work",
        caption: "Intensive pressure application for deep-seated issues",
        isPrimary: true
      }
    ],
    isPopular: false,
    isFeatured: true,
    sortOrder: 2,
    maxBookingsPerDay: 6,
    requiresConsultation: true,
    tags: ["deep-tissue", "therapeutic", "chronic-pain", "intensive"],
    seo: {
      title: "Deep Tissue Foot Work - Intensive Reflexology Treatment",
      description: "Intensive reflexology treatment for chronic tension and foot issues. 90-minute deep tissue session.",
      keywords: ["deep tissue reflexology", "chronic pain", "foot therapy", "intensive treatment"]
    }
  },
  {
    name: "Meridian-Focused Healing",
    nameAmharic: "የመሪዲያን ያተኩረ ፈውስ",
    description: "Traditional Chinese Medicine-based reflexology targeting energy meridians for holistic healing.",
    descriptionAmharic: "የተፈጥሯዊ የቻይና ሕክምና ላይ የተመሰረተ የኃይል መሪዲያኖችን የሚያተኩር ሙሉ ፈውስ ሪፌክስሎጂ።",
    longDescription: "Based on Traditional Chinese Medicine principles, this session focuses on the body's energy meridians through reflexology. By stimulating specific reflex points that correspond to energy pathways, this treatment promotes balance, vitality, and natural healing throughout the body.",
    longDescriptionAmharic: "በተፈጥሯዊ የቻይና ሕክምና መርሆዎች ላይ የተመሰረተ፣ ይህ ክፍለ ጊዜ በሪፌክስሎጂ በኩል የሰውነት ኃይል መሪዲያኖች ላይ ያተኩራል። ከኃይል መንገዶች ጋር የሚዛመዱ የተወሰኑ ሪፌክስ ነጥቦችን በማነቃቃት፣ ይህ ሕክምና በሰውነት ሁሉ ላይ ሚዛን፣ ኃይል እና ተፈጥሯዊ ፈውስ ያጎላል።",
    category: "premium",
    duration: 120,
    price: 125,
    currency: "USD",
    benefits: [
      "Balances energy flow",
      "Enhances vitality",
      "Promotes natural healing",
      "Improves overall wellness",
      "Supports immune system"
    ],
    benefitsAmharic: [
      "የኃይል ዝውውር ያመጣጣማል",
      "ኃይል ያሳድጋል",
      "ተፈጥሯዊ ፈውስ ያጎላል",
      "አጠቃላይ ደህንነት ያሻሽላል",
      "የመከላከያ ስርዓት ያጎላል"
    ],
    whatToExpect: [
      "Energy meridian assessment",
      "Traditional Chinese Medicine principles",
      "Comprehensive reflexology treatment",
      "Energy balancing techniques",
      "Holistic wellness consultation"
    ],
    whatToExpectAmharic: [
      "የኃይል መሪዲያን ግምገማ",
      "የተፈጥሯዊ የቻይና ሕክምና መርሆዎች",
      "ሁለገብ የሪፌክስሎጂ ሕክምና",
      "የኃይል ሚዛን ቴክኒኮች",
      "ሙሉ ደህንነት ውይይት"
    ],
    contraindications: [
      "Pregnancy",
      "Severe medical conditions",
      "Recent surgery",
      "Energy sensitivity"
    ],
    contraindicationsAmharic: [
      "የጉልምስና",
      "ጥብቅ የሕክምና ሁኔታዎች",
      "የቅርብ ጊዜ ቀዶ ሕክምና",
      "የኃይል ስሜታዊነት"
    ],
    images: [
      {
        url: "/images/services/meridian-healing-1.jpg",
        alt: "Meridian-Focused Healing",
        caption: "Traditional Chinese Medicine-based reflexology",
        isPrimary: true
      }
    ],
    isPopular: false,
    isFeatured: false,
    sortOrder: 3,
    maxBookingsPerDay: 4,
    requiresConsultation: true,
    tags: ["tcm", "energy-healing", "holistic", "premium", "traditional"],
    seo: {
      title: "Meridian-Focused Healing - Traditional Chinese Medicine Reflexology",
      description: "Traditional Chinese Medicine-based reflexology for energy balance and holistic healing. 120-minute premium session.",
      keywords: ["meridian healing", "TCM reflexology", "energy balance", "holistic healing", "traditional medicine"]
    }
  }
];

const sampleTestimonials = [
  {
    clientName: "Sarah Johnson",
    clientNameAmharic: "ሳራ ጆንሰን",
    rating: 5,
    service: "Relaxation Reflexology",
    content: "I've been coming to Nafis Reflexology for over a year now, and it's been life-changing. The relaxation sessions help me manage my stress levels, and I always leave feeling completely renewed. The atmosphere is so peaceful, and the staff is incredibly professional.",
    contentAmharic: "ከአንድ ዓመት በላይ ወደ ናፊስ ሪፌክስሎጂ እየመጣሁ ነው፣ እና የሕይወት ለውጥ ነው። የዕረፍት ክፍለ ጊዜዎች የጫና ደረጃዎቼን እንድያስተውል ያግዙኛል፣ እና ሁልጊዜ ሙሉ በሙሉ እንደ አዲስ እራሴ እሸማለሁ። አካባቢው በጣም የሚያረጋግጥ ነው፣ እና ሰራተኞቹ በጣም የስራ ልምድ ያላቸው ናቸው።",
    image: "/images/testimonials/sarah-johnson.jpg",
    isFeatured: true,
    verified: true
  },
  {
    clientName: "Michael Chen",
    clientNameAmharic: "ማይክል ቼን",
    rating: 5,
    service: "Deep Tissue Foot Work",
    content: "After struggling with chronic foot pain for months, the deep tissue session at Nafis Reflexology provided incredible relief. The therapist was knowledgeable and took the time to understand my specific issues. I highly recommend their therapeutic services.",
    contentAmharic: "ለሁለት ወራት የቆዩ የእግር ህመም ካለብኝ በኋላ፣ በናፊስ ሪፌክስሎጂ ያለው ጥልቅ ስፖንጅ ክፍለ ጊዜ አስደናቂ መፍቻ አስገኝልኝ። አማካሪው ዕውቀት ነበረው እና የተወሰኑ ችግሮቼን ለመረዳት ጊዜ ወስዶ ነበር። የሕክምና አገልግሎቶቻቸውን በጣም እመክራለሁ።",
    image: "/images/testimonials/michael-chen.jpg",
    isFeatured: true,
    verified: true
  },
  {
    clientName: "Aisha Patel",
    clientNameAmharic: "አይሻ ፓተል",
    rating: 5,
    service: "Meridian-Focused Healing",
    content: "The meridian-focused session was unlike anything I've experienced before. It's amazing how connected our feet are to our entire body. I felt a sense of balance and energy I haven't felt in years. This is truly holistic healing at its best.",
    contentAmharic: "የመሪዲያን ያተኩረ ክፍለ ጊዜ ከዚህ በፊት ከሰማሁት ሁሉ የተለየ ነበር። እግሮቻችን ከሰውነታችን ሁሉ ጋር እንዴት እንደተገናኙ አስደናቂ ነው። ለዓመታት ያልሰማሁት የሚዛን እና ኃይል ስሜት ነበረኝ። ይህ በእውነት በጣም የሚያሻ ሙሉ ፈውስ ነው።",
    image: "/images/testimonials/aisha-patel.jpg",
    isFeatured: false,
    verified: true
  }
];

const sampleFAQs = [
  {
    question: "What is reflexology and how does it work?",
    questionAmharic: "ሪፌክስሎጂ ምንድን ነው እና እንዴት ይሰራል?",
    answer: "Reflexology is a natural healing art based on the principle that there are reflexes in the feet, hands, and ears that correspond to every part, gland, and organ of the body. Through application of pressure on these reflexes, reflexology relieves tension, improves circulation, and helps promote the natural function of the related areas of the body.",
    answerAmharic: "ሪፌክስሎጂ በእግሮች፣ እጆች እና ጆሮዎች ውስጥ ያሉ ሪፌክሶች ከሰውነት እያንዳንዱ ክፍል፣ እጢ እና ድምጽ ጋር የሚዛመዱ መርሆ ላይ የተመሰረተ ተፈጥሯዊ ፈውስ ስነ-ስርዓት ነው። በእነዚህ ሪፌክሶች ላይ ጫና በመጫን ሪፌክስሎጂ ጫና ያስወግዳል፣ የደም ዝውውር ያሻሽላል እና የተዛመዱ የሰውነት ክፍሎች ተፈጥሯዊ ስራ እንዲያደግ ያግዛል።",
    category: "general",
    isFeatured: true
  },
  {
    question: "Does reflexology hurt?",
    questionAmharic: "ሪፌክስሎጂ ህመም ያስከትላል?",
    answer: "Reflexology should not be painful. While you may feel some pressure or sensitivity in certain areas, it should be comfortable and relaxing. Our therapists are trained to adjust pressure based on your comfort level. If you experience any discomfort, please let your therapist know immediately.",
    answerAmharic: "ሪፌክስሎጂ ህመም ሊያስከትል አይገባም። በተወሰኑ አካባቢዎች የተወሰነ ጫና ወይም ስሜታዊነት ሊሰማዎ ቢችልም፣ አመቺ እና የሚያረጋግጥ መሆን አለበት። አማካሪዎቻችን በአመቺነትዎ መጠን ጫና እንዲስተካከሉ ተሰለፍተዋል። ማንኛውም አለመመችነት ካሰማዎ እባክዎ አማካሪዎን ወዲያውኑ ያሳውቁ።",
    category: "treatment",
    isFeatured: true
  },
  {
    question: "How many sessions do I need?",
    questionAmharic: "ስንት ክፍለ ጊዜ ያስፈልገኛል?",
    answer: "The number of sessions varies depending on your individual needs and goals. For general wellness and stress relief, many clients find benefit from weekly or bi-weekly sessions. For specific health concerns, we recommend a consultation to create a personalized treatment plan. Some clients enjoy regular sessions for ongoing wellness maintenance.",
    answerAmharic: "የክፍለ ጊዜዎች ቁጥር በግል ፍላጎቶችዎ እና ግቦችዎ ላይ የተመሰረተ ነው። ለአጠቃላይ ደህንነት እና ጫና መፍቻ፣ ብዙ ደንበኞች ከወርሃዊ ወይም ከሁለት ሳምንት ክፍለ ጊዜዎች ጥቅም ያገኛሉ። ለተወሰኑ የጤና ችግሮች፣ የግል ሕክምና እቅድ ለመፍጠር ውይይት እንመክራለን። አንዳንድ ደንበኞች ለቀጣይ ደህንነት ጥበቃ የተለመዱ ክፍለ ጊዜዎችን ይወዳሉ።",
    category: "treatment",
    isFeatured: false
  }
];

module.exports = {
  sampleServices,
  sampleTestimonials,
  sampleFAQs
}; 