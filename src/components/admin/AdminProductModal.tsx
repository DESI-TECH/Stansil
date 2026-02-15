import { useState } from "react";
import { X, Save, Image, Loader2, Upload, GripVertical } from "lucide-react";
import { categories } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProductForm, INPUT_CLASS } from "./types";

interface AdminProductModalProps {
  editing: ProductForm;
  isNew: boolean;
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
  onChange: (form: ProductForm) => void;
}

const AdminProductModal = ({ editing, isNew, saving, onSave, onCancel, onChange }: AdminProductModalProps) => {
  const { toast } = useToast();
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return;
    setUploading(true);
    try {
      const imageFiles = files.filter(f => f.type.startsWith("image/"));
      if (imageFiles.length === 0) {
        toast({ title: "Error", description: "Only image files are allowed.", variant: "destructive" });
        return;
      }
      const uploadedUrls: string[] = [];
      for (const file of imageFiles) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${editing.id}/${fileName}`;
        const { error } = await supabase.storage.from("product-images").upload(filePath, file);
        if (error) throw error;
        const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(filePath);
        uploadedUrls.push(urlData.publicUrl);
      }
      onChange({ ...editing, images: [...editing.images, ...uploadedUrls] });
      toast({ title: "Uploaded! ✅", description: `${uploadedUrls.length} image(s) uploaded.` });
    } catch (err: any) {
      toast({ title: "Upload Error", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    await uploadFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    await uploadFiles(Array.from(e.dataTransfer.files));
  };

  const addImage = () => {
    if (!newImageUrl) return;
    onChange({ ...editing, images: [...editing.images, newImageUrl] });
    setNewImageUrl("");
  };

  const removeImage = (index: number) => {
    onChange({ ...editing, images: editing.images.filter((_, i) => i !== index) });
  };

  const handleImageDragEnd = () => {
    if (dragIndex === null || dragOverIndex === null || dragIndex === dragOverIndex) {
      setDragIndex(null);
      setDragOverIndex(null);
      return;
    }
    const newImages = [...editing.images];
    const [moved] = newImages.splice(dragIndex, 1);
    newImages.splice(dragOverIndex, 0, moved);
    onChange({ ...editing, images: newImages });
    setDragIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
      <div className="bg-card rounded-lg p-6 shadow-steel w-full max-w-2xl mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-display font-bold text-foreground">{isNew ? "Add New Product" : "Edit Product"}</h2>
          <button onClick={onCancel} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-4">
          {/* Name & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Product Name *</label>
              <input value={editing.name} onChange={(e) => onChange({ ...editing, name: e.target.value })} className={INPUT_CLASS} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Category</label>
              <select value={editing.category} onChange={(e) => onChange({ ...editing, category: e.target.value })} className={INPUT_CLASS}>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
            <textarea rows={3} value={editing.description} onChange={(e) => onChange({ ...editing, description: e.target.value })} className={INPUT_CLASS} />
          </div>

          {/* Images */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block"><Image className="w-4 h-4 inline mr-1" />Product Images</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {editing.images.map((img, i) => (
                <div
                  key={i}
                  draggable
                  onDragStart={() => setDragIndex(i)}
                  onDragOver={(e) => { e.preventDefault(); if (dragIndex !== null) setDragOverIndex(i); }}
                  onDragEnd={handleImageDragEnd}
                  className={`relative w-20 h-20 rounded overflow-hidden border-2 cursor-grab active:cursor-grabbing transition-all ${dragOverIndex === i ? "border-gold scale-105" : "border-border"} ${dragIndex === i ? "opacity-40" : ""}`}
                >
                  <div className="absolute top-0 left-0 bg-foreground/60 text-background w-5 h-5 flex items-center justify-center z-10">
                    <GripVertical className="w-3 h-3" />
                  </div>
                  <img src={img} alt="" className="w-full h-full object-cover" draggable={false} />
                  <button onClick={() => removeImage(i)} className="absolute top-0 right-0 bg-destructive text-destructive-foreground w-5 h-5 flex items-center justify-center text-xs z-10">×</button>
                </div>
              ))}
            </div>
            {editing.images.length > 1 && (
              <p className="text-xs text-muted-foreground mb-2">💡 Drag images to reorder. First image is the main product photo.</p>
            )}
            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${dragging ? "border-gold bg-gold/10" : "border-border hover:border-gold/50"}`}
              onClick={() => document.getElementById("product-image-input")?.click()}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 animate-spin text-gold" />
                  <p className="text-sm text-muted-foreground">Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-gold">Click to upload</span> or drag & drop images here
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, WEBP supported</p>
                </div>
              )}
              <input id="product-image-input" type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" disabled={uploading} />
            </div>
            <div className="flex gap-2 mt-2">
              <input placeholder="Or paste image URL" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} className={INPUT_CLASS} />
              <button onClick={addImage} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:opacity-80">Add</button>
            </div>
          </div>

          {/* Price & MOQ */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Price (₹ INR) *</label>
              <input type="number" value={editing.price} onChange={(e) => onChange({ ...editing, price: Number(e.target.value) })} className={INPUT_CLASS} />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">MOQ (pcs)</label>
              <input type="number" value={editing.moq} onChange={(e) => onChange({ ...editing, moq: Number(e.target.value) })} className={INPUT_CLASS} />
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.in_stock} onChange={(e) => onChange({ ...editing, in_stock: e.target.checked })} /> In Stock</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.featured} onChange={(e) => onChange({ ...editing, featured: e.target.checked })} /> Featured</label>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-3">
              {(["height", "width", "depth", "weight", "material", "grade", "capacity", "thickness"] as const).map((key) => (
                <div key={key}>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block capitalize">{key}</label>
                  <input
                    value={editing[key] || ""}
                    onChange={(e) => onChange({ ...editing, [key]: e.target.value })}
                    className={INPUT_CLASS}
                    placeholder={key === "height" ? "e.g. 30 cm" : key === "weight" ? "e.g. 3.2 kg" : ""}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button onClick={onSave} disabled={saving} className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 shadow-gold disabled:opacity-50">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Product
            </button>
            <button onClick={onCancel} className="px-6 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductModal;
