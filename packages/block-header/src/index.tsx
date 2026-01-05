import React, { CSSProperties } from 'react';
import { z } from 'zod';

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

// Navigation Link Schema
const NAV_LINK_SCHEMA = z.object({
  id: z.string().optional().nullable(),
  text: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
});

export const HeaderPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      // Logo
      showLogo: z.boolean().optional().nullable(),
      logoUrl: z.string().optional().nullable(),
      logoAlt: z.string().optional().nullable(),
      logoWidth: z.number().optional().nullable(),
      logoHeight: z.number().optional().nullable(),
      logoLink: z.string().optional().nullable(),

      // Brand Name (alternative to logo)
      showBrandName: z.boolean().optional().nullable(),
      brandName: z.string().optional().nullable(),
      brandNameColor: COLOR_SCHEMA,
      brandNameFontSize: z.number().optional().nullable(),
      brandNameFontWeight: z.enum(['normal', 'bold', '500', '600', '700', '800']).optional().nullable(),

      // Tagline/Subtitle
      showTagline: z.boolean().optional().nullable(),
      tagline: z.string().optional().nullable(),
      taglineColor: COLOR_SCHEMA,
      taglineFontSize: z.number().optional().nullable(),

      // Navigation Links
      showNavigation: z.boolean().optional().nullable(),
      navLinks: z.array(NAV_LINK_SCHEMA).optional().nullable(),
      navLinkColor: COLOR_SCHEMA,
      navLinkFontSize: z.number().optional().nullable(),
      navLinkGap: z.number().optional().nullable(),

      // Divider
      showDivider: z.boolean().optional().nullable(),
      dividerColor: COLOR_SCHEMA,
      dividerHeight: z.number().optional().nullable(),

      // Layout
      layout: z.enum(['left', 'center', 'right', 'split']).optional().nullable(),
      contentGap: z.number().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type HeaderProps = z.infer<typeof HeaderPropsSchema>;
export type NavLink = z.infer<typeof NAV_LINK_SCHEMA>;

export const HeaderPropsDefaults = {
  // Logo
  showLogo: true,
  logoUrl: 'https://placehold.co/150x50/1a1a1a/FFFFFF?text=LOGO',
  logoAlt: 'Company Logo',
  logoWidth: 150,
  logoHeight: 50,
  logoLink: '#',

  // Brand Name
  showBrandName: false,
  brandName: 'BRAND NAME',
  brandNameColor: '#1a1a1a',
  brandNameFontSize: 24,
  brandNameFontWeight: 'bold',

  // Tagline
  showTagline: false,
  tagline: 'Your trusted partner',
  taglineColor: '#666666',
  taglineFontSize: 14,

  // Navigation
  showNavigation: true,
  navLinks: [
    { id: '1', text: 'Home', url: '#' },
    { id: '2', text: 'Shop', url: '#' },
    { id: '3', text: 'About', url: '#' },
    { id: '4', text: 'Contact', url: '#' },
  ] as NavLink[],
  navLinkColor: '#333333',
  navLinkFontSize: 14,
  navLinkGap: 24,

  // Divider
  showDivider: true,
  dividerColor: '#E0E0E0',
  dividerHeight: 1,

  // Layout
  layout: 'center',
  contentGap: 16,
} as const;

const getPadding = (style: HeaderProps['style']) =>
  style?.padding
    ? `${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px`
    : undefined;

export function Header({ style, props }: HeaderProps) {
  // Logo
  const showLogo = props?.showLogo ?? HeaderPropsDefaults.showLogo;
  const logoUrl = props?.logoUrl ?? HeaderPropsDefaults.logoUrl;
  const logoAlt = props?.logoAlt ?? HeaderPropsDefaults.logoAlt;
  const logoWidth = props?.logoWidth ?? HeaderPropsDefaults.logoWidth;
  const logoHeight = props?.logoHeight ?? HeaderPropsDefaults.logoHeight;
  const logoLink = props?.logoLink ?? HeaderPropsDefaults.logoLink;

  // Brand Name
  const showBrandName = props?.showBrandName ?? HeaderPropsDefaults.showBrandName;
  const brandName = props?.brandName ?? HeaderPropsDefaults.brandName;
  const brandNameColor = props?.brandNameColor ?? HeaderPropsDefaults.brandNameColor;
  const brandNameFontSize = props?.brandNameFontSize ?? HeaderPropsDefaults.brandNameFontSize;
  const brandNameFontWeight = props?.brandNameFontWeight ?? HeaderPropsDefaults.brandNameFontWeight;

  // Tagline
  const showTagline = props?.showTagline ?? HeaderPropsDefaults.showTagline;
  const tagline = props?.tagline ?? HeaderPropsDefaults.tagline;
  const taglineColor = props?.taglineColor ?? HeaderPropsDefaults.taglineColor;
  const taglineFontSize = props?.taglineFontSize ?? HeaderPropsDefaults.taglineFontSize;

  // Navigation
  const showNavigation = props?.showNavigation ?? HeaderPropsDefaults.showNavigation;
  const navLinks = props?.navLinks ?? HeaderPropsDefaults.navLinks;
  const navLinkColor = props?.navLinkColor ?? HeaderPropsDefaults.navLinkColor;
  const navLinkFontSize = props?.navLinkFontSize ?? HeaderPropsDefaults.navLinkFontSize;
  const navLinkGap = props?.navLinkGap ?? HeaderPropsDefaults.navLinkGap;

  // Divider
  const showDivider = props?.showDivider ?? HeaderPropsDefaults.showDivider;
  const dividerColor = props?.dividerColor ?? HeaderPropsDefaults.dividerColor;
  const dividerHeight = props?.dividerHeight ?? HeaderPropsDefaults.dividerHeight;

  // Layout
  const layout = props?.layout ?? HeaderPropsDefaults.layout;
  const contentGap = props?.contentGap ?? HeaderPropsDefaults.contentGap;

  const getAlignment = () => {
    if (layout === 'left') return 'flex-start';
    if (layout === 'right') return 'flex-end';
    return 'center';
  };

  const containerStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? '#FFFFFF',
    padding: getPadding(style) ?? '24px',
  };

  const innerContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: layout === 'split' ? 'row' : 'column',
    alignItems: layout === 'split' ? 'center' : getAlignment(),
    justifyContent: layout === 'split' ? 'space-between' : 'center',
    gap: contentGap,
    textAlign: layout === 'left' ? 'left' : layout === 'right' ? 'right' : 'center',
  };

  const logoContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: layout === 'split' ? 'flex-start' : getAlignment(),
    gap: 4,
  };

  const logoStyle: CSSProperties = {
    width: logoWidth,
    height: logoHeight,
    objectFit: 'contain',
  };

  const brandNameStyle: CSSProperties = {
    color: brandNameColor,
    fontSize: brandNameFontSize,
    fontWeight: brandNameFontWeight as CSSProperties['fontWeight'],
    margin: 0,
    letterSpacing: 1,
  };

  const taglineStyle: CSSProperties = {
    color: taglineColor,
    fontSize: taglineFontSize,
    margin: 0,
    marginTop: 4,
  };

  const navContainerStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: layout === 'split' ? 'flex-end' : getAlignment(),
    alignItems: 'center',
    gap: navLinkGap,
  };

  const navLinkStyle: CSSProperties = {
    color: navLinkColor,
    fontSize: navLinkFontSize,
    textDecoration: 'none',
    transition: 'opacity 0.2s ease',
  };

  const dividerStyle: CSSProperties = {
    width: '100%',
    height: dividerHeight,
    backgroundColor: dividerColor,
    marginTop: contentGap,
    border: 'none',
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.stopPropagation();
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        {/* Logo / Brand Section */}
        <div style={logoContainerStyle}>
          {showLogo && logoUrl && (
            <a
              href={logoLink || '#'}
              onClick={(e) => handleLinkClick(e, logoLink || '')}
              style={{ display: 'inline-block' }}
            >
              <img src={logoUrl} alt={logoAlt ?? ''} style={logoStyle} />
            </a>
          )}

          {showBrandName && brandName && (
            <h1 style={brandNameStyle}>{brandName}</h1>
          )}

          {showTagline && tagline && (
            <p style={taglineStyle}>{tagline}</p>
          )}
        </div>

        {/* Navigation Links */}
        {showNavigation && navLinks && navLinks.length > 0 && (
          <nav style={navContainerStyle}>
            {navLinks.map((link, index) => (
              <a
                key={link?.id || index}
                href={link?.url || '#'}
                onClick={(e) => handleLinkClick(e, link?.url || '')}
                style={navLinkStyle}
                onMouseOver={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                {link?.text || 'Link'}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Divider */}
      {showDivider && <hr style={dividerStyle} />}
    </div>
  );
}
