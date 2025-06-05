import { useState } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal, Sparkles } from 'lucide-react';
import UploadCard from '../components/UploadCard';
import FeedbackCard from '../components/FeedbackCard';

const FirstMessagePage = () => {
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handlePhotoUpload = (files: File[]) => {
    // In a real app, you would upload these files to a server
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
    if (newPhotos.length > 0) {
      setShowResults(true);
    }
  };

  // Mock suggested first messages
  const suggestedMessages = [
    { 
      type: 'info', 
      text: "Hey! I noticed you're into rock climbing - I just started bouldering myself! Any favorite spots you'd recommend?" 
    },
    { 
      type: 'info', 
      text: "Your travel photos are amazing! That sunset shot in Bali looks incredible. What was your favorite part of the trip?" 
    },
    { 
      type: 'info', 
      text: "I see we both love indie music! Have you been to any good concerts lately? I just saw Arctic Monkeys last month!" 
    }
  ];

  // Mock tips for crafting first messages
  const messageTips = [
    { type: 'positive', text: 'Reference specific details from their profile' },
    { type: 'positive', text: 'Ask open-ended questions to encourage conversation' },
    { type: 'suggestion', text: 'Keep the tone light and friendly' },
    { type: 'suggestion', text: 'Show genuine interest in their hobbies' },
    { type: 'info', text: 'Messages mentioning shared interests get 32% more responses' }
  ];

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container-custom">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">First Message Generator</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload screenshots of your match's profile, and we'll help you craft the perfect first message.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {!showResults ? (
            <UploadCard
              title="Upload Profile Screenshots"
              description="Upload up to 4 screenshots of your match's profile"
              onUpload={handlePhotoUpload}
              maxFiles={4}
            />
          ) : (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FeedbackCard
                title="Suggested First Messages"
                items={suggestedMessages}
              />
              
              <motion.button
                className="btn-primary w-full"
                onClick={() => {
                  setShowResults(false);
                  setUploadedPhotos([]);
                }}
              >
                Generate New Messages
              </motion.button>
            </motion.div>
          )}
          
          <div className="space-y-6">
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <SendHorizonal className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">First Message Tips</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="flex items-center space-x-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span>Personalization is key - mention specific details from their profile</span>
                  </p>
                  <p className="flex items-center space-x-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span>Ask engaging questions that can't be answered with just yes/no</span>
                  </p>
                  <p className="flex items-center space-x-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span>Show genuine interest in their hobbies and experiences</span>
                  </p>
                  <p className="flex items-center space-x-2 text-gray-700">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span>Keep it light and friendly - humor often works well</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <FeedbackCard
              title="Message Writing Guide"
              items={messageTips}
            />
          </div>
        </div>

        {/* Demo Button */}
        {!showResults && (
          <div className="mt-8 text-center">
            <button
              className="text-primary underline"
              onClick={() => setShowResults(true)}
            >
              See Demo Messages
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirstMessagePage;