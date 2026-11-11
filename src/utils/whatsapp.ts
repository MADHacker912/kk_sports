export const WHATSAPP_PHONE = '919569886010';
export const DISPLAY_PHONE = '+91 9569886010';
export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=44%2F319%2C+Meston+Road%2C+Parade%2C+Kanpur%2C+Uttar+Pradesh+208001';

export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

export function getProductInquiryUrl(productName: string): string {
  return getWhatsAppUrl(`Hello K.K. Sports, I am interested in ${productName}. Please share more details and availability.`);
}

export function getGeneralInquiryUrl(): string {
  return getWhatsAppUrl('Hello K.K. Sports, I would like to know more about your products.');
}

export function getWholesaleInquiryUrl(): string {
  return getWhatsAppUrl('Hello K.K. Sports, I am interested in wholesale and institutional supply for academy/school/club. Please share details and pricing.');
}

export function getStoreVisitInquiryUrl(): string {
  return getWhatsAppUrl('Hello K.K. Sports, I am planning to visit your Meston Road Kanpur store. Please share store timing and location assistance.');
}
