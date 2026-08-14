"use client";

import { useState, useRef } from "react";

export default function Tabs() {
  const tabs = ["Overview", "Keyboard", "ARIA"];
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % tabs.length;
    }
    if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    }
    if (e.key === "Home") {
      newIndex = 0;
    }
    if (e.key === "End") {
      newIndex = tabs.length - 1;
    }

    setActiveTab(newIndex);
    tabRefs.current[newIndex]?.focus();
  };

  return (
    <div>
      {/* Tablist wrapper */}
      <div role="tablist" aria-label="Accessible component notes">
        {tabs.map((label, index) => (
          <button
            key={label}
            role="tab"
            id={`${label.toLowerCase()}-tab`}
            aria-controls={`${label.toLowerCase()}-panel`}
            aria-selected={activeTab === index}
            tabIndex={activeTab === index ? 0 : -1}
            ref={(el) => {(tabRefs.current[index] = el)}}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      {tabs.map((label, index) => (
        <div
          key={label}
          role="tabpanel"
          id={`${label.toLowerCase()}-panel`}
          aria-labelledby={`${label.toLowerCase()}-tab`}
          tabIndex={0}
          hidden={activeTab !== index}
        >
          <p>{label} content goes here.</p>
        </div>
      ))}
    </div>
  );
}
