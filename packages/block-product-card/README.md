# @usewaypoint/block-product-card

ProductCard block component for email templates with full e-commerce features.

## Usage

```tsx
import { ProductCard, ProductCardPropsSchema } from '@usewaypoint/block-product-card';

<ProductCard
  style={{ padding: { top: 16, bottom: 16, left: 24, right: 24 } }}
  props={{
    imageUrl: 'https://example.com/product.jpg',
    productName: 'Product Name',
    description: 'Product description',
    price: '99.99',
    originalPrice: '149.99',
    currency: '$',
    showDiscount: true,
    showRating: true,
    rating: 4.5,
    reviewCount: '128',
    showStock: true,
    stockStatus: 'in_stock',
    stockText: 'In Stock',
    showBadge: true,
    badgeText: 'SALE',
    showButton: true,
    buttonText: 'Buy Now',
    buttonUrl: 'https://example.com/product',
  }}
/>
```

