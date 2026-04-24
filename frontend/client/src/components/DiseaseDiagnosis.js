import React, { useState } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import { demoDiseaseDiagnosis } from '../data/demoData';

const DiseaseDiagnosis = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const translations = {
    en: {
      title: 'Disease Diagnosis',
      subtitle: 'Identify crop diseases and get treatment recommendations',
      uploadImage: 'Upload Image',
      takePhoto: 'Take Photo',
      describeSymptoms: 'Describe Symptoms',
      placeholder: 'Describe what you see on your crops (e.g., yellow leaves, brown spots, wilting)...',
      analyze: 'Analyze',
      analyzing: 'Analyzing...',
      results: 'Diagnosis Results',
      problem: 'Problem Summary',
      causes: 'Possible Causes',
      treatments: 'Recommended Actions',
      prevention: 'Prevention Tips',
      confidence: 'Confidence Level',
      organic: 'Organic Solution',
      chemical: 'Chemical Solution',
      cultural: 'Cultural Practice',
      noImage: 'No image selected',
      dragDrop: 'Drag and drop an image here, or click to select',
      supportedFormats: 'Supported formats: JPG, PNG, GIF (Max 5MB)',
      error: 'Error',
      tryAgain: 'Try Again'
    },
    sw: {
      title: 'Utambuzi wa Ugonjwa',
      subtitle: 'Tambua magonjwa ya mazao na upendekezo wa matibabu',
      uploadImage: 'Pakia Picha',
      takePhoto: 'Piga Picha',
      describeSymptoms: 'Elezea Dalili',
      placeholder: 'Elezea unachoyaona kwenye mazao yako (k.m., majani manjano, makovu ya kahawia, kunyauka)...',
      analyze: 'Chambua',
      analyzing: 'Inachambua...',
      results: 'Matokeo ya Utambuzi',
      problem: 'Muhtasari wa Tatizo',
      causes: 'Sababu Zinazoweza Kuwa',
      treatments: 'Hatua Zinazopendekezwa',
      prevention: 'Mapendekezo ya Kuzuia',
      confidence: 'Kiwango cha Uhakika',
      organic: 'Suluhisho la Kikaboni',
      chemical: 'Suluhisho la Kemikali',
      cultural: 'Mazoezi ya Kilimo',
      noImage: 'Hakuna picha iliyochaguliwa',
      dragDrop: 'Beke na paka picha hapa, au bofya kuchagua',
      supportedFormats: 'Mifumo inayotambulika: JPG, PNG, GIF (Maksimum 5MB)',
      error: 'Kosa',
      tryAgain: 'Jaribu Tena'
    }
  };

  const t = translations[language];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(t.error + ': ' + (language === 'en' ? 'File too large' : 'Faili kubwa sana'));
        return;
      }
      setSelectedImage(file);
      setError('');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError(t.error + ': ' + (language === 'en' ? 'File too large' : 'Faili kubwa sana'));
        return;
      }
      setSelectedImage(file);
      setError('');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleAnalyze = async () => {
    if (!description.trim()) {
      setError(language === 'en' ? 'Please describe the symptoms' : 'Tafadhali elezea dalili');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      // Check if we're in demo mode (no backend)
      if (window.location.hostname !== 'localhost') {
        // Use demo data - analyze description to find matching disease
        const desc = description.toLowerCase();
        let matchedDisease = null;
        
        // Simple keyword matching for demo
        if (desc.includes('maize') || desc.includes('mahindi')) {
          if (desc.includes('leaf') || desc.includes('majani')) {
            matchedDisease = demoDiseaseDiagnosis['maize_leaf_blight'];
          }
        } else if (desc.includes('tomato') || desc.includes('nyanya')) {
          if (desc.includes('wilt') || desc.includes('kunyauka')) {
            matchedDisease = demoDiseaseDiagnosis['tomato_bacterial_wilt'];
          }
        }
        
        // Fallback to generic diagnosis
        if (!matchedDisease) {
          matchedDisease = {
            problem: 'General Crop Issue',
            confidence: 75,
            description: 'Based on your description, this appears to be a common crop issue that requires attention',
            symptoms: [description],
            causes: ['Environmental factors', 'Nutrient imbalance', 'Possible disease or pest'],
            treatment: {
              immediate: ['Monitor the affected plants closely', 'Isolate if possible'],
              chemical: ['Apply appropriate treatment based on specific diagnosis'],
              cultural: ['Improve growing conditions', 'Ensure proper irrigation'],
              prevention: ['Regular monitoring', 'Proper crop management']
            },
            impact: {
              yieldLoss: 'Depends on severity and timing',
              economicImpact: 'Variable based on treatment effectiveness',
              spread: 'Preventable with proper management'
            }
          };
        }
        
        setResult(matchedDisease);
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
      formData.append('description', description);
      formData.append('language', language);

      const response = await axios.post('/api/diagnose', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(response.data);
    } catch (error) {
      // Fallback to demo data if backend fails
      const desc = description.toLowerCase();
      let matchedDisease = null;
      
      if (desc.includes('maize') || desc.includes('mahindi')) {
        matchedDisease = demoDiseaseDiagnosis['maize_leaf_blight'];
      } else if (desc.includes('tomato') || desc.includes('nyanya')) {
        matchedDisease = demoDiseaseDiagnosis['tomato_bacterial_wilt'];
      }
      
      if (matchedDisease) {
        setResult(matchedDisease);
      } else {
        setError(t.error + ': ' + (error.response?.data?.message || error.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setDescription('');
    setResult(null);
    setError('');
  };

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'high':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTreatmentIcon = (type) => {
    switch (type) {
      case 'organic':
        return 'leaf';
      case 'chemical':
        return 'flask';
      case 'cultural':
        return 'hand';
      default:
        return 'info';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-agrimind-green mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Input Form */}
      {!result && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.uploadImage}
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-agrimind-light transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('file-input').click()}
            >
              {selectedImage ? (
                <div className="space-y-4">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="max-h-48 mx-auto rounded"
                  />
                  <p className="text-sm text-gray-600">{selectedImage.name}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="text-gray-600">{t.dragDrop}</p>
                  <p className="text-sm text-gray-500">{t.supportedFormats}</p>
                </div>
              )}
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.describeSymptoms}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-agrimind-light focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full bg-agrimind-green text-white py-3 px-6 rounded-md font-medium hover:bg-agrimind-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t.analyzing}</span>
              </>
            ) : (
              <>
                <span>{t.analyze}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-agrimind-green">{t.results}</h2>
            <button
              onClick={handleReset}
              className="text-gray-600 hover:text-agrimind-green transition-colors"
            >
              {t.tryAgain}
            </button>
          </div>

          {/* Problem Summary */}
          <div className="border-l-4 border-agrimind-green pl-4">
            <h3 className="font-semibold text-gray-900 mb-2">{t.problem}</h3>
            <p className="text-gray-700">{result.summary}</p>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConfidenceColor(result.confidence)}`}>
                {t.confidence}: {result.confidence}
              </span>
            </div>
          </div>

          {/* Causes */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t.causes}</h3>
            <ul className="space-y-2">
              {result.causes.map((cause, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-agrimind-accent rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t.treatments}</h3>
            <div className="space-y-3">
              {result.treatments.map((treatment, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-agrimind-green">
                      {t[treatment.type.toLowerCase().replace(' ', '_')] || treatment.type}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{treatment.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Prevention */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">{t.prevention}</h3>
            <ul className="space-y-2">
              {result.prevention.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseDiagnosis;
