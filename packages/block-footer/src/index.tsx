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
const FOOTER_LINK_SCHEMA = z.object({
  id: z.string().optional().nullable(),
  text: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
});

// Social Link Schema
const SOCIAL_LINK_SCHEMA = z.object({
  id: z.string().optional().nullable(),
  platform: z.string().optional().nullable(),
  iconUrl: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
});

export const FooterPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      // Company Info
      showCompanyName: z.boolean().optional().nullable(),
      companyName: z.string().optional().nullable(),
      companyNameColor: COLOR_SCHEMA,
      companyNameFontSize: z.number().optional().nullable(),

      // Address
      showAddress: z.boolean().optional().nullable(),
      address: z.string().optional().nullable(),
      addressColor: COLOR_SCHEMA,
      addressFontSize: z.number().optional().nullable(),

      // Copyright
      showCopyright: z.boolean().optional().nullable(),
      copyrightText: z.string().optional().nullable(),
      copyrightColor: COLOR_SCHEMA,
      copyrightFontSize: z.number().optional().nullable(),

      // Footer Links (Privacy, Terms, etc.)
      showFooterLinks: z.boolean().optional().nullable(),
      footerLinks: z.array(FOOTER_LINK_SCHEMA).optional().nullable(),
      footerLinkColor: COLOR_SCHEMA,
      footerLinkFontSize: z.number().optional().nullable(),
      footerLinkGap: z.number().optional().nullable(),

      // Social Links
      showSocialLinks: z.boolean().optional().nullable(),
      socialLinks: z.array(SOCIAL_LINK_SCHEMA).optional().nullable(),
      socialIconSize: z.number().optional().nullable(),
      socialIconGap: z.number().optional().nullable(),

      // Unsubscribe
      showUnsubscribe: z.boolean().optional().nullable(),
      unsubscribeText: z.string().optional().nullable(),
      unsubscribeUrl: z.string().optional().nullable(),
      unsubscribeColor: COLOR_SCHEMA,
      unsubscribeFontSize: z.number().optional().nullable(),

      // Contact Info
      showContactInfo: z.boolean().optional().nullable(),
      email: z.string().optional().nullable(),
      phone: z.string().optional().nullable(),
      contactColor: COLOR_SCHEMA,
      contactFontSize: z.number().optional().nullable(),

      // Divider (top)
      showDivider: z.boolean().optional().nullable(),
      dividerColor: COLOR_SCHEMA,
      dividerHeight: z.number().optional().nullable(),

      // Layout
      alignment: z.enum(['left', 'center', 'right']).optional().nullable(),
      contentGap: z.number().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type FooterProps = z.infer<typeof FooterPropsSchema>;
export type FooterLink = z.infer<typeof FOOTER_LINK_SCHEMA>;
export type SocialLink = z.infer<typeof SOCIAL_LINK_SCHEMA>;

export const FooterPropsDefaults = {
  // Company Info
  showCompanyName: true,
  companyName: 'Company Name',
  companyNameColor: '#333333',
  companyNameFontSize: 18,

  // Address
  showAddress: true,
  address: '123 Main Street, Suite 100, New York, NY 10001',
  addressColor: '#666666',
  addressFontSize: 14,

  // Copyright
  showCopyright: true,
  copyrightText: `© ${new Date().getFullYear()} Company Name. All rights reserved.`,
  copyrightColor: '#999999',
  copyrightFontSize: 12,

  // Footer Links
  showFooterLinks: true,
  footerLinks: [
    { id: '1', text: 'Privacy Policy', url: '#' },
    { id: '2', text: 'Terms of Service', url: '#' },
    { id: '3', text: 'Contact Us', url: '#' },
  ] as FooterLink[],
  footerLinkColor: '#0066cc',
  footerLinkFontSize: 12,
  footerLinkGap: 16,

  // Social Links
  showSocialLinks: true,
  socialLinks: [
    {
      id: '1',
      platform: 'Facebook',
      iconUrl: 'https://cdn-icons-png.flaticon.com/32/733/733547.png',
      url: 'https://facebook.com',
    },
    {
      id: '2',
      platform: 'Twitter',
      iconUrl: 'https://cdn-icons-png.flaticon.com/32/733/733579.png',
      url: 'https://twitter.com',
    },
    {
      id: '3',
      platform: 'Instagram',
      iconUrl: 'https://cdn-icons-png.flaticon.com/32/2111/2111463.png',
      url: 'https://instagram.com',
    },
    {
      id: '4',
      platform: 'LinkedIn',
      iconUrl: 'https://cdn-icons-png.flaticon.com/32/733/733561.png',
      url: 'https://linkedin.com',
    },
  ] as SocialLink[],
  socialIconSize: 24,
  socialIconGap: 12,

  // Unsubscribe
  showUnsubscribe: true,
  unsubscribeText: 'Unsubscribe from this list',
  unsubscribeUrl: '#unsubscribe',
  unsubscribeColor: '#999999',
  unsubscribeFontSize: 11,

  // Contact Info
  showContactInfo: true,
  email: 'support@company.com',
  phone: '+1 (555) 123-4567',
  contactColor: '#666666',
  contactFontSize: 13,

  // Divider
  showDivider: true,
  dividerColor: '#E0E0E0',
  dividerHeight: 1,

  // Layout
  alignment: 'center',
  contentGap: 16,
} as const;

const getPadding = (style: FooterProps['style']) =>
  style?.padding
    ? `${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px`
    : undefined;

export function Footer({ style, props }: FooterProps) {
  // Company Info
  const showCompanyName = props?.showCompanyName ?? FooterPropsDefaults.showCompanyName;
  const companyName = props?.companyName ?? FooterPropsDefaults.companyName;
  const companyNameColor = props?.companyNameColor ?? FooterPropsDefaults.companyNameColor;
  const companyNameFontSize = props?.companyNameFontSize ?? FooterPropsDefaults.companyNameFontSize;

  // Address
  const showAddress = props?.showAddress ?? FooterPropsDefaults.showAddress;
  const address = props?.address ?? FooterPropsDefaults.address;
  const addressColor = props?.addressColor ?? FooterPropsDefaults.addressColor;
  const addressFontSize = props?.addressFontSize ?? FooterPropsDefaults.addressFontSize;

  // Copyright
  const showCopyright = props?.showCopyright ?? FooterPropsDefaults.showCopyright;
  const copyrightText = props?.copyrightText ?? FooterPropsDefaults.copyrightText;
  const copyrightColor = props?.copyrightColor ?? FooterPropsDefaults.copyrightColor;
  const copyrightFontSize = props?.copyrightFontSize ?? FooterPropsDefaults.copyrightFontSize;

  // Footer Links
  const showFooterLinks = props?.showFooterLinks ?? FooterPropsDefaults.showFooterLinks;
  const footerLinks = props?.footerLinks ?? FooterPropsDefaults.footerLinks;
  const footerLinkColor = props?.footerLinkColor ?? FooterPropsDefaults.footerLinkColor;
  const footerLinkFontSize = props?.footerLinkFontSize ?? FooterPropsDefaults.footerLinkFontSize;
  const footerLinkGap = props?.footerLinkGap ?? FooterPropsDefaults.footerLinkGap;

  // Social Links
  const showSocialLinks = props?.showSocialLinks ?? FooterPropsDefaults.showSocialLinks;
  const socialLinks = props?.socialLinks ?? FooterPropsDefaults.socialLinks;
  const socialIconSize = props?.socialIconSize ?? FooterPropsDefaults.socialIconSize;
  const socialIconGap = props?.socialIconGap ?? FooterPropsDefaults.socialIconGap;

  // Unsubscribe
  const showUnsubscribe = props?.showUnsubscribe ?? FooterPropsDefaults.showUnsubscribe;
  const unsubscribeText = props?.unsubscribeText ?? FooterPropsDefaults.unsubscribeText;
  const unsubscribeUrl = props?.unsubscribeUrl ?? FooterPropsDefaults.unsubscribeUrl;
  const unsubscribeColor = props?.unsubscribeColor ?? FooterPropsDefaults.unsubscribeColor;
  const unsubscribeFontSize = props?.unsubscribeFontSize ?? FooterPropsDefaults.unsubscribeFontSize;

  // Contact Info
  const showContactInfo = props?.showContactInfo ?? FooterPropsDefaults.showContactInfo;
  const email = props?.email ?? FooterPropsDefaults.email;
  const phone = props?.phone ?? FooterPropsDefaults.phone;
  const contactColor = props?.contactColor ?? FooterPropsDefaults.contactColor;
  const contactFontSize = props?.contactFontSize ?? FooterPropsDefaults.contactFontSize;

  // Divider
  const showDivider = props?.showDivider ?? FooterPropsDefaults.showDivider;
  const dividerColor = props?.dividerColor ?? FooterPropsDefaults.dividerColor;
  const dividerHeight = props?.dividerHeight ?? FooterPropsDefaults.dividerHeight;

  // Layout
  const alignment = props?.alignment ?? FooterPropsDefaults.alignment;
  const contentGap = props?.contentGap ?? FooterPropsDefaults.contentGap;

  const getFlexAlignment = () => {
    if (alignment === 'left') return 'flex-start';
    if (alignment === 'right') return 'flex-end';
    return 'center';
  };

  const containerStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? '#F5F5F5',
    padding: getPadding(style) ?? '32px 24px',
  };

  const dividerStyle: CSSProperties = {
    width: '100%',
    height: dividerHeight,
    backgroundColor: dividerColor,
    marginBottom: contentGap,
    border: 'none',
  };

  const contentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: getFlexAlignment(),
    gap: contentGap,
    textAlign: alignment as CSSProperties['textAlign'],
  };

  const companyNameStyle: CSSProperties = {
    color: companyNameColor,
    fontSize: companyNameFontSize,
    fontWeight: 'bold',
    margin: 0,
  };

  const addressStyle: CSSProperties = {
    color: addressColor,
    fontSize: addressFontSize,
    margin: 0,
    lineHeight: 1.5,
  };

  const contactStyle: CSSProperties = {
    color: contactColor,
    fontSize: contactFontSize,
    margin: 0,
    lineHeight: 1.6,
  };

  const socialContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: getFlexAlignment(),
    alignItems: 'center',
    gap: socialIconGap,
  };

  const socialIconStyle: CSSProperties = {
    width: socialIconSize,
    height: socialIconSize,
    objectFit: 'contain',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  };

  const footerLinksContainerStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: getFlexAlignment(),
    alignItems: 'center',
    gap: footerLinkGap,
  };

  const footerLinkStyle: CSSProperties = {
    color: footerLinkColor,
    fontSize: footerLinkFontSize,
    textDecoration: 'none',
    transition: 'opacity 0.2s ease',
  };

  const copyrightStyle: CSSProperties = {
    color: copyrightColor,
    fontSize: copyrightFontSize,
    margin: 0,
  };

  const unsubscribeStyle: CSSProperties = {
    color: unsubscribeColor,
    fontSize: unsubscribeFontSize,
    textDecoration: 'underline',
    cursor: 'pointer',
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.stopPropagation();
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  return (
    <div style={containerStyle}>
      {/* Divider */}
      {showDivider && <hr style={dividerStyle} />}

      <div style={contentStyle}>
        {/* Company Name */}
        {showCompanyName && companyName && (
          <h3 style={companyNameStyle}>{companyName}</h3>
        )}

        {/* Address */}
        {showAddress && address && (
          <p style={addressStyle}>{address}</p>
        )}

        {/* Contact Info */}
        {showContactInfo && (email || phone) && (
          <div style={contactStyle}>
            {email && (
              <div>
                <a
                  href={`mailto:${email}`}
                  style={{ color: contactColor, textDecoration: 'none' }}
                >
                  {email}
                </a>
              </div>
            )}
            {phone && (
              <div>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  style={{ color: contactColor, textDecoration: 'none' }}
                >
                  {phone}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Social Links */}
        {showSocialLinks && socialLinks && socialLinks.length > 0 && (
          <div style={socialContainerStyle}>
            {socialLinks.map((link, index) => (
              <a
                key={link?.id || index}
                href={link?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                title={link?.platform || ''}
                onClick={(e) => handleLinkClick(e, link?.url || '')}
                style={{ display: 'inline-block' }}
              >
                <img
                  src={link?.iconUrl || 'https://placehold.co/24x24/CCC/666?text=?'}
                  alt={link?.platform || 'Social'}
                  style={socialIconStyle}
                  onMouseOver={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                  onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
                />
              </a>
            ))}
          </div>
        )}

        {/* Footer Links */}
        {showFooterLinks && footerLinks && footerLinks.length > 0 && (
          <nav style={footerLinksContainerStyle}>
            {footerLinks.map((link, index) => (
              <a
                key={link?.id || index}
                href={link?.url || '#'}
                onClick={(e) => handleLinkClick(e, link?.url || '')}
                style={footerLinkStyle}
                onMouseOver={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                {link?.text || 'Link'}
              </a>
            ))}
          </nav>
        )}

        {/* Copyright */}
        {showCopyright && copyrightText && (
          <p style={copyrightStyle}>{copyrightText}</p>
        )}

        {/* Unsubscribe */}
        {showUnsubscribe && unsubscribeText && (
          <a
            href={unsubscribeUrl || '#'}
            onClick={(e) => handleLinkClick(e, unsubscribeUrl || '')}
            style={unsubscribeStyle}
          >
            {unsubscribeText}
          </a>
        )}
      </div>
    </div>
  );
}
