import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const [search, setSearch] = useState("");
  const { data: products = [], isLoading } = useProducts();

  const filtered = products.filter((p) => {
    const matchCat = !categoryFilter || p.category === categoryFilter;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-steel-gradient py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-display font-bold text-steel-foreground mb-2">Our Products</h1>
          <p className="text-steel-foreground/60">Complete range with detailed specifications</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 items-center">
          <Link
            to="/products"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !categoryFilter ? "bg-gold text-primary-foreground" : "bg-card text-card-foreground hover:bg-muted"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                categoryFilter === cat.id ? "bg-gold text-primary-foreground" : "bg-card text-card-foreground hover:bg-muted"
              }`}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-auto px-4 py-2 rounded-lg border border-border bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold w-full md:w-64"
          />
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No products found.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;
