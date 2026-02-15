import { Link } from "react-router-dom";
import { ArrowRight, Globe, Shield, Truck } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { categories } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";

const Index = () => {
  const { data: products = [] } = useProducts();
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
        <img src={heroBanner} alt="Premium Steel Kitchenware" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-steel-dark/90 via-steel-dark/70 to-transparent" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl animate-fade-in">
            <p className="text-gold font-medium tracking-[0.3em] uppercase text-sm mb-3">Global Steel Manufacturer</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-steel-foreground leading-tight mb-4">
              Premium <span className="text-gradient-gold">Steel</span> Kitchenware
            </h1>
            <p className="text-steel-foreground/70 text-lg mb-8 leading-relaxed">
              High-quality stainless steel cookware, containers, and commercial kitchen equipment. Trusted by businesses in 40+ countries.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products" className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-gold">
                View Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border border-steel-foreground/30 text-steel-foreground font-semibold px-6 py-3 rounded-lg hover:border-gold hover:text-gold transition-colors">
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-steel-gradient py-6">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Globe, title: "Global Export", desc: "Shipping to 40+ countries" },
            { icon: Shield, title: "Food Grade Steel", desc: "SS 304 & SS 201 certified" },
            { icon: Truck, title: "Bulk Orders", desc: "Competitive lump sum pricing" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3 text-steel-foreground">
              <item.icon className="w-8 h-8 text-gold shrink-0" />
              <div>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-steel-foreground/60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-display font-bold text-foreground text-center mb-2">Product Categories</h2>
        <p className="text-muted-foreground text-center mb-10">Browse our complete range of steel kitchenware & food equipment</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="bg-card rounded-lg p-5 text-center hover:shadow-gold transition-all hover:-translate-y-1 group"
            >
              <span className="text-3xl block mb-2">{cat.icon}</span>
              <p className="text-sm font-medium text-card-foreground group-hover:text-gold transition-colors">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-2">Featured Products</h2>
          <p className="text-muted-foreground text-center mb-10">Our best-selling steel kitchenware with complete specifications</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/products" className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-gold">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-steel-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-steel-foreground mb-4">Ready to Place a Bulk Order?</h2>
          <p className="text-steel-foreground/60 mb-8 max-w-xl mx-auto">
            Get competitive lump sum pricing for bulk orders. We export worldwide with reliable shipping partners.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-gold">
            Request Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
