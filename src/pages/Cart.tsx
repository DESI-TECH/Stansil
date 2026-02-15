import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">Add some products to get started</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-gold"
          >
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="bg-card rounded-lg p-4 shadow-steel flex gap-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${product.id}`} className="font-semibold text-card-foreground hover:text-gold transition-colors text-sm">
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">{product.specs.material} · {product.specs.grade}</p>
                  <p className="text-lg font-bold text-card-foreground mt-2">₹{product.price.toLocaleString("en-IN")} <span className="text-xs font-normal text-muted-foreground">/ piece</span></p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 bg-muted rounded-lg">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1.5 hover:text-gold transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-semibold w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1.5 hover:text-gold transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="text-sm text-muted-foreground hover:text-destructive transition-colors">
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="bg-card rounded-lg p-6 shadow-steel h-fit sticky top-24">
            <h2 className="font-display font-semibold text-card-foreground text-lg mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-muted-foreground">
                  <span className="truncate mr-2">{product.name} × {quantity}</span>
                  <span className="shrink-0">₹{(product.price * quantity).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border my-4" />
            <div className="flex justify-between font-bold text-card-foreground text-lg">
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
            <Link to="/checkout">
              <Button className="w-full mt-6 bg-gold-gradient hover:opacity-90 shadow-gold text-primary-foreground font-semibold">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
