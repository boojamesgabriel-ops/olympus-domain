import { useState } from "react";

export default function Disclosure() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        aria-expanded={isOpen}
        aria-controls="disclosure-panel"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide details" : "Show details"}
      </button>

      {/* Content Panel */}
      {isOpen && (
        <div id="disclosure-panel">
          Content goes here.
        </div>
      )}
    </div>
  );
}
