-- This schema is intentionally simplified and does not use RLS for this project.

-- Create a custom type for the brand status
CREATE TYPE brand_status AS ENUM ('pending', 'approved', 'rejected');

-- Create a simplified 'brands' table
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    name TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    description TEXT NOT NULL,
    contact TEXT NOT NULL,
    socials TEXT,
    status brand_status DEFAULT 'pending' NOT NULL,
    website_url TEXT,
    generated_description TEXT,
    website_prompt TEXT,
    logo_url TEXT
);

-- Create a simplified 'metrics' table
CREATE TABLE metrics (
    id INT PRIMARY KEY,
    goal INT NOT NULL,
    raised INT NOT NULL,
    slots INT NOT NULL
);

-- Insert the single row of initial metrics data
INSERT INTO metrics (id, goal, raised, slots) VALUES (1, 1000000, 0, 100);
