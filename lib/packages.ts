import type { Package } from "./services";

export type PackageGroup = {
  slug: string;
  name: string;
  tagline: string;
  detailsHref: string;
  packages: Package[];
};

/**
 * Promotional package catalog adapted from the supplied reference page.
 * The Cloud X Bloom brand name is replaced only where it identifies the
 * vendor; package scope and pricing stay aligned with the reference.
 */
export const PACKAGE_GROUPS: PackageGroup[] = [
  {
    slug: "logo-packages",
    name: "Logo",
    tagline: "Identity packages for new brands, refreshes, and illustration-led marks.",
    detailsHref: "/services/brand-identity",
    packages: [
      {
        name: "Basic Logo",
        originalPrice: "$149",
        price: "$99",
        duration: "48–72 hours",
        summary: "A focused first identity for a new idea or early-stage business.",
        includes: [
          "2 unique logo concepts",
          "1 revision",
          "Designed by 1 professional designer",
          "Grayscale JPEG files",
        ],
      },
      {
        name: "Startup Logo",
        originalPrice: "$224",
        price: "$149",
        duration: "48–72 hours",
        summary: "More creative range and revision room for a growing startup.",
        includes: [
          "4 unique logo concepts",
          "5 revisions",
          "Designed by 2 professional designers",
          "JPEG and PNG files for print and web",
        ],
      },
      {
        name: "Corporate Logo",
        originalPrice: "$299",
        price: "$199",
        duration: "48–72 hours",
        summary: "A complete professional logo package with editable source files.",
        includes: [
          "7 unique logo concepts",
          "Unlimited revisions",
          "Designed by 3 professional designers",
          "JPEG, PNG, AI, PSD and EPS files",
        ],
      },
      {
        name: "Custom Illustration",
        originalPrice: "$374",
        price: "$249",
        duration: "48–72 hours",
        summary: "Original illustrated concepts shaped by a larger specialist team.",
        includes: [
          "2 illustrative design concepts",
          "Unlimited revisions",
          "Designed by 5 professional designers",
          "JPEG, PSD, EPS, AI and PNG files",
        ],
      },
      {
        name: "Platinum Illustration",
        originalPrice: "$599",
        price: "$399",
        duration: "24–48 hours",
        summary: "A faster, broader illustration package for a high-impact identity.",
        includes: [
          "5 illustrative design concepts",
          "Unlimited revisions",
          "Priority turnaround",
          "JPEG, PSD, EPS, AI and PNG files",
        ],
      },
      {
        name: "Xark Special",
        originalPrice: "$1,349",
        price: "$899",
        duration: "48–72 hours",
        summary: "A combined logo and five-page website launch package.",
        includes: [
          "Custom 5-page informative website",
          "Unlimited logo concepts",
          "Unlimited revisions",
          "JPEG, PSD, EPS, AI and PNG files",
        ],
      },
    ],
  },
  {
    slug: "website-packages",
    name: "Website",
    tagline: "From a concise starter site to a complete commerce platform.",
    detailsHref: "/services/web-design-build",
    packages: [
      {
        name: "Starter Website",
        originalPrice: "$599",
        price: "$399",
        duration: "Project based",
        summary: "A compact online presence for a small business or new offer.",
        includes: [
          "2-page website",
          "2 stock images",
          "jQuery slider",
        ],
      },
      {
        name: "Advance Website",
        originalPrice: "$1,199",
        price: "$799",
        duration: "Project based",
        summary: "A flexible five-page website with content management included.",
        includes: [
          "5 web pages",
          "Content Management System (CMS)",
          "jQuery slider or Flash banner",
          "5 stock images",
          "Free 12-month hosting",
        ],
      },
      {
        name: "Advanced Professional",
        originalPrice: "$1,649",
        price: "$1,099",
        duration: "Project based",
        summary: "A responsive professional site with hosting and domain setup.",
        includes: [
          "10 web pages",
          "Mobile-responsive design",
          "Content Management System (CMS)",
          "Free domain registration",
          "Free 12-month hosting",
        ],
      },
      {
        name: "E-Commerce Website",
        originalPrice: "$2,249",
        price: "$1,499",
        duration: "Project based",
        summary: "A tailored online store with secure payments and reporting.",
        includes: [
          "Custom e-commerce design",
          "WooCommerce integration",
          "Payment gateway setup",
          "Custom performance and sales reports",
          "Free domain and 12-month hosting",
        ],
      },
      {
        name: "Corporate Commerce Platform",
        originalPrice: "$3,749",
        price: "$2,499",
        duration: "Project based",
        summary: "A broader commerce and brand package for established businesses.",
        includes: [
          "Unlimited logo concepts",
          "Free animated logo",
          "Email signature and icon design",
          "Web design, hosting and domain",
          "Social media assets",
        ],
      },
      {
        name: "Platinum Custom Website",
        originalPrice: "$5,999",
        price: "$3,999",
        duration: "Project based",
        summary: "The complete custom web, identity, print, and social package.",
        includes: [
          "Unlimited logo concepts",
          "Animated logo, email signature and icon design",
          "Print-ready materials",
          "Custom web design, hosting and domain",
          "Social media assets",
        ],
      },
    ],
  },
  {
    slug: "animation-packages",
    name: "Animation",
    tagline: "Story-led video packages with script, sound, and production included.",
    detailsHref: "/services/motion-3d",
    packages: [
      {
        name: "Startup Video Package",
        originalPrice: "$749",
        price: "$499",
        duration: "3–4 weeks",
        summary: "A concise animated video for a launch, product, or campaign.",
        includes: [
          "30-second video duration",
          "Professional script creation",
          "Professional voice-over and sound effects",
          "4 storyboard revisions",
          "HD video production",
        ],
      },
      {
        name: "Classic Video Package",
        originalPrice: "$1,499",
        price: "$999",
        duration: "5–6 weeks",
        summary: "A full one-minute production with custom art and character work.",
        includes: [
          "60-second video duration",
          "Custom script, voice-over and sound effects",
          "Unlimited storyboard revisions",
          "Character modeling and custom artwork",
          "Dedicated project manager and artist",
        ],
      },
      {
        name: "Premium Video Package",
        originalPrice: "$2,249",
        price: "$1,499",
        duration: "Project based",
        summary: "An extended production for richer product and brand storytelling.",
        includes: [
          "90-second video duration",
          "Custom script, voice-over and sound effects",
          "Unlimited storyboard revisions",
          "Character modeling and custom artwork",
          "Dedicated project manager and artist",
        ],
      },
    ],
  },
];
