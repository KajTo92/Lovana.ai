import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface PhotoGridProps {
  photos: string[];
  onSelectBest: (selectedIndices: number[]) => void;
}

const PhotoGrid = ({ photos, onSelectBest }: PhotoGridProps) => {
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);

  const toggleSelect = (index: number) => {
    if (selectedPhotos.includes(index)) {
      setSelectedPhotos(selectedPhotos.filter(i => i !== index));
    } else {
      setSelectedPhotos([...selectedPhotos, index]);
    }
  };

  const handleSubmit = () => {
    onSelectBest(selectedPhotos);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">Select Your Best Photos</h3>
        <p className="text-gray-600 mb-6">Choose up to 3 photos to include in your profile</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleSelect(index)}
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all ${
                  selectedPhotos.includes(index)
                    ? 'bg-primary/60'
                    : 'bg-gray-900/0 group-hover:bg-gray-900/30'
                }`}
              >
                {selectedPhotos.includes(index) && (
                  <Check className="text-white\" size={32} />
                )}
              </div>
              
              {selectedPhotos.includes(index) && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                  <X
                    size={16}
                    className="text-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(index);
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6">
          <button
            className="btn-primary w-full"
            disabled={selectedPhotos.length === 0}
            onClick={handleSubmit}
          >
            Analyze Selected Photos
          </button>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Selected {selectedPhotos.length} of {photos.length} photos
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoGrid;