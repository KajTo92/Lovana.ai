import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface SubscriptionData {
  status: 'free' | 'active' | 'canceled';
  usageCounts: {
    photo_analysis: number;
    bio_analysis: number;
    message_assistance: number;
    first_message: number;
  };
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData>({
    status: 'free',
    usageCounts: {
      photo_analysis: 0,
      bio_analysis: 0,
      message_assistance: 0,
      first_message: 0,
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_status, usage_counts')
        .eq('id', user.id)
        .single();

      if (profile) {
        setSubscription({
          status: profile.subscription_status || 'free',
          usageCounts: profile.usage_counts || {
            photo_analysis: 0,
            bio_analysis: 0,
            message_assistance: 0,
            first_message: 0,
          },
        });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const canUseFeature = (feature: keyof SubscriptionData['usageCounts']) => {
    if (subscription.status === 'active') return true;
    return subscription.usageCounts[feature] < 1;
  };

  const incrementUsage = async (feature: keyof SubscriptionData['usageCounts']) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const newCounts = {
        ...subscription.usageCounts,
        [feature]: subscription.usageCounts[feature] + 1,
      };

      await supabase
        .from('profiles')
        .update({ usage_counts: newCounts })
        .eq('id', user.id);

      setSubscription(prev => ({
        ...prev,
        usageCounts: newCounts,
      }));
    } catch (error) {
      console.error('Error updating usage:', error);
    }
  };

  return {
    subscription,
    loading,
    canUseFeature,
    incrementUsage,
    refetch: fetchSubscription,
  };
};