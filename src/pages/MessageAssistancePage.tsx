import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import UploadCard from '../components/UploadCard';
import MessageThread from '../components/MessageThread';
import ReplyStyleSelector from '../components/ReplyStyleSelector';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const MessageAssistancePage = () => {
  const [selectedStyle, setSelectedStyle] = useState<string>('casual');
  const [showResults, setShowResults] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleUpload = (files: File[]) => {
    if (files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setUploadedImage(imageUrl);
      setShowResults(true);
    }
  };

  const handleSelectStyle = (style: string) => {
    setSelectedStyle(style);
    // In a real app, this would trigger regenerating the suggestions
  };

  const handleSelectReply = (reply: string) => {
    // In a real app, this would copy to clipboard or send the message
    alert(`Selected reply: ${reply}`);
  };

  // Mock conversation
  const messages: Message[] = [
    {
      id: 1,
      text: "Hey! I noticed you like hiking. What's your favorite trail?",
      isUser: false,
      timestamp: "2:34 PM"
    },
    {
      id: 2,
      text: "Hi there! Yeah, I love getting out in nature. I've been hitting a lot of trails in the national park lately.",
      isUser: true,
      timestamp: "2:40 PM"
    },
    {
      id: 3,
      text: "That sounds awesome! I've been wanting to check out the national park. Any recommendations for a moderate hiker?",
      isUser: false,
      timestamp: "2:42 PM"
    }
  ];

  // Mock suggested replies based on style
  const getSuggestedReplies = () => {
    switch (selectedStyle) {
      case 'casual':
        return [
          "Definitely! The Sunrise Trail is perfect for moderate hikers - amazing views and not too difficult. Have you been hiking long?",
          "For sure! Check out Eagle Ridge - it's about 5 miles with moderate elevation. What kind of hikes do you usually enjoy?",
          "The Lakeview Loop is my absolute favorite for moderate hikers. Great mix of forest and open views. What's your hiking experience like?"
        ];
      case 'flirty':
        return [
          "I'd love to show you my favorite trails sometime! The Sunset Path is gorgeous, especially with good company. 😉",
          "Nothing better than hiking with someone new! The Mountain View trail is stunning - almost as stunning as matching with you!",
          "I know this perfect spot on Evergreen Trail with an amazing view. Maybe we could check it out together sometime?"
        ];
      case 'funny':
        return [
          "Well, I haven't been chased by a bear yet on Pinecrest Trail, so I highly recommend it! Though bringing bear spray is still probably wise 😂",
          "Cedar Ridge is great if you enjoy scenic views and occasionally questioning your life choices on steep inclines!",
          "Ridge Valley Trail - where the views are breathtaking... and so is the hike! Pack snacks, water, and your sense of humor!"
        ];
      default:
        return [
          "I recommend the Sunrise Trail. It has great views and moderate difficulty. Let me know if you check it out!",
          "Eagle Ridge is a good one for moderate hikers. It's about 5 miles with some elevation but nothing too strenuous.",
          "Try the Lakeview Loop - it's popular among moderate hikers and has a nice mix of terrain."
        ];
    }
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container-custom">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Message Assistance</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload a screenshot of your conversation, and our AI will suggest engaging replies to keep the conversation flowing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {!showResults ? (
            <UploadCard
              title="Upload Conversation Screenshot"
              description="Upload a screenshot of your dating app conversation"
              onUpload={handleUpload}
            />
          ) : (
            <MessageThread
              messages={messages}
              suggestedReplies={getSuggestedReplies()}
              onSelectReply={handleSelectReply}
            />
          )}
          
          {showResults && (
            <div className="space-y-6">
              <ReplyStyleSelector onSelectStyle={handleSelectStyle} />
              
              <motion.button
                className="btn-primary w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => {
                  setShowResults(false);
                  setUploadedImage(null);
                }}
              >
                Upload New Conversation
              </motion.button>
            </div>
          )}
          
          {!showResults && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Message Tips</h3>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Be authentic.</strong> While our AI helps craft engaging messages, staying true to your voice is key.
                  </p>
                  <p>
                    <strong>Ask open-ended questions.</strong> They encourage more detailed responses and keep conversations flowing.
                  </p>
                  <p>
                    <strong>Reference their profile.</strong> Show you've taken the time to read about them and their interests.
                  </p>
                  <p>
                    <strong>Keep it light and positive.</strong> Dating should be fun, and your messages should reflect that.
                  </p>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-medium mb-2">Available Message Styles</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Casual</span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">Flirty</span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-sm">Funny</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Thoughtful</span>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Direct</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">Creative</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Demo Button - For demonstration purposes */}
        {!showResults && (
          <div className="mt-8 text-center">
            <button
              className="text-primary underline"
              onClick={() => {
                setShowResults(true);
              }}
            >
              See Demo with Sample Conversation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageAssistancePage;