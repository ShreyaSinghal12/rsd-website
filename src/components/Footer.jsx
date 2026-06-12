import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Home',         to: '/' },
  { label: 'About Us',     to: '/about' },
  { label: 'Services',     to: '/#services' },
  { label: 'Projects',     to: '/projects' },
  { label: 'Contact Us',   to: '/contact' },
  { label: 'Testimonials', to: '/#testimonials' },
]

export default function Footer() {
  return (
    <footer className="bg-[#111110] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/[0.07]">

          {/* Brand */}
          <div>
            <img
              src="http://raameshsinghaldesign.com/wp-content/uploads/2023/01/cropped-cropped-rsd-logo-1-1-203x110.png"
              alt="Raamesh Singhal Design"
              className="h-14 w-auto mb-4"
            />
            <p className="text-sm text-sage leading-relaxed max-w-xs">
              An architecture and interior design practice crafting spaces that are
              as functional as they are beautiful. Based in Siliguri since 1995.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              <a href="https://www.facebook.com/raameshsinghaldesign"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 flex items-center justify-center
                  text-sage hover:border-gold hover:text-gold transition-all duration-300 text-xs font-mono">
                Fb
              </a>
              <a href="https://www.instagram.com/raameshsinghaldesign"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 flex items-center justify-center
                  text-sage hover:border-gold hover:text-gold transition-all duration-300 text-xs font-mono">
                Ig
              </a>
              <a href="https://api.whatsapp.com/send?phone=919800848155"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 flex items-center justify-center
                  text-sage hover:border-gold hover:text-gold transition-all duration-300 text-xs font-mono">
                Wa
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-gold mb-5">
              Quick Links
            </p>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-sage hover:text-stone transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.18em] uppercase text-gold mb-5">
              Contact Info
            </p>
            <div className="flex flex-col gap-4 text-sm text-sage">
              <div>
                <p className="font-mono text-[0.6rem] tracking-widest text-gold/70 mb-1 uppercase">Address</p>
                <p>Time Square, 3rd Floor, Opp Ravi Auto,<br />Sevoke Road, Siliguri</p>
              </div>
              <div>
                <p className="font-mono text-[0.6rem] tracking-widest text-gold/70 mb-1 uppercase">Phone</p>
                <a href="tel:+919800848155" className="hover:text-stone transition-colors">+91 98008 48155</a>
              </div>
              <div>
                <p className="font-mono text-[0.6rem] tracking-widest text-gold/70 mb-1 uppercase">Email</p>
                <a href="mailto:rameshsinghaldesign@gmail.com" className="hover:text-stone transition-colors">
                  rameshsinghaldesign@gmail.com
                </a>
              </div>
              <div>
                <p className="font-mono text-[0.6rem] tracking-widest text-gold/70 mb-1 uppercase">Hours</p>
                <p>Mon–Fri: 9:00 – 22:00</p>
                <p>Saturday: 11:00 – 20:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-stone">
            &copy; 2024 Raamesh Singhal Design by Ramesh Singhal. All Rights Reserved.
          </p>
          <p className="text-xs text-stone font-mono tracking-widest uppercase">
            Est. 1995 &mdash; Siliguri, India
          </p>
        </div>

      </div>
    </footer>
  )
}