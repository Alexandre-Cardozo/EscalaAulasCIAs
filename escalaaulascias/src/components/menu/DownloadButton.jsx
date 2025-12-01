import React from 'react';
import { Download } from 'lucide-react';

export default function DownloadButton({ onClick, label = "Baixar PDF" }) {
  return (
    <button
      onClick={onClick}
      aria-label="gerar-pdf"
      title={label}
      className="download-button"
    >
      <Download size={20} />
    </button>
  );
}