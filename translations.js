// Translation object for all languages
const translations = {
    en: {
        name: "Amin Shan",
        title: "Software Developer | Web Designer | Game Creator | E/Business Card Maker | Logo Designer",
        tagline: "\"Building experiences. Coding with creativity.\"",
        call: "Call Now",
        whatsapp: "WhatsApp",
        email: "Email",
        instagram: "Instagram",
        snapchat: "Snapchat",
        github: "GitHub",
        linkedin: "LinkedIn",
        portfolio: "Portfolio",
        projectsTitle: "Projects",
        devPortfolio: "Developer Portfolio",
        workoutApp: "Workout Planner App",
        workoutAppDesc: "Personal fitness tracking platform",
        ecommerceSite: "Sleek E-Commerce Website",
        ecommerceSiteDesc: "Modern online shopping experience",
        devCV: "Developer CV Website",
        devCVDesc: "Interactive resume & portfolio",
        tetrisGame: "Neon Tetris Game",
        tetrisGameDesc: "Retro arcade game with neon aesthetics",
        pvzGame: "Plant vs Zombies Clone",
        pvzGameDesc: "Tower defense strategy game remake",
        barberSite: "Barber Shop Website",
        barberSiteDesc: "Booking system for modern barbershop",
        saveContact: "Save Contact Info",
        adnanPortfolio: "Adnan Videographer Portfolio",
        adnanECard: "Adnan Videographer E-Card",
        adnanPortfolioDesc: "Professional videography portfolio site",
        adnanECardDesc: "Interactive digital business card"
    },
    ar: {
        name: "أمين شان",
        title: "مطور برمجيات | مصمم ويب | منشئ ألعاب | صانع بطاقات إلكترونية | مصمم شعارات",
        tagline: "\"بناء التجارب. البرمجة بإبداع.\"",
        call: "اتصل الآن",
        whatsapp: "واتساب",
        email: "البريد الإلكتروني",
        instagram: "إنستغرام",
        snapchat: "سناب شات",
        github: "جيت هاب",
        linkedin: "لينكد إن",
        portfolio: "المحفظة",
        projectsTitle: "المشاريع",
        devPortfolio: "محفظة المطور",
        workoutApp: "تطبيق مخطط التمارين",
        workoutAppDesc: "منصة تتبع اللياقة الشخصية",
        ecommerceSite: "موقع التجارة الإلكترونية الأنيق",
        ecommerceSiteDesc: "تجربة تسوق عبر الإنترنت الحديثة",
        devCV: "موقع السيرة الذاتية للمطور",
        devCVDesc: "السيرة الذاتية التفاعلية والمحفظة",
        tetrisGame: "لعبة تتريس النيون",
        tetrisGameDesc: "لعبة أركيد ريترو مع جماليات النيون",
        pvzGame: "نسخة من النباتات ضد الزومبي",
        pvzGameDesc: "إعادة صنع لعبة استراتيجية الدفاع عن البرج",
        barberSite: "موقع صالون الحلاقة",
        barberSiteDesc: "نظام الحجز لصالون حلاقة حديث",
        saveContact: "حفظ معلومات الاتصال",
        adnanPortfolio: "محفظة أدنان المصور",
        adnanECard: "بطاقة أدنان الإلكترونية",
        adnanPortfolioDesc: "موقع محفظة تصوير احترافي",
        adnanECardDesc: "بطاقة عمل رقمية تفاعلية"
    },
    nl: {
        name: "Amin Shan",
        title: "Software Ontwikkelaar | Web Ontwerper | Game Maker | E/Business Card Maker | Logo Ontwerper",
        tagline: "\"Ervaringen bouwen. Coderen met creativiteit.\"",
        call: "Bel Nu",
        whatsapp: "WhatsApp",
        email: "E-mail",
        instagram: "Instagram",
        snapchat: "Snapchat",
        github: "GitHub",
        linkedin: "LinkedIn",
        portfolio: "Portfolio",
        projectsTitle: "Projecten",
        devPortfolio: "Developer Portfolio",
        workoutApp: "Workout Planner App",
        workoutAppDesc: "Persoonlijk fitness-tracking platform",
        ecommerceSite: "Sleek E-Commerce Website",
        ecommerceSiteDesc: "Moderne online winkelervaring",
        devCV: "Developer CV Website",
        devCVDesc: "Interactief cv & portfolio",
        tetrisGame: "Neon Tetris Game",
        tetrisGameDesc: "Retro arcade spel met neon-esthetiek",
        pvzGame: "Plant vs Zombies Clone",
        pvzGameDesc: "Tower defense strategy game remake",
        barberSite: "Barber Shop Website",
        barberSiteDesc: "Boekingssysteem voor moderne kapsalon",
        saveContact: "Contact Informatie Opslaan",
        adnanPortfolio: "Adnan Videograaf Portfolio",
        adnanECard: "Adnan Videograaf E-Card",
        adnanPortfolioDesc: "Professionele videografie portfolio site",
        adnanECardDesc: "Interactieve digitale visitekaartje"
    }
};

// Language manager
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        this.setLanguage(this.currentLanguage);
        this.bindEvents();
    }

    bindEvents() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const lang = e.target.dataset.lang;
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        
        // Update HTML lang and dir attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update active button with smooth transition
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Apply translations with fade effect
        this.applyTranslations();
    }

    applyTranslations() {
        const currentTranslations = translations[this.currentLanguage];
        
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (currentTranslations[key]) {
                // Add fade transition
                element.style.opacity = '0';
                setTimeout(() => {
                    element.textContent = currentTranslations[key];
                    element.style.opacity = '1';
                }, 150);
            }
        });

        // Update title and meta tags
        if (this.currentLanguage === 'ar') {
            document.title = currentTranslations.name + ' - مطور برمجيات';
        } else if (this.currentLanguage === 'nl') {
            document.title = currentTranslations.name + ' - Software Ontwikkelaar';
        } else {
            document.title = currentTranslations.name + ' - Software Developer';
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// Initialize language manager when DOM is loaded
let languageManager;
document.addEventListener('DOMContentLoaded', () => {
    languageManager = new LanguageManager();
});

// Add CSS for smooth transitions
const style = document.createElement('style');
style.textContent = `
    [data-translate] {
        transition: opacity 0.3s ease;
    }
    
    body[lang="ar"] .contact-btn span,
    body[lang="nl"] .contact-btn span {
        font-size: 0.9em;
    }
`;
document.head.appendChild(style);
