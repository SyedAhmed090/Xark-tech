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
    slug: "how-to-choose-a-b2b-saas-design-agency",
    title: "How to choose a B2B SaaS design agency",
    dek: "Nine questions that separate studios that will do the work from studios that will manage it.",
    metaDescription:
      "Nine questions to ask before hiring a B2B SaaS design agency — on staffing, domain depth, scope changes, and what you own after launch.",
    date: "2026-08-13",
    displayDate: "August 2026",
    readingTime: "7 min",
    blocks: [
      {
        kind: "p",
        text: "We lose pitches. That is not a humble brag — it is the part of this business that taught us what buyers can and cannot see from the outside. The teams that chose someone else and came back a year later almost never say the work was bad. They say the work was fine and the engagement was exhausting: four people in every call, none of whom could make a decision, and a launch that arrived as a folder of files nobody knew how to maintain.",
      },
      {
        kind: "p",
        text: "None of that is visible in a portfolio. Portfolios are a filter for taste, and taste is table stakes at this price point. What you are actually buying is a way of working, and there are nine questions that expose it before you sign.",
      },
      { kind: "h2", text: "1. Who is in my file on Tuesday?" },
      {
        kind: "p",
        text: "Ask for names, not roles. Then ask what else those named people are on during your engagement. The most common gap between a pitch and a project is that the seniors who won the work rotate off it, and the people who execute are two years out of school with a founder reviewing them on Fridays.",
      },
      {
        kind: "p",
        text: "This is not a moral failing, it is an economic one. An agency that bills you for seniors and staffs you with juniors is arbitraging that spread — it is where the margin lives at scale. You are allowed to ask which model you are buying. Get the answer in writing, in the statement of work, with names.",
      },
      { kind: "h2", text: "2. Have you designed something that had to be learned?" },
      {
        kind: "p",
        text: "Consumer work optimizes for the first ten seconds. B2B software optimizes for the ten thousandth hour: a dispatcher who lives in one screen all day, a CFO who needs to trust a number enough to sign against it, a nurse who is being interrupted while doing it. Those are different design problems, and a beautiful consumer portfolio is weak evidence of skill at either.",
      },
      {
        kind: "p",
        text: [
          "Look for work where density was the point, where the constraint was a regulation or an integration rather than a mood board. When we redesigned dispatch tooling at ",
          { text: "Atlas Freight", href: "/work/atlas-freight" },
          ", the win was not a nicer screen — it was cutting new-dispatcher training from six weeks to two. Ask what got measurably easier, and for whom.",
        ],
      },
      { kind: "h2", text: "3. What do you need from us, and when?" },
      {
        kind: "p",
        text: "Design has a client-side cost, and studios that hide it are setting up the first fight. A real answer sounds specific and slightly inconvenient: two hours a week from a named decision-maker, access to five customers for interviews in weeks one and two, an engineering lead in the room when the system gets defined.",
      },
      {
        kind: "p",
        text: "If an agency says they need almost nothing from you, they are either about to design in a vacuum or about to bill you for discovery you could have handed them in an afternoon.",
      },
      { kind: "h2", text: "4. What happens when we disagree?" },
      {
        kind: "p",
        text: "Every engagement has a moment where the client wants the thing the studio thinks is wrong. What you want to hear is a mechanism, not a personality: who decides, on what evidence, by when, and what gets written down when the client overrules the recommendation.",
      },
      {
        kind: "quote",
        text: "An agency with no way to lose an argument gracefully will simply agree with you until the work is mediocre and nobody can say why.",
      },
      { kind: "h2", text: "5. What are we left holding?" },
      {
        kind: "p",
        text: [
          "The end of a good engagement is not a handoff of files, it is a transfer of capability. Ask what your team can do on day 31 that it could not do on day 1. The honest version of that answer includes a design system with a written decision protocol — who may add a pattern, and what happens when a product team needs a variant on Thursday. We have argued this at length in ",
          { text: "design systems are a management tool", href: "/journal/design-systems-are-a-management-tool" },
          ", because it is the difference between a library that maintains itself and one you redraw in eighteen months.",
        ],
      },
      { kind: "h2", text: "6. What have you turned down?" },
      {
        kind: "p",
        text: "A studio that has never declined work has no point of view, or no pipeline. Both are risks to you. The specific answer matters more than the fact of it: a studio that turns down projects for the wrong sector or the wrong timeline is disciplined; one that turns down anything under a number is just expensive.",
      },
      { kind: "h2", text: "7. How do you price change?" },
      {
        kind: "p",
        text: "Scope will change. It always does, usually because you learn something true in week three that invalidates a week-one assumption. The question is whether change is a conversation or a penalty. Ask for the actual mechanic: what triggers a change order, who signs it, how fast it turns around, and whether small trades — this screen instead of that one — are free.",
      },
      {
        kind: "p",
        text: "Fixed-fee engagements with no trade mechanism go one of two ways. Either you eat the change, or the studio does and quietly reduces care everywhere else.",
      },
      { kind: "h2", text: "8. What does your work look like eighteen months later?" },
      {
        kind: "p",
        text: "This is the question almost nobody asks, and the one with the highest information content. Ask for a client whose site or product has been live for over a year, then go look at it. Has it drifted into a patchwork of one-offs? Has the brand survived contact with a marketing team and three new features? Ask that client one thing: what broke first.",
      },
      { kind: "h2", text: "9. Who else has to say yes?" },
      {
        kind: "p",
        text: [
          "Layers inside the agency become latency inside your project. Every account manager between you and the person doing the work is a place where a hard truth gets softened before it reaches you. This is why we ",
          { text: "stay four people", href: "/journal/why-we-stay-four-people" },
          " — though the honest cost of that shape is that we book out a quarter ahead and cannot parallelize a large program. Ask about the shape; ask what it costs you.",
        ],
      },
      { kind: "h2", text: "Red flags that do not need a question" },
      {
        kind: "list",
        items: [
          "A proposal with no named people and no dates.",
          "A price with no scope attached, or a scope with no price.",
          "Case studies that describe process but never an outcome — no metric, no before, no after.",
          "Unsolicited redesign concepts in the pitch. Confident, and made without knowing anything about your users or constraints.",
          "Enthusiastic agreement with everything you say in the first call.",
        ],
      },
      { kind: "h2", text: "The meta-question" },
      {
        kind: "p",
        text: "Ask each finalist what they would need to see to tell you not to do this project. A studio that cannot answer has only one product to sell you. The answer we give is usually about timing: if your product has no distribution problem and no retention problem, a rebrand is the most expensive way to feel productive.",
      },
      {
        kind: "p",
        text: [
          "If it helps to see how we answer these ourselves, our engagement shapes and prices are on the ",
          { text: "packages page", href: "/packages" },
          ", the team and the working model are in ",
          { text: "the studio", href: "/studio" },
          ", and the fastest way to test the questions above is to ",
          { text: "ask them on a call", href: "/contact" },
          ".",
        ],
      },
    ],
    faqs: [
      {
        q: "What should a B2B SaaS design agency cost?",
        a: [
          "For senior-led work in complex B2B, expect $35k–$120k for a bounded project like an identity or a site, and $20k–$110k per month for continuous product design. Below roughly $20k a project you are usually buying a freelancer's time with an agency's overhead on top. Our own entry points are published on the ",
          { text: "packages page", href: "/packages" },
          " rather than quoted on request.",
        ],
      },
      {
        q: "Should we hire an agency or a freelancer?",
        a: "Hire a freelancer when the work is one discipline and you can direct it yourself — you will pay less and move faster. Hire a studio when the work crosses brand, product and engineering handoff at once, or when nobody internally has time to be the missing art director. The failure mode of freelancers is coordination; the failure mode of agencies is overhead.",
      },
      {
        q: "Can our in-house team do this instead?",
        a: "Often, and it is cheaper. The cases where outside help genuinely wins are the ones your team cannot do from inside: a repositioning that requires being rude about a sacred cow, a system that needs an outsider to arbitrate between two product squads, or a launch that has to happen while the team keeps shipping. If none of those apply, keep the money.",
      },
    ],
    related: ["what-a-b2b-software-rebrand-costs", "design-retainer-vs-project-work"],
  },
  {
    slug: "what-a-b2b-software-rebrand-costs",
    title: "What a B2B software rebrand actually costs",
    dek: "Not a price list — the four variables that move the same project from $35k to $250k, and how to tell which one you are paying for.",
    metaDescription:
      "What a B2B software rebrand costs, the four variables that drive the number, and how to tell whether a quote is scoped or padded.",
    date: "2026-08-13",
    displayDate: "August 2026",
    readingTime: "7 min",
    blocks: [
      {
        kind: "p",
        text: "Nobody will give you the number on the phone, and there is a legitimate reason plus a bad one. The legitimate reason is that the word rebrand covers everything from a new logo to rebuilding how a company describes itself across a product, a sales motion and four years of documentation. The bad reason is that many studios are waiting to hear your funding stage before pricing.",
      },
      {
        kind: "p",
        text: "So here is the honest shape of it. Serious B2B software rebrands run from about $35k to well past $250k, and the spread is not agency greed — it is four variables. Once you can name which ones apply to you, you can read any proposal in about ten minutes.",
      },
      { kind: "h2", text: "Variable 1: how many surfaces have to survive it" },
      {
        kind: "p",
        text: "A logo is a small problem. A brand that has to hold up inside a data-dense product, in a procurement deck next to a hundred-year-old bank, in API documentation, in a trade-show booth and in an email from a support rep is a large one. Cost tracks surfaces, not opinions.",
      },
      {
        kind: "p",
        text: "Count yours before you brief anyone: marketing site, product UI, sales collateral, documentation, support macros, contracts, mobile, event presence, hiring materials. Most B2B companies find nine to fourteen. A quote that does not enumerate them is guessing, and you will pay for the guess later as scope creep.",
      },
      { kind: "h2", text: "Variable 2: whether the product ships with it" },
      {
        kind: "p",
        text: [
          "The single biggest cost driver is whether the identity has to land inside the software at the same time. Doing both at once is more expensive up front and much cheaper in total, because the alternative is a new brand pointing at an old interface — which is the state that makes buyers trust neither. When ",
          { text: "Meridian", href: "/work/meridian" },
          " relaunched, the identity and the redesigned platform went out in one release; ten interface patterns replaced forty screens of one-offs.",
        ],
      },
      {
        kind: "p",
        text: "If you cannot fund both, sequence deliberately: brand first only if your problem is that nobody knows who you are, product first if your problem is that people try you and leave. Do not split the difference by applying new colors to old screens. That is the one order that wastes both budgets.",
      },
      { kind: "h2", text: "Variable 3: how many people have to agree" },
      {
        kind: "quote",
        text: "Approval count is a cost multiplier, and it is the only one entirely within your control.",
      },
      {
        kind: "p",
        text: "Two decision-makers is a project. Seven is a governance exercise with a design project inside it. Every additional stakeholder adds review cycles, and review cycles are where fees quietly double — not because anyone is billing dishonestly, but because consensus work requires more options, more rationale, and more meetings that produce artifacts instead of decisions.",
      },
      {
        kind: "p",
        text: "Before you brief, name one person who can say yes alone, and one escalation path for when they cannot. Studios that ask about this in the first call are not being nosy; they are pricing your internal politics, which is the input they cannot see.",
      },
      { kind: "h2", text: "Variable 4: what you are left with afterwards" },
      {
        kind: "p",
        text: [
          "A PDF of guidelines is cheap and decays in a year. A system your team can operate — tokens in code, patterns documented, a written protocol for who may add one — costs more and holds. This is the line item people cut first and regret hardest, because a brand with no maintenance model regresses to whatever each team improvises under deadline. We have made the full argument in ",
          { text: "design systems are a management tool", href: "/journal/design-systems-are-a-management-tool" },
          ".",
        ],
      },
      { kind: "h2", text: "A rough map of the ranges" },
      {
        kind: "list",
        items: [
          "$15k–$30k — Identity refresh. New marks, type and palette applied to a handful of surfaces. Appropriate when the positioning is already right and only the execution is dated.",
          "$35k–$70k — Full identity, product-aware. Positioning, verbal and visual system, applied into the product's real screens, with a documented system. Our brand identity work starts at $35k.",
          "$70k–$150k — Identity plus the site or platform shipping together. Two disciplines, one release date.",
          "$150k–$250k+ — Repositioning at company scale: multiple product lines, migration of legacy surfaces, sales enablement, sometimes a naming change.",
        ],
      },
      {
        kind: "p",
        text: [
          "Those bands are what the market looks like in complex B2B, not a promise. Our own tiers and what is in each are on the ",
          { text: "packages page", href: "/packages" },
          ", and the eight-week process behind them is on ",
          { text: "brand identity", href: "/services/brand-identity" },
          ".",
        ],
      },
      { kind: "h2", text: "What to compare, when two quotes are far apart" },
      {
        kind: "p",
        text: "Price differences of 3x between proposals are normal and usually explainable. Read for these four things and the gap resolves into a choice rather than a mystery:",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "Named seniors and their allocation, not roles and percentages.",
          "An enumerated surface list, so you can see what is excluded.",
          "A change mechanism — what happens in week five when you learn something that breaks the week-one brief.",
          "A maintenance model: who owns the system after launch, and what it costs to keep.",
        ],
      },
      {
        kind: "p",
        text: "A cheaper proposal missing all four is not cheaper. It is the same project with the difficult half deferred until it is your problem.",
      },
      { kind: "h2", text: "What the weeks actually buy" },
      {
        kind: "p",
        text: "Fees feel arbitrary until you can see what the time is spent on. An eight-week identity engagement in complex B2B breaks down roughly like this, and the shape is more informative than the total:",
      },
      {
        kind: "list",
        items: [
          "Weeks 1–2, positioning and audit. Customer and sales-call interviews, a competitive read of how your market actually sounds, and an inventory of every surface the brand touches. This is the phase clients most want to skip and the one that decides whether the rest is guesswork.",
          "Weeks 3–5, the system. Marks, type, color, and — in B2B, the part that matters most — how all of it behaves at interface density, where a palette designed for a hero image meets a table with nine columns.",
          "Weeks 6–8, application and documentation. The system meets real screens, real decks and real edge cases, and the maintenance model gets written down.",
        ],
      },
      {
        kind: "p",
        text: "Notice that no week is labelled logo. If a proposal's timeline is mostly concepts and revisions, you are buying a drawing exercise, and the price should be much lower than these bands.",
      },
      { kind: "h2", text: "Where the money actually leaks" },
      {
        kind: "p",
        text: "Across a dozen years of these projects, overruns almost never come from design taking longer than expected. They come from four places, all of them upstream of the studio:",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "Positioning relitigated in week six. The strategy was approved by people who had not internalized it, and the first real application reopens it. This alone can add a month.",
          "A stakeholder introduced late. Someone with veto power sees the work for the first time at the reveal, and the reveal becomes round one.",
          "Surfaces discovered mid-project. The sales team's forty-slide deck, the partner portal nobody mentioned, the trade-show wall with a six-week lead time.",
          "No engineering voice until handoff. A brand that cannot be built at the density your product needs gets simplified in code by whoever ships it last, which is how a $70k identity becomes a suggestion.",
        ],
      },
      {
        kind: "p",
        text: "Three of the four are procurement problems, not design problems. Fixing them costs you nothing and is worth more than any discount you will negotiate.",
      },
      { kind: "h2", text: "The cheapest rebrand is the one you do once" },
      {
        kind: "p",
        text: [
          "Most companies we meet are on their second attempt. The first one failed for a reason that had nothing to do with craft: no maintenance model, no decision-maker, or a brand that never reached the product. Fixing those before you shop will move your quote more than any negotiation. When you are ready to test the number against a real scope, ",
          { text: "tell us what surfaces you counted", href: "/contact" },
          ".",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a B2B rebrand take?",
        a: "Eight to twelve weeks for a full identity that reaches the product, assuming one decision-maker and weekly reviews. Our own brand engagements run eight weeks: two on positioning and audit, three on the system, three on application and documentation. Programs that stretch past four months are usually stalled on approvals, not on design.",
      },
      {
        q: "Can we rebrand without touching the product?",
        a: "You can, and it is the most common way rebrands underdeliver. A new identity that stops at the marketing site sets an expectation the software then contradicts, which reads as a company that spent money on the wrong half. If the product cannot move this quarter, at minimum align color, type and core components so the two surfaces do not argue.",
      },
      {
        q: "Do we need a rebrand or just a new website?",
        a: [
          "If your positioning and story are right and the site simply fails to express them, buy a site — it is faster and less than half the disruption. If you cannot get three executives to describe the company the same way, a new site will just publish the confusion in better typography. That test decides it more reliably than any audit; ",
          { text: "web design and build", href: "/services/web-design-build" },
          " is the cheaper branch.",
        ],
      },
    ],
    related: ["how-to-choose-a-b2b-saas-design-agency", "why-your-b2b-site-doesnt-rank"],
  },
  {
    slug: "design-retainer-vs-project-work",
    title: "Design retainer vs project work",
    dek: "A project buys you a decision. A retainer buys you a rhythm. Choosing the wrong one is the most expensive procurement mistake we watch teams make.",
    metaDescription:
      "When to hire design as a fixed project versus a monthly retainer — four tests, what each model costs, and how to avoid wasting a retainer.",
    date: "2026-08-13",
    displayDate: "August 2026",
    readingTime: "7 min",
    blocks: [
      {
        kind: "p",
        text: "Both models put a similar number on a similar invoice, so teams treat the choice as a procurement detail and pick whichever their finance process digests more easily. Then a retainer gets spent on a backlog of small fixes that a contractor could have done for a fifth of the price, or a rebrand gets bought as a project and lands with nobody funded to maintain it. The two models are genuinely different products.",
      },
      { kind: "h2", text: "What a project is good at" },
      {
        kind: "p",
        text: "Projects are for work with a defined endpoint and a decision at the center. An identity. A site. A platform redesign. The thing that makes a project efficient is that the shape of the answer is unknown but the shape of the question is not, so you can bound scope, price it, and hold a date.",
      },
      {
        kind: "p",
        text: "Projects also force closure. A deadline is a design tool: it makes the twentieth debate about navigation resolve itself. Teams that put continuous work in project clothing lose that, and teams that put finite work on a retainer discover that a project without an end date is a hobby.",
      },
      { kind: "h2", text: "What a retainer is good at" },
      {
        kind: "p",
        text: [
          "Retainers are for a surface that never stops moving. Product design is the obvious case: a roadmap generates design work every sprint, quality drifts the moment nobody senior is watching, and the cost of re-onboarding an agency every quarter exceeds the cost of keeping one. Our ",
          { text: "product design", href: "/services/product-design" },
          " work is retained for exactly that reason, on a two-week design cycle with a weekly review.",
        ],
      },
      {
        kind: "p",
        text: "The value in a retainer is not hours, it is standing context. Month four is cheaper than month one for the same output because nobody has to be told what the product is again. If you find yourself re-explaining the domain in month four, the retainer is not working.",
      },
      { kind: "h2", text: "Test 1: is the work a decision or a rhythm?" },
      {
        kind: "p",
        text: "Write down what you want in one sentence. If it contains a noun that can be finished — a site, an identity, a system — that is a project. If it contains a verb that repeats — shipping, iterating, supporting, maintaining — that is a retainer. Most teams have both, and the mistake is buying one vehicle for both jobs.",
      },
      { kind: "h2", text: "Test 2: how fast does your roadmap change?" },
      {
        kind: "p",
        text: "If your next two quarters are stable enough to write down, a project can be scoped against them. If your roadmap gets rewritten after every enterprise sales call — normal in early B2B — a fixed scope will be obsolete before it is signed, and you will spend the engagement negotiating change orders instead of designing.",
      },
      {
        kind: "quote",
        text: "Fixed scope is a bet that you already know what you need. Retainers are what you buy when the honest answer is that you will know in three weeks.",
      },
      { kind: "h2", text: "Test 3: who owns quality between engagements?" },
      {
        kind: "p",
        text: "Name the person internally who will hold the line on interface quality after a project ends. If that person exists and has authority, buy projects and let them run the product between them. If that person does not exist, a project will decay predictably: six months of small compromises under deadline, then a redesign budget to undo them. A retainer is often the cheaper way to buy that role.",
      },
      { kind: "h2", text: "Test 4: can you name the finish line?" },
      {
        kind: "p",
        text: "Say out loud what has to be true for the work to be done. If the sentence is concrete — the new identity is live across nine surfaces, the checkout ships — take the project. If it is a direction rather than a state, like making the product feel more premium, do not buy a fixed scope against it. You will have no way to know whether you got what you paid for, and neither will your agency.",
      },
      { kind: "h2", text: "The hybrid that actually works" },
      {
        kind: "p",
        text: "The sequence we recommend most often is a project to establish, then a retainer to operate. The project sets the system and makes the expensive decisions with senior attention concentrated. The retainer runs it: new surfaces, roadmap work, and the discipline that keeps the system from silting up.",
      },
      {
        kind: "p",
        text: [
          "The reverse order — retainer first, project later — usually means paying a premium to discover requirements you could have found in a two-week audit. There is one exception: when the real problem is that nobody knows what the problem is, a short retained diagnostic beats guessing at a scope. ",
          { text: "Atlas Freight", href: "/work/atlas-freight" },
          " started that way, and the finding reframed the whole engagement.",
        ],
      },
      { kind: "h2", text: "What each model costs" },
      {
        kind: "list",
        items: [
          "Bounded projects — identity from $35k, a site from $45k, motion and 3D from $20k. Priced against an enumerated scope with a change mechanism.",
          "Retained product design — from $50k per month, senior-led, with a two-week design cycle and a standing weekly review.",
          "Diagnostic engagements — two to three weeks, priced as a small project, existing to tell you which of the two you actually need.",
        ],
      },
      {
        kind: "p",
        text: [
          "Tier detail for each of those is on the ",
          { text: "packages page", href: "/packages" },
          ".",
        ],
      },
      { kind: "h2", text: "How not to waste a retainer" },
      {
        kind: "p",
        text: "Most disappointing retainers fail on the client side, and the failures are boring and preventable:",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "Standing rituals, not ad-hoc requests. A fixed cycle with a named review beats a Slack channel of one-offs every time.",
          "One decision-maker with real authority. Two is workable. A committee turns a retainer into a meeting subscription.",
          "A groomed backlog. If the studio spends the first week of every month deciding what to do, you are paying senior rates for triage.",
          "Engineering in the room. Design that cannot be built is the most expensive kind, and the discovery should not happen in QA.",
          "A quarterly kill review. Ask plainly whether the retainer still earns its number. Any studio worth retaining will answer honestly, and sometimes the answer is to stop.",
        ],
      },
      { kind: "h2", text: "What belongs in the agreement" },
      {
        kind: "p",
        text: "Retainer contracts are usually vaguer than project contracts, which suits nobody once something goes wrong. Four clauses are worth arguing about before signature:",
      },
      {
        kind: "list",
        items: [
          "Capacity, expressed as output, not hours. Hours invite timesheet theater. Better: a defined cycle with a named team and an agreed cadence of reviews.",
          "What happens to unused capacity. Rollover is generous and usually unnecessary; the honest version is that a quiet month is the price of a reserved slot, and both sides should say so out loud.",
          "Notice period, both directions. Thirty days is normal for you, sixty is common for the studio, and asymmetry is fine as long as it is deliberate.",
          "Ownership on termination. Files, tokens and documentation transfer on the last paid day, not after a reconciliation. Get it in writing; this is the clause people regret.",
        ],
      },
      { kind: "h2", text: "How to tell by month three whether it is working" },
      {
        kind: "p",
        text: "You should not need a survey. Three signals tell you plainly, and all of them are visible from inside your own team:",
      },
      {
        kind: "list",
        items: [
          "Your engineers stop asking what a screen means. Handoff questions dropping is the single best indicator that design is landing.",
          "Fewer decisions come back. If the same navigation debate resurfaces every six weeks, nothing is being settled — you are renting opinions.",
          "The system absorbs new work. New features arrive as combinations of existing patterns rather than new one-offs. When that stops being true, the retainer has drifted into production support.",
        ],
      },
      {
        kind: "p",
        text: "If none of those are true by month three, the problem is usually structure rather than talent: no decision-maker, no backlog, or a scope that is really a project in monthly clothing.",
      },
      {
        kind: "p",
        text: [
          "If you are genuinely unsure which one you need, describe the next two quarters and we will tell you — including when the answer is neither. ",
          { text: "Start there", href: "/contact" },
          ".",
        ],
      },
    ],
    faqs: [
      {
        q: "How long should a design retainer run?",
        a: "Six months is the shortest useful commitment, because the first month is context-building and you want at least four productive cycles after it. Beyond eighteen months, re-examine it: either the work has become predictable enough to hire for internally, or it has become genuinely strategic and should be reviewed at a higher level.",
      },
      {
        q: "Can we pause a retainer?",
        a: "Ask before signing, because the answer differs sharply between studios and it is not a small clause. A pause frees your budget but releases your slot, and small studios cannot hold capacity unpaid — we book a quarter or two ahead, so a paused month is usually someone else's month. Where a pause is possible, expect notice periods measured in weeks.",
      },
      {
        q: "What if we need both a project and a retainer?",
        a: "Run the project first and let the retainer start at launch, not before. Overlapping them means the retainer's early cycles get consumed by the project's own scope, which is a costly way to buy the same hours twice. The exception is a small retained diagnostic ahead of a project, used to define it.",
      },
    ],
    related: ["how-to-choose-a-b2b-saas-design-agency", "what-a-b2b-software-rebrand-costs"],
  },
  {
    slug: "why-your-b2b-site-doesnt-rank",
    title: "Why your B2B site doesn’t rank",
    dek: "Most B2B sites are not losing to a competitor’s content. They are losing to their own canonical tags, thin service pages, and 400ms of layout shift.",
    metaDescription:
      "The structural reasons B2B sites fail to rank — missing canonicals, brochure service pages, redesign redirects, Core Web Vitals — and the order to fix them.",
    date: "2026-08-13",
    displayDate: "August 2026",
    readingTime: "6 min",
    blocks: [
      {
        kind: "p",
        text: "When a B2B company tells us their site does not rank, the assumed cause is always content volume — a competitor publishes weekly and they do not. Occasionally that is true. Far more often the site is undermining itself in ways nobody has looked at, because the people who could see the problem were never asked and the people who were asked only had content to sell.",
      },
      {
        kind: "p",
        text: "We audited our own site before this relaunch and found five of the six problems below in our own build. Here they are in the order they actually cost you traffic.",
      },
      { kind: "h2", text: "1. Your pages are competing with themselves" },
      {
        kind: "p",
        text: "Canonical tags tell a search engine which URL is the real one when several could serve the same content. Without them, trailing slashes, query strings, uppercase variants and www duplicates all become candidates, and your ranking signals split across the copies. It is the single most common technical fault we find, and the least discussed, because nothing about it looks broken to a human.",
      },
      {
        kind: "p",
        text: "Our own audit found zero canonicals across nineteen indexable pages. Worse, our demo pages were marked noindex while inheriting the homepage's canonical — a contradiction that tells a crawler both do not index this and the real version of this is the homepage. Both were true of a site built by people who know better, which is the point: this fails silently.",
      },
      { kind: "h2", text: "2. Your service pages are brochures, not answers" },
      {
        kind: "p",
        text: "The pages that should earn commercial traffic are usually three paragraphs of positioning and a contact button. They rank for nothing because they answer nothing. The queries that convert in B2B are specific and slightly awkward — what a thing costs, how long it takes, what happens if it goes wrong, how it compares to the in-house option — and brochure copy avoids exactly those.",
      },
      {
        kind: "p",
        text: [
          "The fix is not more words, it is answered questions. Put prices on the page. Enumerate what is included and what is not. Name the process by week. We publish entry prices on every ",
          { text: "service page", href: "/services" },
          " and full tiers on the ",
          { text: "packages page", href: "/packages" },
          " for this reason, and it costs us the occasional badly-fit lead, which is a feature.",
        ],
      },
      { kind: "h2", text: "3. The redesign that erased your rankings" },
      {
        kind: "p",
        text: "A beautiful new site that changed every URL and shipped without redirects is the fastest way to lose a decade of accumulated authority. We see the same three-month pattern: launch, celebration, then a traffic decline that gets attributed to seasonality until someone checks the logs and finds a thousand 404s where the old blog used to be.",
      },
      {
        kind: "list",
        items: [
          "Export every indexed URL before launch, not after. Your analytics and Search Console both have this.",
          "Map old to new one by one. Redirect to the closest equivalent page, never in bulk to the homepage — search engines treat that as a soft 404 and drop the signal.",
          "Use 301, not 302. A temporary redirect asks a crawler to keep the old URL as canonical, which is the opposite of what you want.",
          "Keep the redirect map forever. It is infrastructure, not a launch task.",
        ],
      },
      { kind: "h2", text: "4. Nothing on the page is worth citing" },
      {
        kind: "p",
        text: "Increasingly the thing that sends you qualified traffic is not a blue link but a summary — an assistant answering a buyer's question and naming a few sources. What gets cited is specific: a number, a range, a named process, a stated tradeoff. What never gets cited is a sentence about being passionate about innovative solutions.",
      },
      {
        kind: "quote",
        text: "Write the sentence a competitor would be nervous to publish. That is usually the one that gets quoted.",
      },
      {
        kind: "p",
        text: "This is the same discipline that makes content rank for people, so it is not a separate workstream. Answer the question directly in the first two sentences, then support it. Bury the answer and both a human and a model will leave.",
      },
      { kind: "h2", text: "5. Performance is a ranking input and a conversion tax" },
      {
        kind: "p",
        text: [
          "Core Web Vitals will not lift a bad page above a good one, but they decide close calls, and they decide whether a visitor stays. The usual B2B culprits are uncompressed hero photography, layout that jumps as fonts swap in, and an animation budget spent on decoration. ",
          { text: "Forma Studio", href: "/work/forma-studio" },
          " ships a perfect performance score with heavy imagery and real motion, so the tradeoff is mostly a myth — it is a discipline problem, not a physics one.",
        ],
      },
      {
        kind: "list",
        items: [
          "Serve responsive images with correct sizes. Phones downloading desktop-weight photography is the most common single fault, and it was one of ours.",
          "Reserve space for anything that loads late, so nothing shifts under a reader's thumb.",
          "Spend motion where it explains, confirms or directs — the argument in motion is a language, not a garnish. Decorative animation is frame budget you paid to create.",
        ],
      },
      { kind: "h2", text: "6. You have no structured data, or the contradictory kind" },
      {
        kind: "p",
        text: "Structured data does not make you rank; it makes you legible. It tells a crawler that this is an organization, this is a service with a price, this page is part of that trail, this is a question and this is its answer. A site with one lonely Organization block is leaving most of its meaning implicit.",
      },
      {
        kind: "p",
        text: "One trap worth naming: pricing markup without a unit. A retainer expressed as a bare price of 50,000 reads as a one-time fee, so a $50k monthly engagement gets advertised as a total. Use a unit price specification with an explicit period. We had this exact bug.",
      },
      { kind: "h2", text: "The order to fix them in" },
      {
        kind: "p",
        text: "Sequence matters, because content built on a broken foundation just splits its own signals:",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "Canonicals, redirects and indexing directives. One week, and it stops the bleeding.",
          "Performance and mobile layout. Measured on a real mid-range phone, not a laptop with a throttling slider.",
          "Rewrite the commercial pages — services, pricing, comparison. This is where revenue is.",
          "Structured data across templates, so every new page inherits it.",
          "Only then, publish. Content is the compounding asset, and it compounds on top of the four above.",
        ],
      },
      { kind: "h2", text: "What this does not fix" },
      {
        kind: "p",
        text: "Honesty about the ceiling: technical work removes handicaps, it does not manufacture demand. If nobody searches for what you do, a flawless site ranks first for nothing. And none of this is fast — expect a quarter before movement and two before it is convincing, which is exactly why it should start before you need the pipeline.",
      },
      {
        kind: "p",
        text: [
          "If you want the specific list for your site rather than the general one, we run this audit as the first phase of every ",
          { text: "web design and build", href: "/services/web-design-build" },
          " engagement, and we will tell you if the answer is that your site is fine and your problem is positioning. ",
          { text: "Send us the URL", href: "/contact" },
          ".",
        ],
      },
    ],
    faqs: [
      {
        q: "How long until a redesign recovers its rankings?",
        a: "With a complete redirect map and unchanged content, expect fluctuation for four to six weeks and recovery within a quarter. Without redirects, recovery is not the right word — you are rebuilding authority from zero, which takes six to twelve months and sometimes never fully returns.",
      },
      {
        q: "Does a design agency handle SEO, or do we need a separate firm?",
        a: "Technical and structural SEO belongs with whoever builds the site — canonicals, redirects, performance, structured data and information architecture are build decisions, and retrofitting them costs more than doing them once. Ongoing content strategy and link acquisition are a different discipline and usually a different partner. Beware anyone selling both as one deliverable.",
      },
      {
        q: "Are Core Web Vitals still a ranking factor?",
        a: "Yes, as a tiebreaker rather than a lever — they rarely outrank relevance, but they decide between comparable pages and they measurably affect conversion regardless of ranking. Treat them as a floor to clear, not a score to maximize. The gap between a 70 and a 95 matters; the gap between 95 and 100 is usually vanity.",
      },
    ],
    related: ["what-a-b2b-software-rebrand-costs", "motion-is-a-language-not-a-garnish"],
  },
  {
    slug: "design-systems-are-a-management-tool",
    title: "Design systems are a management tool",
    dek: "The component library is the artifact. The system is the agreement about who decides what, and when.",
    date: "2026-05-12",
    displayDate: "May 2026",
    readingTime: "6 min",
    blocks: [
      {
        kind: "p",
        text: "Every design system pitch we see leads with the component library: the buttons, the tokens, the tidy Figma pages. And every design system failure we get called in to fix has a beautiful component library that nobody uses. The library was never the hard part.",
      },
      {
        kind: "p",
        text: "The hard part is the agreement underneath it. Who is allowed to add a pattern? What happens when a product team needs a variant on Thursday and the systems team meets on Monday? Is a deviation a bug, a proposal, or a firing offense? Teams that can answer those questions in one sentence have a design system. Teams that can’t have a folder.",
      },
      {
        kind: "p",
        text: "When we built Meridian’s system, the deliverable that mattered most wasn’t the ten patterns — it was a one-page decision protocol taped into their sprint ritual. New pattern requests got answered within one working day, by a named person, with a default of yes-if-documented. Deviation stopped being a moral question and became a logistics question.",
      },
      {
        kind: "quote",
        text: "A design system that lives only in Figma is a wish. One that lives in the sprint ritual is a system.",
      },
      {
        kind: "p",
        text: "That’s why we say design systems are a management tool. They encode how a team makes decisions about its interface — which means building one is an organizational intervention wearing a design costume. Treat it that way and the library maintains itself. Treat it as a drawing exercise and you’ll redraw it every eighteen months.",
      },
      {
        kind: "p",
        text: "A test you can run today: ask three people on your team what happens when a screen needs a component that doesn’t exist. If you get three answers, the system isn’t shipped yet — no matter how complete the Figma file looks.",
      },
    ],
    related: ["design-retainer-vs-project-work", "what-a-b2b-software-rebrand-costs"],
  },
  {
    slug: "motion-is-a-language-not-a-garnish",
    title: "Motion is a language, not a garnish",
    dek: "Animation earns its file size when it explains, confirms, or directs. Everything else is decoration wearing a costume.",
    date: "2026-03-03",
    displayDate: "March 2026",
    readingTime: "5 min",
    blocks: [
      {
        kind: "p",
        text: "There are two kinds of motion on the web. The first kind carries information: the drawer that slides in from the right so you know where it went when it closed. The modal that scales up from the button you clicked so you know what caused it. The counter that rolls up so you feel the number growing rather than just reading it.",
      },
      {
        kind: "p",
        text: "The second kind is garnish: things fading in because fading in felt fancy, parallax on content that nobody asked to move, hover states that wiggle. Garnish isn’t evil — a site with zero personality is its own failure — but garnish is a spice, and most animated sites season like a first-year cook.",
      },
      {
        kind: "p",
        text: "Our rule on every project: each animation must explain, confirm, or direct. Explain — show where something came from or went. Confirm — acknowledge that an action worked. Direct — pull attention to the one thing that matters next. If a motion does none of those, it has to justify itself as signature: the one deliberate flourish a brand is remembered by. Most pages get one signature. Not five.",
      },
      {
        kind: "quote",
        text: "Ask of every animation: what does the user know after it that they didn’t know before?",
      },
      {
        kind: "p",
        text: "This is also a performance position. Motion that carries meaning is worth its frame budget; motion that doesn’t is jank you paid to create. When Loop Health cut their app’s decorative animation and kept only confirmations, patients over sixty stopped asking whether their check-in ‘went through.’ That’s what motion is for.",
      },
      {
        kind: "p",
        text: "The craft is invisible when it works. Nobody leaves a great restaurant praising the salt. They just remember that everything tasted right.",
      },
    ],
    related: ["why-your-b2b-site-doesnt-rank", "design-systems-are-a-management-tool"],
  },
  {
    slug: "why-we-stay-small",
    title: "Why we stay small",
    dek: "The most contrarian thing about this studio is the org chart. Here’s the reasoning behind it.",
    date: "2026-01-20",
    displayDate: "January 2026",
    readingTime: "6 min",
    pullQuote:
      "Every layer between the client and the person doing the work is a place where truth goes to be softened.",
    body: [
      "Agencies grow because revenue is a scoreboard and headcount looks like winning. The pattern is reliable enough to predict: the founders stop designing, a management layer appears to coordinate the people who now do the work, and the thing clients originally paid for — senior judgment, applied directly — becomes the thing the org chart is designed to ration.",
      "Xark is deliberately a different shape: founder-led, no account layer, no bench. It costs real money. It means turning down more work than we take, and there are stretches where the pipeline makes that feel reckless.",
      "The economics are simpler than they look. A fifty-person agency bills you for seniors and staffs you with juniors, because that spread is the margin. A studio this size has no spread to arbitrage — the person you met on the first call is the person in your Figma on Tuesday. The margin is that nothing is handed off, so nothing is lost in translation, so the work is right earlier.",
      "Staying small also disciplines the work itself. With no juniors to absorb busywork, we can’t afford processes that generate artifacts instead of decisions. Every deliverable has to move the project or it doesn’t get made. Clients sometimes miss the theater — the big deck, the fifteen-person kickoff — for about two weeks. Then they notice they’ve shipped.",
      "The honest downside: we are supply-constrained, permanently. We can’t parallelize big programs, and if you need a hundred hands, we’re the wrong studio and we’ll say so on the first call. That sentence — we’re the wrong studio — probably builds more trust than anything in the portfolio.",
      "Small is not a stage we’re passing through. It’s the product.",
    ],
    related: ["how-to-choose-a-b2b-saas-design-agency", "design-retainer-vs-project-work"],
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
