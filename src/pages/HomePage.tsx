import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Image, UserRound, MessageSquare, SendHorizonal, Star, Zap } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import ProfilePreview from '../components/ProfilePreview';

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                AI-Powered Dating Profile Analysis
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Improve your dating profile with insights on your photos and bio,
                and generate engaging replies for your matches.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/photo-analysis" 
                  className="btn-primary bg-white text-primary hover:bg-white/90"
                >
                  Analyze Your Profile
                </Link>
                <Link 
                  to="/pricing" 
                  className="btn-primary bg-transparent border-2 border-white hover:bg-white/10"
                >
                  View Pricing
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ProfilePreview rotate={true} />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-background py-16">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Lovana.ai Helps You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered tools analyze your dating profile and conversations to help you make meaningful connections.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Image size={40} />}
              title="Upload Profile Photos"
              description="Get feedback and recommendations on which photos to use for the best impression."
              buttonText="Analyze Photos"
              linkTo="/photo-analysis"
            />
            
            <FeatureCard 
              icon={<UserRound size={40} />}
              title="Enter Profile Bio"
              description="Receive analysis and suggestions to make your bio more engaging and attractive."
              buttonText="Analyze Bio"
              linkTo="/bio-analysis"
            />
            
            <FeatureCard 
              icon={<SendHorizonal size={40} />}
              title="Create First Message"
              description="Generate engaging first messages based on your match's profile to start conversations."
              buttonText="Get First Message"
              linkTo="/first-message"
            />
            
            <FeatureCard 
              icon={<MessageSquare size={40} />}
              title="Message Assistance"
              description="Let our AI help you respond to matches with engaging conversation starters."
              buttonText="Get Message Help"
              linkTo="/message-assistance"
            />
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and upgrade when you're ready for unlimited AI assistance.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="bg-gray-50 rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <div className="text-4xl font-bold mb-4">$0</div>
              <p className="text-gray-600 mb-6">Perfect for trying out our AI tools</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>1 analysis per feature</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>Basic recommendations</span>
                </li>
              </ul>
              <Link to="/photo-analysis" className="btn-primary bg-gray-200 text-gray-800 hover:bg-gray-300 w-full">
                Get Started Free
              </Link>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-primary to-primary/90 rounded-xl p-8 text-center text-white relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-accent text-gray-900 px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Star size={16} />
                  <span>Most Popular</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <div className="text-4xl font-bold mb-4">$7<span className="text-lg">/month</span></div>
              <p className="text-white/90 mb-6">Unlimited access to all features</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center justify-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Unlimited everything</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Advanced AI insights</span>
                </li>
                <li className="flex items-center justify-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link to="/pricing" className="btn-primary bg-white text-primary hover:bg-white/90 w-full">
                Start Premium
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lovana.ai uses advanced AI to analyze your dating profile and give you personalized feedback.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Content</h3>
              <p className="text-gray-600">
                Upload your profile photos, bio, or conversation screenshots to our secure platform.
              </p>
            </motion.div>
            
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your content to identify strengths and areas for improvement.
              </p>
            </motion.div>
            
            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive personalized recommendations to improve your dating success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Improve Your Dating Profile?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get started with Lovana.ai today and see the difference AI can make in your dating life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/photo-analysis" className="btn-primary bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
              Get Started Free
            </Link>
            <Link to="/pricing" className="btn-primary bg-transparent border-2 border-white hover:bg-white/10 text-lg px-8 py-4">
              View All Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;