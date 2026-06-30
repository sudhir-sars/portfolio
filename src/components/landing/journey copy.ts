export type JourneyBlock = string | { list: string[] };

export interface JourneyStat {
  value: string;
  label: string;
}

export interface JourneyPage {
  /** Year / age tag shown above the title, e.g. "2014", "Age 12". */
  era?: string;
  title: string;
  /** Larger lead line, used mainly on the cover. */
  subtitle?: string;
  blocks: JourneyBlock[];
  /** Hard numbers, rendered as a spec strip under the prose. */
  stats?: JourneyStat[];
  /** Faint oversized word behind defining pages. */
  ghost?: string;
}

export const JOURNEY: JourneyPage[] = [
  {
    era: "Chapter 03",
    title: "The Journey",
    subtitle:
      "Not a timeline of jobs, a build log. How a kid who unplugged the back of a school computer ended up quantizing and fine-tuning language models before either had a name.",
    blocks: [
      "Every project here started as curiosity and got shipped under real constraints, no budget, weak hardware, no roadmap.",
      "Some worked. Some failed at the last meter. All of them taught me how to actually build.",
      "Swipe through the moments that moved the needle.",
    ],
    stats: [
      { value: "2014", label: "Where it started" },
      { value: "2023", label: "Quantized + fine-tuned an LLM" },
      { value: "4-bit", label: "On a single rented GPU" },
    ],
  },
  {
    era: "Age 12",
    title: "The First Computer",
    blocks: [
      "The first computer I ever touched belonged to my school. Not mine, but I couldn't leave it alone.",
      "I wanted to know how it actually worked, so I unplugged the cables from the back to see what each one did.",
      "My teacher's reaction taught me the cables mattered. The machine taught me something bigger: I had to understand this.",
    ],
  },
  {
    title: "Cursor, Keys, and a Box of Magic",
    blocks: [
      "Move the mouse, the cursor moves. Hit a key, a letter appears. Open a folder, a whole new world.",
      "I didn't know the word 'software' yet. I just knew something inside the box was responding to me, and I wanted to control it.",
    ],
  },
  {
    era: "2014",
    title: "JARVIS",
    ghost: "JARVIS",
    blocks: [
      "Iron Man. JARVIS. An AI that could see, reason, and act. To me that wasn't a movie character, it was a spec.",
      "The next morning I stopped watching and started searching: how is software built, what is AI, what is programming, what is hacking.",
      "One query forked into ten. Python. C++. Operating systems. Networks. The internet underneath all of it.",
      "Without a syllabus, I'd started a CS degree of my own.",
    ],
  },
  {
    era: "2014–15",
    title: "Teaching Myself to Code",
    blocks: [
      "No endless tutorials, no Stack Overflow reflex, no AI to ask. Learning meant finding a course however you could, so I did.",
      "Variables, loops, functions, data structures. The moment I could write them, I crossed the line from using software to building it.",
    ],
    stats: [
      { value: "Python", label: "First language" },
      { value: "Self-taught", label: "No roadmap" },
    ],
  },
  {
    era: "~2015",
    title: 'Building My First "AI"',
    blocks: [
      "Armed with Python and Tkinter, I built my own 'JARVIS.' It shut down the PC, controlled volume, and launched apps from typed commands.",
      "It wasn't intelligent, it was a GUI wired to OS-level calls. But it was the first time an idea in my head became running software.",
    ],
    stats: [
      { value: "Python + Tkinter", label: "Stack" },
      { value: "OS-level control", label: "What it did" },
    ],
  },
  {
    era: "~2016",
    title: "An Accidental Recommendation Engine",
    blocks: [
      "Windows Media Player annoyed me, I kept hunting for the same songs. So in about a week I wrote my own player.",
      "It logged every play, ranked tracks by play-count, and auto-queued my most-played songs in descending order. Open it, and my music just started.",
      "Years later I learned I'd built a naive recommender, frequency-ranked, personalized, fully offline. At the time, I just thought I'd fixed an annoyance.",
    ],
    stats: [
      { value: "~1 week", label: "Build time" },
      { value: "Play-count", label: "Ranking signal" },
      { value: "Recsys", label: "Before I knew the word" },
    ],
  },
  {
    era: "2020–2025 · LPU",
    title: "College Was the Floor, Not the Ceiling",
    blocks: [
      "Integrated B.Tech in CSE plus an MBA in Product Management. The syllabus covered fundamentals; the field I wanted was moving far faster.",
      "So the real work happened after lectures, machine learning, research papers, and a lot of experiments that failed long before they worked.",
    ],
    stats: [{ value: "CSE + MBA", label: "Integrated · 5 yrs" }],
  },
  {
    era: "~2021",
    title: "Falling for Deep Learning",
    blocks: [
      "Backpropagation broke my brain in the best way: you don't program the rules, you let the network learn them.",
      "I trained my own CNNs and decision trees, then went deeper, transfer learning, ensembles, BERT, Markov models.",
      "Same feeling as the first time I saw JARVIS, except now I understood the math under the magic.",
    ],
    stats: [
      { value: "CNNs", label: "Trained from scratch" },
      { value: "BERT · transfer learning", label: "Then the deep end" },
    ],
  },
  {
    era: "2022",
    title: "Chasing the Next Word",
    blocks: [
      "A question wouldn't leave me: if a Markov model predicts the next word from probabilities, what if the vector space were massive, big enough to complete a real sentence?",
      "Stretch that far enough and you'd get something conversational. A poor man's JARVIS.",
      "I didn't have the compute or the architecture to prove it. I wasn't inventing transformers, but I was circling the same intuition, alone, before the world caught up.",
    ],
  },
  {
    era: "Nov 2022",
    title: "The Day GPT Arrived",
    ghost: "GPT",
    blocks: [
      "Microsoft Ignite, 2022. Satya Nadella on stage and a live demo where someone just… talked to the model and it answered. It felt like watching the future boot up.",
      "I went straight to the source: 'Attention Is All You Need' (2017), then every transformer paper I could find. Days of reading, no sleep.",
      "When GPT shipped, I tried it on day one. The first thing I did wasn't chat, I forced it to emit structured JSON. It was buggy, but it worked.",
      "I didn't know it yet: that exact trick would later be called tool-calling and structured output, and it would power every AI agent that came after.",
    ],
    stats: [
      { value: "2017", label: "Attention Is All You Need" },
      { value: "Day 1", label: "Structured JSON out of GPT" },
      { value: "~2 yrs early", label: "Before 'tool-calling'" },
    ],
  },
  {
    era: "2023",
    title: "Models That Wouldn't Fit",
    blocks: [
      "Meta open-sourced Llama 2 and the race was on. I had the weights and no hardware to run them.",
      "I rented an A100 on Google Colab and still couldn't even load the model, out of memory before inference ever started.",
      "Most people stopped there. I treated the OOM as the actual problem to solve.",
    ],
    stats: [
      { value: "Llama 2", label: "Open weights" },
      { value: "A100 (rented)", label: "Still OOM" },
      { value: "0", label: "Successful loads, at first" },
    ],
  },
  {
    era: "2023",
    title: "Quantized and Fine-Tuned, Before It Was a Buzzword",
    ghost: "4-BIT",
    blocks: [
      "I went down the rabbit hole: LoRA, QLoRA, and 4-bit NF4 quantization. The papers had results but never the implementation, so I dug until I found a Google engineering session that walked the full pipeline end to end.",
      "Then I built it. Quantized Llama 2 to 4-bit so it fit on a single rented GPU, applied QLoRA adapters, and fine-tuned it on a synthetic dataset I generated with ChatGPT from real university FAQs.",
      "The goal was concrete: replace a 10–20 person support desk answering the same questions all day with a model that answers instantly, from anywhere.",
      "This was when 'fine-tuning' and 'quantization' were still papers, not product features. I shipped it before it had a name.",
    ],
    stats: [
      { value: "4-bit NF4", label: "Quantization" },
      { value: "QLoRA", label: "Fine-tuning" },
      { value: "1 GPU", label: "Where 0 fit before" },
      { value: "Synthetic FAQ set", label: "Custom training data" },
    ],
  },
  {
    title: "The Lesson That Killed the Dream, and Sharpened Me",
    blocks: [
      "I showed it to my professor expecting applause. Instead: 'We can't keep a model running 24/7 for a task this small, the compute and upkeep cost too much.'",
      "He was right, and it stung. A model that works in a notebook but can't survive its own unit economics isn't a product.",
      "That one sentence rewired how I build: the best architecture is the one that's still cheap when real users show up.",
    ],
  },
  {
    era: "2023–24",
    title: "RAG, Before It Had a Name",
    ghost: "RAG",
    blocks: [
      "Smart India Hackathon gave me the rematch. Instead of a 24/7 fine-tuned model, I flipped the problem: don't make the model memorize, let it look things up.",
      "I embedded 100+ pages of university PDFs plus scraped web data into a vector store, retrieved the top matches per question, and fed only that context to the LLM alongside the user's query.",
      "Cost per query collapsed from dollars to cents, with no always-on GPU to babysit. Months later I learned the industry had named it: Retrieval-Augmented Generation.",
      "On stage, the live demo actually worked, the panel asked us to build a full prototype for submission. Then my front-end teammate fell ill the day before the deadline, and we never submitted.",
      "We probably had a top-10 finish in hand. Sometimes the system is sound and life still ships a bug.",
    ],
    stats: [
      { value: "100+ pages", label: "Embedded + retrieved" },
      { value: "$ → ¢", label: "Cost per query" },
      { value: "0", label: "GPUs running 24/7" },
    ],
  },
  {
    era: "2025",
    title: "Building for Real People",
    blocks: [
      "Then I joined real engineering teams, and the goal changed: not 'does it run in my notebook' but 'can thousands of people depend on it.'",
      "As a founding engineer at Infina, I shipped a cross-platform desktop AI assistant, meeting capture, auto-updates, CI/CD, and production observability.",
      "The core was a real-time voice-to-action pipeline: speech to executable action in ~800ms, across Gmail, Slack, Linear, Jira and Outlook, with human-in-the-loop approval.",
    ],
    stats: [
      { value: "~800ms", label: "Speech → action" },
      { value: "5+", label: "Workplace integrations" },
      { value: "−50% / −25%", label: "Latency / API cost" },
    ],
  },
  {
    title: "Still Curious",
    blocks: [
      "Same dream as age 12, make machines that feel like magic, just with production constraints now.",
      "PromptX: edge-native prompt infrastructure on Cloudflare Workers + KV, serving prompts in sub-millisecond from 300+ locations, with weighted rollouts and instant rollback.",
      "Ferro-KV: a high-performance LSM key-value store in Rust with write-ahead logging, p99 9.3ms writes and 3.0ms reads under load.",
      "The hardware got faster and the models got smarter. The curiosity that unplugged a school computer is still doing the driving.",
    ],
    stats: [
      { value: "Sub-ms", label: "PromptX edge reads" },
      { value: "9.3 / 3.0 ms", label: "Ferro-KV p99 PUT / GET" },
      { value: "300+", label: "Edge locations" },
    ],
  },
  {
    era: "Chapter 03",
    title: "And the Story Continues",
    blocks: [
      "Every project you're about to see exists because of this journey, the curiosity, the constraints, and the failures that taught the most.",
      "Now, let's look at what that curiosity has actually built.",
    ],
  },
];
