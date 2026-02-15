import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone, Mail, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/contact", label: "Get Quote" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-steel-gradient backdrop-blur-sm">
      {/* Top bar */}
      <div className="border-b border-steel-foreground/10">
        <div className="container mx-auto px-4 py-1.5 flex justify-between items-center text-xs text-steel-foreground/70">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 97935 41467</span>
            <span className="hidden sm:flex items-center gap-1"><Mail className="w-3 h-3" /> pravins.gpt@gmail.com</span>
          </div>
          <span>🌍 Global Shipping Available</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center font-cursive text-primary-foreground text-lg">
            S
          </div>
          <div>
            <h1 className="text-xl font-cursive text-steel-foreground">Stelin</h1>
            <p className="text-[10px] text-gold tracking-[0.2em] uppercase">Global Kitchenware</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                location.pathname === link.to ? "text-gold" : "text-steel-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/cart" className="relative text-steel-foreground/80 hover:text-gold transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-steel-foreground"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="md:hidden border-t border-steel-foreground/10 bg-steel-dark">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block px-6 py-3 text-sm font-medium border-b border-steel-foreground/5 transition-colors hover:bg-steel/50 ${
                location.pathname === link.to ? "text-gold" : "text-steel-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
