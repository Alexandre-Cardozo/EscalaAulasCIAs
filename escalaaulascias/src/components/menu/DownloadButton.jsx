import React from 'react';
import { Download } from 'lucide-react';

export default function DownloadButton({ onClick, label = "Baixar PDF" }) {
  return (
    <button
      onClick={onClick}
      aria-label="gerar-pdf"
      title={label}
      className="download-button"
      style={{ height: "48px", width: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Download size={22} />
    </button>
  );
}