import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.services': 'Services',
        'nav.portfolio': 'Nos Réalisations',
        'nav.about': 'À propos',
        'nav.contact': 'Contact',
        'nav.getQuote': 'Demander un devis',

        // Hero Section
        'hero.title': 'Transformez Votre Présence Numérique',
        'hero.subtitle': 'Agence digitale de classe mondiale offrant des résultats exceptionnels. Nous créons des sites web, applications mobiles et expériences digitales qui génèrent des résultats.',
        'hero.cta.primary': 'Commencer Maintenant',
        'hero.cta.secondary': 'Voir Nos Services',

        // Promo Banner
        'promo.text': 'Offre limitée 🎉: Pour célébrer notre parcours, profitez de 60 % DE RÉDUCTION sur l\'ensemble de nos services dès maintenant !',
        'promo.cta': 'Obtenez Votre Devis GRATUIT',

        // Services
        'services.title': 'Nos Services',
        'services.subtitle': 'Solutions digitales complètes pour votre entreprise',

        'services.web.title': 'Création & Développement de Sites Web',
        'services.web.subtitle': 'SITES WEB PROFESSIONNELS',
        'services.web.description': 'Votre site doit vendre, pas juste exister. Un site web professionnel, c\'est plus de crédibilité, plus de visiteurs, plus de contacts, une présence en ligne 24h/24.',
        'services.web.feature1': 'Création de sites web professionnels',
        'services.web.feature2': 'Sites vitrines modernes',
        'services.web.feature3': 'Sites rapides et sécurisés',
        'services.web.feature4': 'WordPress / CMS',
        'services.web.feature5': 'Applications mobiles',

        'services.marketing.title': 'Marketing Digital & Visibilité',
        'services.marketing.subtitle': 'MARKETING DIGITAL',
        'services.marketing.description': 'Développez votre activité avec des campagnes digitales ciblées. Le marketing digital permet plus de visibilité, la génération de leads qualifiés, et des résultats mesurables.',
        'services.marketing.feature1': 'SEO et Référencement',
        'services.marketing.feature2': 'Publicité en ligne (SEA)',
        'services.marketing.feature3': 'Email Marketing',
        'services.marketing.feature4': 'Gestion des réseaux sociaux',
        'services.marketing.feature5': 'Suivi des performances',

        'services.design.title': 'Design & Identité Visuelle',
        'services.design.subtitle': 'DESIGN & IDENTITÉ VISUELLE',
        'services.design.description': 'Votre image parle avant vous. Une bonne identité visuelle, c\'est plus de professionnalisme, plus de confiance, une marque mémorable.',
        'services.design.feature1': 'UI / UX Design',
        'services.design.feature2': 'Création de contenus graphiques',
        'services.design.feature3': 'Logo & identité de marque',
        'services.design.feature4': 'Charte graphique',
        'services.design.feature5': 'Image visuelle',

        'services.support.title': 'Support Technique & Infrastructure',
        'services.support.subtitle': 'MAINTENANCE ET OPTIMISATION',
        'services.support.description': 'Assurez la performance continue de votre présence digitale avec notre support technique complet et nos services d\'hébergement.',
        'services.support.feature1': 'Maintenance et Optimisation',
        'services.support.feature2': 'Hébergement & Infogérance',
        'services.support.feature3': 'Référencement Global',
        'services.support.feature4': 'Support technique 24/7',
        'services.support.feature5': 'Mises à jour de sécurité',

        'services.learnMore': 'En savoir plus',

        // About
        'about.title': 'À Propos de Nous',
        'about.subtitle': 'Agence digitale de classe mondiale offrant des résultats exceptionnels',
        'about.values.title': 'Nos Principes et Valeurs',

        'about.mission.title': 'Orienté Mission',
        'about.mission.description': 'Nous nous engageons à fournir des solutions digitales exceptionnelles qui stimulent la croissance des entreprises.',

        'about.innovation.title': 'Innovation',
        'about.innovation.description': 'Nous restons à la pointe avec des technologies de pointe et des meilleures pratiques modernes.',

        'about.partnership.title': 'Partenariat',
        'about.partnership.description': 'Nous construisons des relations durables avec nos clients basées sur la confiance et la transparence.',

        'about.excellence.title': 'Excellence',
        'about.excellence.description': 'Nous visons l\'excellence dans chaque projet, en garantissant qualité et performance.',

        'about.expertise.title': 'Nos Activités & Compétences',
        'about.team.cta': 'Prêt à créer quelque chose de formidable?',
        'about.team.button': 'Démarrer un projet',

        // Contact
        'contact.title': 'Contact',
        'contact.subtitle': 'Contactez-nous pour discuter de votre projet',
        'contact.form.name': 'Nom',
        'contact.form.email': 'Email',
        'contact.form.phone': 'Téléphone',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Envoyer',
        'contact.hours': 'Horaires',
        'contact.hours.time': 'Lundi - Dimanche: 08h - 20h',

        // Footer
        'footer.newsletter.title': 'Votre Newsletter',
        'footer.newsletter.description': 'Inscrivez-vous à notre newsletter pour rester informé(e) des dernières tendances, conseils et actualités en matière de solutions numériques.',
        'footer.newsletter.placeholder': 'Votre email',
        'footer.newsletter.subscribe': 'S\'abonner',
        'footer.services.title': 'Nos Services',
        'footer.legal.title': 'Légal',
        'footer.legal.privacy': 'Politique de Confidentialité',
        'footer.legal.terms': 'Conditions d\'Utilisation',
        'footer.contact.title': 'Contact',
        'footer.copyright': '© Copyright MPE DIGITAL SOLUTIONS. All Rights Reserved',
        'footer.designedBy': 'Designed by MDS support',

        // Locations
        'location.yaounde': 'Yaoundé',
        'location.yaounde.address': 'Nkoabang – Entrée Carrière',
        'location.douala': 'Douala',
        'location.douala.address': 'Cité des palmiers',
        'location.france': 'France',
        'location.france.address': '91096, Paris, France',

        // CTA
        'cta.startProject': 'Start project',
        'cta.getQuote': 'Obtenez Votre Devis',
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.portfolio': 'Portfolio',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.getQuote': 'Get a Quote',

        // Hero Section
        'hero.title': 'Transform Your Digital Presence',
        'hero.subtitle': 'World-class digital agency delivering exceptional results. We create websites, mobile applications and digital experiences that generate results.',
        'hero.cta.primary': 'Get Started',
        'hero.cta.secondary': 'View Our Services',

        // Promo Banner
        'promo.text': 'Limited Offer 🎉: To celebrate our journey, enjoy 60% OFF all our services now!',
        'promo.cta': 'Get Your FREE Quote',

        // Services
        'services.title': 'Our Services',
        'services.subtitle': 'Complete digital solutions for your business',

        'services.web.title': 'Web Creation & Development',
        'services.web.subtitle': 'PROFESSIONAL WEBSITES',
        'services.web.description': 'Your website should sell, not just exist. A professional website means more credibility, more visitors, more contacts, a 24/7 online presence.',
        'services.web.feature1': 'Professional website creation',
        'services.web.feature2': 'Modern showcase sites',
        'services.web.feature3': 'Fast and secure sites',
        'services.web.feature4': 'WordPress / CMS',
        'services.web.feature5': 'Mobile applications',

        'services.marketing.title': 'Digital Marketing & Visibility',
        'services.marketing.subtitle': 'DIGITAL MARKETING',
        'services.marketing.description': 'Grow your business with targeted digital campaigns. Digital marketing enables more visibility, qualified lead generation, and measurable results.',
        'services.marketing.feature1': 'SEO and Search Engine Optimization',
        'services.marketing.feature2': 'Online Advertising (SEA)',
        'services.marketing.feature3': 'Email Marketing',
        'services.marketing.feature4': 'Social media management',
        'services.marketing.feature5': 'Performance tracking',

        'services.design.title': 'Design & Visual Identity',
        'services.design.subtitle': 'DESIGN & VISUAL IDENTITY',
        'services.design.description': 'Your image speaks before you do. A good visual identity means more professionalism, more trust, a memorable brand.',
        'services.design.feature1': 'UI / UX Design',
        'services.design.feature2': 'Graphic content creation',
        'services.design.feature3': 'Logo & brand identity',
        'services.design.feature4': 'Brand guidelines',
        'services.design.feature5': 'Visual imagery',

        'services.support.title': 'Technical Support & Infrastructure',
        'services.support.subtitle': 'MAINTENANCE AND OPTIMIZATION',
        'services.support.description': 'Ensure continuous performance of your digital presence with our comprehensive technical support and hosting services.',
        'services.support.feature1': 'Maintenance and Optimization',
        'services.support.feature2': 'Hosting & Infrastructure Management',
        'services.support.feature3': 'Global SEO',
        'services.support.feature4': '24/7 technical support',
        'services.support.feature5': 'Security updates',

        'services.learnMore': 'Learn more',

        // About
        'about.title': 'About Us',
        'about.subtitle': 'World-class digital agency delivering exceptional results',
        'about.values.title': 'Our Principles and Values',

        'about.mission.title': 'Mission-Oriented',
        'about.mission.description': 'We are committed to providing exceptional digital solutions that drive business growth.',

        'about.innovation.title': 'Innovation',
        'about.innovation.description': 'We stay at the forefront with cutting-edge technologies and modern best practices.',

        'about.partnership.title': 'Partnership',
        'about.partnership.description': 'We build lasting relationships with our clients based on trust and transparency.',

        'about.excellence.title': 'Excellence',
        'about.excellence.description': 'We aim for excellence in every project, ensuring quality and performance.',

        'about.expertise.title': 'Our Activities & Expertise',
        'about.team.cta': 'Ready to create something great?',
        'about.team.button': 'Start a project',

        // Contact
        'contact.title': 'Contact',
        'contact.subtitle': 'Contact us to discuss your project',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.phone': 'Phone',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Send',
        'contact.hours': 'Business Hours',
        'contact.hours.time': 'Monday - Sunday: 08h - 20h',

        // Footer
        'footer.newsletter.title': 'Newsletter',
        'footer.newsletter.description': 'Subscribe to our newsletter to stay informed about the latest trends, tips and news in digital solutions.',
        'footer.newsletter.placeholder': 'Your email',
        'footer.newsletter.subscribe': 'Subscribe',
        'footer.services.title': 'Our Services',
        'footer.legal.title': 'Legal',
        'footer.legal.privacy': 'Privacy Policy',
        'footer.legal.terms': 'Terms of Use',
        'footer.contact.title': 'Contact',
        'footer.copyright': '© Copyright MPE DIGITAL SOLUTIONS. All Rights Reserved',
        'footer.designedBy': 'Designed by MDS support',

        // Locations
        'location.yaounde': 'Yaoundé',
        'location.yaounde.address': 'Nkoabang – Carrière Entrance',
        'location.douala': 'Douala',
        'location.douala.address': 'Cité des palmiers',
        'location.france': 'France',
        'location.france.address': '91096, Paris, France',

        // CTA
        'cta.startProject': 'Start project',
        'cta.getQuote': 'Get Your Quote',
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('fr');

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations['fr']] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
