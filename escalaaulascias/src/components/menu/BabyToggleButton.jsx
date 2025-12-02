import React from "react";
import { Baby } from "lucide-react";

export default function BabyToggleButton({ isActive, onChange, label = "Bebês" }) {
  return (
    <button
      onClick={() => onChange(!isActive)}
      className={`baby-toggle-button ${isActive ? "active" : ""}`}
      aria-label={label}
      title={label}
      style={{ height: "48px", width: "48px" }}
    >
      <Baby size={22} />
    </button>
  );
}
