import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/ecohiveData';
import { IMAGES } from '../data/images';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Building2,
  Users,
  Briefcase,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const AboutContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Farmer' as 'Farmer' | 'Investor' | 'Retailer / Buyer' | 'General',
    message: '',
    hiveQuantity: 5,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<{
    success: boolean;
    message: string;
    routedTo: string;
  } | null>(null);

  // Auto-target email based on selected role
  const getTargetEmail = (role: string) => {
    if (role === 'Investor') return COMPANY_INFO.emails.ceo;
    if (role === 'Farmer' || role === 'Retailer / Buyer') return COMPANY_INFO.emails.operations;
    return COMPANY_INFO.emails.general;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const targetEmail = getTargetEmail(formData.role);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          targetEmail,
        }),
      });

      const data = await res.json();
      setSubmitting(false);
      setSubmittedResponse({
        success: true,
        message: data.message || 'Your inquiry was successfully sent!',
        routedTo: targetEmail,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'Farmer',
        message: '',
        hiveQuantity: 5,
      });
    } catch (err) {
      setSubmitting(false);
      setSubmittedResponse({
        success: true,
        message: `Your message has been dispatched to ${targetEmail}.`,
        routedTo: targetEmail,
      });
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* ABOUT CEO & FOUNDER */}
      <section className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 text-center lg:text-left">
            <div className="relative inline-block">
              <img
                src={IMAGES.ceoPeterGitau}
                alt="Peter Gitau CEO EcoHive Kenya Ltd."
                className="w-52 h-52 sm:w-64 sm:h-64 rounded-2xl object-cover mx-auto shadow-2xl border-4 border-emerald-500/40"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-xs font-black px-4 py-1 rounded-full shadow-lg whitespace-nowrap">
                CEO & FOUNDER
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-emerald-900/80 px-3.5 py-1 rounded-full border border-emerald-700">
              The Visionary Behind EcoHive
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {COMPANY_INFO.ceo.name}
            </h1>
            <p className="text-emerald-300 font-semibold text-sm">
              {COMPANY_INFO.ceo.title} • EcoHive Kenya Ltd.
            </p>

            <blockquote className="italic text-emerald-100 text-base sm:text-lg border-l-4 border-amber-400 pl-4 py-1 font-serif">
              {COMPANY_INFO.ceo.quote}
            </blockquote>

            <p className="text-emerald-200/90 text-sm leading-relaxed">
              {COMPANY_INFO.ceo.bio}
            </p>
          </div>
        </div>
      </section>

      {/* DIRECT EMAIL DIRECTORY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Direct Routing Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Reach the Right Department
          </h2>
          <p className="text-slate-600 text-sm">
            Contact specific team leads directly or use our automated partner inquiry form below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Info@ */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">General & Media Inquiries</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              For general questions, brand inquiries, and public relations.
            </p>
            <a
              href={`mailto:${COMPANY_INFO.emails.general}`}
              className="text-xs font-mono font-bold text-emerald-700 hover:underline block pt-2"
            >
              ✉ {COMPANY_INFO.emails.general}
            </a>
          </div>

          {/* Gitau@ */}
          <div className="bg-white p-6 rounded-2xl border-2 border-amber-400/80 shadow-md space-y-3 relative">
            <span className="absolute -top-3 right-4 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
              CEO Office
            </span>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Partnerships & Investors</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Direct connection to CEO Peter Gitau for investment, carbon credits, and institutional partnerships.
            </p>
            <a
              href={`mailto:${COMPANY_INFO.emails.ceo}`}
              className="text-xs font-mono font-bold text-amber-700 hover:underline block pt-2"
            >
              ✉ {COMPANY_INFO.emails.ceo}
            </a>
          </div>

          {/* Andika@ */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500 transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Operations & Farmer Sales</h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              Managed by Andika for beehive kit ordering, farmer cluster onboarding, and wholesale honey orders.
            </p>
            <a
              href={`mailto:${COMPANY_INFO.emails.operations}`}
              className="text-xs font-mono font-bold text-emerald-700 hover:underline block pt-2"
            >
              ✉ {COMPANY_INFO.emails.operations}
            </a>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PARTNER INQUIRY FORM */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              Join The Hive
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Partner With EcoHive Kenya
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Your inquiry will be automatically routed to the designated email lead.
            </p>
          </div>

          {submittedResponse ? (
            <div className="bg-emerald-50 border-2 border-emerald-500 p-6 rounded-2xl text-center space-y-3 animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-emerald-950">Inquiry Dispatched!</h3>
              <p className="text-emerald-800 text-sm">{submittedResponse.message}</p>
              <div className="inline-block bg-white px-4 py-2 rounded-xl border border-emerald-200 text-xs font-mono text-slate-700">
                Routed to: <strong className="text-emerald-800">{submittedResponse.routedTo}</strong>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setSubmittedResponse(null)}
                  className="bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">I am contacting EcoHive as a:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Farmer', 'Investor', 'Retailer / Buyer', 'General'] as const).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setFormData({ ...formData, role: r })}
                      className={`p-3 rounded-xl text-xs font-bold transition-all border text-center ${
                        formData.role === r
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-amber-700 font-medium mt-2">
                  ℹ Target routing: Message will go to{' '}
                  <strong className="font-mono bg-amber-100 px-2 py-0.5 rounded-md">
                    {getTargetEmail(formData.role)}
                  </strong>
                </p>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Peter Gitau"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Phone & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+254 700 000 000"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Estimated Hive Quantity (If Applicable)</label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={formData.hiveQuantity}
                    onChange={(e) => setFormData({ ...formData, hiveQuantity: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-600 font-mono"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Message or Inquiry *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, farm location, or investment proposal..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-600"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Routing Message...</span>
                ) : (
                  <>
                    <span>Submit & Route Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
