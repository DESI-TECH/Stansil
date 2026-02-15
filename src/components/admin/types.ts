import { categories } from "@/data/products";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  country: string | null;
  product_interest: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ProductForm {
  id: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  moq: number;
  height: string;
  width: string;
  depth: string;
  weight: string;
  material: string;
  grade: string;
  capacity: string;
  thickness: string;
  in_stock: boolean;
  featured: boolean;
}

export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "Suman@#092004";

export const emptyForm: ProductForm = {
  id: "",
  name: "",
  category: categories[0].id,
  description: "",
  images: [],
  price: 0,
  moq: 50,
  height: "",
  width: "",
  depth: "",
  weight: "",
  material: "SS 304",
  grade: "Food Grade",
  capacity: "",
  thickness: "",
  in_stock: true,
  featured: false,
};

export const INPUT_CLASS = "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold";
