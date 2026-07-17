"use client";
import ImageLightbox from "./properties/ImageLightbox";
import Image from "next/image";
import { useState } from "react";

type PropertyGalleryProps = {
  images: string[];
};

export default function PropertyGallery({
  images,
}: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] =
  useState(0);

const [lightboxOpen, setLightboxOpen] =
  useState(false);

  return (
  <div className="grid gap-3 md:grid-cols-3">
    {/* Main Image */}
    <button
      type="button"
      onClick={() => setLightboxOpen(true)}
      className="md:col-span-2"
    >
      <Image
        src={images[selectedIndex]}
        alt="Property"
        width={1200}
        height={800}
        className="h-[500px] w-full rounded-2xl object-cover transition hover:brightness-95"
      />
    </button>

    {/* Side Images */}
    <div className="grid gap-3">
      {images.slice(1, 5).map((image, index) => (
        <button
          key={index}
          type="button"
          onClick={() => {
  setSelectedIndex(index + 1);
  setLightboxOpen(true);
}}
          className={`overflow-hidden rounded-2xl border-2 transition ${
            selectedIndex === index + 1
              ? "border-blue-600"
              : "border-transparent"
          }`}
        >
          <Image
            src={image}
            alt={`Property ${index + 2}`}
            width={500}
            height={250}
            className="h-[120px] w-full object-cover transition hover:scale-105"
          />
        </button>
      ))}
    </div>
  <ImageLightbox
  images={images}
  initialIndex={selectedIndex}
  open={lightboxOpen}
  onClose={() => setLightboxOpen(false)}
/>
  </div>
);
}