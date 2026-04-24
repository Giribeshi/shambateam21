import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Play, Stop, AlertCircle } from 'lucide-react';
import VoiceAssistantService from '../services/VoiceAssistant';

const VoiceAssistantButton = ({ 
  onTranscript = null, 
  textToSpeak = null, 
  instructions = null,
  autoSpeak = false,
  size = 'medium',
  position = 'bottom-right'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);

  const voiceAssistant = useRef(VoiceAssistantService);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Check voice support
    const support = voiceAssistant.current.getSupportStatus();
    setIsSupported(support.both);

    // Auto-speak if text is provided
    if (autoSpeak && textToSpeak && support.synthesis) {
      speakText(textToSpeak);
    }
  }, [textToSpeak, autoSpeak]);

  useEffect(() => {
    return () => {
      // Cleanup
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      voiceAssistant.current.stopSpeaking();
      voiceAssistant.current.stopListening();
    };
  }, []);

  const startListening = async () => {
    if (!isSupported) {
      setError('Sio sauti inayoungwa mkono kwenye kifaa hiki');
      return;
    }

    try {
      setIsListening(true);
      setError('');
      setTranscript('');
      setInterimTranscript('');
      setShowTranscript(true);

      // Speak instructions if provided
      if (instructions) {
        await voiceAssistant.current.speak(instructions);
      } else {
        await voiceAssistant.current.speakListening();
      }

      // Start speech recognition
      const result = await voiceAssistant.current.startListening({
        onStart: () => {
          console.log('Voice recognition started');
        },
        onResult: (data) => {
          setInterimTranscript(data.interim);
          if (data.final) {
            setTranscript(prev => prev + data.final + ' ');
            setInterimTranscript('');
          }
        },
        onEnd: () => {
          setIsListening(false);
          // Auto-submit transcript after 2 seconds of silence
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            if (transcript.trim()) {
              handleSubmitTranscript();
            }
          }, 2000);
        },
        onError: (error) => {
          setIsListening(false);
          setError('Hitilafu katika kusikiliza: ' + error);
        }
      });

      if (result && result.trim()) {
        setTranscript(result);
        handleSubmitTranscript();
      }
    } catch (error) {
      setIsListening(false);
      setError('Hitilafu katika kusikiliza: ' + error.message);
    }
  };

  const stopListening = () => {
    voiceAssistant.current.stopListening();
    setIsListening(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const speakText = async (text) => {
    if (!isSupported) {
      setError('Sio sauti inayoungwa mkono kwenye kifaa hiki');
      return;
    }

    try {
      setIsSpeaking(true);
      setError('');

      await voiceAssistant.current.speak(text, {
        onStart: () => {
          console.log('Speaking started');
        },
        onEnd: () => {
          setIsSpeaking(false);
        },
        onError: (error) => {
          setIsSpeaking(false);
          setError('Hitilafu katika kusema: ' + error);
        }
      });
    } catch (error) {
      setIsSpeaking(false);
      setError('Hitilafu katika kusema: ' + error.message);
    }
  };

  const stopSpeaking = () => {
    voiceAssistant.current.stopSpeaking();
    setIsSpeaking(false);
  };

  const handleSubmitTranscript = () => {
    if (transcript.trim() && onTranscript) {
      onTranscript(transcript.trim());
      setTranscript('');
      setShowTranscript(false);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-10 h-10';
      case 'large':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  const getButtonColor = () => {
    if (isListening) return 'bg-red-500 hover:bg-red-600';
    if (isSpeaking) return 'bg-blue-500 hover:bg-blue-600';
    return 'bg-green-500 hover:bg-green-600';
  };

  if (!isSupported) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg max-w-xs">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="text-sm">Kifaa hiki hakiiungi mkono sauti</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-50`}>
      {/* Voice Assistant Button */}
      <div className="flex flex-col items-end space-y-2">
        {/* Transcript Display */}
        {showTranscript && (transcript || interimTranscript) && (
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3 max-w-xs">
            <div className="text-sm text-gray-700">
              <div className="font-medium mb-1">Unasema:</div>
              <div className="text-gray-900">
                {transcript}
                <span className="text-gray-400 italic">{interimTranscript}</span>
              </div>
            </div>
            {(transcript || interimTranscript) && (
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={handleSubmitTranscript}
                  className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Tuma
                </button>
                <button
                  onClick={() => {
                    setTranscript('');
                    setInterimTranscript('');
                    setShowTranscript(false);
                  }}
                  className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                >
                  Futa
                </button>
              </div>
            )}
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex space-x-2">
          {/* Microphone Button */}
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isSpeaking}
            className={`${getSizeClasses()} ${getButtonColor()} text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
            title={isListening ? 'Acha kusikiliza' : 'Anza kusikiliza'}
          >
            {isListening ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>

          {/* Text-to-Speech Button */}
          {textToSpeak && (
            <button
              onClick={isSpeaking ? stopSpeaking : () => speakText(textToSpeak)}
              disabled={isListening}
              className={`${getSizeClasses()} bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
              title={isSpeaking ? 'Acha kusema' : 'Sema maandishi'}
            >
              {isSpeaking ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {/* Status Indicator */}
        {(isListening || isSpeaking) && (
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg px-3 py-2">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500' : 'bg-blue-500'} animate-pulse`}></div>
              <span className="text-xs text-gray-700">
                {isListening ? 'Nasikiliza...' : 'Nasema...'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg max-w-xs">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistantButton;
