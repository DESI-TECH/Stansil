import { Edit, Trash2, Loader2 } from "lucide-react";

import { Product } from "@/data/products";

interface AdminProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const AdminProductTable = ({ products, loading, onEdit, onDelete }: AdminProductTableProps) => {
  if (loading) {
    return (
      <div className="bg-card rounded-lg shadow-steel p-10 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto" />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-steel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Product</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Price</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Specs</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Images</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={product.images[0]} alt="" className="w-10 h-10 rounded object-cover" />
                    <div>
                      <p className="font-medium text-sm text-foreground">{product.name}</p>
                      <p className="text-xs text-muted-foreground">MOQ: {product.moq}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground capitalize">{product.category}</td>
                <td className="px-4 py-3 text-sm font-semibold text-foreground">₹{product.price.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {product.specs.height} × {product.specs.width} × {product.specs.depth}<br />
                  {product.specs.weight} | {product.specs.material}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{product.images.length}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(product)} className="p-1.5 text-muted-foreground hover:text-gold transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(product.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductTable;
