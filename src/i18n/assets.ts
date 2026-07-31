import type { ImageMetadata } from 'astro';

import dashboardImage from '@/assets/product/dashboard-final-pt-br.png';
import { dashboardPreview } from '@config/product-assets';

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
    image: null,
    approvalStatus: 'pending',
  }),
} satisfies Record<Locale, LocalizedHomeAsset>);
