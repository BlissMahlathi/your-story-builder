# Shammah Innovation Holdings website

## Goal
Build a complete navy-and-gold corporate website based on the supplied visual references, using the operational strategy PDF as the source of truth. Add a secure management area for updating all website content, uploading media and documents, and reviewing enquiries.

## Public website
- Create Home, About, Services, Gallery, News & Blog, Contact, and Get a Quote pages.
- Match the reference theme: deep navy foundation, warm gold accents, crisp white content areas, angular image transitions, compact business typography, and structured footers.
- Use the PDF’s real company registration, phone, email, and seven service divisions:
  - IT & Design Services
  - Built Environment
  - Integrated Engineering
  - Agriculture & Agri-Tech
  - Medical & Occupational Health
  - Logistics & Transport
  - Insurance, Risk, Legal & Compliance
- Make services easy to browse with division filters and detailed capability lists.
- Include working contact and quote forms with clear validation and confirmation states.
- Build responsive navigation and layouts for desktop, tablet, and mobile.

## Content management
- Add secure email/password sign-in for staff.
- Add a protected management dashboard for:
  - Services and service divisions
  - News and blog posts, drafts, publishing dates, and cover images
  - Gallery albums and photos
  - Downloadable documents
  - Company details and reusable page content
  - Contact and quote requests, including status tracking
- The first authenticated account can securely claim the initial administrator role; later accounts have no access unless assigned a role.
- Store roles separately from profiles and verify permissions on the server for every management action.

## Backend and uploads
- Create database tables for all managed content and enquiries, with strict access rules.
- Publish only approved content publicly; drafts remain visible only in the management area.
- Add managed file storage for images and documents with file type and size restrictions.
- Save every contact and quote request and create email notifications to the company inbox.
- Protect forms with client and server validation, length limits, and safe file handling.

## Visual assets
- Use the uploaded screenshots only as design references.
- Create a cohesive set of original construction, engineering, logistics, technology, agriculture, and workplace imagery for the public pages.
- Use a clean typographic company mark until an official logo file is supplied; the management area will allow replacement branding uploads.

## Technical details
- Implement the site in the existing TanStack Start application with reusable public layouts and management controls.
- Use Lovable Cloud for authentication, database records, request storage, and media/document storage.
- Use server functions for protected management operations and public submissions.
- Add per-page metadata, accessible labels, image alt text, semantic headings, and mobile-safe layouts.
- Seed the service catalogue from the supplied PDF so the first version is complete immediately.

## Verification
- Verify public navigation, service filtering, forms, sign-in, first-admin setup, content publishing, uploads, and enquiry status changes.
- Check the final experience at desktop and mobile sizes and resolve any layout, console, network, or accessibility issues.
