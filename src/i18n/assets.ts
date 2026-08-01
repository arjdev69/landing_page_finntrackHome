import type { ImageMetadata } from 'astro';

import dashboardImageEnUS from '@/assets/product/dashboard-final-en-us.png';
import dashboardImage from '@/assets/product/dashboard-final-pt-br.png';
import { dashboardPreview, dashboardPreviewEnUS } from '@config/product-assets';

import type { Locale } from './locales';

export interface LocalizedHomeAsset {
  readonly image: ImageMetadata | null;
  readonly approvalStatus: 'final-approved' | 'pending';
}

export const homeAssetByLocale = Object.freeze({
  'pt-BR': Object.freeze({
    image: dashboardImage,
    approvalStatus: dashboardPreview.approvalStatus,
  }),
  'en-US': Object.freeze({
    image: dashboardImageEnUS,
    approvalStatus: dashboardPreviewEnUS.approvalStatus,
  }),
} satisfies Record<Locale, LocalizedHomeAsset>);
