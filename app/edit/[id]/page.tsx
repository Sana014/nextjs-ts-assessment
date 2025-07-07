"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPage({ params }: { params: { id: string } }) {
  const [form, setForm] = useState({ title: "", description: "", image: "", price: "" });
  const [notFound, setNotFound] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    const found = stored.find((p: any) => p.id?.toString() === params.id);
    if (found) {
      setForm({ title: found.title, description: found.description, image: found.image || "", price: found.price?.toString() || "" });
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [params.id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (notFound) return;
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    const updated = stored.map((p: any) =>
      p.id?.toString() === params.id ? { ...p, ...form, price: parseFloat(form.price) } : p
    );
    localStorage.setItem("products", JSON.stringify(updated));
    setMessage("Product updated successfully.");
    setTimeout(() => router.push(`/product/${params.id}`), 800);
  };

  if (notFound) return <p className="p-4 text-red-500">Product not found.</p>;

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block">Image</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Paste image URL or upload file"
            type="url"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {form.image && (
            <div className="mt-2 flex items-center justify-center">
              <img src={form.image} alt="Preview" className="h-32 w-auto rounded-lg shadow border object-contain bg-gray-50" />
            </div>
          )}
        </div>
        <div>
          <label className="block">Price (INR)</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter price in INR"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
      </form>
      {/* No delete button or delete logic here. Only update functionality is present. */}
      {message && <p className="mt-4 text-green-600 text-center animate-fade-in">{message}</p>}
    </main>
  );
}