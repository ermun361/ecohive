import React from 'react';
import { PageType } from '../types';
import { COMPANY_INFO } from '../data/ecohiveData';
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
  openWorklog: () => void;
}

export const Footer: React.FC<Props> = ({ setPage, openWorklog }) => {
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
    <footer className="bg-[#14532D] text-slate-100 pt-16 pb-12 border-t border-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-green-800/60">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-[#166534] text-[#86EFAC] rounded-2xl shadow-md border border-green-500/30">
                <Hexagon className="w-6 h-6 fill-green-900 stroke-[2]" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">ECOHIVE</span>
                <span className="text-xs font-semibold text-[#86EFAC] block tracking-widest uppercase">
                  KENYA LTD.
                </span>
              </div>
            </div>

            <p className="text-green-100/80 text-sm leading-relaxed">
              {COMPANY_INFO.tagline}. We combine climate-smart IoT beehives, recycled materials, and community empowerment to redefine sustainable agriculture across Africa.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#86EFAC] font-semibold bg-white/5 p-3 rounded-2xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>People | Planet | Profit Philosophy</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#86EFAC]">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm text-green-100/80">
              <li>
                <button
                  onClick={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setPage('smart-hive'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Climate-Smart Beehive (3D)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setPage('impact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Impact & Plastic Diversion</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setPage('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Products & Pure Honey</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setPage('about-contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>CEO Vision & Contact</span>
                </button>
              </li>
              <li>
                <button
                  onClick={openWorklog}
                  className="text-[#86EFAC] hover:underline transition-colors flex items-center gap-1.5 font-medium mt-1"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#86EFAC]" />
                  <span>Website Blueprint & Worklog</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Directory */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#86EFAC]">
              Direct Email Directory
            </h3>
            <ul className="space-y-2.5 text-xs text-green-100/90">
              <li className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <span className="text-[#86EFAC] font-semibold block">General & Inquiries:</span>
                <a href={`mailto:${COMPANY_INFO.emails.general}`} className="text-white hover:underline flex items-center gap-1 font-mono mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-[#86EFAC]" />
                  <span>{COMPANY_INFO.emails.general}</span>
                </a>
              </li>

              <li className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <span className="text-[#86EFAC] font-semibold block">Partnerships & CEO (Peter Gitau):</span>
                <a href={`mailto:${COMPANY_INFO.emails.ceo}`} className="text-white hover:underline flex items-center gap-1 font-mono mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-[#86EFAC]" />
                  <span>{COMPANY_INFO.emails.ceo}</span>
                </a>
              </li>

              <li className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <span className="text-[#86EFAC] font-semibold block">Operations & Farmer Sales (Andika):</span>
                <a href={`mailto:${COMPANY_INFO.emails.operations}`} className="text-white hover:underline flex items-center gap-1 font-mono mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-[#86EFAC]" />
                  <span>{COMPANY_INFO.emails.operations}</span>
                </a>
              </li>

              <li className="pt-1 flex items-center gap-2 text-green-200">
                <Phone className="w-4 h-4 text-[#86EFAC]" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="font-semibold text-white hover:underline">
                  {COMPANY_INFO.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Location */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#86EFAC]">
              Join The Value Chain
            </h3>
            <p className="text-xs text-green-200/80 leading-relaxed">
              Subscribe to receive quarterly impact reports, IoT telemetry updates, and market intelligence on African honey exports.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder-green-200/60 focus:outline-hidden focus:border-[#86EFAC] pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 bg-[#22C55E] hover:bg-green-600 text-slate-950 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-[#86EFAC] font-semibold animate-pulse">
                  ✓ Thank you for subscribing to EcoHive Kenya!
                </p>
              )}
            </form>

            <div className="flex items-center gap-2 text-xs text-green-200 pt-1">
              <MapPin className="w-4 h-4 text-[#86EFAC] shrink-0" />
              <span>{COMPANY_INFO.location}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-green-200/70 gap-4">
          <p>© {new Date().getFullYear()} EcoHive Kenya Ltd. Benchmarked against Pullus Africa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-green-200">ISO 22000 Ready</span>
            <span className="hover:text-green-200">KEBS Certified Standards</span>
            <button onClick={openWorklog} className="text-[#86EFAC] font-semibold hover:underline">
              View Worklog & Blueprint
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
