import type { FaqItem } from "@/components/FAQ";

/**
 * Per-service FAQs, keyed by service slug.
 *
 * These are the highest-leverage content on the site. People increasingly ask
 * an assistant "how much does a logo cost for a small business" rather than
 * typing it into a search box, and what gets quoted back is a short, direct,
 * self-contained answer. So each one leads with the answer — a number, a
 * timeframe, a yes or a no — and only then explains.
 *
 * Two rules, both load-bearing:
 *
 * 1. Every answer must stay consistent with lib/services.ts. These are
 *    mirrored into FAQPage structured data, and schema that contradicts the
 *    page it sits on is treated as untrustworthy rather than ignored.
 * 2. Answer the awkward ones. "Can I get a refund", "why are you cheap",
 *    "do you outsource" are the questions actually stopping the sale, and
 *    skipping them just moves the doubt somewhere we can't answer it.
 */
export const SERVICE_FAQS: Record<string, FaqItem[]> = {
  "logo-design": [
    {
      q: "How much does a logo cost?",
      a: "Logos start at $99 for three original concepts and two revision rounds. $149 adds more concepts and revisions, $199 gives you six concepts with unlimited revisions for fourteen days plus a social profile set, $249 covers an illustrated mark, $399 adds a colour and type system with stationery, and $899 is a complete identity with brand guidelines.",
    },
    {
      q: "What file formats do I get?",
      a: "The full vector set — AI, EPS, SVG and PDF — plus web formats like PNG and JPG, and a favicon. This is included on every package, including the $99 one. Vector files are what printers, sign-makers, embroiderers and app stores require, and charging extra for them is the most common trick in budget logo design.",
    },
    {
      q: "Do I own the logo?",
      a: "Yes, outright, on final payment. There is no licence, no usage limit, and no fee to release the source files. You can trademark it, put it on a building, or sell the business with it.",
    },
    {
      q: "How long does a logo take?",
      a: "Three days for the Starter and Startup packages, four for Business, five to seven for Brand Kit and the illustrated mark, and ten to fourteen days for a complete identity. You get the date in writing when your brief is accepted, before you pay.",
    },
    {
      q: "How many revisions do I get?",
      a: "The Starter package includes two revision rounds. Every package from $199 upward includes unlimited revisions for fourteen days from the first concepts. A revision means changes to the direction you chose — starting again from a different concept is new work, and we will tell you that rather than quietly running out of patience.",
    },
    {
      q: "What do you need from me to start?",
      a: "A filled-in brief: your business name exactly as it should appear, what the business does, who your customers are, any colours you want or want avoided, and a few logos you like. It takes about fifteen minutes and replaces the discovery call.",
    },
    {
      q: "Do I have to get on a call?",
      a: "No. Pick a package, fill in the brief, and work starts. If you would rather talk it through, live chat is on every page during business hours and we answer in minutes.",
    },
    {
      q: "What if I don't like any of the concepts?",
      a: "Tell us what is wrong in plain language and we revise within your package's rounds. If nothing in the first set is close, say so early — that usually means the brief and the concepts disagree somewhere, and it is faster to fix at that point than after three rounds of small edits.",
    },
    {
      q: "Can I get a refund?",
      a: "Design work is refundable in full until the first concepts are sent, because after that the work exists. Once concepts have been delivered we will keep revising within your package rather than refund. The full terms are on the terms page, written to match what the packages advertise.",
    },
    {
      q: "Will my logo be unique?",
      a: "Yes — every concept is designed for your brief, not pulled from a template library or generated. We also check it does not closely resemble a well-known mark in your sector. We cannot run a trademark search for you, and you should do that before registering it.",
    },
    {
      q: "Do you use AI to make logos?",
      a: "Not for the logo itself. Concepts are drawn by a designer. We use AI for the unglamorous parts of production — background removal, format conversion, asset resizing — because it makes those faster and cheaper without touching the design decisions.",
    },
    {
      q: "Can you redraw or update a logo I already have?",
      a: "Yes. Send what you have, including the best-quality file you own, and say whether you want it cleaned up and vectorised or genuinely redesigned. If you only have a low-resolution image, redrawing it as vector artwork is usually the right first step and is often all that is needed.",
    },
    {
      q: "Do I get a black and white version?",
      a: "Yes, from the $199 package upward you get colour, black and reversed versions as standard. You need them: a single-colour version is what gets used on invoices, stamps, embroidery and anything printed cheaply.",
    },
    {
      q: "Can you design business cards and stationery too?",
      a: "Yes. The $399 Brand Kit includes a business card, letterhead and envelope, an email signature and an icon set, alongside a colour and typography system so everything matches. Below that tier the logo is the deliverable.",
    },
    {
      q: "What is the difference between a logo and a brand identity?",
      a: "A logo is one mark. A brand identity is the system around it — the colours, the typefaces, how it is used on a sign versus a phone screen, and written guidelines so a printer or a future designer applies it consistently. Most small businesses need a logo first and the system later, which is why they are priced separately here.",
    },
    {
      q: "Do you put your name on my logo or website?",
      a: "No. We do not add a credit to anything we make for you, and there is no fee to remove one. Charging to take an agency's name off your own footer is common and is worth checking for wherever you buy.",
    },
  ],

  "web-design": [
    {
      q: "How much does a small business website cost?",
      a: "A three-page starter site is $399. The $799 Business Site is the one most small businesses choose: six pages, a content system you can edit yourself, a blog and your Google Business Profile set up. A twelve-page Pro Site with booking or quote capture is $1,099, an eighteen-page site with copywriting is $1,699, a thirty-page multi-location site is $2,499, and fully custom builds start at $3,999.",
    },
    {
      q: "How long does a website take?",
      a: "Seven days for a starter site, ten for a business site, fourteen for a Pro Site, and eighteen to twenty-five days for the larger builds. You get the date in writing before you pay, and if a build misses it for reasons at our end your deposit comes back.",
    },
    {
      q: "Can I update the website myself?",
      a: "Yes. Every build from $799 upward includes a content management system, so you can change text, swap photos, update prices and add blog posts without paying anyone. You get a walkthrough recording showing how.",
    },
    {
      q: "Do I need to provide the text and photos?",
      a: "For the Starter and Business packages, yes — or we can quote copywriting separately. The $1,699 Advanced Site includes copywriting for every page. If you are waiting on content, tell us: the delivery date moves by however long we waited, and there is no penalty for it.",
    },
    {
      q: "Will my site work on phones?",
      a: "Yes, and it is designed for phones first. Most small business traffic arrives on a mobile, often on a mediocre connection, so layouts are built for that and tested on real devices rather than just resized in a browser.",
    },
    {
      q: "Do you do SEO as part of the build?",
      a: "On-page and technical SEO is included: page titles, descriptions, heading structure, a sitemap, structured data and Google Search Console connected before launch. Ongoing SEO — ranking for competitive searches over months — is a separate monthly plan starting at $299.",
    },
    {
      q: "Who owns the domain and hosting?",
      a: "You do. The domain, hosting and content system go in accounts with your name and your card, and we work inside them with access you grant. This matters more than it sounds: if an agency holds the keys, the cost of leaving them is whatever they decide later.",
    },
    {
      q: "What happens after the site goes live?",
      a: "You own it and can manage it yourself. If you would rather not, Website Care is $99 a month for updates, daily backups, security scanning, uptime monitoring and thirty minutes of edits. Business Sites include the first month free and Pro Sites the first three.",
    },
    {
      q: "Can you redesign my existing website?",
      a: "Yes. Send the URL and say what is not working. One thing we always check on a redesign: whether the old page addresses are redirected to the new ones. Skipping that is the most common reason rankings collapse after a relaunch.",
    },
    {
      q: "What platform do you build on?",
      a: "Usually WordPress for content sites and Shopify or WooCommerce for stores, because they are the ones you can hire anyone to maintain later. Custom builds use modern frameworks where the requirements justify it. We will tell you which and why rather than defaulting to whatever we prefer.",
    },
    {
      q: "How many pages do I actually need?",
      a: "Most small businesses need one page per thing they sell, plus home, about and contact. A single Services page listing eight offerings will lose in search to eight pages that each answer one question. If you are unsure, send the list in your brief and we will tell you what is missing or unnecessary.",
    },
    {
      q: "Can you add online booking or payments?",
      a: "Yes. Booking and quote-request systems are included from the $1,099 Pro Site. Taking payments for products is an online store, which starts at $1,299 and is priced separately because the setup work is different.",
    },
    {
      q: "Do you write the content for me?",
      a: "Copywriting for every page is included in the $1,699 Advanced Site. On smaller packages you provide the text, or we quote writing it separately. Either way we will tell you if what you have sent is too thin to rank or convert, rather than publishing it and staying quiet.",
    },
    {
      q: "What if I want changes after it launches?",
      a: "Small changes are included in Website Care, which gives you thirty minutes to an hour of edit time a month depending on the plan. Larger changes are quoted. Nothing is billed by surprise.",
    },
    {
      q: "Will it be fast?",
      a: "Yes, and speed is checked before launch — images resized, pages tested on a phone-grade connection. The most common cause of a slow small-business website is full-size photos uploaded straight from a camera, which is exactly the kind of thing that never gets caught without someone looking.",
    },
    {
      q: "Do you set up Google Business Profile?",
      a: "Yes, from the $799 Business Site upward, including verification. For a local business this matters more than the website — the map results sit above everything else and are drawn from that profile, not from your site.",
    },
    {
      q: "Can I see the design before you build it?",
      a: "Yes. Design comes back as real pages you can click through on your phone, not flat images of a page. You approve the direction before anything is built out, and revisions happen at that stage where they are cheap.",
    },
  ],
  ecommerce: [
    {
      q: "How much does an online store cost?",
      a: "A Starter Store with up to 25 products is $1,299. The $1,999 Online Store covers up to 50 products with custom design, abandoned cart recovery and product reviews, plus three months of Care+. An Advanced Store with unlimited products, subscriptions or multi-channel selling is $3,499.",
    },
    {
      q: "Shopify or WooCommerce — which should I use?",
      a: "Shopify if you want it to just work and do not mind a monthly fee plus transaction costs; it handles hosting, security and payments for you. WooCommerce if you already have a WordPress site or want lower running costs and more control, accepting that you are responsible for maintenance. We will recommend one based on your products and how hands-on you want to be.",
    },
    {
      q: "How long does a store take to build?",
      a: "Ten days for a Starter Store, fourteen for the Online Store and about twenty-one for an Advanced Store. Product data is usually what decides the timeline — if your photos and descriptions are ready, it goes faster.",
    },
    {
      q: "Do you upload my products?",
      a: "Yes, up to the number in your package. You send a spreadsheet and the images; we handle the loading, categories, variants and pricing. Beyond your package's product count we quote the extra per batch rather than refusing.",
    },
    {
      q: "Can I take payments?",
      a: "Yes. Payment gateway setup is included in every package, along with shipping rules and tax configuration, and we run test orders end to end before launch. Card processing fees are charged by the payment provider, not by us.",
    },
    {
      q: "Can I add products myself afterwards?",
      a: "Yes, and you get a walkthrough recording showing how. Adding a product should never mean raising a support ticket, and if it does, the store was set up wrong.",
    },
    {
      q: "What is abandoned cart recovery?",
      a: "An automatic email to someone who added items and left without buying. It is included from the $1,999 package and it is usually the single highest-return feature on a small store, because it recovers sales you had already almost made.",
    },
    {
      q: "Do you do the product photography?",
      a: "No, that is a separate job and we would rather point you at a local photographer than do it badly. We will tell you what the store needs — consistent backgrounds, a standard aspect ratio, enough resolution to zoom — so the shoot produces usable files first time.",
    },
    {
      q: "Can you move my existing store to a new platform?",
      a: "Yes. Products, customers and order history can usually be migrated. The part that needs care is redirects, so existing links and search rankings survive the move — ask about that specifically wherever you get it done.",
    },
    {
      q: "Will the store work on phones?",
      a: "Yes, and the checkout in particular is built and tested for mobile, because that is where most abandoned carts happen. A checkout that is fiddly on a phone is a store that quietly loses money.",
    },
    {
      q: "Do I need a maintenance plan for a store?",
      a: "More than for a normal website, yes. A store handles payments and customer data, and an update that breaks checkout costs money every hour it is broken. Care+ at $199 a month covers checkout monitoring, plugin compatibility testing and order-safe backups. Three months are included with the $1,999 package.",
    },
    {
      q: "Can you set up discount codes and sales?",
      a: "Yes, discount and promotion setup is included from the $1,999 package, and we show you how to create your own afterwards so you are not waiting on us before a seasonal sale.",
    },
    {
      q: "Can I sell subscriptions?",
      a: "Yes, on the $3,499 Advanced Store. Subscriptions add real complexity — recurring billing, failed payments, pausing and cancelling — which is why it sits at that tier rather than being bolted onto a smaller build.",
    },
    {
      q: "Who owns the store?",
      a: "You do. The platform account, the domain and the payment gateway are all in your name, and you can take the store elsewhere at any time.",
    },
  ],

  "video-animation": [
    {
      q: "How much does an explainer video cost?",
      a: "A 30-second video is $399, a 60-second video with custom illustrated characters is $799, and a fully bespoke 90-second video in 4K is $1,299. All three include the script, a professional voice-over, music and sound effects.",
    },
    {
      q: "How long does a video take?",
      a: "Seven days for the 30-second version, fourteen for 60 seconds and twenty-one for the 90-second bespoke video. The script is approved before anything is animated, which is what stops expensive changes later.",
    },
    {
      q: "Do you use AI to make the videos?",
      a: "On the $399 package, yes, and we say so plainly: AI handles storyboarding and the first-pass animation, then a human artist finishes and quality-checks it. The $799 package uses human-led character design. The $1,299 package is bespoke throughout with no AI in the final cut. The price differences reflect exactly that.",
    },
    {
      q: "Do I get to approve the script?",
      a: "Yes, and nothing moves until you have. Animation is expensive to change and cheap to plan, so the script and storyboard stages are where your attention is worth most.",
    },
    {
      q: "Can I choose the voice?",
      a: "Yes. We send options and you pick. If you would rather record it yourself, that is fine too and we will tell you what we need technically.",
    },
    {
      q: "What do I get at the end?",
      a: "The finished video in HD, or 4K on the top package. The $799 package adds square and vertical cuts for social, and the $1,299 package includes every aspect ratio plus the source files.",
    },
    {
      q: "Where should I use an explainer video?",
      a: "Top of your homepage, in paid ads, and pinned on social. They earn their keep when what you sell takes a moment to explain — a service, a process, something people have not bought before. If your offering is immediately obvious, spend the money elsewhere.",
    },
    {
      q: "How many revisions do I get?",
      a: "Two rounds on the $399 package, and unlimited revisions for fourteen days on the $799 and $1,299 packages. Revisions after the animation stage are limited to what does not require re-animating from scratch — which is why the script approval matters.",
    },
    {
      q: "Can you animate my logo?",
      a: "Yes. An animated logo is included in the $899 Complete Identity package under logo and brand identity, and can be quoted separately if you already have a logo you own the vector files for.",
    },
    {
      q: "Do you need me to provide anything?",
      a: "Your brand colours and logo files if you have them, and a clear sense of what the video has to make someone understand or do. If you have a script already, send it — we will tell you honestly whether it needs rewriting for timing.",
    },
    {
      q: "Can I get the video in other languages?",
      a: "Yes, as an add-on. An AI-cloned voice-over keeps the same voice talent across languages without re-recording, which is far cheaper than booking a second session.",
    },
    {
      q: "What is the difference between 2D and 3D animation?",
      a: "2D is flat illustration and is the right choice for explaining a service or a process — faster, cheaper, clearer. 3D adds depth and realism and is worth it for physical products where people want to see the object. Most small businesses want 2D.",
    },
    {
      q: "Do I own the video?",
      a: "Yes. You own the finished video outright, and the top package includes the source files. Music and sound effects are licensed for your use as part of the video.",
    },
  ],

  "website-care": [
    {
      q: "What does website maintenance include?",
      a: "Core, theme and plugin updates tested on a staging copy first, daily offsite backups kept for thirty days, weekly security and malware scans, uptime monitoring, broken link checks, and thirty minutes a month of content edits. That is the $99 Care plan.",
    },
    {
      q: "Do I really need a maintenance plan?",
      a: "If your site runs on WordPress or a store platform, yes. Updates are security patches, and an unpatched site is how small businesses get defaced, blacklisted by Google, or used to send spam. If you have a small static site and you check it yourself, you can do without.",
    },
    {
      q: "How much does website maintenance cost?",
      a: "$99 a month for a normal business or brochure site, $199 for an online store, and $449 for custom builds needing dedicated developer time. Sites we build include the first months free — one month with a Business Site, three with a Pro Site or an Online Store.",
    },
    {
      q: "Can I cancel any time?",
      a: "Yes, any month, with no minimum term and no notice period. The month already in progress is not refunded. We do not hold your site hostage — the hosting and domain are in your accounts, not ours.",
    },
    {
      q: "What is the difference between Care and Care+?",
      a: "Care+ at $199 is for stores. It adds checkout and payment gateway monitoring after every update, compatibility testing for cart, inventory and shipping plugins, order-safe backups that snapshot customer and order data before changes, an hour of edit time, and a 24-hour priority response instead of 48.",
    },
    {
      q: "How quickly do you respond?",
      a: "48 hours on Care, 24 hours on Care+, and same business day on Priority. If the site is down, that jumps the queue on every plan — uptime monitoring usually means we know before you do.",
    },
    {
      q: "What counts as a content edit?",
      a: "Text changes, swapping photos, updating prices, opening hours, staff details, adding a blog post. Care includes thirty minutes a month, Care+ an hour, Priority three hours of developer time. Anything larger is quoted before it is done, never billed by surprise.",
    },
    {
      q: "Does unused edit time roll over?",
      a: "No, and it is worth actually using. Most people let months of included time go unclaimed and then request everything at once, which is when it becomes a quoted job instead of an included one.",
    },
    {
      q: "What happens if my site gets hacked?",
      a: "We restore from the most recent clean backup, find how it got in, and patch it. Daily offsite backups with thirty-day retention exist precisely for this. Backups stored on the same server as the site are not backups, which is a detail worth checking with any provider.",
    },
    {
      q: "Do you maintain sites you didn't build?",
      a: "Yes. The first month includes an audit, a full backup before anything is touched, and fixing whatever is already broken. If the site is in a state where maintenance is not sensible, we will say so and tell you what it would cost to put right.",
    },
    {
      q: "Will my site go down during updates?",
      a: "No. Updates are applied to a staging copy and tested before anything touches the live site. That is the difference between a maintenance plan and someone clicking update and hoping.",
    },
    {
      q: "Do you send a report?",
      a: "Yes, monthly: what was updated, what was scanned, uptime for the period, and what edit time was used. Written so it is actually readable rather than a wall of automated output.",
    },
    {
      q: "Does maintenance include SEO?",
      a: "No. Care keeps the site working, secure and current — which does support rankings, because a slow or broken site is penalised. Actively improving rankings is the separate Local SEO plan starting at $299 a month.",
    },
    {
      q: "What does the Priority plan add?",
      a: "Three hours of developer time a month, server and dependency management, database maintenance, API and integration monitoring, staging tests before every deploy, a dedicated contact, same-business-day response and a monthly planning call. It is for custom builds and anything with an integration that can break.",
    },
  ],

  "local-seo": [
    {
      q: "How much does local SEO cost?",
      a: "$299 a month for one location and 15 target keywords, $599 for 40 keywords with two optimised pages and two blog posts a month, and $1,199 for multi-location work with link building and AI search visibility tracking. Three months is the realistic minimum before judging it.",
    },
    {
      q: "How long does local SEO take to work?",
      a: "Google Business Profile changes can show within days. Website changes typically take three to six months to settle. Local SEO moves faster than national SEO because the competition is smaller. Anyone promising rankings in weeks is either targeting your own business name, which you already rank for, or buying ads and calling it SEO.",
    },
    {
      q: "What is the single most important thing for local search?",
      a: "Your Google Business Profile. The map results sit above everything else and are drawn from that profile, not from your website. If it is unclaimed, miscategorised or has no reviews, no amount of work on the site will put you in the map pack. It is free, and it is the first thing we fix.",
    },
    {
      q: "What do you actually report on?",
      a: "Calls, direction requests and enquiries — the things that pay your bills. Keyword positions are included, but they are a diagnostic, not the goal: rankings can improve while the phone stays silent, and that is a failure regardless of what the chart says.",
    },
    {
      q: "Do I need a blog?",
      a: "Not for its own sake. You need pages that answer what customers search for before they buy, which often looks like a blog. Two posts a month are included from the $599 plan. If nobody is searching for what you would write about, we will say so rather than filling a quota.",
    },
    {
      q: "What are citations and do they matter?",
      a: "Citations are listings of your name, address and phone number on directories. They matter mainly when they disagree with each other — an old address or a disconnected number on twenty sites undermines the profile you are trying to rank. Cleanup is included in every plan.",
    },
    {
      q: "Can you guarantee first place on Google?",
      a: "No, and nobody can. Anyone who guarantees a position is either lying or about to rank you for a phrase nobody searches. What we commit to is the work, the reporting, and telling you when something is not working.",
    },
    {
      q: "How do I get more reviews?",
      a: "Ask, at the moment the customer is happiest, with a direct link that takes one tap. Review strategy is included from the $599 plan. Never buy reviews — they are detectable, they get removed, and the penalty outlasts the benefit.",
    },
    {
      q: "Is SEO better than paid ads?",
      a: "They do different jobs. Ads buy traffic immediately and stop the day you stop paying. SEO compounds and keeps working, but takes months. If you need the phone ringing next week, run ads; if you want to stop renting your customers, do both and taper the ads.",
    },
    {
      q: "Do you work with businesses outside your area?",
      a: "Yes. Local SEO is about your customers' location, not ours — the work is the same whether you are in the next town or across the country.",
    },
    {
      q: "What if I have more than one location?",
      a: "Each location needs its own page and its own Business Profile, properly distinguished rather than the same text with the town swapped. Multi-location work is covered by the $1,199 Authority plan.",
    },
    {
      q: "What is AI search visibility?",
      a: "Whether assistants like ChatGPT mention your business when someone asks them for a recommendation. It is an increasing share of how people find local services, and it rewards clear, specific, quotable content rather than keyword density. Tracked on the $1,199 plan.",
    },
    {
      q: "Do I have to sign a long contract?",
      a: "No. There is a three-month recommended minimum because nothing meaningful happens faster than that, but you can stop at any time and the work done stays on your site and your profile.",
    },
    {
      q: "Will you need access to my website?",
      a: "Yes, editor access to the site and manager access to your Google Business Profile. You keep ownership of both throughout and can revoke access whenever you like.",
    },
  ],

  "social-media": [
    {
      q: "How much does social media management cost?",
      a: "$299 a month for two platforms and 12 posts, $699 for four platforms with 20 posts plus four short videos and weekly Stories, and $1,499 for full production across five or more platforms with UGC and influencer outreach.",
    },
    {
      q: "Which platforms should my business be on?",
      a: "The ones your customers already use, which is usually one or two rather than all of them. A trade business does well on Facebook and Instagram; a B2B service may only need LinkedIn. Posting badly everywhere is worse than posting well in one place, and we will tell you which to drop.",
    },
    {
      q: "Do I get to approve posts before they go out?",
      a: "Yes. You see a month at a time in a shared calendar and approve it. Nothing is published that you have not seen.",
    },
    {
      q: "Who writes the captions?",
      a: "We do, including hashtag research, in a voice agreed with you at the start. If a post needs specific knowledge only you have — a job you just finished, a product detail — we will ask rather than invent it.",
    },
    {
      q: "Do you reply to comments and messages?",
      a: "Community management is included from the $699 plan, daily. Anything that is genuinely a sales enquiry or a complaint gets passed to you rather than answered on your behalf, because those need to come from the business.",
    },
    {
      q: "How long before social media brings in customers?",
      a: "Expect three months before it is worth judging. Social is mostly a trust and recall channel for a small business: people check whether you look active and legitimate before calling. Direct sales from organic posts are a bonus, not the main return.",
    },
    {
      q: "Do you make the videos?",
      a: "Four short videos or Reels a month are included on the $699 plan, edited from footage you supply or from existing assets. Full short-form video production is on the $1,499 plan. Footage from your phone is usually fine — raw and real outperforms polished on these platforms.",
    },
    {
      q: "Can you run ads as well?",
      a: "Paid promotion management is included on the $1,499 plan. Ad spend is paid by you directly to the platform, never through us, so you can see exactly what was spent.",
    },
    {
      q: "What do I need to provide?",
      a: "Photos of your work, any product or team pictures you have, and a heads-up on anything happening — a sale, a new service, a job worth showing. The more real material you send, the less the feed looks like stock photography.",
    },
    {
      q: "Will you post the same thing to every platform?",
      a: "No. The same idea is reformatted for each platform's native shape, because a LinkedIn post pasted into Instagram reads as a LinkedIn post pasted into Instagram. The $1,499 plan automates the reformatting across platforms.",
    },
    {
      q: "Can I cancel?",
      a: "Yes, any month. Three months is the recommended minimum because consistency is the entire mechanism, but there is no lock-in. The content made for you stays yours.",
    },
    {
      q: "What do you report on?",
      a: "Reach, engagement and, where it can be attributed, enquiries. Follower count is reported but it is the least useful number on the page — a thousand followers who never contact you are worth less than fifty local ones who do.",
    },
    {
      q: "Do you use AI to write the posts?",
      a: "For research, trend spotting and first-draft captions, yes. A human edits everything before it is scheduled and before you see it. Anything that involves a claim about your business is checked with you rather than generated.",
    },
    {
      q: "Who owns the accounts?",
      a: "You do, always. We work inside accounts in your name with access you grant, and you can remove that access at any time. Never let an agency create social accounts under their own ownership.",
    },
  ],
};
