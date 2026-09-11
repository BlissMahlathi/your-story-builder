CREATE TYPE public.app_role AS ENUM ('admin', 'editor');
CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE public.enquiry_type AS ENUM ('contact', 'quote');
CREATE TYPE public.enquiry_status AS ENUM ('new', 'in_progress', 'responded', 'closed');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE POLICY "Users can read own roles" ON public.user_roles
FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can read all roles" ON public.user_roles
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can assign roles" ON public.user_roles
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can remove roles" ON public.user_roles
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  claimed boolean := false;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  PERFORM pg_advisory_xact_lock(845621);
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (auth.uid(), 'admin');
    claimed := true;
  ELSIF public.has_role(auth.uid(), 'admin') THEN
    claimed := true;
  END IF;
  RETURN claimed;
END;
$$;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;

CREATE TABLE public.service_divisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (char_length(slug) BETWEEN 2 AND 80),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  summary text NOT NULL DEFAULT '' CHECK (char_length(summary) <= 600),
  icon text NOT NULL DEFAULT 'briefcase' CHECK (char_length(icon) <= 40),
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.service_divisions TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.service_divisions TO authenticated;
GRANT ALL ON public.service_divisions TO service_role;
ALTER TABLE public.service_divisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published divisions are public" ON public.service_divisions FOR SELECT TO anon, authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Staff manage divisions" ON public.service_divisions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  division_id uuid NOT NULL REFERENCES public.service_divisions(id) ON DELETE CASCADE,
  slug text NOT NULL UNIQUE CHECK (char_length(slug) BETWEEN 2 AND 100),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 140),
  description text NOT NULL DEFAULT '' CHECK (char_length(description) <= 1200),
  capabilities jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published services are public" ON public.services FOR SELECT TO anon, authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Staff manage services" ON public.services FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (char_length(slug) BETWEEN 2 AND 120),
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 180),
  excerpt text NOT NULL DEFAULT '' CHECK (char_length(excerpt) <= 500),
  body text NOT NULL DEFAULT '' CHECK (char_length(body) <= 50000),
  category text NOT NULL DEFAULT 'Company News' CHECK (char_length(category) <= 80),
  cover_url text CHECK (cover_url IS NULL OR char_length(cover_url) <= 1000),
  author_name text NOT NULL DEFAULT 'Shammah Innovation Holdings' CHECK (char_length(author_name) <= 120),
  status public.content_status NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.posts TO authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published posts are public" ON public.posts FOR SELECT TO anon, authenticated USING ((status = 'published' AND (published_at IS NULL OR published_at <= now())) OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Staff manage posts" ON public.posts FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 2 AND 160),
  description text NOT NULL DEFAULT '' CHECK (char_length(description) <= 800),
  category text NOT NULL DEFAULT 'Projects' CHECK (char_length(category) <= 80),
  image_url text NOT NULL CHECK (char_length(image_url) <= 1000),
  alt_text text NOT NULL CHECK (char_length(alt_text) BETWEEN 2 AND 240),
  project_date date,
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.gallery_items TO authenticated;
GRANT ALL ON public.gallery_items TO service_role;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published gallery is public" ON public.gallery_items FOR SELECT TO anon, authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Staff manage gallery" ON public.gallery_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 2 AND 160),
  category text NOT NULL DEFAULT 'Company Document' CHECK (char_length(category) <= 80),
  description text NOT NULL DEFAULT '' CHECK (char_length(description) <= 800),
  file_url text NOT NULL CHECK (char_length(file_url) <= 1000),
  sort_order integer NOT NULL DEFAULT 0,
  status public.content_status NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.documents TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published documents are public" ON public.documents FOR SELECT TO anon, authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Staff manage documents" ON public.documents FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.site_settings (
  key text PRIMARY KEY CHECK (char_length(key) BETWEEN 2 AND 80),
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_public boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public settings are visible" ON public.site_settings FOR SELECT TO anon, authenticated USING (is_public OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Staff manage settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type public.enquiry_type NOT NULL,
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  company_name text NOT NULL DEFAULT '' CHECK (char_length(company_name) <= 160),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 255),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 40),
  service_requested text NOT NULL DEFAULT '' CHECK (char_length(service_requested) <= 160),
  subject text NOT NULL DEFAULT '' CHECK (char_length(subject) <= 200),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 5000),
  quantity text NOT NULL DEFAULT '' CHECK (char_length(quantity) <= 100),
  budget text NOT NULL DEFAULT '' CHECK (char_length(budget) <= 100),
  timeline text NOT NULL DEFAULT '' CHECK (char_length(timeline) <= 120),
  location text NOT NULL DEFAULT '' CHECK (char_length(location) <= 240),
  attachment_url text CHECK (attachment_url IS NULL OR char_length(attachment_url) <= 1000),
  status public.enquiry_status NOT NULL DEFAULT 'new',
  internal_notes text NOT NULL DEFAULT '' CHECK (char_length(internal_notes) <= 5000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.enquiries TO authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit enquiries" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (status = 'new' AND internal_notes = '');
CREATE POLICY "Staff manage enquiries" ON public.enquiries FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER service_divisions_updated BEFORE UPDATE ON public.service_divisions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER services_updated BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER posts_updated BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER gallery_items_updated BEFORE UPDATE ON public.gallery_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER documents_updated BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER site_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER enquiries_updated BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.service_divisions (slug, name, summary, icon, sort_order) VALUES
('it-design', 'IT & Design Services', 'Digital infrastructure, software, websites, branding, drafting and smart technology solutions.', 'monitor-cog', 1),
('built-environment', 'Built Environment', 'Civil construction, geotechnical investigation, town planning and integrated development consultation.', 'building-2', 2),
('engineering', 'Integrated Engineering', 'Mechanical, electrical, chemical, industrial, mechatronics and mining engineering expertise.', 'cog', 3),
('agri-tech', 'Agriculture & Agri-Tech', 'Water, irrigation, smart farming, livestock systems and farm infrastructure built for modern agriculture.', 'sprout', 4),
('occupational-health', 'Medical & Occupational Health', 'Compliant workforce medicals, surveillance, on-site healthcare, hygiene and wellness programmes.', 'heart-pulse', 5),
('logistics', 'Logistics & Transport', 'Equipment, materials and people moved from workshop to worksite safely and without delay.', 'truck', 6),
('risk-legal', 'Insurance, Risk, Legal & Compliance', 'Business and workforce insurance, contracts, tenders, labour, property and regulatory advisory.', 'shield-check', 7);

INSERT INTO public.services (division_id, slug, name, description, capabilities, sort_order)
SELECT id, 'it-infrastructure', 'IT Infrastructure Support', 'Reliable technology foundations for offices, farms, clinics and industrial sites.', '["Office and site networks","Wi-Fi installation","CCTV, GPS tracking and access control","Cloud backup and cybersecurity","On-site and remote support"]'::jsonb, 1 FROM public.service_divisions WHERE slug='it-design'
UNION ALL SELECT id, 'digital-systems', 'Software & Digital Presence', 'Practical business systems and digital channels that improve operations and visibility.', '["Accounting and payroll systems","Project and inventory systems","IoT dashboards and automation","Website and e-commerce development","Google Business and digital marketing"]'::jsonb, 2 FROM public.service_divisions WHERE slug='it-design'
UNION ALL SELECT id, 'design-branding', 'Design, Branding & Drafting', 'Professional brand materials and accurate technical documentation.', '["Brand identity and company profiles","Tender and safety file design","AutoCAD mechanical, electrical and civil drawings","3D rendering and as-built drawings","Vehicle branding and site boards"]'::jsonb, 3 FROM public.service_divisions WHERE slug='it-design'
UNION ALL SELECT id, 'civil-construction', 'Civil Engineering & Construction', 'Design, build, maintenance and supervision for public and private infrastructure.', '["Residential, commercial and industrial construction","Water, sewer, roads and stormwater","Concrete works and earthworks","Structural assessment and supervision","BoQ, costing and safety compliance"]'::jsonb, 1 FROM public.service_divisions WHERE slug='built-environment'
UNION ALL SELECT id, 'geology-planning', 'Geology, Geotechnical & Planning', 'Ground intelligence and statutory planning for confident development decisions.', '["Geotechnical site investigations","Borehole siting and groundwater assessment","Dolomite and contamination studies","Township establishment and rezoning","SPLUMA and municipal approvals"]'::jsonb, 2 FROM public.service_divisions WHERE slug='built-environment'
UNION ALL SELECT id, 'development-advisory', 'Integrated Development Advisory', 'Multi-disciplinary planning and tender support for complex developments.', '["Feasibility studies","Infrastructure master planning","Water services development planning","Integrated civil, electrical and mechanical planning","Tender documentation and bid support"]'::jsonb, 3 FROM public.service_divisions WHERE slug='built-environment'
UNION ALL SELECT id, 'mechanical-electrical', 'Mechanical & Electrical Engineering', 'Installation, repair and maintenance across pumps, plant, power and control systems.', '["Pump reconditioning and installation","Machining, fabrication and welding","Industrial and domestic electrical installation","Control panels, motor rewinding and fault finding","Solar, generators, UPS and compliance audits"]'::jsonb, 1 FROM public.service_divisions WHERE slug='engineering'
UNION ALL SELECT id, 'process-automation', 'Process, Chemical & Automation', 'Efficient treatment, monitoring and automation systems for industrial operations.', '["Water and wastewater treatment","Chemical dosing and SANS 241 compliance","Process and workflow optimisation","PLC, SCADA and IoT controls","Maintenance planning and quality systems"]'::jsonb, 2 FROM public.service_divisions WHERE slug='engineering'
UNION ALL SELECT id, 'mining-consulting', 'Mining & General Engineering', 'Integrated technical support for mining, infrastructure and industrial projects.', '["Mine dewatering and pump maintenance","Mine planning and environmental monitoring","DMRE compliance and rehabilitation","Integrated engineering design","Project management and technical reports"]'::jsonb, 3 FROM public.service_divisions WHERE slug='engineering'
UNION ALL SELECT id, 'agri-water', 'Water & Irrigation', 'Borehole-to-harvest water systems designed for reliable, efficient production.', '["Borehole siting and yield testing","Solar pump systems","Water storage and treatment","Drip, sprinkler and centre pivot irrigation","HDPE and PVC farm networks"]'::jsonb, 1 FROM public.service_divisions WHERE slug='agri-tech'
UNION ALL SELECT id, 'smart-farming', 'Smart Farming & Livestock Systems', 'Connected farm systems that help save water and manage operations from a phone.', '["Remote tank, pump and flow monitoring","Soil moisture and weather sensing","Hydroponics and greenhouse controls","Livestock watering and dairy equipment","Poultry ventilation and heating"]'::jsonb, 2 FROM public.service_divisions WHERE slug='agri-tech'
UNION ALL SELECT id, 'farm-maintenance', 'Farm Power, Maintenance & Compliance', 'Technical upkeep and business support for resilient farming operations.', '["Farm electrical, solar and generators","Cold rooms and packhouses","Equipment repair and fabrication","Water licences and quality audits","Agri-business plans and training"]'::jsonb, 3 FROM public.service_divisions WHERE slug='agri-tech'
UNION ALL SELECT id, 'medical-fitness', 'Medical Fitness & Surveillance', 'Doctor-led, compliant medical assessments for industrial workforces.', '["Pre-employment, annual and exit medicals","Working at heights and confined space fitness","Audiometry, spirometry and vision screening","Risk-based surveillance programmes","Certificates of fitness"]'::jsonb, 1 FROM public.service_divisions WHERE slug='occupational-health'
UNION ALL SELECT id, 'site-healthcare', 'Site Healthcare & Occupational Hygiene', 'Practical healthcare and exposure management where people work.', '["On-site clinic setup and staffing","Emergency response planning","Chronic disease management","Workplace health risk assessments","Biological and ergonomic monitoring"]'::jsonb, 2 FROM public.service_divisions WHERE slug='occupational-health'
UNION ALL SELECT id, 'health-compliance', 'Health Compliance, Wellness & Training', 'Documentation, audit readiness and workforce wellbeing programmes.', '["Medical records and compliance files","DOL and DMRE audit preparation","HIV, TB and substance programmes","First aid training coordination","Mental health and fatigue awareness"]'::jsonb, 3 FROM public.service_divisions WHERE slug='occupational-health'
UNION ALL SELECT id, 'equipment-logistics', 'Engineering Equipment Logistics', 'Specialist transport for the machinery and materials that keep sites moving.', '["Pump and heavy equipment transport","Construction material delivery","Chemical transport","Workshop-to-site spares delivery","Emergency breakdown transport"]'::jsonb, 1 FROM public.service_divisions WHERE slug='logistics'
UNION ALL SELECT id, 'fleet-supply-chain', 'Fleet, Warehousing & Supply Chain', 'Managed fleet and inventory support that reduces downtime.', '["Vehicle hire with drivers","Client fleet management","Spares and chemical warehousing","Just-in-time site delivery","Procurement and expediting"]'::jsonb, 2 FROM public.service_divisions WHERE slug='logistics'
UNION ALL SELECT id, 'site-courier', 'Site Logistics & Compliance Courier', 'Coordinated site establishment, specialist delivery and documented tracking.', '["Site establishment and demobilisation","Agricultural and medical delivery","Tender and safety-file courier","Sample transport","Proof of delivery and tracking"]'::jsonb, 3 FROM public.service_divisions WHERE slug='logistics'
UNION ALL SELECT id, 'insurance-advisory', 'Employer & Employee Insurance', 'Practical risk cover that protects both the business and its people.', '["COIDA registration, claims and compliance","Contractor all-risk and public liability","Asset, fleet and equipment insurance","Group life, funeral and accident cover","Claims administration"]'::jsonb, 1 FROM public.service_divisions WHERE slug='risk-legal'
UNION ALL SELECT id, 'commercial-law', 'Corporate, Tender & Employment Law', 'Contract-to-compliance support for tenders, partnerships and workforces.', '["Company and shareholder agreements","Contract drafting and vetting","Tender review and appeals","Employment contracts and HR policies","CCMA and compliance coordination"]'::jsonb, 2 FROM public.service_divisions WHERE slug='risk-legal'
UNION ALL SELECT id, 'regulatory-law', 'Mining, Water, Property & Risk Law', 'Specialist legal guidance across regulated projects and operating environments.', '["WULA and mining permit support","Environmental compliance","Construction claims and leases","Insurance disputes and debt recovery","POPIA and B-BBEE advisory"]'::jsonb, 3 FROM public.service_divisions WHERE slug='risk-legal';

INSERT INTO public.site_settings (key, value) VALUES
('company', '{"name":"Shammah Innovation Holdings","registration":"2013/045792/07","phone":"+27 65 592 2639","email":"shammahinnovation@gmail.com","website":"www.shammahinno.netlify.app","tagline":"Integrated infrastructure. Engineered progress.","address":"Johannesburg, Gauteng, South Africa","hours":"Monday – Friday, 08:00 – 17:00"}'),
('social', '{"facebook":"","instagram":"","linkedin":"","whatsapp":"27655922639"}'),
('home', '{"eyebrow":"Multi-disciplinary solutions","title":"Engineering progress across every operation","intro":"One trusted partner for infrastructure, engineering, technology, agriculture, health, logistics and compliance."}');

INSERT INTO public.posts (slug, title, excerpt, body, category, status, published_at) VALUES
('integrated-solutions-one-accountable-partner', 'Integrated solutions. One accountable partner.', 'How Shammah brings technical disciplines together to reduce delays and improve delivery.', 'Complex projects move faster when engineering, logistics, technology and compliance work as one. Shammah Innovation Holdings coordinates specialist teams around one clear outcome: a safer, stronger and more reliable operation.', 'Company News', 'published', now()),
('smart-water-systems-for-modern-farms', 'Smart water systems for modern farms', 'From borehole siting to phone-controlled irrigation, practical technology can protect every litre.', 'Modern agriculture needs clear visibility over water, energy and equipment. Our integrated Agri-Tech approach connects pumps, tanks, soil sensors and irrigation controls so teams can respond faster and use resources responsibly.', 'Industry Insights', 'published', now()),
('building-compliance-into-every-project', 'Building compliance into every project', 'Why safety files, contracts and technical approvals belong in the project plan from day one.', 'Compliance should not be a last-minute document exercise. By planning legal, safety, quality and insurance requirements alongside design and delivery, project teams reduce risk and create a stronger record of accountability.', 'Safety & Compliance', 'published', now());