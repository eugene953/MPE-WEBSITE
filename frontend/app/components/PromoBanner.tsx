'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PromoBannerProps {
    message: string;
    ctaText: string;
    ctaLink: string;
}

export default function PromoBanner({ message, ctaText, ctaLink }: PromoBannerProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="relative bg-gradient-to-r from-[#0066cc] via-[#0052a3] to-[#00a651] text-white py-3 px-4 text-center">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 flex-wrap">
                <p className="text-sm md:text-base font-medium">{message}</p>
                <Link
                    href={ctaLink}
                    className="inline-block bg-white text-[#0066cc] px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all hover-scale"
                >
                    {ctaText}
                </Link>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 transition-colors"
                aria-label="Close banner"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}
