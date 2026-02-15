import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Ruler, Weight, Layers, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.moq);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block bg-card rounded-lg overflow-hidden shadow-steel hover:shadow-gold transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-gold-gradient text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
        {product.images.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-secondary/80 text-secondary-foreground text-xs px-2 py-1 rounded backdrop-blur-sm">
            {product.images.length} Photos
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-gold font-medium uppercase tracking-wider mb-1">{product.category}</p>
        <h3 className="font-display font-semibold text-card-foreground text-sm leading-tight mb-2 group-hover:text-gold transition-colors">
          {product.name}
        </h3>

        {/* Quick specs */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><Ruler className="w-3 h-3" />{product.specs.height}</span>
          <span className="flex items-center gap-1"><Weight className="w-3 h-3" />{product.specs.weight}</span>
          <span className="flex items-center gap-1"><Layers className="w-3 h-3" />{product.specs.material}</span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-card-foreground">₹{product.price.toLocaleString("en-IN")}</p>
            <p className="text-[10px] text-muted-foreground">MOQ: {product.moq} pcs</p>
          </div>
          {product.inStock ? (
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded bg-gold-gradient text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <ShoppingCart className="w-3 h-3" /> Add
            </button>
          ) : (
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-red-100 text-red-700">Out of Stock</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
