/**
 * Journal content and its shape.
 *
 * Posts were originally a flat `string[]` of paragraphs, which made every piece
 * a wall of text with no headings and no way to link out of the prose. That is
 * a ceiling on how well a post can rank: search engines and answer engines both
 * lean on heading structure to understand what a page covers, and internal
 * links are how a journal passes authority to the pages that sell something.
 * The block model below adds headings, lists, inline links and per-post FAQs
 * while keeping plain paragraphs as cheap to author as they were before.
 */

/** A run of text inside a paragraph or list item. Objects render as links. */
export type Inline = string | { text: string; href: string };

/**
 * Authored text: a bare string when there are no links in it, an array of runs
 * when there are. Normalize with `runs()` before rendering.
 */
export type Rich = string | Inline[];

export type Block =
  /** A section heading. Rendered as an h2 and used as its own anchor target. */
  | { kind: "h2"; text: string }
  | { kind: "p"; text: Rich }
  | { kind: "list"; items: Rich[]; ordered?: boolean }
  /** Pull quote in the flow of the piece. */
  | { kind: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  /** Standfirst under the h1, and the summary line on the journal index. */
  dek: string;
  /**
   * Search-result description, ~155 chars, front-loaded with the phrasing the
   * post targets. Deks are written for someone already on the page, which makes
   * them weak snippets. Falls back to `dek` when omitted.
   */
  metaDescription?: string;
  date: string; // ISO
  displayDate: string;
  readingTime: string;
  blocks: Block[];
  /**
   * Direct answers to the questions this post is really about. Rendered on the
   * page and mirrored into FAQPage schema. Lead with the answer, not context —
   * these are what an answer engine quotes.
   */
  faqs?: { q: string; a: Rich }[];
  /** Slugs of posts to surface at the end. Falls back to the next post. */
  related?: string[];
};

export const POSTS: Post[] = [
  {
    slug: "how-to-choose-a-designer",
    title: "How to choose a designer for your small business",
    dek: "Eight questions to ask before you pay anyone. None of them require you to know anything about design.",
    metaDescription:
      "Eight questions to ask before hiring a logo or website designer \u2014 on files, ownership, revisions, deadlines and who holds your accounts.",
    date: "2026-09-22",
    displayDate: "September 2026",
    readingTime: "6 min",
    blocks: [
      {
        kind: "p",
        text: "Most people hiring a designer have never done it before, and will not do it again for years. That is an uncomfortable position to buy from: you cannot tell good work from confident work, and the vocabulary is designed to make you feel like the one who does not belong in the conversation.",
      },
      {
        kind: "p",
        text: "You do not need to fix that. You need eight questions, none of which are about design. They are the same questions you would ask a builder, and the answers separate people who will do the work from people who will manage you.",
      },
      { kind: "h2", text: "1. What exactly do I get, as a list?" },
      {
        kind: "p",
        text: "Not \u201Ca logo package\u201D \u2014 a list. How many concepts. Which file formats. Whether the business card is included or extra. If someone cannot write that list down before starting, they have not decided what they are selling, and the gap will be filled later at your expense.",
      },
      { kind: "h2", text: "2. Do I own it, and which files do I get?" },
      {
        kind: "p",
        text: [
          "You want the vector files \u2014 AI, EPS, SVG, PDF \u2014 and you want to own the design outright. A logo supplied only as a JPEG cannot be used by a sign-maker or an embroiderer and will have to be redrawn. A logo you do not own cannot be trademarked. This is the single most common gap between what people think they bought and what they got, and it is covered in more detail in ",
          { text: "what a logo and website actually cost", href: "/journal/what-a-logo-and-website-cost" },
          ".",
        ],
      },
      { kind: "h2", text: "3. How many revisions, and what counts as one?" },
      {
        kind: "p",
        text: "Ask for a number, then ask what happens on the round after that. Be suspicious of \u201Cunlimited\u201D: it is usually capped in the contract, and where it is not, it tends to mean nobody is committing to getting it right \u2014 you will simply be worn down instead. Also ask what counts. Changing a colour is a revision; deciding you want a completely different concept is new work, and an honest answer says so up front rather than after four rounds of goodwill.",
      },
      {
        kind: "quote",
        text: "\u201CUnlimited revisions\u201D in the advert and three in the contract is the most common gap in this industry. Ask which document wins.",
      },
      { kind: "h2", text: "4. When will it be done, and what if it is late?" },
      {
        kind: "p",
        text: "A date, in writing, before you pay. Then ask what happens if it slips. There does not need to be a penalty, but there needs to be an answer, and the answer tells you whether the date was a plan or a sales tactic.",
      },
      { kind: "h2", text: "5. Who actually does the work?" },
      {
        kind: "p",
        text: "It is entirely fine for the person selling to not be the person designing, and fine for a team to be involved. What matters is that somebody says so plainly, and that one named person is accountable for what reaches you. The bad version is not a team \u2014 it is being told you are hiring a founder and discovering you were not.",
      },
      { kind: "h2", text: "6. What happens after it is live?" },
      {
        kind: "p",
        text: "Websites are not finished when they launch. Ask what a small change costs in six months, whether updates and backups are included or a separate plan, and who you contact when something breaks on a Sunday. If the answer is vague now, it will be expensive later.",
      },
      { kind: "h2", text: "7. Whose account is my website in?" },
      {
        kind: "p",
        text: "The domain, the hosting and the content system should be in accounts with your name and your card on them. This is the quiet one, and it is the one that traps people: if the keys sit with the agency, the cost of leaving is whatever they decide it is. You can grant access. You should not surrender ownership.",
      },
      { kind: "h2", text: "8. Can I see something you made for a business like mine?" },
      {
        kind: "p",
        text: "Not an identical business \u2014 a comparable one, at a comparable budget. A portfolio full of work for companies twenty times your size tells you nothing about what your money buys. If what you are shown is concept work rather than client work, that is fine, as long as they say so.",
      },
      { kind: "h2", text: "Red flags that need no question" },
      {
        kind: "list",
        items: [
          "A price that only appears after a call. If the number depends on what you look like you can pay, it is not a price.",
          "A countdown timer on the pricing page. A discount that expires every day is not a discount.",
          "No delivery date offered until after the deposit.",
          "A portfolio with no names, no dates and no indication of what was actually done.",
          "Pressure to decide now. Nothing about design work is urgent enough to justify it.",
        ],
      },
      { kind: "h2", text: "The one that matters most" },
      {
        kind: "p",
        text: "Ask what is not included. Anyone can describe what you get; the honest answer to what you do not get is short, specific and slightly uncomfortable to say. It is the fastest way to tell whether you are being sold to or being told.",
      },
    ],
    faqs: [
      {
        q: "How do I choose a logo designer?",
        a: "Ask for the deliverables as a written list, confirm the vector files and full ownership are included, get the revision count and what counts as a revision, and get a delivery date in writing before paying. Whether you like their portfolio matters less than whether they will answer those four questions plainly.",
      },
      {
        q: "Should I hire a freelancer or an agency?",
        a: "Hire a freelancer when the job is one thing and you can describe what you want \u2014 you will pay less and move faster. Hire a company when the job crosses logo, website and getting found at once, or when you need it to still be supported in a year. The risk with freelancers is availability; the risk with agencies is paying for overhead you do not use.",
      },
      {
        q: "What should I ask before paying a web designer?",
        a: "What is included as a list, who owns the result, how many revisions, the delivery date, what a change costs after launch, and whose account the domain and hosting sit in. That last one decides what leaving costs you later.",
      },
      {
        q: "Is a cheap logo designer worth it?",
        a: "Sometimes. A cheap logo is a reasonable choice for a business testing an idea. The mistake is not the price, it is not checking whether the vector files and the ownership are included \u2014 because buying those separately afterwards often costs more than the logo did.",
      },
    ],
    related: ["what-a-logo-and-website-cost", "monthly-plan-or-one-off-project"],
  },
  {
    slug: "what-a-logo-and-website-cost",
    title: "What a logo and website actually cost in 2026",
    dek: "Three price bands, what each one really buys, and the charges that turn a $40 logo into a $300 one.",
    metaDescription:
      "What a small business logo and website cost in 2026 — the three real price bands, what each includes, and the hidden fees to check for before you buy.",
    date: "2026-09-22",
    displayDate: "September 2026",
    readingTime: "7 min",
    blocks: [
      {
        kind: "p",
        text: "Almost nobody will tell you the number. Ask three agencies what a website costs and you will get three requests for a discovery call, because the honest answer depends on scope and the dishonest answer depends on what they think you can pay. Both end with you no wiser.",
      },
      {
        kind: "p",
        text: "So here is the shape of the market, with numbers. There are three bands, they buy genuinely different things, and most of the money wasted in this industry is spent by someone in the wrong band for their situation.",
      },
      { kind: "h2", text: "Band 1: $5–$50, the marketplace" },
      {
        kind: "p",
        text: "Fiverr, a logo generator, a template site. At this price you are buying output, not judgement. Sometimes that is exactly right — if you need a mark on a van by Friday and the business may not exist in a year, spending $2,000 on brand strategy is the mistake, not the $30 logo.",
      },
      {
        kind: "p",
        text: "What catches people is not the quality. It is the file formats. A $30 logo very often arrives as a JPEG or a PNG, and neither can be used by a sign-maker, an embroiderer, a printer or an app store. When you go back for the vector files — AI, EPS, SVG, PDF — that is a separate purchase, and it is frequently more than the logo cost. Check before you buy, not after.",
      },
      {
        kind: "quote",
        text: "The cheap logo is rarely the price you were quoted. It is that price plus whatever it costs to get the files you can actually use.",
      },
      { kind: "h2", text: "Band 2: $100–$5,000, productized" },
      {
        kind: "p",
        text: "A fixed price, a fixed scope, a delivery date, and a real designer doing the work. This is where most small businesses should be, and it is the band that barely existed ten years ago.",
      },
      {
        kind: "list",
        items: [
          "$100–$400 — a logo with a handful of concepts and a couple of revision rounds. Expect the full file set included at this price; if it is not, you are in band 1 with better marketing.",
          "$400–$1,000 — a logo plus the things you need the week after: colours, type, business card, social profiles. Or a small website of three to six pages.",
          "$1,000–$3,000 — a proper business website with a content system you can edit, a blog, on-page SEO, and your Google Business Profile set up.",
          "$3,000–$5,000 — an online store with products loaded and payments live, or a larger site with booking, quote capture, or multiple locations.",
        ],
      },
      {
        kind: "p",
        text: [
          "Our own packages sit in this band and every price is published on the ",
          { text: "packages page", href: "/packages" },
          " rather than quoted on request.",
        ],
      },
      { kind: "h2", text: "Band 3: $10,000 and up, the agency" },
      {
        kind: "p",
        text: "Strategy, research, custom development, a team assigned to you. This is real work and the price is not a rip-off — but it solves a problem most small businesses do not have yet. You are paying for discovery: someone to work out what the business should say before anyone designs anything.",
      },
      {
        kind: "p",
        text: "Buy this when the answer genuinely is not known — a new category, a complicated service, a merger of two brands, a product with real compliance constraints. If you can describe your business in two sentences and name your customers, you are paying for a process you could have skipped.",
      },
      { kind: "h2", text: "The charges that move the real price" },
      {
        kind: "p",
        text: "The headline number is the smaller half of this. Five things quietly decide what you actually pay, and all five are answerable before you hand over a card.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "File release. Are the vector files included, or extra? Ask for the list of formats in writing.",
          "Ownership. Do you own the design outright, or license it? A logo you do not own cannot be trademarked.",
          "The credit fee. Some agencies put their name in your footer and charge to remove it — commonly 10% of the build, or a few hundred dollars flat.",
          "Revision caps. \u201CUnlimited revisions\u201D in the advert and three in the contract is the most common gap in this industry. Ask which document wins.",
          "Who holds the keys. If the hosting, domain and content system are in their account rather than yours, the price of leaving is whatever they decide later.",
        ],
      },
      { kind: "h2", text: "How to read a quote in five minutes" },
      {
        kind: "p",
        text: "Ask three questions. What exactly is included, in a list. What is the delivery date. What happens if I want a change after it is delivered. A quote that answers all three in writing is a scoped quote. One that cannot is an opening position, and the number will move.",
      },
      {
        kind: "p",
        text: "None of this requires you to know anything about design. It requires you to ask what you are buying, which is the same question you would ask a builder.",
      },
    ],
    faqs: [
      {
        q: "How much does a logo cost for a small business?",
        a: [
          "Expect $100\u2013$400 for a professionally designed logo with a few concepts and revision rounds, and the full vector file set included. Below about $50 you are usually buying a raster file and paying again for the artwork a printer can use. Our own logo packages start at $99 and include the full vector set at every tier \u2014 see the ",
          { text: "packages page", href: "/packages" },
          ".",
        ],
      },
      {
        q: "How much does a small business website cost?",
        a: "A simple three to five page site runs about $400\u2013$900. A business site with a content system you can edit yourself, a blog and basic SEO is roughly $900\u2013$1,500. Online stores start around $1,300 once products, payments and shipping are configured. Above $10,000 you are buying strategy and custom development, which most small businesses do not need yet.",
      },
      {
        q: "Why are some logos $30 and others $3,000?",
        a: "Three things: whether a person made judgement calls or a generator produced output, whether the file set you need is included or sold separately, and whether you own the result outright. The design itself is often the smallest part of the difference.",
      },
      {
        q: "What file formats should a logo come with?",
        a: "Vector files \u2014 AI, EPS, SVG and PDF \u2014 plus web formats like PNG and JPG, and ideally colour, black and reversed versions. Vectors scale to any size without blurring, which is why printers, sign-makers and app stores ask for them. A logo supplied only as a JPEG will have to be redrawn.",
      },
    ],
    related: ["how-to-choose-a-designer", "monthly-plan-or-one-off-project"],
  },
  {
    slug: "monthly-plan-or-one-off-project",
    title: "Monthly plan or one-off project?",
    dek: "A project buys you a thing. A monthly plan buys you someone whose job it is. Most small businesses need one of each, and pay for the wrong one.",
    metaDescription:
      "When a small business should pay monthly for website care or SEO, when a one-off project is enough, and how to avoid paying for both badly.",
    date: "2026-09-22",
    displayDate: "September 2026",
    readingTime: "6 min",
    blocks: [
      {
        kind: "p",
        text: "There are two ways to buy design and web work, and the difference is not the price. A project buys you a finished thing on a date. A monthly plan buys you someone whose job it is to keep something working, or to keep making something happen, indefinitely.",
      },
      {
        kind: "p",
        text: "Getting this wrong is expensive in both directions \u2014 paying monthly for work that finished in March, or paying for a one-off site and then watching it rot because nobody was responsible for it.",
      },
      { kind: "h2", text: "What a project is good at" },
      {
        kind: "p",
        text: "Anything with a finish line you can describe. A logo. A website. A store. An explainer video. You can name what done looks like, so you can buy it for a fixed price, hold someone to a date, and stop paying when it arrives.",
      },
      {
        kind: "p",
        text: "If you can finish the sentence \u201Cit is done when\u2026\u201D, buy a project.",
      },
      { kind: "h2", text: "What a monthly plan is good at" },
      {
        kind: "p",
        text: "Anything that is never finished. Security updates and backups. Ranking on Google. Posting to social media. Fixing the thing that broke after an update you did not know happened. None of these have a finish line, and buying them as one-off projects means paying a premium every time to re-explain your business to somebody.",
      },
      {
        kind: "list",
        items: [
          "Website care \u2014 updates, backups, security, uptime, and small edits. The one most small businesses actually need and skip.",
          "Local SEO \u2014 Google Business Profile, citations, and pages that answer local searches. Three months minimum before anything moves.",
          "Social media \u2014 posting consistently, which is the only thing that makes it work.",
        ],
      },
      { kind: "h2", text: "The test" },
      {
        kind: "p",
        text: "Ask whether the work stops mattering once it is delivered. A logo does \u2014 once it exists, it exists. A website does not: it needs updating, it drifts out of date, and it is a target for anyone scanning for outdated software. That is the whole distinction.",
      },
      {
        kind: "quote",
        text: "A website is a thing you own, not a thing you finished. The question is only whether you are the one maintaining it.",
      },
      { kind: "h2", text: "What most small businesses should actually do" },
      {
        kind: "p",
        text: [
          "One project, then one small monthly plan. Build the site as a fixed-price project, then keep it on the cheapest care plan that covers updates and backups. Add SEO or social only when there is something to promote and someone ready to answer the phone. Our ",
          { text: "packages page", href: "/packages" },
          " lists both, and the site builds include the first months of care so the handover is not a cliff.",
        ],
      },
      { kind: "h2", text: "How not to waste a monthly plan" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Know what it includes. \u201CMaintenance\u201D should list updates, backups, monitoring and how much edit time you get.",
          "Use the included time. Most plans include monthly edits that go unclaimed for months, then get requested all at once.",
          "Ask what you receive each month. A report you cannot read is not a report.",
          "Check you can cancel. A plan with a twelve-month lock-in is a loan, not a service.",
          "Check whose accounts it runs on. If the hosting and domain are not in your name, the plan is not the only thing you would be leaving.",
        ],
      },
      { kind: "h2", text: "How to tell by month three whether it is working" },
      {
        kind: "p",
        text: "For care, the test is boring: the site is up, it is current, and nothing has broken that you noticed before they did. For SEO, expect movement in calls, direction requests and enquiries \u2014 not keyword positions, which can improve while your phone stays silent. If you cannot tell the difference between having the plan and not having it, say so, and ask them to show you what changed.",
      },
    ],
    faqs: [
      {
        q: "Do I need a website maintenance plan?",
        a: "If your site runs on WordPress or a store platform, yes \u2014 core and plugin updates are security patches, and an unpatched site is how small businesses get defaced or blacklisted. If it is a small static site and you are comfortable checking it, you can do without. Care plans start around $99 a month.",
      },
      {
        q: "How long before SEO works?",
        a: "Three to six months for meaningful movement, and local SEO usually shows first because the competition is smaller. Anyone promising rankings in weeks is either bidding on your business name or selling you ads and calling it SEO.",
      },
      {
        q: "Should I pay monthly or one-off for a website?",
        a: "Pay one-off for the build, because it has a finish line and a fixed price. Pay monthly only for what never finishes \u2014 updates, backups, security, SEO, social. Beware monthly website deals that spread the build cost over two years: you usually do not own the site, and stopping payment means losing it.",
      },
      {
        q: "Can I cancel a monthly plan?",
        a: "You should be able to, at any time, without a minimum term \u2014 and you should check that before signing rather than after. Ours can be cancelled any month; the month already in progress is not refunded.",
      },
    ],
    related: ["what-a-logo-and-website-cost", "why-your-business-doesnt-show-up-on-google"],
  },
  {
    slug: "why-your-business-doesnt-show-up-on-google",
    title: "Why your business doesn\u2019t show up on Google",
    dek: "Six reasons a small business site stays invisible, in the order worth fixing them \u2014 and the one that is almost always the real problem.",
    metaDescription:
      "Six reasons a small business website doesn\u2019t show up on Google, what to fix first, and how long each change takes to show results.",
    date: "2026-09-22",
    displayDate: "September 2026",
    readingTime: "7 min",
    blocks: [
      {
        kind: "p",
        text: "You search your own trade and your town, and you are not there. Someone with a worse website is. This is the most common complaint small businesses have about their site, and the cause is usually not the thing they are worried about.",
      },
      {
        kind: "p",
        text: "Here are the six real reasons, roughly in the order they are worth fixing. The first one alone explains most cases.",
      },
      { kind: "h2", text: "1. Your Google Business Profile is thin or unclaimed" },
      {
        kind: "p",
        text: "For a local business this is bigger than the website. The map results sit above everything else, and they are drawn from your Business Profile, not your site. If it is unclaimed, has the wrong hours, no categories, no photos and no reviews, you will not appear \u2014 however good the website is.",
      },
      {
        kind: "p",
        text: "Claim it, set the primary category precisely, add real photos, and ask customers for reviews. It is free, it takes an afternoon, and it beats any amount of work on the site itself.",
      },
      { kind: "h2", text: "2. Your pages don\u2019t say where you are" },
      {
        kind: "p",
        text: "\u201CWe provide quality service with a personal touch\u201D could be any business anywhere. If the page never names the town, the neighbourhoods, or the areas you cover, there is nothing for a local search to match against. Write like someone describing the business to a neighbour.",
      },
      { kind: "h2", text: "3. One page is doing the work of six" },
      {
        kind: "p",
        text: "A single Services page listing eight things will lose to eight pages that each answer one question properly. If you fit boilers, install bathrooms and unblock drains, those are three searches and three pages. This is the most common structural mistake, and it is why a competitor with an uglier site outranks you.",
      },
      {
        kind: "quote",
        text: "You cannot rank for a question your website never answers. Most small sites answer one question and hope.",
      },
      { kind: "h2", text: "4. The site is slow on a phone" },
      {
        kind: "p",
        text: "Nearly all of this traffic is mobile, often on a mediocre connection. A site that takes six seconds to show anything loses visitors before it loses rankings \u2014 and the visitors are the part you actually care about. Huge unresized photos are the usual culprit: a 4MB image straight off a camera is the single most common cause of a slow small-business site.",
      },
      { kind: "h2", text: "5. Nothing on the site is worth linking to or quoting" },
      {
        kind: "p",
        text: "Search engines, and the AI assistants people increasingly ask instead, need something specific to cite. Prices, a real process, straight answers to the questions customers actually ask. A page of adjectives gives them nothing. This is also why a FAQ that answers real questions in plain sentences outperforms a page of marketing copy.",
      },
      { kind: "h2", text: "6. A redesign quietly deleted your old pages" },
      {
        kind: "p",
        text: "If rankings fell off a cliff after a new site launched, this is almost certainly it. Old URLs were dropped without redirects, so every link and every ranking pointing at them now hits a dead end. It is fixable \u2014 map the old addresses to the new ones \u2014 but only if someone knows to look.",
      },
      { kind: "h2", text: "The order to fix them in" },
      {
        kind: "list",
        ordered: true,
        items: [
          "Claim and fill in the Google Business Profile. Days, not months, and free.",
          "Add redirects if a redesign dropped old pages. Urgent if it applies.",
          "Resize the images. One afternoon, and it helps conversions as much as rankings.",
          "Split the services page into one page per thing you sell.",
          "Put the town and the areas you cover into the copy, naturally.",
          "Add straight answers to the questions customers ask before buying.",
        ],
      },
      { kind: "h2", text: "What this does not fix" },
      {
        kind: "p",
        text: "If you are trying to rank nationally against businesses with budgets, none of the above closes that gap, and anyone promising it will is selling you something. Local visibility is winnable by a small business. National rankings in a competitive category are a different sport.",
      },
      {
        kind: "p",
        text: [
          "If you would rather not do any of this yourself, it is what our ",
          { text: "local SEO plans", href: "/services/local-seo" },
          " cover, starting at $299 a month.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is my business not showing up on Google?",
        a: "Most often because the Google Business Profile is unclaimed or incomplete, which drives the map results that sit above everything else. After that: pages that never name your location, one services page covering everything instead of a page per service, and a slow site on mobile. Claim the profile first \u2014 it is free and it moves fastest.",
      },
      {
        q: "How long does local SEO take to work?",
        a: "Google Business Profile changes can show within days. Website changes typically take three to six months to settle. Anyone promising rankings in weeks is either targeting your own business name, which you already rank for, or buying ads and calling it SEO.",
      },
      {
        q: "Does my website need to be fast to rank?",
        a: "Speed is a ranking factor, but it matters more for conversions: a site that takes several seconds on a phone loses people before rankings enter into it. The usual cause in small business sites is full-size photos uploaded straight from a camera. Resizing them is often the single biggest improvement available.",
      },
      {
        q: "My rankings dropped after a new website. Why?",
        a: "Almost always because the old page addresses were not redirected to the new ones. Every link and ranking pointing at the old URLs now hits a dead end. It is fixable by mapping old addresses to new, and the sooner it is done the more is recovered.",
      },
    ],
    related: ["what-a-logo-and-website-cost", "monthly-plan-or-one-off-project"],
  },
  {
    slug: "how-we-charge-99-for-a-logo",
    title: "How we charge $99 for a logo",
    dek: "A cheap price usually hides something. Here is exactly where ours comes from, and what it does and does not buy you.",
    metaDescription:
      "Why a $99 logo can be legitimate \u2014 how productized pricing and an offshore production team work, and what a cheap price should never cost you.",
    date: "2026-09-22",
    displayDate: "September 2026",
    readingTime: "5 min",
    blocks: [
      {
        kind: "p",
        text: "If you have been burned before, a low price is a warning, not a bargain. That instinct is correct often enough to be worth respecting, so rather than ask you to trust us, here is the arithmetic.",
      },
      { kind: "h2", text: "Where the cost actually goes in agency work" },
      {
        kind: "p",
        text: "In a traditional agency, the design is a minority of what you pay for. The rest is the sales process \u2014 the calls, the pitch, the proposal, the account manager who exists to relay messages \u2014 plus the cost of everything that was quoted and never won. A studio that loses two pitches in three has to recover that from the third.",
      },
      {
        kind: "p",
        text: "That is not waste for everyone. If your problem genuinely needs working out, discovery is the thing you are buying. But most small businesses know what they do and who buys it, and are paying for a process that tells them what they already knew.",
      },
      { kind: "h2", text: "What we took out" },
      {
        kind: "list",
        items: [
          "No sales calls. Prices are published, so nobody spends an hour discovering whether you can afford us.",
          "No proposals. The package list is the proposal.",
          "No account layer. The brief goes to the people doing the work.",
          "No unpaid pitching. We do not design on spec to win jobs, so you are not paying for the ones we lost.",
        ],
      },
      {
        kind: "p",
        text: "Between them, those are most of the gap between $99 and $900.",
      },
      { kind: "h2", text: "And the part people do not say out loud" },
      {
        kind: "p",
        text: "Production is handled by a team we work with directly, outside the US. This is how a great deal of design work at every price point is made, including plenty sold at ten times ours \u2014 the difference is usually only whether the client is told.",
      },
      {
        kind: "p",
        text: "What we hold onto is the review step. Nothing reaches you unseen, and one named person here is accountable for what lands in your inbox. That is the part that actually determines whether cheap work is any good.",
      },
      {
        kind: "quote",
        text: "A low price is only a problem when it is subsidised by something you were not told about \u2014 your files, your ownership, or your time.",
      },
      { kind: "h2", text: "What a cheap price should never cost you" },
      {
        kind: "p",
        text: [
          "This is the line we care about. Cheap work goes wrong when the discount is quietly taken out of what you receive: a logo delivered as an unusable JPEG, vector files sold back to you afterwards, a fee to remove someone\u2019s name from your own footer, \u201Cunlimited\u201D revisions capped in a contract you did not read. Every one of those is a way of charging twice. We have written about them in ",
          { text: "what a logo and website actually cost", href: "/journal/what-a-logo-and-website-cost" },
          ".",
        ],
      },
      {
        kind: "p",
        text: "So the $99 package includes the full vector set, full ownership, and two revision rounds that mean two. The price is lower. What you receive is not.",
      },
      { kind: "h2", text: "The honest limitations" },
      {
        kind: "list",
        items: [
          "Fixed scope. A package is a package \u2014 if you want something outside it, that is a quote, not a favour.",
          "No strategy phase. We are not going to discover your positioning for $99, and we will not pretend to.",
          "Concepts, not committees. More opinions in the room means more rounds, and the cheaper tiers have a round limit for a reason.",
          "If your problem is genuinely complicated, an agency charging ten times this may be the right answer. We will say so.",
        ],
      },
      {
        kind: "p",
        text: "None of that is a catch. It is just the shape of the trade: a narrower promise, kept exactly.",
      },
    ],
    faqs: [
      {
        q: "How can a logo only cost $99?",
        a: "By removing the sales process, the proposal stage and the account layer, and by not recovering the cost of lost pitches from the clients who say yes. Production is handled by a team outside the US with a review step before anything reaches you. The saving comes out of overhead, not out of the files you receive.",
      },
      {
        q: "Is a cheap logo design any good?",
        a: "It depends entirely on what has been removed to reach the price. If the saving comes from cutting overhead, it can be very good. If it comes from withholding the vector files, charging for ownership, or capping revisions you were told were unlimited, you will pay the difference later. Ask what is included before you buy, not after.",
      },
      {
        q: "Do you outsource the design work?",
        a: "Production is handled by a team we work with directly, outside the US, and everything is reviewed here before it reaches you, with one named person accountable. Most agencies at every price point work this way; we would rather say so than have you find out.",
      },
    ],
    related: ["what-a-logo-and-website-cost", "how-to-choose-a-designer"],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

/** Authored text as a uniform list of runs, so renderers only handle one case. */
export function runs(text: Rich): Inline[] {
  return typeof text === "string" ? [text] : text;
}

/** Text content with links flattened — for word counts and schema. */
export function plainText(text: Rich): string {
  return runs(text)
    .map((run) => (typeof run === "string" ? run : run.text))
    .join("");
}

/**
 * Stable anchor id for a heading, so section links survive copy edits to
 * surrounding prose and can be shared directly.
 */
export function headingId(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Section headings in document order, for the on-page contents list. */
export function postHeadings(post: Post) {
  return post.blocks
    .filter((b): b is { kind: "h2"; text: string } => b.kind === "h2")
    .map((b) => ({ text: b.text, id: headingId(b.text) }));
}

/**
 * Everything a reader sees, as plain paragraphs — used for `articleBody` and
 * word counts. Includes the FAQ, which is page content: counting only `blocks`
 * understates a post by a couple of hundred words.
 */
export function postProse(post: Post): string[] {
  const body = post.blocks.flatMap((block) => {
    switch (block.kind) {
      case "h2":
        return [block.text];
      case "p":
      case "quote":
        return [plainText(block.text)];
      case "list":
        return block.items.map(plainText);
    }
  });
  const faq = (post.faqs ?? []).flatMap((entry) => [
    entry.q,
    plainText(entry.a),
  ]);
  return [...body, ...faq];
}

export function postWordCount(post: Post) {
  return postProse(post).join(" ").trim().split(/\s+/).length;
}

/**
 * Posts to read next: the authored `related` slugs, falling back to the next
 * post in the list so a post with none still ends somewhere.
 */
export function relatedPosts(post: Post): Post[] {
  const picks = (post.related ?? [])
    .map(getPost)
    .filter((p): p is Post => Boolean(p) && p!.slug !== post.slug);
  if (picks.length) return picks;
  const next = POSTS[(POSTS.findIndex((p) => p.slug === post.slug) + 1) % POSTS.length];
  return next.slug === post.slug ? [] : [next];
}
