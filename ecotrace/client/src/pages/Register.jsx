import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '@/store/authStore';
import { COUNTRIES } from '@/data/countries';
import Button from '@/components/ui/Button';
import { Leaf, Mail, Lock, User, Eye, EyeOff, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', country: 'US' });
  const [showPassword, setShowPassword] = useState(false);
  const { register, loginDemo, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const passwordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = passwordStrength(form.password);
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', 'bg-danger-400', 'bg-warn-400', 'bg-sky-400', 'bg-forest-500'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('Please fill all fields'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    const success = await register(form);
    if (success) navigate('/calculate', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-8 h-8 text-forest-500" />
            <span className="text-2xl font-bold font-display text-gray-900 dark:text-dark-text">Eco<span className="text-forest-500">Trace</span></span>
          </div>
          <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-dark-text mb-1">Create your account</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Start tracking your carbon footprint today</p>
        </div>

        <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-100 dark:border-forest-900/50 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input id="name" type="text" value={form.name} onChange={(e) => update('name', e.target.value)}
                  className="input-field pl-10" placeholder="Your name" />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input id="reg-email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
                  className="input-field pl-10" placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input id="reg-password" type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  className="input-field pl-10 pr-10" placeholder="Min 6 characters" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" aria-label="Toggle password">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColors[strength] : 'bg-gray-200 dark:bg-forest-900/40'}`} />
                    ))}
                  </div>
                  <p className={`text-xs mt-1 ${strength >= 3 ? 'text-forest-500' : strength >= 2 ? 'text-warn-600' : 'text-danger-400'}`}>
                    {strengthLabels[strength]}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select id="country" value={form.country} onChange={(e) => update('country', e.target.value)} className="input-field pl-10">
                  {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
                </select>
              </div>
            </div>

            <Button type="submit" className="w-full" loading={isLoading} size="lg">Create Account</Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-forest-900/50" /></div>
            <div className="relative flex justify-center"><span className="px-3 bg-white dark:bg-dark-surface text-xs text-gray-400">or</span></div>
          </div>

          <Button variant="secondary" className="w-full" onClick={() => { loginDemo(); navigate('/calculate', { replace: true }); }}>
            🌿 Try Demo Mode
          </Button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account? <Link to="/login" className="text-forest-500 hover:text-forest-600 font-semibold">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
