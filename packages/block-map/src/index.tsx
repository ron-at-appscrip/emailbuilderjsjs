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

export const MapPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      textAlign: z.enum(['left', 'center', 'right']).optional().nullable(),
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      address: z.string().optional().nullable(),
      latitude: z.string().optional().nullable(),
      longitude: z.string().optional().nullable(),
      zoom: z.number().min(1).max(20).optional().nullable(),
      width: z.number().optional().nullable(),
      height: z.number().optional().nullable(),
      mapType: z.enum(['roadmap', 'satellite', 'terrain', 'hybrid']).optional().nullable(),
      showLink: z.boolean().optional().nullable(),
      linkText: z.string().optional().nullable(),
      buttonColor: COLOR_SCHEMA,
      buttonTextColor: COLOR_SCHEMA,
    })
    .optional()
    .nullable(),
});

export type MapProps = z.infer<typeof MapPropsSchema>;

export const MapPropsDefaults = {
  address: 'New York, NY, USA',
  latitude: '40.7128',
  longitude: '-74.0060',
  zoom: 14,
  width: 600,
  height: 300,
  mapType: 'roadmap',
  showLink: true,
  linkText: 'Get Directions',
  buttonColor: '#4285F4',
  buttonTextColor: '#FFFFFF',
} as const;

const getPadding = (style: MapProps['style']) =>
  style?.padding
    ? `${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px`
    : undefined;

export function Map({ style, props }: MapProps) {
  const address = props?.address ?? MapPropsDefaults.address;
  const latitude = props?.latitude ?? MapPropsDefaults.latitude;
  const longitude = props?.longitude ?? MapPropsDefaults.longitude;
  const width = props?.width ?? MapPropsDefaults.width;
  const height = props?.height ?? MapPropsDefaults.height;
  const showLink = props?.showLink ?? MapPropsDefaults.showLink;
  const linkText = props?.linkText ?? MapPropsDefaults.linkText;
  const buttonColor = props?.buttonColor ?? MapPropsDefaults.buttonColor;
  const buttonTextColor = props?.buttonTextColor ?? MapPropsDefaults.buttonTextColor;

  const wrapperStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? undefined,
    textAlign: style?.textAlign ?? 'center',
    padding: getPadding(style),
  };

  // OpenStreetMap embed URL (works locally in browser)
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(longitude) - 0.01},${parseFloat(latitude) - 0.01},${parseFloat(longitude) + 0.01},${parseFloat(latitude) + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;

  // Google Maps directions URL
  const googleMapsUrl = address
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
    : `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  const iframeStyle: CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: 8,
    maxWidth: '100%',
  };

  const buttonStyle: CSSProperties = {
    display: 'inline-block',
    marginTop: 12,
    padding: '10px 24px',
    backgroundColor: buttonColor ?? '#4285F4',
    color: buttonTextColor ?? '#ffffff',
    textDecoration: 'none',
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 'bold',
  };

  return (
    <div style={wrapperStyle}>
      <iframe
        src={osmEmbedUrl}
        width={width}
        height={height}
        style={iframeStyle}
        title={`Map of ${address}`}
      />
      {showLink && (
        <div>
          <a 
            href={googleMapsUrl} 
            style={buttonStyle} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              window.open(googleMapsUrl, '_blank');
            }}
          >
            📍 {linkText}
          </a>
        </div>
      )}
    </div>
  );
}

