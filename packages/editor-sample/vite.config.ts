import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: '/email-builder-js/',
  resolve: {
    alias: {
      // Block components
      '@usewaypoint/block-address': path.resolve(__dirname, '../block-address/src/index.tsx'),
      '@usewaypoint/block-avatar': path.resolve(__dirname, '../block-avatar/src/index.tsx'),
      '@usewaypoint/block-button': path.resolve(__dirname, '../block-button/src/index.tsx'),
      '@usewaypoint/block-columns-container': path.resolve(__dirname, '../block-columns-container/src/index.tsx'),
      '@usewaypoint/block-contact': path.resolve(__dirname, '../block-contact/src/index.tsx'),
      '@usewaypoint/block-container': path.resolve(__dirname, '../block-container/src/index.tsx'),
      '@usewaypoint/block-coupon': path.resolve(__dirname, '../block-coupon/src/index.tsx'),
      '@usewaypoint/block-divider': path.resolve(__dirname, '../block-divider/src/index.tsx'),
      '@usewaypoint/block-footer': path.resolve(__dirname, '../block-footer/src/index.tsx'),
      '@usewaypoint/block-header': path.resolve(__dirname, '../block-header/src/index.tsx'),
      '@usewaypoint/block-heading': path.resolve(__dirname, '../block-heading/src/index.tsx'),
      '@usewaypoint/block-html': path.resolve(__dirname, '../block-html/src/index.tsx'),
      '@usewaypoint/block-image': path.resolve(__dirname, '../block-image/src/index.tsx'),
      '@usewaypoint/block-map': path.resolve(__dirname, '../block-map/src/index.tsx'),
      '@usewaypoint/block-order-summary': path.resolve(__dirname, '../block-order-summary/src/index.tsx'),
      '@usewaypoint/block-product-card': path.resolve(__dirname, '../block-product-card/src/index.tsx'),
      '@usewaypoint/block-promo-banner': path.resolve(__dirname, '../block-promo-banner/src/index.tsx'),
      '@usewaypoint/block-social-links': path.resolve(__dirname, '../block-social-links/src/index.tsx'),
      '@usewaypoint/block-spacer': path.resolve(__dirname, '../block-spacer/src/index.tsx'),
      '@usewaypoint/block-text': path.resolve(__dirname, '../block-text/src/index.tsx'),
      // Core packages
      '@usewaypoint/document-core': path.resolve(__dirname, '../document-core/src/index.ts'),
      '@usewaypoint/email-builder': path.resolve(__dirname, '../email-builder/src/index.ts'),
    },
  },
});
