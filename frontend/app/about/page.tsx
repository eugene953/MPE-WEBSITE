'use client';

import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ValueCard from '../components/ValueCard';
import Hero from '../components/Hero';
import Link from 'next/link';

function AboutContent() {
    const { t } = useLanguage();

    const values = [
        {
            title: t('about.mission.title'),
            description: t('about.mission.description'),
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            title: t('about.innovation.title'),
            description: t('about.innovation.description'),
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
        },
        {
            title: t('about.partnership.title'),
            description: t('about.partnership.description'),
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
        },
        {
            title: t('about.excellence.title'),
            description: t('about.excellence.description'),
            icon: (
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
        },
    ];

    const expertise = [
        {
            category: t('services.web.title'),
            items: ['Site Vitrine', 'WordPress / CMS', 'Refonte de site web', 'Applications Mobiles', 'E-Commerce'],
        },
        {
            category: t('services.marketing.title'),
            items: ['SEO', 'SEA / Publicité', 'Réseaux Sociaux', 'Email Marketing', 'Content Marketing'],
        },
        {
            category: 'Agence WebDesign',
            items: ['UI Design', 'UX Design', 'Identité visuelle', 'Branding', 'Graphic Design'],
        },
    ];

    return (
        <div className="min-h-screen">
            <Header />

            <main>
                {/* Hero Section */}
                <Hero
                    title={t('about.title')}
                    subtitle={t('about.subtitle')}
                    backgroundImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2850&q=80"
                    primaryCta={{ text: t('hero.cta.primary'), href: '/register' }}
                />

                {/* Values Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center font-[var(--font-heading)] gradient-text">
                            {t('about.values.title')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => (
                                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <ValueCard {...value} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Expertise Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center font-[var(--font-heading)] gradient-text">
                            {t('about.expertise.title')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {expertise.map((category, index) => (
                                <div key={index} className="glass rounded-xl p-8 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <h3 className="text-xl font-bold mb-6 text-[#0066cc] font-[var(--font-heading)]">{category.category}</h3>
                                    <ul className="space-y-3">
                                        {category.items.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-[#00a651] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
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
                        <Link
                            href="/register"
                            className="inline-block bg-white text-[#0066cc] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all hover-scale"
                        >
                            {t('hero.cta.primary')} →
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default function About() {
    return (
        <AboutContent />
    );
}
