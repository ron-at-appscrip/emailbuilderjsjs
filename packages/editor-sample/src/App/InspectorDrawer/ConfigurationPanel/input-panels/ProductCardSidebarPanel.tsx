import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button,Divider, IconButton, TextField, ToggleButton, Typography } from '@mui/material';
import { ProductCardProps, ProductCardPropsDefaults, ProductCardPropsSchema, ProductItem } from '@usewaypoint/block-product-card';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import ColorInput from './helpers/inputs/ColorInput';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import SliderInput from './helpers/inputs/SliderInput';
import VariableTextInput from './helpers/inputs/VariableTextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type ProductCardSidebarPanelProps = {
  data: ProductCardProps;
  setData: (v: ProductCardProps) => void;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
    {children}
  </Typography>
);

export default function ProductCardSidebarPanel({ data, setData }: ProductCardSidebarPanelProps) {
  const [, setErrors] = useState<any>(null);

  const updateData = (d: unknown) => {
    const res = ProductCardPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  // Loop mode values
  const useLoop = data.props?.useLoop ?? ProductCardPropsDefaults.useLoop;
  const productsVariable = data.props?.productsVariable ?? ProductCardPropsDefaults.productsVariable;
  const products = data.props?.products ?? ProductCardPropsDefaults.products;
  const columns = data.props?.columns ?? ProductCardPropsDefaults.columns;
  const gap = data.props?.gap ?? ProductCardPropsDefaults.gap;

  // Get all values with defaults
  const imageUrl = data.props?.imageUrl ?? ProductCardPropsDefaults.imageUrl;
  const imageAlt = data.props?.imageAlt ?? ProductCardPropsDefaults.imageAlt;
  const imagePosition = data.props?.imagePosition ?? ProductCardPropsDefaults.imagePosition;
  const imageWidth = data.props?.imageWidth ?? ProductCardPropsDefaults.imageWidth;
  const imageHeight = data.props?.imageHeight ?? ProductCardPropsDefaults.imageHeight;
  const imageFit = data.props?.imageFit ?? ProductCardPropsDefaults.imageFit;
  const productName = data.props?.productName ?? ProductCardPropsDefaults.productName;
  const description = data.props?.description ?? ProductCardPropsDefaults.description;
  const price = data.props?.price ?? ProductCardPropsDefaults.price;
  const originalPrice = data.props?.originalPrice ?? ProductCardPropsDefaults.originalPrice;
  const currency = data.props?.currency ?? ProductCardPropsDefaults.currency;
  const showDiscount = data.props?.showDiscount ?? ProductCardPropsDefaults.showDiscount;
  const showRating = data.props?.showRating ?? ProductCardPropsDefaults.showRating;
  const rating = data.props?.rating ?? ProductCardPropsDefaults.rating;
  const reviewCount = data.props?.reviewCount ?? ProductCardPropsDefaults.reviewCount;
  const showStock = data.props?.showStock ?? ProductCardPropsDefaults.showStock;
  const stockStatus = data.props?.stockStatus ?? ProductCardPropsDefaults.stockStatus;
  const stockText = data.props?.stockText ?? ProductCardPropsDefaults.stockText;
  const showBadge = data.props?.showBadge ?? ProductCardPropsDefaults.showBadge;
  const badgeText = data.props?.badgeText ?? ProductCardPropsDefaults.badgeText;
  const badgeColor = data.props?.badgeColor ?? ProductCardPropsDefaults.badgeColor;
  const showButton = data.props?.showButton ?? ProductCardPropsDefaults.showButton;
  const buttonText = data.props?.buttonText ?? ProductCardPropsDefaults.buttonText;
  const buttonUrl = data.props?.buttonUrl ?? ProductCardPropsDefaults.buttonUrl;
  const buttonColor = data.props?.buttonColor ?? ProductCardPropsDefaults.buttonColor;
  const buttonTextColor = data.props?.buttonTextColor ?? ProductCardPropsDefaults.buttonTextColor;
  const cardBackgroundColor = data.props?.cardBackgroundColor ?? ProductCardPropsDefaults.cardBackgroundColor;
  const borderColor = data.props?.borderColor ?? ProductCardPropsDefaults.borderColor;
  const showBorder = data.props?.showBorder ?? ProductCardPropsDefaults.showBorder;
  const showShadow = data.props?.showShadow ?? ProductCardPropsDefaults.showShadow;
  const nameColor = data.props?.nameColor ?? ProductCardPropsDefaults.nameColor;
  const descriptionColor = data.props?.descriptionColor ?? ProductCardPropsDefaults.descriptionColor;
  const priceColor = data.props?.priceColor ?? ProductCardPropsDefaults.priceColor;

  // Product list handlers
  const handleAddProduct = () => {
    const newProduct: ProductItem = {
      imageUrl: 'https://placehold.co/300x300/EEE/999?text=New+Product',
      imageAlt: 'New Product',
      productName: `Product ${(products?.length || 0) + 1}`,
      description: 'Product description',
      price: '99.99',
      originalPrice: '149.99',
      rating: 4.5,
      reviewCount: '0',
      stockStatus: 'in_stock',
      stockText: 'In Stock',
      badgeText: '',
      buttonUrl: '#',
    };
    const currentProducts = products || [];
    updateData({ ...data, props: { ...data.props, products: [...currentProducts, newProduct] } });
  };

  const handleRemoveProduct = (index: number) => {
    const currentProducts = products || [];
    const newProducts = currentProducts.filter((_: ProductItem, i: number) => i !== index);
    updateData({ ...data, props: { ...data.props, products: newProducts } });
  };

  const handleUpdateProduct = (index: number, field: string, value: string | number) => {
    const currentProducts = products || [];
    const newProducts = currentProducts.map((product: ProductItem, i: number) =>
      i === index ? { ...product, [field]: value } : product
    );
    updateData({ ...data, props: { ...data.props, products: newProducts } });
  };

  return (
    <BaseSidebarPanel title="Product Card">
      {/* LOOP MODE SECTION */}
      <SectionTitle>🔄 Products Loop Mode</SectionTitle>
      <BooleanInput
        label="Enable Loop Mode"
        defaultValue={useLoop}
        onChange={(useLoop) => updateData({ ...data, props: { ...data.props, useLoop } })}
      />
      
      {useLoop && (
        <>
          <VariableTextInput
            label="Variable Name"
            defaultValue={productsVariable}
            onChange={(productsVariable) => updateData({ ...data, props: { ...data.props, productsVariable } })}
          />
          <SliderInput
            label="Columns"
            defaultValue={columns}
            min={1}
            max={4}
            step={1}
            units=""
            onChange={(columns) => updateData({ ...data, props: { ...data.props, columns } })}
          />
          <SliderInput
            label="Gap (px)"
            defaultValue={gap}
            min={0}
            max={32}
            step={4}
            units="px"
            onChange={(gap) => updateData({ ...data, props: { ...data.props, gap } })}
          />
          
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
            Products ({products?.length || 0})
          </Typography>
          
          {products?.map((product: ProductItem, index: number) => (
            <Box key={index} sx={{ mb: 2, p: 1.5, border: '1px solid #eee', borderRadius: 1, bgcolor: '#fafafa' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" fontWeight="bold">Product {index + 1}</Typography>
                <IconButton size="small" onClick={() => handleRemoveProduct(index)} color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <TextField
                size="small"
                fullWidth
                label="Name"
                value={product?.productName || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateProduct(index, 'productName', e.target.value)}
                sx={{ mb: 1 }}
              />
              <TextField
                size="small"
                fullWidth
                label="Image URL"
                value={product?.imageUrl || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateProduct(index, 'imageUrl', e.target.value)}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  size="small"
                  label="Price"
                  value={product?.price || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateProduct(index, 'price', e.target.value)}
                  sx={{ flex: 1 }}
                />
                <TextField
                  size="small"
                  label="Original"
                  value={product?.originalPrice || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateProduct(index, 'originalPrice', e.target.value)}
                  sx={{ flex: 1 }}
                />
              </Box>
              <TextField
                size="small"
                fullWidth
                label="Badge"
                value={product?.badgeText || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateProduct(index, 'badgeText', e.target.value)}
                sx={{ mb: 1 }}
              />
              <TextField
                size="small"
                fullWidth
                label="Button URL"
                value={product?.buttonUrl || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateProduct(index, 'buttonUrl', e.target.value)}
              />
            </Box>
          ))}
          
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
            fullWidth
            sx={{ mt: 1 }}
          >
            Add Product
          </Button>
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* IMAGE SECTION */}
      <SectionTitle>🖼️ Product Image</SectionTitle>
      <VariableTextInput
        label="Image URL"
        defaultValue={imageUrl}
        onChange={(imageUrl) => updateData({ ...data, props: { ...data.props, imageUrl } })}
      />
      <VariableTextInput
        label="Image Alt Text"
        defaultValue={imageAlt}
        onChange={(imageAlt) => updateData({ ...data, props: { ...data.props, imageAlt } })}
      />
      <RadioGroupInput
        label="Image Position"
        defaultValue={imagePosition}
        onChange={(imagePosition) => updateData({ ...data, props: { ...data.props, imagePosition } })}
      >
        <ToggleButton value="top">Top</ToggleButton>
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </RadioGroupInput>
      <SliderInput
        label="Image Width (px)"
        defaultValue={imageWidth ?? 300}
        min={100}
        max={600}
        step={10}
        units="px"
        onChange={(imageWidth) => updateData({ ...data, props: { ...data.props, imageWidth } })}
      />
      <SliderInput
        label="Image Height (px)"
        defaultValue={imageHeight ?? 250}
        min={100}
        max={500}
        step={10}
        units="px"
        onChange={(imageHeight) => updateData({ ...data, props: { ...data.props, imageHeight } })}
      />
      <RadioGroupInput
        label="Image Fit"
        defaultValue={imageFit}
        onChange={(imageFit) => updateData({ ...data, props: { ...data.props, imageFit } })}
      >
        <ToggleButton value="cover">Cover</ToggleButton>
        <ToggleButton value="contain">Contain</ToggleButton>
        <ToggleButton value="fill">Fill</ToggleButton>
      </RadioGroupInput>

      <Divider sx={{ my: 2 }} />

      {/* PRODUCT INFO SECTION */}
      <SectionTitle>📦 Product Info</SectionTitle>
      <VariableTextInput
        label="Product Name"
        defaultValue={productName}
        onChange={(productName) => updateData({ ...data, props: { ...data.props, productName } })}
      />
      <VariableTextInput
        label="Description"
        defaultValue={description}
        onChange={(description) => updateData({ ...data, props: { ...data.props, description } })}
        multiline
        rows={3}
      />

      <Divider sx={{ my: 2 }} />

      {/* PRICING SECTION */}
      <SectionTitle>💰 Pricing</SectionTitle>
      <VariableTextInput
        label="Currency Symbol"
        defaultValue={currency}
        onChange={(currency) => updateData({ ...data, props: { ...data.props, currency } })}
      />
      <VariableTextInput
        label="Price"
        defaultValue={price}
        onChange={(price) => updateData({ ...data, props: { ...data.props, price } })}
      />
      <BooleanInput
        label="Show Discount"
        defaultValue={showDiscount}
        onChange={(showDiscount) => updateData({ ...data, props: { ...data.props, showDiscount } })}
      />
      {showDiscount && (
        <VariableTextInput
          label="Original Price"
          defaultValue={originalPrice}
          onChange={(originalPrice) => updateData({ ...data, props: { ...data.props, originalPrice } })}
        />
      )}
      <ColorInput
        label="Price Color"
        defaultValue={priceColor}
        onChange={(priceColor) => updateData({ ...data, props: { ...data.props, priceColor } })}
      />

      <Divider sx={{ my: 2 }} />

      {/* RATING SECTION */}
      <SectionTitle>⭐ Rating</SectionTitle>
      <BooleanInput
        label="Show Rating"
        defaultValue={showRating}
        onChange={(showRating) => updateData({ ...data, props: { ...data.props, showRating } })}
      />
      {showRating && (
        <>
          <SliderInput
            label="Rating (0-5)"
            defaultValue={rating}
            min={0}
            max={5}
            step={0.5}
            units=""
            onChange={(rating) => updateData({ ...data, props: { ...data.props, rating } })}
          />
          <VariableTextInput
            label="Review Count"
            defaultValue={reviewCount}
            onChange={(reviewCount) => updateData({ ...data, props: { ...data.props, reviewCount } })}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* STOCK STATUS SECTION */}
      <SectionTitle>📊 Stock Status</SectionTitle>
      <BooleanInput
        label="Show Stock Status"
        defaultValue={showStock}
        onChange={(showStock) => updateData({ ...data, props: { ...data.props, showStock } })}
      />
      {showStock && (
        <>
          <RadioGroupInput
            label="Stock Status"
            defaultValue={stockStatus}
            onChange={(stockStatus) => updateData({ ...data, props: { ...data.props, stockStatus } })}
          >
            <ToggleButton value="in_stock">In Stock</ToggleButton>
            <ToggleButton value="low_stock">Low</ToggleButton>
            <ToggleButton value="out_of_stock">Out</ToggleButton>
          </RadioGroupInput>
          <VariableTextInput
            label="Stock Text"
            defaultValue={stockText}
            onChange={(stockText) => updateData({ ...data, props: { ...data.props, stockText } })}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* BADGE SECTION */}
      <SectionTitle>🏷️ Badge</SectionTitle>
      <BooleanInput
        label="Show Badge"
        defaultValue={showBadge}
        onChange={(showBadge) => updateData({ ...data, props: { ...data.props, showBadge } })}
      />
      {showBadge && (
        <>
          <VariableTextInput
            label="Badge Text"
            defaultValue={badgeText}
            onChange={(badgeText) => updateData({ ...data, props: { ...data.props, badgeText } })}
          />
          <ColorInput
            label="Badge Color"
            defaultValue={badgeColor}
            onChange={(badgeColor) => updateData({ ...data, props: { ...data.props, badgeColor } })}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* CTA BUTTON SECTION */}
      <SectionTitle>🔘 CTA Button</SectionTitle>
      <BooleanInput
        label="Show Button"
        defaultValue={showButton}
        onChange={(showButton) => updateData({ ...data, props: { ...data.props, showButton } })}
      />
      {showButton && (
        <>
          <VariableTextInput
            label="Button Text"
            defaultValue={buttonText}
            onChange={(buttonText) => updateData({ ...data, props: { ...data.props, buttonText } })}
          />
          <VariableTextInput
            label="Button URL"
            defaultValue={buttonUrl}
            onChange={(buttonUrl) => updateData({ ...data, props: { ...data.props, buttonUrl } })}
          />
          <ColorInput
            label="Button Color"
            defaultValue={buttonColor}
            onChange={(buttonColor) => updateData({ ...data, props: { ...data.props, buttonColor } })}
          />
          <ColorInput
            label="Button Text Color"
            defaultValue={buttonTextColor}
            onChange={(buttonTextColor) => updateData({ ...data, props: { ...data.props, buttonTextColor } })}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* CARD STYLING SECTION */}
      <SectionTitle>🎨 Card Styling</SectionTitle>
      <ColorInput
        label="Card Background"
        defaultValue={cardBackgroundColor}
        onChange={(cardBackgroundColor) => updateData({ ...data, props: { ...data.props, cardBackgroundColor } })}
      />
      <BooleanInput
        label="Show Border"
        defaultValue={showBorder}
        onChange={(showBorder) => updateData({ ...data, props: { ...data.props, showBorder } })}
      />
      {showBorder && (
        <ColorInput
          label="Border Color"
          defaultValue={borderColor}
          onChange={(borderColor) => updateData({ ...data, props: { ...data.props, borderColor } })}
        />
      )}
      <BooleanInput
        label="Show Shadow"
        defaultValue={showShadow}
        onChange={(showShadow) => updateData({ ...data, props: { ...data.props, showShadow } })}
      />

      <Divider sx={{ my: 2 }} />

      {/* TEXT COLORS */}
      <SectionTitle>🖌️ Text Colors</SectionTitle>
      <ColorInput
        label="Name Color"
        defaultValue={nameColor}
        onChange={(nameColor) => updateData({ ...data, props: { ...data.props, nameColor } })}
      />
      <ColorInput
        label="Description Color"
        defaultValue={descriptionColor}
        onChange={(descriptionColor) => updateData({ ...data, props: { ...data.props, descriptionColor } })}
      />

      <Divider sx={{ my: 2 }} />

      <MultiStylePropertyPanel
        names={['backgroundColor', 'fontFamily', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}

