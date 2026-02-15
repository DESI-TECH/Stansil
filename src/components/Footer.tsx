import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-steel-gradient text-steel-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center font-cursive text-primary-foreground text-lg">
                S
              </div>
              <div>
                <h3 className="text-xl font-cursive">Stelin</h3>
                <p className="text-[10px] text-gold tracking-[0.2em] uppercase">Global Kitchenware</p>
              </div>
            </div>
            <p className="text-sm text-steel-foreground/60 leading-relaxed">
              Premium stainless steel kitchenware and food processing equipment. Trusted by businesses worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-steel-foreground/60">
              <li><Link to="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-gold transition-colors">Products</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Get Quote</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-gold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-steel-foreground/60">
              <li>Cookware</li>
              <li>Storage Containers</li>
              <li>Serving Ware</li>
              <li>Commercial Kitchen</li>
              <li>Food Processing</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-gold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-steel-foreground/60">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold" />
                <span>Gala No. 5, Amar Estate, Navghar Road, Bhayander East 401105, Thane, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-gold" />
                <span>+91 97935 41467</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-gold" />
                <span>pravins.gpt@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-steel-foreground/10 mt-10 pt-6 text-center text-xs text-steel-foreground/40">
          © 2026 Stelin Global. All rights reserved. | Exporting Quality Worldwide 🌍
        </div>
      </div>
    </footer>
  );
};

export default Footer;
