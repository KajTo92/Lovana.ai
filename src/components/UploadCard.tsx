import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadCardProps {
  title: string;
  description: string;
  onUpload: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
}

const UploadCard = ({
  title,
  description,
  onUpload,
  accept = { 'image/*': [] },
  maxFiles = 1
}: UploadCardProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      onUpload(acceptedFiles);
      setIsUploading(false);
    }, 1500);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles
  });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <motion.div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input {...getInputProps()} />
          
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600">
                {isDragActive ? 'Drop the files here...' : 'Drag & drop files here, or click to select files'}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {maxFiles > 1 ? `Upload up to ${maxFiles} files` : 'Upload a file'}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UploadCard;