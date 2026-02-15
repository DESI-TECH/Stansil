
-- Create products table
CREATE TABLE public.products (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  name_hi TEXT,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  price NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  moq INTEGER NOT NULL DEFAULT 1,
  height TEXT,
  width TEXT,
  depth TEXT,
  weight TEXT,
  material TEXT,
  grade TEXT,
  capacity TEXT,
  thickness TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Everyone can read products
CREATE POLICY "Anyone can read products" ON public.products FOR SELECT USING (true);

-- Insert seed data with INR prices
INSERT INTO public.products (id, name, category, description, images, price, currency, moq, height, width, depth, weight, material, grade, capacity, thickness, in_stock, featured) VALUES
('ss-stock-pot-20l', 'Stainless Steel Stock Pot 20L', 'cookware', 'Heavy-duty stainless steel stock pot ideal for commercial kitchens and large-scale cooking. Triple-layered base for even heat distribution.', ARRAY['https://images.unsplash.com/photo-1584990347449-a4330bdd7823?w=600','https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600'], 3750, 'INR', 50, '30 cm', '32 cm', '32 cm', '3.2 kg', 'SS 304', 'Food Grade', '20 Liters', '1.2 mm', true, true),
('ss-frying-pan-28', 'Stainless Steel Frying Pan 28cm', 'cookware', 'Professional-grade frying pan with ergonomic handle and induction-compatible base. Perfect for restaurants and hotels.', ARRAY['https://images.unsplash.com/photo-1592154395799-40b99c8e42d5?w=600','https://images.unsplash.com/photo-1574181617972-7b2f48c74f8e?w=600'], 1500, 'INR', 100, '6 cm', '28 cm', '28 cm', '1.1 kg', 'SS 304', 'Food Grade', NULL, '0.8 mm', true, true),
('ss-container-set', 'Airtight Storage Container Set (5 pcs)', 'containers', 'Set of 5 airtight stainless steel containers with silicone-sealed lids. Ideal for storing spices, grains, and dry foods.', ARRAY['https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?w=600','https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'], 2100, 'INR', 200, '8-16 cm (varies)', '10-18 cm (varies)', '10-18 cm (varies)', '2.5 kg (total set)', 'SS 201', 'Food Grade', '250ml to 2L', '0.5 mm', true, true),
('ss-serving-tray', 'Decorative Serving Tray - Oval', 'serving', 'Elegant oval serving tray with mirror-finish surface. Perfect for hotel buffets, catering, and fine dining.', ARRAY['https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600'], 999, 'INR', 200, '3 cm', '45 cm', '30 cm', '0.8 kg', 'SS 304', 'Food Grade', NULL, '0.6 mm', true, false),
('ss-ladle-set', 'Professional Ladle Set (3 pcs)', 'utensils', 'Set of 3 professional ladles with different capacities. Riveted handles for durability. Commercial kitchen grade.', ARRAY['https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600'], 650, 'INR', 500, '35-45 cm (varies)', '10-14 cm (varies)', '6-10 cm (varies)', '0.9 kg (total set)', 'SS 304', 'Food Grade', NULL, '1.0 mm', true, false),
('ss-gastronorm-pan', 'Gastronorm Pan GN 1/1 Full Size', 'commercial', 'Standard GN 1/1 full-size gastronorm pan for commercial food service. Steam table compatible.', ARRAY['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600'], 1250, 'INR', 100, '10 cm', '53 cm', '32.5 cm', '1.8 kg', 'SS 304', 'Food Grade', '14 Liters', '0.7 mm', true, true),
('ss-mixing-bowl-set', 'Mixing Bowl Set (4 pcs)', 'cookware', 'Nested stainless steel mixing bowls with non-slip silicone base. Perfect for commercial bakeries and food preparation.', ARRAY['https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600'], 1650, 'INR', 150, '8-18 cm (varies)', '16-30 cm (varies)', '16-30 cm (varies)', '3.0 kg (total set)', 'SS 304', 'Food Grade', '1L to 8L', '0.8 mm', true, false),
('ss-food-warmer', 'Chafing Dish / Food Warmer', 'commercial', 'Professional chafing dish with roll-top lid. Ideal for buffet service, hotels, and catering businesses.', ARRAY['https://images.unsplash.com/photo-1555244162-803834f70033?w=600'], 2900, 'INR', 50, '40 cm', '60 cm', '35 cm', '5.5 kg', 'SS 304', 'Food Grade', '9 Liters', '0.8 mm', true, true);
