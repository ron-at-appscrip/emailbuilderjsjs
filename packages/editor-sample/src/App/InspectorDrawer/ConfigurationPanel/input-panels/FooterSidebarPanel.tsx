import React, { useState } from 'react';

import { Divider, TextField,ToggleButton, Typography } from '@mui/material';
import { FooterProps, FooterPropsDefaults, FooterPropsSchema, FooterLink, SocialLink } from '@usewaypoint/block-footer';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import ColorInput from './helpers/inputs/ColorInput';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type FooterSidebarPanelProps = {
  data: FooterProps;
  setData: (v: FooterProps) => void;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
    {children}
  </Typography>
);

export default function FooterSidebarPanel({ data, setData }: FooterSidebarPanelProps) {
  const [, setErrors] = useState<any>(null);

  const updateData = (d: unknown) => {
    const res = FooterPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  // Company Info
  const showCompanyName = data.props?.showCompanyName ?? FooterPropsDefaults.showCompanyName;
  const companyName = data.props?.companyName ?? FooterPropsDefaults.companyName;
  const companyNameColor = data.props?.companyNameColor ?? FooterPropsDefaults.companyNameColor;
  const companyNameFontSize = data.props?.companyNameFontSize ?? FooterPropsDefaults.companyNameFontSize;

  // Address
  const showAddress = data.props?.showAddress ?? FooterPropsDefaults.showAddress;
  const address = data.props?.address ?? FooterPropsDefaults.address;
  const addressColor = data.props?.addressColor ?? FooterPropsDefaults.addressColor;
  const addressFontSize = data.props?.addressFontSize ?? FooterPropsDefaults.addressFontSize;

  // Copyright
  const showCopyright = data.props?.showCopyright ?? FooterPropsDefaults.showCopyright;
  const copyrightText = data.props?.copyrightText ?? FooterPropsDefaults.copyrightText;
  const copyrightColor = data.props?.copyrightColor ?? FooterPropsDefaults.copyrightColor;
  const copyrightFontSize = data.props?.copyrightFontSize ?? FooterPropsDefaults.copyrightFontSize;

  // Footer Links
  const showFooterLinks = data.props?.showFooterLinks ?? FooterPropsDefaults.showFooterLinks;
  const footerLinks = data.props?.footerLinks ?? FooterPropsDefaults.footerLinks;
  const footerLinkColor = data.props?.footerLinkColor ?? FooterPropsDefaults.footerLinkColor;
  const footerLinkFontSize = data.props?.footerLinkFontSize ?? FooterPropsDefaults.footerLinkFontSize;

  // Social Links
  const showSocialLinks = data.props?.showSocialLinks ?? FooterPropsDefaults.showSocialLinks;
  const socialLinks = data.props?.socialLinks ?? FooterPropsDefaults.socialLinks;
  const socialIconSize = data.props?.socialIconSize ?? FooterPropsDefaults.socialIconSize;
  const socialIconGap = data.props?.socialIconGap ?? FooterPropsDefaults.socialIconGap;

  // Unsubscribe
  const showUnsubscribe = data.props?.showUnsubscribe ?? FooterPropsDefaults.showUnsubscribe;
  const unsubscribeText = data.props?.unsubscribeText ?? FooterPropsDefaults.unsubscribeText;
  const unsubscribeUrl = data.props?.unsubscribeUrl ?? FooterPropsDefaults.unsubscribeUrl;
  const unsubscribeColor = data.props?.unsubscribeColor ?? FooterPropsDefaults.unsubscribeColor;

  // Contact Info
  const showContactInfo = data.props?.showContactInfo ?? FooterPropsDefaults.showContactInfo;
  const email = data.props?.email ?? FooterPropsDefaults.email;
  const phone = data.props?.phone ?? FooterPropsDefaults.phone;
  const contactColor = data.props?.contactColor ?? FooterPropsDefaults.contactColor;

  // Divider
  const showDivider = data.props?.showDivider ?? FooterPropsDefaults.showDivider;
  const dividerColor = data.props?.dividerColor ?? FooterPropsDefaults.dividerColor;
  const dividerHeight = data.props?.dividerHeight ?? FooterPropsDefaults.dividerHeight;

  // Layout
  const alignment = data.props?.alignment ?? FooterPropsDefaults.alignment;
  const contentGap = data.props?.contentGap ?? FooterPropsDefaults.contentGap;

  // Helper to update footer links
  const updateFooterLink = (index: number, field: string, value: string) => {
    const newLinks = [...(footerLinks || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    updateData({ ...data, props: { ...data.props, footerLinks: newLinks } });
  };

  const addFooterLink = () => {
    const newLinks = [...(footerLinks || []), { id: String(Date.now()), text: 'New Link', url: '#' }];
    updateData({ ...data, props: { ...data.props, footerLinks: newLinks } });
  };

  const removeFooterLink = (index: number) => {
    const newLinks = [...(footerLinks || [])];
    newLinks.splice(index, 1);
    updateData({ ...data, props: { ...data.props, footerLinks: newLinks } });
  };

  // Helper to update social links
  const updateSocialLink = (index: number, field: string, value: string) => {
    const newLinks = [...(socialLinks || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    updateData({ ...data, props: { ...data.props, socialLinks: newLinks } });
  };

  const addSocialLink = () => {
    const newLinks = [...(socialLinks || []), { id: String(Date.now()), platform: 'Social', iconUrl: 'https://placehold.co/32x32', url: '#' }];
    updateData({ ...data, props: { ...data.props, socialLinks: newLinks } });
  };

  const removeSocialLink = (index: number) => {
    const newLinks = [...(socialLinks || [])];
    newLinks.splice(index, 1);
    updateData({ ...data, props: { ...data.props, socialLinks: newLinks } });
  };

  return (
    <BaseSidebarPanel title="Footer">
      {/* DIVIDER SECTION */}
      <SectionTitle>➖ Top Divider</SectionTitle>
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

      {/* COMPANY INFO SECTION */}
      <SectionTitle>🏢 Company Info</SectionTitle>
      <BooleanInput
        label="Show Company Name"
        defaultValue={showCompanyName}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showCompanyName: v } })}
      />
      {showCompanyName && (
        <>
          <TextInput
            label="Company Name"
            defaultValue={companyName}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, companyName: v } })}
          />
          <ColorInput
            label="Company Name Color"
            defaultValue={companyNameColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, companyNameColor: v } })}
          />
          <TextField
            label="Font Size (px)"
            type="number"
            size="small"
            fullWidth
            value={companyNameFontSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, companyNameFontSize: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 12, max: 36 }}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* ADDRESS SECTION */}
      <SectionTitle>📍 Address</SectionTitle>
      <BooleanInput
        label="Show Address"
        defaultValue={showAddress}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showAddress: v } })}
      />
      {showAddress && (
        <>
          <TextInput
            label="Address"
            defaultValue={address}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, address: v } })}
          />
          <ColorInput
            label="Address Color"
            defaultValue={addressColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, addressColor: v } })}
          />
          <TextField
            label="Font Size (px)"
            type="number"
            size="small"
            fullWidth
            value={addressFontSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, addressFontSize: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 10, max: 18 }}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* CONTACT INFO SECTION */}
      <SectionTitle>📧 Contact Info</SectionTitle>
      <BooleanInput
        label="Show Contact Info"
        defaultValue={showContactInfo}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showContactInfo: v } })}
      />
      {showContactInfo && (
        <>
          <TextInput
            label="Email"
            defaultValue={email}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, email: v } })}
          />
          <TextInput
            label="Phone"
            defaultValue={phone}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, phone: v } })}
          />
          <ColorInput
            label="Contact Color"
            defaultValue={contactColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, contactColor: v } })}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* SOCIAL LINKS SECTION */}
      <SectionTitle>📱 Social Links</SectionTitle>
      <BooleanInput
        label="Show Social Links"
        defaultValue={showSocialLinks}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showSocialLinks: v } })}
      />
      {showSocialLinks && (
        <>
          <TextField
            label="Icon Size (px)"
            type="number"
            size="small"
            fullWidth
            value={socialIconSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, socialIconSize: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 16, max: 64 }}
          />
          <TextField
            label="Icon Gap (px)"
            type="number"
            size="small"
            fullWidth
            value={socialIconGap}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, socialIconGap: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 4, max: 32 }}
          />

          <Typography variant="caption" sx={{ mt: 2, display: 'block', fontWeight: 'bold' }}>Social Icons:</Typography>
          {socialLinks?.map((link: SocialLink, index: number) => (
            <div key={link.id || index} style={{ marginTop: 8, padding: 8, background: '#f5f5f5', borderRadius: 4 }}>
              <TextField
                size="small"
                label="Platform"
                value={link.platform || ''}
                onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />
              <TextField
                size="small"
                label="Icon URL"
                value={link.iconUrl || ''}
                onChange={(e) => updateSocialLink(index, 'iconUrl', e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />
              <TextField
                size="small"
                label="Link URL"
                value={link.url || ''}
                onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
              />
              <button onClick={() => removeSocialLink(index)} style={{ cursor: 'pointer', background: '#ff4444', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px', width: '100%' }}>Remove</button>
            </div>
          ))}
          <button onClick={addSocialLink} style={{ marginTop: 8, cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: 4, padding: '8px 16px', width: '100%' }}>+ Add Social Link</button>
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* FOOTER LINKS SECTION */}
      <SectionTitle>🔗 Footer Links</SectionTitle>
      <BooleanInput
        label="Show Footer Links"
        defaultValue={showFooterLinks}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showFooterLinks: v } })}
      />
      {showFooterLinks && (
        <>
          <ColorInput
            label="Link Color"
            defaultValue={footerLinkColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, footerLinkColor: v } })}
          />
          <TextField
            label="Link Font Size (px)"
            type="number"
            size="small"
            fullWidth
            value={footerLinkFontSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, footerLinkFontSize: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 10, max: 18 }}
          />

          <Typography variant="caption" sx={{ mt: 2, display: 'block', fontWeight: 'bold' }}>Links:</Typography>
          {footerLinks?.map((link: FooterLink, index: number) => (
            <div key={link.id || index} style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
              <TextField
                size="small"
                placeholder="Text"
                value={link.text || ''}
                onChange={(e) => updateFooterLink(index, 'text', e.target.value)}
                sx={{ flex: 1 }}
              />
              <TextField
                size="small"
                placeholder="URL"
                value={link.url || ''}
                onChange={(e) => updateFooterLink(index, 'url', e.target.value)}
                sx={{ flex: 1 }}
              />
              <button onClick={() => removeFooterLink(index)} style={{ cursor: 'pointer', background: '#ff4444', color: 'white', border: 'none', borderRadius: 4, padding: '4px 8px' }}>✕</button>
            </div>
          ))}
          <button onClick={addFooterLink} style={{ marginTop: 8, cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: 4, padding: '8px 16px', width: '100%' }}>+ Add Link</button>
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* COPYRIGHT SECTION */}
      <SectionTitle>©️ Copyright</SectionTitle>
      <BooleanInput
        label="Show Copyright"
        defaultValue={showCopyright}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showCopyright: v } })}
      />
      {showCopyright && (
        <>
          <TextInput
            label="Copyright Text"
            defaultValue={copyrightText}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, copyrightText: v } })}
          />
          <ColorInput
            label="Copyright Color"
            defaultValue={copyrightColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, copyrightColor: v } })}
          />
          <TextField
            label="Font Size (px)"
            type="number"
            size="small"
            fullWidth
            value={copyrightFontSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, copyrightFontSize: Number(e.target.value) } })}
            sx={{ mt: 1 }}
            inputProps={{ min: 10, max: 16 }}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* UNSUBSCRIBE SECTION */}
      <SectionTitle>🚫 Unsubscribe</SectionTitle>
      <BooleanInput
        label="Show Unsubscribe"
        defaultValue={showUnsubscribe}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showUnsubscribe: v } })}
      />
      {showUnsubscribe && (
        <>
          <TextInput
            label="Unsubscribe Text"
            defaultValue={unsubscribeText}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, unsubscribeText: v } })}
          />
          <TextInput
            label="Unsubscribe URL"
            defaultValue={unsubscribeUrl}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, unsubscribeUrl: v } })}
          />
          <ColorInput
            label="Unsubscribe Color"
            defaultValue={unsubscribeColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, unsubscribeColor: v } })}
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
