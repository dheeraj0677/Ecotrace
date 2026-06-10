import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ARTICLES, ARTICLE_CATEGORIES, searchArticles, getArticlesByCategory } from '@/data/articles';
import useDashboardStore from '@/store/dashboardStore';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Search, Clock, BookOpen, ChevronRight } from 'lucide-react';

export default function Learn() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { markArticleRead, isArticleRead } = useDashboardStore();

  const articles = useMemo(() => {
    if (searchQuery) return searchArticles(searchQuery);
    return getArticlesByCategory(category);
  }, [searchQuery, category]);

  const featured = ARTICLES[0];

  const openArticle = (article) => {
    setSelectedArticle(article);
    markArticleRead(article.id);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-dark-text mb-2">📚 Learn</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Understand the science behind your carbon footprint</p>
        </motion.div>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search articles..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10" id="search-articles" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ARTICLE_CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => { setCategory(cat); setSearchQuery(''); }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                category === cat && !searchQuery
                  ? 'bg-forest-500 text-white'
                  : 'bg-gray-100 dark:bg-forest-900/30 text-gray-600 dark:text-gray-400 hover:bg-forest-100'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {!searchQuery && category === 'All' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div onClick={() => openArticle(featured)}
              className={`relative overflow-hidden rounded-2xl p-8 cursor-pointer bg-gradient-to-br ${featured.heroGradient} text-white hover:shadow-xl transition-shadow`}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <Badge className="bg-white/20 text-white mb-3">{featured.category}</Badge>
              <h2 className="text-2xl font-bold font-display mb-2">{featured.title}</h2>
              <p className="text-white/80 text-sm max-w-lg mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-white/60 text-xs">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime} min read</span>
                {isArticleRead(featured.id) && <span className="flex items-center gap-1">✓ Read</span>}
              </div>
            </div>
          </motion.div>
        )}

        {/* Article Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.filter(a => !(!searchQuery && category === 'All' && a.id === featured.id)).map((article, i) => (
            <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card onClick={() => openArticle(article)} className="cursor-pointer h-full">
                <div className={`h-2 rounded-full bg-gradient-to-r ${article.heroGradient} mb-4`} />
                <Badge variant="forest" size="sm" className="mb-2">{article.category}</Badge>
                <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text mb-2">{article.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime} min</span>
                  {isArticleRead(article.id) ? (
                    <span className="text-forest-500">✓ Read</span>
                  ) : (
                    <span className="text-forest-500 flex items-center gap-0.5">Read <ChevronRight className="w-3 h-3" /></span>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No articles found for "{searchQuery}"</p>
          </div>
        )}

        {/* Article Modal */}
        <Modal isOpen={!!selectedArticle} onClose={() => setSelectedArticle(null)} title={selectedArticle?.title} size="lg">
          {selectedArticle && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="forest">{selectedArticle.category}</Badge>
                <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedArticle.readTime} min read</span>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
