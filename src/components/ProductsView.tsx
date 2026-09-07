import React, { useState, useEffect } from 'react';
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
  Search,
} from 'lucide-react';

interface Props {
  setPage: (page: string) => void;
}

export const ProductsView: React.FC<Props> = ({ setPage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProduct) {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct]);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesName = p.name.toLowerCase().includes(query);
    const matchesTagline = p.tagline.toLowerCase().includes(query);
    const matchesDesc = (p.descCommunity + ' ' + p.descTechnical).toLowerCase().includes(query);
    const matchesSpecs = p.specs.some((s) => s.toLowerCase().includes(query));

    return matchesCategory && (matchesName || matchesTagline || matchesDesc || matchesSpecs);
  });

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
              alt="EcoHive Kenya pure raw honey jars, propolis tincture, and climate-smart beehives"
              width="800"
              height="320"
              className="w-full h-48 sm:h-64 object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY & SEARCH CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div role="tablist" aria-label="Product categories" className="flex flex-wrap items-center justify-center gap-2">
            {['All', 'Honey', 'Wellness', 'Hardware'].map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-400/25 border border-amber-400/50'
                    : 'bg-white text-stone-700 hover:bg-amber-400/10 border border-amber-400/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            <input
              id="product-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search honey, propolis, hives..."
              aria-label="Search honey, propolis, and beehives"
              className="w-full bg-white border border-amber-400/30 focus:border-amber-500 rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-hidden transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5 rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID OR EMPTY STATE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-14 px-6 bg-white rounded-3xl border border-amber-400/25 shadow-sm max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 bg-amber-400/15 text-amber-900 border border-amber-400/30 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
              <Search className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-black text-stone-900 font-display">No Products Found</h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto font-body">
                We couldn't find any products matching &ldquo;{searchQuery}&rdquo; {selectedCategory !== 'All' ? `in the ${selectedCategory} category.` : 'in our catalog.'}
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 rounded-xl font-black text-xs shadow-md transition-all cursor-pointer"
            >
              Reset Search & Show All
            </button>
          </div>
        ) : (
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
                  aria-label={`View details and inquire for ${p.name}`}
                  className="bg-stone-900 hover:bg-stone-800 text-amber-400 hover:text-yellow-400 text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-xs border border-amber-400/30 hover:border-yellow-500 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden"
                >
                  View & Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          className="fixed inset-0 bg-stone-950/75 backdrop-blur-xs z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border-2 border-amber-400/40 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details dialog"
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full bg-stone-100 cursor-pointer hover:bg-amber-400/20 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="space-y-2">
              <span className="bg-amber-400/15 text-amber-950 text-xs font-black px-3 py-1 rounded-full uppercase border border-amber-400/40 shadow-2xs">
                {selectedProduct.category} • {selectedProduct.certification}
              </span>
              <h3 id="product-modal-title" className="text-2xl font-black text-stone-900 font-display">
                {selectedProduct.name}
              </h3>
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
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-amber-400/20 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 block font-mono font-medium">Price</span>
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
                aria-label={`Inquire about ordering ${selectedProduct.name}`}
                className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-amber-400/25 border border-amber-400/50 cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden"
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
