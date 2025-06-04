import { useState } from 'react';
import { UserRound, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';
import FeedbackCard from '../components/FeedbackCard';
import ProfilePreview from '../components/ProfilePreview';

const BioAnalysisPage = () => {
  const [bio, setBio] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [improvedBio, setImprovedBio] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the bio to an API for analysis
    // Here we're just simulating the improved bio
    
    // Simple mock improvement
    const improved = bio + " Passionate about life and adventures. Looking for someone to share meaningful conversations and create memories with.";
    setImprovedBio(improved);
    setShowResults(true);
  };

  const handleUseDemo = () => {
    const demoBio = "Coffee lover, dog parent, and hiking enthusiast. I enjoy traveling and trying new restaurants.";
    setBio(demoBio);
  };

  // Mock feedback data
  const feedbackItems = [
    { type: 'positive', text: 'Good job mentioning your interests (coffee, dogs, hiking).' },
    { type: 'positive', text: 'Short and to the point, which works well.' },
    { type: 'suggestion', text: 'Add something unique about your personality to stand out.' },
    { type: 'suggestion', text: 'Consider including what you\'re looking for in a match.' },
    { type: 'info', text: 'Profiles with clear interests get 30% more matches on average.' }
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
          <h1 className="text-4xl font-bold mb-4">Bio Analysis</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your dating profile bio for AI analysis and get suggestions on how to improve it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {!showResults ? (
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <UserRound className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Your Profile Bio</h3>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="bio" className="block text-gray-700 mb-2 font-medium">
                      Enter your current bio
                    </label>
                    <textarea
                      id="bio"
                      rows={6}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="E.g., Coffee lover, dog parent, and hiking enthusiast..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary w-full">
                    Analyze Bio
                  </button>
                </form>
                
                <button
                  className="mt-4 text-primary underline text-center w-full"
                  onClick={handleUseDemo}
                >
                  Use Demo Bio
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <FeedbackCard 
                title="Bio Analysis" 
                items={feedbackItems}
                score={7}
              />
              
              <motion.div
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Edit3 className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold">Improved Bio</h3>
                  </div>
                  
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
                    <p className="text-gray-800">{improvedBio}</p>
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      className="btn-primary flex-1"
                      onClick={() => {
                        // In a real app, you might copy to clipboard
                        alert('Bio copied to clipboard!');
                      }}
                    >
                      Copy Improved Bio
                    </button>
                    
                    <button
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex-1"
                      onClick={() => {
                        setShowResults(false);
                        setBio('');
                      }}
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          
          <div className="flex flex-col space-y-6">
            <ProfilePreview bio={showResults ? improvedBio : bio || undefined} />
            
            <motion.div
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Bio Writing Tips</h3>
                
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Be authentic and show your personality</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Mention specific interests rather than generic ones</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Include conversation starters to make it easy for others to message you</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Keep it positive and avoid listing what you don't want</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Use humor if it comes naturally to you</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioAnalysisPage;