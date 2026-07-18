import { useState } from "react";
import {
  Play,
  ArrowRight,
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  MapPin,
  ExternalLink,
} from "lucide-react";

/**
 * Raamesh Singhal Design — Home
 * Sections follow the supplied PDF top to bottom:
 * Hero -> Legacy intro -> Stats -> Video -> Philosophy -> Founders
 * -> Our Expertise -> Types of Services -> Why Us -> Awards & Certificates
 * -> Book promo -> Testimonials -> Contact
 *
 * Render inside: <Navbar /> <Home /> <Footer />  (Navbar is fixed/overlaid, so
 * this page intentionally starts full-bleed behind it.)
 *
 * All copy, images and the two founder photos are placeholders — swap them
 * for real content when you have it. PLACEHOLDER_IMG can be replaced with
 * real asset paths per section.
 */

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop";

const STATS = [
  { value: "30+", label: "Years of Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "90%", label: "Repeat & Referral" },
  { value: "6", label: "Project Typologies" },
];

const FOUNDERS = [
  {
    role: "Founder",
    name: "Ramesh Singhal",
    quote: "Design creates possibilities. Execution determines whether those possibilities become reality.",
  },
  {
    role: "Co-Founder",
    name: "Sonika Singhal",
    quote: "The most meaningful spaces are not the ones people admire. They are the ones people never want to leave.",
  },
];

const EXPERTISE = ["Architecture", "Interior Design", "Trunkey Projects", "PMC"];

const SERVICE_TYPES = [
  "Residential",
  "Hotels & Hospitality",
  "Builders & Developers",
  "Retails & Shop",
];

const WHY_US_POINTS = [
  { n: "01", title: "Point 1" },
  { n: "02", title: "Point 2" },
  { n: "03", title: "Point 3" },
  { n: "04", title: "Point 4" },
  { n: "05", title: "Point 5" },
  { n: "06", title: "Point 6" },
];

const BOOK_CHECKLIST = [
  "Uncover the blind spots in your projects",
  "Understand what today's premium buyer truly desires",
  "Design, position & communicate for maximum desire",
  "Create projects that sell faster, at better value",
];

const TESTIMONIALS = [
  {
    quote:
      "They took the time to understand my preferences before developing a design strategy. The result was a cohesive and stylish look I could never have achieved on my own. I am so glad I gave them a chance.",
    name: "-Mr. Client",
  },
  {
    quote:
      "They took the time to understand my preferences before developing a design strategy. The result was a cohesive and stylish look I could never have achieved on my own. I am so glad I gave them a chance.",
    name: "-Mr. Client",
  },
  {
    quote:
      "They took the time to understand my preferences before developing a design strategy. The result was a cohesive and stylish look I could never have achieved on my own. I am so glad I gave them a chance.",
    name: "-Mr. Client",
  },
];

export default function Home() {
  const [certIndex, setCertIndex] = useState(0);

  return (
    <main className="bg-white font-sans text-[#1E2A38]">
      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[#1B2A38]">
        <img
          src={PLACEHOLDER_IMG}
          alt="Interior design showcase"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1D28]/90 via-[#16232E]/60 to-[#16232E]/20" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pt-24 lg:px-10">
          <h1 className="max-w-xl font-[Poppins,sans-serif] text-5xl font-light leading-[1.15] text-white sm:text-6xl">
            Where Imagination
            <br />
            Meets Interior
            <br />
            Design
          </h1>
          <p className="mt-6 max-w-md text-slate-200">
            A single studio, holding the vision from first sketch to final
            handover, so your legacy is left to no one's chance but ours.
          </p>
          <a
            href="/projects"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/70 px-7 py-3.5 text-sm text-white hover:bg-white hover:text-[#16232E] transition-colors"
          >
            View Projects <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* LEGACY INTRO */}
      <section className="bg-[#FAF8F0] py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Est. 1995 — Siliguri, India
          </p>
          <h2 className="mt-6 font-serif text-4xl text-[#1E2A38] sm:text-5xl">
            30+ years of turning Space into Legacy
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-slate-300" />
          <p className="mt-8 leading-relaxed text-slate-600">
            Since 1995, Raamesh Singhal Design has been creating spaces
            where design, functionality, and human experience come
            together. Built on the belief that exceptional spaces require a
            unified vision, we seamlessly integrate architecture, interiors,
            planning, procurement, and execution under one roof.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            From our studio in Siliguri, we have delivered luxury
            residences, hospitality spaces, and large-scale developments
            across Siliguri, Sikkim, Assam, Nepal, and Bhutan. Every project
            is guided by a single commitment: one vision, one standard, and
            complete ownership from concept to completion.
          </p>
        </div>

        {/* STATS */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-10 px-6 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-5xl text-[#B0895A]">{stat.value}</p>
              <p className="mt-2 text-sm italic text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* VIDEO */}
        <div className="mx-auto mt-16 max-w-3xl px-6">
          <button
            aria-label="Play studio video"
            className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-sm bg-[#0B0B0B]"
          >
            <img
              src={PLACEHOLDER_IMG}
              alt="Studio showreel"
              className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity group-hover:opacity-40"
            />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-white text-white">
              <Play size={22} fill="white" />
            </span>
          </button>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-extrabold leading-tight text-[#1E2A38] sm:text-5xl">
            The thinking behind every
            <br />
            space <span className="font-serif italic font-normal">we create</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-slate-600">
            Exceptional spaces are never the result of design alone. They
            emerge when vision, functionality, human behaviour, and
            execution work in complete harmony. That belief has guided
            Raamesh Singhal Design since its inception.
          </p>
        </div>

        {/* FOUNDERS */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 px-6 sm:grid-cols-2">
          {FOUNDERS.map((founder) => (
            <div key={founder.name} className="relative bg-[#F5DCAE] p-8 pt-0">
              <div className="mb-6 h-56 w-40 bg-[#D7DEE3]" />
              <Quote className="absolute right-8 top-8 text-white" size={40} fill="white" />
              <p className="text-sm text-slate-700">{founder.role}</p>
              <p className="text-xl font-bold text-[#1E2A38]">{founder.name}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                "{founder.quote}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR EXPERTISE */}
      <section className="bg-[#FAF8F0] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="bg-gradient-to-b from-slate-400 via-slate-600 to-slate-800 bg-clip-text text-4xl font-extrabold uppercase tracking-wide text-transparent sm:text-5xl">
            Our Expertise
          </h2>
          <p className="mt-6 leading-relaxed text-slate-600">
            Architecture, interior design and full turnkey execution, held
            under one accountable team. The vision and the delivery never
            separate, so nothing falls through the gaps between firms.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-1 px-6 lg:grid-cols-4">
          {EXPERTISE.map((label) => (
            <div key={label} className="group relative h-72 overflow-hidden">
              <img
                src={PLACEHOLDER_IMG}
                alt={label}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/90 via-[#0B0F14]/10 to-transparent" />
              <p className="absolute bottom-5 left-5 font-serif text-xl text-white">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TYPES OF SERVICES */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="bg-gradient-to-b from-slate-400 via-slate-600 to-slate-800 bg-clip-text text-4xl font-extrabold uppercase tracking-wide text-transparent sm:text-5xl">
            Types of Services
          </h2>
        </div>
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 px-6 sm:grid-cols-2">
          {SERVICE_TYPES.map((label) => (
            <div key={label} className="group relative h-56 overflow-hidden">
              <img
                src={PLACEHOLDER_IMG}
                alt={label}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/90 via-[#0B0F14]/10 to-transparent" />
              <p className="absolute bottom-5 left-5 font-serif text-xl text-white">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* WHY US */}
        <div className="mx-auto mt-28 grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_auto_1.4fr]">
          <div>
            <h2 className="text-4xl font-extrabold text-[#1E2A38]">WHY US?</h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et
            </p>
          </div>
          <div className="hidden items-start justify-center pt-2 lg:flex">
            <ChevronRight className="text-[#1E2A38]" size={22} />
          </div>
          <div className="space-y-10 border-l border-slate-200 pl-8">
            {WHY_US_POINTS.map((point) => (
              <div key={point.n} className="flex items-start gap-6">
                <div>
                  <p className="font-serif text-3xl text-[#B0895A]">{point.n}</p>
                  <p className="text-xl font-bold text-[#1E2A38]">{point.title}</p>
                </div>
                <p className="mt-2 max-w-xs text-sm text-slate-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS & CERTIFICATES */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <h2 className="font-serif text-4xl text-[#1E2A38]">
                Awards &amp; Certificates
              </h2>
              <p className="mt-3 text-2xl font-bold text-[#1E2A38]">
                Being trusted twice
                <br />
                is the real award.
              </p>
              <p className="mt-6 max-w-md leading-relaxed text-slate-600">
                Our work has been honoured by some of the most respected
                names in design and industry. But the recognition we value
                most isn't on a shelf — it's the client who hands us their
                next project before the first is even finished.
              </p>
            </div>
            <div className="h-64 bg-[#F5DCAE] lg:h-80" />
          </div>

          {/* Certificate carousel */}
          <div className="mt-16 flex items-center gap-4">
            <button
              onClick={() => setCertIndex((i) => Math.max(0, i - 1))}
              aria-label="Previous certificate"
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-500 hover:border-[#B0895A] hover:text-[#B0895A] sm:flex"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="grid flex-1 grid-cols-2 gap-6 overflow-hidden sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-[3/4] items-center justify-center border-8 border-[#3B2A1A] bg-[#FAF8F0] p-3 text-center text-xs text-slate-400"
                >
                  Certificate {certIndex + i + 1}
                </div>
              ))}
            </div>
            <button
              onClick={() => setCertIndex((i) => i + 1)}
              aria-label="Next certificate"
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-500 hover:border-[#B0895A] hover:text-[#B0895A] sm:flex"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* BOOK PROMO */}
      <section className="bg-[#FAF8F0] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-0 overflow-hidden rounded-sm shadow-lg lg:grid-cols-[0.9fr_1.6fr]">
            <div className="flex items-center justify-center bg-white p-10">
              <div className="flex aspect-[3/4] w-full max-w-[220px] flex-col justify-between border border-slate-200 bg-white p-4 shadow-xl">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">
                    It's not the market.
                    <br />
                    It's the misunderstanding.
                  </p>
                  <h3 className="mt-4 text-2xl font-bold leading-tight text-[#1E2A38]">
                    Why Luxury Homes Don't Sell:
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    The Blind Spot Costing Developers Crores
                  </p>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Ramesh Singhal
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 bg-[#B0895A] px-8 py-6">
                <div>
                  <p className="text-white/80">The Book by</p>
                  <p className="text-2xl font-bold text-white">Ramesh Singhal</p>
                </div>
                <div className="ml-auto h-14 w-14 rounded-full bg-white/30" />
              </div>
              <div className="bg-white px-8 py-8">
                <Quote className="text-[#B0895A]" size={28} />
                <h4 className="mt-2 font-serif text-2xl text-[#1E2A38]">
                  Why Luxury Homes Don't Sell:
                </h4>
                <p className="mt-1 font-semibold text-slate-700">
                  The Blind Spot Costing Developers Crores
                </p>
                <p className="mt-4 leading-relaxed text-slate-600">
                  It's not the market. It's the misunderstanding. Drawing on
                  three decades of building luxury spaces, Ramesh Singhal
                  uncovers the blind spots costing developers crores — and
                  lays out what it actually takes to design projects that
                  sell faster, at better value.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {BOOK_CHECKLIST.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-[#B0895A]" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="/book"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#B0895A] px-7 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#9c7a4e] transition-colors"
                >
                  Buy Now <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Client's Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-bold text-[#1E2A38] sm:text-4xl">
            Heard from those who{" "}
            <span className="font-serif italic font-normal">lived our work</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 flex max-w-6xl gap-6 overflow-x-auto px-6 pb-2">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="flex w-80 shrink-0 gap-4 bg-[#B0895A] p-5 text-white"
            >
              <div className="h-16 w-16 shrink-0 bg-black/30" />
              <div>
                <div className="flex gap-0.5 text-yellow-300">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/90">
                  {t.quote}
                </p>
                <p className="mt-2 text-right text-xs font-semibold">{t.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl border-t border-slate-200 px-6 pt-14">
          <div className="grid gap-6 sm:grid-cols-2">
            {[0, 1].map((i) => (
              <button
                key={i}
                aria-label="Play testimonial video"
                className="group relative flex aspect-video items-center justify-center overflow-hidden bg-[#0B0B0B]"
              >
                <img
                  src={PLACEHOLDER_IMG}
                  alt="Video testimonial"
                  className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-white text-white">
                  <Play size={18} fill="white" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-[#FAF8F0] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-10 sm:flex-row sm:items-end">
            <h2 className="text-6xl font-extrabold text-[#1E2A38]">CONTACT</h2>
            <p className="text-lg text-slate-600">
              Lets discuss your next
              <br />
              Project together
            </p>
          </div>

          <div className="mt-14 grid gap-14 lg:grid-cols-2">
            {/* Left: info + map */}
            <div>
              <div className="space-y-6 divide-y divide-slate-200">
                <div className="flex justify-between pb-6">
                  <p className="font-semibold text-[#1E2A38]">Phone</p>
                  <p className="text-slate-600">+91 82508 41773 / +91 98008 48155</p>
                </div>
                <div className="flex justify-between py-6">
                  <p className="font-semibold text-[#1E2A38]">Email</p>
                  <p className="text-slate-600">rameshsinghaldesign@gmail.com</p>
                </div>
                <div className="flex justify-between py-6">
                  <p className="font-semibold text-[#1E2A38]">Location</p>
                  <p className="text-right text-slate-600">
                    Time Square, 3rd Floor,
                    <br />
                    Opp Ravi Auto, Sevoke Road, Siliguri
                  </p>
                </div>
              </div>

              <div className="relative mt-8 flex h-72 items-center justify-center overflow-hidden rounded-2xl bg-slate-200">
                <img
                  src={PLACEHOLDER_IMG}
                  alt="Studio location map"
                  className="h-full w-full object-cover opacity-70"
                />
                <a
                  href="https://maps.google.com"
                  className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1E2A38] shadow"
                >
                  Open in Map <ExternalLink size={12} />
                </a>
                <MapPin
                  size={30}
                  className="absolute text-[#B0895A] drop-shadow"
                  fill="currentColor"
                />
              </div>
            </div>

            {/* Right: form */}
            <form className="space-y-5 rounded-2xl bg-white p-8 shadow-sm">
              {[
                { label: "Name", type: "text" },
                { label: "Email", type: "email" },
                { label: "Phone", type: "tel" },
                { label: "Service Required", type: "text" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="mb-2 block text-sm text-slate-600">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    className="w-full rounded-md bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#B0895A]"
                  />
                </div>
              ))}
              <div>
                <label className="mb-2 block text-sm text-slate-600">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-md bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#B0895A]"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-[#B0895A] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#9c7a4e] transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}