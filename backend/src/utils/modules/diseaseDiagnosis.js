const fs = require('fs');
const path = require('path');

// Disease database for Tanzanian crops
const diseaseDatabase = {
  maize: {
    'Maize Leaf Blight': {
      symptoms: ['long, rectangular lesions on leaves', 'grayish centers', 'yellow halos', 'spreads rapidly in humid conditions'],
      causes: ['fungal infection (Exserohilum turcicum)', 'high humidity', 'poor air circulation'],
      treatments: [
        { type: 'organic', description: 'Apply neem oil spray (2 tablespoons neem oil + 1 gallon water + soap)' },
        { type: 'chemical', description: 'Apply fungicide containing mancozeb or chlorothalonil' },
        { type: 'cultural', description: 'Remove infected leaves, improve spacing, avoid overhead watering' }
      ],
      prevention: ['crop rotation', 'resistant varieties', 'proper spacing', 'balanced fertilization']
    },
    'Maize Streak Virus': {
      symptoms: ['yellow streaks on leaves', 'stunted growth', 'reduced yield', 'chlorotic patterns'],
      causes: ['viral infection transmitted by leafhoppers', 'infected seed', 'warm weather'],
      treatments: [
        { type: 'cultural', description: 'Remove and destroy infected plants immediately' },
        { type: 'chemical', description: 'Control leafhoppers with appropriate insecticides' },
        { type: 'organic', description: 'Use reflective mulches to deter leafhoppers' }
      ],
      prevention: ['use certified disease-free seeds', 'control leafhoppers', 'early planting']
    },
    'Northern Corn Leaf Blight': {
      symptoms: ['cigar-shaped lesions', 'gray-green to tan color', 'large lesions up to 6 inches'],
      causes: ['fungal infection (Setosphaeria turcica)', 'dew and high humidity'],
      treatments: [
        { type: 'organic', description: 'Apply copper-based fungicides' },
        { type: 'chemical', description: 'Apply fungicides with active ingredients like pyraclostrobin' },
        { type: 'cultural', description: 'Reduce plant density, improve drainage' }
      ],
      prevention: ['resistant hybrids', 'crop rotation', 'balanced nitrogen fertilization']
    }
  },
  tomatoes: {
    'Early Blight': {
      symptoms: ['dark brown spots with concentric rings', 'yellowing around spots', 'lower leaves affected first'],
      causes: ['fungal infection (Alternaria solani)', 'warm humid weather', 'overhead irrigation'],
      treatments: [
        { type: 'organic', description: 'Remove affected leaves, apply copper spray' },
        { type: 'chemical', description: 'Apply fungicides containing chlorothalonil or mancozeb' },
        { type: 'cultural', description: 'Mulch around plants, avoid wetting leaves' }
      ],
      prevention: ['crop rotation', 'resistant varieties', 'proper spacing', 'drip irrigation']
    },
    'Late Blight': {
      symptoms: ['water-soaked spots', 'white fuzzy growth underside', 'rapid spread', 'dark brown lesions'],
      causes: ['fungal infection (Phytophthora infestans)', 'cool wet conditions', 'high humidity'],
      treatments: [
        { type: 'organic', description: 'Apply copper fungicides, remove infected plants' },
        { type: 'chemical', description: 'Apply metalaxyl or mefenoxam-based fungicides' },
        { type: 'cultural', description: 'Increase spacing, improve air circulation' }
      ],
      prevention: ['resistant varieties', 'avoid overhead watering', 'proper spacing']
    },
    'Bacterial Spot': {
      symptoms: ['small dark spots on leaves', 'yellow halos', 'spots on fruit', 'defoliation'],
      causes: ['bacterial infection (Xanthomonas spp)', 'warm wet weather', 'contaminated seeds'],
      treatments: [
        { type: 'organic', description: 'Apply copper-based bactericides' },
        { type: 'chemical', description: 'Apply copper-maneb sprays' },
        { type: 'cultural', description: 'Remove infected plants, use disease-free seeds' }
      ],
      prevention: ['crop rotation', 'disease-free seeds', 'avoid working with wet plants']
    }
  },
  beans: {
    'Angular Leaf Spot': {
      symptoms: ['angular brown spots on leaves', 'yellow areas around spots', 'spots drop out leaving holes'],
      causes: ['bacterial infection', 'humid conditions', 'splashing water'],
      treatments: [
        { type: 'organic', description: 'Apply copper sprays, remove infected leaves' },
        { type: 'chemical', description: 'Apply copper hydroxide sprays' },
        { type: 'cultural', description: 'Improve air circulation, use drip irrigation' }
      ],
      prevention: ['resistant varieties', 'crop rotation', 'proper spacing']
    },
    'Bean Rust': {
      symptoms: ['reddish-brown pustules on leaves', 'yellowing leaves', 'premature leaf drop'],
      causes: ['fungal infection (Uromyces appendiculatus)', 'high humidity', 'moderate temperatures'],
      treatments: [
        { type: 'organic', description: 'Apply sulfur sprays, remove infected plants' },
        { type: 'chemical', description: 'Apply fungicides containing azoxystrobin' },
        { type: 'cultural', description: 'Increase spacing, avoid overhead watering' }
      ],
      prevention: ['resistant varieties', 'early planting', 'proper spacing']
    }
  }
};

// Swahili translations
const translations = {
  'en': {
    problem: 'Problem Summary',
    causes: 'Possible Causes',
    actions: 'Recommended Actions',
    prevention: 'Prevention Tips',
    confidence: 'Confidence Level',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    organic: 'Organic Solution',
    chemical: 'Chemical Solution',
    cultural: 'Cultural Practice'
  },
  'sw': {
    problem: 'Muhtasari wa Tatizo',
    causes: 'Sababu Zinazoweza Kuwa',
    actions: 'Hatua Zinazopendekezwa',
    prevention: 'Mapendekezo ya Kuzuia',
    confidence: 'Kiwango cha Uhakika',
    low: 'Chini',
    medium: 'Wastani',
    high: 'Juu',
    organic: 'Suluhisho la Kikaboni',
    chemical: 'Suluhisho la Kemikali',
    cultural: 'Mazoezi ya Kilimo'
  }
};

class DiseaseDiagnosis {
  async diagnose({ image, description, language = 'en' }) {
    try {
      // In a real implementation, this would use computer vision
      // For now, we'll use description-based diagnosis
      const diagnosis = this.analyzeSymptoms(description, language);
      
      return {
        ...diagnosis,
        language: language,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Diagnosis failed: ${error.message}`);
    }
  }

  analyzeSymptoms(description, language) {
    const desc = description.toLowerCase();
    let detectedDiseases = [];
    let confidence = 'low';

    // Analyze description for disease patterns
    for (const [crop, diseases] of Object.entries(diseaseDatabase)) {
      for (const [diseaseName, diseaseInfo] of Object.entries(diseases)) {
        const symptomMatches = diseaseInfo.symptoms.filter(symptom => 
          desc.includes(symptom.toLowerCase()) || 
          symptom.toLowerCase().split(' ').some(word => desc.includes(word))
        );

        if (symptomMatches.length > 0) {
          detectedDiseases.push({
            crop: crop,
            disease: diseaseName,
            matches: symptomMatches,
            confidence: symptomMatches.length >= 2 ? 'high' : 
                      symptomMatches.length === 1 ? 'medium' : 'low'
          });
        }
      }
    }

    // Sort by confidence and return best match
    detectedDiseases.sort((a, b) => {
      const confidenceOrder = { high: 3, medium: 2, low: 1 };
      return confidenceOrder[b.confidence] - confidenceOrder[a.confidence];
    });

    if (detectedDiseases.length === 0) {
      return this.generateGenericAdvice(description, language);
    }

    const bestMatch = detectedDiseases[0];
    const diseaseInfo = diseaseDatabase[bestMatch.crop][bestMatch.disease];
    
    return this.formatDiagnosis(bestMatch, diseaseInfo, language);
  }

  formatDiagnosis(match, diseaseInfo, language) {
    const t = translations[language] || translations['en'];
    
    return {
      problem: `${match.crop} - ${match.disease}`,
      summary: this.translateText(`Detected ${match.disease} in ${match.crop}`, language),
      confidence: match.confidence,
      causes: diseaseInfo.causes.map(cause => this.translateText(cause, language)),
      symptoms: diseaseInfo.symptoms.map(symptom => this.translateText(symptom, language)),
      treatments: diseaseInfo.treatments.map(treatment => ({
        type: this.translateText(t[treatment.type], language),
        description: this.translateText(treatment.description, language)
      })),
      prevention: diseaseInfo.prevention.map(tip => this.translateText(tip, language)),
      sections: {
        problem: t.problem,
        causes: t.causes,
        actions: t.actions,
        prevention: t.prevention,
        confidence: t.confidence
      }
    };
  }

  generateGenericAdvice(description, language) {
    const t = translations[language] || translations['en'];
    
    return {
      problem: this.translateText('Unidentified Issue', language),
      summary: this.translateText('Based on your description, I need more information to provide a specific diagnosis. Please provide more details about symptoms, crop type, and growing conditions.', language),
      confidence: 'low',
      causes: [this.translateText('Insufficient information for diagnosis', language)],
      symptoms: [],
      treatments: [
        {
          type: this.translateText(t.cultural, language),
          description: this.translateText('Monitor plants closely and provide basic care: proper watering, balanced fertilization, and good air circulation', language)
        }
      ],
      prevention: [this.translateText('Take clear photos of affected areas and provide detailed symptom descriptions', language)],
      sections: {
        problem: t.problem,
        causes: t.causes,
        actions: t.actions,
        prevention: t.prevention,
        confidence: t.confidence
      },
      needsMoreInfo: true
    };
  }

  translateText(text, language) {
    // Simple translation implementation
    // In production, this would use a proper translation service
    if (language === 'sw') {
      // Basic Swahili translations for common agricultural terms
      const swahiliMap = {
        'maize': 'mahindi',
        'tomatoes': 'nyanya',
        'beans': 'maharage',
        'leaves': 'majani',
        'yellow': 'manjano',
        'brown': 'rangi ya kahawia',
        'spots': 'makovu',
        'fungal': 'vuhi',
        'bacterial': 'bakteria',
        'viral': 'virus',
        'remove': 'ondoa',
        'apply': 'tumia',
        'water': 'maji',
        'fertilizer': 'mbolea',
        'disease': 'ugonjwa',
        'infection': 'maambukizi'
      };

      let translated = text;
      for (const [en, sw] of Object.entries(swahiliMap)) {
        translated = translated.replace(new RegExp(en, 'gi'), sw);
      }
      return translated;
    }
    return text;
  }
}

module.exports = new DiseaseDiagnosis();
