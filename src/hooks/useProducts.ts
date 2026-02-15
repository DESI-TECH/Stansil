import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/data/products";

interface DbProduct {
  id: string;
  name: string;
  name_hi: string | null;
  category: string;
  description: string;
  images: string[];
  price: number;
  currency: string;
  moq: number;
  height: string | null;
  width: string | null;
  depth: string | null;
  weight: string | null;
  material: string | null;
  grade: string | null;
  capacity: string | null;
  thickness: string | null;
  in_stock: boolean;
  featured: boolean;
}

const mapDbProduct = (p: DbProduct): Product => ({
  id: p.id,
  name: p.name,
  nameHi: p.name_hi ?? undefined,
  category: p.category,
  description: p.description,
  images: p.images,
  price: p.price,
  currency: p.currency,
  moq: p.moq,
  specs: {
    height: p.height ?? "",
    width: p.width ?? "",
    depth: p.depth ?? "",
    weight: p.weight ?? "",
    material: p.material ?? "",
    grade: p.grade ?? "",
    capacity: p.capacity ?? undefined,
    thickness: p.thickness ?? undefined,
  },
  inStock: p.in_stock,
  featured: p.featured,
});

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data as DbProduct[]).map(mapDbProduct);
    },
  });
};

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("No product ID");
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return mapDbProduct(data as DbProduct);
    },
    enabled: !!id,
  });
};
