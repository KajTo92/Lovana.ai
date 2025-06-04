import { useState } from 'react';
import { Smile, Coffee, Heart, Zap, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface StyleOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface ReplyStyleSelectorProps {
  onSelectStyle: (style: string) => void;
}

const ReplyStyleSelector = ({ onSelectStyle }: ReplyStyleSelectorProps) => {
  const [selectedStyle, setSelectedStyle] = useState<string>('casual');

  const styles: StyleOption[] = [
    { 
      id: 'casual', 
      name: 'Casual', 
      icon: <Coffee size={20} />, 
      description: 'Friendly and conversational' 
    },
    { 
      id: 'flirty', 
      name: 'Flirty', 
      icon: <Heart size={20} />, 
      description: 'Playful and romantic' 
    },
    { 
      id: 'funny', 
      name: 'Funny', 
      icon: <Smile size={20} />, 
      description: 'Witty and humorous' 
    },
    { 
      id: 'direct', 
      name: 'Direct', 
      icon: <Zap size={20} />, 
      description: 'Clear and straightforward' 
    },
    { 
      id: 'thoughtful', 
      name: 'Thoughtful', 
      icon: <MessageSquare size={20} />, 
      description: 'Insightful and engaging' 
    },
    { 
      id: 'creative', 
      name: 'Creative', 
      icon: <Sparkles size={20} />, 
      description: 'Unique and original' 
    },
  ];

  const handleSelect = (style: string) => {
    setSelectedStyle(style);
    onSelectStyle(style);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Choose Reply Style</h3>
      <p className="text-gray-600 mb-6">Select a tone for your AI-generated replies</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {styles.map((style) => (
          <motion.button
            key={style.id}
            className={`p-4 rounded-lg border-2 flex flex-col items-center text-center transition-all ${
              selectedStyle === style.id
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
            onClick={() => handleSelect(style.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`mb-2 ${selectedStyle === style.id ? 'text-primary' : 'text-gray-500'}`}>
              {style.icon}
            </div>
            <span className="font-medium">{style.name}</span>
            <span className="text-xs mt-1 text-gray-500">{style.description}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ReplyStyleSelector;