/*
  # Anonymous Discussion System

  1. New Tables
    - `discussions`
      - Stores discussion threads
    - `discussion_replies`
      - Stores replies to discussions
    
  2. Security
    - Enable RLS
    - Anyone can read discussions
    - Only authenticated users can create/update their own posts
*/

CREATE TABLE IF NOT EXISTS discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  anonymous boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS discussion_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid REFERENCES discussions(id) ON DELETE CASCADE,
  content text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  anonymous boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_replies ENABLE ROW LEVEL SECURITY;

-- Policies for discussions
CREATE POLICY "Anyone can read discussions"
  ON discussions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create discussions"
  ON discussions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own discussions"
  ON discussions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for replies
CREATE POLICY "Anyone can read replies"
  ON discussion_replies
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create replies"
  ON discussion_replies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own replies"
  ON discussion_replies
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);