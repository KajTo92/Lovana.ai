import { useState } from 'react';
import { motion } from 'framer-motion';
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            {mode === 'login' ? 'Welcome Back' : 'Join Lovana.ai'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {mode === 'login'
              ? 'Sign in to access your profile analysis and message assistance'
              : 'Create an account to start improving your dating profile'}
          </p>
        </motion.div>

        <AuthForm type={mode} />

        <div className="mt-8 text-center">
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-primary underline"
          >
            {mode === 'login'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;