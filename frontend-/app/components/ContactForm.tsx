'use client';

import { useState } from 'react';

interface ContactFormProps {
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    submitText: string;
}

export default function ContactForm({
    namePlaceholder,
    emailPlaceholder,
    phonePlaceholder,
    messagePlaceholder,
    submitText
}: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setSubmitted(true);

        // Reset form
        setTimeout(() => {
            setFormData({ name: '', email: '', phone: '', message: '' });
            setSubmitted(false);
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={namePlaceholder}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc] focus:ring-opacity-20 outline-none transition-all"
                />
            </div>

            {/* Email */}
            <div>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={emailPlaceholder}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc] focus:ring-opacity-20 outline-none transition-all"
                />
            </div>

            {/* Phone */}
            <div>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={phonePlaceholder}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc] focus:ring-opacity-20 outline-none transition-all"
                />
            </div>

            {/* Message */}
            <div>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={messagePlaceholder}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc] focus:ring-opacity-20 outline-none transition-all resize-none"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${submitted
                        ? 'bg-[#00a651]'
                        : 'bg-gradient-to-r from-[#0066cc] to-[#00a651] hover:shadow-lg hover-scale'
                    } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
                {submitted ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Message envoyé!
                    </span>
                ) : isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi...
                    </span>
                ) : (
                    submitText
                )}
            </button>
        </form>
    );
}
