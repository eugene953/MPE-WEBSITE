'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const navLinks = [
        { href: '/', label: t('nav.home') },
        { href: '/services', label: t('nav.services') },
        { href: '/portfolio', label: t('nav.portfolio') },
        { href: '/about', label: t('nav.about') },
        { href: '/contact', label: t('nav.contact') },
    ];

    if (isAuthenticated) {
        navLinks.splice(1, 0, { href: '/dashboard', label: t('nav.dashboard') });
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        window.location.href = '/';
    };

    return (
        <header className="sticky top-0 z-50 glass backdrop-blur-md border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center space-x-3 hover-scale">
                        <Image src="/logo1.png" alt="MPE Digital Solutions" width={300} height={300} className="h-50 w-auto" />
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
                    <div className="hidden lg:flex items-center space-x-6">
                        {/* Authentication Links */}
                        {!isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="text-gray-700 hover:text-[#0066cc] font-bold text-sm uppercase tracking-wider transition-colors">
                                    {t('nav.login')}
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
                                >
                                    {t('nav.register')}
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/dashboard"
                                    className="bg-gradient-to-r from-[#0066cc] to-[#00a651] text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider hover:shadow-lg transition-all hover-scale flex items-center gap-2"
                                >
                                    <span>{t('nav.mySpace')}</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-500 hover:text-red-600 font-bold text-sm uppercase tracking-wider transition-colors"
                                >
                                    {t('nav.logout')}
                                </button>
                            </div>
                        )}

                        {/* Language Switcher */}
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1 ring-1 ring-gray-200">
                            <button
                                onClick={() => setLanguage('fr')}
                                className={`px-3 py-1 rounded-full text-xs font-black transition-all ${language === 'fr' ? 'bg-white text-[#0066cc] shadow-sm' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                FR
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-3 py-1 rounded-full text-xs font-black transition-all ${language === 'en' ? 'bg-white text-[#0066cc] shadow-sm' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                EN
                            </button>
                        </div>
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

                            {/* Mobile Auth and Language Switcher */}
                            {!isAuthenticated ? (
                                <div className="flex flex-col gap-2 px-4 border-t pt-4">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full text-center px-4 py-3 rounded-xl border-2 border-gray-100 font-bold text-gray-700"
                                    >
                                        {t('nav.login')}
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full text-center px-4 py-3 rounded-xl bg-gray-900 text-white font-bold"
                                    >
                                        {t('nav.register')}
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 px-4 border-t pt-4">
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="bg-gradient-to-r from-[#0066cc] to-[#00a651] text-white px-6 py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2"
                                    >
                                        <span>{t('nav.mySpace')}</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-center px-4 py-3 rounded-xl border-2 border-red-50 font-bold text-red-600"
                                    >
                                        {t('nav.logout')}
                                    </button>
                                </div>
                            )}

                            <div className="flex items-center gap-2 px-4 border-t pt-4">
                                <button
                                    onClick={() => setLanguage('fr')}
                                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-black transition-all ${language === 'fr' ? 'bg-blue-50 text-[#0066cc] border border-blue-200' : 'bg-gray-50 text-gray-500 border border-transparent'
                                        }`}
                                >
                                    FRANÇAIS
                                </button>
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-black transition-all ${language === 'en' ? 'bg-blue-50 text-[#0066cc] border border-blue-200' : 'bg-gray-50 text-gray-500 border border-transparent'
                                        }`}
                                >
                                    ENGLISH
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
