import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

const PricingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('free');

  const handleSubscribe = async () => {
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Redirect to auth if not logged in
        window.location.href = '/auth';
        return;
      }

      // Create Stripe checkout session
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          priceId: 'price_premium_monthly', // This would be your actual Stripe price ID
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out our AI-powered dating assistance',
      features: [
        '1 photo analysis per account',
        '1 bio analysis per account', 
        '1 first message generation per account',
        '1 conversation assistance per account',
        'Basic AI recommendations',
        'Community support'
      ],
      limitations: [
        'Limited to one use per feature',
        'No priority support',
        'Basic analysis depth'
      ],
      buttonText: 'Get Started Free',
      popular: false,
      color: 'gray'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$7',
      period: 'per month',
      description: 'Unlimited access to all features for serious daters',
      features: [
        'Unlimited photo analysis',
        'Unlimited bio improvements',
        'Unlimited first message generation',
        'Unlimited conversation assistance',
        'Advanced AI recommendations',
        'Multiple conversation styles',
        'Priority customer support',
        'Early access to new features',
        'Detailed analytics and insights',
        'Profile optimization tips'
      ],
      limitations: [],
      buttonText: 'Start Premium',
      popular: true,
      color: 'primary'
    }
  ];

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container-custom">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade when you're ready to unlock unlimited AI-powered dating assistance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-primary' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star size={16} />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="font-semibold text-gray-600 mb-3">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start space-x-3">
                            <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mx-auto mt-1.5"></div>
                            </div>
                            <span className="text-gray-600 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  onClick={plan.id === 'premium' ? handleSubscribe : () => window.location.href = '/photo-analysis'}
                  disabled={isLoading && plan.id === 'premium'}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  } ${isLoading && plan.id === 'premium' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading && plan.id === 'premium' ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    plan.buttonText
                  )}
                </button>

                {plan.id === 'premium' && (
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Cancel anytime. No hidden fees.
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan anytime?</h3>
              <p className="text-gray-600">
                Yes! You can upgrade to Premium anytime to unlock unlimited features. You can also cancel your Premium subscription at any time.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="font-semibold mb-2">What happens to my data if I cancel?</h3>
              <p className="text-gray-600">
                Your account and previous analyses remain accessible. You'll simply return to the free tier limitations for new analyses.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="font-semibold mb-2">Is my payment information secure?</h3>
              <p className="text-gray-600">
                Absolutely. We use Stripe for secure payment processing and never store your payment information on our servers.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;