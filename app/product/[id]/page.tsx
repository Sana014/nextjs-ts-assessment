"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Try to get product from sessionStorage for instant load
    const sessionProduct = sessionStorage.getItem('selectedProduct');
    if (sessionProduct) {
      const parsed = JSON.parse(sessionProduct);
      if (parsed && parsed.id?.toString() === params.id?.toString()) {
        setProduct(parsed);
        sessionStorage.removeItem('selectedProduct');
        return;
      }
    }
    // Fallback to localStorage
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    const found = stored.find((p: any) => p.id?.toString() === params.id?.toString());
    if (found) setProduct(found);
    else setProduct(undefined);
  }, [params.id]);

  if (product === undefined) return <p className="p-4">Product not found.</p>;
  if (!product) return <p className="p-4">Loading...</p>;

  return (
    <main className="p-4 max-w-xl mx-auto">
      {product?.image && (
        <div className="flex justify-center mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-40 w-auto rounded-lg shadow border object-contain bg-gray-50 transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <h1 className="text-2xl font-bold mb-2">{product?.title}</h1>
      <p className="text-gray-600 mb-2">{product?.description}</p>
      <p className="text-sm text-gray-400 mb-4">Created on: {product?.date}</p>
      <p className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">
        ₹{(product.price !== undefined && product.price !== null && product.price !== "")
          ? Number(product.price).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "0.00"}
      </p>
      <div className="flex gap-4 mt-6">
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded shadow transition-colors"
          onClick={() => router.push(`/edit/${product.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded shadow transition-colors"
          onClick={() => {
            if (confirm('Are you sure you want to delete this product?')) {
              const stored = JSON.parse(localStorage.getItem("products") || "[]");
              const updated = stored.filter((p: any) => p.id?.toString() !== product.id?.toString());
              localStorage.setItem("products", JSON.stringify(updated));
              router.push("/");
            }
          }}
        >
          Delete
        </button>
      </div>
    </main>
  );
}