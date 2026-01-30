'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function VerifyEmailContent() {
    const { t } = useLanguage();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const emailParam = searchParams.get('email');
        if (emailParam) setEmail(emailParam);
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const res = await fetch('http://localhost:6000/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Verification failed');
            }

            const data = await res.json();
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold gradient-text mb-2">{t('verify.title')}</h1>
                    <p className="text-gray-600">{t('verify.subtitle')} {email}</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('verify.code')}</label>
                        <input
                            type="text"
                            maxLength={6}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="123456"
                            required
                            className="w-full px-4 py-3 text-center text-2xl tracking-widest rounded-lg border border-gray-300 focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc] outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting || code.length < 6}
                        className="w-full bg-gradient-to-r from-[#0066cc] to-[#00a651] text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50"
                    >
                        {submitting ? t('verify.submitting') : t('verify.submit')}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default function VerifyEmail() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <Suspense fallback={<div className="flex-grow flex items-center justify-center">Loading...</div>}>
                <VerifyEmailContent />
            </Suspense>
            <Footer />
        </div>
    );
}
