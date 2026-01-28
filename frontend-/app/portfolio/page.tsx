'use client';

import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

function PortfolioContent() {
    const { t } = useLanguage();

    // Sample portfolio items (you can replace with actual projects)
    const portfolioItems = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            category: 'Web Development',
            description: 'Modern e-commerce solution with payment integration',
            image: '/placeholder-portfolio-1.jpg',
        },
        {
            id: 2,
            title: 'Corporate Website',
            category: 'Web Design',
            description: 'Professional corporate website with CMS',
            image: '/placeholder-portfolio-2.jpg',
        },
        {
            id: 3,
            title: 'Mobile App',
            category: 'Mobile Development',
            description: 'Cross-platform mobile application',
            image: '/placeholder-portfolio-3.jpg',
        },
        {
            id: 4,
            title: 'Brand Identity',
            category: 'Graphic Design',
            description: 'Complete brand identity design package',
            image: '/placeholder-portfolio-4.jpg',
        },
        {
            id: 5,
            title: 'SEO Campaign',
            category: 'Digital Marketing',
            description: 'Successful SEO optimization campaign',
            image: '/placeholder-portfolio-5.jpg',
        },
        {
            id: 6,
            title: 'Restaurant Website',
            category: 'Web Development',
            description: 'Interactive restaurant website with online ordering',
            image: '/placeholder-portfolio-6.jpg',
        },
    ];

    const categories = ['All', 'Web Development', 'Web Design', 'Mobile Development', 'Graphic Design', 'Digital Marketing'];

    return (
        <div className="min-h-screen">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#e6f2ff] to-[#e6f7ef] overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-10 right-10 w-64 h-64 bg-[#0066cc] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
                        <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#00a651] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-[var(--font-heading)] gradient-text">
                            {t('nav.portfolio')}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Découvrez nos projets réalisés et nos réalisations exceptionnelles
                        </p>
                    </div>
                </section>

                {/* Filter Buttons */}
                <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {categories.map((category, index) => (
                                <button
                                    key={index}
                                    className={`px-6 py-2 rounded-full font-medium transition-all ${index === 0
                                            ? 'bg-gradient-to-r from-[#0066cc] to-[#00a651] text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Portfolio Grid */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {portfolioItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="group relative glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Image Placeholder */}
                                    <div className="relative h-64 bg-gradient-to-br from-[#0066cc] to-[#00a651] flex items-center justify-center">
                                        <svg className="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                                            <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                View Project →
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <span className="inline-block px-3 py-1 bg-[#e6f2ff] text-[#0066cc] text-sm font-medium rounded-full mb-3">
                                            {item.category}
                                        </span>
                                        <h3 className="text-xl font-bold mb-2 font-[var(--font-heading)] text-gray-900">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0066cc] to-[#00a651] text-white">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-[var(--font-heading)]">
                            {t('about.team.cta')}
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            {t('contact.subtitle')}
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-white text-[#0066cc] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all hover-scale"
                        >
                            {t('about.team.button')} →
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default function Portfolio() {
    return (
        <LanguageProvider>
            <PortfolioContent />
        </LanguageProvider>
    );
}
