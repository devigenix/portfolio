import React, { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Twitter, Mail, MapPin, ExternalLink, ArrowUpRight, Terminal } from "lucide-react";

const ACCENT = "#FF6A3D";
const BENCH = "#5EEAD4";

const skills = {
  Expert: ["Rust", "Go", "PostgreSQL", "Docker"],
  Intermediate: ["React / TypeScript", "Redis", "Next.js", "WebSockets"],
  "Learning / Exploring": ["LangChain", "pgvector", "Kubernetes", "Distributed Systems"],
};

const projects = [
  {
    id: "01",
    name: "Full Stack Todo App",
    blurb: "User auth, CRUD todos, and a Dockerized deploy pipeline — the full-stack baseline.",
    stack: ["Go", "Gin", "PostgreSQL", "React", "TypeScript", "Docker"],
    bench: null,
  },
  {
    id: "02",
    name: "Real-Time Chat App",
    blurb: "Multi-room chat with an AI assistant streaming responses over SSE alongside live WebSocket messaging.",
    stack: ["Go", "WebSockets", "Next.js", "PostgreSQL", "SSE"],
    bench: null,
  },
  {
    id: "03",
    name: "URL Shortener",
    blurb: "Redis-cached redirects with collision detection and a click-analytics dashboard.",
    stack: ["Rust", "Axum", "Redis", "PostgreSQL", "React"],
    bench: { label: "throughput", value: "35,000 – 60,000 req/sec", note: "k6 · M4 Air" },
  },
  {
    id: "04",
    name: "RAG Document Q&A",
    blurb: "Upload a document, chunk and embed it, then answer questions with cited, streamed responses.",
    stack: ["Go", "pgvector", "Anthropic API", "Next.js"],
    bench: null,
  },
  {
    id: "05",
    name: "Rust AI Inference Server",
    blurb: "A small model served via Candle, benchmarked live against the same task in PyTorch.",
    stack: ["Rust", "Candle", "Axum", "PyTorch"],
    bench: { label: "latency", value: "22ms vs 240ms", note: "11× faster than Python · M4 Air" },
    featured: true,
  },
  {
    id: "06",
    name: "Distributed Task Queue",
    blurb: "Go orchestrator pushes jobs to Redis; a configurable pool of Rust workers pulls and processes them.",
    stack: ["Go", "Rust", "Redis", "React"],
    bench: { label: "throughput", value: "1,800 – 4,000 jobs/sec", note: "10–50 workers · M4 Air" },
  },
];

const certCategories = [
  "All",
  "AI/ML",
  "Backend",
  "DevOps",
  "Networking",
  "Security",
  "Management",
  "Legal",
  "Science",
];

// Add your real certificates here as you earn them, e.g.:
// { title: "Object-Oriented Data Structures in C++", issuer: "University of Illinois", platform: "Coursera", year: "2024", category: "Backend", url: "https://..." }
const certificates = [
  {
    title: "The Bits and Bytes of Computer Networking",
    platform: "Google · Coursera",
    year: "2026",
    category: "Networking",
    url: "https://coursera.org/share/2d5d962cb1ed3a55a484733e7029cf28",
  },
  {
    title: "Design Thinking: Ideas to Action",
    platform: "University of Virginia · Coursera",
    year: "2026",
    category: "Management",
    url: "https://coursera.org/share/a67d9c039c47286b64ac0ce2878d9a50",
  },
  {
    title: "Operating Systems and You: Becoming a Power User",
    platform: "Google · Coursera",
    year: "2026",
    category: "Backend",
    url: "https://coursera.org/share/5bd8dd4f506cf8ab867f33eac167fef1",
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "12px",
        letterSpacing: "0.15em",
        color: ACCENT,
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <span style={{ opacity: 0.6 }}>{"//"}</span>
      {children}
    </div>
  );
}

function DisabledButton({ icon: Icon, children }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "12px",
        color: "#4A5568",
        cursor: "not-allowed",
      }}
      title="Link not added yet"
    >
      <Icon size={13} />
      {children}
    </span>
  );
}

export default function Portfolio() {
  const [navSolid, setNavSolid] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Replace YOUR_FORM_ID below with your real Formspree form ID (see formspree.io)
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div
      style={{
        background: "#0A0E14",
        color: "#E8ECF1",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .nav-link { cursor: pointer; color: #8B96A5; font-size: 14px; transition: color 0.2s; }
        .nav-link:hover { color: #E8ECF1; }
        .skill-pill { transition: transform 0.15s, border-color 0.15s; }
        .skill-pill:hover { transform: translateY(-2px); }
        .proj-card { transition: transform 0.25s, border-color 0.25s; }
        .proj-card:hover { transform: translateY(-4px); border-color: #FF6A3D66 !important; }
        .social-icon { transition: color 0.2s, border-color 0.2s; }
        .social-icon:hover { color: #FF6A3D; border-color: #FF6A3D; }
        input, textarea { font-family: 'Inter', sans-serif; }
        input:focus, textarea:focus { outline: none; border-color: #FF6A3D !important; }
        @media (max-width: 720px) {
          .hero-name { font-size: 48px !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "20px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: navSolid ? "#0A0E14EE" : "transparent",
          backdropFilter: navSolid ? "blur(10px)" : "none",
          borderBottom: navSolid ? "1px solid #ffffff12" : "1px solid transparent",
          transition: "all 0.3s",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "15px",
            color: ACCENT,
            fontWeight: 500,
          }}
        >
          pc<span style={{ color: "#4A5568" }}>.dev</span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: "32px" }}>
          {["about", "skills", "projects", "certificates", "contact"].map((s) => (
            <span key={s} className="nav-link" onClick={() => scrollTo(s)}>
              {s[0].toUpperCase() + s.slice(1)}
            </span>
          ))}
        </div>
      </nav>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "100px 48px 120px",
          maxWidth: "1000px",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "14px",
            color: "#8B96A5",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Terminal size={14} color={ACCENT} />
          <span>
            whoami <span style={{ color: ACCENT }}>--role</span>
          </span>
        </div>
        <h1
          className="hero-name"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "76px",
            lineHeight: 1.05,
            fontWeight: 700,
            margin: "0 0 8px",
          }}
        >
          Prince Chauhan
        </h1>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "26px",
            fontWeight: 500,
            color: ACCENT,
            margin: "0 0 28px",
          }}
        >
          Full-Stack &amp; AI Developer, Rust Performance Engineering
        </h2>
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#B8C1CC",
            maxWidth: "620px",
            marginBottom: "40px",
          }}
        >
          Founder of Devigenix. I build full-stack SaaS and AI-native systems, then
          push the performance-critical pieces into Rust — usually with a benchmark
          to prove it was worth it.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <button
            onClick={() => scrollTo("projects")}
            style={{
              background: ACCENT,
              color: "#0A0E14",
              border: "none",
              borderRadius: "6px",
              padding: "13px 24px",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            View Projects <ArrowUpRight size={16} />
          </button>
          <button
            onClick={() => scrollTo("contact")}
            style={{
              background: "transparent",
              color: "#E8ECF1",
              border: "1px solid #ffffff2a",
              borderRadius: "6px",
              padding: "13px 24px",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Get in Touch
          </button>
        </div>
      </section>

      <section id="about" style={{ position: "relative", zIndex: 1, padding: "40px 48px 120px", maxWidth: "1000px" }}>
        <Reveal>
          <Eyebrow>ABOUT</Eyebrow>
          <p style={{ fontSize: "18px", lineHeight: 1.8, color: "#C8D0DA", maxWidth: "680px" }}>
            I work across the stack — Go and Rust on the backend, React/TypeScript on
            the frontend — and increasingly at the intersection of systems engineering
            and AI: RAG pipelines, streaming inference, and the kind of infrastructure
            that has to hold up under real load. Most of what's below started as a
            question I wanted a number for, not just an app I wanted to ship.
          </p>
        </Reveal>
      </section>

      <section id="skills" style={{ position: "relative", zIndex: 1, padding: "0 48px 120px", maxWidth: "1000px" }}>
        <Reveal>
          <Eyebrow>SKILLS</Eyebrow>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {Object.entries(skills).map(([tier, list], i) => (
            <Reveal key={tier}>
              <div
                style={{
                  border: "1px solid #ffffff14",
                  borderLeft: `3px solid ${i === 0 ? ACCENT : i === 1 ? BENCH : "#4A5568"}`,
                  borderRadius: "8px",
                  padding: "22px 26px",
                  background: "#0D131B",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "13px",
                    color: "#8B96A5",
                    marginBottom: "14px",
                  }}
                >
                  {tier}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {list.map((s) => (
                    <span
                      key={s}
                      className="skill-pill"
                      style={{
                        border: "1px solid #ffffff20",
                        borderRadius: "20px",
                        padding: "7px 16px",
                        fontSize: "13px",
                        color: "#E8ECF1",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="projects" style={{ position: "relative", zIndex: 1, padding: "0 48px 120px", maxWidth: "1100px" }}>
        <Reveal>
          <Eyebrow>PROJECTS</Eyebrow>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "34px", margin: "0 0 44px" }}>
            The build log
          </h3>
        </Reveal>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" }}>
          {projects.map((p) => (
            <Reveal key={p.id}>
              <div
                className="proj-card"
                style={{
                  border: p.featured ? `1px solid ${ACCENT}66` : "1px solid #ffffff14",
                  borderRadius: "10px",
                  padding: "26px",
                  background: p.featured
                    ? "linear-gradient(180deg, #1a130d 0%, #0D131B 60%)"
                    : "#0D131B",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                      color: "#4A5568",
                    }}
                  >
                    {p.id}
                  </span>
                  {p.featured && (
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        color: ACCENT,
                        border: `1px solid ${ACCENT}66`,
                        borderRadius: "20px",
                        padding: "3px 10px",
                      }}
                    >
                      FLAGSHIP
                    </span>
                  )}
                </div>
                <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", margin: "0 0 10px" }}>
                  {p.name}
                </h4>
                <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#9AA5B1", marginBottom: "18px", flexGrow: 1 }}>
                  {p.blurb}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "11px",
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "#8B96A5",
                        border: "1px solid #ffffff18",
                        borderRadius: "4px",
                        padding: "3px 8px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {p.bench && (
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                      background: "#00000055",
                      border: "1px solid #ffffff12",
                      borderRadius: "6px",
                      padding: "10px 14px",
                      marginBottom: "16px",
                    }}
                  >
                    <div style={{ color: "#5A6472", marginBottom: "4px" }}>$ bench --{p.bench.label}</div>
                    <div style={{ color: BENCH, fontWeight: 500 }}>{p.bench.value}</div>
                    <div style={{ color: "#4A5568", fontSize: "11px", marginTop: "2px" }}>{p.bench.note}</div>
                  </div>
                )}

                <div style={{ display: "flex", gap: "18px", marginTop: "auto", paddingTop: "6px" }}>
                  <DisabledButton icon={Github}>Source</DisabledButton>
                  <DisabledButton icon={ExternalLink}>Live demo</DisabledButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="certificates" style={{ position: "relative", zIndex: 1, padding: "0 48px 120px", maxWidth: "1100px" }}>
        <Reveal>
          <Eyebrow>CERTIFICATES</Eyebrow>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "34px", margin: "0 0 12px" }}>
            Certifications &amp; achievements
          </h3>
          <p style={{ color: "#9AA5B1", marginBottom: "36px", maxWidth: "560px" }}>
            Courses and credentials that back up the skills above.
          </p>
        </Reveal>

        <Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "36px" }}>
            {certCategories.map((cat) => (
              <span
                key={cat}
                className="skill-pill"
                style={{
                  border: cat === "All" ? `1px solid ${ACCENT}` : "1px solid #ffffff20",
                  color: cat === "All" ? ACCENT : "#C8D0DA",
                  borderRadius: "20px",
                  padding: "8px 18px",
                  fontSize: "13px",
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: "pointer",
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </Reveal>

        {certificates.length === 0 ? (
          <Reveal>
            <div
              style={{
                border: "1px dashed #ffffff28",
                borderRadius: "10px",
                padding: "48px 32px",
                textAlign: "center",
                background: "#0D131B",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "13px",
                  color: "#5A6472",
                  marginBottom: "8px",
                }}
              >
                {"// no certificates added yet"}
              </div>
              <div style={{ fontSize: "15px", color: "#8B96A5" }}>
                Certifications will show up here as they're earned.
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
            {certificates.map((c) => (
              <Reveal key={c.title}>
                <div
                  style={{
                    border: "1px solid #ffffff14",
                    borderRadius: "10px",
                    padding: "22px",
                    background: "#0D131B",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#8B96A5", marginBottom: "8px" }}>
                    {c.platform} · {c.year}
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "17px", marginBottom: "16px", flexGrow: 1 }}>
                    {c.title}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontFamily: "'JetBrains Mono', monospace",
                        border: "1px solid #ffffff20",
                        borderRadius: "4px",
                        padding: "3px 8px",
                        color: "#8B96A5",
                      }}
                    >
                      {c.category}
                    </span>
                    {c.url && (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: "12px", color: ACCENT, textDecoration: "none" }}
                      >
                        View →
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <section id="contact" style={{ position: "relative", zIndex: 1, padding: "0 48px 100px", maxWidth: "1000px" }}>
        <Reveal>
          <Eyebrow>CONTACT</Eyebrow>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "34px", margin: "0 0 12px" }}>
            Let's talk
          </h3>
          <p style={{ color: "#9AA5B1", marginBottom: "44px", maxWidth: "520px" }}>
            Open to interesting problems — especially ones with a performance angle.
          </p>
        </Reveal>

        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "48px" }}>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <Mail size={18} color={ACCENT} />
                <div>
                  <div style={{ fontSize: "12px", color: "#8B96A5" }}>Email</div>
                  <div style={{ fontSize: "15px" }}>prince@devigenix.com</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                <MapPin size={18} color={ACCENT} />
                <div>
                  <div style={{ fontSize: "12px", color: "#8B96A5" }}>Location</div>
                  <div style={{ fontSize: "15px" }}>New Delhi, India</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "14px", marginTop: "10px" }}>
                {[
                  { Icon: Github, href: "https://github.com/devigenix", label: "GitHub" },
                  { Icon: Linkedin, href: "https://linkedin.com/in/princedevigenix", label: "LinkedIn" },
                  { Icon: Twitter, href: "https://x.com/ChauhanPC07", label: "X" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-icon"
                    style={{
                      width: "42px",
                      height: "42px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #ffffff20",
                      borderRadius: "8px",
                      color: "#C8D0DA",
                      textDecoration: "none",
                    }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                style={{
                  background: "#0D131B",
                  border: "1px solid #ffffff20",
                  borderRadius: "6px",
                  padding: "13px 16px",
                  color: "#E8ECF1",
                  fontSize: "14px",
                }}
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email"
                style={{
                  background: "#0D131B",
                  border: "1px solid #ffffff20",
                  borderRadius: "6px",
                  padding: "13px 16px",
                  color: "#E8ECF1",
                  fontSize: "14px",
                }}
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message"
                rows={5}
                style={{
                  background: "#0D131B",
                  border: "1px solid #ffffff20",
                  borderRadius: "6px",
                  padding: "13px 16px",
                  color: "#E8ECF1",
                  fontSize: "14px",
                  resize: "vertical",
                }}
              />
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  background: ACCENT,
                  color: "#0A0E14",
                  border: "none",
                  borderRadius: "6px",
                  padding: "14px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: status === "sending" ? "wait" : "pointer",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
              {status === "sent" && (
                <div style={{ fontSize: "13px", color: BENCH, fontFamily: "'JetBrains Mono', monospace" }}>
                  ✓ Message sent — thanks, I'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div style={{ fontSize: "13px", color: ACCENT, fontFamily: "'JetBrains Mono', monospace" }}>
                  Something went wrong. Email me directly at prince@devigenix.com instead.
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <footer
        style={{
          position: "relative",
          zIndex: 1,
          padding: "28px 48px",
          borderTop: "1px solid #ffffff12",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "12px",
          color: "#4A5568",
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} Prince Chauhan — built with Rust-grade attention to detail.
      </footer>
    </div>
  );
}
