import { useRef } from 'react';
import { getGradeForTons } from '@/utils/gradeSystem';
import { exportToPNG } from '@/utils/exportHelpers';
import Button from '@/components/ui/Button';
import { Download, Share2 } from 'lucide-react';

export default function CarbonCard({ result, user, badges = [] }) {
  const cardRef = useRef(null);

  if (!result) return null;

  const gradeInfo = getGradeForTons(result.total_annual_tons);

  const handleDownload = () => {
    exportToPNG(cardRef.current, `ecotrace-${user?.name || 'score'}.png`);
  };

  return (
    <div>
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl p-8"
        style={{
          width: '600px',
          height: '315px',
          background: 'linear-gradient(135deg, #0f3624 0%, #165235 50%, #1a6342 100%)',
        }}
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-forest-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-forest-400/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        {/* Logo */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-forest-400 text-lg">🌿</span>
          <span className="text-white/80 text-sm font-semibold">EcoTrace</span>
        </div>

        {/* Content */}
        <div className="flex items-center gap-8">
          {/* Grade */}
          <div className="text-center">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl font-black font-display"
              style={{
                background: `linear-gradient(135deg, ${gradeInfo.hex}22, ${gradeInfo.hex}44)`,
                color: gradeInfo.hex,
                border: `2px solid ${gradeInfo.hex}66`,
                boxShadow: `0 0 30px ${gradeInfo.hex}33`,
              }}
            >
              {gradeInfo.letter}
            </div>
            <p className="text-white/60 text-xs mt-2">{gradeInfo.label}</p>
          </div>

          {/* Stats */}
          <div className="flex-1">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Annual Carbon Footprint</p>
            <p className="text-white text-3xl font-bold mb-1">
              {result.total_annual_tons} <span className="text-lg font-normal text-white/60">tons CO₂e/year</span>
            </p>
            <p className="text-white/50 text-sm mb-3">
              {user?.name || 'EcoTrace User'}
            </p>

            {/* Badges */}
            <div className="flex gap-2">
              {badges.slice(0, 3).map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 text-white/80 text-xs"
                >
                  <span>{badge.icon}</span>
                  <span>{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-8 right-8 flex items-center justify-between">
          <p className="text-white/30 text-xs">ecotrace.app</p>
          <p className="text-white/30 text-xs">Join me on EcoTrace</p>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <Button onClick={handleDownload} icon={Download} size="sm">
          Download as PNG
        </Button>
        <Button variant="secondary" icon={Share2} size="sm" onClick={() => {
          if (navigator.share) {
            navigator.share({ title: 'My EcoTrace Score', text: `My carbon footprint is ${result.total_annual_tons} tons/year. Grade: ${gradeInfo.letter}!`, url: window.location.href });
          }
        }}>
          Share
        </Button>
      </div>
    </div>
  );
}
