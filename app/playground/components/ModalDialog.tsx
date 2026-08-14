"use client";

import { useRef, useState, useEffect } from "react";

export default function ModalDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const closeModal = () => {
    setIsOpen(false);
    openButtonRef.current?.focus(); 
  };


  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements[0]?.focus();
  }, [isOpen]);

  return (
    <section>
      <h2>Modal Dialog</h2>

      <button
        type="button"
        ref={openButtonRef}
        onClick={() => setIsOpen(true)}
      >
        Open modal
      </button>

      {isOpen && (
        <div
          role="dialog"
          ref={dialogRef}
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <h3 id="modal-title">Review accessibility settings</h3>

          <p id="modal-description">
            This dialog is for practicing keyboard focus management.
          </p>

          <button type="button" onClick={closeModal}>
            Close
          </button>
        </div>
      )}
    </section>
  );
}
