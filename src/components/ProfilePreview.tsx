import { motion } from 'framer-motion';
import { X, Heart, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProfilePreviewProps {
  imageUrl?: string;
  bio?: string;
  rotate?: boolean;
}

const ProfilePreview = ({ imageUrl, bio, rotate = false }: ProfilePreviewProps) => {
  const [currentProfile, setCurrentProfile] = useState(0);
  
  const profiles = [
    {
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      bio: "Coffee enthusiast. Dog lover. Hiking addict."
    },
    {
      image: "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg",
      bio: "Adventure seeker. Photography passionate. Food lover."
    },
    {
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
      bio: "Travel junkie. Book worm. Always smiling."
    }
  ];

  useEffect(() => {
    if (rotate) {
      const interval = setInterval(() => {
        setCurrentProfile((prev) => (prev + 1) % profiles.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [rotate]);

  const profile = rotate ? profiles[currentProfile] : {
    image: imageUrl || profiles[0].image,
    bio: bio || profiles[0].bio
  };
  
  return (
    <div className="max-w-xs mx-auto">
      <motion.div
        className="bg-white rounded-xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.9, rotate: rotate ? 8 : 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          rotate: rotate ? 8 : 0,
        }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 100
        }}
      >
        <motion.div
          key={currentProfile}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="aspect-[4/5] relative overflow-hidden"
        >
          <img 
            src={profile.image}
            alt="Profile Preview" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="p-4 bg-white">
          <motion.p
            key={profile.bio}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-800 font-medium text-lg"
          >
            {profile.bio}
          </motion.p>
          
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
            <motion.button 
              className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
            
            <motion.button 
              className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full text-red-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={24} />
            </motion.button>
            
            <motion.button 
              className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full text-blue-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Star size={24} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePreview;