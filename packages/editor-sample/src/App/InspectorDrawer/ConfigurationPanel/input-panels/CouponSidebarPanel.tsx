import React, { useState } from 'react';

import { Box, Divider, TextField, ToggleButton,Typography } from '@mui/material';
import { CouponProps, CouponPropsDefaults, CouponPropsSchema } from '@usewaypoint/block-coupon';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import ColorInput from './helpers/inputs/ColorInput';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import SliderInput from './helpers/inputs/SliderInput';
import TextInput from './helpers/inputs/TextInput';

type CouponSidebarPanelProps = {
  data: CouponProps;
  setData: (v: CouponProps) => void;
};

export default function CouponSidebarPanel({ data, setData }: CouponSidebarPanelProps) {
  const [, setErrors] = useState<any>(null);

  const updateData = (d: unknown) => {
    const res = CouponPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const code = data.props?.code ?? CouponPropsDefaults.code;
  const showCopyButton = data.props?.showCopyButton ?? CouponPropsDefaults.showCopyButton;
  const copyButtonText = data.props?.copyButtonText ?? CouponPropsDefaults.copyButtonText;
  const discountType = data.props?.discountType ?? CouponPropsDefaults.discountType;
  const discountValue = data.props?.discountValue ?? CouponPropsDefaults.discountValue;
  const discountText = data.props?.discountText ?? CouponPropsDefaults.discountText;
  const currencySymbol = data.props?.currencySymbol ?? CouponPropsDefaults.currencySymbol;
  const minOrderValue = data.props?.minOrderValue ?? CouponPropsDefaults.minOrderValue;
  const showMinOrder = data.props?.showMinOrder ?? CouponPropsDefaults.showMinOrder;
  const validUntil = data.props?.validUntil ?? CouponPropsDefaults.validUntil;
  const showExpiry = data.props?.showExpiry ?? CouponPropsDefaults.showExpiry;
  const expiryFormat = data.props?.expiryFormat ?? CouponPropsDefaults.expiryFormat;
  const title = data.props?.title ?? CouponPropsDefaults.title;
  const subtitle = data.props?.subtitle ?? CouponPropsDefaults.subtitle;
  const description = data.props?.description ?? CouponPropsDefaults.description;
  const termsAndConditions = data.props?.termsAndConditions ?? CouponPropsDefaults.termsAndConditions;
  const showTerms = data.props?.showTerms ?? CouponPropsDefaults.showTerms;
  const showBadge = data.props?.showBadge ?? CouponPropsDefaults.showBadge;
  const badgeText = data.props?.badgeText ?? CouponPropsDefaults.badgeText;
  const badgeColor = data.props?.badgeColor ?? CouponPropsDefaults.badgeColor;
  const badgeTextColor = data.props?.badgeTextColor ?? CouponPropsDefaults.badgeTextColor;
  const showIcon = data.props?.showIcon ?? CouponPropsDefaults.showIcon;
  const icon = data.props?.icon ?? CouponPropsDefaults.icon;
  const showButton = data.props?.showButton ?? CouponPropsDefaults.showButton;
  const buttonText = data.props?.buttonText ?? CouponPropsDefaults.buttonText;
  const buttonUrl = data.props?.buttonUrl ?? CouponPropsDefaults.buttonUrl;
  const buttonColor = data.props?.buttonColor ?? CouponPropsDefaults.buttonColor;
  const buttonTextColor = data.props?.buttonTextColor ?? CouponPropsDefaults.buttonTextColor;
  const buttonBorderRadius = data.props?.buttonBorderRadius ?? CouponPropsDefaults.buttonBorderRadius;
  const layout = data.props?.layout ?? CouponPropsDefaults.layout;
  const alignment = data.props?.alignment ?? CouponPropsDefaults.alignment;
  const backgroundColor = data.props?.backgroundColor ?? CouponPropsDefaults.backgroundColor;
  const backgroundGradient = data.props?.backgroundGradient ?? CouponPropsDefaults.backgroundGradient;
  const useGradient = data.props?.useGradient ?? CouponPropsDefaults.useGradient;
  const borderStyle = data.props?.borderStyle ?? CouponPropsDefaults.borderStyle;
  const borderWidth = data.props?.borderWidth ?? CouponPropsDefaults.borderWidth;
  const borderColor = data.props?.borderColor ?? CouponPropsDefaults.borderColor;
  const borderRadius = data.props?.borderRadius ?? CouponPropsDefaults.borderRadius;
  const padding = data.props?.padding ?? CouponPropsDefaults.padding;
  const shadow = data.props?.shadow ?? CouponPropsDefaults.shadow;
  const codeBackgroundColor = data.props?.codeBackgroundColor ?? CouponPropsDefaults.codeBackgroundColor;
  const codeBorderStyle = data.props?.codeBorderStyle ?? CouponPropsDefaults.codeBorderStyle;
  const codeBorderColor = data.props?.codeBorderColor ?? CouponPropsDefaults.codeBorderColor;
  const codeTextColor = data.props?.codeTextColor ?? CouponPropsDefaults.codeTextColor;
  const codeFontSize = data.props?.codeFontSize ?? CouponPropsDefaults.codeFontSize;
  const titleColor = data.props?.titleColor ?? CouponPropsDefaults.titleColor;
  const titleFontSize = data.props?.titleFontSize ?? CouponPropsDefaults.titleFontSize;
  const subtitleColor = data.props?.subtitleColor ?? CouponPropsDefaults.subtitleColor;
  const descriptionColor = data.props?.descriptionColor ?? CouponPropsDefaults.descriptionColor;
  const showScissors = data.props?.showScissors ?? CouponPropsDefaults.showScissors;
  const showDashedLine = data.props?.showDashedLine ?? CouponPropsDefaults.showDashedLine;
  const applicableText = data.props?.applicableText ?? CouponPropsDefaults.applicableText;
  const showApplicable = data.props?.showApplicable ?? CouponPropsDefaults.showApplicable;

  return (
    <BaseSidebarPanel title="Coupon / Promo Code">
      {/* Coupon Code Section */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
        📝 Coupon Code
      </Typography>
      <TextInput
        label="Code"
        defaultValue={code || ''}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, code: v } })}
      />
      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
        <BooleanInput
          label="Show Copy Button"
          defaultValue={showCopyButton || false}
          onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showCopyButton: v } })}
        />
      </Box>
      {showCopyButton && (
        <TextInput
          label="Copy Button Text"
          defaultValue={copyButtonText || ''}
          onChange={(v: string) => updateData({ ...data, props: { ...data.props, copyButtonText: v } })}
        />
      )}

      <Divider sx={{ my: 2 }} />

      {/* Discount Section */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
        💰 Discount Info
      </Typography>
      <RadioGroupInput
        label="Discount Type"
        defaultValue={discountType || 'percentage'}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, discountType: v } })}
      >
        <ToggleButton value="percentage">Percentage (%)</ToggleButton>
        <ToggleButton value="fixed">Fixed Amount ($)</ToggleButton>
        <ToggleButton value="freeShipping">Free Shipping</ToggleButton>
        <ToggleButton value="buyOneGetOne">Buy 1 Get 1</ToggleButton>
        <ToggleButton value="custom">Custom Text</ToggleButton>
      </RadioGroupInput>

      {(discountType === 'percentage' || discountType === 'fixed') && (
        <SliderInput
          label="Discount Value"
          defaultValue={discountValue || 0}
          onChange={(v: number) => updateData({ ...data, props: { ...data.props, discountValue: v } })}
          min={0}
          max={discountType === 'percentage' ? 100 : 1000}
          step={discountType === 'percentage' ? 5 : 10}
          units={discountType === 'percentage' ? '%' : currencySymbol || '$'}
        />
      )}

      {discountType === 'fixed' && (
        <TextInput
          label="Currency Symbol"
          defaultValue={currencySymbol || '$'}
          onChange={(v: string) => updateData({ ...data, props: { ...data.props, currencySymbol: v } })}
        />
      )}

      {discountType === 'custom' && (
        <TextInput
          label="Custom Discount Text"
          defaultValue={discountText || ''}
          onChange={(v: string) => updateData({ ...data, props: { ...data.props, discountText: v } })}
        />
      )}

      <Box sx={{ mt: 1 }}>
        <BooleanInput
          label="Show Minimum Order"
          defaultValue={showMinOrder || false}
          onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showMinOrder: v } })}
        />
      </Box>
      {showMinOrder && (
        <TextField
          size="small"
          fullWidth
          type="number"
          label="Minimum Order Value"
          value={minOrderValue || 0}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, minOrderValue: Number(e.target.value) || 0 } })}
          sx={{ mt: 1 }}
        />
      )}

      <Divider sx={{ my: 2 }} />

      {/* Content Section */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
        📄 Content
      </Typography>
      <TextInput
        label="Title"
        defaultValue={title || ''}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, title: v } })}
      />
      <TextInput
        label="Subtitle"
        defaultValue={subtitle || ''}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, subtitle: v } })}
      />
      <TextInput
        label="Description"
        defaultValue={description || ''}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, description: v } })}
      />
      <Box sx={{ mt: 1 }}>
        <BooleanInput
          label="Show Applicable Text"
          defaultValue={showApplicable || false}
          onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showApplicable: v } })}
        />
      </Box>
      {showApplicable && (
        <TextInput
          label="Applicable Text"
          defaultValue={applicableText || ''}
          onChange={(v: string) => updateData({ ...data, props: { ...data.props, applicableText: v } })}
        />
      )}

      <Divider sx={{ my: 2 }} />

      {/* Validity Section */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
        ⏰ Validity
      </Typography>
      <BooleanInput
        label="Show Expiry"
        defaultValue={showExpiry || false}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showExpiry: v } })}
      />
      {showExpiry && (
        <>
          <TextField
            size="small"
            fullWidth
            type="date"
            label="Valid Until"
            InputLabelProps={{ shrink: true }}
            value={validUntil || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, validUntil: e.target.value } })}
            sx={{ mt: 1 }}
          />
          <RadioGroupInput
            label="Expiry Format"
            defaultValue={expiryFormat || 'date'}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, expiryFormat: v } })}
          >
            <ToggleButton value="date">Show Date</ToggleButton>
            <ToggleButton value="countdown">Countdown</ToggleButton>
            <ToggleButton value="daysLeft">Days Left</ToggleButton>
          </RadioGroupInput>
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Badge Section */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
        🏷️ Badge
      </Typography>
      <BooleanInput
        label="Show Badge"
        defaultValue={showBadge || false}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showBadge: v } })}
      />
      {showBadge && (
        <>
          <TextInput
            label="Badge Text"
            defaultValue={badgeText || ''}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, badgeText: v } })}
          />
          <ColorInput
            label="Badge Color"
            defaultValue={badgeColor || '#FF4444'}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, badgeColor: v } })}
          />
          <ColorInput
            label="Badge Text Color"
            defaultValue={badgeTextColor || '#FFFFFF'}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, badgeTextColor: v } })}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Icon Section */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
        🎨 Icon
      </Typography>
      <BooleanInput
        label="Show Icon"
        defaultValue={showIcon || false}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showIcon: v } })}
      />
      {showIcon && (
        <TextInput
          label="Icon (Emoji)"
          defaultValue={icon || '🎟️'}
          onChange={(v: string) => updateData({ ...data, props: { ...data.props, icon: v } })}
        />
      )}

      <Divider sx={{ my: 2 }} />

      {/* CTA Button Section */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
        🔘 Call to Action
      </Typography>
      <BooleanInput
        label="Show Button"
        defaultValue={showButton || false}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showButton: v } })}
      />
      {showButton && (
        <>
          <TextInput
            label="Button Text"
            defaultValue={buttonText || ''}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, buttonText: v } })}
          />
          <TextInput
            label="Button URL"
            defaultValue={buttonUrl || ''}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, buttonUrl: v } })}
          />
          <ColorInput
            label="Button Color"
            defaultValue={buttonColor || '#4CAF50'}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, buttonColor: v } })}
          />
          <ColorInput
            label="Button Text Color"
            defaultValue={buttonTextColor || '#FFFFFF'}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, buttonTextColor: v } })}
          />
          <SliderInput
            label="Button Border Radius"
            defaultValue={buttonBorderRadius || 4}
            onChange={(v: number) => updateData({ ...data, props: { ...data.props, buttonBorderRadius: v } })}
            min={0}
            max={24}
            units="px"
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Terms Section */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
        📋 Terms
      </Typography>
      <BooleanInput
        label="Show Terms"
        defaultValue={showTerms || false}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showTerms: v } })}
      />
      {showTerms && (
        <TextInput
          label="Terms & Conditions"
          defaultValue={termsAndConditions || ''}
          onChange={(v: string) => updateData({ ...data, props: { ...data.props, termsAndConditions: v } })}
        />
      )}

      <Divider sx={{ my: 2 }} />

      {/* Layout Section */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
        📐 Layout
      </Typography>
      <RadioGroupInput
        label="Layout Style"
        defaultValue={layout || 'vertical'}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, layout: v } })}
      >
        <ToggleButton value="vertical">Vertical</ToggleButton>
        <ToggleButton value="horizontal">Horizontal</ToggleButton>
        <ToggleButton value="ticket">Ticket Style</ToggleButton>
      </RadioGroupInput>
      <RadioGroupInput
        label="Alignment"
        defaultValue={alignment || 'center'}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, alignment: v } })}
      >
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </RadioGroupInput>

      <Divider sx={{ my: 2 }} />

      {/* Container Styling */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
        🎨 Container Style
      </Typography>
      <BooleanInput
        label="Use Gradient Background"
        defaultValue={useGradient || false}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, useGradient: v } })}
      />
      {useGradient ? (
        <TextInput
          label="Background Gradient"
          defaultValue={backgroundGradient || ''}
          onChange={(v: string) => updateData({ ...data, props: { ...data.props, backgroundGradient: v } })}
        />
      ) : (
        <ColorInput
          label="Background Color"
          defaultValue={backgroundColor || '#FFFFFF'}
          onChange={(v: string) => updateData({ ...data, props: { ...data.props, backgroundColor: v } })}
        />
      )}
      <RadioGroupInput
        label="Border Style"
        defaultValue={borderStyle || 'dashed'}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, borderStyle: v } })}
      >
        <ToggleButton value="solid">Solid</ToggleButton>
        <ToggleButton value="dashed">Dashed</ToggleButton>
        <ToggleButton value="dotted">Dotted</ToggleButton>
        <ToggleButton value="none">None</ToggleButton>
      </RadioGroupInput>
      <SliderInput
        label="Border Width"
        defaultValue={borderWidth || 2}
        onChange={(v: number) => updateData({ ...data, props: { ...data.props, borderWidth: v } })}
        min={0}
        max={8}
        units="px"
      />
      <ColorInput
        label="Border Color"
        defaultValue={borderColor || '#E0E0E0'}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, borderColor: v } })}
      />
      <SliderInput
        label="Border Radius"
        defaultValue={borderRadius || 12}
        onChange={(v: number) => updateData({ ...data, props: { ...data.props, borderRadius: v } })}
        min={0}
        max={32}
        units="px"
      />
      <SliderInput
        label="Padding"
        defaultValue={padding || 24}
        onChange={(v: number) => updateData({ ...data, props: { ...data.props, padding: v } })}
        min={8}
        max={48}
        units="px"
      />
      <BooleanInput
        label="Shadow"
        defaultValue={shadow || false}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, shadow: v } })}
      />

      <Divider sx={{ my: 2 }} />

      {/* Code Box Styling */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
        🔲 Code Box Style
      </Typography>
      <ColorInput
        label="Code Background"
        defaultValue={codeBackgroundColor || '#F5F5F5'}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, codeBackgroundColor: v } })}
      />
      <RadioGroupInput
        label="Code Border Style"
        defaultValue={codeBorderStyle || 'dashed'}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, codeBorderStyle: v } })}
      >
        <ToggleButton value="solid">Solid</ToggleButton>
        <ToggleButton value="dashed">Dashed</ToggleButton>
        <ToggleButton value="dotted">Dotted</ToggleButton>
      </RadioGroupInput>
      <ColorInput
        label="Code Border Color"
        defaultValue={codeBorderColor || '#333333'}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, codeBorderColor: v } })}
      />
      <ColorInput
        label="Code Text Color"
        defaultValue={codeTextColor || '#333333'}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, codeTextColor: v } })}
      />
      <SliderInput
        label="Code Font Size"
        defaultValue={codeFontSize || 24}
        onChange={(v: number) => updateData({ ...data, props: { ...data.props, codeFontSize: v } })}
        min={14}
        max={36}
        units="px"
      />

      <Divider sx={{ my: 2 }} />

      {/* Text Colors */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
        🖋️ Text Colors
      </Typography>
      <ColorInput
        label="Title Color"
        defaultValue={titleColor || '#333333'}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, titleColor: v } })}
      />
      <SliderInput
        label="Title Font Size"
        defaultValue={titleFontSize || 24}
        onChange={(v: number) => updateData({ ...data, props: { ...data.props, titleFontSize: v } })}
        min={16}
        max={36}
        units="px"
      />
      <ColorInput
        label="Subtitle Color"
        defaultValue={subtitleColor || '#666666'}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, subtitleColor: v } })}
      />
      <ColorInput
        label="Description Color"
        defaultValue={descriptionColor || '#666666'}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, descriptionColor: v } })}
      />

      <Divider sx={{ my: 2 }} />

      {/* Decorations */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#666' }}>
        ✂️ Decorations
      </Typography>
      <BooleanInput
        label="Show Scissors Icon"
        defaultValue={showScissors || false}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showScissors: v } })}
      />
      <BooleanInput
        label="Show Dashed Line"
        defaultValue={showDashedLine || false}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showDashedLine: v } })}
      />
    </BaseSidebarPanel>
  );
}
