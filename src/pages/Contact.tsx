import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { Send, Globe, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product");
  const product = productId ? products.find((p) => p.id === productId) : null;
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    product: product?.name || "",
    quantity: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("inquiries").insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.company || null,
        country: form.country || null,
        product_interest: [form.product, form.quantity].filter(Boolean).join(" — ") || null,
        message: form.message,
      });
      if (error) throw error;
      toast({
        title: "Query Submitted! ✅",
        description: "We'll get back to you within 24 hours with a quote.",
      });
      setForm({ name: "", email: "", phone: "", company: "", country: "", product: product?.name || "", quantity: "", message: "" });
    } catch {
      toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-border bg-card text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold transition-shadow";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-steel-gradient py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-display font-bold text-steel-foreground mb-2">Get a Quote</h1>
          <p className="text-steel-foreground/60">Send us your inquiry and we'll respond within 24 hours</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card rounded-lg p-6 shadow-steel space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@company.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+1 234 567 890" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Company Name</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputClass} placeholder="Company Ltd." />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Country *</label>
                  <input required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputClass} placeholder="e.g. United States" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Product Interest</label>
                  <input value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className={inputClass} placeholder="e.g. Stock Pot 20L" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Required Quantity</label>
                <input value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className={inputClass} placeholder="e.g. 500 pieces" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Message / Special Requirements</label>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass} placeholder="Tell us about your requirements, custom sizes, branding needs..." />
              </div>
              <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-gold disabled:opacity-50">
                <Send className="w-4 h-4" /> {submitting ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-steel">
              <h3 className="font-display font-semibold text-foreground mb-4">Contact Information</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Head Office</p>
                    <p className="text-muted-foreground">Gala No. 5, Amar Estate, Navghar Road, Bhayander East 401105, Thane, Maharashtra, India</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Phone / WhatsApp</p>
                    <p className="text-muted-foreground">+91 97935 41467</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">pravins.gpt@gmail.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Export Markets</p>
                    <p className="text-muted-foreground">USA, UK, UAE, Africa, South East Asia, Europe & more</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-steel-gradient rounded-lg p-6">
              <h3 className="font-display font-semibold text-steel-foreground mb-2">Why Choose Us?</h3>
              <ul className="space-y-2 text-sm text-steel-foreground/70">
                <li>✅ Food-grade SS 304 & SS 201</li>
                <li>✅ Custom branding & packaging</li>
                <li>✅ Competitive lump sum pricing</li>
                <li>✅ Global shipping via air & sea</li>
                <li>✅ Quality inspection certificates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
