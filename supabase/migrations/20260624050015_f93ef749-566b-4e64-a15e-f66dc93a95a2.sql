
CREATE TABLE public.blessings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (length(trim(name)) > 0 AND length(name) <= 80),
  message TEXT NOT NULL CHECK (length(trim(message)) > 0 AND length(message) <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.blessings TO anon, authenticated;
GRANT ALL ON public.blessings TO service_role;

ALTER TABLE public.blessings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blessings"
  ON public.blessings FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit a blessing"
  ON public.blessings FOR INSERT
  WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.blessings;

CREATE INDEX blessings_created_at_idx ON public.blessings (created_at DESC);
