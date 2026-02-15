import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProduct } from "@/hooks/useProducts";
import { ArrowLeft, Ruler, Weight, Layers, Box, ChevronLeft, ChevronRight, ShoppingCart, Check, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, product.moq);
    setAdded(true);
    toast({ title: "Added to Cart! 🛒", description: `${product.name} × ${product.moq} pcs` });
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground text-lg">Product not found.</p>
          <Link to="/products" className="text-gold underline mt-4 inline-block">Back to Products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-card rounded-lg overflow-hidden relative shadow-steel">
              <img
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-secondary/80 backdrop-blur-sm text-secondary-foreground w-8 h-8 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentImage((prev) => (prev + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-secondary/80 backdrop-blur-sm text-secondary-foreground w-8 h-8 rounded-full flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                      i === currentImage ? "border-gold" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-xs mb-2">{product.category}</p>
            <h1 className="text-3xl font-display font-bold text-foreground mb-3">{product.name}</h1>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Price */}
            <div className="bg-card rounded-lg p-5 shadow-steel mb-6">
              <div className="flex items-end gap-2 mb-1">
                <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
                <span className="text-sm text-muted-foreground">/ piece (Lump Sum)</span>
              </div>
              <p className="text-sm text-muted-foreground">Minimum Order Quantity: <span className="font-semibold text-foreground">{product.moq} pieces</span></p>
              <div className="mt-4 space-y-3">
                {product.inStock && (
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-gold-gradient hover:opacity-90 shadow-gold text-primary-foreground font-semibold"
                  >
                    {added ? <><Check className="w-4 h-4" /> Added to Cart</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart ({product.moq} pcs MOQ)</>}
                  </Button>
                )}
                <Link
                  to={`/contact?product=${product.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 border border-gold text-gold font-semibold px-6 py-3 rounded-lg hover:bg-gold hover:text-primary-foreground transition-colors"
                >
                  Request Quote
                </Link>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-card rounded-lg p-5 shadow-steel">
              <h3 className="font-display font-semibold text-foreground mb-4 text-lg">Product Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Ruler, label: "Height", value: product.specs.height },
                  { icon: Ruler, label: "Width", value: product.specs.width },
                  { icon: Box, label: "Depth", value: product.specs.depth },
                  { icon: Weight, label: "Weight", value: product.specs.weight },
                  { icon: Layers, label: "Material", value: product.specs.material },
                  { icon: Layers, label: "Grade", value: product.specs.grade },
                  ...(product.specs.capacity ? [{ icon: Box, label: "Capacity", value: product.specs.capacity }] : []),
                  ...(product.specs.thickness ? [{ icon: Layers, label: "Thickness", value: product.specs.thickness }] : []),
                ].map((spec) => (
                  <div key={spec.label} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <spec.icon className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">{spec.label}</p>
                      <p className="text-sm font-semibold text-foreground">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
