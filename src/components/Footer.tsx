import React from 'react';
import { PageType } from '../types';
import { COMPANY_INFO } from '../data/ecohiveData';
import { FlyRankBadge } from './FlyRankBadge';
import {
  Hexagon,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Globe,
  Send,
} from 'lucide-react';

interface Props {
  setPage: (page: PageType) => void;
  openAnalytics?: () => void;
}

export const Footer: React.FC<Props> = ({ setPage, openAnalytics }) => {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-100 pt-16 pb-12 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-amber-500/20 text-amber-400 rounded-2xl shadow-md border border-amber-400/30">
                <Hexagon className="w-6 h-6 fill-amber-500/30 stroke-amber-400 stroke-[2]" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight font-display">ECOHIVE</span>
                <span className="text-xs font-black text-amber-400 block tracking-widest uppercase">
                  KENYA LTD.
                </span>
              </div>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed font-body">
              {COMPANY_INFO.tagline}. We combine climate-smart IoT beehives, recycled materials, and community empowerment to redefine sustainable agriculture across Africa.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-300 font-bold bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>People | Planet | Profit Philosophy</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 font-display">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm text-stone-300 font-body">
              <li>
                <button
                  onClick={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setPage('smart-hive'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Climate-Smart Beehive (3D)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setPage('impact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Impact & Plastic Diversion</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setPage('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Products & Pure Honey</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setPage('about-contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>CEO Vision & Contact</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Directory */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 font-display">
              Direct Email Directory
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li className="bg-stone-900 p-3 rounded-2xl border border-amber-500/20">
                <span className="text-amber-300 font-bold block">General & Inquiries:</span>
                <a href={`mailto:${COMPANY_INFO.emails.general}`} className="text-white hover:text-amber-200 flex items-center gap-1 font-mono mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{COMPANY_INFO.emails.general}</span>
                </a>
              </li>

              <li className="bg-stone-900 p-3 rounded-2xl border border-amber-500/20">
                <span className="text-amber-300 font-bold block">Partnerships & CEO (Peter Gitau):</span>
                <a href={`mailto:${COMPANY_INFO.emails.ceo}`} className="text-white hover:text-amber-200 flex items-center gap-1 font-mono mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{COMPANY_INFO.emails.ceo}</span>
                </a>
              </li>

              <li className="bg-stone-900 p-3 rounded-2xl border border-amber-500/20">
                <span className="text-amber-300 font-bold block">Operations & Farmer Sales (Andika):</span>
                <a href={`mailto:${COMPANY_INFO.emails.operations}`} className="text-white hover:text-amber-200 flex items-center gap-1 font-mono mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{COMPANY_INFO.emails.operations}</span>
                </a>
              </li>

              <li className="pt-1 flex items-center gap-2 text-stone-300">
                <Phone className="w-4 h-4 text-amber-400" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold text-white hover:text-amber-300">
                  {COMPANY_INFO.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Location */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-amber-400 font-display">
              Join The Value Chain
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed font-body">
              Subscribe to receive quarterly impact reports, IoT telemetry updates, and market intelligence on African honey exports.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address for EcoHive quarterly newsletter
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-label="Enter your email to subscribe to EcoHive newsletter"
                  className="w-full bg-stone-900 border border-amber-400/30 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-hidden focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 pr-10"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center cursor-pointer shadow-xs border border-amber-400/40 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-hidden"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
              {subscribed && (
                <p role="status" className="text-xs text-amber-300 font-bold animate-pulse">
                  ✓ Thank you for subscribing to EcoHive Kenya!
                </p>
              )}
            </form>

            <div className="flex items-center gap-2 text-xs text-stone-300 pt-1 font-body">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{COMPANY_INFO.location}</span>
            </div>
          </div>
        </div>

        {/* FlyRank AI Graduate Credential Badge Section */}
        <div className="pt-8 pb-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono">
              Certified Portfolio Verification
            </span>
            <p className="text-xs text-stone-300 font-body max-w-md">
              Engineered by <strong>Eric Munyi</strong> as part of the FlyRank AI Internship &amp; Frontend AI Engineering program.
            </p>
          </div>
          <div className="shrink-0">
            <FlyRankBadge variant="banner" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 gap-4 font-body border-t border-stone-800/40">
          <p>© {new Date().getFullYear()} EcoHive Kenya Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {openAnalytics && (
              <button
                onClick={openAnalytics}
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer transition-colors"
                title="View Live Web Analytics Telemetry"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Analytics Dashboard</span>
              </button>
            )}
            <span className="hover:text-amber-300 transition-colors">ISO 22000 Ready</span>
            <span className="hover:text-amber-300 transition-colors">KEBS Certified Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
