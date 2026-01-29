import Link from 'next/link';

interface HeroProps {
    title: string;
    subtitle: string;
    backgroundImage?: string;
    primaryCta: {
        text: string;
        href: string;
    };
    secondaryCta?: {
        text: string;
        href: string;
    };
}

export default function Hero({ title, subtitle, backgroundImage, primaryCta, secondaryCta }: HeroProps) {
    const hasImage = !!backgroundImage;

    return (
        <section className={`relative min-h-[600px] flex items-center justify-center overflow-hidden ${hasImage ? 'bg-black' : 'bg-gradient-to-br from-[#e6f2ff] via-white to-[#e6f7ef]'}`}>
            {/* Background Image */}
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={backgroundImage}
                        alt="Hero background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
            )}

            {/* Animated Background Elements - Only show if no image */}
            {!backgroundImage && (
                <div className="absolute inset-0 overflow-hidden z-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#0066cc] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#00a651] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0052a3] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 font-[var(--font-heading)]">
                        <span className={hasImage ? 'text-white' : 'gradient-text'}>{title}</span>
                    </h1>
                    <p className={`text-lg sm:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed ${hasImage ? 'text-gray-100' : 'text-gray-700'}`}>
                        {subtitle}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href={primaryCta.href}
                            className="bg-gradient-to-r from-[#0066cc] to-[#00a651] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all hover-scale inline-flex items-center gap-2"
                        >
                            {primaryCta.text}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>

                        {secondaryCta && (
                            <Link
                                href={secondaryCta.href}
                                className="glass px-8 py-4 rounded-full font-semibold text-lg text-[#0066cc] hover:shadow-lg transition-all hover-scale"
                            >
                                {secondaryCta.text}
                            </Link>
                        )}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
