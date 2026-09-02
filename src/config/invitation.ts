import type { LocalizedText } from "@/types/language";

/**
 * Central invitation data — edit this file to personalize your Ganpati home puja invite.
 * All guest-facing text is provided in English, Gujarati, and Hindi.
 */
export const invitationConfig = {
  /** Used in browser tab and WhatsApp link preview. */
  meta: {
    title: "Ganpati Darshan | Home Invitation",
    description:
      "You're invited for Ganpati darshan at our home! Come take Bappa's blessings. Ganpati Bappa Morya!",
    /** Replace with your deployed URL for rich WhatsApp previews. */
    siteUrl: "https://your-site.vercel.app",
  },

  /** Family or host name shown on the hero and contact sections. */
  familyName: {
    en: "The Patel Family",
    gu: "પટેલ પરિવાર",
    hi: "पटेल परिवार",
  } satisfies LocalizedText,

  /** Short welcome message after the family name. */
  welcomeMessage: {
    en: "Bappa is home and waiting for you! Come visit us for darshan, aarti, prasad, and lots of festive joy with our family.",
    gu: "બાપ્પા અમારા ઘરે છે અને તમારી રાહ જોઈ રહ્યા છે! દર્શન, આરતી, પ્રસાદ અને ઉત્સવની ખુશીઓ માટે અમને મળવા આવો.",
    hi: "बाप्पा हमारे घर पर हैं और आपका इंतज़ार कर रहे हैं! दर्शन, आरती, प्रसाद और परिवार के साथ उत्सव की खुशियों के लिए आइए।",
  } satisfies LocalizedText,

  /** Sacred opening line — appears on the envelope screen and hero. */
  invocation: {
    en: "॥ Shree Ganeshaya Namah ॥",
    gu: "॥ શ્રી ગણેશાય નમઃ ॥",
    hi: "॥ श्री गणेशाय नमः ॥",
  } satisfies LocalizedText,

  /** Main headline on the hero section. */
  heroTitle: {
    en: "Come for Darshan!",
    gu: "દર્શન માટે આવો!",
    hi: "दर्शन के लिए आइए!",
  } satisfies LocalizedText,

  /** Subtitle beneath the hero title. */
  heroSubtitle: {
    en: "Visit our home · Take Bappa's blessings · Celebrate together!",
    gu: "અમારા ઘરે આવો · બાપ્પાના આશીર્વાદ લો · સાથે ઉજવણી કરો!",
    hi: "हमारे घर आइए · बाप्पा का आशीर्वाद लें · साथ में जश्न मनाएं!",
  } satisfies LocalizedText,

  /** Target datetime for the countdown (ISO 8601). */
  countdownTarget: "2026-09-14T09:30:00+05:30",

  /** Primary event date/time shown in hero and details cards. */
  eventDetails: {
    date: {
      en: "Monday, 14 September 2026",
      gu: "સોમવાર, ૧૪ સપ્ટેમ્બર ૨૦૨૬",
      hi: "सोमवार, १४ सितंबर २०२६",
    },
    time: {
      en: "8:00 AM – 9:00 PM daily",
      gu: "સવારે ૮ – રાત્રે ૯ (રોજ)",
      hi: "सुबह ८ – रात ९ (प्रतिदिन)",
    },
    locationLabel: {
      en: "The Patel Residence",
      gu: "પટેલ નિવાસ",
      hi: "पटेल निवास",
    },
  },

  /** Full postal address — shown in venue section. */
  address: {
    en: "12, Gulmohar Lane, Vile Parle West, Mumbai 400056",
    gu: "૧૨, ગુલમોહર લેન, વિલે પાર્લે પશ્ચિમ, મુંબઈ ૪૦૦૦૫૬",
    hi: "१२, गुलमोहर लेन, विले पार्ले वेस्ट, मुंबई ४०००५६",
  } satisfies LocalizedText,

  /**
   * Google Maps link — paste your exact location pin URL here.
   * Guests tap once to open turn-by-turn directions.
   */
  googleMapsUrl:
    "https://maps.google.com/?q=12+Gulmohar+Lane+Vile+Parle+West+Mumbai",

  /** Host contact — tap-to-call on mobile. */
  contactPhone: "+919876543210",
  contactPhoneDisplay: "+91 98765 43210",

  /** Optional WhatsApp number for quick queries (without + prefix for wa.me link). */
  whatsappNumber: "919876543210",

  /** Daily aarti timings displayed in the schedule block. */
  dailyAarti: {
    morning: "8:00 AM",
    evening: "7:00 PM",
  },

  /** Darshan schedule — when guests can visit for darshan at our home. */
  events: [
    {
      id: "darshan-morning",
      time: "8:00 AM – 12:00 PM",
      date: "Daily",
      title: {
        en: "Morning Darshan",
        gu: "સવારનું દર્શન",
        hi: "प्रातः दर्शन",
      },
      description: {
        en: "Walk in anytime — darshan, morning aarti & prasad. All welcome!",
        gu: "કોઈ પણ સમયે આવો — દર્શન, સવારની આરતી અને પ્રસાદ. બધા સ્વાગત્ય!",
        hi: "कभी भी आइए — दर्शन, प्रातः आरती और प्रसाद। सभी का स्वागत है!",
      },
    },
    {
      id: "aarti-evening",
      time: "7:00 PM",
      date: "Daily",
      title: {
        en: "Evening Aarti",
        gu: "સાંજની આરતી",
        hi: "संध्याकालीन आरती",
      },
      description: {
        en: "Join us for sandhya aarti, bhajans & hot prasad — the best time to visit!",
        gu: "સંધ્યા આરતી, ભજન અને ગરમ પ્રસાદ માટે જોડાઓ — મળવા માટે સર્વોત્તમ સમય!",
        hi: "संध्या आरती, भजन और गर्म प्रसाद — मिलने का सबसे अच्छा समय!",
      },
    },
    {
      id: "darshan-open",
      time: "12:00 PM – 9:00 PM",
      date: "Daily",
      title: {
        en: "Open Darshan",
        gu: "ખુલ્લું દર્શન",
        hi: "खुला दर्शन",
      },
      description: {
        en: "Our doors are open! Drop by with family & friends for Bappa's darshan.",
        gu: "અમારા દ્વાર ખુલ્લા છે! પરિવાર અને મિત્રો સાથે બાપ્પાના દર્શન માટે આવો.",
        hi: "हमारे द्वार खुले हैं! परिवार और दोस्तों के साथ बाप्पा के दर्शन के लिए आइए।",
      },
    },
    {
      id: "visarjan",
      time: "5:00 PM",
      date: "25 Sep 2026",
      title: {
        en: "Visarjan Day",
        gu: "વિસર્જન દિવસ",
        hi: "विसर्जन दिवस",
      },
      description: {
        en: "Join us for Bappa's visarjan procession — one last darshan before farewell!",
        gu: "બાપ્પાના વિસર્જન શોભાયાત્રામાં જોડાઓ — વિદાય પહેલાં એક છેલ્લું દર્શન!",
        hi: "बाप्पा की विसर्जन शोभायात्रा में शामिल हों — विदाई से पहले एक आखिरी दर्शन!",
      },
    },
  ] as const,

  /** Gallery images — replace URLs with your own photos in /public/gallery/. */
  gallery: [
    { src: "/gallery/ganpati-1.svg", alt: "Ganpati decoration" },
    { src: "/gallery/ganpati-2.svg", alt: "Home mandap" },
    { src: "/gallery/ganpati-3.svg", alt: "Aarti moment" },
    { src: "/gallery/ganpati-4.svg", alt: "Family celebration" },
  ],

  /** Closing blessing shloka shown near the footer. */
  blessing: {
    en: "Vakratunda Mahakaya, Suryakoti Samaprabha — Nirvighnam Kurume Deva, Sarva-Karyeshu Sarvada.",
    gu: "વક્રતુંડ મહાકાય, સૂર્યકોટિ સમપ્રભા — નિર્વિઘ્નં કુરુ મે દેવ, સર્વકાર્યેષુ સર્વદા.",
    hi: "वक्रतुण्ड महाकाय, सूर्यकोटि समप्रभ — निर्विघ्नं कुरु मे देव, सर्वकार्येषु सर्वदा.",
  } satisfies LocalizedText,

  blessingMeaning: {
    en: "May the Lord with the curved trunk remove every obstacle and bless every beginning.",
    gu: "વક્ર સૂંઢવાળા પ્રभુ દરેક અવરોધ દૂર કરે અને દરેક નવી શરૂઆતને આશીર્વાદ આપે.",
    hi: "वक्र सूंड वाले भगवान हर बाधा दूर करें और हर नई शुरुआत को आशीर्वाद दें।",
  } satisfies LocalizedText,

  /** UI chrome — button labels and section headings. */
  ui: {
    tapToOpen: {
      en: "Tap to Open",
      gu: "ખોલવા ટેપ કરો",
      hi: "खोलने के लिए टैप करें",
    },
    enterInvitation: {
      en: "Enter Invitation",
      gu: "આમંત્રણમાં પ્રવેશ કરો",
      hi: "निमंत्रण में प्रवेश करें",
    },
    viewCelebration: {
      en: "See darshan timings",
      gu: "દર્શન સમય જુઓ",
      hi: "दर्शन का समय देखें",
    },
    countdownLabel: {
      en: "Darshan opens in",
      gu: "દર્શન શરૂ થાય છે",
      hi: "दर्शन शुरू होगा",
    },
    familyIntro: {
      en: "Our Family",
      gu: "અમારું પરિવાર",
      hi: "हमारा परिवार",
    },
    schedule: {
      en: "Darshan Timings",
      gu: "દર્શન સમય",
      hi: "दर्शन का समय",
    },
    venue: {
      en: "Venue",
      gu: "સ્થળ",
      hi: "स्थान",
    },
    openMaps: {
      en: "Open in Google Maps",
      gu: "Google Maps માં ખોલો",
      hi: "Google Maps में खोलें",
    },
    gallery: {
      en: "Gallery",
      gu: "ફોટો ગેલેરી",
      hi: "फोटो गैलरी",
    },
    blessings: {
      en: "Blessings",
      gu: "આશીર્વાદ",
      hi: "आशीर्वाद",
    },
    contact: {
      en: "Contact Us",
      gu: "સંપર્ક કરો",
      hi: "संपर्क करें",
    },
    callUs: {
      en: "Call us",
      gu: "અમને કૉલ કરો",
      hi: "हमें कॉल करें",
    },
    whatsapp: {
      en: "Message on WhatsApp",
      gu: "WhatsApp પર સંદેશ મોકલો",
      hi: "WhatsApp पर संदेश भेजें",
    },
    share: {
      en: "Share invitation",
      gu: "આમંત્રણ શેર કરો",
      hi: "निमंत्रण साझा करें",
    },
    mute: {
      en: "Mute music",
      gu: "સંગીત બંધ કરો",
      hi: "संगीत बंद करें",
    },
    unmute: {
      en: "Play music",
      gu: "સંગીત ચાલુ",
      hi: "संगीत चलाएं",
    },
    days: { en: "Days", gu: "દિવસ", hi: "दिन" },
    hours: { en: "Hours", gu: "કલાક", hi: "घंटे" },
    minutes: { en: "Minutes", gu: "મિનિટ", hi: "मिनट" },
    seconds: { en: "Seconds", gu: "સેકંડ", hi: "सेकंड" },
    rsvp: {
      en: "RSVP",
      gu: "RSVP",
      hi: "RSVP",
    },
    rsvpTitle: {
      en: "Coming for darshan?",
      gu: "દર્શન માટે આવી રહ્યા છો?",
      hi: "दर्शन के लिए आ रहे हैं?",
    },
    rsvpSubtitle: {
      en: "Let us know so we can welcome you with prasad and open arms!",
      gu: "અમને જણાવો જેથી અમે પ્રસાદ અને ખુલ્લા હાથથી સ્વાગત કરી શકીએ!",
      hi: "हमें बताएं ताकि हम प्रसाद और खुले दिल से स्वागत कर सकें!",
    },
    rsvpName: {
      en: "Your name",
      gu: "તમારું નામ",
      hi: "आपका नाम",
    },
    rsvpGuests: {
      en: "Number of guests",
      gu: "મહેમાનોની સંખ્યા",
      hi: "मेहमानों की संख्या",
    },
    rsvpMessage: {
      en: "Message (optional)",
      gu: "સંદેશ (વૈકલ્પિક)",
      hi: "संदेश (वैकल्पिक)",
    },
    rsvpSubmit: {
      en: "Send RSVP via WhatsApp",
      gu: "WhatsApp દ્વારા RSVP મોકલો",
      hi: "WhatsApp पर RSVP भेजें",
    },
    getDirections: {
      en: "Get Directions",
      gu: "દિશા મેળવો",
      hi: "दिशा प्राप्त करें",
    },
    eventDetails: {
      en: "Event Details",
      gu: "કાર્યક્રમની વિગતો",
      hi: "कार्यक्रम विवरण",
    },
  },
};
