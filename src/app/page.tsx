"use client";

import { useContext } from "react";
import { AppDataContext } from "@/context/AppContext";

export default function HomePage() {
  const { pakets, galleries } = useContext(AppDataContext);

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="stats shadow w-full bg-white">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h18v18H3V3z"
              />
            </svg>
          </div>
          <div className="stat-title">Total Pakets</div>
          <div className="stat-value text-primary">{pakets.length}</div>
          <div className="stat-desc">Updated regularly</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4-4-4-4m6 8l4-4-4-4"
              />
            </svg>
          </div>
          <div className="stat-title">Gallery Items</div>
          <div className="stat-value text-secondary">{galleries.length}</div>
          <div className="stat-desc">Updated regularly</div>
        </div>
      </div>
    </div>
  );
}
