import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, Home, Car, Plane, Utensils, ShoppingBag, Star, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// Animated Counter Component
function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Live CO2 Counter
function LiveCO2Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const baseRate = 110000000 / 86400; // tons per second
    const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);
    const secondsSinceMidnight = (Date.now() - startOfDay.getTime()) / 1000;
    setCount(Math.floor(secondsSinceMidnight * baseRate));
    const timer = setInterval(() => {
      const now = (Date.now() - startOfDay.getTime()) / 1000;
      setCount(Math.floor(now * baseRate));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-4 bg-gradient-to-r from-forest-600 to-forest-700 dark:from-forest-800 dark:to-forest-900">
      <div className="container-custom text-center">
        <p className="text-forest-100 text-sm">
          🌍 Global CO₂ emitted today:{' '}
          <span className="text-white font-bold text-lg tabular-nums">
            {count.toLocaleString()}
          </span>{' '}
          <span className="text-forest-200">tons</span>
        </p>
      </div>
    </div>
  );
}

// Animated Globe SVG
function AnimatedGlobe() {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
      <svg viewBox="0 0 300 300" className="w-full h-full animate-globe-pulse">
        {/* Globe */}
        <defs>
          <radialGradient id="globeGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#52b788" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#2d9e6b" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1a6342" stopOpacity="0.05" />
          </radialGradient>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" stopColor="#52b788" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#52b788" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#52b788" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <circle cx="150" cy="150" r="120" fill="url(#globeGrad)" stroke="#52b788" strokeWidth="1.5" strokeOpacity="0.4" />
        {/* Latitude lines */}
        <ellipse cx="150" cy="150" rx="120" ry="40" fill="none" stroke="url(#lineGrad)" strokeWidth="0.8" />
        <ellipse cx="150" cy="150" rx="120" ry="80" fill="none" stroke="url(#lineGrad)" strokeWidth="0.8" />
        <ellipse cx="150" cy="150" rx="120" ry="110" fill="none" stroke="url(#lineGrad)" strokeWidth="0.5" />
        {/* Longitude lines */}
        <ellipse cx="150" cy="150" rx="40" ry="120" fill="none" stroke="url(#lineGrad)" strokeWidth="0.8" />
        <ellipse cx="150" cy="150" rx="80" ry="120" fill="none" stroke="url(#lineGrad)" strokeWidth="0.8" />
        <line x1="150" y1="30" x2="150" y2="270" stroke="url(#lineGrad)" strokeWidth="0.8" />
        <line x1="30" y1="150" x2="270" y2="150" stroke="url(#lineGrad)" strokeWidth="0.8" />
      </svg>

      {/* Orbiting CO2 molecules */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-orbit-1">
          <div className="flex items-center gap-0.5 bg-forest-500/20 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-[10px] text-forest-400 font-bold">CO₂</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-orbit-2">
          <div className="w-3 h-3 bg-sky-400/40 rounded-full" />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-orbit-3">
          <div className="w-2 h-2 bg-forest-300/40 rounded-full" />
        </div>
      </div>

      {/* Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-forest-400/30 rounded-full animate-particle"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${i * 1.3}s`,
          }}
        />
      ))}
    </div>
  );
}

// FAQ Accordion
function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      {items.map((item, i) => (
        <div key={i} className="bg-white dark:bg-dark-surface rounded-xl border border-gray-100 dark:border-forest-900/50 overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left"
            aria-expanded={openIndex === i}
          >
            <span className="font-semibold text-gray-900 dark:text-dark-text text-sm">{item.q}</span>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`} />
          </button>
          <motion.div
            initial={false}
            animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

const stagger = { animate: { transition: { staggerChildren: 0.08 } } };
const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

export default function Landing() {
  const categories = [
    { icon: Home, label: 'Home Energy', pct: '25%', fact: 'Heating & cooling use 50% of home energy', color: 'from-forest-400 to-forest-600' },
    { icon: Car, label: 'Transport', pct: '27%', fact: 'Cars produce 4.6 tonnes CO₂ per year', color: 'from-sky-400 to-sky-600' },
    { icon: Plane, label: 'Flights', pct: '3.5%', fact: 'One round-trip flight = 2 months of driving', color: 'from-earth-400 to-warn-400' },
    { icon: Utensils, label: 'Food', pct: '26%', fact: 'Beef produces 60x more emissions than peas', color: 'from-forest-500 to-earth-400' },
    { icon: ShoppingBag, label: 'Lifestyle', pct: '18%', fact: 'Fast fashion: 10% of global emissions', color: 'from-warn-400 to-danger-400' },
  ];

  const testimonials = [
    { name: 'Priya K.', country: '🇮🇳 India', quote: 'EcoTrace helped me realize my flights were 40% of my footprint. I switched to trains for short trips!', stars: 5, saved: '1.2t saved' },
    { name: 'Marcus W.', country: '🇺🇸 USA', quote: 'The weekly challenges make it fun. Our whole office is on a 30-day streak now!', stars: 5, saved: '3.1t saved' },
    { name: 'Sofia L.', country: '🇸🇪 Sweden', quote: 'Finally, a carbon tracker that uses real data. The dashboard insights are incredibly specific.', stars: 5, saved: '0.8t saved' },
  ];

  const faqs = [
    { q: 'What is a carbon footprint?', a: 'A carbon footprint is the total amount of greenhouse gases (CO₂, methane, etc.) generated by your actions. It\'s measured in tonnes of CO₂ equivalent per year. The global average is about 4.7 tonnes per person.' },
    { q: 'How accurate is this calculator?', a: 'We use emission factors from the IPCC (Intergovernmental Panel on Climate Change) and national energy statistics. Our calculations are within 10-15% of professional carbon audits.' },
    { q: 'Is my data private?', a: 'Absolutely. We never sell your data. Your footprint calculations are stored securely and only visible to you. You control what you share on the leaderboard.' },
    { q: 'Can I really make a difference?', a: 'Yes! If every person in developed countries reduced their footprint by 50%, global emissions would drop by ~15%. Individual action also drives systemic change through market demand.' },
    { q: 'What are carbon offsets?', a: 'Carbon offsets are verified projects (like tree planting or renewable energy) that reduce CO₂ elsewhere to compensate for your emissions. They\'re a last resort after reducing your own footprint.' },
    { q: 'How do I reduce my footprint fastest?', a: 'The three highest-impact actions for most people: 1) Reduce flying, 2) Eat less meat, 3) Switch to renewable energy. Our calculator shows your specific biggest opportunities.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sand-50 via-forest-50/30 to-sky-50/20 dark:from-dark-bg dark:via-forest-900/10 dark:to-dark-bg" />
        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...stagger} initial="initial" animate="animate">
              <motion.p {...fadeInUp} className="text-forest-600 dark:text-forest-400 font-semibold text-sm tracking-wider uppercase mb-4">
                Carbon Footprint Tracker
              </motion.p>
              <motion.h1 {...fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-gray-900 dark:text-dark-text leading-tight mb-6">
                Know your{' '}
                <span className="gradient-text">impact.</span>
              </motion.h1>
              <motion.p {...fadeInUp} className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mb-8 leading-relaxed">
                Track, reduce, and offset your carbon footprint with personalized insights powered by real IPCC data.
              </motion.p>
              <motion.div {...fadeInUp} className="flex flex-wrap gap-4">
                <Link to="/calculate">
                  <Button size="lg" iconRight={ArrowRight}>Calculate Mine</Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="secondary" size="lg">See Dashboard</Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <AnimatedGlobe />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Counter */}
      <LiveCO2Counter />

      {/* How It Works */}
      <section className="section-padding bg-white dark:bg-dark-surface/50">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-dark-text mb-3">How it works</h2>
            <p className="text-gray-500 dark:text-gray-400">Three simple steps to understand your impact</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-forest-300 to-transparent dark:via-forest-700" />
            {[
              { step: '01', title: 'Answer 5 quick questions', desc: 'Tell us about your home energy, transport, flights, food, and lifestyle habits.', icon: '📝' },
              { step: '02', title: 'See your carbon score', desc: 'Get your annual footprint in tonnes, a grade from A to F, and a detailed breakdown.', icon: '📊' },
              { step: '03', title: 'Take action & track', desc: 'Get personalized tips, join challenges, maintain your streak, and watch your impact shrink.', icon: '🎯' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Card className="text-center relative" hover={false}>
                  <div className="w-14 h-14 rounded-2xl bg-forest-50 dark:bg-forest-900/30 flex items-center justify-center text-2xl mx-auto mb-4 relative z-10">
                    {item.icon}
                  </div>
                  <p className="text-xs text-forest-500 font-bold mb-2">STEP {item.step}</p>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 bg-gradient-to-r from-forest-600 via-forest-500 to-sky-600">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: 4.7, suffix: 't', label: 'Avg person/year' },
              { value: 25, suffix: '%', label: 'From transport' },
              { value: 26, suffix: '%', label: 'From food systems' },
              { value: 195, suffix: '', label: 'Paris Agreement nations' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-3xl md:text-4xl font-bold font-display">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-white/70 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-dark-text mb-3">What we track</h2>
            <p className="text-gray-500 dark:text-gray-400">Five categories that make up your carbon footprint</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="text-center group cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto mb-3 shadow-sm`}>
                    <cat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-dark-text mb-1">{cat.label}</h3>
                  <p className="text-lg font-bold text-forest-500 mb-1">{cat.pct}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">{cat.fact}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white dark:bg-dark-surface/50">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-dark-text mb-3">Loved by eco-warriors</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card>
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.stars)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-warn-400 fill-warn-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 italic">"{t.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-forest-100 dark:bg-forest-900/30 flex items-center justify-center text-forest-600 dark:text-forest-400 font-bold text-sm">
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-dark-text">{t.name}</p>
                        <p className="text-xs text-gray-400">{t.country}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-forest-500 bg-forest-50 dark:bg-forest-900/30 px-2 py-1 rounded-full">
                      🌿 {t.saved}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-dark-text mb-3">Frequently asked questions</h2>
          </motion.div>
          <FAQ items={faqs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-forest-600 to-forest-800 dark:from-forest-800 dark:to-dark-bg">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">Ready to know your impact?</h2>
            <p className="text-forest-100 mb-8 max-w-lg mx-auto">It takes less than 5 minutes to calculate your carbon footprint and start making a difference.</p>
            <Link to="/calculate">
              <Button size="xl" variant="secondary" iconRight={ArrowRight}>
                Calculate My Footprint
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
