import { useState } from "react";
import {
  ShieldCheck,
  Clock,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  PlayCircle,
  Star,
  Quote,
  Wrench,
  ClipboardList,
  Truck,
  Hammer,
} from "lucide-react";

/**
 * RSD Home page
 * Sections: Hero -> Stats -> About -> Products -> Why Choose Us
 *           -> Process -> Projects -> Testimonials -> Clients -> CTA
 *
 * Render <Navbar /> and <Footer /> ("footbar.jsx") around this in your layout, e.g.:
 *   <Navbar /> <Home /> <Footer />
 *
 * All copy/images below are placeholders — swap them for real content
 * (PLACEHOLDER_IMG can be replaced with real asset paths).
 */

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop";

const STATS = [
  { icon: Award, value: "15+", label: "Years of Experience" },
  { icon: Users, value: "1,200+", label: "Happy Clients" },
  { icon: Wrench, value: "3,500+", label: "Projects Completed" },
  { icon: Clock, value: "24/7", label: "Support Available" },
];

const ABOUT_POINTS = [
  "ISO-certified manufacturing process",
  "Premium-grade galvanized steel",
  "Custom sizing for every project",
  "Nationwide installation & support",
];

const PRODUCTS = [
  {
    title: "Rolling Shutters",
    desc: "Heavy-duty rolling shutters for warehouses, retail fronts, and loading bays.",
  },
  {
    title: "Security Doors",
    desc: "Reinforced steel doors engineered for maximum forced-entry resistance.",
  },
  {
    title: "Fire Rated Doors",
    desc: "Certified fire-rated doors that meet the strictest safety codes.",
  },
  {
    title: "Industrial Gates",
    desc: "Sliding and swing gates built for high-traffic industrial sites.",
  },
  {
    title: "Automatic Doors",
    desc: "Motorized entry systems with smart access control integration.",
  },
  {
    title: "Insulated Panels",
    desc: "Thermally insulated steel panels for cold-storage and climate control.",
  },
];

const WHY_CHOOSE_US = [
  {
    icon: ShieldCheck,
    title: "Built to Last",
    desc: "Every unit is stress-tested to withstand decades of daily use.",
  },
  {
    icon: Award,
    title: "Certified Quality",
    desc: "ISO 9001 certified manufacturing with strict QA at every stage.",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Trained engineers and installers with 15+ years in the field.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "Reliable project timelines from quote to final installation.",
  },
];

const PROCESS_STEPS = [
  { icon: ClipboardList, title: "Consultation", desc: "We assess your site and requirements." },
  { icon: Hammer, title: "Fabrication", desc: "Precision manufacturing in our facility." },
  { icon: Truck, title: "Delivery", desc: "Scheduled delivery to your location." },
  { icon: Wrench, title: "Installation", desc: "Professional install and final testing." },
];

const PROJECTS = [
  "Warehouse Shutter Retrofit",
  "Retail Storefront Security",
  "Cold Storage Facility",
  "Municipal Fire Doors",
  "Logistics Loading Bay",
  "Corporate Campus Gates",
];

const TESTIMONIALS = [
  {
    quote:
      "RSD delivered exactly what they promised — on time, on budget, and built to last. Our warehouse shutters have performed flawlessly for three years.",
    name: "Daniel Ortiz",
    role: "Operations Director, Northline Logistics",
  },
  {
    quote:
      "The installation team was professional and fast. Communication throughout the project was excellent from quote to completion.",
    name: "Priya Nair",
    role: "Facilities Manager, Cedar Retail Group",
  },
  {
    quote:
      "We've ordered fire-rated doors for three separate sites now. Consistent quality every single time.",
    name: "Marcus Lee",
    role: "Project Lead, Summit Construction",
  },
];

const CLIENTS = ["Northline", "Cedar Group", "Summit Co", "Harborview", "Atlas Freight", "Meridian"];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <main className="font-sans text-[#0B1C32]">
      {/* HERO */}
      <section className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-[#0B1C32]">
        <img
          src={PLACEHOLDER_IMG}
          alt="Steel doors and rolling shutters"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1C32] via-[#0B1C32]/90 to-[#0B1C32]/40" />
        <div className="relative mx-auto max-w-7xl px-6 py-32">
          <p className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#F2811D]">
            Welcome to RSD Industries
          </p>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Premium Steel Doors &amp; Shutters, Engineered to Last
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            From industrial rolling shutters to certified fire-rated doors,
            we design and install steel solutions built for durability,
            security, and performance.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/quote"
              className="inline-flex items-center gap-2 rounded-md bg-[#F2811D] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#d76f13] transition-colors"
            >
              Get A Quote <ArrowRight size={16} />
            </a>
            <a
              href="/products"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10 transition-colors"
            >
              Our Products
            </a>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-[#0B1C32]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 border-t border-white/10 px-6 py-10 sm:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F2811D]/15 text-[#F2811D]">
                <Icon size={22} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">{value}</p>
                <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <div className="relative">
            <img
              src={PLACEHOLDER_IMG}
              alt="RSD manufacturing facility"
              className="h-[420px] w-full rounded-2xl object-cover"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-[#0B1C32] px-6 py-5 text-white shadow-xl sm:block">
              <p className="text-3xl font-extrabold text-[#F2811D]">15+</p>
              <p className="text-xs uppercase tracking-wide text-slate-300">
                Years Experience
              </p>
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#F2811D]">
              About RSD Industries
            </p>
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Trusted Steel Manufacturing Since 2010
            </h2>
            <p className="mt-6 text-slate-600 leading-relaxed">
              We design, manufacture, and install steel doors and rolling
              shutters for industrial, commercial, and residential clients.
              Every product is engineered for durability and rigorously
              tested before it leaves our facility.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {ABOUT_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[#F2811D]" />
                  <span className="text-sm text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
            <a
              href="/about"
              className="mt-10 inline-flex items-center gap-2 rounded-md bg-[#0B1C32] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#132a49] transition-colors"
            >
              Learn More <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-[#F4F6F9] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#F2811D]">
              What We Offer
            </p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Our Products</h2>
            <p className="mt-4 text-slate-600">
              A full range of steel door and shutter systems, built to spec
              for every industry.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product) => (
              <div
                key={product.title}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={PLACEHOLDER_IMG}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C32]/80 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold">{product.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{product.desc}</p>
                  <a
                    href="/products"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-[#F2811D]"
                  >
                    View Details <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[#0B1C32] py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <div className="relative">
            <img
              src={PLACEHOLDER_IMG}
              alt="RSD team at work"
              className="h-[420px] w-full rounded-2xl object-cover opacity-80"
            />
            <button
              aria-label="Play video"
              className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F2811D] text-white"
            >
              <PlayCircle size={28} />
            </button>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#F2811D]">
              Why Choose Us
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Quality You Can Rely On
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {WHY_CHOOSE_US.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F2811D]/15 text-[#F2811D]">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#F2811D]">
              How We Work
            </p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Our Process</h2>
          </div>
          <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-slate-200 lg:block" />
            {PROCESS_STEPS.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#0B1C32] text-[#F2811D]">
                  <Icon size={24} />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#F2811D]">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 font-bold">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="bg-[#F4F6F9] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#F2811D]">
              Our Work
            </p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Recent Projects</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((title) => (
              <div key={title} className="group relative h-64 overflow-hidden rounded-2xl">
                <img
                  src={PLACEHOLDER_IMG}
                  alt={title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#0B1C32]/90 via-[#0B1C32]/10 to-transparent p-6">
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#0B1C32] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Quote size={36} className="mx-auto text-[#F2811D]" />
          <p className="mt-6 text-xl font-medium leading-relaxed text-white sm:text-2xl">
            “{TESTIMONIALS[activeTestimonial].quote}”
          </p>
          <div className="mt-6 flex items-center justify-center gap-1 text-[#F2811D]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <p className="mt-4 font-bold text-white">
            {TESTIMONIALS[activeTestimonial].name}
          </p>
          <p className="text-sm text-slate-400">
            {TESTIMONIALS[activeTestimonial].role}
          </p>
          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === activeTestimonial ? "bg-[#F2811D]" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="bg-white py-14">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6">
          {CLIENTS.map((client) => (
            <span
              key={client}
              className="text-lg font-extrabold uppercase tracking-wide text-slate-300"
            >
              {client}
            </span>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-[#F2811D]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-14 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to start your project?
            </h2>
            <p className="mt-2 text-white/90">
              Get a free, no-obligation quote from our team today.
            </p>
          </div>
          <a
            href="/quote"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#0B1C32] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#132a49] transition-colors"
          >
            Get A Quote <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}