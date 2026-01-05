import React, { CSSProperties } from 'react';
import { z } from 'zod';

const FONT_FAMILY_SCHEMA = z
  .enum([
    'MODERN_SANS',
    'BOOK_SANS',
    'ORGANIC_SANS',
    'GEOMETRIC_SANS',
    'HEAVY_SANS',
    'ROUNDED_SANS',
    'MODERN_SERIF',
    'BOOK_SERIF',
    'MONOSPACE',
  ])
  .nullable()
  .optional();

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

export const ContactPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      fontSize: z.number().min(0).optional().nullable(),
      fontFamily: FONT_FAMILY_SCHEMA,
      fontWeight: z.enum(['bold', 'normal']).optional().nullable(),
      textAlign: z.enum(['left', 'center', 'right']).optional().nullable(),
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      type: z.enum(['email', 'phone', 'both']).optional().nullable(),
      email: z.string().optional().nullable(),
      phone: z.string().optional().nullable(),
      emailLabel: z.string().optional().nullable(),
      phoneLabel: z.string().optional().nullable(),
      linkColor: COLOR_SCHEMA,
      showIcon: z.boolean().optional().nullable(),
      layout: z.enum(['horizontal', 'vertical']).optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type ContactProps = z.infer<typeof ContactPropsSchema>;

export const ContactPropsDefaults = {
  type: 'both',
  email: 'contact@example.com',
  phone: '+1 234 567 8900',
  emailLabel: '',
  phoneLabel: '',
  linkColor: '#0066cc',
  showIcon: true,
  layout: 'vertical',
} as const;

function getFontFamily(fontFamily: z.infer<typeof FONT_FAMILY_SCHEMA>) {
  switch (fontFamily) {
    case 'MODERN_SANS':
      return '"Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif';
    case 'BOOK_SANS':
      return 'Optima, Candara, "Noto Sans", source-sans-pro, sans-serif';
    case 'ORGANIC_SANS':
      return 'Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif';
    case 'GEOMETRIC_SANS':
      return 'Avenir, "Avenir Next LT Pro", Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif';
    case 'HEAVY_SANS':
      return 'Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif';
    case 'ROUNDED_SANS':
      return 'ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif';
    case 'MODERN_SERIF':
      return 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif';
    case 'BOOK_SERIF':
      return '"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, serif';
    case 'MONOSPACE':
      return '"Nimbus Mono PS", "Courier New", "Cutive Mono", monospace';
  }
  return undefined;
}

const getPadding = (padding: ContactProps['style']) =>
  padding?.padding
    ? `${padding.padding.top}px ${padding.padding.right}px ${padding.padding.bottom}px ${padding.padding.left}px`
    : undefined;

// Simple inline text icons for email compatibility
const EmailIcon = () => <span style={{ marginRight: 8, verticalAlign: 'middle' }}>✉</span>;
const PhoneIcon = () => <span style={{ marginRight: 8, verticalAlign: 'middle' }}>📞</span>;

export function Contact({ style, props }: ContactProps) {
  const type = props?.type ?? ContactPropsDefaults.type;
  const email = props?.email ?? ContactPropsDefaults.email;
  const phone = props?.phone ?? ContactPropsDefaults.phone;
  const emailLabel = props?.emailLabel || email;
  const phoneLabel = props?.phoneLabel || phone;
  const linkColor = props?.linkColor ?? ContactPropsDefaults.linkColor;
  const showIcon = props?.showIcon ?? ContactPropsDefaults.showIcon;
  const layout = props?.layout ?? ContactPropsDefaults.layout;

  const wrapperStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? undefined,
    textAlign: style?.textAlign ?? 'left',
    padding: getPadding(style),
    fontFamily: getFontFamily(style?.fontFamily),
    fontSize: style?.fontSize ?? 16,
    fontWeight: style?.fontWeight ?? 'normal',
  };

  const linkStyle: CSSProperties = {
    color: linkColor ?? undefined,
    textDecoration: 'none',
    display: layout === 'vertical' ? 'block' : 'inline-block',
    marginRight: layout === 'horizontal' ? 16 : 0,
    marginBottom: layout === 'vertical' ? 8 : 0,
  };

  const showEmail = type === 'email' || type === 'both';
  const showPhone = type === 'phone' || type === 'both';

  return (
    <div style={wrapperStyle}>
      {showEmail && (
        <a href={`mailto:${email}`} style={linkStyle}>
          {showIcon && <EmailIcon />}
          <span>{emailLabel}</span>
        </a>
      )}
      {showPhone && (
        <a href={`tel:${phone?.replace(/\s/g, '')}`} style={linkStyle}>
          {showIcon && <PhoneIcon />}
          <span>{phoneLabel}</span>
        </a>
      )}
    </div>
  );
}

