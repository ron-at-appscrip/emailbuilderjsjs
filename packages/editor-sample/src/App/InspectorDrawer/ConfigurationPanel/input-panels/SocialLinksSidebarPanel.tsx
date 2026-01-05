import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button,Divider, IconButton, TextField, ToggleButton, Typography } from '@mui/material';
import { SocialLink,SocialLinksProps, SocialLinksPropsDefaults, SocialLinksPropsSchema } from '@usewaypoint/block-social-links';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import ColorInput from './helpers/inputs/ColorInput';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type SocialLinksSidebarPanelProps = {
  data: SocialLinksProps;
  setData: (v: SocialLinksProps) => void;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
    {children}
  </Typography>
);

// Preset social icons
const PRESET_ICONS: Record<string, string> = {
  Instagram: 'https://cdn-icons-png.flaticon.com/32/2111/2111463.png',
  Facebook: 'https://cdn-icons-png.flaticon.com/32/733/733547.png',
  Twitter: 'https://cdn-icons-png.flaticon.com/32/733/733579.png',
  LinkedIn: 'https://cdn-icons-png.flaticon.com/32/3536/3536505.png',
  Pinterest: 'https://cdn-icons-png.flaticon.com/32/145/145808.png',
  YouTube: 'https://cdn-icons-png.flaticon.com/32/1384/1384060.png',
  TikTok: 'https://cdn-icons-png.flaticon.com/32/3046/3046121.png',
  WhatsApp: 'https://cdn-icons-png.flaticon.com/32/733/733585.png',
  Telegram: 'https://cdn-icons-png.flaticon.com/32/2111/2111646.png',
  Custom: 'https://placehold.co/32x32/CCC/666?text=+',
};

export default function SocialLinksSidebarPanel({ data, setData }: SocialLinksSidebarPanelProps) {
  const [, setErrors] = useState<any>(null);

  const updateData = (d: unknown) => {
    const res = SocialLinksPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  // Links
  const links = data.props?.links ?? SocialLinksPropsDefaults.links;

  // Contact Info
  const showContactInfo = data.props?.showContactInfo ?? SocialLinksPropsDefaults.showContactInfo;
  const contactText = data.props?.contactText ?? SocialLinksPropsDefaults.contactText;
  const contactTextColor = data.props?.contactTextColor ?? SocialLinksPropsDefaults.contactTextColor;

  // Footer Text
  const showFooterText = data.props?.showFooterText ?? SocialLinksPropsDefaults.showFooterText;
  const footerText = data.props?.footerText ?? SocialLinksPropsDefaults.footerText;
  const footerTextColor = data.props?.footerTextColor ?? SocialLinksPropsDefaults.footerTextColor;

  // Styling
  const iconSize = data.props?.iconSize ?? SocialLinksPropsDefaults.iconSize;
  const iconGap = data.props?.iconGap ?? SocialLinksPropsDefaults.iconGap;
  const iconBorderRadius = data.props?.iconBorderRadius ?? SocialLinksPropsDefaults.iconBorderRadius;
  const alignment = data.props?.alignment ?? SocialLinksPropsDefaults.alignment;

  // Handlers for dynamic links
  const handleAddLink = (platform: string = 'Custom') => {
    const newLink: SocialLink = {
      id: `link-${Date.now()}`,
      platform: platform,
      iconUrl: PRESET_ICONS[platform] || PRESET_ICONS.Custom,
      url: platform !== 'Custom' ? `https://${platform.toLowerCase()}.com` : '#',
    };
    const currentLinks = links || [];
    updateData({ ...data, props: { ...data.props, links: [...currentLinks, newLink] } });
  };

  const handleRemoveLink = (index: number) => {
    const currentLinks = links || [];
    const newLinks = currentLinks.filter((_: SocialLink, i: number) => i !== index);
    updateData({ ...data, props: { ...data.props, links: newLinks } });
  };

  const handleUpdateLink = (index: number, field: string, value: string) => {
    const currentLinks = links || [];
    const newLinks = currentLinks.map((link: SocialLink, i: number) =>
      i === index ? { ...link, [field]: value } : link
    );
    updateData({ ...data, props: { ...data.props, links: newLinks } });
  };

  return (
    <BaseSidebarPanel title="Social Links">
      {/* SOCIAL LINKS SECTION */}
      <SectionTitle>🔗 Social Links</SectionTitle>
      
      {links && links.map((link: SocialLink, index: number) => (
        <Box key={link?.id || index} sx={{ mb: 2, p: 1.5, border: '1px solid #eee', borderRadius: 1, backgroundColor: '#fafafa' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="caption" fontWeight="bold">
              {link?.platform || `Link ${index + 1}`}
            </Typography>
            <IconButton size="small" onClick={() => handleRemoveLink(index)} color="error">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          <TextField
            label="Platform Name"
            size="small"
            fullWidth
            value={link?.platform || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateLink(index, 'platform', e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Icon URL"
            size="small"
            fullWidth
            value={link?.iconUrl || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateLink(index, 'iconUrl', e.target.value)}
            sx={{ mb: 1 }}
          />
          <TextField
            label="Link URL"
            size="small"
            fullWidth
            value={link?.url || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateLink(index, 'url', e.target.value)}
          />
        </Box>
      ))}

      {/* Quick Add Buttons */}
      <Typography variant="caption" sx={{ display: 'block', mb: 1, color: 'text.secondary' }}>
        Quick Add:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
        {Object.keys(PRESET_ICONS).map((platform) => (
          <Button
            key={platform}
            size="small"
            variant="outlined"
            onClick={() => handleAddLink(platform)}
            sx={{ fontSize: 10, py: 0.5, px: 1, minWidth: 'auto' }}
          >
            {platform}
          </Button>
        ))}
      </Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => handleAddLink('Custom')}
        fullWidth
        size="small"
        sx={{ mt: 1 }}
      >
        Add Custom Link
      </Button>

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
            label="Contact Text"
            defaultValue={contactText}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, contactText: v } })}
          />
          <ColorInput
            label="Contact Text Color"
            defaultValue={contactTextColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, contactTextColor: v } })}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* FOOTER TEXT SECTION */}
      <SectionTitle>📝 Footer Text</SectionTitle>
      <BooleanInput
        label="Show Footer Text"
        defaultValue={showFooterText}
        onChange={(v: boolean) => updateData({ ...data, props: { ...data.props, showFooterText: v } })}
      />
      {showFooterText && (
        <>
          <TextInput
            label="Footer Text"
            defaultValue={footerText}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, footerText: v } })}
          />
          <ColorInput
            label="Footer Text Color"
            defaultValue={footerTextColor}
            onChange={(v: string) => updateData({ ...data, props: { ...data.props, footerTextColor: v } })}
          />
        </>
      )}

      <Divider sx={{ my: 2 }} />

      {/* STYLING SECTION */}
      <SectionTitle>🎨 Icon Styling</SectionTitle>
      <TextField
        label="Icon Size (px)"
        type="number"
        size="small"
        fullWidth
        value={iconSize}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, iconSize: Number(e.target.value) } })}
        sx={{ mb: 1 }}
        inputProps={{ min: 16, max: 64 }}
      />
      <TextField
        label="Icon Gap (px)"
        type="number"
        size="small"
        fullWidth
        value={iconGap}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, iconGap: Number(e.target.value) } })}
        sx={{ mb: 1 }}
        inputProps={{ min: 4, max: 48 }}
      />
      <TextField
        label="Icon Border Radius (px)"
        type="number"
        size="small"
        fullWidth
        value={iconBorderRadius}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData({ ...data, props: { ...data.props, iconBorderRadius: Number(e.target.value) } })}
        sx={{ mb: 1 }}
        inputProps={{ min: 0, max: 50 }}
      />
      <RadioGroupInput
        label="Alignment"
        defaultValue={alignment}
        onChange={(v: string) => updateData({ ...data, props: { ...data.props, alignment: v } })}
      >
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </RadioGroupInput>

      <Divider sx={{ my: 2 }} />

      {/* BACKGROUND & PADDING */}
      <SectionTitle>📦 Container Style</SectionTitle>
      <MultiStylePropertyPanel
        names={['backgroundColor', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}

