export interface ProductSpec {
  height: string;
  width: string;
  depth: string;
  weight: string;
  material: string;
  grade: string;
  capacity?: string;
  thickness?: string;
}

export interface Product {
  id: string;
  name: string;
  nameHi?: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  currency: string;
  moq: number;
  specs: ProductSpec;
  inStock: boolean;
  featured: boolean;
}

export const categories = [
  { id: "cookware", name: "Cookware", icon: "🍳" },
  { id: "containers", name: "Storage Containers", icon: "📦" },
  { id: "utensils", name: "Utensils", icon: "🥄" },
  { id: "serving", name: "Serving Ware", icon: "🍽️" },
  { id: "food-processing", name: "Food Processing", icon: "⚙️" },
  { id: "commercial", name: "Commercial Kitchen", icon: "🏭" },
];

export const products: Product[] = [
  {
    id: "ss-stock-pot-20l",
    name: "Stainless Steel Stock Pot 20L",
    category: "cookware",
    description: "Heavy-duty stainless steel stock pot ideal for commercial kitchens and large-scale cooking. Triple-layered base for even heat distribution.",
    images: [
      "https://images.unsplash.com/photo-1584990347449-a4330bdd7823?w=600",
      "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600",
    ],
    price: 45,
    currency: "USD",
    moq: 50,
    specs: {
      height: "30 cm",
      width: "32 cm",
      depth: "32 cm",
      weight: "3.2 kg",
      material: "SS 304",
      grade: "Food Grade",
      capacity: "20 Liters",
      thickness: "1.2 mm",
    },
    inStock: true,
    featured: true,
  },
  {
    id: "ss-frying-pan-28",
    name: "Stainless Steel Frying Pan 28cm",
    category: "cookware",
    description: "Professional-grade frying pan with ergonomic handle and induction-compatible base. Perfect for restaurants and hotels.",
    images: [
      "https://images.unsplash.com/photo-1592154395799-40b99c8e42d5?w=600",
      "https://images.unsplash.com/photo-1574181617972-7b2f48c74f8e?w=600",
    ],
    price: 18,
    currency: "USD",
    moq: 100,
    specs: {
      height: "6 cm",
      width: "28 cm",
      depth: "28 cm",
      weight: "1.1 kg",
      material: "SS 304",
      grade: "Food Grade",
      thickness: "0.8 mm",
    },
    inStock: true,
    featured: true,
  },
  {
    id: "ss-container-set",
    name: "Airtight Storage Container Set (5 pcs)",
    category: "containers",
    description: "Set of 5 airtight stainless steel containers with silicone-sealed lids. Ideal for storing spices, grains, and dry foods.",
    images: [
      "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?w=600",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
    ],
    price: 25,
    currency: "USD",
    moq: 200,
    specs: {
      height: "8-16 cm (varies)",
      width: "10-18 cm (varies)",
      depth: "10-18 cm (varies)",
      weight: "2.5 kg (total set)",
      material: "SS 201",
      grade: "Food Grade",
      capacity: "250ml to 2L",
      thickness: "0.5 mm",
    },
    inStock: true,
    featured: true,
  },
  {
    id: "ss-serving-tray",
    name: "Decorative Serving Tray - Oval",
    category: "serving",
    description: "Elegant oval serving tray with mirror-finish surface. Perfect for hotel buffets, catering, and fine dining.",
    images: [
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600",
    ],
    price: 12,
    currency: "USD",
    moq: 200,
    specs: {
      height: "3 cm",
      width: "45 cm",
      depth: "30 cm",
      weight: "0.8 kg",
      material: "SS 304",
      grade: "Food Grade",
      thickness: "0.6 mm",
    },
    inStock: true,
    featured: false,
  },
  {
    id: "ss-ladle-set",
    name: "Professional Ladle Set (3 pcs)",
    category: "utensils",
    description: "Set of 3 professional ladles with different capacities. Riveted handles for durability. Commercial kitchen grade.",
    images: [
      "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600",
    ],
    price: 8,
    currency: "USD",
    moq: 500,
    specs: {
      height: "35-45 cm (varies)",
      width: "10-14 cm (varies)",
      depth: "6-10 cm (varies)",
      weight: "0.9 kg (total set)",
      material: "SS 304",
      grade: "Food Grade",
      thickness: "1.0 mm",
    },
    inStock: true,
    featured: false,
  },
  {
    id: "ss-gastronorm-pan",
    name: "Gastronorm Pan GN 1/1 Full Size",
    category: "commercial",
    description: "Standard GN 1/1 full-size gastronorm pan for commercial food service. Steam table compatible.",
    images: [
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600",
    ],
    price: 15,
    currency: "USD",
    moq: 100,
    specs: {
      height: "10 cm",
      width: "53 cm",
      depth: "32.5 cm",
      weight: "1.8 kg",
      material: "SS 304",
      grade: "Food Grade",
      capacity: "14 Liters",
      thickness: "0.7 mm",
    },
    inStock: true,
    featured: true,
  },
  {
    id: "ss-mixing-bowl-set",
    name: "Mixing Bowl Set (4 pcs)",
    category: "cookware",
    description: "Nested stainless steel mixing bowls with non-slip silicone base. Perfect for commercial bakeries and food preparation.",
    images: [
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600",
    ],
    price: 20,
    currency: "USD",
    moq: 150,
    specs: {
      height: "8-18 cm (varies)",
      width: "16-30 cm (varies)",
      depth: "16-30 cm (varies)",
      weight: "3.0 kg (total set)",
      material: "SS 304",
      grade: "Food Grade",
      capacity: "1L to 8L",
      thickness: "0.8 mm",
    },
    inStock: true,
    featured: false,
  },
  {
    id: "ss-food-warmer",
    name: "Chafing Dish / Food Warmer",
    category: "commercial",
    description: "Professional chafing dish with roll-top lid. Ideal for buffet service, hotels, and catering businesses.",
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?w=600",
    ],
    price: 35,
    currency: "USD",
    moq: 50,
    specs: {
      height: "40 cm",
      width: "60 cm",
      depth: "35 cm",
      weight: "5.5 kg",
      material: "SS 304",
      grade: "Food Grade",
      capacity: "9 Liters",
      thickness: "0.8 mm",
    },
    inStock: true,
    featured: true,
  },
];
