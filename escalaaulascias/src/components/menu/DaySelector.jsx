import React, { useState, useRef, useEffect } from "react";
import { CalendarDays, ChevronRight } from "lucide-react";

export default function DaySelector({ isBebesOn }) {
  const [classDays, setClassDays] = useState({
    Bebês: 0,
    Crianças: 0,
    Intermediários: 0,
    Adolescentes: 0,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [subMenuPosition, setSubMenuPosition] = useState({ top: 0, left: 0 });

  const dropdownRef = useRef(null);
  const classItemRefs = useRef({});

  const baseClassList = ["Bebês", "Crianças", "Intermediários", "Adolescentes"];
  const classList = isBebesOn ? baseClassList : baseClassList.filter((className) => className !== "Bebês");

  const daysOptions = [
    { value: 0, label: "Domingo" },
    { value: 1, label: "Segunda" },
    { value: 2, label: "Terça" },
    { value: 3, label: "Quarta" },
    { value: 4, label: "Quinta" },
    { value: 5, label: "Sexta" },
    { value: 6, label: "Sábado" },
  ];

  const getDayName = (dayValue) => {
    return daysOptions.find((d) => d.value === dayValue)?.label || "Domingo";
  };

  const handleDayChange = (className, dayValue) => {
    setClassDays((prev) => ({
      ...prev,
      [className]: parseInt(dayValue),
    }));
    setSelectedClass(null);
  };

  const handleClassHover = (className, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSubMenuPosition({
      top: rect.top,
      left: rect.right + 4,
    });
    setSelectedClass(className);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedClass(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          height: "36px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "0 12px",
          fontSize: "0.875rem",
          fontWeight: "500",
          color: "hsl(var(--foreground))",
          backgroundColor: "white",
          border: "1px solid hsl(var(--border))",
          borderRadius: "0.5rem",
          cursor: "pointer",
          transition: "all 0.2s",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
          e.currentTarget.style.color = "hsl(var(--primary))";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "white";
          e.currentTarget.style.color = "hsl(var(--foreground))";
        }}
      >
        <CalendarDays size={16} />
        <span style={{ display: window.innerWidth >= 1024 ? "inline" : "none" }}>Dias da Semana</span>
      </button>

      {isOpen && (
        <>
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              width: "224px",
              backgroundColor: "white",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              zIndex: 50,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "6px 8px",
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "hsl(var(--foreground))",
                borderBottom: "1px solid hsl(var(--border))",
              }}
            >
              Configuração por Classe
            </div>

            <div style={{ padding: "4px 0" }}>
              {classList.map((className) => (
                <div
                  key={className}
                  ref={(el) => (classItemRefs.current[className] = el)}
                  onMouseEnter={(e) => handleClassHover(className, e)}
                  onMouseLeave={() => setSelectedClass(null)}
                  style={{
                    padding: "8px 12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    transition: "background-color 0.2s",
                    backgroundColor: selectedClass === className ? "hsl(var(--accent))" : "transparent",
                  }}
                  onMouseMove={(e) => {
                    if (selectedClass !== className) {
                      handleClassHover(className, e);
                    }
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
                    <span style={{ fontWeight: "500" }}>{className}</span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "hsl(var(--muted-foreground))",
                        fontWeight: "400",
                      }}
                    >
                      {getDayName(classDays[className])}
                    </span>
                  </div>
                  <ChevronRight size={16} style={{ opacity: 0.5 }} />
                </div>
              ))}
            </div>
          </div>

          {selectedClass && (
            <div
              style={{
                position: "fixed",
                top: `${subMenuPosition.top}px`,
                left: `${subMenuPosition.left}px`,
                width: "160px",
                backgroundColor: "white",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                zIndex: 51,
                overflow: "hidden",
                padding: "4px 0",
              }}
              onMouseEnter={() => setSelectedClass(selectedClass)}
              onMouseLeave={() => setSelectedClass(null)}
            >
              {daysOptions.map((day) => (
                <button
                  key={day.value}
                  onClick={() => handleDayChange(selectedClass, day.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.875rem",
                    border: "none",
                    backgroundColor: classDays[selectedClass] === day.value ? "hsl(var(--accent))" : "transparent",
                    color: "hsl(var(--foreground))",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background-color 0.2s",
                    fontWeight: classDays[selectedClass] === day.value ? "500" : "400",
                  }}
                  onMouseEnter={(e) => {
                    if (classDays[selectedClass] !== day.value) {
                      e.currentTarget.style.backgroundColor = "hsl(var(--accent))";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (classDays[selectedClass] !== day.value) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <span>{day.label}</span>
                  {classDays[selectedClass] === day.value && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="8" cy="8" r="3" fill="currentColor" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
