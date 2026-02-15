import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { CreditCard, Smartphone, Landmark, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    gst: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast({ title: "Error", description: "Name, Email, and Phone are required", variant: "destructive" });
      return false;
    }
    if (!form.company.trim()) {
      toast({ title: "Error", description: "Company name is required", variant: "destructive" });
      return false;
    }
    if (!form.address.trim() || !form.city.trim() || !form.state.trim() || !form.pincode.trim()) {
      toast({ title: "Error", description: "Complete shipping address is required", variant: "destructive" });
      return false;
    }
    if (items.length === 0) {
      toast({ title: "Error", description: "Your cart is empty", variant: "destructive" });
      return false;
    }
    return true;
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Razorpay SDK failed to load");

      // Create order via edge function
      const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
        body: {
          amount: totalPrice,
          currency: "INR",
          receipt: `order_${Date.now()}`,
          customer: form,
          items: items.map((i) => ({ id: i.product.id, name: i.product.name, qty: i.quantity, price: i.product.price })),
        },
      });

      if (error || !data?.order_id) throw new Error(error?.message || "Failed to create order");

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Stelin Global Kitchenware",
        description: `Order for ${items.length} item(s)`,
        order_id: data.order_id,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        notes: {
          company: form.company,
          gst: form.gst,
          address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
        },
        theme: { color: "#C8902E" },
        handler: () => {
          clearCart();
          toast({ title: "Payment Successful! 🎉", description: "Your order has been placed. We will contact you soon." });
          navigate("/");
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (resp: any) => {
        toast({ title: "Payment Failed", description: resp.error?.description || "Something went wrong", variant: "destructive" });
      });
      rzp.open();
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleManualPayment = () => {
    if (!validateForm()) return;

    const orderDetails = items.map((i) => `${i.product.name} x${i.quantity} = ₹${(i.product.price * i.quantity).toLocaleString("en-IN")}`).join("\n");
    const message = `New Order from ${form.company}\n\nItems:\n${orderDetails}\n\nTotal: ₹${totalPrice.toLocaleString("en-IN")}\n\nContact: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nGST: ${form.gst}\nAddress: ${form.address}, ${form.city}, ${form.state} - ${form.pincode}, ${form.country}\n\nPayment Method: ${paymentMethod === "upi" ? "UPI" : "Card / Bank Transfer"}`;

    const whatsappUrl = `https://wa.me/919793541467?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    clearCart();
    toast({ title: "Order Sent! 📱", description: "Your order details have been sent via WhatsApp. We'll confirm shortly." });
    navigate("/");
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Details */}
            <div className="bg-card rounded-lg p-6 shadow-steel">
              <h2 className="font-display font-semibold text-card-foreground text-lg mb-4">Company Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company Name *</Label>
                  <Input id="company" name="company" value={form.company} onChange={handleChange} placeholder="Your Company Name" />
                </div>
                <div>
                  <Label htmlFor="gst">GST Number</Label>
                  <Input id="gst" name="gst" value={form.gst} onChange={handleChange} placeholder="22AAAAA0000A1Z5" />
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-card rounded-lg p-6 shadow-steel">
              <h2 className="font-display font-semibold text-card-foreground text-lg mb-4">Contact Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Pravin Sharma" />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="pravin@company.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 97935 41467" />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-card rounded-lg p-6 shadow-steel">
              <h2 className="font-display font-semibold text-card-foreground text-lg mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input id="address" name="address" value={form.address} onChange={handleChange} placeholder="Building, Street, Area" />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" name="city" value={form.city} onChange={handleChange} placeholder="Mumbai" />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input id="state" name="state" value={form.state} onChange={handleChange} placeholder="Maharashtra" />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input id="pincode" name="pincode" value={form.pincode} onChange={handleChange} placeholder="401105" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={form.country} onChange={handleChange} placeholder="India" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card rounded-lg p-6 shadow-steel">
              <h2 className="font-display font-semibold text-card-foreground text-lg mb-4">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <label className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-gold cursor-pointer transition-colors">
                  <RadioGroupItem value="razorpay" id="razorpay" />
                  <Landmark className="w-5 h-5 text-gold" />
                  <div>
                    <p className="font-medium text-card-foreground text-sm">Razorpay (Cards, UPI, NetBanking, Wallets)</p>
                    <p className="text-xs text-muted-foreground">Domestic & International payments</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-gold cursor-pointer transition-colors">
                  <RadioGroupItem value="upi" id="upi" />
                  <Smartphone className="w-5 h-5 text-gold" />
                  <div>
                    <p className="font-medium text-card-foreground text-sm">Direct UPI Transfer</p>
                    <p className="text-xs text-muted-foreground">Pay via GPay, PhonePe, Paytm — order sent via WhatsApp</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-gold cursor-pointer transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="w-5 h-5 text-gold" />
                  <div>
                    <p className="font-medium text-card-foreground text-sm">Card / Bank Transfer</p>
                    <p className="text-xs text-muted-foreground">We'll share payment details via WhatsApp</p>
                  </div>
                </label>
              </RadioGroup>
            </div>
          </div>

          {/* Order Summary */}
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
            <div className="flex justify-between font-bold text-card-foreground text-lg mb-6">
              <span>Total</span>
              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>

            {paymentMethod === "razorpay" ? (
              <Button
                onClick={handleRazorpayPayment}
                disabled={loading}
                className="w-full bg-gold-gradient hover:opacity-90 shadow-gold text-primary-foreground font-semibold"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Pay with Razorpay"}
              </Button>
            ) : (
              <Button
                onClick={handleManualPayment}
                className="w-full bg-gold-gradient hover:opacity-90 shadow-gold text-primary-foreground font-semibold"
              >
                Send Order via WhatsApp
              </Button>
            )}
            <p className="text-xs text-muted-foreground text-center mt-3">
              {paymentMethod === "razorpay"
                ? "You'll be redirected to Razorpay's secure payment page"
                : "Order details will be sent to our WhatsApp for confirmation"}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
