import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/ecohiveData';
import { IMAGES } from '../data/images';
import {
  Mail,
  Building2,
  Users,
  Briefcase,
  Send,
  CheckCircle2,
  AlertCircle,
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
  const [formError, setFormError] = useState('');
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
    setFormError('');

    // Input sanitization & validation
    const nameTrimmed = formData.name.trim();
    const emailTrimmed = formData.email.trim();
    const phoneTrimmed = formData.phone.trim();
    const messageTrimmed = formData.message.trim();

    if (!nameTrimmed || !emailTrimmed || !phoneTrimmed || !messageTrimmed) {
      setFormError('Please fill out all required fields.');
      return;
    }

    if (nameTrimmed.length < 2) {
      setFormError('Please enter a valid full name (at least 2 characters).');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      setFormError('Please enter a valid email address (e.g. name@company.com).');
      return;
    }

    // Phone format validation (allows +, spaces, dashes, parentheses, minimum 7 digits)
    const digitsOnly = phoneTrimmed.replace(/\D/g, '');
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      setFormError('Please enter a valid phone or WhatsApp number (with country code, e.g. +254 700 000 000).');
      return;
    }

    if (messageTrimmed.length < 5) {
      setFormError('Please provide a short description or inquiry (at least 5 characters).');
      return;
    }

    setSubmitting(true);
    const targetEmail = getTargetEmail(formData.role);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameTrimmed,
          email: emailTrimmed,
          phone: phoneTrimmed,
          role: formData.role,
          message: messageTrimmed,
          hiveQuantity: Math.max(1, Math.min(1000, Number(formData.hiveQuantity) || 1)),
          targetEmail,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || 'Failed to send contact inquiry.');
      }

      setSubmittedResponse({
        success: true,
        message: data?.message || 'Your inquiry was successfully sent and routed!',
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
    } catch (err: any) {
      setFormError(err.message || 'Unable to route your message right now. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* ABOUT CEO & FOUNDER */}
      <section className="bg-gradient-to-br from-amber-500 via-yellow-500 to-stone-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-amber-400/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-4 text-center lg:text-left">
            <div className="relative inline-block">
              <img
                src={IMAGES.ceoPeterGitau}
                alt="Peter Gitau CEO EcoHive Kenya Ltd."
                width="256"
                height="256"
                className="w-52 h-52 sm:w-64 sm:h-64 rounded-3xl object-cover mx-auto shadow-2xl border-4 border-amber-400/60"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-xs font-black px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap border border-amber-400">
                CEO & FOUNDER
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <span className="text-amber-300 text-xs font-black uppercase tracking-widest bg-stone-900/90 px-3.5 py-1 rounded-full border border-amber-400/40 inline-block shadow-2xs">
              The Visionary Behind EcoHive
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-white">
              {COMPANY_INFO.ceo.name}
            </h1>
            <p className="text-amber-200 font-bold text-sm font-body">
              {COMPANY_INFO.ceo.title} • EcoHive Kenya Ltd.
            </p>

            <blockquote className="italic text-amber-50 text-base sm:text-lg border-l-4 border-amber-400 pl-4 py-1 font-editorial">
              "{COMPANY_INFO.ceo.quote}"
            </blockquote>

            <p className="text-amber-100/90 text-sm leading-relaxed font-body">
              {COMPANY_INFO.ceo.bio}
            </p>
          </div>
        </div>
      </section>

      {/* DIRECT EMAIL DIRECTORY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-black text-amber-950 uppercase tracking-widest bg-amber-400/15 px-3.5 py-1 rounded-full border border-amber-400/40 shadow-2xs">
            Direct Routing Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
            Reach the Right Department
          </h2>
          <p className="text-stone-600 text-sm font-body">
            Contact specific team leads directly or use our automated partner inquiry form below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Info@ */}
          <div className="bg-white p-6 rounded-3xl border border-amber-400/25 shadow-sm hover:border-yellow-500 hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-950 flex items-center justify-center font-bold border border-amber-400/30">
              <Building2 className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-base font-black text-stone-900 font-display">General & Media Inquiries</h3>
            <p className="text-stone-600 text-xs leading-relaxed font-body">
              For general questions, brand inquiries, and public relations.
            </p>
            <a
              href={`mailto:${COMPANY_INFO.emails.general}`}
              className="text-xs font-mono font-black text-amber-800 hover:underline block pt-2"
            >
              ✉ {COMPANY_INFO.emails.general}
            </a>
          </div>

          {/* Gitau@ */}
          <div className="bg-white p-6 rounded-3xl border-2 border-amber-400 shadow-lg space-y-3 relative hover:border-yellow-500 transition-all">
            <span className="absolute -top-3 right-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-[10px] font-black px-3.5 py-0.5 rounded-full uppercase border border-amber-400 shadow-xs">
              CEO Office
            </span>
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-950 flex items-center justify-center font-bold border border-amber-400/40">
              <Briefcase className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-base font-black text-stone-900 font-display">Partnerships & Investors</h3>
            <p className="text-stone-600 text-xs leading-relaxed font-body">
              Direct connection to CEO Peter Gitau for investment, carbon credits, and institutional partnerships.
            </p>
            <a
              href={`mailto:${COMPANY_INFO.emails.ceo}`}
              className="text-xs font-mono font-black text-amber-800 hover:underline block pt-2"
            >
              ✉ {COMPANY_INFO.emails.ceo}
            </a>
          </div>

          {/* Andika@ */}
          <div className="bg-white p-6 rounded-3xl border border-amber-400/25 shadow-sm hover:border-yellow-500 hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-950 flex items-center justify-center font-bold border border-amber-400/30">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-base font-black text-stone-900 font-display">Operations & Farmer Sales</h3>
            <p className="text-stone-600 text-xs leading-relaxed font-body">
              Managed by Andika for beehive kit ordering, farmer cluster onboarding, and wholesale honey orders.
            </p>
            <a
              href={`mailto:${COMPANY_INFO.emails.operations}`}
              className="text-xs font-mono font-black text-amber-800 hover:underline block pt-2"
            >
              ✉ {COMPANY_INFO.emails.operations}
            </a>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PARTNER INQUIRY FORM */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border-2 border-amber-400/30 shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-amber-950 uppercase tracking-widest bg-amber-400/15 px-3.5 py-1 rounded-full border border-amber-400/40 shadow-2xs">
              Join The Hive
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-display">
              Partner With EcoHive Kenya
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm font-body">
              Your inquiry will be automatically routed to the designated email lead.
            </p>
          </div>

          {submittedResponse ? (
            <div className="bg-amber-400/10 border-2 border-amber-400 p-6 rounded-3xl text-center space-y-3 animate-in zoom-in-95 duration-200 shadow-md">
              <CheckCircle2 className="w-12 h-12 text-amber-600 mx-auto" />
              <h3 className="text-xl font-black text-stone-900 font-display">Inquiry Dispatched!</h3>
              <p className="text-stone-700 text-sm font-body">{submittedResponse.message}</p>
              <div className="inline-block bg-white px-4 py-2 rounded-xl border border-amber-400/40 text-xs font-mono text-stone-800 shadow-2xs">
                Routed to: <strong className="text-amber-800">{submittedResponse.routedTo}</strong>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setSubmittedResponse(null)}
                  className="bg-stone-900 hover:bg-stone-800 text-amber-400 hover:text-yellow-400 font-black text-xs px-6 py-2.5 rounded-xl transition-all shadow-sm border border-amber-400/30 hover:border-yellow-500 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selector */}
              <div>
                <span id="role-selector-label" className="text-xs font-black text-stone-700 block mb-2">
                  I am contacting EcoHive as a:
                </span>
                <div
                  role="radiogroup"
                  aria-labelledby="role-selector-label"
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                >
                  {(['Farmer', 'Investor', 'Retailer / Buyer', 'General'] as const).map((r) => (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={formData.role === r}
                      key={r}
                      disabled={submitting}
                      onClick={() => setFormData({ ...formData, role: r })}
                      className={`p-3 rounded-2xl text-xs font-bold transition-all border text-center cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden ${
                        formData.role === r
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 border-amber-400 font-black shadow-sm'
                          : 'bg-stone-50 text-stone-700 border-amber-400/20 hover:bg-amber-400/10 hover:border-amber-400/40'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-amber-900 font-medium mt-2">
                  ℹ Target routing: Message will go to{' '}
                  <strong className="font-mono bg-amber-400/15 px-2 py-0.5 rounded-md border border-amber-400/30 text-amber-950">
                    {getTargetEmail(formData.role)}
                  </strong>
                </p>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="text-xs font-bold text-stone-700 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    disabled={submitting}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (formError) setFormError('');
                    }}
                    placeholder="e.g. Peter Gitau"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-xs text-stone-900 focus:outline-hidden focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-xs font-bold text-stone-700 block mb-1">
                    Your Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    disabled={submitting}
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (formError) setFormError('');
                    }}
                    placeholder="name@company.com"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-xs text-stone-900 focus:outline-hidden focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Phone & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="text-xs font-bold text-stone-700 block mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    disabled={submitting}
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (formError) setFormError('');
                    }}
                    placeholder="+254 700 000 000"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-xs text-stone-900 focus:outline-hidden focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="contact-quantity" className="text-xs font-bold text-stone-700 block mb-1">
                    Estimated Hive Quantity (If Applicable)
                  </label>
                  <input
                    id="contact-quantity"
                    type="number"
                    min="1"
                    max="1000"
                    disabled={submitting}
                    value={formData.hiveQuantity}
                    onChange={(e) => setFormData({ ...formData, hiveQuantity: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-xs text-stone-900 focus:outline-hidden focus:border-amber-400 font-mono disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-amber-500"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="text-xs font-bold text-stone-700 block mb-1">
                  Your Message or Inquiry *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  disabled={submitting}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (formError) setFormError('');
                  }}
                  placeholder="Describe your project, farm location, or investment proposal..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs text-stone-900 focus:outline-hidden focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50"
                ></textarea>
              </div>

              {formError && (
                <div role="alert" className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 p-3.5 rounded-2xl text-xs font-medium">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" aria-hidden="true" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-sm py-4 rounded-2xl transition-all shadow-lg shadow-amber-400/25 border border-amber-400/50 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Routing Message...</span>
                  </>
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

