import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportToPNG(elementRef, filename = 'ecotrace-carbon-card.png') {
  if (!elementRef) return;
  try {
    const canvas = await html2canvas(elementRef, {
      scale: 2,
      backgroundColor: '#0f3624',
      useCORS: true,
      logging: false,
    });
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('Failed to export PNG:', err);
    throw err;
  }
}

export async function exportToPDF(elementRef, filename = 'ecotrace-report.pdf') {
  if (!elementRef) return;
  try {
    const canvas = await html2canvas(elementRef, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  } catch (err) {
    console.error('Failed to export PDF:', err);
    throw err;
  }
}

export function exportToCSV(data, filename = 'ecotrace-data.csv') {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];

  for (const row of data) {
    const values = headers.map((h) => {
      const val = row[h];
      if (typeof val === 'string') return `"${val.replace(/"/g, '""')}"`;
      if (val instanceof Date) return `"${val.toISOString()}"`;
      if (typeof val === 'object' && val !== null) return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
      return val ?? '';
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function formatFootprintForCSV(footprints) {
  return footprints.map((fp) => ({
    date: fp.submitted_at || fp.date,
    total_tons: fp.results?.total_annual_tons || fp.total_annual_tons,
    home_energy_kg: fp.results?.breakdown?.home_energy || fp.breakdown?.home_energy || 0,
    transport_kg: fp.results?.breakdown?.transport || fp.breakdown?.transport || 0,
    flights_kg: fp.results?.breakdown?.flights || fp.breakdown?.flights || 0,
    food_kg: fp.results?.breakdown?.food || fp.breakdown?.food || 0,
    lifestyle_kg: fp.results?.breakdown?.lifestyle || fp.breakdown?.lifestyle || 0,
    grade: fp.results?.grade || fp.grade,
  }));
}
