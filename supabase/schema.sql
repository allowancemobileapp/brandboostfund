-- Create a custom type for the brand status
CREATE TYPE brand_status AS ENUM ('pending', 'approved', 'rejected');

-- Create the brands table
CREATE TABLE
  brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    description TEXT NOT NULL,
    contact TEXT NOT NULL,
    socials TEXT,
    website_url TEXT,
    status brand_status DEFAULT 'pending' NOT NULL,
    featured BOOLEAN DEFAULT FALSE NOT NULL,
    generated_description TEXT,
    logo_url TEXT,
    website_prompt TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc'::TEXT, NOW()) NOT NULL
  );

-- Create a function to automatically update the 'updated_at' timestamp
CREATE OR REPLACE FUNCTION handle_updated_at () RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc', now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function when a row is updated
CREATE TRIGGER
  on_brands_updated
BEFORE UPDATE ON
  brands
FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at ();

-- Create the metrics table
CREATE TABLE
  metrics (
    id INT PRIMARY KEY,
    goal INT NOT NULL,
    raised INT NOT NULL,
    slots INT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone ('utc'::TEXT, NOW()) NOT NULL
  );

-- Insert the initial metrics data
INSERT INTO metrics (id, goal, raised, slots) VALUES (1, 1000000, 0, 100);

-- Create a trigger to update the metrics updated_at timestamp
CREATE TRIGGER
  on_metrics_updated
BEFORE UPDATE ON
  metrics
FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at ();

-- Enable Row-Level Security (RLS) for the tables
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access to brands" ON brands FOR
SELECT
  USING (TRUE);

CREATE POLICY "Allow public read access to metrics" ON metrics FOR
SELECT
  USING (TRUE);

-- By default, INSERT, UPDATE, DELETE are denied.
-- These operations should only be performed using the service_role key from the server.
