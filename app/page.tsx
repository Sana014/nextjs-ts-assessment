"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
	const [products, setProducts] = useState<any[] | null>(null);

	useEffect(() => {
		const updateProducts = () => {
			const stored = localStorage.getItem("products");
			setProducts(stored ? JSON.parse(stored) : []);
		};
		updateProducts();
		window.addEventListener("storage", updateProducts);
		window.addEventListener("productsChanged", updateProducts);
		return () => {
			window.removeEventListener("storage", updateProducts);
			window.removeEventListener("productsChanged", updateProducts);
		};
	}, []);

	// Headphone image for featured carousel (local upload)
	const [featuredImage, setFeaturedImage] = useState<string | null>(null);
	const discount = 30; // 30% OFF

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (ev) => {
				setFeaturedImage(ev.target?.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	// Carousel data (static for demo)
	const heroSlides = [
		{
			image:
				"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80", // MacBook
			discount: "Special Offer 25% Off",
			title: "Unleash Productivity - MacBook Air for Creators!",
			button: "Shop Now",
			buttonUrl: "#",
			secondary: "See Details",
			secondaryUrl: "#",
		},
	];
	const [current, setCurrent] = useState(0);

	// MacBook scrolling images for featured section (same image, different angles)
	const macbookImages = [
		// Same image, but with Unsplash's cropping/rotation params for different angles
		"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
		"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80&rotate=15",
		"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80&rotate=345",
	];
	const [scrollIndex, setScrollIndex] = useState(0);

	useEffect(() => {
		if (macbookImages.length > 1) {
			const interval = setInterval(() => {
				setScrollIndex((prev) => (prev + 1) % macbookImages.length);
			}, 3500);
			return () => clearInterval(interval);
		}
	}, []);

	// Generate a random admin ID (6 digits)
	const adminId = useMemo(
		() => Math.floor(100000 + Math.random() * 900000),
		[]
	);

	return (
		<main className="p-4 max-w-4xl mx-auto">
			{/* Hero carousel */}
			<section className="relative bg-gray-100 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center mb-10 min-h-[320px]">
				{/* Left image (scrolling MacBook images) */}
				<div className="flex-1 flex items-center justify-center min-w-[180px] md:min-w-[260px] h-48 md:h-64 bg-transparent overflow-hidden">
					<div
						className="w-full h-full flex transition-transform duration-700"
						style={{ transform: `translateX(-${scrollIndex * 100}%)` }}
					>
						{macbookImages.map((img, idx) => (
							<div
								key={idx}
								className="w-full h-full flex-shrink-0 flex items-center justify-center"
							>
								<Image
									src={img}
									alt={`MacBook Hero ${idx + 1}`}
									width={260}
									height={224}
									className="object-contain h-40 md:h-56 drop-shadow-xl"
									draggable={false}
									priority={idx === scrollIndex}
								/>
							</div>
						))}
					</div>
				</div>
				{/* Right content */}
				<div className="flex-1 flex flex-col justify-center items-start p-6 md:p-10">
					<h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 leading-tight">
						{heroSlides[0].title}
					</h2>
					<span className="text-center text-primary font-semibold text-lg mb-2">
						Hurry up only few lefts!
					</span>
					<div className="flex gap-4 mt-2">
						<a
							href={heroSlides[0].buttonUrl}
							className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-2 rounded-full shadow transition"
						>
							{heroSlides[0].button}
						</a>
						<a
							href={heroSlides[0].secondaryUrl}
							className="text-primary-dark font-semibold flex items-center gap-1 hover:underline"
						>
							{heroSlides[0].secondary}
							<span aria-hidden>→</span>
						</a>
					</div>
				</div>
			</section>

			<h1 className="text-2xl font-bold mb-4">Popular products</h1>
			{products && products.length === 0 && (
				<div className="text-center text-gray-500 dark:text-gray-400 py-8 col-span-full">
					No products found. Add your first product!
				</div>
			)}
			<ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
				{products && products.map((product: any, idx: number) => (
					<li
						key={product.id || product.title + idx}
						className="min-w-[200px] max-w-[220px] bg-white dark:bg-gray-900 rounded-xl shadow p-4 flex flex-col items-center relative group transition hover:scale-105 border border-gray-200 dark:border-gray-800 cursor-pointer"
						onClick={() => window.location.href = `/product/${product.id}`}
					>
						{product.image && (
							<img
								src={product.image}
								alt={product.title}
								className="h-24 w-24 object-contain mb-2 rounded-lg"
							/>
						)}
						<span className="text-base font-medium text-gray-800 dark:text-gray-100 text-center mb-1 truncate w-full">
							{product.title}
						</span>
						{product.description && (
							<span className="text-xs text-gray-500 dark:text-gray-400 text-center mb-1 truncate w-full">
								{product.description}
							</span>
						)}
						<div className="flex items-center gap-1 mb-1">
							<span className="text-xs font-semibold text-primary-dark">
								{product.rating || 4.5}
							</span>
							<svg
								className="w-4 h-4 text-primary"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
							</svg>
						</div>
						<span className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">
							₹{(product.price !== undefined && product.price !== null && product.price !== "")
    ? Number(product.price).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00"}
						</span>
						<button
							className="w-full bg-primary hover:bg-primary-dark text-white text-sm font-bold py-2 rounded-full shadow transition mb-2"
							onClick={e => e.stopPropagation()}
						>
							Buy now
						</button>
					</li>
				))}
			</ul>
		</main>
	);
}