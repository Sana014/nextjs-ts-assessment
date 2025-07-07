"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Keep window.__searchQuery in sync with state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__searchQuery = search;
      window.dispatchEvent(new Event('searchQueryChanged'));
    }
  }, [search]);

  // For edit/delete prompts
  const handleEdit = () => {
    const id = prompt("Enter the Product ID to edit:");
    if (id) router.push(`/edit/${id}`);
  };

  const handleDelete = () => {
    const id = prompt("Enter the Product ID to delete:");
    if (!id) return;
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const exists = products.some((p: any) => p.id?.toString() === id);
    if (!exists) {
      alert("Product not found.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter((p: any) => p.id?.toString() !== id);
      localStorage.setItem("products", JSON.stringify(updated));
      alert("Product deleted.");
      router.refresh?.();
      router.push("/");
    }
  };

  return (
    <nav className="w-full bg-primary-light text-primary-dark px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow gap-2">
      <div className="flex items-center gap-4 flex-1">
        <span className="font-bold text-xl tracking-tight">MyProductShelf</span>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="relative group w-full max-w-xs">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-primary pointer-events-none transition-colors group-focus-within:text-primary-dark group-hover:text-primary-dark">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search products..."
            className="pl-8 pr-3 py-1.5 rounded-lg bg-white text-primary-dark border border-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm transition-all duration-200 group-hover:border-primary group-focus-within:border-primary w-full"
            style={{ minWidth: 200, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search products"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 flex-1 justify-end" ref={dropdownRef}>
        <a href="/" className="text-primary-dark font-semibold text-base hover:underline">Home</a>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="bg-primary-light hover:bg-white px-4 py-2 rounded focus:outline-none text-base font-semibold shadow transition flex items-center gap-2 text-primary-dark border border-primary"
            style={{ minWidth: 150 }}
          >
            Manage Products
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-primary-light text-primary-dark rounded-xl shadow-lg z-50 border border-primary py-2 flex flex-col gap-2 transition-opacity duration-200 opacity-100 pointer-events-auto">
              <button
                onClick={() => { setDropdownOpen(false); router.push("/create"); }}
                className="block w-full text-left px-5 py-2 text-base font-medium rounded-lg transition hover:font-bold hover:bg-white hover:text-primary-dark focus:outline-none bg-primary"
                style={{backgroundColor: '#2563eb1a', color: '#2563eb'}}
              >
                Add Product
              </button>
              <button
                onClick={() => { setDropdownOpen(false); router.push("/edit"); }}
                className="block w-full text-left px-5 py-2 text-base font-medium rounded-lg transition hover:font-bold hover:bg-white hover:text-primary-dark focus:outline-none bg-primary"
                style={{backgroundColor: '#2563eb1a', color: '#2563eb'}}
              >
                Edit Product
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
