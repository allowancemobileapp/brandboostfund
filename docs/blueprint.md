# **App Name**: BrandBoost Fund

## Core Features:

- Brand Registration Form: Capture brand details (name, description, contact info) via a public form and store in the database for review.
- Fundraiser Metrics Display: Show the fundraiser's current goal, amount raised, amount left, and available slots on the landing page. These metrics can be adjusted via a protected admin endpoint.
- Approved Brands Showcase: Display a list of approved brands with their website URLs on the landing page.
- Registration Approval Workflow: Admin interface or direct database access to review pending registrations and approve/reject submissions, updating the website URL and featured status. Offers ability to edit data manually via database access.
- Protected Metrics Update: Provide a protected API endpoint (behind an API key) for admins to update fundraiser metrics such as the goal amount, total raised, and available slots.
- AI-Powered Brand Description Tool: Utilize generative AI as a tool, within the approval workflow, to create improved brand descriptions for brands with a status of 'approved'. This feature offers an enhanced description while listing approved brands, ensuring that each brand has an engaging profile.

## Style Guidelines:

- Primary color: Black (#000000), creating a sleek and modern aesthetic.
- Secondary color: Pink (#FF69B4), adding a vibrant and eye-catching contrast.
- Background color: Light gray (#F0F4F8), providing a clean and neutral backdrop.
- Accent color: Bright green (#90EE90), used sparingly to highlight key actions or information.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines, and 'Inter' (sans-serif) for body text.
- Simple, clear icons to represent different aspects of the fundraiser and brand registration process. Ensure icons are scalable and consistent with the overall design.
- Mobile-first, responsive design with a clear visual hierarchy. Important information (metrics, CTA) should be immediately visible. Approved brands are displayed in a grid or list format.
- Subtle transitions and loading animations to improve user experience, especially when submitting the registration form or updating metrics.