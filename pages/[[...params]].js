import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../component/Header";

// Utility function to capitalize the first letter
function capitalizeFirst(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function CityProductPage() {
  const router = useRouter();
  const { params } = router.query;

  const [city, setCity] = useState("Paldi");
  const [product, setProduct] = useState("Fabric");
  const [locations, setLocations] = useState([]);
  const [products, setProducts] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Multi-step form state
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formError, setFormError] = useState("");
  const [inquiryId, setInquiryId] = useState(null);
  const formFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your Name",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Phone",
      name: "phone",
      type: "tel",
      placeholder: "Enter your phone number",
    },
    {
      label: "Message",
      name: "message",
      type: "textarea",
      placeholder: "Type your message",
    },
  ];

  // Validation logic
  function validateField(name, value) {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return "";
      case "email":
        if (!value.trim()) return "Email is required.";
        // Simple email regex
        if (!/^\S+@\S+\.\S+$/.test(value.trim())) return "Enter a valid email address.";
        return "";
      case "phone":
        if (!value.trim()) return "Phone is required.";
        if (!/^\d{10,}$/.test(value.trim().replace(/\D/g, ""))) return "Enter a valid phone number (10+ digits).";
        return "";
      case "message":
        if (!value.trim()) return "Message is required.";
        if (value.trim().length < 10) return "Message must be at least 10 characters.";
        return "";
      default:
        return "";
    }
  }

  // Fetch locations and product data from APIs
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [locationRes, productRes] = await Promise.all([
          fetch("https://langingpage-production-f27f.up.railway.app/api/locations"),
          fetch("https://langingpage-production-f27f.up.railway.app/api/products"),
        ]);
        const locationData = await locationRes.json();
        const productData = await productRes.json();
        setLocations(locationData);
        setProducts(productData);

        // Handle URL parameters for dynamic routing
        if (params && params.length >= 2) {
          const citySlug = params[0];
          const productSlug = params[1];

          // Find location by slug
          const foundLocation = locationData.find(
            (loc) => loc.slug === citySlug
          );
          if (foundLocation && foundLocation.name) {
            setCity(foundLocation.name);
          } else {
            // If location not found, try to find by location name directly
            const locationBySlugName = locationData.find(
              (loc) =>
                loc.name &&
                loc.name.toLowerCase() === citySlug.toLowerCase()
            );
            if (locationBySlugName && locationBySlugName.name) {
              setCity(locationBySlugName.name);
            } else {
              setCity("Paldi"); // Default fallback
            }
          }

          // Find product by slug
          const foundProduct = productData.find(
            (prod) => prod.slug === productSlug
          );
          if (foundProduct && foundProduct.name) {
            setProduct(foundProduct.name);
            setDescription(foundProduct.description || "");
          } else {
            setProduct("Fabric"); // Default fallback
            setDescription("Premium fabric solutions for your business needs");
          }
        } else if (params && params.length === 1) {
          // Handle case: /[slug] (e.g., /isanpur)
          const citySlug = params[0];
          // Find location by slug
          const foundLocation = locationData.find(
            (loc) => loc.slug === citySlug
          );
          if (foundLocation && foundLocation.name) {
            setCity(foundLocation.name);
          } else {
            // If location not found, try to find by location name directly
            const locationBySlugName = locationData.find(
              (loc) =>
                loc.name &&
                loc.name.toLowerCase() === citySlug.toLowerCase()
            );
            if (locationBySlugName && locationBySlugName.name) {
              setCity(locationBySlugName.name);
            } else {
              setCity("Paldi"); // Default fallback if slug not matched
            }
          }
          setProduct("Fabric"); // Default product
          setDescription("Premium fabric solutions for your business needs");
        } else {
          // Default values
          setCity("Paldi");
          setProduct("Fabric");
          setDescription("Premium fabric solutions for your business needs");
        }
      } catch (err) {
        setCity("Paldi");
        setProduct("Fabric");
        setDescription("Premium fabric solutions for your business needs");
      }
      setLoading(false);
    }

    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady, params]);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80",
      title: "Premium Denim Collection",
      description: "Wholesale denim fabrics for manufacturers and brands",
    },
    {
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80",
      title: "Bulk Manufacturing",
      description: "Custom denim solutions for your business",
    },
    {
      image:
        "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1200&q=80",
      title: "Quality Assured",
      description: "Industry-leading quality control and testing",
    },
  ];

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  // Multi-step form handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(validateField(name, value));
  };

  const saveInquiryStep = async (data, step) => {
    const res = await fetch('https://langingpage-production-f27f.up.railway.app/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, step, id: inquiryId }),
    });
    const inquiry = await res.json();
    if (inquiry._id) setInquiryId(inquiry._id);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const field = formFields[formStep];
    const error = validateField(field.name, formData[field.name]);
    setFormError(error);
    if (!error && formStep < formFields.length - 1) {
      await saveInquiryStep(formData, formStep);
      setFormStep((s) => s + 1);
    }
  };

  const handlePrev = async (e) => {
    e.preventDefault();
    setFormError("");
    if (formStep > 0) {
      await saveInquiryStep(formData, formStep);
      setFormStep((s) => s - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const field = formFields[formStep];
    const error = validateField(field.name, formData[field.name]);
    setFormError(error);
    if (!error) {
      await saveInquiryStep(formData, formStep);
      setShowInquiryForm(false);
      setFormStep(0);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setInquiryId(null);
      alert("Inquiry submitted!");
    }
  };

  return (
    <>
      <Head>
        <title>
          {`Amrita Global Enterprises | Premium ${capitalizeFirst(
            product
          )} in ${capitalizeFirst(city)}`}
        </title>
        <meta
          name="description"
          content={`Premium ${capitalizeFirst(
            product
          )} solutions by Amrita Global Enterprises in ${capitalizeFirst(
            city
          )}. Quality fabrics, denim, and turf products for your business.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#9333ea" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </Head>

      <div className="min-h-screen bg-white text-gray-800">
        <Header locations={locations} products={products} />

        {/* Product Dropdown - below header */}
        <div className="my-4 flex justify-center">
          <select
            value={product}
            onChange={async (e) => {
              const selectedProduct = e.target.value;
              // Find the slug for the selected product
              const selectedProductObj = products.find(
                (prod) => prod.name === selectedProduct
              );
              const productSlug = selectedProductObj ? selectedProductObj.slug : "fabric";
              // Find the slug for the current city
              const currentLocationObj = locations.find(
                (loc) => loc.name === city
              );
              const citySlug = currentLocationObj ? currentLocationObj.slug : "paldi";
              // Update the URL
              await router.push(
                `/${citySlug}/${productSlug}`,
                undefined,
                { shallow: true }
              );
              setProduct(selectedProduct);
              setDescription(selectedProductObj?.description || "");
            }}
            className="border rounded px-4 py-2"
          >
            {products.map((prod) => (
              <option key={prod.slug} value={prod.name}>
                {prod.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sticky WhatsApp Button */}
        <a
          href="https://wa.me/911234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Chat on WhatsApp"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-green-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
          </div>
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat with us
          </div>
        </a>

        {/* Business Inquiry Button - left center, hidden when modal open */}
        {!showInquiryForm && (
          <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <button
                onClick={() => { setShowInquiryForm(true); setFormStep(0); }}
                className="relative bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
                aria-label="Business Inquiry"
              >
                {/* Message Icon (Heroicons outline chat bubble) */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Business Inquiry Multi-step Form - left side center modal, no left margin */}
        {showInquiryForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-start p-4 animate-fade-in">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative animate-scale-in shadow-xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75"></div>
              <div className="relative bg-white rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Business Inquiry</h3>
                  <button
                    onClick={() => setShowInquiryForm(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Only show one field at a time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {formFields[formStep].label}
                    </label>
                    {formFields[formStep].type === "textarea" ? (
                      <textarea
                        name={formFields[formStep].name}
                        rows={4}
                        placeholder={formFields[formStep].placeholder}
                        value={formData[formFields[formStep].name]}
                        onChange={handleFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-300"
                        autoFocus
                      />
                    ) : (
                      <input
                        type={formFields[formStep].type}
                        name={formFields[formStep].name}
                        placeholder={formFields[formStep].placeholder}
                        value={formData[formFields[formStep].name]}
                        onChange={handleFormChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-300"
                        autoFocus
                      />
                    )}
                    {formError && (
                      <p className="text-red-500 text-xs mt-1">{formError}</p>
                    )}
                  </div>
                  <div className="flex justify-between mt-6">
                    {formStep > 0 ? (
                      <button
                        onClick={handlePrev}
                        className="btn-secondary px-6 py-2 rounded-full"
                        type="button"
                      >
                        Prev
                      </button>
                    ) : <span />}
                    {formStep < formFields.length - 1 ? (
                      <button
                        onClick={handleNext}
                        className="btn-primary px-6 py-2 rounded-full"
                        type="button"
                        disabled={!!validateField(formFields[formStep].name, formData[formFields[formStep].name])}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        className="btn-primary px-6 py-2 rounded-full"
                        type="submit"
                        disabled={!!validateField(formFields[formStep].name, formData[formFields[formStep].name])}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Image Slider Section */}
        <section className="relative h-[80vh] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
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
                  {capitalizeFirst(city)} {capitalizeFirst(product)}
                </h1>
                <p className="text-xl mb-8 text-gray-200">
                  {slides[currentSlide].description}
                </p>
                <button className="btn-primary text-lg px-8 py-4">
                  Request Wholesale Quote
                </button>
              </div>
            </div>
          </div>

          {/* Slider Navigation */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-white scale-125" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slider Arrows */}
          <button
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + slides.length) % slides.length
              )
            }
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % slides.length)
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </section>

        {/* B2B Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Why Partner With Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Bulk Manufacturing",
                  description:
                    "Large-scale denim production with consistent quality",
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
              ].map((feature, index) => (
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

        {/* Product Categories Section */}
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

        {/* Product Description Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center card p-10 border border-purple-100 animate-fade-in">
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 text-white text-4xl shadow-lg">
                  🧵
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2 text-purple-700">
                Product Description
              </h2>
              <p className="text-lg text-gray-500 mb-6">
                {description ||
                  `Discover the unique features and benefits of our premium ${capitalizeFirst(
                    product
                  )} collections. Our products are crafted for durability, comfort, and style, making them the perfect choice for businesses seeking quality and innovation.`}
              </p>
              <button className="btn-primary">Learn More</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">
                  Amrita Global Enterprises
                </h3>
                <p className="text-gray-400">
                  Your trusted partner in premium fabrics and materials.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Phone: +91 1234567890</li>
                  <li>Email: info@amritaglobal.com</li>
                  <li>Address: Your Address Here</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 group"
                    aria-label="Facebook"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-blue-600 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-gray-800 p-3 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 group"
                    aria-label="Twitter"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-blue-400 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-gray-800 p-3 rounded-full group-hover:bg-blue-400 transition-colors duration-300">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 group"
                    aria-label="Instagram"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-gray-800 p-3 rounded-full group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:via-pink-600 group-hover:to-orange-500 transition-colors duration-300">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>
                © {new Date().getFullYear()} Amrita Global Enterprises. All
                rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
