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

// Order Item Schema
const ORDER_ITEM_SCHEMA = z.object({
  id: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  quantity: z.number().optional().nullable(),
  price: z.number().optional().nullable(),
  variant: z.string().optional().nullable(),
  sku: z.string().optional().nullable(),
});

export const OrderSummaryPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      fontFamily: FONT_FAMILY_SCHEMA,
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      // Order Info
      orderId: z.string().optional().nullable(),
      orderDate: z.string().optional().nullable(),
      orderStatus: z.enum(['processing', 'confirmed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'refunded']).optional().nullable(),
      showOrderInfo: z.boolean().optional().nullable(),

      // Items
      items: z.array(ORDER_ITEM_SCHEMA).optional().nullable(),
      showItems: z.boolean().optional().nullable(),
      showItemImage: z.boolean().optional().nullable(),
      showItemVariant: z.boolean().optional().nullable(),
      showItemSku: z.boolean().optional().nullable(),
      showItemPrice: z.boolean().optional().nullable(),

      // Pricing
      currency: z.string().optional().nullable(),
      subtotal: z.number().optional().nullable(),
      discount: z.number().optional().nullable(),
      discountCode: z.string().optional().nullable(),
      shippingCost: z.number().optional().nullable(),
      tax: z.number().optional().nullable(),
      total: z.number().optional().nullable(),
      showPricing: z.boolean().optional().nullable(),
      showDiscount: z.boolean().optional().nullable(),
      showShipping: z.boolean().optional().nullable(),
      showTax: z.boolean().optional().nullable(),

      // Shipping Info
      shippingMethod: z.string().optional().nullable(),
      estimatedDelivery: z.string().optional().nullable(),
      trackingNumber: z.string().optional().nullable(),
      trackingUrl: z.string().optional().nullable(),
      shippingAddress: z.string().optional().nullable(),
      showShippingInfo: z.boolean().optional().nullable(),
      showTracking: z.boolean().optional().nullable(),

      // Payment Info
      paymentMethod: z.string().optional().nullable(),
      cardLastFour: z.string().optional().nullable(),
      paymentStatus: z.enum(['pending', 'paid', 'failed', 'refunded']).optional().nullable(),
      showPaymentInfo: z.boolean().optional().nullable(),

      // Customer Info
      customerName: z.string().optional().nullable(),
      customerEmail: z.string().optional().nullable(),
      showCustomerInfo: z.boolean().optional().nullable(),

      // Additional
      notes: z.string().optional().nullable(),
      showNotes: z.boolean().optional().nullable(),

      // CTA Button
      showCtaButton: z.boolean().optional().nullable(),
      ctaButtonText: z.string().optional().nullable(),
      ctaButtonUrl: z.string().optional().nullable(),
      ctaButtonColor: COLOR_SCHEMA,
      ctaButtonTextColor: COLOR_SCHEMA,

      // Info Message (above button)
      showInfoMessage: z.boolean().optional().nullable(),
      infoMessage: z.string().optional().nullable(),

      // Footer Image
      showFooterImage: z.boolean().optional().nullable(),
      footerImageUrl: z.string().optional().nullable(),
      footerImageAlt: z.string().optional().nullable(),
      footerImageWidth: z.number().optional().nullable(),

      // Layout
      headerLayout: z.enum(['stacked', 'sideBySide']).optional().nullable(),
      headerGap: z.number().optional().nullable(),
      detailsRowGap: z.number().optional().nullable(),
      headerTopPadding: z.number().optional().nullable(),

      // Styling
      headerColor: COLOR_SCHEMA,
      accentColor: COLOR_SCHEMA,
      textColor: COLOR_SCHEMA,
      borderColor: COLOR_SCHEMA,
      statusColor: COLOR_SCHEMA,
      totalColor: COLOR_SCHEMA,
    })
    .optional()
    .nullable(),
});

export type OrderSummaryProps = z.infer<typeof OrderSummaryPropsSchema>;
export type OrderItem = z.infer<typeof ORDER_ITEM_SCHEMA>;

export const OrderSummaryPropsDefaults = {
  // Order Info
  orderId: 'ORD-12345',
  orderDate: new Date().toLocaleDateString(),
  orderStatus: 'confirmed',
  showOrderInfo: true,

  // Items
  items: [
    {
      id: '1',
      name: 'Premium Product',
      image: 'https://placehold.co/80x80/EEE/999?text=Item',
      quantity: 2,
      price: 49.99,
      variant: 'Large / Blue',
      sku: 'SKU-001',
    },
    {
      id: '2',
      name: 'Another Product',
      image: 'https://placehold.co/80x80/EEE/999?text=Item',
      quantity: 1,
      price: 29.99,
      variant: 'Medium / Red',
      sku: 'SKU-002',
    },
  ] as OrderItem[],
  showItems: true,
  showItemImage: true,
  showItemVariant: true,
  showItemSku: false,
  showItemPrice: true,

  // Pricing
  currency: '$',
  subtotal: 129.97,
  discount: 10.00,
  discountCode: 'SAVE10',
  shippingCost: 5.99,
  tax: 9.60,
  total: 135.56,
  showPricing: true,
  showDiscount: true,
  showShipping: true,
  showTax: true,

  // Shipping Info
  shippingMethod: 'Standard Shipping',
  estimatedDelivery: '3-5 Business Days',
  trackingNumber: '1Z999AA10123456784',
  trackingUrl: 'https://example.com/track',
  shippingAddress: '123 Main Street, Apt 4B\nNew York, NY 10001\nUSA',
  showShippingInfo: true,
  showTracking: true,

  // Payment Info
  paymentMethod: 'Credit Card',
  cardLastFour: '4242',
  paymentStatus: 'paid',
  showPaymentInfo: true,

  // Customer Info
  customerName: 'John Doe',
  customerEmail: 'john@example.com',
  showCustomerInfo: true,

  // Additional
  notes: '',
  showNotes: false,

  // CTA Button
  showCtaButton: true,
  ctaButtonText: 'VIEW YOUR ORDER',
  ctaButtonUrl: '#',
  ctaButtonColor: '#1a2b4a',
  ctaButtonTextColor: '#FFFFFF',

  // Info Message
  showInfoMessage: true,
  infoMessage: 'It may take up to 24 hours for tracking information to update.',

  // Footer Image
  showFooterImage: true,
  footerImageUrl: 'https://placehold.co/200x150/EEE/999?text=🚀',
  footerImageAlt: 'Order illustration',
  footerImageWidth: 200,

  // Layout
  headerLayout: 'stacked',
  headerGap: 40,
  detailsRowGap: 8,
  headerTopPadding: 16,

  // Styling
  headerColor: '#333333',
  accentColor: '#4CAF50',
  textColor: '#666666',
  borderColor: '#E0E0E0',
  statusColor: '#4CAF50',
  totalColor: '#333333',
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

const getPadding = (style: OrderSummaryProps['style']) =>
  style?.padding
    ? `${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px`
    : undefined;

// Status badge component
const StatusBadge = ({ status, color }: { status: string; color: string }) => {
  const statusLabels: Record<string, string> = {
    processing: '⏳ Processing',
    confirmed: '✓ Confirmed',
    shipped: '📦 Shipped',
    out_for_delivery: '🚚 Out for Delivery',
    delivered: '✅ Delivered',
    cancelled: '❌ Cancelled',
    refunded: '↩️ Refunded',
    pending: '⏳ Pending',
    paid: '✓ Paid',
    failed: '❌ Failed',
  };

  const statusColors: Record<string, string> = {
    processing: '#FF9800',
    confirmed: '#4CAF50',
    shipped: '#2196F3',
    out_for_delivery: '#9C27B0',
    delivered: '#4CAF50',
    cancelled: '#F44336',
    refunded: '#FF9800',
    pending: '#FF9800',
    paid: '#4CAF50',
    failed: '#F44336',
  };

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 'bold',
        backgroundColor: color || statusColors[status] || '#666',
        color: '#FFFFFF',
        textTransform: 'uppercase',
      }}
    >
      {statusLabels[status] || status}
    </span>
  );
};

// Section Header component
const SectionHeader = ({ title, color }: { title: string; color: string }) => (
  <div
    style={{
      fontSize: 14,
      fontWeight: 'bold',
      color: color,
      marginBottom: 12,
      paddingBottom: 8,
      borderBottom: '2px solid ' + color,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    }}
  >
    {title}
  </div>
);

export function OrderSummary({ style, props }: OrderSummaryProps) {
  // Order Info
  const orderId = props?.orderId ?? OrderSummaryPropsDefaults.orderId;
  const orderDate = props?.orderDate ?? OrderSummaryPropsDefaults.orderDate;
  const orderStatus = props?.orderStatus ?? OrderSummaryPropsDefaults.orderStatus;
  const showOrderInfo = props?.showOrderInfo ?? OrderSummaryPropsDefaults.showOrderInfo;

  // Items
  const items = props?.items ?? OrderSummaryPropsDefaults.items;
  const showItems = props?.showItems ?? OrderSummaryPropsDefaults.showItems;
  const showItemImage = props?.showItemImage ?? OrderSummaryPropsDefaults.showItemImage;
  const showItemVariant = props?.showItemVariant ?? OrderSummaryPropsDefaults.showItemVariant;
  const showItemSku = props?.showItemSku ?? OrderSummaryPropsDefaults.showItemSku;
  const showItemPrice = props?.showItemPrice ?? OrderSummaryPropsDefaults.showItemPrice;

  // Pricing
  const currency = props?.currency ?? OrderSummaryPropsDefaults.currency;
  const subtotal = props?.subtotal ?? OrderSummaryPropsDefaults.subtotal;
  const discount = props?.discount ?? OrderSummaryPropsDefaults.discount;
  const discountCode = props?.discountCode ?? OrderSummaryPropsDefaults.discountCode;
  const shippingCost = props?.shippingCost ?? OrderSummaryPropsDefaults.shippingCost;
  const tax = props?.tax ?? OrderSummaryPropsDefaults.tax;
  const total = props?.total ?? OrderSummaryPropsDefaults.total;
  const showPricing = props?.showPricing ?? OrderSummaryPropsDefaults.showPricing;
  const showDiscount = props?.showDiscount ?? OrderSummaryPropsDefaults.showDiscount;
  const showShipping = props?.showShipping ?? OrderSummaryPropsDefaults.showShipping;
  const showTax = props?.showTax ?? OrderSummaryPropsDefaults.showTax;

  // Shipping Info
  const shippingMethod = props?.shippingMethod ?? OrderSummaryPropsDefaults.shippingMethod;
  const estimatedDelivery = props?.estimatedDelivery ?? OrderSummaryPropsDefaults.estimatedDelivery;
  const trackingNumber = props?.trackingNumber ?? OrderSummaryPropsDefaults.trackingNumber;
  const trackingUrl = props?.trackingUrl ?? OrderSummaryPropsDefaults.trackingUrl;
  const shippingAddress = props?.shippingAddress ?? OrderSummaryPropsDefaults.shippingAddress;
  const showShippingInfo = props?.showShippingInfo ?? OrderSummaryPropsDefaults.showShippingInfo;
  const showTracking = props?.showTracking ?? OrderSummaryPropsDefaults.showTracking;

  // Payment Info
  const paymentMethod = props?.paymentMethod ?? OrderSummaryPropsDefaults.paymentMethod;
  const cardLastFour = props?.cardLastFour ?? OrderSummaryPropsDefaults.cardLastFour;
  const paymentStatus = props?.paymentStatus ?? OrderSummaryPropsDefaults.paymentStatus;
  const showPaymentInfo = props?.showPaymentInfo ?? OrderSummaryPropsDefaults.showPaymentInfo;

  // Customer Info
  const customerName = props?.customerName ?? OrderSummaryPropsDefaults.customerName;
  const customerEmail = props?.customerEmail ?? OrderSummaryPropsDefaults.customerEmail;
  const showCustomerInfo = props?.showCustomerInfo ?? OrderSummaryPropsDefaults.showCustomerInfo;

  // Additional
  const notes = props?.notes ?? OrderSummaryPropsDefaults.notes;
  const showNotes = props?.showNotes ?? OrderSummaryPropsDefaults.showNotes;

  // CTA Button
  const showCtaButton = props?.showCtaButton ?? OrderSummaryPropsDefaults.showCtaButton;
  const ctaButtonText = props?.ctaButtonText ?? OrderSummaryPropsDefaults.ctaButtonText;
  const ctaButtonUrl = props?.ctaButtonUrl ?? OrderSummaryPropsDefaults.ctaButtonUrl;
  const ctaButtonColor = props?.ctaButtonColor ?? OrderSummaryPropsDefaults.ctaButtonColor;
  const ctaButtonTextColor = props?.ctaButtonTextColor ?? OrderSummaryPropsDefaults.ctaButtonTextColor;

  // Info Message
  const showInfoMessage = props?.showInfoMessage ?? OrderSummaryPropsDefaults.showInfoMessage;
  const infoMessage = props?.infoMessage ?? OrderSummaryPropsDefaults.infoMessage;

  // Footer Image
  const showFooterImage = props?.showFooterImage ?? OrderSummaryPropsDefaults.showFooterImage;
  const footerImageUrl = props?.footerImageUrl ?? OrderSummaryPropsDefaults.footerImageUrl;
  const footerImageAlt = props?.footerImageAlt ?? OrderSummaryPropsDefaults.footerImageAlt;
  const footerImageWidth = props?.footerImageWidth ?? OrderSummaryPropsDefaults.footerImageWidth;

  // Layout
  const headerLayout = props?.headerLayout ?? OrderSummaryPropsDefaults.headerLayout;
  const headerGap = props?.headerGap ?? OrderSummaryPropsDefaults.headerGap;
  const detailsRowGap = props?.detailsRowGap ?? OrderSummaryPropsDefaults.detailsRowGap;
  const headerTopPadding = props?.headerTopPadding ?? OrderSummaryPropsDefaults.headerTopPadding;

  // Styling
  const headerColor = props?.headerColor ?? OrderSummaryPropsDefaults.headerColor;
  const accentColor = props?.accentColor ?? OrderSummaryPropsDefaults.accentColor;
  const textColor = props?.textColor ?? OrderSummaryPropsDefaults.textColor;
  const borderColor = props?.borderColor ?? OrderSummaryPropsDefaults.borderColor;
  const statusColor = props?.statusColor ?? OrderSummaryPropsDefaults.statusColor;
  const totalColor = props?.totalColor ?? OrderSummaryPropsDefaults.totalColor;

  const wrapperStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? '#FFFFFF',
    padding: getPadding(style) ?? '20px',
    fontFamily: getFontFamily(style?.fontFamily),
  };

  const cardStyle: CSSProperties = {
    border: `1px solid ${borderColor}`,
    borderRadius: 8,
    overflow: 'hidden',
  };

  const sectionStyle: CSSProperties = {
    padding: 16,
    borderBottom: `1px solid ${borderColor}`,
  };

  const rowStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    color: textColor ?? undefined,
    fontSize: 14,
  };

  const labelStyle: CSSProperties = {
    color: textColor ?? undefined,
  };

  const valueStyle: CSSProperties = {
    fontWeight: 500,
    color: headerColor ?? undefined,
  };

  // Side-by-side container style
  const sideBySideContainerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: headerGap,
    paddingTop: headerTopPadding,
    marginBottom: 20,
    paddingBottom: 20,
    borderBottom: `1px solid ${borderColor}`,
  };

  // Side-by-side section style (for individual columns)
  const sideBySideSectionStyle: CSSProperties = {
    padding: '0 12px',
  };

  // Shipping Address Section (for side-by-side layout)
  const ShippingAddressSection = () => (
    <div style={sideBySideSectionStyle}>
      <SectionHeader title="📍 SHIPPING ADDRESS" color={accentColor ?? '#4CAF50'} />
      {shippingAddress && (
        <div style={{ fontSize: 13, color: headerColor ?? undefined, whiteSpace: 'pre-line', lineHeight: 1.6 }}>
          {shippingAddress}
        </div>
      )}
      {!shippingAddress && (
        <div style={{ fontSize: 13, color: textColor ?? undefined, fontStyle: 'italic' }}>
          No shipping address provided
        </div>
      )}
    </div>
  );

  // Order Details Section (for side-by-side layout)
  const OrderDetailsSection = () => (
    <div style={sideBySideSectionStyle}>
      <SectionHeader title="📋 ORDER DETAILS" color={accentColor ?? '#4CAF50'} />
      {trackingNumber && (
        <div style={{ ...rowStyle, marginBottom: detailsRowGap }}>
          <span style={labelStyle}>Tracking #</span>
          {trackingUrl ? (
            <a
              href={trackingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: accentColor ?? '#4CAF50',
                fontFamily: 'monospace',
                fontSize: 12,
                textDecoration: 'underline',
              }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(trackingUrl, '_blank');
              }}
            >
              {trackingNumber}
            </a>
          ) : (
            <span style={{ ...valueStyle, fontFamily: 'monospace', fontSize: 12 }}>{trackingNumber}</span>
          )}
        </div>
      )}
      <div style={{ ...rowStyle, marginBottom: detailsRowGap }}>
        <span style={labelStyle}>Order #</span>
        <span style={{ ...valueStyle, fontFamily: 'monospace' }}>{orderId}</span>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>Date Ordered</span>
        <span style={valueStyle}>{orderDate}</span>
      </div>
    </div>
  );

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        {/* Side-by-side layout for Shipping Address and Order Details */}
        {headerLayout === 'sideBySide' && (showShippingInfo || showOrderInfo) && (
          <div style={sideBySideContainerStyle}>
            {showShippingInfo && <ShippingAddressSection />}
            {showOrderInfo && <OrderDetailsSection />}
          </div>
        )}

        {/* Order Info Section (stacked layout) */}
        {headerLayout !== 'sideBySide' && showOrderInfo && (
          <div style={sectionStyle}>
            <SectionHeader title="📋 Order Details" color={accentColor ?? '#4CAF50'} />
            <div style={rowStyle}>
              <span style={labelStyle}>Order Number</span>
              <span style={{ ...valueStyle, fontFamily: 'monospace' }}>{orderId}</span>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Order Date</span>
              <span style={valueStyle}>{orderDate}</span>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Status</span>
              <StatusBadge status={orderStatus ?? 'confirmed'} color={statusColor ?? ''} />
            </div>
          </div>
        )}

        {/* Customer Info Section */}
        {showCustomerInfo && (
          <div style={sectionStyle}>
            <SectionHeader title="👤 Customer" color={accentColor ?? '#4CAF50'} />
            <div style={rowStyle}>
              <span style={labelStyle}>Name</span>
              <span style={valueStyle}>{customerName}</span>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Email</span>
              <span style={valueStyle}>{customerEmail}</span>
            </div>
          </div>
        )}

        {/* Items Section */}
        {showItems && items && items.length > 0 && (
          <div style={sectionStyle}>
            <SectionHeader title="🛒 Items" color={accentColor ?? '#4CAF50'} />
            {items.map((item, index) => (
              <div
                key={item?.id || index}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '12px 0',
                  borderBottom: index < items.length - 1 ? `1px dashed ${borderColor}` : 'none',
                }}
              >
                {showItemImage && item?.image && (
                  <img
                    src={item.image}
                    alt={item.name ?? ''}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 4,
                      border: `1px solid ${borderColor}`,
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: headerColor ?? undefined, marginBottom: 4 }}>
                    {item?.name}
                  </div>
                  {showItemVariant && item?.variant && (
                    <div style={{ fontSize: 12, color: textColor ?? undefined }}>{item.variant}</div>
                  )}
                  {showItemSku && item?.sku && (
                    <div style={{ fontSize: 11, color: textColor ?? undefined, fontFamily: 'monospace' }}>
                      SKU: {item.sku}
                    </div>
                  )}
                  <div style={{ fontSize: 13, color: textColor ?? undefined, marginTop: 4 }}>
                    Qty: {item?.quantity}{showItemPrice && <> × {currency}{item?.price?.toFixed(2)}</>}
                  </div>
                </div>
                {showItemPrice && (
                  <div style={{ fontWeight: 'bold', color: headerColor ?? undefined, alignSelf: 'center' }}>
                    {currency}{((item?.quantity ?? 0) * (item?.price ?? 0)).toFixed(2)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pricing Section */}
        {showPricing && (
          <div style={sectionStyle}>
            <SectionHeader title="💰 Order Total" color={accentColor ?? '#4CAF50'} />
            <div style={rowStyle}>
              <span style={labelStyle}>Subtotal</span>
              <span style={valueStyle}>{currency}{subtotal?.toFixed(2)}</span>
            </div>
            {showDiscount && discount && discount > 0 && (
              <div style={{ ...rowStyle, color: '#4CAF50' }}>
                <span>Discount {discountCode && `(${discountCode})`}</span>
                <span style={{ fontWeight: 'bold' }}>-{currency}{discount.toFixed(2)}</span>
              </div>
            )}
            {showShipping && (
              <div style={rowStyle}>
                <span style={labelStyle}>Shipping</span>
                <span style={valueStyle}>
                  {shippingCost === 0 ? 'FREE' : `${currency}${shippingCost?.toFixed(2)}`}
                </span>
              </div>
            )}
            {showTax && (
              <div style={rowStyle}>
                <span style={labelStyle}>Tax</span>
                <span style={valueStyle}>{currency}{tax?.toFixed(2)}</span>
              </div>
            )}
            <div
              style={{
                ...rowStyle,
                paddingTop: 12,
                marginTop: 8,
                borderTop: `2px solid ${borderColor}`,
                fontSize: 18,
              }}
            >
              <span style={{ fontWeight: 'bold', color: totalColor ?? undefined }}>Total</span>
              <span style={{ fontWeight: 'bold', color: totalColor ?? undefined, fontSize: 20 }}>
                {currency}{total?.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Shipping Info Section (stacked layout only, as side-by-side shows it above) */}
        {headerLayout !== 'sideBySide' && showShippingInfo && (
          <div style={sectionStyle}>
            <SectionHeader title="📦 Shipping" color={accentColor ?? '#4CAF50'} />
            <div style={rowStyle}>
              <span style={labelStyle}>Method</span>
              <span style={valueStyle}>{shippingMethod}</span>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Est. Delivery</span>
              <span style={valueStyle}>{estimatedDelivery}</span>
            </div>
            {showTracking && trackingNumber && (
              <div style={rowStyle}>
                <span style={labelStyle}>Tracking</span>
                {trackingUrl ? (
                  <a
                    href={trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: accentColor ?? '#4CAF50',
                      fontFamily: 'monospace',
                      fontSize: 12,
                      textDecoration: 'none',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(trackingUrl, '_blank');
                    }}
                  >
                    {trackingNumber} →
                  </a>
                ) : (
                  <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{trackingNumber}</span>
                )}
              </div>
            )}
            {shippingAddress && (
              <div style={{ marginTop: 12, padding: 12, backgroundColor: '#F5F5F5', borderRadius: 4 }}>
                <div style={{ fontSize: 12, color: textColor ?? undefined, fontWeight: 'bold', marginBottom: 4 }}>
                  Shipping Address
                </div>
                <div style={{ fontSize: 13, color: headerColor ?? undefined, whiteSpace: 'pre-line' }}>
                  {shippingAddress}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payment Info Section */}
        {showPaymentInfo && (
          <div style={sectionStyle}>
            <SectionHeader title="💳 Payment" color={accentColor ?? '#4CAF50'} />
            <div style={rowStyle}>
              <span style={labelStyle}>Method</span>
              <span style={valueStyle}>
                {paymentMethod} {cardLastFour && `•••• ${cardLastFour}`}
              </span>
            </div>
            <div style={rowStyle}>
              <span style={labelStyle}>Status</span>
              <StatusBadge status={paymentStatus ?? 'paid'} color="" />
            </div>
          </div>
        )}

        {/* Notes Section */}
        {showNotes && notes && (
          <div style={{ ...sectionStyle, borderBottom: 'none' }}>
            <SectionHeader title="📝 Notes" color={accentColor ?? '#4CAF50'} />
            <div style={{ fontSize: 14, color: textColor ?? undefined, lineHeight: 1.5 }}>{notes}</div>
          </div>
        )}

        {/* Info Message & CTA Button Section */}
        {(showInfoMessage || showCtaButton || showFooterImage) && (
          <div style={{ padding: 24, textAlign: 'center', borderTop: `1px solid ${borderColor}` }}>
            {/* Info Message */}
            {showInfoMessage && infoMessage && (
              <div
                style={{
                  fontSize: 13,
                  color: textColor ?? '#666666',
                  marginBottom: showCtaButton ? 20 : 0,
                  lineHeight: 1.5,
                }}
              >
                {infoMessage}
              </div>
            )}

            {/* CTA Button */}
            {showCtaButton && (
              <a
                href={ctaButtonUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  backgroundColor: ctaButtonColor ?? '#1a2b4a',
                  color: ctaButtonTextColor ?? '#FFFFFF',
                  padding: '14px 32px',
                  borderRadius: 4,
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: 14,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  marginBottom: showFooterImage ? 24 : 0,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (ctaButtonUrl) {
                    window.open(ctaButtonUrl, '_blank');
                  }
                }}
              >
                {ctaButtonText}
              </a>
            )}

            {/* Footer Image */}
            {showFooterImage && footerImageUrl && (
              <div style={{ marginTop: showCtaButton ? 0 : 20 }}>
                <img
                  src={footerImageUrl}
                  alt={footerImageAlt ?? 'Order illustration'}
                  style={{
                    width: footerImageWidth ?? 200,
                    height: 'auto',
                    maxWidth: '100%',
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

