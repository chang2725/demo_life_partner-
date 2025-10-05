import { MessageCircle, Phone, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    const pulseTimer = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseTimer);
    };
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '919901997606';
    const message = 'Hi Rathi! I am interested in LIC policies. Please provide more information.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-700 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
    }`}>
      {/* Floating particles */}
      <div className="absolute -inset-4">
        <div className="w-2 h-2 bg-green-300 rounded-full absolute -top-2 -left-2 animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="w-1 h-1 bg-green-400 rounded-full absolute -top-1 right-0 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="w-1.5 h-1.5 bg-green-200 rounded-full absolute -bottom-1 -left-1 animate-bounce" style={{animationDelay: '1s'}}></div>
      </div>

      {/* WhatsApp Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110 group ${
          isPulsing ? 'animate-pulse' : ''
        }`}
      >
        {/* Animated ring */}
        <div className="absolute inset-0 rounded-full border-4 border-green-300 opacity-0 group-hover:opacity-100 animate-ping"></div>
        
        {/* Icon with animation */}
        {isExpanded ? (
          <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
        )}
        
        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white">
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
        </div>
      </button>

      {/* Expanded Options */}
      {isExpanded && (
        <div className="absolute bottom-full right-0 mb-4 space-y-3 animate-fade-in">
          {/* WhatsApp Chat */}
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Chat on WhatsApp</span>
          </button>
          
          {/* Call Option */}
          <button
            onClick={() => window.open('tel:+919901997606')}
            className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
          >
            <Phone className="h-5 w-5" />
            <span className="text-sm font-medium">Call Now</span>
          </button>
        </div>
      )}

      {/* Tooltip - only show when not expanded */}
      {!isExpanded && (
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap relative">
            Chat with Rathi on WhatsApp! 💬
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppButton;
