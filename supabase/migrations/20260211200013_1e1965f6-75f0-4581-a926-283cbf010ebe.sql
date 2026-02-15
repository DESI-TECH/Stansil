
-- Create inquiries table for contact form submissions
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  country TEXT,
  product_interest TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public contact form)
CREATE POLICY "Anyone can submit inquiry"
ON public.inquiries
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read (admin uses hardcoded auth, not supabase auth)
CREATE POLICY "Anyone can read inquiries"
ON public.inquiries
FOR SELECT
USING (true);

-- Allow anyone to update (for marking as read)
CREATE POLICY "Anyone can update inquiries"
ON public.inquiries
FOR UPDATE
USING (true);

-- Enable realtime for inquiries
ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
