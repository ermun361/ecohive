import React, { useState } from 'react';
import { ProductItem } from '../types';
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
  setPage: (page: string) => void;
}

export const ProductsView: React.FC<Props> = ({ setPage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-12 pb-16">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-br from-amber-500 via-yellow-500 to-stone-950 text-white py-14 px-6 rounded-3xl shadow-xl border-2 border-amber-400/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <span className="bg-amber-400 text-slate-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md border border-amber-300">
            Pure Honey & Eco-Hardware
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-white">
            Pure, Traceable Honey & Smart Hardware
          </h1>
          <p className="text-amber-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-body">
            ISO 22000 compliant, cold-pressed raw honey, medical-grade propolis tinctures, and patented IoT-enabled climate beehives crafted with care from Kenyan hives.
          </p>

          {/* Banner Product Image */}
          <div className="pt-4 max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/50">
            <img
              src={IMAGES.products}
              alt="EcoHive Products Lineup"
              className="w-full h-48 sm:h-64 object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
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
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-400/25 border border-amber-400/50'
                  : 'bg-white text-stone-700 hover:bg-amber-400/10 border border-amber-400/30'
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
              className="bg-white rounded-3xl border border-amber-400/25 shadow-sm hover:shadow-xl hover:border-yellow-500/60 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-amber-400/15 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase border border-amber-400/30">
                    {p.category}
                  </span>
                  <span className="bg-gradient-to-r from-amber-400/20 to-yellow-500/20 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-amber-400/40">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-stone-900 leading-snug group-hover:text-amber-800 transition-colors font-display">
                  {p.name}
                </h3>

                <p className="text-xs font-bold text-amber-800 italic font-editorial">{p.tagline}</p>

                <p className="text-stone-600 text-xs leading-relaxed line-clamp-3 font-body">
                  {p.descCommunity || p.descTechnical}
                </p>

                <div className="pt-2 space-y-1">
                  {p.specs.slice(0, 2).map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-stone-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-0 bg-amber-400/5 border-t border-amber-400/20 mt-auto flex items-center justify-between">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-mono">Price</span>
                  <span className="text-lg font-black text-stone-900 font-mono">
                    KES {p.priceKes.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-amber-800 font-mono font-bold block">
                    (~${p.priceUsd.toFixed(2)})
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProduct(p)}
                  className="bg-stone-900 hover:bg-stone-800 text-amber-400 hover:text-yellow-400 text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-xs border border-amber-400/30 hover:border-yellow-500 cursor-pointer"
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
        <div className="fixed inset-0 bg-stone-950/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border-2 border-amber-400/40 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product detail"
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full bg-stone-100 cursor-pointer hover:bg-amber-400/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="bg-amber-400/15 text-amber-950 text-xs font-black px-3 py-1 rounded-full uppercase border border-amber-400/40 shadow-2xs">
                {selectedProduct.category} • {selectedProduct.certification}
              </span>
              <h3 className="text-2xl font-black text-stone-900 font-display">{selectedProduct.name}</h3>
              <p className="text-amber-800 text-xs font-bold font-editorial">{selectedProduct.tagline}</p>
            </div>

            <div className="space-y-3 bg-amber-400/10 p-4 rounded-2xl border border-amber-400/30 text-xs">
              <div>
                <span className="font-bold text-stone-800 block mb-1">Technical Specification:</span>
                <p className="text-stone-600 leading-relaxed font-body">{selectedProduct.descTechnical}</p>
              </div>
              <div className="pt-2 border-t border-amber-400/20">
                <span className="font-black text-amber-950 block mb-1">Community & Consumer Benefit:</span>
                <p className="text-amber-950 leading-relaxed font-body">{selectedProduct.descCommunity}</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-700 block">Product Features:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {selectedProduct.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-stone-600">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-amber-400/20 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-400 block font-mono">Price</span>
                <span className="text-2xl font-black text-stone-900 font-mono">
                  KES {selectedProduct.priceKes.toLocaleString()}
                </span>
                <span className="text-xs text-amber-800 font-mono font-bold block">
                  (${selectedProduct.priceUsd.toFixed(2)} USD)
                </span>
              </div>

              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setPage('about-contact');
                }}
                className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-amber-400/25 border border-amber-400/50 cursor-pointer"
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
