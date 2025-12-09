# Piano à Tempo - Design Guidelines

## Design Approach
**Reference-Based Approach**: Inspired by luxury brand websites (Steinway & Sons, Cartier) with elegant animations and refined interactions. Professional, minimalist aesthetic reflecting competence and trust for discerning parents.

## Typography
- **Headings**: Playfair Display or Cinzel (serif) - conveys elegance and tradition
- **Body Text**: Lato or Open Sans (sans-serif) - modern readability
- **Hierarchy**: Large impactful titles, clear subheadings, comfortable body text sizing

## Layout System
- **Spacing**: Use Tailwind units of 4, 8, 16, and 24 for consistent rhythm
- **Container**: Max-width centered containers (max-w-6xl) with generous padding
- **Grid**: Responsive grids for programs (3 columns desktop, 1-2 tablet, 1 mobile)

## Color Palette
- **Primary**: Black (#000000) - sophistication and authority
- **Accent**: Gold (#D4AF37) - luxury and prestige, used for titles, CTAs, and hover states
- **Background**: White (#FFFFFF) - clean canvas for content
- **Application**: Black text on white, gold accents on interactive elements and key headings

## Core Components

### Language Toggle
- Fixed position top-right corner on all pages
- Format: "EN | FR" with active language in gold
- Instant content switching without page reload

### Navigation Header
- Links: Home, About, Teachers, Programs, Contact Us
- Smooth scroll anchors to page sections
- Gold underline animation on hover (slide-in effect from left)
- Sticky/fixed header on scroll

### Hero Section
- Full-width grand piano photograph (professional, dramatic lighting)
- Tagline overlay: "Where passion meets discipline" in large Playfair Display
- "Inquire now" CTA button with gold background, white text
- Button with backdrop blur when over image, subtle scale on hover
- Smooth scroll to Contact section on click

### Program Cards (6 total)
- Cards: Private Lessons, Group 7-9, Group 10-13, Group 13-17, Adult 18+, Adult/Retired Day
- Black border, white background
- Gold accent on title or icon
- Hover: Lift effect (translateY and shadow increase)
- Include age range, brief description, key benefits

### Teachers Section
- 2 teacher portraits in grid layout
- Black-and-white photography for timeless elegance
- Hover: Gold overlay with opacity transition, scale slight zoom
- Expandable biography sections (click to reveal full description)
- Name in Playfair Display, credentials beneath

### Testimonials
- Carousel/slider with parent quotes
- 3-4 short testimonials visible in rotation
- Auto-rotate with manual navigation controls
- Fade transition between testimonials
- Parent name and child's age beneath each quote

### Contact Section
- Split layout: Form on left, contact details/map on right
- Form fields: Name, Email, Phone, Message, Language Preference
- Gold submit button
- Contact info: Address, phone, email with icons
- Embedded Google Maps placeholder

### Footer
- Four columns: Quick Links (Policy, Information/FAQ, Gallery, Resources), Programs, Contact Info, Social Media
- Black background with white/gold text
- Social media icons in gold
- Copyright notice centered at bottom

## Animation & Interaction Guidelines

### Scroll-Triggered Animations
- **Images**: Slide in from left/right with fade (stagger timing for multiple)
- **Text blocks**: Fade up from bottom with slight upward movement
- **Cards**: Stagger reveal (cascade effect) when entering viewport
- Trigger point: 20% of element visible
- Duration: 0.6-0.8s with ease-out curves

### Hover Interactions
- **Navigation links**: Gold underline slides in from left
- **Buttons**: Subtle scale (1.05), gold glow/shadow enhancement
- **Teacher portraits**: Gold overlay fade-in (0.3s), slight scale zoom
- **Program cards**: Lift effect (translateY -4px), shadow increase
- **All interactions**: Smooth transitions (0.3-0.4s)

### Interactive Satisfaction
- Cursor changes to pointer on all interactive elements
- Smooth color transitions on state changes
- Micro-animations on form field focus (gold border glow)
- Button press states with slight scale down

## Images
- **Hero**: Professional photograph of a grand piano (Steinway or similar), dramatic side-lighting, black background - full viewport height
- **Teacher Portraits**: Professional black-and-white headshots, formal attire, neutral backdrop
- **Gallery Page**: Mix of student performances, instrument close-ups, classroom scenes
- All images high-quality, professionally shot aesthetic

## Responsive Behavior
- Desktop: Multi-column layouts, full animations
- Tablet: 2-column grids, simplified animations
- Mobile: Single column, touch-friendly spacing, reduced motion for performance

## Bilingual Content Structure
Every text element has EN/FR versions stored in data structure, toggled via language switch without page reload. Maintain identical layout regardless of language to preserve visual consistency.