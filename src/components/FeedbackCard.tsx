import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface FeedbackItem {
  type: 'positive' | 'suggestion' | 'info';
  text: string;
}

interface FeedbackCardProps {
  title: string;
  items: FeedbackItem[];
  score?: number;
}

const FeedbackCard = ({ title, items, score }: FeedbackCardProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle size={18} className="text-green-500 flex-shrink-0" />;
      case 'suggestion':
        return <AlertTriangle size={18} className="text-amber-500 flex-shrink-0" />;
      case 'info':
        return <Info size={18} className="text-blue-500 flex-shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{title}</h3>
          {score !== undefined && (
            <div className="bg-primary/10 text-primary font-bold rounded-full w-12 h-12 flex items-center justify-center">
              {score}/10
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              {getIcon(item.type)}
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FeedbackCard;