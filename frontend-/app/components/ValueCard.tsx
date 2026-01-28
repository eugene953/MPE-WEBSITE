interface ValueCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export default function ValueCard({ title, description, icon }: ValueCardProps) {
    return (
        <div className="group relative glass rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Gradient Border on Hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#0066cc] to-[#00a651] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur"></div>

            {/* Icon */}
            <div className="w-14 h-14 mb-4 text-[#0066cc] group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold mb-3 font-[var(--font-heading)] text-gray-900">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}
