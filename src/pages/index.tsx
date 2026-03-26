import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ExternalLink, X, Menu, ChevronDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import fitImg from "@/assets/fit.jpg";
import travelImg from "@/assets/travel.jpg";
import uniImg from "@/assets/uni.jpg";
import diaryImg from "@/assets/diary.jpg";

/* ── Data ── */
const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#techstack" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  {
    title: "FitPulse",
    cover: fitImg,
    description: "A fitness tracking dashboard that helps you monitor workouts, set goals, and track your progress over time.",
    link: "https://core-clock.vercel.app/",
    linkLabel: "Live Demo",
  },
  {
    title: "Ride Hailing App",
    cover: travelImg,
    description: "A ride-hailing application with real-time tracking, fare estimation, and seamless booking experience.",
    link: "https://github.com/SamruddhiGanu",
    linkLabel: "GitHub Repo",
  },
  {
    title: "CGPA Calculator",
    cover: uniImg,
    description: "An intuitive CGPA calculator for engineering students to track academic performance across semesters.",
    link: "https://github.com/SamruddhiGanu",
    linkLabel: "GitHub Repo",
  },
];

const techStack = [
  "SQL", "React", "Python", "HTML", "CSS", "JavaScript",
  "Node.js", "GitHub", "Tailwind", "TypeScript",
];
const techEmojis: Record<string, string> = {
  SQL: "🗃️", React: "⚛️", Python: "🐍", HTML: "📄", CSS: "🎨",
  JavaScript: "⚡", "Node.js": "🟢", GitHub: "🐙", Tailwind: "💨", TypeScript: "🔷",
};

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-diary-page/80 backdrop-blur-xl shadow-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <a href="#home" className="font-handwritten text-2xl text-primary font-bold">
          Samruddhi ✦
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-foreground">
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-diary-page/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-3 gap-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-foreground/80 hover:text-primary py-1"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ── Book Card ── */
function BookCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      viewport={{ once: true }}
      className="w-56 h-72 relative cursor-pointer shrink-0"
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Inner page */}
      <div className="absolute inset-0 rounded-r-lg rounded-l-sm bg-diary-page diary-page-dots border border-border shadow-inner p-4 flex flex-col justify-between">
        <div>
          <h3 className="font-handwritten text-2xl text-primary font-bold mb-2">{project.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{project.description}</p>
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
        >
          <ExternalLink size={12} />
          {project.linkLabel}
        </a>
      </div>

      {/* Cover */}
      <div
        className={`absolute inset-0 rounded-r-lg rounded-l-sm overflow-hidden shadow-lg border-l-4 border-diary-spine transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? "[transform:rotateY(-160deg)]" : ""
        }`}
        style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
      >
        <img src={project.cover} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-handwritten text-xl text-primary-foreground font-bold drop-shadow-lg">
            {project.title}
          </h3>
          <p className="text-primary-foreground/70 text-[10px] mt-0.5">click to open →</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Contact ── */
function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-8">
        {[
          { icon: FaGithub, href: "https://github.com/SamruddhiGanu", label: "GitHub" },
          { icon: FaLinkedin, href: "https://www.linkedin.com/in/samruddhi-ganu-3945b3325/", label: "LinkedIn" },
        ].map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center shadow-md border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Icon size={24} />
          </motion.a>
        ))}
        <motion.button
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-md border border-border"
        >
          <Mail size={24} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="relative w-full max-w-md"
          >
            <div className="relative bg-secondary rounded-b-lg rounded-t-sm overflow-visible shadow-xl border border-border">
              <div className="absolute -top-[60px] left-0 right-0 h-[60px] overflow-hidden">
                <div
                  className="w-full h-[120px] bg-muted border border-border"
                  style={{ clipPath: "polygon(0 0, 100% 0, 50% 50%)" }}
                />
              </div>
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: -20 }}
                className="relative bg-diary-page m-3 mt-2 p-5 rounded shadow-inner diary-page-dots"
              >
                <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-muted-foreground hover:text-foreground">
                  <X size={16} />
                </button>
                <h4 className="font-handwritten text-2xl text-primary mb-3">Write me a letter ✉️</h4>
                <div className="space-y-3">
                  <input type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-transparent border-b border-border px-1 py-1.5 text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground/50" />
                  <input type="email" placeholder="Your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border-b border-border px-1 py-1.5 text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground/50" />
                  <textarea placeholder="Your message..." rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-transparent border-b border-border px-1 py-1.5 text-sm focus:outline-none focus:border-primary resize-none placeholder:text-muted-foreground/50" />
                  <a
                    href={`mailto:samruddhi@example.com?subject=Hello from ${formData.name}&body=${formData.message}`}
                    className="inline-block bg-primary text-primary-foreground px-5 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Send Letter 💌
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Page ── */
export default function Index() {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Navbar />

      {/* Hero — Diary Image */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-handwritten text-4xl md:text-5xl text-primary text-center mb-2 font-bold"
        >
          Hi, since you are new here
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-handwritten text-3xl md:text-4xl text-primary/80 text-center mb-8"
        >
          let me give you a brief
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border-4 border-diary-cover"
        >
          <img src={diaryImg} alt="My scrapbook diary" className="w-full h-auto object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 flex items-center gap-1 text-muted-foreground text-sm"
        >
          scroll down to explore <ChevronDown size={14} className="animate-bounce" />
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-handwritten text-5xl text-primary text-center mb-3 font-bold"
        >
          Phase 2: Projects
        </motion.h2>
        <p className="text-center text-muted-foreground mb-14 text-sm">click a book to peek inside</p>

        <div className="flex flex-row items-center justify-center gap-8 flex-wrap lg:flex-nowrap max-w-4xl mx-auto">
          {projects.map((project, i) => (
            <BookCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section id="techstack" className="py-24 px-4 bg-muted/40">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-handwritten text-4xl text-primary text-center mb-10 font-bold"
        >
          My Toolbox 🧰
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.15, rotate: Math.random() > 0.5 ? 3 : -3 }}
              className="bg-card px-5 py-3 rounded-lg shadow-md border border-border flex items-center gap-2 cursor-default"
            >
              <span className="text-xl">{techEmojis[tech]}</span>
              <span className="text-sm font-medium text-foreground">{tech}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-handwritten text-4xl text-primary text-center mb-10 font-bold"
        >
          Let's Connect ✨
        </motion.h2>
        <ContactSection />
      </section>

      <footer className="py-6 text-center text-muted-foreground text-xs border-t border-border">
        <p className="font-handwritten text-base">made with 💗 by Samruddhi</p>
      </footer>
    </div>
  );
}