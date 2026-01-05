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

export const AddressPropsSchema = z.object({
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
      addressLine1: z.string().optional().nullable(),
      addressLine2: z.string().optional().nullable(),
      city: z.string().optional().nullable(),
      state: z.string().optional().nullable(),
      country: z.string().optional().nullable(),
      zipCode: z.string().optional().nullable(),
      textColor: COLOR_SCHEMA,
      showIcon: z.boolean().optional().nullable(),
      layout: z.enum(['inline', 'stacked']).optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type AddressProps = z.infer<typeof AddressPropsSchema>;

export const AddressPropsDefaults = {
  addressLine1: '123 Main Street',
  addressLine2: 'Suite 100',
  city: 'New York',
  state: 'NY',
  country: 'USA',
  zipCode: '10001',
  textColor: '#333333',
  showIcon: true,
  layout: 'stacked',
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

const getPadding = (style: AddressProps['style']) =>
  style?.padding
    ? `${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px`
    : undefined;

// Location pin icon
const LocationIcon = () => <span style={{ marginRight: 8, verticalAlign: 'middle' }}>📍</span>;

export function Address({ style, props }: AddressProps) {
  const addressLine1 = props?.addressLine1 ?? AddressPropsDefaults.addressLine1;
  const addressLine2 = props?.addressLine2 ?? AddressPropsDefaults.addressLine2;
  const city = props?.city ?? AddressPropsDefaults.city;
  const state = props?.state ?? AddressPropsDefaults.state;
  const country = props?.country ?? AddressPropsDefaults.country;
  const zipCode = props?.zipCode ?? AddressPropsDefaults.zipCode;
  const textColor = props?.textColor ?? AddressPropsDefaults.textColor;
  const showIcon = props?.showIcon ?? AddressPropsDefaults.showIcon;
  const layout = props?.layout ?? AddressPropsDefaults.layout;

  const wrapperStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? undefined,
    textAlign: style?.textAlign ?? 'left',
    padding: getPadding(style),
    fontFamily: getFontFamily(style?.fontFamily),
    fontSize: style?.fontSize ?? 14,
    fontWeight: style?.fontWeight ?? 'normal',
    color: textColor ?? undefined,
    lineHeight: 1.6,
  };

  const lineStyle: CSSProperties = {
    display: layout === 'stacked' ? 'block' : 'inline',
    marginRight: layout === 'inline' ? 4 : 0,
  };

  // Build city, state, zip line
  const cityStateZip = [city, state, zipCode].filter(Boolean).join(', ');

  return (
    <div style={wrapperStyle}>
      {showIcon && <LocationIcon />}
      <span style={{ display: layout === 'stacked' ? 'inline-block' : 'inline', verticalAlign: 'top' }}>
        {addressLine1 && <span style={lineStyle}>{addressLine1}</span>}
        {layout === 'inline' && addressLine1 && ', '}
        {addressLine2 && <span style={lineStyle}>{addressLine2}</span>}
        {layout === 'inline' && addressLine2 && ', '}
        {cityStateZip && <span style={lineStyle}>{cityStateZip}</span>}
        {layout === 'inline' && cityStateZip && country && ', '}
        {country && <span style={lineStyle}>{country}</span>}
      </span>
    </div>
  );
}

