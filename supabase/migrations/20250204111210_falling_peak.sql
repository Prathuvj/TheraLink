/*
  # Self-Assessment System

  1. New Tables
    - `assessments`
      - Stores assessment questions and metadata
    - `assessment_questions`
      - Stores individual questions for each assessment
    - `user_assessments`
      - Stores user responses to assessments
    
  2. Security
    - Enable RLS
    - Anyone can read assessments
    - Only authenticated users can submit responses
    - Users can only view their own responses
*/

CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS assessment_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES assessments(id) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb NOT NULL,
  order_number integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id uuid REFERENCES assessments(id) ON DELETE CASCADE,
  responses jsonb NOT NULL,
  score integer,
  completed_at timestamptz DEFAULT now()
);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_assessments ENABLE ROW LEVEL SECURITY;

-- Policies for assessments and questions
CREATE POLICY "Anyone can view assessments"
  ON assessments
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view assessment questions"
  ON assessment_questions
  FOR SELECT
  TO public
  USING (true);

-- Policies for user responses
CREATE POLICY "Users can view own assessment responses"
  ON user_assessments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can submit assessment responses"
  ON user_assessments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);