import Image from "next/image";

export default function FabricsSection() {
  const categories = [
    {
      title: "Raw Denim",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
      description: "Premium raw denim for manufacturing",
      hoverColor: "from-blue-500/20 to-indigo-500/20",
    },
    {
      title: "Washed Denim",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
      description: "Pre-washed denim collections",
      hoverColor: "from-indigo-500/20 to-purple-500/20",
    },
    {
      title: "Stretch Denim",
      image:
        "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80",
      description: "Comfort stretch denim fabrics",
      hoverColor: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Custom Finishes",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
      description: "Specialized denim treatments",
      hoverColor: "from-pink-500/20 to-red-500/20",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Our Denim Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative card overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-64 relative">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${category.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>
              <div className="p-6 relative">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {category.description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-full btn-primary">
                    View Specifications
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
