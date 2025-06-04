import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  linkTo: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
  buttonText,
  linkTo,
}: FeatureCardProps) => {
  return (
    <motion.div
      className="feature-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col h-full">
        <div className="text-primary mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <Link to={linkTo} className="btn-primary inline-block text-center">
          {buttonText}
        </Link>
      </div>
    </motion.div>
  );
};

export default FeatureCard;