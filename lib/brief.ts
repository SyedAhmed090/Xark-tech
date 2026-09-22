import type { Service } from "./services";

/**
 * The brief replaces the sales call.
 *
 * At $99 a logo there is no margin for a discovery call, so these questions
 * have to extract everything a designer would otherwise ask on the phone —
 * and everything a production team needs to start without a second round of
 * emails. That is the whole bet of the pricing model: a good brief is the
 * difference between one revision round and four.
 *
 * Questions are deliberately in plain language. The buyer is a plumber or a
 * florist, not a design director, so "Who are your customers?" beats "target
 * demographic" and a select beats a blank box wherever the answer is really a
 * shortlist.
 */
export type BriefField = {
  /** Form field name, and the CSV/email label key. */
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  /** Sits under the label — use it to lower the stakes of a hard question. */
  help?: string;
  options?: string[];
};

const LOGO_FIELDS: BriefField[] = [
  {
    name: "business",
    label: "Business name",
    type: "text",
    required: true,
    placeholder: "Exactly as it should appear in the logo",
  },
  {
    name: "what",
    label: "What does your business do?",
    type: "textarea",
    required: true,
    placeholder: "A sentence or two is plenty.",
  },
  {
    name: "customers",
    label: "Who are your customers?",
    type: "textarea",
    placeholder: "Homeowners in Sheridan, small cafés, brides-to-be…",
    help: "Who you're trying to appeal to matters more than what you like personally.",
  },
  {
    name: "tagline",
    label: "Tagline to include",
    type: "text",
    placeholder: "Leave blank if you don't have one",
  },
  {
    name: "style",
    label: "Style you're drawn to",
    type: "select",
    options: [
      "Not sure — show me options",
      "Modern and minimal",
      "Bold and loud",
      "Classic and established",
      "Friendly and approachable",
      "Hand-drawn or illustrated",
      "Luxury and refined",
    ],
  },
  {
    name: "colours",
    label: "Colours you want, and any to avoid",
    type: "text",
    placeholder: "e.g. deep green and cream — nothing orange",
  },
  {
    name: "likes",
    label: "Logos you admire",
    type: "textarea",
    placeholder: "Names or links — they don't have to be in your industry.",
    help: "The fastest way to get this right first time.",
  },
  {
    name: "avoid",
    label: "Anything we should avoid",
    type: "textarea",
    placeholder: "Competitor styles, clichés, a colour your rival owns…",
  },
];

const WEBSITE_FIELDS: BriefField[] = [
  {
    name: "business",
    label: "Business name",
    type: "text",
    required: true,
  },
  {
    name: "what",
    label: "What does your business do?",
    type: "textarea",
    required: true,
    placeholder: "A sentence or two is plenty.",
  },
  {
    name: "goal",
    label: "What should the site do first?",
    type: "select",
    options: [
      "Get enquiries and calls",
      "Take bookings or appointments",
      "Sell products online",
      "Look credible when people check us out",
      "Something else — described below",
    ],
    help: "We design the whole page around this one answer.",
  },
  {
    name: "pages",
    label: "Pages you think you need",
    type: "textarea",
    placeholder: "Home, About, Services, Gallery, Contact…",
    help: "A rough list is fine — we'll tell you if something's missing.",
  },
  {
    name: "content",
    label: "Do you have text and photos ready?",
    type: "select",
    options: [
      "Yes, all of it",
      "Some of it",
      "No — please write and source it",
    ],
  },
  {
    name: "domain",
    label: "Domain name",
    type: "text",
    placeholder: "yourbusiness.com, or 'need one'",
  },
  {
    name: "likes",
    label: "Sites you like",
    type: "textarea",
    placeholder: "Links — competitors or otherwise.",
  },
  {
    name: "features",
    label: "Anything specific it has to do",
    type: "textarea",
    placeholder: "Online booking, payments, a members area, a menu…",
  },
];

const GENERAL_FIELDS: BriefField[] = [
  {
    name: "business",
    label: "Business name",
    type: "text",
    required: true,
  },
  {
    name: "website",
    label: "Your website",
    type: "text",
    placeholder: "yourbusiness.com — or leave blank if you don't have one",
  },
  {
    name: "what",
    label: "What do you need?",
    type: "textarea",
    required: true,
    placeholder: "Tell us what you're after and anything we should know.",
  },
];

export const BRIEF_FIELDS: Record<Service["briefType"], BriefField[]> = {
  logo: LOGO_FIELDS,
  website: WEBSITE_FIELDS,
  general: GENERAL_FIELDS,
};

export const BRIEF_TITLES: Record<Service["briefType"], string> = {
  logo: "Logo brief",
  website: "Website brief",
  general: "Project brief",
};
