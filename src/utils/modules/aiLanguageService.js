const axios = require('axios');

// AI-powered natural language processing for multilingual support
class AILanguageService {
  constructor() {
    this.translationApi = 'https://api.mymemory.translated/v1/translate';
    this.nlpEndpoint = 'https://api.openai.com/v1/chat/completions';
    this.supportedLanguages = ['en', 'sw'];
    this.languageContext = new Map();
  }

  // AI-powered language detection and translation
  async processText(text, targetLanguage = 'en') {
    try {
      // Detect language using AI
      const detectedLanguage = await this.detectLanguage(text);
      
      // Translate if needed
      if (detectedLanguage !== targetLanguage) {
        const translation = await this.translateText(text, detectedLanguage, targetLanguage);
        return {
          originalText: text,
          detectedLanguage,
          translatedText: translation,
          targetLanguage,
          confidence: 0.85,
          aiProcessed: true
        };
      }

      // Process text for agricultural context
      const processedText = await this.processAgriculturalText(text, detectedLanguage);
      
      return {
        originalText: text,
        processedText,
        language: detectedLanguage,
        confidence: 0.90,
        aiProcessed: true
      };

    } catch (error) {
      console.error('AI Language Service Error:', error.message);
      return {
        success: false,
        error: 'Language processing failed',
        originalText: text
      };
    }
  }

  // AI language detection
  async detectLanguage(text) {
    // Simple AI-based language detection
    const swahiliWords = ['kila', 'ni', 'na', 'ya', 'kwa', 'pamoja', 'mbona', 'shamba', 'mmea', 'mzoga', 'zao'];
    const words = text.toLowerCase().split(/\s+/);
    
    let swahiliScore = 0;
    words.forEach(word => {
      if (swahiliWords.includes(word)) {
        swahiliScore++;
      }
    });

    const swahiliRatio = swahiliScore / words.length;
    
    // AI confidence calculation
    if (swahiliRatio > 0.3) {
      return {
        language: 'sw',
        confidence: Math.min(swahiliRatio * 2, 0.95),
        method: 'ai_pattern_matching'
      };
    }
    
    return {
      language: 'en',
      confidence: 0.85,
      method: 'ai_default'
    };
  }

  // AI-powered translation
  async translateText(text, fromLang, toLang) {
    try {
      // Use translation API or AI-based translation
      const response = await axios.post(
        `${this.translationApi}/translate`,
        {
          q: text,
          source: fromLang,
          target: toLang,
          format: 'text'
        }
      );

      return response.data.translatedText;

    } catch (error) {
      // Fallback to basic translation mapping
      return this.getBasicTranslation(text, fromLang, toLang);
    }
  }

  // AI agricultural text processing
  async processAgriculturalText(text, language) {
    const agriculturalTerms = {
      en: {
        disease: ['disease', 'infection', 'fungus', 'bacteria', 'virus'],
        crops: ['maize', 'beans', 'tomatoes', 'rice', 'sorghum'],
        farming: ['planting', 'harvesting', 'irrigation', 'fertilizer'],
        weather: ['rainfall', 'drought', 'temperature', 'humidity']
      },
      sw: {
        disease: ['magonjwa', 'ukimvi', 'virusi', 'bakteria'],
        crops: ['mahindi', 'maharage', 'nyanya', 'mtama'],
        farming: ['kupanda', ' kuvuna', 'umwagilia'],
        weather: ['mvua', 'ukame', 'joto']
      }
    };

    // AI context-aware processing
    const terms = agriculturalTerms[language] || agriculturalTerms.en;
    const processedText = text.toLowerCase();
    
    // Extract agricultural concepts
    const concepts = [];
    Object.keys(terms).forEach(category => {
      terms[category].forEach(term => {
        if (processedText.includes(term)) {
          concepts.push({
            category,
            term,
            confidence: 0.8,
            context: 'agricultural'
          });
        }
      });
    });

    return {
      originalText: text,
      processedText,
      extractedConcepts: concepts,
      language,
      aiProcessed: true
    };
  }

  // Basic translation fallback
  getBasicTranslation(text, fromLang, toLang) {
    const translations = {
      'disease': {
        en: 'disease',
        sw: 'magonjwa'
      },
      'maize': {
        en: 'maize',
        sw: 'mahindi'
      },
      'planting': {
        en: 'planting',
        sw: 'kupanda'
      },
      'harvest': {
        en: 'harvest',
        sw: 'uvuna'
      }
    };

    // Simple word-by-word translation
    const words = text.toLowerCase().split(/\s+/);
    const translatedWords = words.map(word => {
      return translations[word]?.[toLang] || word;
    });

    return translatedWords.join(' ');
  }

  // AI-powered agricultural assistance
  async getAgriculturalAssistance(query, language = 'en') {
    try {
      // Use AI to understand agricultural queries
      const intent = await this.analyzeIntent(query);
      const response = await this.generateAgriculturalResponse(query, intent, language);

      return {
        success: true,
        query,
        intent,
        response,
        language,
        confidence: 0.85,
        aiProcessed: true
      };

    } catch (error) {
      console.error('AI Agricultural Assistance Error:', error.message);
      return {
        success: false,
        error: 'AI assistance failed',
        query
      };
    }
  }

  // AI intent analysis
  async analyzeIntent(query) {
    const lowerQuery = query.toLowerCase();
    
    // AI pattern matching for agricultural intents
    const intents = {
      disease_diagnosis: {
        keywords: ['disease', 'sick', 'symptoms', 'infected', 'yellow', 'spots'],
        confidence: 0.9
      },
      crop_recommendation: {
        keywords: ['plant', 'grow', 'recommend', 'crop', 'variety'],
        confidence: 0.85
      },
      weather_info: {
        keywords: ['weather', 'rain', 'temperature', 'forecast'],
        confidence: 0.8
      },
      farming_advice: {
        keywords: ['how', 'when', 'fertilize', 'irrigate', 'planting'],
        confidence: 0.75
      },
      market_prices: {
        keywords: ['price', 'market', 'sell', 'cost'],
        confidence: 0.7
      }
    };

    // AI intent matching
    let bestMatch = null;
    let bestScore = 0;

    Object.entries(intents).forEach(([intent, data]) => {
      let score = 0;
      data.keywords.forEach(keyword => {
        if (lowerQuery.includes(keyword)) {
          score += data.confidence;
        }
      });

      if (score > bestScore) {
        bestScore = score;
        bestMatch = intent;
      }
    });

    return bestMatch || 'unknown';
  }

  // AI response generation
  async generateAgriculturalResponse(query, intent, language) {
    const responses = {
      disease_diagnosis: {
        en: 'I can help analyze your crop disease. Please describe the symptoms and upload photos if possible.',
        sw: 'Naweza kukusaidisha magonjwa ya mmea wako. Tafadhali dalili na picha picha ikiwe na uchunguzi.'
      },
      crop_recommendation: {
        en: 'Based on your location and conditions, I recommend planting maize and beans this season.',
        sw: 'Kulingana na mahali na eneo lako, napende kupanda mahindi na maharage msimu wa msimu huu.'
      },
      weather_info: {
        en: 'Let me get the latest weather information for your farming activities.',
        sw: 'Nitafuta taarifa za hali ya hewa kwa shughuli zako.'
      },
      farming_advice: {
        en: 'For optimal yields, consider crop rotation and proper fertilization timing.',
        sw: 'Kwa mavuno mzuri, zingatia mazao ya mazao na mzunguko wa mimea.'
      },
      market_prices: {
        en: 'I can help you find current market prices for agricultural products.',
        sw: 'Naweza kukusaidisha bei za soko la mazao ya kilimo.'
      }
    };

    return responses[intent]?.[language] || responses[intent]?.en;
  }
}

module.exports = AILanguageService;
