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
        ecommerceSite: "Sleek E-Commerce Website",
        devCV: "Developer CV Website",
        tetrisGame: "Neon Tetris Game",
        pvzGame: "Plant vs Zombies Clone",
        barberSite: "Barber Shop Website",
        saveContact: "Save Contact Info"
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
        ecommerceSite: "موقع التجارة الإلكترونية الأنيق",
        devCV: "موقع السيرة الذاتية للمطور",
        tetrisGame: "لعبة تتريس النيون",
        pvzGame: "نسخة من النباتات ضد الزومبي",
        barberSite: "موقع صالون الحلاقة",
        saveContact: "حفظ معلومات الاتصال"
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
        ecommerceSite: "Sleek E-Commerce Website",
        devCV: "Developer CV Website",
        tetrisGame: "Neon Tetris Game",
        pvzGame: "Plant vs Zombies Clone",
        barberSite: "Barber Shop Website",
        saveContact: "Contact Informatie Opslaan"
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
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Apply translations
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
