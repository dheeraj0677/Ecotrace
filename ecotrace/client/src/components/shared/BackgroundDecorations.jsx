import { motion } from 'framer-motion';
import { Leaf, Globe, Wind, Sprout } from 'lucide-react';

export default function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* Glow Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-br from-forest-200/20 to-emerald-300/10 blur-[120px] dark:from-forest-900/30 dark:to-emerald-900/10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tr from-sky-200/20 to-forest-100/20 blur-[150px] dark:from-sky-900/10 dark:to-forest-900/10" />
      <div className="absolute top-[40%] left-[20%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-r from-yellow-100/15 to-orange-100/10 blur-[100px] dark:from-yellow-900/5 dark:to-orange-900/5" />

      {/* Floating Interactive Watermark Icons */}
      <motion.div
        className="absolute top-[15%] left-[5%] text-forest-600/5 dark:text-forest-400/5"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Leaf className="w-24 h-24" strokeWidth={1} />
      </motion.div>

      <motion.div
        className="absolute top-[65%] right-[8%] text-sky-600/5 dark:text-sky-400/5"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <Globe className="w-32 h-32" strokeWidth={0.8} />
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] left-[10%] text-forest-500/5 dark:text-forest-300/5"
        animate={{
          y: [0, -12, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      >
        <Sprout className="w-20 h-20" strokeWidth={1} />
      </motion.div>

      <motion.div
        className="absolute top-[40%] right-[15%] text-emerald-500/5 dark:text-emerald-400/5"
        animate={{
          y: [0, -18, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      >
        <Wind className="w-28 h-28" strokeWidth={0.8} />
      </motion.div>

      <motion.div
        className="absolute top-[80%] left-[30%] text-forest-600/5 dark:text-forest-400/4"
        animate={{
          y: [0, 15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      >
        <Leaf className="w-16 h-16" strokeWidth={1.2} />
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
