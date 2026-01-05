import React, { CSSProperties } from 'react';
import { z } from 'zod';

const FONT_FAMILY_SCHEMA = z
  .enum([
    'MODERN_SANS',
    'BOOK_SANS',
    'ORGANIC_SANS',
    'GEOMETRIC_SANS',
    'HEAVY_SANS',
    'ROUNDED_SANS',
    'MODERN_SERIF',
    'BOOK_SERIF',
    'MONOSPACE',
  ])
  .nullable()
  .optional();

const COLOR_SCHEMA = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/)
  .nullable()
  .optional();

const PADDING_SCHEMA = z
  .object({
    top: z.number(),
    bottom: z.number(),
    right: z.number(),
    left: z.number(),
  })
  .optional()
  .nullable();

// Single product item schema
const ProductItemSchema = z.object({
  imageUrl: z.string().optional().nullable(),
  imageAlt: z.string().optional().nullable(),
  productName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  originalPrice: z.string().optional().nullable(),
  rating: z.number().min(0).max(5).optional().nullable(),
  reviewCount: z.string().optional().nullable(),
  stockStatus: z.enum(['in_stock', 'low_stock', 'out_of_stock']).optional().nullable(),
  stockText: z.string().optional().nullable(),
  badgeText: z.string().optional().nullable(),
  buttonUrl: z.string().optional().nullable(),
});

export type ProductItem = z.infer<typeof ProductItemSchema>;

export const ProductCardPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      fontFamily: FONT_FAMILY_SCHEMA,
      padding: PADDING_SCHEMA,
      textAlign: z.enum(['left', 'center', 'right']).optional().nullable(),
    })
    .optional()
    .nullable(),
  props: z
    .object({
      // Loop Mode
      useLoop: z.boolean().optional().nullable(),
      productsVariable: z.string().optional().nullable(), // e.g., "{{products}}"
      products: z.array(ProductItemSchema).optional().nullable(),
      columns: z.number().min(1).max(4).optional().nullable(),
      gap: z.number().optional().nullable(),

      // Product Image
      imageUrl: z.string().optional().nullable(),
      imageAlt: z.string().optional().nullable(),
      imagePosition: z.enum(['top', 'left', 'right']).optional().nullable(),
      imageWidth: z.number().optional().nullable(),
      imageHeight: z.number().optional().nullable(),
      imageFit: z.enum(['cover', 'contain', 'fill', 'none']).optional().nullable(),

      // Product Info
      productName: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      
      // Pricing
      price: z.string().optional().nullable(),
      originalPrice: z.string().optional().nullable(),
      currency: z.string().optional().nullable(),
      showDiscount: z.boolean().optional().nullable(),
      
      // Rating
      showRating: z.boolean().optional().nullable(),
      rating: z.number().min(0).max(5).optional().nullable(),
      reviewCount: z.string().optional().nullable(),
      
      // Stock Status
      showStock: z.boolean().optional().nullable(),
      stockStatus: z.enum(['in_stock', 'low_stock', 'out_of_stock']).optional().nullable(),
      stockText: z.string().optional().nullable(),
      
      // Badge
      showBadge: z.boolean().optional().nullable(),
      badgeText: z.string().optional().nullable(),
      badgeColor: COLOR_SCHEMA,
      
      // CTA Button
      showButton: z.boolean().optional().nullable(),
      buttonText: z.string().optional().nullable(),
      buttonUrl: z.string().optional().nullable(),
      buttonColor: COLOR_SCHEMA,
      buttonTextColor: COLOR_SCHEMA,
      
      // Card Styling
      cardBackgroundColor: COLOR_SCHEMA,
      borderColor: COLOR_SCHEMA,
      showBorder: z.boolean().optional().nullable(),
      showShadow: z.boolean().optional().nullable(),
      
      // Text Colors
      nameColor: COLOR_SCHEMA,
      descriptionColor: COLOR_SCHEMA,
      priceColor: COLOR_SCHEMA,
      originalPriceColor: COLOR_SCHEMA,
    })
    .optional()
    .nullable(),
});

export type ProductCardProps = z.infer<typeof ProductCardPropsSchema>;

export const ProductCardPropsDefaults = {
  // Loop Mode
  useLoop: false,
  productsVariable: '{{products}}',
  products: [
    {
      imageUrl: 'https://placehold.co/300x300/EEE/999?text=Product+1',
      imageAlt: 'Product 1',
      productName: 'Product 1',
      description: 'Description for product 1',
      price: '99.99',
      originalPrice: '149.99',
      rating: 4.5,
      reviewCount: '128',
      stockStatus: 'in_stock' as const,
      stockText: 'In Stock',
      badgeText: 'SALE',
      buttonUrl: '#',
    },
    {
      imageUrl: 'https://placehold.co/300x300/EEE/999?text=Product+2',
      imageAlt: 'Product 2',
      productName: 'Product 2',
      description: 'Description for product 2',
      price: '79.99',
      originalPrice: '99.99',
      rating: 4.0,
      reviewCount: '95',
      stockStatus: 'in_stock' as const,
      stockText: 'In Stock',
      badgeText: 'NEW',
      buttonUrl: '#',
    },
  ] as ProductItem[],
  columns: 2,
  gap: 16,

  // Image
  imageUrl: 'https://placehold.co/300x300/EEE/999?text=Product',
  imageAlt: 'Product Image',
  imagePosition: 'top',
  imageWidth: null as number | null,
  imageHeight: 250,
  imageFit: 'cover',
  
  // Product Info
  productName: 'Product Name',
  description: 'This is a short description of the product. Add details that help customers understand the product.',
  
  // Pricing
  price: '99.99',
  originalPrice: '149.99',
  currency: '$',
  showDiscount: true,
  
  // Rating
  showRating: true,
  rating: 4.5,
  reviewCount: '128',
  
  // Stock
  showStock: true,
  stockStatus: 'in_stock',
  stockText: 'In Stock',
  
  // Badge
  showBadge: true,
  badgeText: 'SALE',
  badgeColor: '#FF5722',
  
  // Button
  showButton: true,
  buttonText: 'Buy Now',
  buttonUrl: 'https://example.com/product',
  buttonColor: '#4CAF50',
  buttonTextColor: '#FFFFFF',
  
  // Card Styling
  cardBackgroundColor: '#FFFFFF',
  borderColor: '#E0E0E0',
  showBorder: true,
  showShadow: true,
  
  // Text Colors
  nameColor: '#333333',
  descriptionColor: '#666666',
  priceColor: '#4CAF50',
  originalPriceColor: '#999999',
} as const;

function getFontFamily(fontFamily: z.infer<typeof FONT_FAMILY_SCHEMA>) {
  switch (fontFamily) {
    case 'MODERN_SANS':
      return '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif';
    case 'BOOK_SANS':
      return 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif';
    case 'ORGANIC_SANS':
      return 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif';
    case 'GEOMETRIC_SANS':
      return 'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif';
    case 'HEAVY_SANS':
      return 'Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif';
    case 'ROUNDED_SANS':
      return 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif';
    case 'MODERN_SERIF':
      return 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif';
    case 'BOOK_SERIF':
      return '"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif';
    case 'MONOSPACE':
      return '"Nimbus Mono PS", "Courier New", "Cutive Mono", monospace';
  }
  return undefined;
}

const getPadding = (style: ProductCardProps['style']) =>
  style?.padding
    ? `${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px`
    : undefined;

// Star rating component
const StarRating = ({ rating, color }: { rating: number; color: string }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <span style={{ color, fontSize: 16 }}>
      {'★'.repeat(fullStars)}
      {hasHalfStar && '½'}
      {'☆'.repeat(emptyStars)}
    </span>
  );
};

// Single Product Card Component
function SingleProductCard({
  product,
  globalProps,
  style,
}: {
  product: ProductItem;
  globalProps: ProductCardProps['props'];
  style?: ProductCardProps['style'];
}) {
  // Merge product-specific props with global props
  const imageUrl = product?.imageUrl ?? globalProps?.imageUrl ?? ProductCardPropsDefaults.imageUrl;
  const imageAlt = product?.imageAlt ?? globalProps?.imageAlt ?? ProductCardPropsDefaults.imageAlt;
  const imagePosition = globalProps?.imagePosition ?? ProductCardPropsDefaults.imagePosition;
  const imageWidth = globalProps?.imageWidth ?? ProductCardPropsDefaults.imageWidth;
  const imageHeight = globalProps?.imageHeight ?? ProductCardPropsDefaults.imageHeight;
  const imageFit = globalProps?.imageFit ?? ProductCardPropsDefaults.imageFit;

  const productName = product?.productName ?? globalProps?.productName ?? ProductCardPropsDefaults.productName;
  const description = product?.description ?? globalProps?.description ?? ProductCardPropsDefaults.description;

  const price = product?.price ?? globalProps?.price ?? ProductCardPropsDefaults.price;
  const originalPrice = product?.originalPrice ?? globalProps?.originalPrice ?? ProductCardPropsDefaults.originalPrice;
  const currency = globalProps?.currency ?? ProductCardPropsDefaults.currency;
  const showDiscount = globalProps?.showDiscount ?? ProductCardPropsDefaults.showDiscount;

  const showRating = globalProps?.showRating ?? ProductCardPropsDefaults.showRating;
  const rating = product?.rating ?? globalProps?.rating ?? ProductCardPropsDefaults.rating;
  const reviewCount = product?.reviewCount ?? globalProps?.reviewCount ?? ProductCardPropsDefaults.reviewCount;

  const showStock = globalProps?.showStock ?? ProductCardPropsDefaults.showStock;
  const stockStatus = product?.stockStatus ?? globalProps?.stockStatus ?? ProductCardPropsDefaults.stockStatus;
  const stockText = product?.stockText ?? globalProps?.stockText ?? ProductCardPropsDefaults.stockText;

  const showBadge = globalProps?.showBadge ?? ProductCardPropsDefaults.showBadge;
  const badgeText = product?.badgeText ?? globalProps?.badgeText ?? ProductCardPropsDefaults.badgeText;
  const badgeColor = globalProps?.badgeColor ?? ProductCardPropsDefaults.badgeColor;

  const showButton = globalProps?.showButton ?? ProductCardPropsDefaults.showButton;
  const buttonText = globalProps?.buttonText ?? ProductCardPropsDefaults.buttonText;
  const buttonUrl = product?.buttonUrl ?? globalProps?.buttonUrl ?? ProductCardPropsDefaults.buttonUrl;
  const buttonColor = globalProps?.buttonColor ?? ProductCardPropsDefaults.buttonColor;
  const buttonTextColor = globalProps?.buttonTextColor ?? ProductCardPropsDefaults.buttonTextColor;

  const cardBackgroundColor = globalProps?.cardBackgroundColor ?? ProductCardPropsDefaults.cardBackgroundColor;
  const borderColor = globalProps?.borderColor ?? ProductCardPropsDefaults.borderColor;
  const showBorder = globalProps?.showBorder ?? ProductCardPropsDefaults.showBorder;
  const showShadow = globalProps?.showShadow ?? ProductCardPropsDefaults.showShadow;

  const nameColor = globalProps?.nameColor ?? ProductCardPropsDefaults.nameColor;
  const descriptionColor = globalProps?.descriptionColor ?? ProductCardPropsDefaults.descriptionColor;
  const priceColor = globalProps?.priceColor ?? ProductCardPropsDefaults.priceColor;
  const originalPriceColor = globalProps?.originalPriceColor ?? ProductCardPropsDefaults.originalPriceColor;

  const discountPercent = showDiscount && originalPrice && price
    ? Math.round((1 - parseFloat(price) / parseFloat(originalPrice)) * 100)
    : 0;

  const getStockColor = () => {
    switch (stockStatus) {
      case 'in_stock': return '#4CAF50';
      case 'low_stock': return '#FF9800';
      case 'out_of_stock': return '#F44336';
      default: return '#4CAF50';
    }
  };

  const cardStyle: CSSProperties = {
    backgroundColor: cardBackgroundColor ?? '#FFFFFF',
    border: showBorder ? `1px solid ${borderColor}` : 'none',
    borderRadius: 8,
    boxShadow: showShadow ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
    overflow: 'hidden',
    display: imagePosition === 'top' ? 'block' : 'flex',
    flexDirection: imagePosition === 'right' ? 'row-reverse' : 'row',
    height: '100%',
  };

  const imageContainerStyle: CSSProperties = {
    position: 'relative',
    width: imagePosition === 'top' ? '100%' : (imageWidth ? `${imageWidth}px` : '40%'),
    flexShrink: 0,
    overflow: 'hidden',
  };

  const imageStyle: CSSProperties = {
    width: imageWidth ? imageWidth : '100%',
    height: imageHeight ? imageHeight : 'auto',
    display: 'block',
    objectFit: imageFit as CSSProperties['objectFit'],
  };

  const badgeStyleObj: CSSProperties = {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: badgeColor ?? '#FF5722',
    color: '#FFFFFF',
    padding: '4px 12px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  };

  const contentStyle: CSSProperties = {
    padding: 16,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const nameStyle: CSSProperties = {
    fontSize: 18,
    fontWeight: 'bold',
    color: nameColor ?? '#333333',
    margin: '0 0 8px 0',
  };

  const descriptionStyle: CSSProperties = {
    fontSize: 14,
    color: descriptionColor ?? '#666666',
    margin: '0 0 12px 0',
    lineHeight: 1.5,
    flex: 1,
  };

  const priceContainerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
  };

  const currentPriceStyle: CSSProperties = {
    fontSize: 20,
    fontWeight: 'bold',
    color: priceColor ?? '#4CAF50',
  };

  const originalPriceStyleObj: CSSProperties = {
    fontSize: 14,
    color: originalPriceColor ?? '#999999',
    textDecoration: 'line-through',
  };

  const discountStyleObj: CSSProperties = {
    fontSize: 11,
    color: '#FFFFFF',
    backgroundColor: '#F44336',
    padding: '2px 6px',
    borderRadius: 4,
    fontWeight: 'bold',
  };

  const ratingStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
    fontSize: 14,
    color: '#666666',
  };

  const stockStyleObj: CSSProperties = {
    fontSize: 13,
    color: getStockColor(),
    marginBottom: 12,
    fontWeight: 500,
  };

  const buttonStyleObj: CSSProperties = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: buttonColor ?? '#4CAF50',
    color: buttonTextColor ?? '#FFFFFF',
    textDecoration: 'none',
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
    marginTop: 'auto',
  };

  return (
    <div style={cardStyle}>
      <div style={imageContainerStyle}>
        <img src={imageUrl ?? ''} alt={imageAlt ?? ''} style={imageStyle} />
        {showBadge && badgeText && (
          <div style={badgeStyleObj}>{badgeText}</div>
        )}
      </div>

      <div style={contentStyle}>
        <h3 style={nameStyle}>{productName}</h3>

        {showRating && (
          <div style={ratingStyle}>
            <StarRating rating={rating ?? 0} color="#FFB400" />
            <span>({reviewCount})</span>
          </div>
        )}

        <p style={descriptionStyle}>{description}</p>

        <div style={priceContainerStyle}>
          <span style={currentPriceStyle}>{currency}{price}</span>
          {showDiscount && originalPrice && (
            <>
              <span style={originalPriceStyleObj}>{currency}{originalPrice}</span>
              <span style={discountStyleObj}>{discountPercent}% OFF</span>
            </>
          )}
        </div>

        {showStock && (
          <div style={stockStyleObj}>
            {stockStatus === 'in_stock' && '✓ '}
            {stockStatus === 'low_stock' && '⚠ '}
            {stockStatus === 'out_of_stock' && '✗ '}
            {stockText}
          </div>
        )}

        {showButton && (
          <a href={buttonUrl ?? '#'} style={buttonStyleObj}>
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
}

export function ProductCard({ style, props }: ProductCardProps) {
  // Loop mode props
  const useLoop = props?.useLoop ?? ProductCardPropsDefaults.useLoop;
  const products = props?.products ?? ProductCardPropsDefaults.products;
  const columns = props?.columns ?? ProductCardPropsDefaults.columns;
  const gap = props?.gap ?? ProductCardPropsDefaults.gap;
  const productsVariable = props?.productsVariable ?? ProductCardPropsDefaults.productsVariable;

  const wrapperStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? undefined,
    padding: getPadding(style),
    fontFamily: getFontFamily(style?.fontFamily),
    textAlign: style?.textAlign ?? 'left',
  };

  // Grid container style for loop mode
  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
  };

  // If loop mode is enabled
  if (useLoop) {
    return (
      <div style={wrapperStyle}>
        {/* Variable indicator for template engines */}
        <div style={{ display: 'none' }} data-loop-variable={productsVariable}></div>
        
        <div style={gridStyle}>
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <SingleProductCard
                key={index}
                product={product}
                globalProps={props}
                style={style}
              />
            ))
          ) : (
            // Placeholder when no products
            <div style={{ 
              padding: 40, 
              textAlign: 'center', 
              color: '#999',
              gridColumn: `1 / -1`,
              border: '2px dashed #ddd',
              borderRadius: 8,
            }}>
              <p style={{ margin: 0, fontSize: 14 }}>
                📦 Products will be mapped from <strong>{productsVariable}</strong>
              </p>
              <p style={{ margin: '8px 0 0', fontSize: 12, color: '#aaa' }}>
                Add products in the sidebar panel
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Single product mode (original behavior)
  return (
    <div style={wrapperStyle}>
      <SingleProductCard
        product={{
          imageUrl: props?.imageUrl,
          imageAlt: props?.imageAlt,
          productName: props?.productName,
          description: props?.description,
          price: props?.price,
          originalPrice: props?.originalPrice,
          rating: props?.rating,
          reviewCount: props?.reviewCount,
          stockStatus: props?.stockStatus,
          stockText: props?.stockText,
          badgeText: props?.badgeText,
          buttonUrl: props?.buttonUrl,
        }}
        globalProps={props}
        style={style}
      />
    </div>
  );
}

