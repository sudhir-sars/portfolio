/** A paragraph (string) or a bulleted enumeration ({ list }). */
export type JourneyBlock = string | { list: string[] };

export interface JourneyStat {
  value: string;
  label: string;
}

export interface JourneyPage {
  /** Year / age tag shown above the title. */
  era?: string;
  title: string;
  /** Larger lead line under the title. */
  subtitle?: string;
  blocks: JourneyBlock[];
  /** Engineering specifications, rendered as the spec strip under the prose. */
  stats?: JourneyStat[];
  /** Faint oversized word behind the page. */
  ghost?: string;
}

export const JOURNEY: JourneyPage[] = [
  {
    title: "The Journey",
    subtitle:
      "Not a résumé, a build log. Eighteen commits from a school computer I wasn't allowed to touch to the systems I ship today.",
    blocks: [
      "Every project here started the same way: something annoyed me, fascinated me, or refused to work, and I couldn't let it go.",
      "Some of it shipped. Some of it died in a professor's office. One of them never got submitted at all. The lessons came from all three.",
      "This is the story in order, the way it actually happened, curiosity first, engineering second, and the two slowly becoming the same thing.",
    ],
    stats: [
      { label: "Arc", value: "Age 12 → founding engineer" },
      { label: "First build", value: "Tkinter desktop agent" },
      { label: "Inflection", value: "4-bit QLoRA on 1× A100" },
      { label: "Domain", value: "Real-time agentic AI" },
    ],
    ghost: "README",
  },
  {
    era: "Age 10",
    title: "The First Computer",
    blocks: [
      "The first computer I ever touched belonged to my school, not to me. That detail mattered, I wasn't really supposed to be alone with it.",
      "I didn't open a code editor; I didn't know one existed. I wanted to know how the machine did what it did, so I reached behind it and started pulling cables to see which one killed what.",
      "My teacher found me mid-experiment. The scolding was immediate and well earned. What surprised me was my own reaction, I wasn't scared off, I was annoyed I hadn't finished mapping it.",
      "That's the first thing I learned about myself: I'd rather break something to understand it than leave it working and mysterious.",
    ],
    stats: [
      { label: "Hardware", value: "Shared school desktop" },
      { label: "First instinct", value: "Reverse-engineer it" },
      { label: "Method", value: "Physical teardown" },
      { label: "Takeaway", value: "Curiosity about internals" },
    ],
    ghost: "CURIOUS",
  },
  {
    era: "Age 11",
    title: "Magic",
    blocks: [
      "Before I understood anything, I just watched. Move the mouse, the cursor moved with it. Press a key, the letter was on the screen before my finger came back up.",
      "I had no model for any of it. I didn't know the word 'software.' I didn't know a person somewhere had written the reason the cursor followed my hand.",
      "I only knew there was something inside the box responding to me, instantly, every time, and I wanted to be on the other side of it.",
    ],
    stats: [
      { label: "Interface", value: "Mouse + keyboard" },
      { label: "Feedback loop", value: "Input → instant output" },
      { label: "Missing layer", value: "Software, still invisible" },
      { label: "Pull", value: "Get behind the screen" },
    ],
    ghost: "WONDER",
  },
  {
    era: "2012",
    title: "JARVIS",
    subtitle: "One movie turned a vague fascination into a concrete spec.",
    blocks: [
      "I watched Iron Man and stopped caring about Iron Man. The thing I couldn't look away from was JARVIS, a voice you could talk to that actually did things.",
      "The next morning I wasn't searching for the movie. I was searching for the machine behind it.",
      {
        list: [
          "How is software built?",
          "What is artificial intelligence?",
          "What is programming, and what is hacking?",
          "Python, C++, operating systems, the internet underneath them.",
        ],
      },
      "Each search forked into ten more. I didn't find a clean path; I found a rabbit hole and climbed in.",
      "Somewhere in those weeks, without a syllabus or a teacher, I'd started a computer science degree of my own.",
    ],
    stats: [
      { label: "Catalyst", value: "Iron Man (2014)" },
      { label: "Target spec", value: "Conversational, actuating agent" },
      { label: "Entry point", value: "Self-directed CS" },
      { label: "Surface area", value: "Python, C++, OS, networking" },
    ],
    ghost: "JARVIS",
  },
  {
    era: "2012–13",
    title: "Learning Without a Roadmap",
    blocks: [
      "This was before the era of endless tutorials. No playlist held your hand, there was no model to ask, and the good courses cost money I didn't have.",
      "So I got a Python course the way a broke teenager in 2014 got most things, and I worked through it line by line.",
      "Variables, loops, functions, the first data structures. None of it was glamorous. All of it was the moment I crossed from using software to building it.",
    ],
    stats: [
      { label: "Era", value: "Pre-MOOC, pre-LLM" },
      { label: "Primary text", value: "One Python course, end to end" },
      { label: "Fundamentals", value: "Types, control flow, data structures" },
      { label: "Environment", value: "Local interpreter, no mentor" },
      { label: "Inflection", value: "Consumer → author" },
    ],
    ghost: "PYTHON",
  },
  {
    era: "~2014",
    title: 'Building My First "AI"',
    blocks: [
      "I still wanted JARVIS, so I built it, my version of it, in Python with Tkinter.",
      "It could shut down the PC, turn the volume up and down, and open a few apps from typed commands. I called it JARVIS with a completely straight face.",
      "There was no intelligence in it. It was a GUI wired directly to operating-system calls, a few if-statements wearing a costume. I knew that even then.",
      "It didn't matter. For the first time, an idea inside my head had become software I could run.",
    ],
    stats: [
      { label: "Stack", value: "Python · Tkinter" },
      { label: "Control plane", value: "OS syscalls: shutdown, audio, exec" },
      { label: "Architecture", value: "Rule-based GUI, no ML" },
      { label: "Honesty", value: "Automation, not intelligence" },
      { label: "Milestone", value: "First shipped artifact" },
    ],
    ghost: "BUILD",
  },
  {
    era: "~2015",
    title: "An Accidental Recommendation System",
    blocks: [
      "The next thing I built came from pure irritation. Windows Media Player made me hunt for the same songs every single time, and I was done with it.",
      "In about a week I wrote my own player. It logged every track I played, kept a running count, and on launch queued my most-played songs in descending order, so the music just started.",
      "I never opened Windows Media Player again.",
      "Years later, in a machine learning class, I realized what I'd actually built: a naive, frequency-ranked recommender, running offline, before I had ever heard the term 'recommendation system.'",
    ],
    stats: [
      { label: "Domain", value: "Personal media player" },
      { label: "Signal", value: "Per-track play frequency" },
      { label: "Algorithm", value: "Frequency-ranked ordering" },
      { label: "Persistence", value: "Local play-history store" },
      { label: "Class (hindsight)", value: "Offline recommender" },
      { label: "Cold start", value: "Unsolved, didn't know to" },
    ],
    ghost: "RECSYS",
  },
  {
    era: "2016–2018",
    title: "Breaking Things to Understand Them",
    blocks: [
      "By then, writing programs wasn't enough anymore. I wanted to understand what happened underneath them.",
      "I spent months learning how computers communicated over networks, how operating systems exposed services, how packets moved, and why machines trusted, or refused to trust, each other. Most of what I learned came from books, documentation, and countless experiments in environments I controlled.",
      "One rabbit hole led to another. While reading books on computer systems, hacking, and artificial intelligence, I came across the work of Luc Steels. His experiments showed that autonomous agents, given nothing more than a goal and repeated interaction, could gradually develop a shared vocabulary without anyone programming a language into them.",
      "That idea stayed with me for years. Intelligence wasn't just about algorithms anymore. It could emerge from interaction itself. Long before LLMs and AI agents became mainstream, I was fascinated by the possibility that communication itself could evolve.",
      "Looking back, I wasn't learning hacking, networking, or AI as separate subjects. I was building a mental model of how intelligent systems work, from operating systems and distributed networks to autonomous agents.",
    ],
    stats: [
      { label: "Focus", value: "Systems & Networking" },
      { label: "Topics", value: "TCP/IP · OS · Security" },
      { label: "Research", value: "Luc Steels" },
      { label: "Concept", value: "Emergent Language" },
      { label: "Timeline", value: "1995–2002" },
      { label: "Takeaway", value: "Intelligence Emerges" },
    ],
    ghost: "SYSTEMS",
  },
  {
    era: "2020–2025",
    title: "College",
    blocks: [
      "I went into an integrated B.Tech in CSE paired with an MBA in Product Management at Lovely Professional University. I assumed the degree would teach me what I wanted to know.",
      "The first year corrected that. The syllabus covered fundamentals well, but the field I cared about was moving far faster than any semester plan.",
      "So college became the floor, not the ceiling. The lectures gave me the basics; the real work, machine learning, papers, broken experiments, happened after hours.",
    ],
    stats: [
      { label: "Program", value: "B.Tech CSE + MBA (PM)" },
      { label: "Institution", value: "Lovely Professional University" },
      { label: "Window", value: "2020 – 2025" },
      { label: "Syllabus", value: "Fundamentals only" },
      { label: "Self-study", value: "ML, DL, paper reproductions" },
      { label: "Output", value: "3 IEEE publications" },
    ],
    ghost: "LEARN",
  },
  {
    era: "~2021",
    title: "Deep Learning",
    blocks: [
      "Then I hit deep learning, and it landed the same way JARVIS had years earlier, except this time I could see the machinery.",
      "I trained my own CNNs and decision trees, then pushed further into transfer learning, ensembles, BERT, and Markov models.",
      "Backpropagation was the part that rearranged how I thought. You don't hand the machine the rules; you give it examples and a way to be wrong, and it finds the rules itself.",
    ],
    stats: [
      { label: "Architectures", value: "CNNs, decision trees, ensembles" },
      { label: "Training", value: "SGD + backpropagation" },
      { label: "Transfer", value: "Fine-tuned pretrained nets" },
      { label: "Sequence models", value: "BERT, Markov chains" },
      { label: "Depth", value: "Built from scratch, not just called" },
    ],
    ghost: "BACKPROP",
  },
  {
    era: "2022",
    title: "Chasing the Next Word",
    blocks: [
      "One question wouldn't leave me alone. A Markov model predicts the next word from probabilities, so what happens if you make the space it predicts over enormous?",
      "Stretch that far enough, I figured, and you wouldn't just predict a word. You'd complete a thought. You'd get something you could talk to. A poor man's JARVIS.",
      "I didn't have the compute or the architecture to prove it, and I want to be precise: I wasn't inventing transformers. I was circling the same intuition from the outside, alone, a little ahead of the moment, and completely unaware the world was about to answer the question for me.",
    ],
    stats: [
      { label: "Premise", value: "Scaled next-token prediction" },
      { label: "Prior art (mine)", value: "Markov chains" },
      { label: "Gap", value: "Long-range context + compute" },
      { label: "Missing primitive", value: "Self-attention" },
      { label: "Status", value: "Right direction, pre-transformer" },
    ],
    ghost: "TOKENS",
  },
  {
    era: "Nov 2022",
    title: "The Day GPT Arrived",
    blocks: [
      "Microsoft Ignite, 2022. Satya Nadella on stage, and a live demo where someone simply talked to a model and it answered in real sentences. I'd been chasing that exact thing in theory for a year, and there it was, running.",
      "I went straight to the source material, 'Attention Is All You Need,' then every transformer paper I could find, in a stretch of days I mostly didn't sleep through.",
      "When GPT itself shipped, I tried it on day one. The first thing I did wasn't chat with it, I tried to force it to return structured JSON I could parse in code. It was buggy, but it worked.",
      "I had no idea that crude trick, coaxing a model into machine-readable output, would soon have a name and carry an entire ecosystem: tool calling, structured outputs, agents.",
    ],
    stats: [
      { label: "Trigger", value: "MS Ignite 2022 demo" },
      { label: "Foundations", value: "Attention Is All You Need (2017)" },
      { label: "Day-1 probe", value: "Constrain output to JSON" },
      { label: "Result", value: "Parseable, schema-shaped" },
      { label: "Foresaw", value: "Tool / function calling" },
    ],
    ghost: "GPT",
  },
  {
    era: "2023",
    title: "The Model That Wouldn't Load",
    blocks: [
      "Meta open-sourced Llama 2, and suddenly the weights were just there, downloadable. I wanted to run one myself, not read about someone else doing it.",
      "I rented an A100 on Google Colab and tried to load it. It died with an out-of-memory error before it ever reached inference. I tried again, the same way, with the same result.",
      "Buying a bigger GPU wasn't on the table, there was no budget for that. For a few days the project just sat there, blocked by a number I couldn't change.",
      "Then the framing shifted. The hardware wasn't the problem anymore. Understanding the constraint was.",
    ],
    stats: [
      { label: "Model", value: "Llama 2 (open weights)" },
      { label: "Accelerator", value: "1× A100, Google Colab" },
      { label: "Failure", value: "OOM at load" },
      { label: "Root cause", value: "fp16 weights > VRAM" },
      { label: "Constraint", value: "Fixed GPU, fixed budget" },
      { label: "Pivot", value: "Optimize, don't upgrade" },
    ],
    ghost: "OOM",
  },
  {
    era: "2023",
    title: "Quantize, Then Fine-Tune",
    subtitle:
      'Before "quantization" and "fine-tuning" were buzz words you saw in product launches.',
    blocks: [
      "If I couldn't make the hardware bigger, I had to make the model smaller without making it useless. That sent me into LoRA, QLoRA, and 4-bit quantization.",
      "The papers gave me results and almost never the implementation. I dug for weeks and eventually found a Google engineering session that walked the whole pipeline end to end, quantize, attach adapters, fine-tune on your own data. I booked a seat and took it apart step by step.",
      "Then I built it. I quantized Llama 2 to 4-bit so it fit on a single Colab A100, applied QLoRA adapters, and fine-tuned it on a synthetic dataset I generated with ChatGPT from real university FAQs.",
      "The goal was specific: a model that could stand in for a 10–20 person support desk answering the same questions all day, available instantly, from anywhere.",
      "I showed it to a professor expecting a win. Instead he asked the one question I hadn't: who pays to keep this running 24/7 for a task this small? He was right, and it stung. A model that works in a notebook but can't survive its own running cost isn't a product yet.",
    ],
    stats: [
      { label: "Base model", value: "Llama 2" },
      { label: "Quantization", value: "4-bit + double quant" },
      { label: "Adapters", value: "LoRA (low-rank), PEFT" },
      { label: "Data", value: "Synthetic FAQ set (LLM-generated)" },
    ],
    ghost: "4-BIT",
  },
  {
    era: "2023–24",
    title: "Retrieval Before I Knew Its Name",
    blocks: [
      "The professor's question rewired the whole approach. The problem was never 'can the model answer', it was 'can it answer cheaply enough to leave running.'",
      "So I stopped trying to put the knowledge inside the model. I put it beside the model instead.",
      "I indexed over 100 pages of university PDFs along with information I scraped from the university website. Instead of relying only on dense embeddings, I built a hybrid retrieval pipeline that combined BM25 keyword search with vector similarity, giving the model both lexical precision and semantic understanding before generating a response.",
      "The retrieved context, together with the user's question, became the prompt. No fine-tuning. No always-on GPU. Cost per query dropped from dollars to cents, while the answers remained grounded in the university's own documentation.",
      "Months later I discovered the industry had a name for what I'd built: Retrieval-Augmented Generation. I hadn't started with RAG. I started with a simple engineering constraint, build something accurate enough to be useful and cheap enough to actually deploy.",
    ],
    stats: [
      { label: "Pattern", value: "Hybrid RAG" },
      { label: "Corpus", value: "100+ Pages" },
      { label: "Retrieval", value: "BM25 + Vector Search" },
      { label: "Grounding", value: "University Knowledge Base" },
      { label: "Serving", value: "Retrieved Context → LLM" },
      { label: "Cost", value: "$ → ¢ per Query" },
    ],
    ghost: "RAG",
  },
  {
    era: "2024",
    title: "Smart India Hackathon",
    subtitle: "The missed opportunity",
    blocks: [
      "We presented the RAG assistant during our university's internal Smart India Hackathon selection. I handled the backend and AI pipeline, while my teammate built the front end. The live demo worked on stage, which, if you've ever demoed software live, you know is never guaranteed.",
      "The panel was impressed with both the architecture and the approach. They asked us to prepare the complete prototype so it could officially represent the university in Smart India Hackathon.",
      "The day before the final submission, my team mate backed out. The front end remained unfinished, and we couldn't submit the project for the final university selection.",
      "It was disappointing, but it taught me an important lesson. Good engineering is only one part of shipping a product. Timing, teamwork, and circumstances matter just as much.",
    ],
    stats: [
      { label: "System", value: "University RAG assistant" },
      { label: "Team", value: "2 (backend + frontend)" },
      { label: "Eval", value: "Panel advanced us" },
    ],
    ghost: "DEMO",
  },
  {
    era: "2024–25",
    title: "When People Started Depending On It",
    blocks: [
      "My first real engineering job changed the question I was answering. It stopped being 'does this run on my machine' and became 'can thousands of people depend on this at once.'",
      "At Barley AI I worked on the backend of an AI education platform with 6,000+ users. I built RAG ingestion and retrieval pipelines that generated and indexed 1.5M+ embeddings, plus a guest-onboarding flow that removed the forced sign-up wall, which moved active users by 1,900%.",
      "I also did the unglamorous work production actually rewards: hunting down N+1 query patterns and replacing them with proper SQL joins, writing the migrations to support new features without breaking the old ones.",
      "A notebook only has to run once. This had to run at 2 a.m. while I was asleep, for strangers, without me there to restart it.",
    ],
    stats: [
      { label: "Company", value: "Barley AI" },
      { label: "Scale", value: "6,000+ users" },
      { label: "Index size", value: "10.5M+ embeddings" },
      { label: "Activation", value: "Guest onboarding, +1,900%" },
      { label: "Perf", value: "N+1 → SQL joins, migrations" },
    ],
    ghost: "SHIP",
  },
  {
    era: "2025 – 2026",
    title: "Founding Engineer",
    blocks: [
      "Joining Infina as a Founding Engineer was the moment everything I'd been learning for years met production. The problems were no longer toy examples or personal experiments. Every system had to be reliable, observable, and fast enough for people to trust every single day.",
      "I led the development of a cross-platform desktop AI assistant, building everything from meeting capture and automatic meeting detection to auto-updates, CI/CD pipelines and release infrastructure. It was my first experience engineering an AI product end to end instead of just building individual features.",
      "At the core was a real-time voice-to-action pipeline that transformed spoken requests into executable actions in around 800 ms. The assistant integrated with Gmail, Slack, Linear, Jira, Outlook, and other workplace tools, while structured LLM outputs and human-in-the-loop approval ensured every action remained safe and under the user's control. We reduced end-to-end latency by 50% and infrastructure costs by 25% through continuous optimization.",
      "Working at Infina completely changed how I thought about software engineering. Building AI wasn't just about choosing the right model anymore. It meant balancing latency, reliability, infrastructure costs, observability, deployment pipelines, and user experience, all while shipping quickly without compromising trust.",
    ],
    stats: [
      { label: "Role", value: "Founding Engineer" },
      { label: "Platform", value: "Desktop AI Assistant" },
      { label: "Latency", value: "~800 ms" },
      { label: "Integrations", value: "5+ Workplace Apps" },
      { label: "Optimization", value: "-50% Latency" },
      { label: "Infrastructure", value: "-25% API Cost" },
    ],
    ghost: "INFINA",
  },
  {
    era: "2026 – Present",
    title: "Today The Story Continues",
    blocks: [
      "Working on production AI systems convinced me that the hard problems aren't inside the model. They're everything around it: prompt lifecycle, deployments, orchestration, memory, governance, observability, and building systems that remain reliable long after the first demo.",
      "That realization became PromptX, a control plane for prompts. Instead of shipping prompt changes with application deployments, PromptX lets teams author, version, deploy, experiment, observe, and roll back prompts independently. Immutable versioning, weighted traffic splitting, deterministic routing, audit trails, and edge delivery turn prompts into production assets instead of hard-coded strings scattered across repositories.",
      "As PromptX evolved, a bigger question emerged. If Git manages code, Docker packages applications, and Vercel deploys software, what should the equivalent platform look like for autonomous AI organizations? That question became Xevos.",
      "Xevos is my long-term vision for AI infrastructure: a runtime where autonomous agents operate as specialized teams instead of isolated chatbots. Agents coordinate through durable event streams, grounded memory, independent verification, governance layers, and real tools, making it possible to build AI systems that are observable, auditable, and capable of operating continuously instead of one prompt at a time.",
      "I'm no longer interested in building another AI application. I'm interested in building the infrastructure that thousands of AI applications will eventually rely on.",
    ],
    stats: [
      { label: "Platform", value: "PromptX" },
      { label: "Serving", value: "300+ Edge Locations" },
      { label: "Deployments", value: "Versioned + A/B Rollouts" },
      { label: "Vision", value: "Xevos" },
      { label: "Architecture", value: "Autonomous Agent Runtime" },
      { label: "Focus", value: "AI Infrastructure" },
    ],
    ghost: "XEVOS",
  },
];
