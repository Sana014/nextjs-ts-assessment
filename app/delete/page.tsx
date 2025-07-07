"use client";
import { useEffect, useState } from "react";

export default function DeleteProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) setProducts(JSON.parse(stored));
  }, [message]);

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const updated = products.filter((p: any) => p.id?.toString() !== id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
    setMessage("Product deleted successfully.");
  };

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Delete Your Products</h1>
      {message && <p className="mb-4 text-green-600 text-center animate-fade-in">{message}</p>}
      {products.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No products found. Add some products to delete them here.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <li key={product.id} className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex flex-col items-center border border-gray-200 dark:border-gray-800">
              {product.image && (
                <img src={product.image} alt={product.title} className="h-20 w-20 object-contain mb-2 rounded-lg" />
              )}
              <span className="text-base font-medium text-gray-800 dark:text-gray-100 text-center mb-1 truncate w-full">{product.title}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 text-center mb-1 truncate w-full">{product.description}</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">
                ₹{(product.price !== undefined && product.price !== null && product.price !== "")
                  ? Number(product.price).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "0.00"}
              </span>
              <button onClick={() => handleDelete(product.id)} className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 rounded-full shadow text-center transition mt-2">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
