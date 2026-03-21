import { CLOUDINARY_WHATSAPP_SCREENSHOTS } from "@/constants/cloudinaryWhatsAppAssets"

export const WHATSAPP_TESTIMONIAL_IMAGES = CLOUDINARY_WHATSAPP_SCREENSHOTS

/**
 * Returns a list of WhatsApp testimonial image paths.
 * Uses the bundled asset list when available and falls back to the static list.
 */
export const getWhatsAppTestimonials = () => {
  return [...WHATSAPP_TESTIMONIAL_IMAGES]
}



