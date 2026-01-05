import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Divider, IconButton, TextField,ToggleButton, Typography } from '@mui/material';
import { OrderSummaryProps, OrderSummaryPropsDefaults, OrderSummaryPropsSchema } from '@usewaypoint/block-order-summary';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import ColorInput from './helpers/inputs/ColorInput';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import VariableTextInput from './helpers/inputs/VariableTextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type OrderSummarySidebarPanelProps = {
  data: OrderSummaryProps;
  setData: (v: OrderSummaryProps) => void;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
    {children}
  </Typography>
);

export default function OrderSummarySidebarPanel({ data, setData }: OrderSummarySidebarPanelProps) {
  const [, setErrors] = useState<any>(null);

  const updateData = (d: unknown) => {
    const res = OrderSummaryPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  // Order Info
  const orderId = data.props?.orderId ?? OrderSummaryPropsDefaults.orderId;
  const orderDate = data.props?.orderDate ?? OrderSummaryPropsDefaults.orderDate;
  const orderStatus = data.props?.orderStatus ?? OrderSummaryPropsDefaults.orderStatus;
  const showOrderInfo = data.props?.showOrderInfo ?? OrderSummaryPropsDefaults.showOrderInfo;

  // Items
  const items = data.props?.items ?? OrderSummaryPropsDefaults.items;
  const showItems = data.props?.showItems ?? OrderSummaryPropsDefaults.showItems;
  const showItemImage = data.props?.showItemImage ?? OrderSummaryPropsDefaults.showItemImage;
  const showItemVariant = data.props?.showItemVariant ?? OrderSummaryPropsDefaults.showItemVariant;
  const showItemSku = data.props?.showItemSku ?? OrderSummaryPropsDefaults.showItemSku;
  const showItemPrice = data.props?.showItemPrice ?? OrderSummaryPropsDefaults.showItemPrice;

  // Pricing
  const currency = data.props?.currency ?? OrderSummaryPropsDefaults.currency;
  const subtotal = data.props?.subtotal ?? OrderSummaryPropsDefaults.subtotal;
  const discount = data.props?.discount ?? OrderSummaryPropsDefaults.discount;
  const discountCode = data.props?.discountCode ?? OrderSummaryPropsDefaults.discountCode;
  const shippingCost = data.props?.shippingCost ?? OrderSummaryPropsDefaults.shippingCost;
  const tax = data.props?.tax ?? OrderSummaryPropsDefaults.tax;
  const total = data.props?.total ?? OrderSummaryPropsDefaults.total;
  const showPricing = data.props?.showPricing ?? OrderSummaryPropsDefaults.showPricing;
  const showDiscount = data.props?.showDiscount ?? OrderSummaryPropsDefaults.showDiscount;
  const showShipping = data.props?.showShipping ?? OrderSummaryPropsDefaults.showShipping;
  const showTax = data.props?.showTax ?? OrderSummaryPropsDefaults.showTax;

  // Shipping Info
  const shippingMethod = data.props?.shippingMethod ?? OrderSummaryPropsDefaults.shippingMethod;
  const estimatedDelivery = data.props?.estimatedDelivery ?? OrderSummaryPropsDefaults.estimatedDelivery;
  const trackingNumber = data.props?.trackingNumber ?? OrderSummaryPropsDefaults.trackingNumber;
  const trackingUrl = data.props?.trackingUrl ?? OrderSummaryPropsDefaults.trackingUrl;
  const shippingAddress = data.props?.shippingAddress ?? OrderSummaryPropsDefaults.shippingAddress;
  const showShippingInfo = data.props?.showShippingInfo ?? OrderSummaryPropsDefaults.showShippingInfo;
  const showTracking = data.props?.showTracking ?? OrderSummaryPropsDefaults.showTracking;

  // Payment Info
  const paymentMethod = data.props?.paymentMethod ?? OrderSummaryPropsDefaults.paymentMethod;
  const cardLastFour = data.props?.cardLastFour ?? OrderSummaryPropsDefaults.cardLastFour;
  const paymentStatus = data.props?.paymentStatus ?? OrderSummaryPropsDefaults.paymentStatus;
  const showPaymentInfo = data.props?.showPaymentInfo ?? OrderSummaryPropsDefaults.showPaymentInfo;

  // Customer Info
  const customerName = data.props?.customerName ?? OrderSummaryPropsDefaults.customerName;
  const customerEmail = data.props?.customerEmail ?? OrderSummaryPropsDefaults.customerEmail;
  const showCustomerInfo = data.props?.showCustomerInfo ?? OrderSummaryPropsDefaults.showCustomerInfo;

  // Notes
  const notes = data.props?.notes ?? OrderSummaryPropsDefaults.notes;
  const showNotes = data.props?.showNotes ?? OrderSummaryPropsDefaults.showNotes;

  // CTA Button
  const showCtaButton = data.props?.showCtaButton ?? OrderSummaryPropsDefaults.showCtaButton;
  const ctaButtonText = data.props?.ctaButtonText ?? OrderSummaryPropsDefaults.ctaButtonText;
  const ctaButtonUrl = data.props?.ctaButtonUrl ?? OrderSummaryPropsDefaults.ctaButtonUrl;
  const ctaButtonColor = data.props?.ctaButtonColor ?? OrderSummaryPropsDefaults.ctaButtonColor;
  const ctaButtonTextColor = data.props?.ctaButtonTextColor ?? OrderSummaryPropsDefaults.ctaButtonTextColor;

  // Info Message
  const showInfoMessage = data.props?.showInfoMessage ?? OrderSummaryPropsDefaults.showInfoMessage;
  const infoMessage = data.props?.infoMessage ?? OrderSummaryPropsDefaults.infoMessage;

  // Footer Image
  const showFooterImage = data.props?.showFooterImage ?? OrderSummaryPropsDefaults.showFooterImage;
  const footerImageUrl = data.props?.footerImageUrl ?? OrderSummaryPropsDefaults.footerImageUrl;
  const footerImageAlt = data.props?.footerImageAlt ?? OrderSummaryPropsDefaults.footerImageAlt;
  const footerImageWidth = data.props?.footerImageWidth ?? OrderSummaryPropsDefaults.footerImageWidth;

  // Layout
  const headerLayout = data.props?.headerLayout ?? OrderSummaryPropsDefaults.headerLayout;
  const headerGap = data.props?.headerGap ?? OrderSummaryPropsDefaults.headerGap;
  const detailsRowGap = data.props?.detailsRowGap ?? OrderSummaryPropsDefaults.detailsRowGap;
  const headerTopPadding = data.props?.headerTopPadding ?? OrderSummaryPropsDefaults.headerTopPadding;

  // Styling
  const headerColor = data.props?.headerColor ?? OrderSummaryPropsDefaults.headerColor;
  const accentColor = data.props?.accentColor ?? OrderSummaryPropsDefaults.accentColor;
  const textColor = data.props?.textColor ?? OrderSummaryPropsDefaults.textColor;
  const borderColor = data.props?.borderColor ?? OrderSummaryPropsDefaults.borderColor;

  // Item handlers
  const handleAddItem = () => {
    const newItem = {
      id: `item-${new Date().getTime()}`,
      name: 'New Item',
      image: 'https://placehold.co/80x80/EEE/999?text=Item',
      quantity: 1,
      price: 0,
      variant: '',
      sku: '',
    };
    const currentItems = items || [];
    updateData({ ...data, props: { ...data.props, items: [...currentItems, newItem] } });
  };

  const handleRemoveItem = (index: number) => {
    const currentItems = items || [];
    const newItems = currentItems.filter((_: unknown, i: number) => i !== index);
    updateData({ ...data, props: { ...data.props, items: newItems } });
  };

  const handleUpdateItem = (index: number, field: string, value: string | number) => {
    const currentItems = items || [];
    const newItems = currentItems.map((item: unknown, i: number) => 
      i === index ? { ...(item as Record<string, unknown>), [field]: value } : item
    );
    updateData({ ...data, props: { ...data.props, items: newItems } });
  };

  return (
    <BaseSidebarPanel title="Order Summary">
      {/* LAYOUT SECTION */}
      <SectionTitle>📐 Layout</SectionTitle>
      <RadioGroupInput
        label="Header Layout"
        defaultValue={headerLayout}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, headerLayout: v } })}
      >
        <ToggleButton value="stacked">Stacked</ToggleButton>
        <ToggleButton value="sideBySide">Side by Side</ToggleButton>
      </RadioGroupInput>
      <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
        Side by Side shows Shipping Address &amp; Order Details in two columns
      </Typography>

      {headerLayout === 'sideBySide' && (
        <>
          <TextField
            label="Header Gap (px)"
            type="number"
            size="small"
            fullWidth
            value={headerGap}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, headerGap: Number(e.target.value) } })}
            sx={{ mt: 2 }}
            inputProps={{ min: 0, max: 100, step: 4 }}
          />
          <TextField
            label="Details Row Gap (px)"
            type="number"
            size="small"
            fullWidth
            value={detailsRowGap}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, detailsRowGap: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 0, max: 24, step: 2 }}
          />
          <TextField
            label="Header Top Padding (px)"
            type="number"
            size="small"
            fullWidth
            value={headerTopPadding}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, headerTopPadding: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 0, max: 48, step: 4 }}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* ORDER INFO SECTION */}
      <SectionTitle>📋 Order Details</SectionTitle>
      <BooleanInput
        label="Show Order Info"
        defaultValue={showOrderInfo}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showOrderInfo: v } })}
      />
      {showOrderInfo && (
        <>
          <VariableTextInput
            label="Order ID"
            defaultValue={orderId}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, orderId: v } })}
          />
          <VariableTextInput
            label="Order Date"
            defaultValue={orderDate}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, orderDate: v } })}
          />
          <RadioGroupInput
            label="Order Status"
            defaultValue={orderStatus}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, orderStatus: v } })}
          >
            <ToggleButton value="processing">Processing</ToggleButton>
            <ToggleButton value="confirmed">Confirmed</ToggleButton>
            <ToggleButton value="shipped">Shipped</ToggleButton>
            <ToggleButton value="delivered">Delivered</ToggleButton>
            <ToggleButton value="cancelled">Cancelled</ToggleButton>
          </RadioGroupInput>
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* CUSTOMER INFO SECTION */}
      <SectionTitle>👤 Customer Info</SectionTitle>
      <BooleanInput
        label="Show Customer Info"
        defaultValue={showCustomerInfo}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showCustomerInfo: v } })}
      />
      {showCustomerInfo && (
        <>
          <VariableTextInput
            label="Customer Name"
            defaultValue={customerName}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, customerName: v } })}
          />
          <VariableTextInput
            label="Customer Email"
            defaultValue={customerEmail}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, customerEmail: v } })}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* ITEMS SECTION */}
      <SectionTitle>🛒 Order Items</SectionTitle>
      <BooleanInput
        label="Show Items"
        defaultValue={showItems}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showItems: v } })}
      />
      {showItems && (
        <>
          <BooleanInput
            label="Show Item Images"
            defaultValue={showItemImage}
            onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showItemImage: v } })}
          />
          <BooleanInput
            label="Show Item Variants"
            defaultValue={showItemVariant}
            onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showItemVariant: v } })}
          />
          <BooleanInput
            label="Show Item SKU"
            defaultValue={showItemSku}
            onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showItemSku: v } })}
          />
          <BooleanInput
            label="Show Item Price"
            defaultValue={showItemPrice}
            onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showItemPrice: v } })}
          />
          
          <Typography variant="caption" sx={{ mt: 2, mb: 1, display: 'block', fontWeight: 'bold' }}>
            Items ({items?.length || 0})
          </Typography>
          
          {items?.map((item: Record<string, unknown> | null, index: number) => (
            <Box key={String(item?.id ?? index)} sx={{ mb: 2, p: 1, border: '1px solid #eee', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" fontWeight="bold">Item {index + 1}</Typography>
                <IconButton size="small" onClick={() => handleRemoveItem(index)} color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <TextField
                size="small"
                fullWidth
                label="Name"
                value={item?.name || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateItem(index, 'name', e.target.value)}
                sx={{ mb: 1 }}
              />
              <TextField
                size="small"
                fullWidth
                label="Image URL"
                value={item?.image || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateItem(index, 'image', e.target.value)}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  size="small"
                  label="Qty"
                  type="number"
                  value={item?.quantity || 0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateItem(index, 'quantity', Number(e.target.value) || 0)}
                  sx={{ width: '30%' }}
                />
                <TextField
                  size="small"
                  label="Price"
                  type="number"
                  value={item?.price || 0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateItem(index, 'price', Number(e.target.value) || 0)}
                  sx={{ width: '70%' }}
                />
              </Box>
              <TextField
                size="small"
                fullWidth
                label="Variant"
                value={item?.variant || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateItem(index, 'variant', e.target.value)}
                sx={{ mb: 1 }}
              />
            </Box>
          ))}
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <IconButton onClick={handleAddItem} color="primary" sx={{ border: '1px dashed', borderRadius: 1 }}>
              <AddIcon /> <Typography variant="caption" sx={{ ml: 0.5 }}>Add Item</Typography>
            </IconButton>
          </Box>
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* PRICING SECTION */}
      <SectionTitle>💰 Pricing</SectionTitle>
      <BooleanInput
        label="Show Pricing"
        defaultValue={showPricing}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showPricing: v } })}
      />
      {showPricing && (
        <>
          <VariableTextInput
            label="Currency Symbol"
            defaultValue={currency}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, currency: v } })}
          />
          <TextField
            size="small"
            fullWidth
            label="Subtotal"
            type="number"
            value={subtotal}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, subtotal: Number(e.target.value) || 0 } })}
            sx={{ mb: 1.5 }}
          />
          <BooleanInput
            label="Show Discount"
            defaultValue={showDiscount}
            onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showDiscount: v } })}
          />
          {showDiscount && (
            <>
              <TextField
                size="small"
                fullWidth
                label="Discount Amount"
                type="number"
                value={discount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, discount: Number(e.target.value) || 0 } })}
                sx={{ mb: 1.5 }}
              />
              <VariableTextInput
                label="Discount Code"
                defaultValue={discountCode}
                onChange={(v: string) => updateData({ ...data, props: { ...data.props, discountCode: v } })}
              />
            </>
          )}
          <BooleanInput
            label="Show Shipping"
            defaultValue={showShipping}
            onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showShipping: v } })}
          />
          {showShipping && (
            <TextField
              size="small"
              fullWidth
              label="Shipping Cost"
              type="number"
              value={shippingCost}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, shippingCost: Number(e.target.value) || 0 } })}
              sx={{ mb: 1.5 }}
            />
          )}
          <BooleanInput
            label="Show Tax"
            defaultValue={showTax}
            onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showTax: v } })}
          />
          {showTax && (
            <TextField
              size="small"
              fullWidth
              label="Tax Amount"
              type="number"
              value={tax}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, tax: Number(e.target.value) || 0 } })}
              sx={{ mb: 1.5 }}
            />
          )}
          <TextField
            size="small"
            fullWidth
            label="Total"
            type="number"
            value={total}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, total: Number(e.target.value) || 0 } })}
            sx={{ mb: 1.5 }}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* SHIPPING INFO SECTION */}
      <SectionTitle>📦 Shipping Info</SectionTitle>
      <BooleanInput
        label="Show Shipping Info"
        defaultValue={showShippingInfo}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showShippingInfo: v } })}
      />
      {showShippingInfo && (
        <>
          <VariableTextInput
            label="Shipping Method"
            defaultValue={shippingMethod}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, shippingMethod: v } })}
          />
          <VariableTextInput
            label="Estimated Delivery"
            defaultValue={estimatedDelivery}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, estimatedDelivery: v } })}
          />
          <BooleanInput
            label="Show Tracking"
            defaultValue={showTracking}
            onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showTracking: v } })}
          />
          {showTracking && (
            <>
              <VariableTextInput
                label="Tracking Number"
                defaultValue={trackingNumber}
                onChange={(v: string) => updateData({ ...data, props: { ...data.props, trackingNumber: v } })}
              />
              <VariableTextInput
                label="Tracking URL"
                defaultValue={trackingUrl}
                onChange={(v: string) => updateData({ ...data, props: { ...data.props, trackingUrl: v } })}
              />
            </>
          )}
          <VariableTextInput
            label="Shipping Address"
            defaultValue={shippingAddress}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, shippingAddress: v } })}
            multiline
            rows={3}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* PAYMENT INFO SECTION */}
      <SectionTitle>💳 Payment Info</SectionTitle>
      <BooleanInput
        label="Show Payment Info"
        defaultValue={showPaymentInfo}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showPaymentInfo: v } })}
      />
      {showPaymentInfo && (
        <>
          <VariableTextInput
            label="Payment Method"
            defaultValue={paymentMethod}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, paymentMethod: v } })}
          />
          <VariableTextInput
            label="Card Last 4 Digits"
            defaultValue={cardLastFour}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, cardLastFour: v } })}
          />
          <RadioGroupInput
            label="Payment Status"
            defaultValue={paymentStatus}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, paymentStatus: v } })}
          >
            <ToggleButton value="pending">Pending</ToggleButton>
            <ToggleButton value="paid">Paid</ToggleButton>
            <ToggleButton value="failed">Failed</ToggleButton>
            <ToggleButton value="refunded">Refunded</ToggleButton>
          </RadioGroupInput>
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* NOTES SECTION */}
      <SectionTitle>📝 Notes</SectionTitle>
      <BooleanInput
        label="Show Notes"
        defaultValue={showNotes}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showNotes: v } })}
      />
      {showNotes && (
        <VariableTextInput
          label="Notes"
          defaultValue={notes}
          onChange={(v: string) => updateData({ ...data, props: { ...data.props, notes: v } })}
          multiline
          rows={3}
        />
      )}

      <Divider sx={{ my: 2 }} />

      {/* INFO MESSAGE SECTION */}
      <SectionTitle>💬 Info Message</SectionTitle>
      <BooleanInput
        label="Show Info Message"
        defaultValue={showInfoMessage}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showInfoMessage: v } })}
      />
      {showInfoMessage && (
        <VariableTextInput
          label="Message Text"
          defaultValue={infoMessage}
          onChange={(v: string) => updateData({ ...data, props: { ...data.props, infoMessage: v } })}
          multiline
          rows={2}
        />
      )}

      <Divider sx={{ my: 2 }} />

      {/* CTA BUTTON SECTION */}
      <SectionTitle>🔘 CTA Button</SectionTitle>
      <BooleanInput
        label="Show CTA Button"
        defaultValue={showCtaButton}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showCtaButton: v } })}
      />
      {showCtaButton && (
        <>
          <VariableTextInput
            label="Button Text"
            defaultValue={ctaButtonText}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, ctaButtonText: v } })}
          />
          <VariableTextInput
            label="Button URL"
            defaultValue={ctaButtonUrl}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, ctaButtonUrl: v } })}
          />
          <ColorInput
            label="Button Color"
            defaultValue={ctaButtonColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, ctaButtonColor: v } })}
          />
          <ColorInput
            label="Button Text Color"
            defaultValue={ctaButtonTextColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, ctaButtonTextColor: v } })}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* FOOTER IMAGE SECTION */}
      <SectionTitle>🖼️ Footer Image</SectionTitle>
      <BooleanInput
        label="Show Footer Image"
        defaultValue={showFooterImage}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showFooterImage: v } })}
      />
      {showFooterImage && (
        <>
          <VariableTextInput
            label="Image URL"
            defaultValue={footerImageUrl}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, footerImageUrl: v } })}
          />
          <VariableTextInput
            label="Image Alt Text"
            defaultValue={footerImageAlt}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, footerImageAlt: v } })}
          />
          <TextField
            label="Image Width (px)"
            type="number"
            size="small"
            fullWidth
            value={footerImageWidth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, footerImageWidth: Number(e.target.value) } })}
            sx={{ mt: 1 }}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* STYLING SECTION */}
      <SectionTitle>🎨 Styling</SectionTitle>
      <ColorInput
        label="Header Color"
        defaultValue={headerColor}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, headerColor: v } })}
      />
      <ColorInput
        label="Accent Color"
        defaultValue={accentColor}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, accentColor: v } })}
      />
      <ColorInput
        label="Text Color"
        defaultValue={textColor}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, textColor: v } })}
      />
      <ColorInput
        label="Border Color"
        defaultValue={borderColor}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, borderColor: v } })}
      />

      <Divider sx={{ my: 2 }} />

      <MultiStylePropertyPanel
        names={['backgroundColor', 'fontFamily', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
