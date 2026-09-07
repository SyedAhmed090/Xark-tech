export type Post = {
  slug: string;
  title: string;
  dek: string;
  date: string; // ISO
  displayDate: string;
  readingTime: string;
  pullQuote: string;
  body: string[]; // paragraphs
};

export const POSTS: Post[] = [
  {
    slug: "design-systems-are-a-management-tool",
    title: "Design systems are a management tool",
    dek: "The component library is the artifact. The system is the agreement about who decides what, and when.",
    date: "2026-05-12",
    displayDate: "May 2026",
    readingTime: "6 min",
    pullQuote:
      "A design system that lives only in Figma is a wish. One that lives in the sprint ritual is a system.",
    body: [
      "Every design system pitch we see leads with the component library: the buttons, the tokens, the tidy Figma pages. And every design system failure we get called in to fix has a beautiful component library that nobody uses. The library was never the hard part.",
      "The hard part is the agreement underneath it. Who is allowed to add a pattern? What happens when a product team needs a variant on Thursday and the systems team meets on Monday? Is a deviation a bug, a proposal, or a firing offense? Teams that can answer those questions in one sentence have a design system. Teams that can’t have a folder.",
      "When we built Meridian’s system, the deliverable that mattered most wasn’t the ten patterns — it was a one-page decision protocol taped into their sprint ritual. New pattern requests got answered within one working day, by a named person, with a default of yes-if-documented. Deviation stopped being a moral question and became a logistics question.",
      "That’s why we say design systems are a management tool. They encode how a team makes decisions about its interface — which means building one is an organizational intervention wearing a design costume. Treat it that way and the library maintains itself. Treat it as a drawing exercise and you’ll redraw it every eighteen months.",
      "A test you can run today: ask three people on your team what happens when a screen needs a component that doesn’t exist. If you get three answers, the system isn’t shipped yet — no matter how complete the Figma file looks.",
    ],
  },
  {
    slug: "motion-is-a-language-not-a-garnish",
    title: "Motion is a language, not a garnish",
    dek: "Animation earns its file size when it explains, confirms, or directs. Everything else is decoration wearing a costume.",
    date: "2026-03-03",
    displayDate: "March 2026",
    readingTime: "5 min",
    pullQuote:
      "Ask of every animation: what does the user know after it that they didn’t know before?",
    body: [
      "There are two kinds of motion on the web. The first kind carries information: the drawer that slides in from the right so you know where it went when it closed. The modal that scales up from the button you clicked so you know what caused it. The counter that rolls up so you feel the number growing rather than just reading it.",
      "The second kind is garnish: things fading in because fading in felt fancy, parallax on content that nobody asked to move, hover states that wiggle. Garnish isn’t evil — a site with zero personality is its own failure — but garnish is a spice, and most animated sites season like a first-year cook.",
      "Our rule on every project: each animation must explain, confirm, or direct. Explain — show where something came from or went. Confirm — acknowledge that an action worked. Direct — pull attention to the one thing that matters next. If a motion does none of those, it has to justify itself as signature: the one deliberate flourish a brand is remembered by. Most pages get one signature. Not five.",
      "This is also a performance position. Motion that carries meaning is worth its frame budget; motion that doesn’t is jank you paid to create. When Loop Health cut their app’s decorative animation and kept only confirmations, patients over sixty stopped asking whether their check-in ‘went through.’ That’s what motion is for.",
      "The craft is invisible when it works. Nobody leaves a great restaurant praising the salt. They just remember that everything tasted right.",
    ],
  },
  {
    slug: "why-we-stay-four-people",
    title: "Why we stay four people",
    dek: "Twelve years in, the most contrarian thing about our studio is the org chart. Here’s the math behind it.",
    date: "2026-01-20",
    displayDate: "January 2026",
    readingTime: "7 min",
    pullQuote:
      "Every layer between the client and the person doing the work is a place where truth goes to be softened.",
    body: [
      "Agencies grow because revenue is a scoreboard and headcount looks like winning. We’ve watched peers scale from five to fifty, and the pattern is reliable: the founders stop designing, a management layer appears to coordinate the people who now do the work, and the thing clients originally paid for — senior judgment, applied directly — becomes the thing the org chart is designed to ration.",
      "We decided early that Xark would be a different shape: four senior people, no account layer, no bench. It costs us real money. We turn down more work than we take, and there are quarters where the pipeline makes that feel reckless. Twelve years of retention numbers say it isn’t.",
      "The economics are simpler than they look. A fifty-person agency bills you for seniors and staffs you with juniors, because that spread is the margin. A four-person studio has no spread to arbitrage — the person you met in the sales call is the person in your Figma on Tuesday. Our margin is that we don’t hand off, so nothing is lost in translation, so the work is right earlier, so engagements run shorter than anyone budgets for.",
      "Staying small also disciplines the work itself. With no juniors to absorb busywork, we can’t afford processes that generate artifacts instead of decisions. Every deliverable has to move the project or it doesn’t get made. Clients sometimes miss the theater — the big deck, the fifteen-person kickoff — for about two weeks. Then they notice they’ve shipped.",
      "The honest downside: we are supply-constrained, permanently. We book a quarter or two out, we can’t parallelize big programs, and if you need a hundred hands, we’re the wrong studio and we’ll say so on the first call. That sentence — we’re the wrong studio — has probably built more trust than anything in our portfolio.",
      "Four is not a stage we’re passing through. It’s the product.",
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
