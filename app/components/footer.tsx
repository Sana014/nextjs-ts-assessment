// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-4xl mx-auto px-4 py-6 text-sm text-gray-500 flex justify-between">
        <p>&copy; {new Date().getFullYear()} ProductApp. All rights reserved.</p>
        <p>Built with ❤️ using Next.js & Tailwind CSS</p>
      </div>
    </footer>
  );
}
