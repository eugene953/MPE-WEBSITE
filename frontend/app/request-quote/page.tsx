'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for app router
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RequestQuote() {
    const { t } = useLanguage();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        projectTitle: '',
        description: '',
        budget: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/register');
            return;
        }

        try {
            const quoteRes = await fetch('http://localhost:6000/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    budget: Number(formData.budget)
                }),
            });

            if (!quoteRes.ok) throw new Error('Quote submission failed');

            router.push('/dashboard');
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold gradient-text mb-2">
                            {t('quote.title')}
                        </h1>
                        <p className="text-gray-600">{t('quote.subtitle')}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Project Info */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">{t('quote.form.project')}</h2>
                            <input name="projectTitle" placeholder={t('quote.form.projectTitle')} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#0066cc] outline-none" />
                            <textarea name="description" placeholder={t('quote.form.description')} onChange={handleChange} required rows={4} className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#0066cc] outline-none resize-none" />
                            <input name="budget" type="number" placeholder={t('quote.form.budget')} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#0066cc] outline-none" />
                        </div>

                        <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-[#0066cc] to-[#00a651] text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all transform hover:-translate-y-1">
                            {submitting ? t('auth.register.submitting') : t('quote.form.submit')}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
