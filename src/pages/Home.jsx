import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { title } from 'framer-motion/client';
import testimonials from '../data/testimonials';

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const videoTestimonials = [
  { src: '/videos/Testimonials/Testimonial1.mp4', poster: '/images/video-posters/testimonial1-poster.jpg' },
  { src: '/videos/Testimonials/Testimonial2.mp4', poster: '/images/video-posters/testimonial2-poster.jpg' },
  { src: '/videos/Testimonials/Testimonial3.mp4', poster: '/images/video-posters/testimonial3-poster.jpg', placeholder: true },
  { src: '/videos/Testimonials/Testimonial4.mp4', poster: '/images/video-posters/testimonial4-poster.jpg', placeholder: true },
];

const heroSlides = [

  {
    image: '/images/slides/1stSlide.jpg',
    title: ['You can afford anything.', 'So why does the result so rarely feel like it?'],
    subtitle: "The difference was never the budget. It's who holds every decision.",
    cta: 'Explore Residences →',
    route: '/projects/residential',
  },
  {
    image: '/images/slides/3rdSLide.jpeg',
    title: ['Why does the identical project next door', 'keep selling faster than yours?'],
    subtitle: "The difference buyers can't name is the difference we design.",
    cta: 'For Builders & Developers →',
    route: '/projects/builders',
  },
  {
    image: '/images/slides/2ndSlide.jpeg',
    title: ['How many vendors are you managing', 'just to open a single hotel?'],
    subtitle: 'With us, the answer is one.',
    cta: 'Explore The One →',
    route: '/projects/hospitality',
  },
]

const stats = [
  { value: '30+', label: 'Years of Experience' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '90%', label: 'Repeat & Referral' },
  { value: '6', label: 'Project Typologies' },
];

const expertise = [
  { label: 'Architecture', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', route: '/services/architecture' },
  { label: 'Interior Design', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80', route: '/services/interior-design' },
  { label: 'Turnkey Projects', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', route: '/services/turnkey-projects' },
  { label: 'PMC', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', route: '/services/pmc' },
];

const serviceTypes = [
  { label: 'Residential', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', route: '/projects/residential' },
  { label: 'Hotels & Hospitality', image: '/images/projects/2.jpg', route: '/projects/hospitality' },
  { label: 'Builders & Developers', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80', route: '/projects/builders' },
  { label: 'Retails & Shop', image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&q=80', route: '/projects/retail' },
];

const whyUsPoints = [
  { number: '01', title: '🏆 30+ Years of Proven Experience', desc: "With over three decades of industry expertise, we have successfully delivered complex residential, hospitality, commercial, and public infrastructure projects with confidence and precision." },
  { number: '02', title: '👥 Complete Team Under One Roof', desc: 'A multidisciplinary team of Architects, Civil Engineers, Electrical Engineers, MEP Consultants, 3D Visualisers, Interior Designers, and Experienced Site Engineers ensures seamless coordination and faster project delivery.' },
  { number: '03', title: '📊 500+ Successful Projects Delivered', desc: 'Our extensive portfolio of over 500 completed projects reflects our commitment to quality, timely execution, and client satisfaction across diverse sectors.' },
  { number: '04', title: '⚙️ System-Driven Project Management', desc: "We follow a technology-enabled execution process with user-friendly project management systems, pre-planned work schedules, drawing schedules, milestone tracking, and transparent progress monitoring." },
  { number: '05', title: '🌿 Expertise in Technically Challenging Projects', desc: "From artificial lakes and public gardens to large-scale landscaped developments, we possess the technical expertise to execute complex engineering and landscape projects with precision." },
  { number: '06', title: '🏨 Extensive Hospitality Experience', desc: 'Successfully delivered 700+ hotel keys, including multiple 100+ room hotel properties, giving us deep expertise in hospitality planning, design coordination, and execution.' },
]

const founders = [
  {
    role: 'Founder',
    name: 'Ramesh Singhal',
    quote: '"Design creates possibilities. Execution determines whether those possibilities become reality"',
    image: '/images/Founders/Ramesh_Singhal.jpeg',
  },
  {
    role: 'Co-Founder',
    name: 'Sonika Singhal',
    quote: '"The most meaningful spaces are not the ones people admire. They are the ones people never want to leave."',
    image: '/images/Founders/Sonika_Singhal.jpeg',
  },
];

const awards = [
  { name: 'The Pillar', image: '/images/awardsAndCertificates/Award1-trophy.png' },
  { name: 'The Horizon', image: '/images/awardsAndCertificates/Award2-trophy.png' },
  { name: 'The Keystone', image: '/images/awardsAndCertificates/Award3-trophy.png' },
];

// "As Featured In" press coverage. Each magazine has its own set of page
// scans — browsable as a spread in the lightbox. I matched these to your
// uploaded /images/press files by scan size (each magazine's pages share
// the same crop dimensions) — double check the assignment and publication
// names are correct, and there are 4 more scans (mag4, mag7, mag8, mag9)
// not yet placed anywhere; tell me which magazine(s) those belong to.
const magazines = [
  {
    publication: 'The Telegraph',
    feature: 'Home Sweet Home',
    pages: ['/images/press/maga1.jpeg', '/images/press/maga12.jpeg'],
    link: null,
  },
  {
    publication: 'Design Business Edition',
    feature: 'Design & Technology',
    pages: ['/images/press/maga21.jpeg', '/images/press/maga23.jpeg', '/images/press/maga22.jpeg'],
    link: null,
  },
];

const certificates = [
  { title: 'Century Venture Award', image: '/images/awardsAndCertificates/certificate1.jpeg' },
  { title: 'MahaVastu Certification', image: '/images/awardsAndCertificates/certificate2.jpeg' },
  { title: 'Certificate of Appreciation', image: '/images/awardsAndCertificates/certificate3.jpeg' },
  { title: 'Design Excellence', image: '/images/awardsAndCertificates/certificate4.jpeg' },
  { title: 'Best Interior Design', image: '/images/awardsAndCertificates/certificate5.jpeg' },
  { title: 'Certificate of Recognition', image: '/images/awardsAndCertificates/certificate6.jpeg' },
  { title: 'Certificate of Excellence', image: '/images/awardsAndCertificates/certificate7.jpeg' },
  { title: 'Certificate of Merit', image: '/images/awardsAndCertificates/certificate8.jpeg' },
];


const bookFeatures = [
  'Uncover the blind spots in your projects',
  'Understand what today\'s premium buyer truly desires',
  'Design, position & communicate for maximum desire',
  'Create projects that sell faster, at better value',
];

/* ═══════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════ */
function AnimatedStat({ value, label, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        textAlign: 'center',
        padding: '20px 0',
        borderRight: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <div className="stat-number">{value}</div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════ */
function SectionHeader({ label, title, subtitle, align = 'center', dark = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ textAlign: align, marginBottom: 60 }}
    >
      {label && (
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: 12,
        }}>
          {label}
        </p>
      )}
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontWeight: 800,
        fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
        color: dark ? '#ffffff' : 'var(--navy)',
        lineHeight: 1.15,
        letterSpacing: '-0.01em',
      }}
        dangerouslySetInnerHTML={title ? { __html: title } : undefined}
      />
      {subtitle && (
        <p style={{
          maxWidth: 700,
          margin: align === 'center' ? '16px auto 0' : '16px 0 0',
          color: dark ? 'rgba(255,255,255,0.6)' : 'var(--text-medium)',
          fontSize: '0.95rem',
          lineHeight: 1.7,
        }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   IMAGE CARD
   ═══════════════════════════════════════════════ */
function ImageCard({ image, label, aspectRatio = '4/3', onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      style={{
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        aspectRatio,
        cursor: 'pointer',
      }}
    >
      <img
        src={image}
        alt={label}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.7s ease',
        }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 24,
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.2rem',
        fontStyle: 'italic',
        color: '#ffffff',
        textShadow: '0 2px 10px rgba(0,0,0,0.4)',
      }}>
        {label}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   STAR RATING
   ═══════════════════════════════════════════════ */
function StarRating({ rating = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill={i < rating ? '#f5c518' : '#ccc'} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CERTIFICATE CAROUSEL
   ═══════════════════════════════════════════════ */
function CertificateCarousel() {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', marginTop: 48 }}>
      {/* Left arrow */}
      <button onClick={() => scroll(-1)} style={{
        position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)',
        zIndex: 5, width: 44, height: 44, borderRadius: '50%',
        background: '#fff', border: '1px solid rgba(0,0,0,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.2rem', color: 'var(--text-dark)', cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      }}>
        ‹
      </button>

      {/* Scrollable area */}
      <div ref={scrollRef} style={{
        display: 'flex', gap: 24, overflowX: 'auto', scrollSnapType: 'x mandatory',
        paddingBottom: 8, scrollbarWidth: 'none', msOverflowStyle: 'none',
      }}>
        <style>{`.cert-scroll::-webkit-scrollbar { display: none; }`}</style>
        {certificates.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{
              minWidth: 280, scrollSnapAlign: 'start',
              background: 'linear-gradient(135deg, #8B7355, #6B5940)',
              borderRadius: 8, padding: 16,
              boxShadow: '4px 4px 15px rgba(0,0,0,0.2)',
            }}
          >
            {/* Inner frame */}
            <div style={{
              background: '#f8f4ed', borderRadius: 4, padding: cert.image ? 8 : 20,
              aspectRatio: '4/5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid #d4c5a9', overflow: 'hidden',
            }}>
              {cert.image ? (
                <img src={cert.image} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-light)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 8 }}>🏆</div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                    {cert.title}
                  </p>
                  <p style={{ fontSize: '0.75rem', marginTop: 4, color: 'var(--text-light)' }}>
                    Ramesh Singhal Design
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Right arrow */}
      <button onClick={() => scroll(1)} style={{
        position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
        zIndex: 5, width: 44, height: 44, borderRadius: '50%',
        background: '#fff', border: '1px solid rgba(0,0,0,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.2rem', color: 'var(--text-dark)', cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      }}>
        ›
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAGAZINE CARD — fanned page preview + lightbox viewer
   ═══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════
   VIDEO TESTIMONIAL CARD — click to play/pause
   ═══════════════════════════════════════════════ */
function VideoTestimonialCard({ src, poster, placeholder, delay = 0 }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const toggle = () => {
    if (placeholder) return;
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); } else { v.play(); }
    setPlaying(!playing);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }}
      onClick={toggle}
      style={{ position: 'relative', aspectRatio: '16/10', borderRadius: 16, overflow: 'hidden', background: '#000', cursor: placeholder ? 'default' : 'pointer' }}>
      {!placeholder && (
        <video ref={videoRef} src={src} poster={poster} playsInline preload="metadata"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onEnded={() => setPlaying(false)} />
      )}
      {(!playing || placeholder) && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, background: placeholder ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.25)' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s ease', opacity: placeholder ? 0.5 : 1,
          }}>
            <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '16px solid rgba(255,255,255,0.8)', marginLeft: 3 }} />
          </div>
          {placeholder && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>Video coming soon</p>
          )}
        </div>
      )}
    </motion.div>
  );
}

function MagazineCard({ magazine, delay = 0 }) {
  const [open, setOpen] = useState(false);
  const [pageIdx, setPageIdx] = useState(0);
  const pageCount = magazine.pages.length;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }}
        onClick={() => { setPageIdx(0); setOpen(true); }}
        style={{ cursor: 'pointer', textAlign: 'center' }}
      >
        {/* Fanned page stack */}
        <div style={{ position: 'relative', aspectRatio: '3/4', margin: '0 auto 20px', maxWidth: 290 }}>
          {magazine.pages.map((page, i) => {
            const offset = i - (pageCount - 1) / 2;
            return (
              <div key={i} style={{
                position: 'absolute', inset: 0,
                transform: `rotate(${offset * 6}deg) translateX(${offset * 14}px)`,
                borderRadius: 8, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                border: '4px solid #fff', background: '#fff',
                zIndex: i,
              }}>
                <img src={page} alt={`${magazine.publication} page ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            );
          })}
        </div>
        <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1rem', color: 'var(--text-dark)', marginBottom: 4 }}>{magazine.publication}</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: 4 }}>{magazine.feature}</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>
          {pageCount} {pageCount === 1 ? 'Page' : 'Pages'} — View Spread
        </p>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(20,20,20,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          >
            <button onClick={() => setOpen(false)} aria-label="Close"
              style={{ position: 'absolute', top: 24, right: 24, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1.1rem', cursor: 'pointer' }}>
              &#10005;
            </button>

            <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: 560, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.img
                key={pageIdx}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                src={magazine.pages[pageIdx]} alt={`${magazine.publication} page ${pageIdx + 1}`}
                style={{ maxWidth: '100%', maxHeight: '78vh', borderRadius: 6, boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}
              />

              {pageCount > 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 20 }}>
                  <button onClick={() => setPageIdx(p => (p - 1 + pageCount) % pageCount)} aria-label="Previous page"
                    style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1.1rem', cursor: 'pointer' }}>
                    ‹
                  </button>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                    Page {pageIdx + 1} of {pageCount}
                  </p>
                  <button onClick={() => setPageIdx(p => (p + 1) % pageCount)} aria-label="Next page"
                    style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: '1.1rem', cursor: 'pointer' }}>
                    ›
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════ */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); alert('Thank you! We will get back to you soon.'); };

  const inputStyle = {
    width: '100%', padding: '14px 0', border: 'none',
    borderBottom: '1px solid rgba(0,0,0,0.12)', background: 'transparent',
    fontSize: '0.95rem', color: 'var(--text-dark)', outline: 'none',
    fontFamily: 'Inter, sans-serif', transition: 'border-color 0.3s ease',
  };
  const labelStyle = {
    fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 500,
    display: 'block', marginBottom: 4,
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <label style={labelStyle}>Name</label>
        <input name="name" value={form.name} onChange={handleChange} style={inputStyle}
          onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderBottomColor = 'rgba(0,0,0,0.12)'} />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle}
          onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderBottomColor = 'rgba(0,0,0,0.12)'} />
      </div>
      <div>
        <label style={labelStyle}>Phone</label>
        <input name="phone" type="tel" value={form.phone} onChange={handleChange} style={inputStyle}
          onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderBottomColor = 'rgba(0,0,0,0.12)'} />
      </div>
      <div>
        <label style={labelStyle}>Service Required</label>
        <input name="service" value={form.service} onChange={handleChange} style={inputStyle}
          onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderBottomColor = 'rgba(0,0,0,0.12)'} />
      </div>
      <div>
        <label style={labelStyle}>Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={4}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Inter, sans-serif' }}
          onFocus={e => e.target.style.borderBottomColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderBottomColor = 'rgba(0,0,0,0.12)'} />
      </div>
      <button type="submit" style={{
        padding: '16px 48px', background: 'var(--gold)',
        color: '#fff', border: 'none', borderRadius: 8,
        fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
        letterSpacing: '0.05em', transition: 'all 0.3s ease',
        alignSelf: 'flex-start',
      }}
        onMouseEnter={e => { e.target.style.background = '#9a7a30'; e.target.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.target.style.background = 'var(--gold)'; e.target.style.transform = 'translateY(0)'; }}
      >
        Submit
      </button>
    </form>
  );
}

/* ═══════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [heroIdx, setHeroIdx] = useState(0);
  const [showreelMuted, setShowreelMuted] = useState(true);
  const showreelRef = useRef(null);

  useEffect(() => {
    // 1. Explicit anchor passed via router state — used when navigating
    //    here from the Navbar or an in-page "Back to..." link.
    const target = location.state?.scrollTo;
    if (target) {
      const el = document.getElementById(target);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
      window.history.replaceState({}, document.title);
      return;
    }
    // 2. Browser back/forward button (POP navigation) carries no state,
    //    so fall back to whichever section was recorded right before
    //    the user left the page (e.g. clicking an Our Expertise or
    //    Our Projects card).
    const remembered = sessionStorage.getItem('homeScrollAnchor');
    if (remembered) {
      const el = document.getElementById(remembered);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
      sessionStorage.removeItem('homeScrollAnchor');
    }
  }, [location.state]);

  useEffect(() => {
    const id = setInterval(() => setHeroIdx(i => (i + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      {/* ═══════════════ HERO ═══════════════ */}
      <section id="hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIdx}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: 1, scale: 1,
              transition: { opacity: { duration: 1 }, scale: { duration: 10, ease: 'linear' } },
            }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <img src={heroSlides[heroIdx].image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)',
            }} />
          </motion.div>
        </AnimatePresence>

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 8%', zIndex: 10, maxWidth: 800, transform: 'translateY(8vh)',
        }}>
          <AnimatePresence mode="wait">
            <motion.h1
              key={heroIdx}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                fontWeight: 500, color: '#ffffff', lineHeight: 1.2,
                whiteSpace: 'pre-line', letterSpacing: '-0.02em', maxWidth: 780,
              }}
            >
              {heroSlides[heroIdx].title.join('\n')}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${heroIdx}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                marginTop: 24, color: 'rgba(255,255,255,0.75)',
                fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 480, whiteSpace: 'pre-line',
              }}
            >
              {heroSlides[heroIdx].subtitle}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ marginTop: 40 }}
          >
            <Link to={heroSlides[heroIdx].route || '/'} className="hero-btn" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', background: 'transparent', color: '#ffffff',
              border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 50,
              fontSize: '0.9rem', fontWeight: 500, transition: 'all 0.3s ease',
            }}>
              {heroSlides[heroIdx].cta || 'View Projects →'}
            </Link>
          </motion.div>
        </div>

        <div style={{ position: 'absolute', bottom: 40, left: '8%', zIndex: 10, display: 'flex', gap: 8 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)} style={{
              width: i === heroIdx ? 32 : 12, height: 4, borderRadius: 2,
              background: i === heroIdx ? '#ffffff' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.4s ease', border: 'none', cursor: 'pointer',
            }} />
          ))}
        </div>
      </section>

      {/* ═══════════════ ABOUT SNIPPET ═══════════════ */}
      <section id="about" style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: 20 }}>
            Est. 1995 — Siliguri, India
          </motion.p>

          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, fontStyle: 'italic', color: 'var(--text-dark)', lineHeight: 1.15, maxWidth: 700, margin: '0 auto' }}>
            30+ years of turning Space into Legacy
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            style={{ maxWidth: 680, margin: '32px auto 0', color: 'var(--text-medium)', fontSize: '0.95rem', lineHeight: 1.8 }}>
            <p>Since 1995, Raamesh Singhal Design has been creating spaces where design, functionality, and human experience come together. Built on the belief that exceptional spaces require a unified vision, we seamlessly integrate architecture, interiors, planning, procurement, and execution under one roof.</p>
            <p style={{ marginTop: 16 }}>From our studio in Siliguri, we have delivered luxury residences, hospitality spaces, and large-scale developments across Siliguri, Sikkim, Assam, Nepal, and Bhutan. Every project is guided by a single commitment: one vision, one standard, and complete ownership from concept to completion.</p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginTop: 64, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
            {stats.map((s, i) => (
              <AnimatedStat key={i} value={s.value} label={s.label} delay={i * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SHOWREEL VIDEO ═══════════════ */}
      <section style={{ background: 'var(--cream-dark)', padding: '80px 0 var(--section-padding)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.15)', aspectRatio: '16/9', height: 'min(68vh, 620px)', maxWidth: '100%', background: '#000' }}>
            <video ref={showreelRef} src="/videos/OfficeVideo.mp4" poster="/images/video-posters/office-poster.jpg" autoPlay muted={showreelMuted} loop playsInline preload="auto"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <button
              onClick={() => setShowreelMuted(m => !m)}
              aria-label={showreelMuted ? 'Unmute video' : 'Mute video'}
              style={{ position: 'absolute', bottom: 20, right: 20, width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', border: '1.5px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
              {showreelMuted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M11 5 6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" /></svg>
              )}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FOUNDERS ═══════════════ */}
      <section style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.15, maxWidth: 600, margin: '0 auto' }}>
            The thinking behind every space <em style={{ fontStyle: 'italic', fontWeight: 600 }}>we create</em>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ maxWidth: 650, margin: '24px auto 0', color: 'var(--text-medium)', fontSize: '0.95rem', lineHeight: 1.8 }}>
            Exceptional spaces are never the result of design alone. They emerge when vision, functionality, human behaviour, and execution work in complete harmony. That belief has guided Raamesh Singhal Design since its inception.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, marginTop: 64, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            {founders.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                style={{ background: '#f0e8d8', borderRadius: 16, overflow: 'hidden', textAlign: 'left' }}>
                <div style={{ aspectRatio: '1/1', background: 'linear-gradient(135deg, #d5cec0, #c8bfad)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {f.image ? (
                    <img src={f.image} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                  ) : (
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5">
                      <circle cx="12" cy="8" r="4" /><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  )}
                </div>
                <div style={{ padding: '28px 28px 32px' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: 4 }}>{f.role}</p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 16 }}>{f.name}</h3>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: 'var(--gold)', lineHeight: 0.5, marginBottom: 12, opacity: 0.6 }}>❝</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-medium)', lineHeight: 1.6, fontStyle: 'italic' }}>{f.quote}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ AWARDS & CERTIFICATES ═══════════════ */}
      <section id="awards-news" style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            {/* Left: Text */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-dark)', marginBottom: 8, lineHeight: 1.2 }}>
                Awards & Certificates
              </h2>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.1, marginBottom: 24 }}>
                Being trusted twice<br />is the real award.
              </h3>
              <p style={{ color: 'var(--text-medium)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 440 }}>
                Our work has been honoured by some of the most respected names in design and industry. But the recognition we value most isn't on a shelf — it's the client who hands us their next project before the first is even finished.
              </p>
            </motion.div>

            {/* Right: Trophy images */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'flex-end' }}>
              {awards.map((award, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ width: 110 + (i === 1 ? 24 : 0), height: 170 + (i === 1 ? 30 : 0), display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <img src={award.image} alt={award.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 12px 14px rgba(0,0,0,0.18))' }} />
                  </div>
                  <div style={{ width: 60 + (i === 1 ? 14 : 0), height: 8, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,0.22) 0%, transparent 75%)', margin: '4px auto 0' }} />
                  <p style={{ marginTop: 10, fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dark)', fontFamily: "'Playfair Display', serif" }}>
                    {award.name}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Certificate Carousel */}
          <CertificateCarousel />
        </div>
      </section>

      {/* ═══════════════ MAGAZINE ═══════════════ */}
      <section style={{ background: 'var(--cream-light)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <SectionHeader title="AS FEATURED IN" subtitle="Our work and philosophy, covered by design and industry press." />
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${magazines.length}, minmax(260px, 1fr))`, gap: 40, maxWidth: 1100, margin: '0 auto' }}>
            {magazines.map((mag, i) => (
              <MagazineCard key={i} magazine={mag} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ BOOK SECTION ═══════════════ */}
      <section style={{ background: 'var(--cream-light)', padding: 'var(--section-padding) 0', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 60, alignItems: 'center' }}>
            {/* Left: Book cover */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <img src="/images/book/book_image.png" alt="Why Luxury Homes Don't Sell — book by Ramesh Singhal"
                style={{ width: 320, maxHeight: 460, objectFit: 'contain', filter: 'drop-shadow(20px 20px 40px rgba(0,0,0,0.22))', transform: 'perspective(800px) rotateY(-5deg)' }} />
            </motion.div>

            {/* Right: Book info */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {/* Gold banner */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 16,
                background: 'linear-gradient(135deg, var(--gold), #9a7a30)',
                padding: '16px 32px', borderRadius: 8, marginBottom: 32,
                color: '#fff',
              }}>
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 400, opacity: 0.9 }}>The Book by</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700 }}>Ramesh Singhal</p>
                </div>
                <div style={{ width: 50, height: 50, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                  <img src="/images/Founders/Ramesh_Singhal.jpeg" alt="Ramesh Singhal" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                </div>
              </div>

              {/* Quote & description */}
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: 'var(--gold)', lineHeight: 0.5, marginBottom: 16, opacity: 0.4 }}>❝</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontStyle: 'italic', fontWeight: 400, color: 'var(--text-dark)', marginBottom: 8, lineHeight: 1.3 }}>
                Why Luxury Homes Don't Sell:
              </h3>
              <p style={{ fontWeight: 600, color: 'var(--text-dark)', marginBottom: 20 }}>The Blind Spot Costing Developers Crores</p>
              <p style={{ color: 'var(--text-medium)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 28 }}>
                It's not the market. It's the misunderstanding. Drawing on three decades of building luxury spaces, Raamesh Singhal uncovers the blind spots costing developers crores — and lays out what it actually takes to design projects that sell faster, at better value.
              </p>

              {/* Features grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 32px', marginBottom: 32 }}>
                {bookFeatures.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-medium)', lineHeight: 1.5 }}>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Buy Now */}
              <Link to="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', background: 'var(--gold)',
                color: '#fff', borderRadius: 50, fontSize: '0.9rem',
                fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.target.style.background = '#9a7a30'; e.target.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.target.style.background = 'var(--gold)'; e.target.style.transform = 'translateY(0)'; }}
              >
                BUY NOW →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section id="testimonials" style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <SectionHeader
            label="CLIENT'S TESTIMONIALS"
            title='HEARD FROM THOSE WHO <em style="font-weight:400">LIVED OUR WORK</em>'
          />

          {/* Text testimonial cards — auto-scrolling marquee, pauses on hover */}
          <div className="testimonial-marquee" style={{ overflow: 'hidden', marginBottom: 60 }}>
            <div className="testimonial-marquee-track" style={{ display: 'flex', gap: 18, width: 'max-content' }}>
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  style={{
                    background: 'linear-gradient(135deg, #c9a84c, #b8953f)',
                    borderRadius: 14, padding: '20px 18px',
                    color: '#fff', position: 'relative',
                    flex: '0 0 240px',
                  }}
                >
                  {/* Client photo + stars row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 7,
                    background: 'rgba(0,0,0,0.2)', flexShrink: 0,
                  }} />
                  <StarRating />
                </div>
                <p style={{ fontSize: '0.78rem', lineHeight: 1.6, marginBottom: 12, opacity: 0.95 }}>{t.text}</p>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, textAlign: 'right' }}>-{t.name}</p>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            .testimonial-marquee-track {
              animation: testimonialScroll 45s linear infinite;
            }
            .testimonial-marquee:hover .testimonial-marquee-track {
              animation-play-state: paused;
            }
            @keyframes testimonialScroll {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}</style>

          {/* Divider */}
          <div style={{ width: '50%', height: 1, background: 'rgba(0,0,0,0.08)', margin: '0 auto 60px' }} />

          {/* Video testimonials */}
          <div className="video-testimonial-scroll" style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 8 }}>
            {videoTestimonials.map((v, i) => (
              <div key={i} style={{ flex: '0 0 320px' }}>
                <VideoTestimonialCard src={v.src} poster={v.poster} placeholder={v.placeholder} delay={i * 0.15} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ OUR EXPERTISE ═══════════════ */}
      <section id="services" style={{ background: 'var(--cream-light)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <SectionHeader title="OUR EXPERTISE" subtitle="Architecture, interior design and full turnkey execution, held under one accountable team. The vision and the delivery never separate, so nothing falls through the gaps between firms." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {expertise.map((item, i) => (
              <ImageCard key={i} image={item.image} label={item.label} aspectRatio="3/4" onClick={() => { sessionStorage.setItem('homeScrollAnchor', 'services'); navigate(item.route); }} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TYPES OF SERVICES ═══════════════ */}
      <section id="projects" style={{ background: 'var(--cream)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <SectionHeader title="OUR PROJECTS" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {serviceTypes.map((item, i) => (
              <ImageCard key={i} image={item.image} label={item.label} aspectRatio="16/10" onClick={() => { sessionStorage.setItem('homeScrollAnchor', 'projects'); navigate(item.route); }} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY US ═══════════════ */}
      <section style={{ background: 'var(--cream-light)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'flex-start' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.1, marginBottom: 20 }}>WHY US?</h2>
              <p style={{ color: 'var(--text-medium)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 380 }}>
                We bring together design thinking, construction expertise, and a deep understanding of how people actually live in spaces — all under one accountable team.
              </p>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {whyUsPoints.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 20, alignItems: 'flex-start', paddingBottom: i < whyUsPoints.length - 1 ? 40 : 0, borderBottom: i < whyUsPoints.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <div className="why-us-number">{p.number}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 8 }}>{p.title}</h3>
                    <p style={{ color: 'var(--text-medium)', fontSize: '0.9rem', lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT ═══════════════ */}
      <section id="contact" style={{ background: 'var(--cream-light)', padding: 'var(--section-padding) 0' }}>
        <div className="container">
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1, letterSpacing: '-0.02em' }}>
              CONTACT
            </motion.h2>
            <motion.p initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--text-medium)', textAlign: 'right', lineHeight: 1.4 }}>
              Lets discuss your next<br />Project together
            </motion.p>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', marginBottom: 48 }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
            {/* Left: Contact info + Map */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { label: 'Phone', value: '+91 82508 41773 / +91 98008 48155' },
                  { label: 'Email', value: 'rameshsinghaldesign@gmail.com' },
                  { label: 'Location', value: 'Time Square, 3rd Floor,\nOpp Ravi Auto, Sevoke Road, Siliguri' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '100px 1fr',
                    gap: 24, padding: '20px 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.9rem' }}>{item.label}</span>
                    <span style={{ color: 'var(--text-medium)', fontSize: '0.9rem', whiteSpace: 'pre-line', textAlign: 'right' }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div style={{ marginTop: 32, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
                <iframe
                  title="Location"
                  src="https://maps.google.com/maps?q=Time+Square+Sevoke+Road+Siliguri&t=m&z=16&output=embed&iwloc=near"
                  style={{ width: '100%', height: 220, border: 0, filter: 'grayscale(0.3)' }}
                  loading="lazy"
                />
                <a href="https://maps.google.com/?q=Time+Square+Sevoke+Road+Siliguri" target="_blank" rel="noreferrer"
                  style={{ display: 'block', padding: '10px 16px', fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 500 }}>
                  Open in Map ↗
                </a>
              </div>
            </motion.div>

            {/* Right: Contact form */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section style={{
        background: 'var(--navy)', padding: '100px 0', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 400, height: 1, background: 'linear-gradient(90deg, transparent, rgba(184,149,63,0.4), transparent)' }} />
        <div className="container">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, fontStyle: 'italic', color: '#ffffff', marginBottom: 16 }}>
            Ready to start your project?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', marginBottom: 36, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            Let's collaborate to create something extraordinary. Get in touch with our team today.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Link to="/contact" className="btn-gold">Get a Quote →</Link>
          </motion.div>
        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        .hero-btn:hover { background: #fff !important; color: #1c2a3a !important; border-color: #fff !important; }
        @media (max-width: 768px) {
          section > .container > div[style*="grid-template-columns: 1fr 1fr"],
          section > .container > div[style*="grid-template-columns: 0.9fr"],
          section > .container > div[style*="grid-template-columns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          section > .container > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          section > .container > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}