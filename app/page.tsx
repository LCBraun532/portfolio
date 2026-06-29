"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Mail, Linkedin, Play, FileText, BarChart3, Mic, Video, Bookmark, Volume2, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonDef {
  label: string;
  url: string;
  icon: "file" | "play" | "linkedin" | "podcast" | "globe";
}

interface AudioSample {
  label: string;
  url: string;
  duration: string;
}

interface WorkSample {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  client: string;
  clientLogo?: string;
  logoHeight?: number;
  logoWidth?: number;
  role: string;
  bullets: string[];
  buttons: ButtonDef[];
  audioSamples?: AudioSample[];
  fullWidth?: boolean;
  audioIntro?: string;
}

const FISERV_LOGO = "https://galaxy-prod.tlcdn.com/view/user_31pwIcYr2gZbOf4vg7NTzlabdJX/ba2418b2251340ad85c089ac14646200.png";
const FICO_LOGO   = "https://galaxy-prod.tlcdn.com/view/user_31pwIcYr2gZbOf4vg7NTzlabdJX/09fdc7d55937430fb4b340f6165e03dc.png";
const ELLSWORTH_LOGO = "https://galaxy-prod.tlcdn.com/view/user_31pwIcYr2gZbOf4vg7NTzlabdJX/7e6a63b76fa140ea86e23bbba9bf6c1d.png";
const LINKEDIN_LOGO  = "https://galaxy-prod.tlcdn.com/view/user_31pwIcYr2gZbOf4vg7NTzlabdJX/cb5a3afe198a4cbc864c224fa0cd433f.png";

const samples: WorkSample[] = [
  // ── Fiserv row 1 left
  {
    id: 2,
    category: "Case Study",
    categoryColor: "bg-violet-100 text-violet-800 border-violet-200",
    title: "PeoplesBank: Propels Growth With Access to Market Insights",
    client: "Fiserv",
    clientLogo: FISERV_LOGO,
    logoHeight: 30,
    role: "Content Strategist & Copywriter",
    bullets: [
      "Developed a full B2B case study on how PeoplesBank (York, PA) used Fiserv's BankAnalyst® Market platform to identify high-growth branch locations and expand its footprint",
      "Conducted stakeholder interviews with the VP of Marketing and SVP of Retail; translated concrete outcomes — branch expansion, new account growth — into a compelling narrative arc",
      "Positioned Fiserv as a strategic consulting partner rather than a technology vendor, reinforcing a key differentiator in the enterprise sales cycle",
    ],
    buttons: [
      { label: "View Case Study", url: "https://www.fiserv.com/content/dam/fiserv-ent/final-files/marketing-collateral/case-studies/peoples-bank-case-study.pdf", icon: "file" },
    ],
  },
  // ── Fiserv row 1 right
  {
    id: 3,
    category: "Point of View",
    categoryColor: "bg-sky-100 text-sky-800 border-sky-200",
    title: "The Growth of Digital Banking",
    client: "Fiserv",
    clientLogo: FISERV_LOGO,
    logoHeight: 30,
    role: "Author & Designer",
    bullets: [
      "Authored and designed a thought leadership POV paper synthesizing Fiserv proprietary research, Plancomm & Accenture survey data, and pandemic-era consumer behavioral shifts",
      "Argued a clear strategic framework — Engagement, Efficiency, Insights — to help financial institutions rethink and elevate their digital strategies",
      "Positioned Fiserv as a category authority on digital transformation, supporting demand generation campaigns and complex financial institution sales",
    ],
    buttons: [
      { label: "Read POV Paper", url: "https://www.fiserv.com/content/dam/fiserv-ent/final-files/marketing-collateral/point-of-view-papers/The_Growth_of_Digital_Banking_POV_Paper_0121.pdf", icon: "file" },
    ],
  },
  // ── Fiserv row 2 left
  {
    id: 4,
    category: "Podcast Series",
    categoryColor: "bg-amber-100 text-amber-800 border-amber-200",
    title: "Branch Evolution — A Fiserv Podcast",
    client: "Fiserv",
    clientLogo: FISERV_LOGO,
    logoHeight: 30,
    role: "Host, Producer & Scriptwriter",
    bullets: [
      "Scripted, hosted, and engineered a branded podcast series exploring branch innovation, consumer banking trends, and financial technology strategy",
      "Managed director-level SME interviews and collaborated with Legal and GMG teams to navigate enterprise approval workflows in a highly regulated environment",
      "Distributed across YouTube, Apple Podcasts, and Spotify — a thought leadership channel reaching Fiserv clients, prospects, and industry analysts",
    ],
    buttons: [
      { label: "Listen to Episodes", url: "https://www.fiserv.com/en/lp/branch-evolution-podcast.html", icon: "play" },
    ],
  },
  // ── Fiserv row 2 right (infographic moved here)
  {
    id: 1,
    category: "Infographic",
    categoryColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    title: "Next Generation Digital Banking",
    client: "Fiserv",
    clientLogo: FISERV_LOGO,
    logoHeight: 30,
    role: "Content Strategist & Copywriter",
    bullets: [
      "Distilled Fiserv's enterprise digital banking platform into a visually scannable one-pager targeting community bank and credit union decision-makers",
      "Translated cloud architecture, data insights dashboards, and P2P payments into clear, benefit-driven language aligned to audience pain points",
      "Front-line sales enablement asset distributed nationally to Fiserv's client-facing teams at a major product launch",
    ],
    buttons: [
      { label: "View Infographic", url: "https://galaxy-prod.tlcdn.com/view/user_31pwIcYr2gZbOf4vg7NTzlabdJX/966a65919a3f417e90dc26288e36d23e.pdf", icon: "file" },
    ],
  },
  // ── FICO
  {
    id: 5,
    category: "Podcast Series",
    categoryColor: "bg-amber-100 text-amber-800 border-amber-200",
    title: "FICO® Score Industry Insights",
    client: "FICO",
    clientLogo: FICO_LOGO,
    role: "Host & Moderator",
    bullets: [
      "Created and hosted FICO-branded thought leadership covering credit scoring, lending economics, and consumer financial trends",
      "Produced both video vodcasts and audio-only episodes distributed across YouTube, Apple Podcasts, Spotify, iHeart, and other podcast platforms to maximize reach across the credit industry",
    ],
    buttons: [
      { label: "Watch Vodcast Series", url: "https://www.youtube.com/watch?v=g0O-5F2GS9c&list=PLS5N4W1Ufcu9oczSpFcbKs0fvXMI0M7QZ", icon: "play" },
      { label: "Listen on Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/fico-score-industry-insights/id1707436796", icon: "podcast" },
    ],
  },
  {
    id: 10,
    category: "Podcast Series",
    categoryColor: "bg-amber-100 text-amber-800 border-amber-200",
    title: "FICO Score 10T: Early Adoption Benefits and Strategies",
    client: "FICO",
    clientLogo: FICO_LOGO,
    role: "Script Developer, Guest Prep & Producer",
    bullets: [
      "Developed and wrote the episode script and guest prep materials for a roundtable discussion featuring Michael Crockett (Xactus), Amber Christman, Alyson Finn, and Lance Braun (FICO)",
      "Panel covers the pathway to FICO Score 10T migration and the benefits lenders and portfolio managers realize by leveraging trended data in FICO's most predictive score — while preserving proven minimum FICO Score criteria",
      "Responsible for full production cycle: script development, guest preparation, recording, and post-production",
    ],
    buttons: [
      { label: "Listen to Episode", url: "https://www.fico.com/en/latest-thinking/podcast/fico-score-10t-early-adoption-benefits-and-strategies", icon: "podcast" },
    ],
  },
  // ── Audio Blog (full width)
  {
    id: 6,
    category: "Audio Blog Series",
    categoryColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    title: "FICO Industry Insights Thought Leadership Audio Blog Series",
    client: "FICO",
    clientLogo: FICO_LOGO,
    role: "Producer & AI Content Strategist",
    fullWidth: true,
    audioIntro: "Audio blog series examples leverage AI tools to accelerate development, production, review and approval cycles. Both examples feature SME voice cloning technologies.",
    bullets: [
      "Scripted and produced AI-assisted audio blog content extending the FICO® Score Industry Insights franchise to new channels and formats",
      "Applied SME voice cloning to maintain subject matter authenticity while dramatically compressing production timelines",
      "Demonstrated how AI-integrated workflows can scale editorial output without sacrificing quality or compliance standards",
    ],
    buttons: [],
    audioSamples: [
      { label: "Financial Literacy — Janelle", url: "https://galaxy-prod.tlcdn.com/view/user_31pwIcYr2gZbOf4vg7NTzlabdJX/65fc6c005aad4c3a9d0c9950613840a4.mp3", duration: "7:26" },
      { label: "Industry Insights — Aninda", url: "https://galaxy-prod.tlcdn.com/view/user_31pwIcYr2gZbOf4vg7NTzlabdJX/8f62fb28471049efbe7b2e52351f375c.mp3", duration: "12:06" },
    ],
  },
  // ── Ellsworth
  {
    id: 7,
    category: "Video Content",
    categoryColor: "bg-rose-100 text-rose-800 border-rose-200",
    title: "Ask the Glue Doctor & Fisnar Instructional Video Series",
    client: "Ellsworth Adhesives",
    clientLogo: ELLSWORTH_LOGO,
    logoHeight: 30,
    role: "Producer & Scriptwriter",
    bullets: [
      "Scripted, produced, and distributed the 'Ask the Glue Doctor' branded video series, reaching engineering and procurement audiences on YouTube and corporate websites",
      "Produced Fisnar instructional video content — scripting demonstrations, directing SMEs on camera, and building and narrating videos that serve both sales enablement and client education goals",
      "Coordinated with supplier partners including 3M, Henkel, and Dow Corning to develop technically accurate content aligned to specific product lines",
    ],
    buttons: [
      { label: "Watch on YouTube", url: "https://www.youtube.com/watch?v=ao4YxkG3ybo&list=PLS5N4W1Ufcu-IgjRAlrmGLfPGnnNDTgEb", icon: "play" },
    ],
  },
  // ── LinkedIn
  {
    id: 9,
    category: "LinkedIn Featured",
    categoryColor: "bg-slate-100 text-slate-700 border-slate-200",
    title: "Additional Work Samples",
    client: "LinkedIn Featured Section",
    clientLogo: LINKEDIN_LOGO,
    logoHeight: 30,
    role: "Content Strategist",
    bullets: [
      "Curated writing samples, campaigns, and content strategy work published on Lance's LinkedIn Featured section",
      "Includes examples spanning fintech, industrial B2B, and consumer financial content — demonstrating full breadth of channels and industries",
      "Updated regularly to reflect current projects and new client engagements",
    ],
    buttons: [
      { label: "View on LinkedIn", url: "https://www.linkedin.com/in/lcbraun/details/featured/", icon: "linkedin" },
    ],
  },
];

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Infographic: BarChart3,
  "Case Study": FileText,
  "Point of View": Bookmark,
  "Podcast Series": Mic,
  "Audio Blog Series": Volume2,
  "Video Content": Video,
  "LinkedIn Featured": Linkedin,
};

const allCategories = ["All", ...Array.from(new Set(samples.map((s) => s.category)))];

function ClientLogo({ url, name, height = 23, width }: { url: string; name: string; height?: number; width?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={`${name} logo`}
      style={width
        ? { width: `${width}px`, height: "auto", objectFit: "contain", opacity: 0.85 }
        : { height: `${height}px`, width: "auto", objectFit: "contain", opacity: 0.85 }
      }
      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
    />
  );
}

function AudioPlayer({ label, url, duration }: AudioSample) {
  return (
    <div className="rounded-xl p-3 border" style={{ backgroundColor: "rgba(15,34,64,0.05)", borderColor: "rgba(15,34,64,0.1)" }}>
      <div className="flex items-center gap-2 mb-2">
        <Volume2 className="w-3.5 h-3.5 shrink-0" style={{ color: "#c9a84c" }} />
        <span className="text-sm font-medium text-slate-700 leading-tight">{label}</span>
        <span className="ml-auto text-xs text-slate-400 shrink-0">{duration}</span>
      </div>
      <audio controls className="w-full" style={{ height: "36px" }} preload="none">
        <source src={url} type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? samples : samples.filter((s) => s.category === activeFilter);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f9fb", fontFamily: "'Calibri', 'Carlito', 'Trebuchet MS', Arial, sans-serif" }}>

      {/* ── Hero Header ── */}
      <header style={{ backgroundColor: "#0f2240" }} className="text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-10"
          >
            {/* Photo */}
            <div className="shrink-0">
              <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden"
                style={{ boxShadow: "0 0 0 4px #c9a84c, 0 0 0 7px rgba(201,168,76,0.25)" }}>
                <Image
                  src="https://galaxy-prod.tlcdn.com/view/user_31pwIcYr2gZbOf4vg7NTzlabdJX/73c41ede7c144594a5f25cad79659d69.png"
                  alt="Lance Braun"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: "#c9a84c" }}>
                Content Strategy Portfolio
              </p>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-2">Lance Braun</h1>
              <p className="text-lg md:text-xl font-light mb-6 text-slate-300">
                Senior Content Strategist&nbsp;&nbsp;·&nbsp;&nbsp;Podcast Host&nbsp;&nbsp;·&nbsp;&nbsp;AI-Fluent Communicator
              </p>
              <div className="w-16 h-px mb-6 md:mx-0 mx-auto" style={{ backgroundColor: "#c9a84c" }} />
              <p className="text-base leading-relaxed text-slate-300 max-w-2xl">
                With more than a decade of experience crafting content strategy for fintech, financial services, and
                industrial sectors, I transform complex ideas into compelling narratives that drive engagement and
                measurable business outcomes. I've led strategy across owned, earned, and audio channels — producing
                thought leadership, case studies, infographics, and branded podcast series for Fiserv, FICO, and
                Ellsworth Adhesives. Fluent in AI-assisted content workflows, I bring both strategic vision and
                hands-on craft to every engagement.
              </p>
            </div>
          </motion.div>
        </div>
        <svg viewBox="0 0 1440 40" className="w-full block" preserveAspectRatio="none" style={{ height: 40 }}>
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#f8f9fb" />
        </svg>
      </header>

      {/* ── Work Samples ── */}
      <main className="max-w-5xl mx-auto px-6 py-14">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-400">
            Selected Work Samples — B2B Content Strategy · Thought Leadership · Podcast Production · Video
          </p>
          <div className="w-12 h-px mx-auto mt-4" style={{ backgroundColor: "#c9a84c" }} />
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200"
              style={
                activeFilter === cat
                  ? { backgroundColor: "#0f2240", color: "#fff", borderColor: "#0f2240" }
                  : { backgroundColor: "#fff", color: "#475569", borderColor: "#e2e8f0" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((sample, i) => {
            const Icon = categoryIcons[sample.category] ?? FileText;
            return (
              <motion.div
                key={sample.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className={cn(
                  "bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden",
                  sample.fullWidth && "md:col-span-2"
                )}
              >
                <div className="h-1" style={{ background: "linear-gradient(to right, #0f2240, #c9a84c)" }} />
                <div className="p-6 flex flex-col flex-1">
                  {/* Category + Logo row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border", sample.categoryColor)}>
                      <Icon className="w-3 h-3" />
                      {sample.category}
                    </span>
                    {sample.clientLogo && (
                      <ClientLogo url={sample.clientLogo} name={sample.client} height={sample.logoHeight} width={sample.logoWidth} />
                    )}
                  </div>

                  <h2 className="text-xl font-bold leading-snug mb-1" style={{ color: "#0f2240" }}>
                    {sample.title}
                  </h2>
                  <p className="text-sm text-slate-500 mb-1">{sample.client}</p>
                  <span className="inline-block text-xs bg-slate-50 border border-slate-200 text-slate-600 rounded px-2 py-0.5 mb-4 w-fit">
                    {sample.role}
                  </span>

                  {sample.audioIntro && (
                    <div className="mb-4 rounded-xl p-4 border-l-4 text-sm italic text-slate-600 leading-relaxed"
                      style={{ backgroundColor: "#f0f4ff", borderLeftColor: "#c9a84c" }}>
                      {sample.audioIntro}
                    </div>
                  )}

                  <ul className="space-y-2 flex-1 mb-4">
                    {sample.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2 text-sm text-slate-600 leading-snug">
                        <span className="mt-0.5 shrink-0" style={{ color: "#c9a84c" }}>▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {sample.audioSamples && sample.audioSamples.length > 0 && (
                    <div className={cn("gap-4 mb-4", sample.fullWidth ? "grid md:grid-cols-2" : "space-y-2")}>
                      {sample.audioSamples.map((a, k) => (
                        <AudioPlayer key={k} {...a} />
                      ))}
                    </div>
                  )}

                  {sample.buttons.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
                      {sample.buttons.map((btn, k) => (
                        <a
                          key={k}
                          href={btn.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors duration-200"
                          style={{ backgroundColor: "#0f2240" }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1a3660")}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0f2240")}
                        >
                          {btn.icon === "play" && <Play className="w-3.5 h-3.5" />}
                          {btn.icon === "file" && <FileText className="w-3.5 h-3.5" />}
                          {btn.icon === "linkedin" && <Linkedin className="w-3.5 h-3.5" />}
                          {btn.icon === "podcast" && <Mic className="w-3.5 h-3.5" />}
                          {btn.icon === "globe" && <Globe className="w-3.5 h-3.5" />}
                          {btn.label}
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="text-white mt-16" style={{ backgroundColor: "#0f2240" }}>
        <svg viewBox="0 0 1440 40" className="w-full block" preserveAspectRatio="none" style={{ height: 40 }}>
          <path d="M0,20 C360,0 1080,40 1440,20 L1440,0 L0,0 Z" fill="#f8f9fb" />
        </svg>
        <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>Availability</p>
            <p className="text-sm leading-relaxed text-slate-300">
              Available for senior content strategy, content operations, and editorial leadership roles.
              Open to full-time and contract engagements.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>Let's Connect</p>
            <p className="text-sm leading-relaxed mb-5 text-slate-300">
              Interested in working together? Reach out to discuss how I can bring strategic content
              leadership to your team.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:lancecbraun@gmail.com?subject=Reaching%20Out%20from%20Your%20Profile"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-lg transition-colors"
                style={{ backgroundColor: "#c9a84c", color: "#0f2240" }}
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>
              <a
                href="https://www.linkedin.com/in/lcbraun"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-lg border transition-colors"
                style={{ borderColor: "#c9a84c", color: "#c9a84c" }}
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn Profile
              </a>
              <a
                href="https://about.me/lance.braun"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-lg border transition-colors"
                style={{ borderColor: "#c9a84c", color: "#c9a84c" }}
              >
                <Globe className="w-4 h-4" />
                Learn About.me
              </a>
            </div>
          </div>
        </div>
        <div className="text-center pb-6">
          <p className="text-xs text-slate-500">© 2026 Lance Braun · Content Strategy Portfolio</p>
        </div>
      </footer>
    </div>
  );
}
