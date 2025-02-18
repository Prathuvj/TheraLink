/*
  # Create therapists table

  1. New Tables
    - `therapists`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `specialization` (text)
      - `availability` (text)
      - `bio` (text)
      - `image_url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `therapists` table
    - Add policy for public read access
    - Add policy for admin insert/update
*/

CREATE TABLE IF NOT EXISTS therapists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  specialization text NOT NULL,
  availability text NOT NULL,
  bio text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE therapists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON therapists
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated admin users to insert and update"
  ON therapists
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@theralink.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@theralink.com');