import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Heart, Sprout, Cloud, ArrowRight, Users, Shield, Smartphone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
      title: 'Welcome to Agrimind',
      subtitle: 'Your AI-Powered Agricultural Assistant',
      description: 'Helping Tanzanian farmers increase crop yield, reduce losses, and make better farming decisions with localized, practical advice.',
      features: {
        diagnosis: {
          title: 'Disease Diagnosis',
          description: 'Identify crop diseases from images or descriptions and get treatment recommendations.',
          icon: Camera
        },
        advisory: {
          title: 'Farming Advisory',
          description: 'Get personalized advice for planting, growing, and harvesting based on local conditions.',
          icon: Heart
        },
        recommendations: {
          title: 'Crop Recommendations',
          description: 'Discover the best crops for your location, soil type, and farming goals.',
          icon: Sprout
        },
        weather: {
          title: 'Weather Insights',
          description: 'Access weather information and agricultural recommendations for your region.',
          icon: Cloud
        }
      },
      benefits: {
        localized: {
          title: 'Localized Knowledge',
          description: 'Advice tailored specifically for Tanzanian climate, crops, and farming conditions.'
        },
        practical: {
          title: 'Practical Solutions',
          description: 'Low-cost, actionable advice that works for smallholder farmers.'
        },
        multilingual: {
          title: 'Multi-Language Support',
          description: 'Available in both English and Swahili for better accessibility.'
        },
        free: {
          title: 'Free to Use',
          description: 'No cost for farmers - accessible agricultural knowledge for everyone.'
        }
      },
      getStarted: 'Get Started',
      learnMore: 'Learn More'
    },
    sw: {
      title: 'Karibu Agrimind',
      subtitle: 'Msaidizi Wako wa Kilimo Unaojengwa na AI',
      description: 'Kusaidia wakulima wa Tanzania kuongeza mavuno, kupunguza hasara, na kufanya maamuzi bora ya kilimo kwa ushauri wa karibu na wa vitendo.',
      features: {
        diagnosis: {
          title: 'Utambuzi wa Ugonjwa',
          description: 'Tambua magonjwa ya mazao kutoka picha au maelezo na upendekezo wa matibabu.',
          icon: Camera
        },
        advisory: {
          title: 'Ushauri wa Kilimo',
          description: 'Pata ushauri wa kibinafsi kwa upandaji, ukuaji, na uvunaji kulingana na hali za karibu.',
          icon: Heart
        },
        recommendations: {
          title: 'Mapendekezo ya Mazao',
          description: 'Gundua mazao bora kwa eneo lako, aina ya udongo, na malengo ya kilimo.',
          icon: Sprout
        },
        weather: {
          title: 'Maelezo ya Hali ya Hewa',
          description: 'Pata habari za hali ya hewa na mapendekezo ya kilimo kwa mkoa wako.',
          icon: Cloud
        }
      },
      benefits: {
        localized: {
          title: 'Ujuzi wa Karibu',
          description: 'Ushauri unaobadilishwa mahususi kwa tabianchi ya Tanzania, mazao, na hali za kilimo.'
        },
        practical: {
          title: 'Suluhisho za Vitendo',
          description: 'Ushauri wa gharama ya chini, unaoendelea kwa wakulima wadogo.'
        },
        multilingual: {
          title: 'Msaada wa Lugha Nyingi',
          description: 'Inapatikana kwa Kiingereza na Kiswahili kwa urahisi zaidi.'
        },
        free: {
          title: 'Bila Malipo',
          description: 'Hakuna gharama kwa wakulima - ujuzi wa kilimo unaopatikana kwa kila mtu.'
        }
      },
      getStarted: 'Anza',
      learnMore: 'Jifunze Zaidi'
    }
  };

  const t = translations[language];

  const featureCards = [
    { key: 'diagnosis', path: '/diagnosis' },
    { key: 'advisory', path: '/advisory' },
    { key: 'recommendations', path: '/recommendations' },
    { key: 'weather', path: '/weather' }
  ];

  const benefitCards = [
    { key: 'localized', icon: Users },
    { key: 'practical', icon: Shield },
    { key: 'multilingual', icon: Smartphone },
    { key: 'free', icon: Heart }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-agrimind-green mb-4">
          {t.title}
        </h1>
        <p className="text-xl text-gray-700 mb-6">{t.subtitle}</p>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          {t.description}
        </p>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-2xl font-bold text-center text-agrimind-green mb-8">
          {language === 'en' ? 'Our Services' : 'Huduma Zetu'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((feature) => {
            const featureData = t.features[feature.key];
            const Icon = featureData.icon;
            return (
              <Link
                key={feature.key}
                to={feature.path}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow card-hover group"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-agrimind-light rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-agrimind-green">
                    {featureData.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {featureData.description}
                  </p>
                  <div className="flex items-center text-agrimind-green font-medium group-hover:text-agrimind-light transition-colors">
                    <span>{t.getStarted}</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-agrimind-green mb-8">
          {language === 'en' ? 'Why Choose Agrimind?' : 'Kuchagua Agrimind Nini?'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitCards.map((benefit) => {
            const benefitData = t.benefits[benefit.key];
            const Icon = benefit.icon;
            return (
              <div key={benefit.key} className="text-center space-y-4">
                <div className="w-12 h-12 bg-agrimind-accent rounded-full flex items-center justify-center mx-auto">
                  <Icon className="w-6 h-6 text-agrimind-green" />
                </div>
                <h3 className="text-lg font-semibold text-agrimind-green">
                  {benefitData.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {benefitData.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-8">
        <div className="bg-agrimind-green rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Ready to Improve Your Farm?' : 'Uko Tayari Kuboresha Shamba Lako?'}
          </h2>
          <p className="mb-6">
            {language === 'en' 
              ? 'Start using Agrimind today and get personalized agricultural advice for your farm.'
              : 'Anza kutumia Agrimind leo na upate ushauri wa kibinafsi wa kilimo kwa shamba lako.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/diagnosis"
              className="bg-white text-agrimind-green px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              {t.getStarted}
            </Link>
            <Link
              to="/advisory"
              className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-agrimind-green transition-colors"
            >
              {t.learnMore}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
