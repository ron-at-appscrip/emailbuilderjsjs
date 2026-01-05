import React, { useState } from 'react';

import { Divider, TextField,ToggleButton, Typography } from '@mui/material';
import { PromoBannerProps, PromoBannerPropsDefaults, PromoBannerPropsSchema } from '@usewaypoint/block-promo-banner';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import ColorInput from './helpers/inputs/ColorInput';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type PromoBannerSidebarPanelProps = {
  data: PromoBannerProps;
  setData: (v: PromoBannerProps) => void;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
    {children}
  </Typography>
);

export default function PromoBannerSidebarPanel({ data, setData }: PromoBannerSidebarPanelProps) {
  const [, setErrors] = useState<any>(null);

  const updateData = (d: unknown) => {
    const res = PromoBannerPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  // Icon
  const showIcon = data.props?.showIcon ?? PromoBannerPropsDefaults.showIcon;
  const iconUrl = data.props?.iconUrl ?? PromoBannerPropsDefaults.iconUrl;
  const iconAlt = data.props?.iconAlt ?? PromoBannerPropsDefaults.iconAlt;
  const iconWidth = data.props?.iconWidth ?? PromoBannerPropsDefaults.iconWidth;
  const iconHeight = data.props?.iconHeight ?? PromoBannerPropsDefaults.iconHeight;

  // Headline
  const headline = data.props?.headline ?? PromoBannerPropsDefaults.headline;
  const headlineColor = data.props?.headlineColor ?? PromoBannerPropsDefaults.headlineColor;
  const headlineFontSize = data.props?.headlineFontSize ?? PromoBannerPropsDefaults.headlineFontSize;

  // Description
  const description = data.props?.description ?? PromoBannerPropsDefaults.description;
  const descriptionColor = data.props?.descriptionColor ?? PromoBannerPropsDefaults.descriptionColor;
  const descriptionFontSize = data.props?.descriptionFontSize ?? PromoBannerPropsDefaults.descriptionFontSize;

  // Button
  const showButton = data.props?.showButton ?? PromoBannerPropsDefaults.showButton;
  const buttonText = data.props?.buttonText ?? PromoBannerPropsDefaults.buttonText;
  const buttonUrl = data.props?.buttonUrl ?? PromoBannerPropsDefaults.buttonUrl;
  const buttonStyle = data.props?.buttonStyle ?? PromoBannerPropsDefaults.buttonStyle;
  const buttonColor = data.props?.buttonColor ?? PromoBannerPropsDefaults.buttonColor;
  const buttonTextColor = data.props?.buttonTextColor ?? PromoBannerPropsDefaults.buttonTextColor;

  // Layout
  const alignment = data.props?.alignment ?? PromoBannerPropsDefaults.alignment;
  const contentGap = data.props?.contentGap ?? PromoBannerPropsDefaults.contentGap;

  return (
    <BaseSidebarPanel title="Promo Banner">
      {/* ICON SECTION */}
      <SectionTitle>🖼️ Icon/Image</SectionTitle>
      <BooleanInput
        label="Show Icon"
        defaultValue={showIcon}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showIcon: v } })}
      />
      {showIcon && (
        <>
          <TextInput
            label="Icon URL"
            defaultValue={iconUrl}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, iconUrl: v } })}
          />
          <TextInput
            label="Icon Alt Text"
            defaultValue={iconAlt}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, iconAlt: v } })}
          />
          <TextField
            label="Icon Width (px)"
            type="number"
            size="small"
            fullWidth
            value={iconWidth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, iconWidth: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 16, max: 200 }}
          />
          <TextField
            label="Icon Height (px)"
            type="number"
            size="small"
            fullWidth
            value={iconHeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, iconHeight: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 16, max: 200 }}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* HEADLINE SECTION */}
      <SectionTitle>📝 Headline</SectionTitle>
      <TextInput
        label="Headline Text"
        defaultValue={headline}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, headline: v } })}
      />
      <ColorInput
        label="Headline Color"
        defaultValue={headlineColor}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, headlineColor: v } })}
      />
      <TextField
        label="Headline Font Size (px)"
        type="number"
        size="small"
        fullWidth
        value={headlineFontSize}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, headlineFontSize: Number(e.target.value) } })}
        sx={{ mt: 1 }}
        inputProps={{ min: 12, max: 48 }}
      />

      <Divider sx={{ my: 2 }} />

      {/* DESCRIPTION SECTION */}
      <SectionTitle>📄 Description</SectionTitle>
      <TextInput
        label="Description Text"
        defaultValue={description}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, description: v } })}
      />
      <ColorInput
        label="Description Color"
        defaultValue={descriptionColor}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, descriptionColor: v } })}
      />
      <TextField
        label="Description Font Size (px)"
        type="number"
        size="small"
        fullWidth
        value={descriptionFontSize}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, descriptionFontSize: Number(e.target.value) } })}
        sx={{ mt: 1 }}
        inputProps={{ min: 10, max: 24 }}
      />

      <Divider sx={{ my: 2 }} />

      {/* BUTTON SECTION */}
      <SectionTitle>🔘 Button</SectionTitle>
      <BooleanInput
        label="Show Button"
        defaultValue={showButton}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showButton: v } })}
      />
      {showButton && (
        <>
          <TextInput
            label="Button Text"
            defaultValue={buttonText}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, buttonText: v } })}
          />
          <TextInput
            label="Button URL"
            defaultValue={buttonUrl}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, buttonUrl: v } })}
          />
          <RadioGroupInput
            label="Button Style"
            defaultValue={buttonStyle}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, buttonStyle: v } })}
          >
            <ToggleButton value="link">Link</ToggleButton>
            <ToggleButton value="solid">Solid</ToggleButton>
            <ToggleButton value="outline">Outline</ToggleButton>
          </RadioGroupInput>
          <ColorInput
            label="Button Color"
            defaultValue={buttonColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, buttonColor: v } })}
          />
          <ColorInput
            label="Button Text Color"
            defaultValue={buttonTextColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, buttonTextColor: v } })}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* LAYOUT SECTION */}
      <SectionTitle>📐 Layout</SectionTitle>
      <RadioGroupInput
        label="Alignment"
        defaultValue={alignment}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, alignment: v } })}
      >
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </RadioGroupInput>
      <TextField
        label="Content Gap (px)"
        type="number"
        size="small"
        fullWidth
        value={contentGap}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, contentGap: Number(e.target.value) } })}
        sx={{ mt: 1 }}
        inputProps={{ min: 0, max: 48 }}
      />

      <Divider sx={{ my: 2 }} />

      {/* BACKGROUND & PADDING */}
      <SectionTitle>🎨 Style</SectionTitle>
      <MultiStylePropertyPanel
        names={['backgroundColor', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}

