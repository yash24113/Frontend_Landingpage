"use client"; // if using Next.js 13+ app directory

import Image from "next/image";

export default function HeroSection({ city, product, description }) {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80"
          alt="Premium fabric background"
          fill
          className="object-cover transition-opacity duration-500"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white animate-slide-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Premium {product} in {city}
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              {description || "Discover the finest quality fabrics for your business needs. Trusted by manufacturers worldwide."}
            </p>
            <button className="btn-primary text-lg px-8 py-4">
              Request Wholesale Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
