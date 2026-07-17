"use client";
import { useEffect, useState } from "react";

type ImageLightboxProps = {
  images: string[];
  initialIndex: number;
  open: boolean;
  onClose: () => void;
};

export default function ImageLightbox({
  images,
  initialIndex,
  open,
  onClose,
}: ImageLightboxProps) {
  if (!open) return null;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }

      if (event.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();

          setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1,
          );
        }}
        className="absolute left-6 rounded-full bg-white/20 p-4 text-3xl text-white backdrop-blur transition hover:bg-white/30"
      >
        ←
      </button>

      <img
        src={images[currentIndex]}
        alt="Property"
        className="
          max-h-[90vh]
          max-w-[90vw]
          rounded-xl
          object-contain
          shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();

          setCurrentIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1,
          );
        }}
        className="absolute right-6 rounded-full bg-white/20 p-4 text-3xl text-white backdrop-blur transition hover:bg-white/30"
      >
        →
      </button>

      <div className="absolute bottom-6 rounded-full bg-black/60 px-4 py-2 text-white">
        {currentIndex + 1} / {images.length}
      </div>
      <button
        onClick={onClose}
        className="absolute right-6 top-6 text-4xl text-white"
      >
        ×
      </button>
    </div>
  );
}
