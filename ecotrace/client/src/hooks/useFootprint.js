import { useMemo } from 'react';
import useCalculatorStore from '@/store/calculatorStore';
import useDashboardStore from '@/store/dashboardStore';
import { generateInsights } from '@/utils/insightEngine';
import { getGradeForTons } from '@/utils/gradeSystem';

export default function useFootprint() {
  const { history, getLatestResult } = useCalculatorStore();
  const { getTotalCO2Saved, pledgedActions } = useDashboardStore();

  const latest = useMemo(() => getLatestResult(), [history]);

  const gradeInfo = useMemo(() => {
    if (!latest) return null;
    return getGradeForTons(latest.total_annual_tons);
  }, [latest]);

  const insights = useMemo(() => {
    if (!latest) return [];
    return generateInsights(latest);
  }, [latest]);

  const totalSaved = getTotalCO2Saved();

  const monthlyData = useMemo(() => {
    if (history.length === 0) return [];
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthLabel = d.toLocaleDateString('en-US', { month: 'short' });
      const entry = history.find((h) => {
        const hd = new Date(h.date);
        return hd.getMonth() === d.getMonth() && hd.getFullYear() === d.getFullYear();
      });
      months.push({
        month: monthLabel,
        tons: entry ? entry.total_annual_tons : latest ? latest.total_annual_tons * (1 + (i * 0.02)) : 0,
      });
    }
    return months;
  }, [history, latest]);

  return {
    latest,
    gradeInfo,
    insights,
    totalSaved,
    pledgedActions,
    history,
    monthlyData,
    hasData: !!latest,
  };
}
