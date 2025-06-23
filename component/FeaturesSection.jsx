// FeaturesSection.jsx
import { motion } from "framer-motion";
import { CheckCircle, Briefcase, Mail } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Bulk Manufacturing",
      description: "Large-scale denim production with consistent quality",
      icon: "🏭",
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Custom Solutions",
      description: "Tailored denim specifications for your brand",
      icon: "🎯",
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Quality Assurance",
      description: "Rigorous testing and quality control processes",
      icon: "✨",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Partner With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-8 card animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div
                className={`text-4xl mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
