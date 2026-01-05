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

// Social Link Item Schema
const SOCIAL_LINK_SCHEMA = z.object({
  id: z.string().optional().nullable(),
  platform: z.string().optional().nullable(),
  iconUrl: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
});

export const SocialLinksPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      // Social Links Array
      links: z.array(SOCIAL_LINK_SCHEMA).optional().nullable(),

      // Contact Info (optional)
      showContactInfo: z.boolean().optional().nullable(),
      contactText: z.string().optional().nullable(),
      contactTextColor: COLOR_SCHEMA,

      // Footer Text (optional)
      showFooterText: z.boolean().optional().nullable(),
      footerText: z.string().optional().nullable(),
      footerTextColor: COLOR_SCHEMA,

      // Styling
      iconSize: z.number().optional().nullable(),
      iconGap: z.number().optional().nullable(),
      iconBorderRadius: z.number().optional().nullable(),
      alignment: z.enum(['left', 'center', 'right']).optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type SocialLinksProps = z.infer<typeof SocialLinksPropsSchema>;
export type SocialLink = z.infer<typeof SOCIAL_LINK_SCHEMA>;

// Default social icons (using placeholder URLs - can be replaced with actual icons)
export const SocialLinksPropsDefaults = {
  links: [
    {
      id: '1',
      platform: 'Instagram',
      iconUrl: 'https://cdn-icons-png.flaticon.com/32/2111/2111463.png',
      url: 'https://instagram.com',
    },
    {
      id: '2',
      platform: 'Pinterest',
      iconUrl: 'https://cdn-icons-png.flaticon.com/32/145/145808.png',
      url: 'https://pinterest.com',
    },
    {
      id: '3',
      platform: 'Twitter',
      iconUrl: 'https://cdn-icons-png.flaticon.com/32/733/733579.png',
      url: 'https://twitter.com',
    },
    {
      id: '4',
      platform: 'Facebook',
      iconUrl: 'https://cdn-icons-png.flaticon.com/32/733/733547.png',
      url: 'https://facebook.com',
    },
  ] as SocialLink[],

  // Contact Info
  showContactInfo: true,
  contactText: 'support@example.com | +1 888-995-2507',
  contactTextColor: '#666666',

  // Footer Text
  showFooterText: true,
  footerText: '45 Bond Street New York, NY, 10012 | © 2024 Company Inc.',
  footerTextColor: '#999999',

  // Styling
  iconSize: 32,
  iconGap: 16,
  iconBorderRadius: 0,
  alignment: 'center',
} as const;

const getPadding = (style: SocialLinksProps['style']) =>
  style?.padding
    ? `${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px`
    : undefined;

export function SocialLinks({ style, props }: SocialLinksProps) {
  // Links
  const links = props?.links ?? SocialLinksPropsDefaults.links;

  // Contact Info
  const showContactInfo = props?.showContactInfo ?? SocialLinksPropsDefaults.showContactInfo;
  const contactText = props?.contactText ?? SocialLinksPropsDefaults.contactText;
  const contactTextColor = props?.contactTextColor ?? SocialLinksPropsDefaults.contactTextColor;

  // Footer Text
  const showFooterText = props?.showFooterText ?? SocialLinksPropsDefaults.showFooterText;
  const footerText = props?.footerText ?? SocialLinksPropsDefaults.footerText;
  const footerTextColor = props?.footerTextColor ?? SocialLinksPropsDefaults.footerTextColor;

  // Styling
  const iconSize = props?.iconSize ?? SocialLinksPropsDefaults.iconSize;
  const iconGap = props?.iconGap ?? SocialLinksPropsDefaults.iconGap;
  const iconBorderRadius = props?.iconBorderRadius ?? SocialLinksPropsDefaults.iconBorderRadius;
  const alignment = props?.alignment ?? SocialLinksPropsDefaults.alignment;

  const containerStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? '#FFFFFF',
    padding: getPadding(style) ?? '32px 24px',
    textAlign: alignment as CSSProperties['textAlign'],
  };

  const contactStyle: CSSProperties = {
    color: contactTextColor,
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 1.5,
  };

  const iconsContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
    alignItems: 'center',
    gap: iconGap,
    marginBottom: showFooterText ? 24 : 0,
  };

  const iconStyle: CSSProperties = {
    width: iconSize,
    height: iconSize,
    borderRadius: iconBorderRadius,
    objectFit: 'contain',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  };

  const footerStyle: CSSProperties = {
    color: footerTextColor,
    fontSize: 12,
    lineHeight: 1.5,
    borderTop: '1px solid #E0E0E0',
    paddingTop: 16,
    marginTop: 8,
  };

  const handleIconClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div style={containerStyle}>
      {/* Contact Info */}
      {showContactInfo && contactText && (
        <div style={contactStyle}>{contactText}</div>
      )}

      {/* Social Icons */}
      {links && links.length > 0 && (
        <div style={iconsContainerStyle}>
          {links.map((link, index) => (
            <a
              key={link?.id || index}
              href={link?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              title={link?.platform || ''}
              onClick={(e) => handleIconClick(e, link?.url || '')}
              style={{ display: 'inline-block' }}
            >
              <img
                src={link?.iconUrl || 'https://placehold.co/32x32/CCC/666?text=?'}
                alt={link?.platform || 'Social'}
                style={iconStyle}
                onMouseOver={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; }}
              />
            </a>
          ))}
        </div>
      )}

      {/* Footer Text */}
      {showFooterText && footerText && (
        <div style={footerStyle}>{footerText}</div>
      )}
    </div>
  );
}

