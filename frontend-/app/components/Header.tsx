'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const navLinks = [
        { href: '/', label: t('nav.home') },
        { href: '/services', label: t('nav.services') },
        { href: '/portfolio', label: t('nav.portfolio') },
        { href: '/about', label: t('nav.about') },
        { href: '/contact', label: t('nav.contact') },
    ];

    return (
        <header className="sticky top-0 z-50 glass backdrop-blur-md border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 hover-scale">
                        <Image src="/logo.jpg" alt="MPE Digital Solutions" width={180} height={60} className="h-12 w-auto" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-[#0066cc] font-medium transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0066cc] to-[#00a651] group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </div>

                    {/* CTA and Language Switcher */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Language Switcher */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                            <button
                                onClick={() => setLanguage('fr')}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${language === 'fr' ? 'bg-[#0066cc] text-white' : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                FR
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${language === 'en' ? 'bg-[#0066cc] text-white' : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                EN
                            </button>
                        </div>

                        <Link
                            href="/contact"
                            className="bg-gradient-to-r from-[#0066cc] to-[#00a651] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all hover-scale"
                        >
                            {t('nav.getQuote')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden py-4 animate-fade-in">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-gray-700 hover:text-[#0066cc] font-medium transition-colors px-4 py-2 rounded-md hover:bg-gray-50"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Mobile Language Switcher */}
                            <div className="flex items-center gap-2 px-4">
                                <button
                                    onClick={() => setLanguage('fr')}
                                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${language === 'fr' ? 'bg-[#0066cc] text-white' : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    Français
                                </button>
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${language === 'en' ? 'bg-[#0066cc] text-white' : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    English
                                </button>
                            </div>

                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-gradient-to-r from-[#0066cc] to-[#00a651] text-white px-6 py-3 rounded-full font-semibold text-center mx-4"
                            >
                                {t('nav.getQuote')}
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
