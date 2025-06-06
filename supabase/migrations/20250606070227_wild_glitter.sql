/*
  # Add subscription fields to profiles table

  1. New Columns
    - `subscription_status` (text) - tracks if user has active subscription
    - `subscription_id` (text) - stores Stripe subscription ID
    - `usage_counts` (jsonb) - tracks usage for free tier limits

  2. Security
    - Update RLS policies to include new fields
*/

-- Add subscription fields to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'subscription_status'
  ) THEN
    ALTER TABLE profiles ADD COLUMN subscription_status text DEFAULT 'free';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'subscription_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN subscription_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'usage_counts'
  ) THEN
    ALTER TABLE profiles ADD COLUMN usage_counts jsonb DEFAULT '{"photo_analysis": 0, "bio_analysis": 0, "message_assistance": 0, "first_message": 0}';
  END IF;
END $$;

-- Update RLS policies to allow users to read their subscription status
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);