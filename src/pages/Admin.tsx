import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Plus, MessageSquare, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useProducts } from "@/hooks/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import { Inquiry, ProductForm, emptyForm } from "@/components/admin/types";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminInquiries from "@/components/admin/AdminInquiries";
import AdminProductTable from "@/components/admin/AdminProductTable";
import AdminProductModal from "@/components/admin/AdminProductModal";

const Admin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editing, setEditing] = useState<ProductForm | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "inquiries">("inquiries");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchInquiries();
      const channel = supabase
        .channel("inquiries-realtime")
        .on("postgres_changes", { event: "*", schema: "public", table: "inquiries" }, () => fetchInquiries())
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [isAuthenticated]);

  const fetchInquiries = async () => {
    const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    if (data) setInquiries(data as Inquiry[]);
  };

  const toggleRead = async (id: string, currentRead: boolean) => {
    await supabase.from("inquiries").update({ is_read: !currentRead }).eq("id", id);
    setInquiries(inquiries.map((i) => i.id === id ? { ...i, is_read: !currentRead } : i));
  };

  const unreadCount = inquiries.filter((i) => !i.is_read).length;

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  const productToForm = (p: typeof products[0]): ProductForm => ({
    id: p.id,
    name: p.name,
    category: p.category,
    description: p.description,
    images: [...p.images],
    price: p.price,
    moq: p.moq,
    height: p.specs.height,
    width: p.specs.width,
    depth: p.specs.depth,
    weight: p.specs.weight,
    material: p.specs.material,
    grade: p.specs.grade,
    capacity: p.specs.capacity || "",
    thickness: p.specs.thickness || "",
    in_stock: p.inStock,
    featured: p.featured,
  });

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.name || !editing.price) {
      toast({ title: "Error", description: "Name and price are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const dbRow = {
      id: editing.id || `product-${Date.now()}`,
      name: editing.name,
      category: editing.category,
      description: editing.description,
      images: editing.images,
      price: editing.price,
      currency: "INR",
      moq: editing.moq,
      height: editing.height || null,
      width: editing.width || null,
      depth: editing.depth || null,
      weight: editing.weight || null,
      material: editing.material || null,
      grade: editing.grade || null,
      capacity: editing.capacity || null,
      thickness: editing.thickness || null,
      in_stock: editing.in_stock,
      featured: editing.featured,
    };
    try {
      if (isNew) {
        const { error } = await supabase.from("products").insert(dbRow);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").update(dbRow).eq("id", editing.id);
        if (error) throw error;
      }
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditing(null);
      setIsNew(false);
      toast({ title: "Saved! ✅", description: `Product "${editing.name}" has been saved.` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    await queryClient.invalidateQueries({ queryKey: ["products"] });
    toast({ title: "Deleted", description: "Product removed." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-steel-gradient py-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-steel-foreground mb-2">Admin Panel</h1>
            <p className="text-steel-foreground/60">Manage products & customer inquiries</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-steel-dark rounded-lg overflow-hidden">
              <button onClick={() => setActiveTab("inquiries")} className={`px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === "inquiries" ? "bg-gold text-primary-foreground" : "text-steel-foreground/70 hover:text-steel-foreground"}`}>
                <MessageSquare className="w-4 h-4" /> Messages
                {unreadCount > 0 && <span className="bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full">{unreadCount}</span>}
              </button>
              <button onClick={() => setActiveTab("products")} className={`px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === "products" ? "bg-gold text-primary-foreground" : "text-steel-foreground/70 hover:text-steel-foreground"}`}>
                <Package className="w-4 h-4" /> Products
              </button>
            </div>
            {activeTab === "products" && (
              <button
                onClick={() => { setEditing({ ...emptyForm, id: `product-${Date.now()}` }); setIsNew(true); }}
                className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-gold"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {editing && (
          <AdminProductModal
            editing={editing}
            isNew={isNew}
            saving={saving}
            onSave={handleSave}
            onCancel={() => { setEditing(null); setIsNew(false); }}
            onChange={setEditing}
          />
        )}

        {activeTab === "inquiries" && (
          <AdminInquiries inquiries={inquiries} onToggleRead={toggleRead} />
        )}

        {activeTab === "products" && (
          <AdminProductTable
            products={products}
            loading={productsLoading}
            onEdit={(product) => { setEditing(productToForm(product)); setIsNew(false); }}
            onDelete={handleDelete}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
