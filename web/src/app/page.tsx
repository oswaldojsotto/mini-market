/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center p-6">
      <div className="text-center text-white max-w-md">
        <div className="mb-12">
          <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <svg
              className="w-10 h-10 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="font-mono text-3xl md:text-4xl font-light tracking-tight mb-6 text-gray-200">
          MINI_MARKET
        </h1>

        <p className="font-mono text-gray-400 mb-12 text-sm tracking-wide">
          productos esenciales // precios excepcionales
        </p>

        <Button
          asChild
          className="font-mono bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300 rounded-sm px-8 py-6 tracking-wider"
          size="lg">
          <Link href="/products">
            INICIAR <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        <p className="mt-16 font-mono text-xs text-gray-600 tracking-widest">
          // PRESIONA INICIAR PARA EXPLORAR
        </p>
      </div>
    </div>
  );
}
