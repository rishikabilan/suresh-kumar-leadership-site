import jsPDF from "jspdf";
import {
  ArrowUp,
  Award,
  BarChart2,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  TrendingDown,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ── Intersection Observer hook ────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

// Per-item reveal hook for staggered animations
function useItemReveal(index: number, threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimeout(() => {
            el.classList.add("visible");
          }, index * 80);
          observer.unobserve(el);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, index]);
  return ref;
}

// ── Nav links ─────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Summary", href: "#summary" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Track Record", href: "#track-record" },
  { label: "Contact", href: "#contact" },
];

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { threshold: 0.3 },
    );
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
      style={{
        background: "#03045E",
        borderBottom: "1px solid rgba(0,180,216,0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            className="font-bold text-white text-base tracking-wide hover:text-[#00B4D8] transition-colors"
            data-ocid="nav.link"
          >
            Suresh Kumar Murugan
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[#00B4D8]"
                    : "text-[#CAF0F8] hover:text-[#00B4D8] hover:bg-white/5"
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* LinkedIn CTA */}
          <div className="hidden lg:block">
            <NavLinkedInBtn />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            data-ocid="nav.toggle"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden border-t px-4 pb-4"
          style={{ background: "#03045E", borderColor: "rgba(0,180,216,0.2)" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-medium text-[#CAF0F8] hover:text-[#00B4D8] border-b last:border-0"
              style={{ borderColor: "rgba(0,180,216,0.1)" }}
              data-ocid="nav.link"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/sureshkumarmurugan/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full text-white"
            style={{ background: "#00B4D8" }}
            data-ocid="nav.primary_button"
          >
            <Linkedin size={14} />
            LinkedIn
          </a>
        </div>
      )}
    </header>
  );
}

// Extracted component to avoid inline assignment in event handlers
function NavLinkedInBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://www.linkedin.com/in/sureshkumarmurugan/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full text-white transition-all"
      style={{ background: hovered ? "#0077B6" : "#00B4D8" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-ocid="nav.primary_button"
    >
      <Linkedin size={14} />
      LinkedIn
    </a>
  );
}

// ── PDF Resume Generator ───────────────────────────────────────────────────────
function generateResumePDF() {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const pageH = 297;
  const marginL = 18;
  const marginR = 18;
  const contentW = pageW - marginL - marginR;
  let y = 0;

  const navy = [3, 4, 94] as [number, number, number];
  const blue = [0, 119, 182] as [number, number, number];
  const cyan = [0, 180, 216] as [number, number, number];
  const darkText = [20, 20, 40] as [number, number, number];
  const midGray = [80, 90, 110] as [number, number, number];

  function checkPage(needed: number) {
    if (y + needed > pageH - 15) {
      doc.addPage();
      y = 18;
    }
  }

  function drawSectionTitle(title: string) {
    checkPage(14);
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...navy);
    doc.text(title.toUpperCase(), marginL, y);
    y += 2;
    doc.setDrawColor(...cyan);
    doc.setLineWidth(0.7);
    doc.line(marginL, y, pageW - marginR, y);
    y += 5;
  }

  // ── Header ──────────────────────────────────────────────────────────────────
  doc.setFillColor(...navy);
  doc.rect(0, 0, pageW, 42, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("Suresh Kumar Murugan", marginL, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(202, 240, 248);
  doc.text(
    "Senior Quality Assurance, Manufacturing & Supply Chain Leader",
    marginL,
    24,
  );

  doc.setFontSize(8.5);
  doc.setTextColor(144, 224, 239);
  doc.text(
    "+91 99524 41878  |  mail.sureshkmr@gmail.com  |  Coimbatore, India  |  linkedin.com/in/sureshkumarmurugan",
    marginL,
    32,
  );
  doc.setFontSize(8);
  doc.text(
    "20+ Years | IECEx/ATEX Authorized Person | QMS Lead Auditor",
    marginL,
    38,
  );
  y = 50;

  // ── Summary ──────────────────────────────────────────────────────────────────
  drawSectionTitle("Professional Summary");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...darkText);
  const summaryText =
    "Senior Quality Assurance, Manufacturing, and Supply Chain Leader with over 20 years of progressive experience across automotive, electronics, EMS, EV, and regulated manufacturing environments. Certified QMS Lead Auditor and IECEx/ATEX Authorized Person, providing strategic and hands-on leadership in IECEx, ATEX, ISO 9001, IATF 16949, and customer-specific compliance frameworks. Demonstrated expertise in enterprise-wide quality governance, spanning manufacturing quality, supplier and procurement quality, supply chain assurance, customer quality, warranty management, and sales returns. Proven ability to stabilize production operations, strengthen supplier performance, mitigate quality risks, and embed preventive quality systems, supporting NPD/NPI and sustained operational excellence.";
  const summaryLines = doc.splitTextToSize(summaryText, contentW);
  doc.text(summaryLines, marginL, y);
  y += summaryLines.length * 4.5 + 3;

  // ── Key Achievements ─────────────────────────────────────────────────────────
  drawSectionTitle("Key Achievements – Impact at a Glance");
  const achievements = [
    "20+ Years of progressive quality leadership experience",
    "50% Supplier Defect Reduction through structured development programs",
    "~40% In-Process Rejection Reduction at current and previous roles",
    "<150 PPM Customer Quality Level sustained at current position",
    "6–8% First Pass Yield Gain through cross-functional quality initiatives",
    "2.8% → 1.3% COPQ Reduction delivering significant cost savings",
  ];

  const colW = contentW / 2 - 3;
  achievements.forEach((a, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    if (col === 0 && i > 0) y += 0;
    const xPos = marginL + col * (colW + 6);
    const yPos = y + row * 8;
    checkPage(8);
    doc.setFillColor(...cyan);
    doc.circle(xPos + 1.2, yPos - 1.5, 1.2, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...darkText);
    const lines = doc.splitTextToSize(a, colW - 6);
    doc.text(lines, xPos + 5, yPos - 0.5);
  });
  y += Math.ceil(achievements.length / 2) * 8 + 4;

  // ── Experience ────────────────────────────────────────────────────────────────
  drawSectionTitle("Professional Experience");

  const experiences = [
    {
      title: "Senior Manager – Quality",
      company: "VAS Pvt. Ltd., Coimbatore",
      period: "June 2023 – Present",
      subtitle:
        "Electronic Manufacturing Service & Wiring Harness Manufacturing",
      bullets: [
        "Led cross-functional quality initiatives improving First Pass Yield by 6–8% and reducing in-process rejection by ~40%",
        "Maintained zero major non-conformities during external audits; customer PPM sustained below 150",
        "Reduced COPQ from 2.8% to below 1.3% of turnover; documentation gaps reduced by ~35% annually",
        "Drove supplier quality programs reducing defect rates by 50% and improving OTD above 95%",
        "Improved customer complaint closure time by 30%; reduced repeat issues by ~40%",
      ],
    },
    {
      title: "Manager – Supply Chain Functions",
      company: "Courtyard by Marriott, Inverness, UK",
      period: "2021 – 2023",
      subtitle: "",
      bullets: [
        "Managed procurement, supplier coordination, and inventory control for hospitality operations",
        "Implemented MRP-based replenishment planning; maintained high stock reconciliation through cycle counts",
        "Improved supplier performance via delivery tracking and service-level compliance reviews",
      ],
    },
    {
      title: "MSc – Procurement and Supply Chain Management",
      company: "Aberdeen Business School, Robert Gordon University, UK",
      period: "2020 – 2021",
      subtitle: "Full-time Academic Programme",
      bullets: [
        "Strategic procurement, global sourcing, and supply chain optimisation",
        "Demand forecasting, inventory modelling, MRP systems, and supply chain risk management",
      ],
    },
    {
      title: "Quality Manager – Manufacturing & Supplier Quality",
      company: "LGB (Cold Forge) Ltd., Coimbatore",
      period: "2018 – 2019",
      subtitle: "Forge & Machined Automotive Components",
      bullets: [
        "Directed APQP/PPAP for OEM and Tier-1 customers; achieved Cp/Cpk >1.33 on critical characteristics",
        "Reduced in-process rejection by ~35% through root cause analysis and poka-yoke installation",
        "Sustained customer PPM below 200 PPM; managed customer audits and containment actions",
      ],
    },
    {
      title: "Senior Engineer – Quality Engineering",
      company: "Pricol Limited, Coimbatore",
      period: "2000 – 2018",
      subtitle: "Automotive Electronic Instruments | 18 Years",
      bullets: [
        "Progressed from Inspector to Senior Engineer across OEM instrument cluster programs",
        "Maintained customer PPM below 200; improved First Pass Yield by 5–6%",
        "Reduced incoming defects by ~35% and repeat field complaints by ~25% through CAPA initiatives",
        "Participated in IATF-aligned audits, SPC, MSA, 8D root cause, and supplier development",
      ],
    },
  ];

  for (const exp of experiences) {
    checkPage(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...navy);
    doc.text(exp.title, marginL, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...blue);
    doc.text(exp.company, marginL, y + 4.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...cyan);
    doc.text(exp.period, pageW - marginR, y, { align: "right" });

    if (exp.subtitle) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(7.5);
      doc.setTextColor(...midGray);
      doc.text(exp.subtitle, marginL, y + 8.5);
      y += 13;
    } else {
      y += 9;
    }

    for (const bullet of exp.bullets) {
      checkPage(7);
      doc.setFillColor(...blue);
      doc.circle(marginL + 1.5, y - 1.2, 1, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.2);
      doc.setTextColor(...darkText);
      const lines = doc.splitTextToSize(bullet, contentW - 8);
      doc.text(lines, marginL + 5, y);
      y += lines.length * 4 + 1.5;
    }
    y += 4;
  }

  // ── Core Competencies ─────────────────────────────────────────────────────────
  drawSectionTitle("Core Competencies");

  const competencies = [
    {
      cat: "Quality Management Systems",
      items:
        "ISO 9001 | IATF 16949 | IECEx (80079-34) | ANSI/ESD S20.20-2021 | ISO 14001 | ISO 45001 | MSME ZED Gold | ISO 29001 | ISO 13485 | Internal, External & Customer Audits | IECEx/ATEX Compliance & Audits",
    },
    {
      cat: "Quality Tools & Methodologies",
      items:
        "Manufacturing Quality Assurance & Process Control | Process Capability & SPC | 8D, 5-Why, Fishbone | CAPA Management | APQP, PPAP, NPI Quality Planning | Lean Manufacturing | DMAIC | FMEA | 7 QC Tools",
    },
    {
      cat: "Supply Chain & Supplier Management",
      items:
        "Supplier Qualification, Audits & Development | Incoming Quality Assurance (IQA) | Procurement Quality & Vendor Performance Management | Cost, Quality & Delivery Improvement | Warranty & Field Failure Analysis",
    },
  ];

  for (const comp of competencies) {
    checkPage(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...navy);
    doc.text(comp.cat, marginL, y);
    y += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.2);
    doc.setTextColor(...darkText);
    const lines = doc.splitTextToSize(comp.items, contentW);
    doc.text(lines, marginL, y);
    y += lines.length * 4 + 4;
  }

  // ── Certifications ────────────────────────────────────────────────────────────
  drawSectionTitle("Certifications");

  const certs = [
    "Certified QMS Lead Auditor",
    "Certified IECEx & ATEX Manufacturing Process Auditor / Authorized Person",
    "Lean Six Sigma Green Belt",
    "Certified GHG Validator (ISO 14064/14067)",
    "Power BI – Data Visualisation",
    "APM Project Management (PMQ)",
    "SAP HANA MM Training",
    "Data Analysis and Visualisation",
  ];

  certs.forEach((cert, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    if (col === 0 && i > 0) y += 0;
    const xPos = marginL + col * (colW + 6);
    const yPos = y + row * 7;
    checkPage(7);
    doc.setFillColor(...cyan);
    doc.circle(xPos + 1.2, yPos - 1.2, 1, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...darkText);
    const lines = doc.splitTextToSize(cert, colW - 6);
    doc.text(lines, xPos + 5, yPos);
  });
  y += Math.ceil(certs.length / 2) * 7 + 4;

  // ── Track Record ──────────────────────────────────────────────────────────────
  drawSectionTitle("Track Record – Key Accomplishments");

  const trackRecord = [
    "Sustained ISO 9001 & IATF 16949 compliance across complex manufacturing environments",
    "Strengthened supplier quality performance and long-term partnerships",
    "Enabled successful new product launches through structured APQP and NPI processes",
    "Reduced warranty and field failure issues through proactive quality engineering",
    "Improved operational efficiency and cost performance through lean quality practices",
  ];

  for (const item of trackRecord) {
    checkPage(8);
    doc.setFillColor(...navy);
    doc.circle(marginL + 1.5, y - 1.2, 1.2, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...darkText);
    const lines = doc.splitTextToSize(item, contentW - 8);
    doc.text(lines, marginL + 5, y);
    y += lines.length * 4.5 + 2;
  }

  doc.save("Suresh_Kumar_Murugan_Resume.pdf");
}

// ── Hero Section ──────────────────────────────────────────────────────────────
function HeroLinkedInBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://www.linkedin.com/in/sureshkumarmurugan/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg text-white transition-all text-sm"
      style={{ background: hovered ? "#0077B6" : "#00B4D8" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-ocid="hero.primary_button"
    >
      <Linkedin size={16} />
      Connect on LinkedIn
    </a>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16"
      style={{ background: "#03045E" }}
      aria-label="Hero section"
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #00B4D8 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 w-full">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left: Profile Photo */}
          <div className="animate-hero-avatar lg:col-span-2 flex justify-center">
            <div className="relative">
              <div
                className="w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-4"
                style={{
                  borderColor: "#00B4D8",
                  boxShadow:
                    "0 0 0 8px rgba(0,180,216,0.15), 0 24px 60px rgba(0,0,0,0.4)",
                }}
              >
                <img
                  src="/assets/profile.jpg"
                  alt="Suresh Kumar Murugan – Senior Quality Assurance Leader"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="lg:col-span-3">
            <h1 className="animate-hero-name text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-3">
              Suresh Kumar Murugan
            </h1>
            <p
              className="animate-hero-title text-lg sm:text-xl font-semibold mb-2"
              style={{ color: "#CAF0F8" }}
            >
              Senior Quality Assurance, Manufacturing &amp; Supply Chain Leader
            </p>
            <p
              className="animate-hero-sub text-base font-medium mb-8"
              style={{ color: "#90E0EF" }}
            >
              20+ Years | IECEx/ATEX Authorized Person | QMS Lead Auditor
            </p>

            {/* Contact info */}
            <div className="animate-hero-contact flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
              <a
                href="tel:+919952441878"
                className="inline-flex items-center gap-2 text-sm text-white hover:text-[#00B4D8] transition-colors"
                aria-label="Phone: +91 99524 41878"
              >
                <Phone size={14} style={{ color: "#00B4D8" }} />
                +91 99524 41878
              </a>
              <a
                href="mailto:mail.sureshkmr@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-white hover:text-[#00B4D8] transition-colors"
                aria-label="Email: mail.sureshkmr@gmail.com"
              >
                <Mail size={14} style={{ color: "#00B4D8" }} />
                mail.sureshkmr@gmail.com
              </a>
              <span className="inline-flex items-center gap-2 text-sm text-white">
                <MapPin size={14} style={{ color: "#00B4D8" }} />
                Coimbatore, India
              </span>
            </div>

            {/* CTAs */}
            <div className="animate-hero-ctas flex flex-wrap gap-4">
              <HeroLinkedInBtn />
              <button
                type="button"
                onClick={generateResumePDF}
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all text-sm border-2 hover:bg-white/10"
                style={{ borderColor: "#90E0EF", color: "#CAF0F8" }}
                data-ocid="hero.download_resume_button"
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: "linear-gradient(to bottom, transparent, #CAF0F8)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}

// ── Professional Summary ───────────────────────────────────────────────────────
const METRICS = [
  { icon: BarChart2, value: "20+", label: "Years Experience" },
  { icon: TrendingDown, value: "50%", label: "Supplier Defect Reduction" },
  { icon: ShieldCheck, value: "~40%", label: "Rejection Reduction" },
  { icon: CheckCircle2, value: "<150 PPM", label: "Customer Quality Level" },
  { icon: Truck, value: "6–8%", label: "First Pass Yield Gain" },
  { icon: BarChart2, value: "2.8%→1.3%", label: "COPQ Reduction" },
];

function MetricCard({
  metric,
  index,
}: { metric: (typeof METRICS)[0]; index: number }) {
  const ref = useItemReveal(index);
  const Icon = metric.icon;
  return (
    <div
      ref={ref}
      className="section-reveal rounded-xl p-4 text-center card-hover"
      style={{
        background: "#03045E",
        boxShadow: "0 4px 16px rgba(3,4,94,0.2)",
      }}
      data-ocid={`metrics.item.${index + 1}`}
    >
      <Icon size={18} style={{ color: "#00B4D8", margin: "0 auto 8px" }} />
      <p
        className="text-xl sm:text-2xl font-black"
        style={{ color: "#00B4D8" }}
      >
        {metric.value}
      </p>
      <p className="text-xs mt-1 leading-tight" style={{ color: "#90E0EF" }}>
        {metric.label}
      </p>
    </div>
  );
}

function SummarySection() {
  const ref = useReveal();
  return (
    <section
      id="summary"
      className="py-20"
      style={{ background: "#CAF0F8" }}
      aria-labelledby="summary-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-10">
          <h2
            id="summary-heading"
            className="text-3xl lg:text-4xl font-bold"
            style={{ color: "#03045E" }}
          >
            Professional Summary
          </h2>
          <div
            className="mt-2 mx-auto w-16 h-1 rounded"
            style={{ background: "#00B4D8" }}
          />
        </div>

        <div ref={ref} className="section-reveal space-y-10">
          {/* Summary card */}
          <div
            className="rounded-xl p-6 lg:p-8 border-l-4"
            style={{
              background: "rgba(255,255,255,0.75)",
              borderLeftColor: "#0077B6",
              boxShadow: "0 4px 20px rgba(3,4,94,0.08)",
            }}
          >
            <p
              className="text-base lg:text-lg leading-relaxed"
              style={{ color: "#03045E" }}
            >
              Senior Quality Assurance, Manufacturing, and Supply Chain Leader
              with over 20 years of progressive experience across automotive,
              electronics, EMS, EV, and regulated manufacturing environments.
              Certified QMS Lead Auditor and IECEx/ATEX Authorized Person,
              providing strategic and hands-on leadership in IECEx, ATEX, ISO
              9001, IATF 16949, and customer-specific compliance frameworks.
              Demonstrated expertise in enterprise-wide quality governance,
              spanning manufacturing quality, supplier and procurement quality,
              supply chain assurance, customer quality, warranty management, and
              sales returns. Proven ability to stabilize production operations,
              strengthen supplier performance, mitigate quality risks, and embed
              preventive quality systems, supporting NPD/NPI and sustained
              operational excellence.
            </p>
          </div>

          {/* Impact at a Glance heading */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <Zap size={20} style={{ color: "#00B4D8" }} />
              <h3
                className="text-2xl lg:text-3xl font-bold"
                style={{ color: "#03045E" }}
              >
                Impact at a Glance
              </h3>
              <Zap size={20} style={{ color: "#00B4D8" }} />
            </div>
            <div
              className="mx-auto w-20 h-1 rounded"
              style={{ background: "#00B4D8" }}
            />
            <p
              className="mt-2 text-sm font-medium"
              style={{ color: "#0077B6" }}
            >
              Quantified results across 20+ years of quality leadership
            </p>
          </div>

          {/* Metrics grid — each card has its own staggered reveal */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {METRICS.map((m, i) => (
              <MetricCard key={m.label} metric={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Experience ─────────────────────────────────────────────────────────────────
type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  subtitle?: string;
  type?: "academic";
  bullets: string[];
};

const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Senior Manager – Quality",
    company: "VAS Pvt. Ltd., Coimbatore",
    period: "June 2023 – Present",
    subtitle: "Electronic Manufacturing Service & Wiring Harness Manufacturing",
    bullets: [
      "Defined and implemented quality vision and strategy aligned with business objectives, contributing to measurable improvements in operational performance and customer satisfaction",
      "Led cross-functional quality initiatives across production, engineering, and supply chain, improving First Pass Yield by 6–8% and reducing in-process rejection by approximately 40%",
      "Strengthened and streamlined QMS framework, maintaining compliance with ISO, regulatory, and customer audit requirements, achieving zero major non-conformities during external audits",
      "Ensured compliance with RoHS, REACH, CE, UL, and customer-specific standards, while improving customer complaint closure time by 30% and sustaining customer PPM below 150",
      "Enhanced QMS documentation, procedures, and internal controls, reducing documentation gaps and audit observations by approximately 35% every year",
      "Improved key product quality metrics, reducing COPQ from 2.8% to below 1.3% of turnover, delivering significant cost savings",
      "Led structured Root Cause Analysis and CAPA initiatives, reducing repeat issues by approximately 40% through preventive action implementation",
      "Drove supplier quality development programs, reducing supplier defect rates by 50% and improving supplier OTD performance to above 95%",
      "Managed and mentored Quality Assurance and Quality Control teams, fostering a performance-driven culture and strengthening problem-solving capability across departments",
      "Acted as primary interface for key customers during audits, escalations, and performance reviews, maintaining strong customer relationships and compliance credibility",
      "Collaborated with engineering and manufacturing teams to enhance design-for-quality and process capability, supporting successful NPI and localization initiatives across Asia Pacific operations",
      "Supported regionalisation and site-based development projects, ensuring quality governance alignment across global and regional stakeholders",
    ],
  },
  {
    title: "Manager – Supply Chain Functions",
    company: "Courtyard by Marriott, Inverness, UK",
    period: "2021 – 2023",
    bullets: [
      "Managed procurement, supplier coordination, and inventory control",
      "Led end-to-end procurement planning, demand forecasting, and supplier coordination to ensure uninterrupted operational supply",
      "Implemented structured demand planning based on occupancy trends, event forecasts, and consumption analysis",
      "Managed MRP-based replenishment planning for beverage, consumables, and operational supplies",
      "Monitored stock levels, consumption patterns, and reorder points to prevent stock-outs and overstocking",
      "Maintained inventory accuracy through cycle counts and periodic stock-taking, achieving high stock reconciliation levels",
      "Controlled stores operations, including GRN verification, material issuance, FIFO adherence, and wastage reduction",
      "Improved supplier performance through delivery tracking, quality monitoring, and service-level compliance reviews",
    ],
  },
  {
    title: "MSc – Master's in Procurement and Supply Chain Management",
    company: "Aberdeen Business School, Robert Gordon University, UK",
    period: "2020 – 2021",
    subtitle: "Full-time Academic Programme",
    type: "academic",
    bullets: [
      "Completed a full-time Master's programme focused on strategic procurement, global sourcing, and supply chain optimisation",
      "Gained advanced knowledge in demand forecasting, inventory modelling, MRP systems, logistics strategy, and supply chain risk management within international business environments",
      "Developed practical expertise in supplier negotiation strategies, contract management, cost–value analysis, and sustainable procurement frameworks",
      "The programme strengthened capabilities in data-driven decision-making, supply chain resilience, and alignment of procurement strategy with overall business objectives",
    ],
  },
  {
    title: "Quality Manager – Manufacturing & Supplier Quality",
    company: "LGB (Cold Forge) Ltd., Coimbatore",
    period: "2018 – 2019",
    subtitle: "Forge & Machined Automotive Components",
    bullets: [
      "Led end-to-end Manufacturing and Supplier Quality functions for cold-forged and precision-machined automotive components supporting both New Product Development (NPD) and series production programs",
      "Directed APQP planning and PPAP submissions for OEM and Tier-1 customers, ensuring successful approvals and smooth production ramp-up without major quality escalations",
      "Established process control plans, PFMEA, and capability monitoring systems, achieving Cp/Cpk >1.33 on critical-to-quality characteristics across key product lines",
      "Reduced in-process rejection by approximately 35% through structured root cause analysis and poka-yoke and quality gates are installed",
      "Strengthened incoming inspection protocols and supplier quality monitoring dashboards to ensure consistent raw material and component quality",
      "Managed customer audits, line trials, and containment actions, maintaining strong OEM relationships and sustaining customer PPM below 200 PPM",
    ],
  },
  {
    title: "Senior Engineer – Quality Engineering",
    company: "Pricol Limited, Coimbatore",
    period: "2000 – 2018",
    subtitle:
      "Automotive Electronic Instruments | 18 Years | Career progression from Inspector to Senior Engineer",
    bullets: [
      "Progressed through quality roles over 18 years within automotive electronics manufacturing, supporting OEM instrument cluster and control device programs",
      "Led customer quality interface for OEM accounts, maintaining customer PPM below 200 PPM and supporting smooth new product launches with controlled quality ramp-up",
      "Managed Incoming Quality Assurance (IQA) for electronic PCBs, machined components, and assemblies, reducing incoming defects by approximately 35% through supplier corrective action and development initiatives",
      "Applied SPC, MSA, 8D, and structured root cause methodologies, improving First Pass Yield by 5–6% and reducing repeat defects by around 30%",
      "Analysed warranty trends and field returns, driving corrective actions that reduced repeat field complaints by approximately 25%",
      "Collaborated with procurement and global sourcing teams on supplier evaluation, technical negotiations, and cost–quality optimisation discussions, strengthening supplier performance and delivery reliability",
      "Supported international supplier interactions, contributing to supplier audits, performance reviews, and improvement roadmaps aligned with automotive supply chain strategy",
      "Actively participated in IATF-aligned audits, layered process audits, and customer line audits, maintaining strong compliance performance",
    ],
  },
];

function ExperienceSection() {
  const ref = useReveal();
  return (
    <section
      id="experience"
      className="py-20"
      style={{ background: "#CAF0F8" }}
      aria-labelledby="experience-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2
            id="experience-heading"
            className="text-3xl lg:text-4xl font-bold"
            style={{ color: "#03045E" }}
          >
            Professional Experience
          </h2>
          <div
            className="mt-2 mx-auto w-16 h-1 rounded"
            style={{ background: "#00B4D8" }}
          />
        </div>

        <div ref={ref} className="section-reveal space-y-6">
          {EXPERIENCE.map((job, i) => {
            const isAcademic = job.type === "academic";
            const isEven = i % 2 === 0;
            return (
              <div
                key={job.title}
                className="rounded-xl overflow-hidden"
                style={{
                  background: isEven
                    ? "rgba(255,255,255,0.88)"
                    : "rgba(144,224,239,0.4)",
                  borderLeft: `4px solid ${isAcademic ? "#00B4D8" : "#0077B6"}`,
                  boxShadow: "0 4px 20px rgba(3,4,94,0.08)",
                }}
                data-ocid={`experience.item.${i + 1}`}
              >
                <div className="p-6 lg:p-8">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {isAcademic && (
                          <BookOpen
                            size={16}
                            style={{ color: "#00B4D8", flexShrink: 0 }}
                          />
                        )}
                        <h3
                          className="text-lg font-bold leading-tight"
                          style={{ color: "#03045E" }}
                        >
                          {job.title}
                        </h3>
                      </div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#0077B6" }}
                      >
                        {job.company}
                      </p>
                      {job.subtitle && (
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "#0077B6" }}
                        >
                          {job.subtitle}
                        </p>
                      )}
                    </div>
                    <span
                      className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full text-white"
                      style={{ background: "#00B4D8" }}
                    >
                      {job.period}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2">
                    {job.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm"
                        style={{ color: "#1a1a3e" }}
                      >
                        <span
                          className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: "#0077B6" }}
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Skills ─────────────────────────────────────────────────────────────────────
type SkillGroup = { category: string; tags: string[] };

const SKILLS: SkillGroup[] = [
  {
    category: "Quality Management Systems",
    tags: [
      "ISO 9001",
      "IATF 16949",
      "IECEx (80079-34)",
      "Internal, External & Customer Audits",
      "IECEx/ATEX Manufacturing Compliance & Audits",
      "ANSI/ESD S20.20-2021",
      "ISO 14001",
      "ISO 45001",
      "MSME ZED Gold",
      "ISO 29001",
      "ISO 13485",
    ],
  },
  {
    category: "Quality Tools & Methodologies",
    tags: [
      "Manufacturing Quality Assurance & Process Control",
      "Process Capability, SPC & Control Plans",
      "Root Cause Analysis – 8D, 5-Why, Fishbone",
      "CAPA Management & Regulatory Compliance",
      "APQP, PPAP, NPD/NPI Quality Planning",
      "Lean Manufacturing & Continuous Improvement",
      "DMAIC, FMEA, 7 QC Tools",
    ],
  },
  {
    category: "Supply Chain & Supplier Management",
    tags: [
      "Supplier Qualification, Audits & Development",
      "Incoming Quality Assurance (IQA)",
      "Procurement Quality & Vendor Performance Management",
      "Cost, Quality & Delivery Improvement Initiatives",
      "Warranty & Field Failure Analysis",
    ],
  },
];

function SkillsSection() {
  const ref = useReveal();
  return (
    <section
      id="skills"
      className="py-20"
      style={{ background: "#CAF0F8" }}
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2
            id="skills-heading"
            className="text-3xl lg:text-4xl font-bold"
            style={{ color: "#03045E" }}
          >
            Core Competencies
          </h2>
          <div
            className="mt-2 mx-auto w-16 h-1 rounded"
            style={{ background: "#00B4D8" }}
          />
        </div>

        <div ref={ref} className="section-reveal grid md:grid-cols-3 gap-6">
          {SKILLS.map((group, i) => (
            <div
              key={group.category}
              className="rounded-xl p-6 card-hover"
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "2px solid #00B4D8",
                boxShadow: "0 4px 20px rgba(3,4,94,0.08)",
              }}
              data-ocid={`skills.item.${i + 1}`}
            >
              <h3
                className="text-base font-bold mb-4"
                style={{ color: "#03045E" }}
              >
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 rounded-full text-white"
                    style={{ background: "#0077B6" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Education ──────────────────────────────────────────────────────────────────
const EDUCATION_DATA = [
  {
    degree: "MSc – Procurement & Supply Chain Management",
    institution: "Robert Gordon University, UK",
    years: "2020 – 2021",
  },
  {
    degree: "Bachelor's of Engineering – Electrical and Electronics",
    institution: "Government College of Technologies, Coimbatore, India",
    years: "2004 – 2008",
  },
  {
    degree: "Diploma – Electrical & Electronics Engineering",
    institution: "Ramakrishna Polytechnic College, Coimbatore, India",
    years: "1996 – 1999",
  },
];

function EducationSection() {
  const ref = useReveal();
  return (
    <section
      id="education"
      className="py-20"
      style={{ background: "#90E0EF" }}
      aria-labelledby="education-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2
            id="education-heading"
            className="text-3xl lg:text-4xl font-bold"
            style={{ color: "#03045E" }}
          >
            Education
          </h2>
          <div
            className="mt-2 mx-auto w-16 h-1 rounded"
            style={{ background: "#00B4D8" }}
          />
        </div>

        <div
          ref={ref}
          className="section-reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {EDUCATION_DATA.map((edu, i) => (
            <div
              key={edu.degree}
              className="rounded-xl p-6 card-hover flex items-start gap-4"
              style={{
                background: "rgba(255,255,255,0.88)",
                border: "2px solid rgba(3,4,94,0.15)",
                boxShadow: "0 4px 20px rgba(3,4,94,0.08)",
              }}
              data-ocid={`education.item.${i + 1}`}
            >
              <GraduationCap
                size={24}
                style={{ color: "#00B4D8", flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <p
                  className="text-sm font-bold leading-snug"
                  style={{ color: "#0077B6" }}
                >
                  {edu.degree}
                </p>
                <p
                  className="text-sm mt-1 font-medium"
                  style={{ color: "#03045E" }}
                >
                  {edu.institution}
                </p>
                <p
                  className="text-sm font-bold mt-1"
                  style={{ color: "#00B4D8" }}
                >
                  {edu.years}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Certifications ─────────────────────────────────────────────────────────────
const CERTS = [
  { name: "Certified QMS Lead Auditor", Icon: ShieldCheck },
  {
    name: "Certified IECEx & ATEX Manufacturing Process Auditor/Authorized Person",
    Icon: Award,
  },
  { name: "Lean Six Sigma Green Belt", Icon: BarChart2 },
  { name: "Certified GHG Validator (ISO 14064/14067)", Icon: CheckCircle2 },
  { name: "Power BI – Data Visualisation", Icon: BarChart2 },
  { name: "APM Project Management (PMQ)", Icon: Award },
  { name: "SAP HANA MM Training", Icon: BookOpen },
  { name: "Data Analysis and Visualisation", Icon: BarChart2 },
];

function CertificationsSection() {
  const ref = useReveal();
  return (
    <section
      id="certifications"
      className="py-20"
      style={{ background: "#CAF0F8" }}
      aria-labelledby="certs-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2
            id="certs-heading"
            className="text-3xl lg:text-4xl font-bold"
            style={{ color: "#03045E" }}
          >
            Certifications
          </h2>
          <div
            className="mt-2 mx-auto w-16 h-1 rounded"
            style={{ background: "#00B4D8" }}
          />
        </div>

        <div
          ref={ref}
          className="section-reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {CERTS.map((cert, i) => (
            <div
              key={cert.name}
              className="rounded-xl p-5 card-hover flex flex-col items-center text-center gap-3"
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "2px solid rgba(0,180,216,0.4)",
                boxShadow: "0 4px 20px rgba(3,4,94,0.07)",
              }}
              data-ocid={`certifications.item.${i + 1}`}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,180,216,0.15)" }}
              >
                <cert.Icon size={22} style={{ color: "#00B4D8" }} />
              </div>
              <p
                className="text-sm font-semibold leading-snug"
                style={{ color: "#03045E" }}
              >
                {cert.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Track Record – Key Accomplishments ────────────────────────────────────────
const TRACK_RECORD = [
  {
    text: "Sustained ISO 9001 & IATF 16949 compliance across complex manufacturing environments",
    detail:
      "Maintained zero major non-conformities through robust QMS frameworks and proactive audit preparedness.",
  },
  {
    text: "Strengthened supplier quality performance and long-term partnerships",
    detail:
      "Reduced supplier defect rates by 50% and improved OTD above 95% through structured development programs.",
  },
  {
    text: "Enabled successful new product launches through structured APQP and NPI processes",
    detail:
      "Directed PPAP submissions and quality planning, ensuring smooth ramp-up without escalations.",
  },
  {
    text: "Reduced warranty and field failure issues through proactive quality engineering",
    detail:
      "Applied 8D, FMEA, and CAPA methodologies to reduce repeat field complaints by approximately 25%.",
  },
  {
    text: "Improved operational efficiency and cost performance through lean quality practices",
    detail:
      "Drove COPQ reduction from 2.8% to below 1.3% of turnover through lean and continuous improvement initiatives.",
  },
];

function TrackRecordSection() {
  const ref = useReveal();
  return (
    <section
      id="track-record"
      className="py-20"
      style={{ background: "#90E0EF" }}
      aria-labelledby="track-record-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2
            id="track-record-heading"
            className="text-3xl lg:text-4xl font-bold"
            style={{ color: "#03045E" }}
          >
            Track Record – Key Accomplishments
          </h2>
          <div
            className="mt-2 mx-auto w-20 h-1 rounded"
            style={{ background: "#00B4D8" }}
          />
          <p
            className="mt-4 text-base font-medium max-w-2xl mx-auto"
            style={{ color: "#03045E" }}
          >
            A career defined by measurable impact, compliance excellence, and
            continuous quality transformation.
          </p>
        </div>

        <div ref={ref} className="section-reveal space-y-4 max-w-4xl mx-auto">
          {TRACK_RECORD.map((item, i) => (
            <div
              key={item.text}
              className="rounded-xl p-6 card-hover flex items-start gap-5"
              style={{
                background: "rgba(255,255,255,0.88)",
                borderLeft: "4px solid #0077B6",
                boxShadow: "0 4px 20px rgba(3,4,94,0.08)",
              }}
              data-ocid={`track_record.item.${i + 1}`}
            >
              {/* Number badge */}
              <div
                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white"
                style={{ background: "#03045E" }}
                aria-hidden="true"
              >
                {i + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  <CheckCircle
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: "#00B4D8" }}
                  />
                  <div>
                    <p
                      className="text-base font-bold leading-snug"
                      style={{ color: "#03045E" }}
                    >
                      {item.text}
                    </p>
                    <p
                      className="text-sm mt-1.5 leading-relaxed"
                      style={{ color: "#0077B6" }}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────────
function ContactSection() {
  const ref = useReveal();
  return (
    <section
      id="contact"
      className="py-20"
      style={{ background: "#03045E" }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2
            id="contact-heading"
            className="text-3xl lg:text-4xl font-bold text-white"
          >
            Get In Touch
          </h2>
          <div
            className="mt-2 mx-auto w-16 h-1 rounded"
            style={{ background: "#00B4D8" }}
          />
          <p className="mt-4 text-base" style={{ color: "#90E0EF" }}>
            Open to senior leadership roles, quality transformation initiatives,
            and consulting opportunities.
          </p>
        </div>

        <div
          ref={ref}
          className="section-reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto"
        >
          <a
            href="tel:+919952441878"
            className="rounded-xl p-6 flex flex-col items-center text-center gap-3 card-hover group"
            style={{
              background: "rgba(0,180,216,0.12)",
              border: "1px solid rgba(0,180,216,0.3)",
            }}
            data-ocid="contact.phone_link"
            aria-label="Call +91 99524 41878"
          >
            <Phone size={28} style={{ color: "#00B4D8" }} />
            <div>
              <p
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: "#90E0EF" }}
              >
                Phone
              </p>
              <p className="text-sm font-semibold text-white group-hover:text-[#00B4D8] transition-colors">
                +91 99524 41878
              </p>
            </div>
          </a>

          <a
            href="mailto:mail.sureshkmr@gmail.com"
            className="rounded-xl p-6 flex flex-col items-center text-center gap-3 card-hover group"
            style={{
              background: "rgba(0,180,216,0.12)",
              border: "1px solid rgba(0,180,216,0.3)",
            }}
            data-ocid="contact.email_link"
            aria-label="Email mail.sureshkmr@gmail.com"
          >
            <Mail size={28} style={{ color: "#00B4D8" }} />
            <div>
              <p
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: "#90E0EF" }}
              >
                Email
              </p>
              <p className="text-sm font-semibold text-white group-hover:text-[#00B4D8] transition-colors break-all">
                mail.sureshkmr@gmail.com
              </p>
            </div>
          </a>

          <div
            className="rounded-xl p-6 flex flex-col items-center text-center gap-3"
            style={{
              background: "rgba(0,180,216,0.12)",
              border: "1px solid rgba(0,180,216,0.3)",
            }}
          >
            <MapPin size={28} style={{ color: "#00B4D8" }} />
            <div>
              <p
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: "#90E0EF" }}
              >
                Location
              </p>
              <p className="text-sm font-semibold text-white">
                Coimbatore, India
              </p>
            </div>
          </div>

          <a
            href="https://www.linkedin.com/in/sureshkumarmurugan/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl p-6 flex flex-col items-center text-center gap-3 card-hover group"
            style={{
              background: "rgba(0,180,216,0.12)",
              border: "1px solid rgba(0,180,216,0.3)",
            }}
            data-ocid="contact.linkedin_link"
            aria-label="Connect on LinkedIn"
          >
            <Linkedin size={28} style={{ color: "#00B4D8" }} />
            <div>
              <p
                className="text-xs uppercase tracking-wider mb-1"
                style={{ color: "#90E0EF" }}
              >
                LinkedIn
              </p>
              <p className="text-sm font-semibold text-white group-hover:text-[#00B4D8] transition-colors">
                Connect on LinkedIn
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return (
    <footer
      className="py-8"
      style={{
        background: "#020338",
        borderTop: "1px solid rgba(0,180,216,0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-bold text-white">Suresh Kumar Murugan</p>
            <p className="text-xs mt-0.5" style={{ color: "#90E0EF" }}>
              Senior Quality Assurance &amp; Supply Chain Leader
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/sureshkumarmurugan/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-colors hover:text-[#00B4D8]"
            style={{ color: "#CAF0F8" }}
          >
            <Linkedin size={14} />
            LinkedIn
          </a>
        </div>
        <div
          className="mt-6 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs"
          style={{
            borderTop: "1px solid rgba(0,180,216,0.1)",
            color: "#90E0EF",
          }}
        >
          <p>© {year} Suresh Kumar Murugan. All rights reserved.</p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#00B4D8]"
            style={{ color: "#90E0EF" }}
          >
            Built with ❤ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── Back to Top ────────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      style={{ background: "#00B4D8" }}
      aria-label="Back to top"
      data-ocid="back_to_top.button"
    >
      <ArrowUp size={20} color="#fff" />
    </button>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <SummarySection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <TrackRecordSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
