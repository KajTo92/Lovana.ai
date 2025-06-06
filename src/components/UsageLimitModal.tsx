import { motion } from 'framer-motion';
import { X, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UsageLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

const UsageLimitModal = ({ isOpen, onClose, feature }: UsageLimitModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-xl shadow-xl max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Usage Limit Reached</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <p className="text-gray-600 mb-4">
              You've used your free {feature} analysis. Upgrade to Premium for unlimited access to all features!
            </p>
          </div>

          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-4 mb-6 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-5 h-5" />
              <span className="font-semibold">Premium Benefits</span>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Unlimited photo analysis</li>
              <li>• Unlimited bio improvements</li>
              <li>• Unlimited message assistance</li>
              <li>• Priority support</li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Maybe Later
            </button>
            <Link
              to="/pricing"
              className="flex-1 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-center font-medium"
              onClick={onClose}
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UsageLimitModal;