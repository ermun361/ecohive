import React, { useState } from 'react';
import { ToneMode, ProductItem } from '../types';
import { PRODUCTS } from '../data/ecohiveData';
import { IMAGES } from '../data/images';
import {
  ShieldCheck,
  Tag,
  CheckCircle2,
  X,
  Mail,
  ShoppingBag,
  Sparkles,
  Download,
} from 'lucide-react';

interface Props {
  tone: ToneMode;
  setPage: (page: string) => void;
}

export const ProductsView: React.FC<Props> = ({ tone, setPage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-12 pb-16">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white py-12 px-4 rounded-3xl shadow-xl">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
            Premium Agricultural Products
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Pure, Traceable Honey & Eco-Hardware
          </h1>
          <p className="text-emerald-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {tone === 'technical'
              ? 'ISO 22000 compliant, cold-pressed raw honey, medical-grade propolis tinctures, and patented IoT-enabled climate beehives.'
              : tone === 'community'
              ? 'Pure, delicious honey and natural skincare crafted with care from Kenyan hives—supporting local beekeepers with every purchase.'
              : 'Every drop of honey and bar of soap is harvested under strict quality controls enabled by our climate-smart technology.'}
          </p>

          {/* Banner Product Image */}
          <div className="pt-4 max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-emerald-500/40">
            <img
              src={IMAGES.products}
              alt="EcoHive Products Lineup"
              className="w-full h-48 sm:h-64 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['All', 'Honey', 'Wellness', 'Hardware'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                    {p.category}
                  </span>
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                  {p.name}
                </h3>

                <p className="text-xs font-semibold text-emerald-700 italic">{p.tagline}</p>

                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {tone === 'technical' ? p.descTechnical : p.descCommunity}
                </p>

                <div className="pt-2 space-y-1">
                  {p.specs.slice(0, 2).map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-0 bg-slate-50/60 border-t border-slate-100 mt-auto flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Price</span>
                  <span className="text-lg font-black text-slate-900 font-mono">
                    KES {p.priceKes.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block">
                    (~${p.priceUsd.toFixed(2)})
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProduct(p)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs"
                >
                  View & Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                {selectedProduct.category} • {selectedProduct.certification}
              </span>
              <h3 className="text-2xl font-black text-slate-900">{selectedProduct.name}</h3>
              <p className="text-emerald-700 text-xs font-semibold">{selectedProduct.tagline}</p>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="font-bold text-slate-800 block mb-1">Technical Specification:</span>
                <p className="text-slate-600 leading-relaxed">{selectedProduct.descTechnical}</p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-amber-900 block mb-1">Community & Consumer Benefit:</span>
                <p className="text-amber-950 leading-relaxed">{selectedProduct.descCommunity}</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Product Features:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {selectedProduct.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-mono">Price</span>
                <span className="text-2xl font-black text-slate-900 font-mono">
                  KES {selectedProduct.priceKes.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 font-mono block">
                  (${selectedProduct.priceUsd.toFixed(2)} USD)
                </span>
              </div>

              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setPage('about-contact');
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md"
              >
                Inquire / Order via Sales (Andika@)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
