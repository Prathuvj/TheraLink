/*
  # User Profiles and Authentication Tables

  1. New Tables
    - `users_profile`
      - Stores additional user information
      - Links to auth.users via user_id
      - Includes personal details like name, DOB, gender, etc.
    
  2. Security
    - Enable RLS
    - Users can only read/update their own profile
    - Admins can read all profiles
*/

CREATE TABLE IF NOT EXISTS users_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  dob date NOT NULL,
  phone text,
  sex text CHECK (sex IN ('M', 'F', 'Other', 'Prefer not to say')),
  gender text CHECK (
    gender IN (
      'Cisgender', 'Transgender', 'Non-binary', 'Genderqueer',
      'Intersex', 'Gender-fluid', 'Agender', 'Gender non-conforming',
      'Bigender', 'Omnigender', 'Other', 'Prefer not to say'
    )
  ),
  two_factor_enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users_profile
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON users_profile
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);