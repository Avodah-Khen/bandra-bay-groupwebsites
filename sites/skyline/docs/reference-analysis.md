# Reference Analysis — adanirealty.com/residential-projects/mumbai/linkbay-residences

## Method

`web_fetch` was used against the reference URL. Unlike a fully opaque client-rendered SPA, this
fetch returned readable page content (not just metadata), which let this analysis be grounded in
actual observed structure rather than assumption. It was **not** a full crawl — no DevTools network
inspection, no JS execution trace, no interaction testing (clicking the EMI calculator, submitting
the enquiry form, etc.) was possible from a text fetch. Anything not directly observable in the
fetched content is marked **UNVERIFIED** below rather than invented.

## What was observed (paraphrased structure, not reproduced copy)

The reference page is a single-project luxury-residential microsite with, in observed order:
a header/nav, a hero area naming the project and location, a project overview with developer/
status/configuration information, an amenities section organized by category, a configurations
section listing BHK types, a location/connectivity section describing nearby landmarks, a gallery,
an EMI-calculator concept, an FAQ section, and multiple lead-capture touchpoints (enquiry, callback,
brochure download) plus footer contact/social/legal information. This matches the section list the
brief itself specifies, which is what this build's `ProjectPage` component structure is based on.

## What was NOT verifiable from a text fetch — UNVERIFIED

- Exact DOM structure, CSS classes, animation/transition implementation
- Exact copy, headlines, and marketing language (and this build must not reproduce it verbatim —
  see "Content decision" below)
- Client-side JS behavior: whether the EMI calculator is client-computed or server-computed, exact
  slider/input behavior, form validation messages, loading states, error states
- Network requests: which endpoints the enquiry form posts to, what fields it sends, response
  handling, any third-party tag manager / analytics / CRM integration calls
- Image assets, floor plan files, brochure file handling (signed URL vs. static link)
- Responsive breakpoint behavior, exact mobile menu implementation
- Whether/how a real map (Google Maps or otherwise) is embedded in the location section
- Real RERA registration details, real pricing, real possession date, real tower count
- Whether lead capture happens before or after brochure download, and whether any CAPTCHA/anti-bot
  mechanism is present

## Content decision — why this build does not reuse the reference brand/copy

The brief explicitly prohibits copying proprietary source code, private APIs, or copyrighted assets,
and requires "clearly marked placeholder/demo data" where real data is unavailable. Beyond the
letter of that instruction, reusing Adani Realty's trademarked project name ("Linkbay Residences"),
their specific RERA number, or their marketing copy as content inside an independently-built,
unaffiliated demo platform would misrepresent the demo as connected to or authorized by the real
developer — which it is not. This build instead seeds an **original fictional project** ("Skyline
Bay Residences" by "Meridian Realty") that follows the same *category* of information architecture
(2/3/4 BHK configurations, the same amenity/location/FAQ categories) without reproducing any of the
reference site's specific protected content. See `prisma/seed.ts` for the full disclosure comment
and content.

## Functional requirements used instead

Because the brief's own section-by-section functional specification (sections 5–41 of the prompt)
is more detailed and complete than what a text fetch of the reference site could verify, this build
was implemented against that specification directly, treating the reference site as context for
*category* of features (a luxury single-project microsite with an integrated CRM) rather than as a
pixel/copy source. Where the brief and the fetch agreed (section list, CTA types, lead-generation
flow), that's reflected directly in `src/components/ProjectPage.tsx`.
