import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useRouter } from "next/router";

export default function Header({ locations = [], products = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cityDropdown, setCityDropdown] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleCitySelect = (slug) => {
    setMenuOpen(false);
    setCityDropdown(false);
    router.push(`/${slug}`);
  };

  const handleProductSelect = (citySlug, productSlug) => {
    setMenuOpen(false);
    setProductDropdown(false);
    router.push(`/${citySlug}/${productSlug}`);
  };

  // Utility function to capitalize the first letter
  function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // Get unique cities from locations
  const getUniqueCities = () => {
    const citiesMap = new Map();
    locations.forEach(location => {
      if (location.city && location.slug) {
        citiesMap.set(location.city.name, {
          name: location.city.name,
          slug: location.slug
        });
      }
    });
    return Array.from(citiesMap.values());
  };

  const uniqueCities = getUniqueCities();

  const navLinks = [
    { id: "features", label: "Features" },
    { id: "fabrics", label: "Our Fabrics" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white"
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <img
              src="/logo.svg"
              alt="Amrita Global Enterprise Logo"
              className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300"
              onError={e => { 
                e.target.style.display = 'none'; 
                e.target.parentNode.insertAdjacentHTML('beforeend', '<span class="text-xl font-bold">AGE</span>'); 
              }}
            />
            <span className="text-xl font-bold gradient-text">
              Amrita Global Enterprises
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <button
                className="flex items-center gap-1 bg-transparent text-gray-700 hover:text-purple-700 font-semibold transition-colors duration-300"
                onClick={() => setProductDropdown((v) => !v)}
                type="button"
                aria-expanded={productDropdown}
                aria-haspopup="true"
              >
                Products <ChevronDown size={18} className={`transition-transform duration-300 ${productDropdown ? 'rotate-180' : ''}`} />
              </button>
              {productDropdown && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-purple-100 z-50 max-h-96 overflow-y-auto animate-fade-in">
                  {products.map((product) => (
                    <button
                      key={product.slug}
                      className="flex items-start gap-3 w-full text-left px-4 py-3 hover:bg-purple-50 text-gray-700 border-b last:border-b-0 border-purple-50 transition-colors duration-300"
                      onClick={() => handleProductSelect(uniqueCities[0]?.slug || 'ahmedabad', product.slug)}
                    >
                      <img
                        src={product.logoUrl || '/favicon.ico'}
                        alt={product.name}
                        className="w-10 h-10 rounded-full object-cover border border-purple-200 bg-white"
                        onError={e => e.target.src = '/favicon.ico'}
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-base">{capitalizeFirst(product.name)}</div>
                        <div className="text-xs text-gray-500 line-clamp-2">{product.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href="/about" className="text-gray-700 hover:text-purple-700 font-semibold transition-colors duration-300">
              About
            </a>
            <a href="/contact" className="text-gray-700 hover:text-purple-700 font-semibold transition-colors duration-300">
              Contact
            </a>
            <button className="btn-primary">
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-purple-700 transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-2 px-4 bg-white/90 rounded-lg shadow-lg py-4 animate-fade-in">
            <div className="relative group">
              <button
                className="flex items-center gap-1 bg-transparent text-gray-700 hover:text-purple-700 font-semibold transition-colors duration-300"
                onClick={() => setProductDropdown((v) => !v)}
                type="button"
                aria-expanded={productDropdown}
                aria-haspopup="true"
              >
                Products <ChevronDown size={18} className={`transition-transform duration-300 ${productDropdown ? 'rotate-180' : ''}`} />
              </button>
              {productDropdown && (
                <div className="mt-2 w-full bg-white rounded-lg shadow-lg border border-purple-100 z-50 max-h-96 overflow-y-auto animate-slide-up">
                  {products.map((product) => (
                    <button
                      key={product.slug}
                      className="flex items-start gap-3 w-full text-left px-4 py-3 hover:bg-purple-50 text-gray-700 border-b last:border-b-0 border-purple-50 transition-colors duration-300"
                      onClick={() => handleProductSelect(uniqueCities[0]?.slug || 'ahmedabad', product.slug)}
                    >
                      <img
                        src={product.logoUrl || '/favicon.ico'}
                        alt={product.name}
                        className="w-10 h-10 rounded-full object-cover border border-purple-200 bg-white"
                        onError={e => e.target.src = '/favicon.ico'}
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-base">{capitalizeFirst(product.name)}</div>
                        <div className="text-xs text-gray-500 line-clamp-2">{product.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href="/about" className="text-gray-700 hover:text-purple-700 font-semibold transition-colors duration-300">
              About
            </a>
            <a href="/contact" className="text-gray-700 hover:text-purple-700 font-semibold transition-colors duration-300">
              Contact
            </a>
            <button className="btn-primary">
              Get Quote
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
