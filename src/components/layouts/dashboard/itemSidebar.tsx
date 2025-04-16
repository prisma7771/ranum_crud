"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/", label: "🏠 Home" },
  { href: "/pakets", label: "📦 Pakets" },
  { href: "/galleries", label: "🖼️ Galleries" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "active bg-base-300 font-bold" : "";

  return (
    <ul className="menu bg-blue-400 text-base-content min-h-full w-80 p-4">
      {/* Logo/Branding */}
      <li className="mb-6 text-lg font-bold text-primary">Ranum Admin Panel</li>

      {menuItems.map(({ href, label }) => (
        <li key={href} className="mb-2 text-xl">
          <Link href={href} className={isActive(href)}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
