import blueBackpackImg from './assets/images/regenerated_image_1790355497075.png';
import grayBackpackImg from './assets/images/regenerated_image_1790355512835.png';

export const PRODUCT_CONFIG = {
  price: 200,
  oldPrice: 249,
  currency: 'DH',
  defaultWhatsappNumber: '212600000000',
  images: {
    blue: blueBackpackImg,
    gray: grayBackpackImg,
  },
  colors: [
    {
      id: 'blue' as const,
      name: 'أزرق',
      hex: '#1e3a8a',
      bgClass: 'bg-blue-900',
      label: 'أزرق نيفي أنيق',
    },
    {
      id: 'gray' as const,
      name: 'رمادي',
      hex: '#4b5563',
      bgClass: 'bg-gray-600',
      label: 'رمادي عصري',
    },
  ],
  moroccanCities: [
    'الدار البيضاء (Casablanca)',
    'الرباط (Rabat)',
    'طنجة (Tanger)',
    'مراكش (Marrakech)',
    'فاس (Fès)',
    'أكادير (Agadir)',
    'مكناس (Meknès)',
    'القنيطرة (Kénitra)',
    'تطوان (Tétouan)',
    'وجدة (Oujda)',
    'تمارة (Témara)',
    'سلا (Salé)',
    'الجديدة (El Jadida)',
    'المحمدية (Mohammédia)',
    'بني ملال (Béni Mellal)',
    'الناظور (Nador)',
    'خريبكة (Khouribga)',
    'سطات (Settat)',
    'تازة (Taza)',
    'العرائش (Larache)',
    'العيون (Laâyoune)',
    'الداخلة (Dakhla)',
    'ورزازات (Ouarzazate)',
    'مدينة أخرى',
  ],
};

export function getStoreWhatsappNumber(): string {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('store_whatsapp_number');
    if (saved) return saved.trim();
  }
  return (
    import.meta.env.VITE_WHATSAPP_NUMBER ||
    PRODUCT_CONFIG.defaultWhatsappNumber
  );
}

export function saveStoreWhatsappNumber(number: string): void {
  if (typeof window !== 'undefined') {
    const clean = number.replace(/[^0-9]/g, '');
    localStorage.setItem('store_whatsapp_number', clean);
  }
}
