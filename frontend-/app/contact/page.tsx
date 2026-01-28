'use client';

import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

function ContactContent() {
    const { t } = useLanguage();

    const locations = [
        {
            city: t('location.yaounde'),
            address: t('location.yaounde.address'),
            phones: [
                { number: '+237 640 46 51 82', link: 'https://wa.me/237640465182' },
                { number: '+237 652 79 91 81', link: 'https://wa.me/237652799181' },
            ],
        },
        {
            city: t('location.douala'),
            address: t('location.douala.address'),
            phones: [
                { number: '+237 657 12 87 12', link: 'https://wa.me/237657128712' },
                { number: '+237 673 07 10 17', link: 'https://wa.me/237673071017' },
            ],
        },
        {
            city: t('location.france'),
            address: t('location.france.address'),
            phones: [
                { number: '+33 6 38 05 54 46', link: 'https://wa.me/33638055446' },
            ],
        },
    ];

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
                            {t('contact.title')}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t('contact.subtitle')}
                        </p>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Contact Form */}
                            <div className="animate-fade-in">
                                <h2 className="text-2xl font-bold mb-6 font-[var(--font-heading)] text-gray-900">
                                    {t('contact.form.submit')}
                                </h2>
                                <ContactForm
                                    namePlaceholder={t('contact.form.name')}
                                    emailPlaceholder={t('contact.form.email')}
                                    phonePlaceholder={t('contact.form.phone')}
                                    messagePlaceholder={t('contact.form.message')}
                                    submitText={t('contact.form.submit')}
                                />
                            </div>

                            {/* Contact Information */}
                            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                <h2 className="text-2xl font-bold mb-6 font-[var(--font-heading)] text-gray-900">
                                    {t('footer.contact.title')}
                                </h2>

                                {/* Email */}
                                <div className="mb-8 glass rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <svg className="w-6 h-6 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="font-semibold text-gray-900">Email</span>
                                    </div>
                                    <a href="mailto:contact@mpedigitalsolutions.com" className="text-[#0066cc] hover:text-[#00a651] transition-colors">
                                        contact@mpedigitalsolutions.com
                                    </a>
                                </div>

                                {/* Locations */}
                                <div className="space-y-6">
                                    {locations.map((location, index) => (
                                        <div key={index} className="glass rounded-xl p-6">
                                            <div className="flex items-center gap-3 mb-3">
                                                <svg className="w-6 h-6 text-[#00a651]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="font-bold text-gray-900">{location.city}</span>
                                            </div>
                                            <p className="text-gray-600 mb-3">{location.address}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {location.phones.map((phone, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={phone.link}
                                                        className="inline-flex items-center gap-2 px-3 py-1 bg-[#00a651] text-white rounded-full text-sm hover:bg-[#008a44] transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                        </svg>
                                                        {phone.number}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Business Hours */}
                                <div className="mt-6 glass rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <svg className="w-6 h-6 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-semibold text-gray-900">{t('contact.hours')}</span>
                                    </div>
                                    <p className="text-gray-600">{t('contact.hours.time')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default function Contact() {
    return (
        <LanguageProvider>
            <ContactContent />
        </LanguageProvider>
    );
}
