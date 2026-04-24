// Language support service for English and Swahili
class LanguageService {
  constructor() {
    this.translations = {
      // Common agricultural terms
      'en': {
        // General
        'welcome': 'Welcome to Agrimind',
        'select_language': 'Select Language',
        'english': 'English',
        'swahili': 'Swahili',
        'back': 'Back',
        'next': 'Next',
        'submit': 'Submit',
        'cancel': 'Cancel',
        'save': 'Save',
        'loading': 'Loading...',
        'error': 'Error',
        'success': 'Success',
        
        // Navigation
        'home': 'Home',
        'diagnosis': 'Disease Diagnosis',
        'advisory': 'Farming Advisory',
        'recommendations': 'Crop Recommendations',
        'weather': 'Weather',
        
        // Forms
        'name': 'Name',
        'location': 'Location',
        'crop_type': 'Crop Type',
        'description': 'Description',
        'upload_image': 'Upload Image',
        'take_photo': 'Take Photo',
        
        // Crops
        'maize': 'Maize',
        'tomatoes': 'Tomatoes',
        'beans': 'Beans',
        'cassava': 'Cassava',
        'rice': 'Rice',
        'onions': 'Onions',
        'sorghum': 'Sorghum',
        'millet': 'Millet',
        
        // Growth stages
        'planting': 'Planting',
        'growing': 'Growing',
        'harvesting': 'Harvesting',
        
        // Issues
        'pests': 'Pests',
        'diseases': 'Diseases',
        'water': 'Water Issues',
        'nutrients': 'Nutrient Issues',
        
        // Results
        'problem': 'Problem',
        'causes': 'Causes',
        'solutions': 'Solutions',
        'prevention': 'Prevention',
        'recommendations': 'Recommendations',
        
        // Weather
        'temperature': 'Temperature',
        'humidity': 'Humidity',
        'rainfall': 'Rainfall',
        'wind': 'Wind',
        'forecast': 'Forecast'
      },
      'sw': {
        // General
        'welcome': 'Karibu Agrimind',
        'select_language': 'Chagua Lugha',
        'english': 'Kiingereza',
        'swahili': 'Kiswahili',
        'back': 'Rudi',
        'next': 'Endelea',
        'submit': 'Tuma',
        'cancel': 'Ghairi',
        'save': 'Hifadhi',
        'loading': 'Inapakia...',
        'error': 'Kosa',
        'success': 'Mafanikio',
        
        // Navigation
        'home': 'Nyumbani',
        'diagnosis': 'Utambuzi wa Ugonjwa',
        'advisory': 'Ushauri wa Kilimo',
        'recommendations': 'Mapendekezo ya Mazao',
        'weather': 'Hali ya Hewa',
        
        // Forms
        'name': 'Jina',
        'location': 'Eneo',
        'crop_type': 'Aina ya Mmea',
        'description': 'Maelezo',
        'upload_image': 'Pakia Picha',
        'take_photo': 'Piga Picha',
        
        // Crops
        'maize': 'Mahindi',
        'tomatoes': 'Nyanya',
        'beans': 'Maharage',
        'cassava': 'Muhogo',
        'rice': 'Mchele',
        'onions': 'Kitunguu',
        'sorghum': 'Mawele',
        'millet': 'Uwele',
        
        // Growth stages
        'planting': 'Upandaji',
        'growing': 'Ukuaji',
        'harvesting': 'Uvunaji',
        
        // Issues
        'pests': 'Wadudu',
        'diseases': 'Magonjwa',
        'water': 'Matatizo ya Maji',
        'nutrients': 'Matatizo ya Lishe',
        
        // Results
        'problem': 'Tatizo',
        'causes': 'Sababu',
        'solutions': 'Machaguo',
        'prevention': 'Kuzuia',
        'recommendations': 'Mapendekezo',
        
        // Weather
        'temperature': 'Joto',
        'humidity': 'Unyevu',
        'rainfall': 'Mvua',
        'wind': 'Upepo',
        'forecast': 'Ramani'
      }
    };

    // Comprehensive agricultural dictionary
    this.agriculturalTerms = {
      'en': {
        // Disease symptoms
        'yellow leaves': 'yellow leaves',
        'brown spots': 'brown spots',
        'wilting': 'wilting',
        'stunted growth': 'stunted growth',
        'leaf curling': 'leaf curling',
        'powdery mildew': 'powdery mildew',
        'rot': 'rot',
        'blight': 'blight',
        
        // Treatment methods
        'fertilizer': 'fertilizer',
        'pesticide': 'pesticide',
        'fungicide': 'fungicide',
        'herbicide': 'herbicide',
        'insecticide': 'insecticide',
        'organic': 'organic',
        'chemical': 'chemical',
        'natural': 'natural',
        
        // Farming practices
        'irrigation': 'irrigation',
        'mulching': 'mulching',
        'crop rotation': 'crop rotation',
        'intercropping': 'intercropping',
        'composting': 'composting',
        'tillage': 'tillage',
        'planting': 'planting',
        'harvesting': 'harvesting',
        'weeding': 'weeding',
        'pruning': 'pruning',
        
        // Soil terms
        'soil pH': 'soil pH',
        'soil moisture': 'soil moisture',
        'drainage': 'drainage',
        'fertility': 'fertility',
        'organic matter': 'organic matter',
        'nutrients': 'nutrients',
        'nitrogen': 'nitrogen',
        'phosphorus': 'phosphorus',
        'potassium': 'potassium',
        
        // Weather terms
        'drought': 'drought',
        'flood': 'flood',
        'humidity': 'humidity',
        'temperature': 'temperature',
        'rainfall': 'rainfall',
        'season': 'season',
        'climate': 'climate',
        'weather': 'weather',
        
        // Common phrases
        'apply': 'apply',
        'treat': 'treat',
        'monitor': 'monitor',
        'prevent': 'prevent',
        'control': 'control',
        'manage': 'manage',
        'protect': 'protect',
        'improve': 'improve',
        'increase': 'increase',
        'reduce': 'reduce',
        'avoid': 'avoid',
        'ensure': 'ensure',
        'check': 'check',
        'test': 'test',
        'measure': 'measure',
        'observe': 'observe',
        'identify': 'identify',
        'diagnose': 'diagnose',
        'recommend': 'recommend',
        'suggest': 'suggest'
      },
      'sw': {
        // Disease symptoms
        'yellow leaves': 'majani manjano',
        'brown spots': 'makovu ya kahawia',
        'wilting': 'kunyauka',
        'stunted growth': 'ukuaji duni',
        'leaf curling': 'kujirudia majani',
        'powdery mildew': 'vunza unga',
        'rot': 'uo',
        'blight': 'mdudu',
        
        // Treatment methods
        'fertilizer': 'mbolea',
        'pesticide': 'dawa ya wadudu',
        'fungicide': 'dawa ya vuhi',
        'herbicide': 'dawa ya majani',
        'insecticide': 'dawa ya wadudu',
        'organic': 'kikaboni',
        'chemical': 'kemikali',
        'natural': 'asilia',
        
        // Farming practices
        'irrigation': 'umwagiliaji',
        'mulching': 'ulinzi wa ardhi',
        'crop rotation': 'mzunguko wa mazao',
        'intercropping': 'kilimo cha mseto',
        'composting': 'kutengeneza komposti',
        'tillage': 'kulima',
        'planting': 'kupanda',
        'harvesting': ' kuvuna',
        'weeding': 'kupondapondaa',
        'pruning': 'ukataji',
        
        // Soil terms
        'soil pH': 'pH ya udongo',
        'soil moisture': 'unyevu wa udongo',
        'drainage': 'mifereji',
        'fertility': 'uthiri',
        'organic matter': 'vitu vya kikaboni',
        'nutrients': 'lishe',
        'nitrogen': 'nitrojeni',
        'phosphorus': 'fosforasi',
        'potassium': 'potasiamu',
        
        // Weather terms
        'drought': 'ukame',
        'flood': 'mafuriko',
        'humidity': 'unyevu',
        'temperature': 'joto',
        'rainfall': 'mvua',
        'season': 'msimu',
        'climate': 'tabianchi',
        'weather': 'hali ya hewa',
        
        // Common phrases
        'apply': 'tumia',
        'treat': 'tibu',
        'monitor': 'scrini',
        'prevent': 'zuia',
        'control': 'dhibiti',
        'manage': 'simamia',
        'protect': 'linda',
        'improve': 'boresha',
        'increase': 'ongeza',
        'reduce': 'punguza',
        'avoid': 'epuka',
        'ensure': 'hakikisha',
        'check': 'angalia',
        'test': 'jaribu',
        'measure': 'pima',
        'observe': 'tazama',
        'identify': 'tambua',
        'diagnose': 'tambua tatizo',
        'recommend': 'pendekeza',
        'suggest': 'shauri'
      }
    };
  }

  translate(text, targetLanguage) {
    if (!text || !targetLanguage) return text;
    
    // First check exact matches in translations
    if (this.translations[targetLanguage] && this.translations[targetLanguage][text.toLowerCase()]) {
      return this.translations[targetLanguage][text.toLowerCase()];
    }
    
    // Check agricultural terms
    if (this.agriculturalTerms[targetLanguage] && this.agriculturalTerms[targetLanguage][text.toLowerCase()]) {
      return this.agriculturalTerms[targetLanguage][text.toLowerCase()];
    }
    
    // Try partial matching for phrases
    return this.translatePartial(text, targetLanguage);
  }

  translatePartial(text, targetLanguage) {
    const sourceTerms = targetLanguage === 'sw' ? this.agriculturalTerms['en'] : this.agriculturalTerms['sw'];
    const targetTerms = this.agriculturalTerms[targetLanguage];
    
    let translated = text;
    
    // Sort terms by length (longest first) to avoid partial replacements
    const sortedTerms = Object.keys(sourceTerms).sort((a, b) => b.length - a.length);
    
    for (const term of sortedTerms) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      if (regex.test(translated)) {
        translated = translated.replace(regex, targetTerms[term] || term);
      }
    }
    
    return translated;
  }

  translateObject(obj, targetLanguage) {
    if (typeof obj !== 'object' || obj === null) {
      return this.translate(obj, targetLanguage);
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.translateObject(item, targetLanguage));
    }

    const translated = {};
    for (const [key, value] of Object.entries(obj)) {
      translated[key] = this.translateObject(value, targetLanguage);
    }
    return translated;
  }

  detectLanguage(text) {
    // Simple language detection based on common Swahili words
    const swahiliWords = ['na', 'ya', 'kwa', 'ni', 'katika', 'kwamba', 'hii', 'hiyo', 'wetu', 'lako', 'zake', 'vya', 'wa', 'za', 'la', 'li', 'ya', 'kuwa', 'kama', 'sio', 'hata'];
    
    const words = text.toLowerCase().split(/\s+/);
    const swahiliCount = words.filter(word => swahiliWords.includes(word)).length;
    
    if (swahiliCount > words.length * 0.1) { // If more than 10% are Swahili words
      return 'sw';
    }
    
    return 'en'; // Default to English
  }

  getSupportedLanguages() {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' }
    ];
  }

  formatMessage(template, language, variables = {}) {
    const translatedTemplate = this.translate(template, language);
    
    let message = translatedTemplate;
    for (const [key, value] of Object.entries(variables)) {
      message = message.replace(new RegExp(`{${key}}`, 'g'), value);
    }
    
    return message;
  }

  // Get localized crop names
  getCropNames(language) {
    const crops = {
      'en': {
        'maize': 'Maize',
        'tomatoes': 'Tomatoes',
        'beans': 'Beans',
        'cassava': 'Cassava',
        'rice': 'Rice',
        'onions': 'Onions',
        'sorghum': 'Sorghum',
        'millet': 'Millet'
      },
      'sw': {
        'maize': 'Mahindi',
        'tomatoes': 'Nyanya',
        'beans': 'Maharage',
        'cassava': 'Muhogo',
        'rice': 'Mchele',
        'onions': 'Kitunguu',
        'sorghum': 'Mawele',
        'millet': 'Uwele'
      }
    };
    
    return crops[language] || crops['en'];
  }

  // Get localized region names
  getRegionNames(language) {
    const regions = {
      'en': {
        'arusha': 'Arusha',
        'dar_es_salaam': 'Dar es Salaam',
        'dodoma': 'Dodoma',
        'iringa': 'Iringa',
        'kilimanjaro': 'Kilimanjaro',
        'mbeya': 'Mbeya',
        'morogoro': 'Morogoro',
        'mwanza': 'Mwanza',
        'tanga': 'Tanga',
        'zanzibar': 'Zanzibar'
      },
      'sw': {
        'arusha': 'Arusha',
        'dar_es_salaam': 'Dar es Salaam',
        'dodoma': 'Dodoma',
        'iringa': 'Iringa',
        'kilimanjaro': 'Kilimanjaro',
        'mbeya': 'Mbeya',
        'morogoro': 'Morogoro',
        'mwanza': 'Mwanza',
        'tanga': 'Tanga',
        'zanzibar': 'Zanzibar'
      }
    };
    
    return regions[language] || regions['en'];
  }

  // Get localized issue types
  getIssueTypes(language) {
    const issues = {
      'en': {
        'pests': 'Pest Problems',
        'diseases': 'Disease Issues',
        'water': 'Water Management',
        'nutrients': 'Nutrient Deficiency',
        'general': 'General Advice'
      },
      'sw': {
        'pests': 'Matatizo ya Wadudu',
        'diseases': 'Matatizo ya Magonjwa',
        'water': 'Usimamaji wa Maji',
        'nutrients': 'Upungufu wa Lishe',
        'general': 'Ushauri Mkuu'
      }
    };
    
    return issues[language] || issues['en'];
  }
}

module.exports = new LanguageService();
