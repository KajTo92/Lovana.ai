import { useState } from 'react';
import { Image, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import UploadCard from '../components/UploadCard';
import PhotoGrid from '../components/PhotoGrid';
import FeedbackCard from '../components/FeedbackCard';

const PhotoAnalysisPage = () => {
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);

  // Mock data for demonstration
  const demoPhotos = [
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    "https://images.pexels.com/photos/1144687/pexels-photo-1144687.jpeg",
    "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg",
    "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
    "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    "https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg"
  ];

  const handlePhotoUpload = (files: File[]) => {
    // In a real app, you would upload these files to a server
    // Here we're just creating object URLs for demo purposes
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
  };

  const handleSelectBest = (indices: number[]) => {
    setSelectedPhotos(indices);
    setShowResults(true);
  };

  // Mock feedback data
  const feedbackItems = [
    { type: 'positive', text: 'Your main photo has great lighting and a clear view of your face.' },
    { type: 'positive', text: 'Including outdoor activity photos shows your interests well.' },
    { type: 'suggestion', text: 'Consider adding a photo with friends to show your social side.' },
    { type: 'suggestion', text: 'Your third photo is slightly blurry - try replacing it with a clearer one.' },
    { type: 'info', text: 'Photos with genuine smiles typically get 14% more positive responses.' }
  ];

  const mockBestOrder = [
    { type: 'info', text: 'Best photo order: 1. Beach photo, 2. Hiking photo, 3. Restaurant photo' },
    { type: 'info', text: 'Leading with an outdoor activity photo could increase matches by 20%' },
    { type: 'suggestion', text: 'Avoid using more than one selfie in your profile' },
    { type: 'suggestion', text: 'Include at least one full-body photo to give a complete impression' }
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
          <h1 className="text-4xl font-bold mb-4">Photo Analysis</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your dating profile photos for AI analysis and get recommendations on which photos to use and in what order.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {!uploadedPhotos.length ? (
            <UploadCard
              title="Upload Your Photos"
              description="Upload up to 6 photos from your dating profile for analysis"
              onUpload={handlePhotoUpload}
              maxFiles={6}
            />
          ) : (
            <PhotoGrid 
              photos={uploadedPhotos.length ? uploadedPhotos : demoPhotos}
              onSelectBest={handleSelectBest}
            />
          )}
          
          {showResults && (
            <div className="space-y-6">
              <FeedbackCard 
                title="Photo Analysis" 
                items={feedbackItems}
                score={8}
              />
              
              <FeedbackCard 
                title="Recommended Photo Order" 
                items={mockBestOrder}
              />
              
              <motion.button
                className="btn-primary w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => {
                  setShowResults(false);
                  setUploadedPhotos([]);
                }}
              >
                Analyze New Photos
              </motion.button>
            </div>
          )}
          
          {!uploadedPhotos.length && !showResults && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Image className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Why Photo Analysis Matters</h3>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>First impressions count.</strong> Your profile photos are the first thing potential matches see.
                  </p>
                  <p>
                    <strong>Different photos tell different stories.</strong> We'll help you choose photos that showcase your best self and interests.
                  </p>
                  <p>
                    <strong>Order matters.</strong> Studies show that the sequence of your photos can significantly impact your match rate.
                  </p>
                  <p>
                    <strong>Get objective feedback.</strong> Our AI provides unbiased analysis based on what performs well in dating apps.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Demo Button - For demonstration purposes */}
        {!uploadedPhotos.length && !showResults && (
          <div className="mt-8 text-center">
            <button
              className="text-primary underline"
              onClick={() => {
                setUploadedPhotos(demoPhotos);
              }}
            >
              See Demo with Sample Photos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoAnalysisPage;