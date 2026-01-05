import React, { useState } from 'react';

import { Divider, TextField,ToggleButton, Typography } from '@mui/material';
import { HeaderProps, HeaderPropsDefaults, HeaderPropsSchema, NavLink } from '@usewaypoint/block-header';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import ColorInput from './helpers/inputs/ColorInput';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type HeaderSidebarPanelProps = {
  data: HeaderProps;
  setData: (v: HeaderProps) => void;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
    {children}
  </Typography>
);

export default function HeaderSidebarPanel({ data, setData }: HeaderSidebarPanelProps) {
  const [, setErrors] = useState<any>(null);

  const updateData = (d: unknown) => {
    const res = HeaderPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  // Logo
  const showLogo = data.props?.showLogo ?? HeaderPropsDefaults.showLogo;
  const logoUrl = data.props?.logoUrl ?? HeaderPropsDefaults.logoUrl;
  const logoAlt = data.props?.logoAlt ?? HeaderPropsDefaults.logoAlt;
  const logoWidth = data.props?.logoWidth ?? HeaderPropsDefaults.logoWidth;
  const logoHeight = data.props?.logoHeight ?? HeaderPropsDefaults.logoHeight;
  const logoLink = data.props?.logoLink ?? HeaderPropsDefaults.logoLink;

  // Brand Name
  const showBrandName = data.props?.showBrandName ?? HeaderPropsDefaults.showBrandName;
  const brandName = data.props?.brandName ?? HeaderPropsDefaults.brandName;
  const brandNameColor = data.props?.brandNameColor ?? HeaderPropsDefaults.brandNameColor;
  const brandNameFontSize = data.props?.brandNameFontSize ?? HeaderPropsDefaults.brandNameFontSize;

  // Tagline
  const showTagline = data.props?.showTagline ?? HeaderPropsDefaults.showTagline;
  const tagline = data.props?.tagline ?? HeaderPropsDefaults.tagline;
  const taglineColor = data.props?.taglineColor ?? HeaderPropsDefaults.taglineColor;
  const taglineFontSize = data.props?.taglineFontSize ?? HeaderPropsDefaults.taglineFontSize;

  // Navigation
  const showNavigation = data.props?.showNavigation ?? HeaderPropsDefaults.showNavigation;
  const navLinkColor = data.props?.navLinkColor ?? HeaderPropsDefaults.navLinkColor;
  const navLinkFontSize = data.props?.navLinkFontSize ?? HeaderPropsDefaults.navLinkFontSize;
  const navLinkGap = data.props?.navLinkGap ?? HeaderPropsDefaults.navLinkGap;
  const navLinks = data.props?.navLinks ?? HeaderPropsDefaults.navLinks;

  // Divider
  const showDivider = data.props?.showDivider ?? HeaderPropsDefaults.showDivider;
  const dividerColor = data.props?.dividerColor ?? HeaderPropsDefaults.dividerColor;
  const dividerHeight = data.props?.dividerHeight ?? HeaderPropsDefaults.dividerHeight;

  // Layout
  const layout = data.props?.layout ?? HeaderPropsDefaults.layout;
  const contentGap = data.props?.contentGap ?? HeaderPropsDefaults.contentGap;

  // Helper to update nav links
  const updateNavLink = (index: number, field: string, value: string) => {
    const newLinks = [...(navLinks || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    updateData({ ...data, props: { ...data.props, navLinks: newLinks } });
  };

  const addNavLink = () => {
    const newLinks = [...(navLinks || []), { id: String(Date.now()), text: 'New Link', url: '#' }];
    updateData({ ...data, props: { ...data.props, navLinks: newLinks } });
  };

  const removeNavLink = (index: number) => {
    const newLinks = [...(navLinks || [])];
    newLinks.splice(index, 1);
    updateData({ ...data, props: { ...data.props, navLinks: newLinks } });
  };

  return (
    <BaseSidebarPanel title="Header">
      {/* LOGO SECTION */}
      <SectionTitle>🖼️ Logo</SectionTitle>
      <BooleanInput
        label="Show Logo"
        defaultValue={showLogo}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showLogo: v } })}
      />
      {showLogo && (
        <>
          <TextInput
            label="Logo URL"
            defaultValue={logoUrl}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, logoUrl: v } })}
          />
          <TextInput
            label="Logo Alt Text"
            defaultValue={logoAlt}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, logoAlt: v } })}
          />
          <TextInput
            label="Logo Link"
            defaultValue={logoLink}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, logoLink: v } })}
          />
          <TextField
            label="Logo Width (px)"
            type="number"
            size="small"
            fullWidth
            value={logoWidth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, logoWidth: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 50, max: 300 }}
          />
          <TextField
            label="Logo Height (px)"
            type="number"
            size="small"
            fullWidth
            value={logoHeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, logoHeight: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 20, max: 150 }}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* BRAND NAME SECTION */}
      <SectionTitle>✏️ Brand Name</SectionTitle>
      <BooleanInput
        label="Show Brand Name"
        defaultValue={showBrandName}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showBrandName: v } })}
      />
      {showBrandName && (
        <>
          <TextInput
            label="Brand Name"
            defaultValue={brandName}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, brandName: v } })}
          />
          <ColorInput
            label="Brand Name Color"
            defaultValue={brandNameColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, brandNameColor: v } })}
          />
          <TextField
            label="Font Size (px)"
            type="number"
            size="small"
            fullWidth
            value={brandNameFontSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, brandNameFontSize: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 14, max: 48 }}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* TAGLINE SECTION */}
      <SectionTitle>💬 Tagline</SectionTitle>
      <BooleanInput
        label="Show Tagline"
        defaultValue={showTagline}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showTagline: v } })}
      />
      {showTagline && (
        <>
          <TextInput
            label="Tagline Text"
            defaultValue={tagline}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, tagline: v } })}
          />
          <ColorInput
            label="Tagline Color"
            defaultValue={taglineColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, taglineColor: v } })}
          />
          <TextField
            label="Font Size (px)"
            type="number"
            size="small"
            fullWidth
            value={taglineFontSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, taglineFontSize: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 10, max: 24 }}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* NAVIGATION SECTION */}
      <SectionTitle>🔗 Navigation Links</SectionTitle>
      <BooleanInput
        label="Show Navigation"
        defaultValue={showNavigation}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showNavigation: v } })}
      />
      {showNavigation && (
        <>
          <ColorInput
            label="Link Color"
            defaultValue={navLinkColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, navLinkColor: v } })}
          />
          <TextField
            label="Link Font Size (px)"
            type="number"
            size="small"
            fullWidth
            value={navLinkFontSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, navLinkFontSize: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 10, max: 24 }}
          />
          <TextField
            label="Link Gap (px)"
            type="number"
            size="small"
            fullWidth
            value={navLinkGap}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, navLinkGap: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 8, max: 48 }}
          />

          <Typography variant="caption" sx={{ mt: 2, display: 'block', fontWeight: 'bold' }}>Navigation Items:</Typography>
          {navLinks?.map((link: NavLink, index: number) => (
            <div key={link.id || index} style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
              <TextField
                size="small"
                placeholder="Text"
                value={link.text || ''}
                onChange={(e) => updateNavLink(index, 'text', e.target.value)}
                sx={{ flex: 1 }}
              />
              <TextField
                size="small"
                placeholder="URL"
                value={link.url || ''}
                onChange={(e) => updateNavLink(index, 'url', e.target.value)}
                sx={{ flex: 1 }}
              />
              <button onClick={() => removeNavLink(index)} style={{ cursor: 'pointer', background: '#ff4444', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px' }}>✕</button>
            </div>
          ))}
          <button onClick={addNavLink} style={{ marginTop: 8, cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: 4, padding: '8px 16px', width: '100%' }}>+ Add Link</button>
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* DIVIDER SECTION */}
      <SectionTitle>➖ Divider</SectionTitle>
      <BooleanInput
        label="Show Divider"
        defaultValue={showDivider}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showDivider: v } })}
      />
      {showDivider && (
        <>
          <ColorInput
            label="Divider Color"
            defaultValue={dividerColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, dividerColor: v } })}
          />
          <TextField
            label="Divider Height (px)"
            type="number"
            size="small"
            fullWidth
            value={dividerHeight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, dividerHeight: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 1, max: 10 }}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* LAYOUT SECTION */}
      <SectionTitle>📐 Layout</SectionTitle>
      <RadioGroupInput
        label="Alignment"
        defaultValue={layout}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, layout: v } })}
      >
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
        <ToggleButton value="split">Split</ToggleButton>
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

      {/* STYLE SECTION */}
      <SectionTitle>🎨 Style</SectionTitle>
      <MultiStylePropertyPanel
        names={['backgroundColor', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
