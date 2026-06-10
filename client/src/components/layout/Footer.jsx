import { Link } from 'react-router-dom';
import { Leaf, Github, Twitter, Heart } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Calculator', path: '/calculate' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Actions', path: '/actions' },
    { label: 'Offset Market', path: '/offset' },
  ],
  Learn: [
    { label: 'Education Hub', path: '/learn' },
    { label: 'Carbon Basics', path: '/learn' },
    { label: 'Climate Science', path: '/learn' },
    { label: 'Policy', path: '/learn' },
  ],
  Company: [
    { label: 'About Us', path: '/' },
    { label: 'Contact', path: '/' },
    { label: 'Careers', path: '/' },
    { label: 'Blog', path: '/learn' },
  ],
  Legal: [
    { label: 'Privacy Policy', path: '/' },
    { label: 'Terms of Service', path: '/' },
    { label: 'Cookie Policy', path: '/' },
    { label: 'Data Policy', path: '/' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-dark-surface border-t border-gray-100 dark:border-forest-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-forest-500" />
              <span className="text-lg font-bold font-display text-gray-900 dark:text-dark-text">
                Eco<span className="text-forest-500">Trace</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Track, reduce, and offset your carbon footprint for a sustainable future.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-forest-900/30 text-gray-400 hover:text-forest-500 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-forest-900/30 text-gray-400 hover:text-forest-500 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-dark-text mb-3">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-forest-500 dark:hover:text-forest-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-forest-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} EcoTrace. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-forest-500 fill-forest-500" /> 🌱 for the planet
          </p>
        </div>
      </div>
    </footer>
  );
}
