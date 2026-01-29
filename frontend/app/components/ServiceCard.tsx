import Link from 'next/link';

interface ServiceCardProps {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    icon: React.ReactNode;
    link?: string;
    linkText?: string;
}

export default function ServiceCard({
    title,
    subtitle,
    description,
    features,
    icon,
    link = '#',
    linkText = 'En savoir plus'
}: ServiceCardProps) {
    return (
        <div className="group relative glass rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-200 hover:bg-white/80">

            <div className="w-16 h-16 mb-6 text-[#0066cc] group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold mb-2 font-[var(--font-heading)] text-gray-900">{title}</h3>
            <p className="text-sm font-semibold text-[#00a651] mb-4">{subtitle}</p>
            <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

            {/* Features */}
            <ul className="space-y-3 mb-6">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#00a651] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                ))}
            </ul>
            
            <Link
                href={link}
                className="inline-flex items-center gap-2 text-[#0066cc] font-semibold hover:gap-3 transition-all group/link"
            >
                {linkText}
                <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </Link>
        </div>
    );
}
