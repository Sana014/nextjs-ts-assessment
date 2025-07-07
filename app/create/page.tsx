"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

// Define a TypeScript type for the form
interface ProductForm {
  title: string;
  description: string;
  image: string; // Will store base64 data URL
  price: string;
}

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
  price: z.string()
    .min(1, "Price is required")
    .refine(val => !isNaN(Number(val)) && Number(val) >= 0, "Price must be a non-negative number"),
});

export default function CreatePage() {
  const router = useRouter();
  const [form, setForm] = useState<ProductForm>({ title: "", description: "", image: "", price: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ProductForm, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input for image
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ProductForm, string>> = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof ProductForm;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    const existing = JSON.parse(localStorage.getItem("products") || "[]");
    const newProduct = { ...form, id: Date.now(), date: new Date().toLocaleDateString() };
    localStorage.setItem("products", JSON.stringify([...existing, newProduct]));
    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-8 w-full max-w-xl border border-blue-100 transition-all duration-500 hover:shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-blue-700 text-center tracking-tight transition-colors duration-300">
          Create New Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition placeholder-gray-400 focus:scale-105 duration-200"
              placeholder="Enter product title"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition placeholder-gray-400 resize-none min-h-[100px] focus:scale-105 duration-200"
              placeholder="Enter product description"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
            {form.image && (
              <div className="mt-4 flex items-center justify-center">
                <img
                  src={form.image}
                  alt="Preview"
                  className="h-32 w-auto rounded-lg shadow border object-contain bg-gray-50 transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Price</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition placeholder-gray-400 focus:scale-105 duration-200"
              placeholder="Enter price (e.g. 9999)"
              type="number"
              min="0"
              step="0.01"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-3 rounded-lg font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transform hover:scale-105 duration-200"
          >
            Create
          </button>
        </form>
        {form.title && form.image && (
          <div className="mt-8 flex justify-center">
            <div className="min-w-[200px] max-w-[220px] bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex flex-col items-center relative group border border-gray-200 dark:border-gray-800">
              <img
                src={form.image}
                alt={form.title}
                className="h-24 w-24 object-contain mb-2 rounded-lg"
              />
              <span className="text-base font-medium text-gray-800 dark:text-gray-100 text-center mb-1 truncate w-full">
                {form.title}
              </span>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">4.5</span>
                <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">
                ₹{form.price || "0"}
              </span>
              <button className="mt-auto w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2 rounded-full shadow transition">
                Buy now
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}