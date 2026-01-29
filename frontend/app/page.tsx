'use client';

import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import PromoBanner from './components/PromoBanner';
import Hero from './components/Hero';
import ServiceCard from './components/ServiceCard';

function HomeContent() {
  const { t } = useLanguage();

  const services = [
    {
      title: t('services.web.title'),
      subtitle: t('services.web.subtitle'),
      description: t('services.web.description'),
      features: [
        t('services.web.feature1'),
        t('services.web.feature2'),
        t('services.web.feature3'),
        t('services.web.feature4'),
        t('services.web.feature5'),
      ],
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      link: '/services',
      linkText: t('services.learnMore'),
    },
    {
      title: t('services.marketing.title'),
      subtitle: t('services.marketing.subtitle'),
      description: t('services.marketing.description'),
      features: [
        t('services.marketing.feature1'),
        t('services.marketing.feature2'),
        t('services.marketing.feature3'),
        t('services.marketing.feature4'),
        t('services.marketing.feature5'),
      ],
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      link: '/services',
      linkText: t('services.learnMore'),
    },
    {
      title: t('services.design.title'),
      subtitle: t('services.design.subtitle'),
      description: t('services.design.description'),
      features: [
        t('services.design.feature1'),
        t('services.design.feature2'),
        t('services.design.feature3'),
        t('services.design.feature4'),
        t('services.design.feature5'),
      ],
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      link: '/services',
      linkText: t('services.learnMore'),
    },
    {
      title: t('services.support.title'),
      subtitle: t('services.support.subtitle'),
      description: t('services.support.description'),
      features: [
        t('services.support.feature1'),
        t('services.support.feature2'),
        t('services.support.feature3'),
        t('services.support.feature4'),
        t('services.support.feature5'),
      ],
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      link: '/services',
      linkText: t('services.learnMore'),
    },
  ];

  return (
    <div className="min-h-screen">
      <PromoBanner
        message={t('promo.text')}
        ctaText={t('promo.cta')}
        ctaLink="/contact"
      />
      <Header />

      <main>
        {/* Hero Section */}
        <Hero
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
          backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2850&q=80"
          primaryCta={{ text: t('hero.cta.primary'), href: '/contact' }}
          secondaryCta={{ text: t('hero.cta.secondary'), href: '/services' }}
        />

        {/* Services Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 font-[var(--font-heading)]">
                <span className="gradient-text">{t('services.title')}</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('services.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0066cc] to-[#00a651] text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '100+', label: 'Projects Completed' },
                { number: '50+', label: 'Happy Clients' },
                { number: '5+', label: 'Years Experience' },
                { number: '24/7', label: 'Support' },
              ].map((stat, index) => (
                <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-4xl md:text-5xl font-bold mb-2 font-[var(--font-heading)]">{stat.number}</div>
                  <div className="text-sm md:text-base text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#e6f2ff] to-[#e6f7ef]">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-[var(--font-heading)] gradient-text">
              {t('about.team.cta')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('hero.subtitle')}
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-[#0066cc] to-[#00a651] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all hover-scale"
            >
              {t('cta.startProject')} →
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
