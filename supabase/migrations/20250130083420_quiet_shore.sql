/*
  # Create articles table for mental health resources

  1. New Tables
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `url` (text, not null)
      - `preview` (text, not null)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `articles` table
    - Add policy for public read access
    - Add policy for authenticated users to insert articles
*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text NOT NULL,
  preview text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON articles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);