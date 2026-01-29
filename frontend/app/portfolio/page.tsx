'use client';

import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import Hero from '../components/Hero';

function PortfolioContent() {
    const { t } = useLanguage();
    
    const portfolioItems = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            category: 'Web Development',
            description: 'Modern e-commerce solution with payment integration',
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 2,
            title: 'Corporate Website',
            category: 'Web Design',
            description: 'Professional corporate website with CMS',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 3,
            title: 'Mobile App',
            category: 'Mobile Development',
            description: 'Cross-platform mobile application',
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 4,
            title: 'Brand Identity',
            category: 'Graphic Design',
            description: 'Complete brand identity design package',
            image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 5,
            title: 'SEO Campaign',
            category: 'Digital Marketing',
            description: 'Successful SEO optimization campaign',
            image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 6,
            title: 'Restaurant Website',
            category: 'Web Development',
            description: 'Interactive restaurant website with online ordering',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        },
    ];

    const categories = ['All', 'Web Development', 'Web Design', 'Mobile Development', 'Graphic Design', 'Digital Marketing'];

    return (
        <div className="min-h-screen">
            <Header />

            <main>

                <Hero
                    title={t('nav.portfolio')}
                    subtitle="Découvrez nos projets réalisés et nos réalisations exceptionnelles"
                    backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2850&q=80"
                    primaryCta={{ text: t('about.team.button'), href: '/contact' }}
                />

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
                                    <div className="relative h-64 bg-gray-200">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 transition-all duration-300 flex items-center justify-center z-10">
                                            <span className="bg-white/90 text-[#0066cc] px-6 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                View Project
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
