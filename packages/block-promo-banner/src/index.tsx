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

export const PromoBannerPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      // Icon/Image
      showIcon: z.boolean().optional().nullable(),
      iconUrl: z.string().optional().nullable(),
      iconAlt: z.string().optional().nullable(),
      iconWidth: z.number().optional().nullable(),
      iconHeight: z.number().optional().nullable(),

      // Headline
      headline: z.string().optional().nullable(),
      headlineColor: COLOR_SCHEMA,
      headlineFontSize: z.number().optional().nullable(),

      // Description
      description: z.string().optional().nullable(),
      descriptionColor: COLOR_SCHEMA,
      descriptionFontSize: z.number().optional().nullable(),

      // Button
      showButton: z.boolean().optional().nullable(),
      buttonText: z.string().optional().nullable(),
      buttonUrl: z.string().optional().nullable(),
      buttonStyle: z.enum(['link', 'solid', 'outline']).optional().nullable(),
      buttonColor: COLOR_SCHEMA,
      buttonTextColor: COLOR_SCHEMA,

      // Layout
      alignment: z.enum(['left', 'center', 'right']).optional().nullable(),
      contentGap: z.number().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type PromoBannerProps = z.infer<typeof PromoBannerPropsSchema>;

export const PromoBannerPropsDefaults = {
  // Icon/Image
  showIcon: true,
  iconUrl: 'https://placehold.co/48x48/FFFFFF/FFFFFF?text=👥',
  iconAlt: 'Promo icon',
  iconWidth: 48,
  iconHeight: 48,

  // Headline
  headline: 'GIVE $50, GET $50',
  headlineColor: '#FFFFFF',
  headlineFontSize: 20,

  // Description
  description: 'Refer friends and earn rewards.',
  descriptionColor: '#FFFFFF',
  descriptionFontSize: 14,

  // Button
  showButton: true,
  buttonText: 'Learn More',
  buttonUrl: '#',
  buttonStyle: 'link',
  buttonColor: '#FFFFFF',
  buttonTextColor: '#FFFFFF',

  // Layout
  alignment: 'center',
  contentGap: 12,
} as const;

const getPadding = (style: PromoBannerProps['style']) =>
  style?.padding
    ? `${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px`
    : undefined;

export function PromoBanner({ style, props }: PromoBannerProps) {
  // Icon
  const showIcon = props?.showIcon ?? PromoBannerPropsDefaults.showIcon;
  const iconUrl = props?.iconUrl ?? PromoBannerPropsDefaults.iconUrl;
  const iconAlt = props?.iconAlt ?? PromoBannerPropsDefaults.iconAlt;
  const iconWidth = props?.iconWidth ?? PromoBannerPropsDefaults.iconWidth;
  const iconHeight = props?.iconHeight ?? PromoBannerPropsDefaults.iconHeight;

  // Headline
  const headline = props?.headline ?? PromoBannerPropsDefaults.headline;
  const headlineColor = props?.headlineColor ?? PromoBannerPropsDefaults.headlineColor;
  const headlineFontSize = props?.headlineFontSize ?? PromoBannerPropsDefaults.headlineFontSize;

  // Description
  const description = props?.description ?? PromoBannerPropsDefaults.description;
  const descriptionColor = props?.descriptionColor ?? PromoBannerPropsDefaults.descriptionColor;
  const descriptionFontSize = props?.descriptionFontSize ?? PromoBannerPropsDefaults.descriptionFontSize;

  // Button
  const showButton = props?.showButton ?? PromoBannerPropsDefaults.showButton;
  const buttonText = props?.buttonText ?? PromoBannerPropsDefaults.buttonText;
  const buttonUrl = props?.buttonUrl ?? PromoBannerPropsDefaults.buttonUrl;
  const buttonStyle = props?.buttonStyle ?? PromoBannerPropsDefaults.buttonStyle;
  const buttonColor = props?.buttonColor ?? PromoBannerPropsDefaults.buttonColor;
  const buttonTextColor = props?.buttonTextColor ?? PromoBannerPropsDefaults.buttonTextColor;

  // Layout
  const alignment = props?.alignment ?? PromoBannerPropsDefaults.alignment;
  const contentGap = props?.contentGap ?? PromoBannerPropsDefaults.contentGap;

  const containerStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? '#1a2b4a',
    padding: getPadding(style) ?? '40px 24px',
    textAlign: alignment as CSSProperties['textAlign'],
    display: 'flex',
    flexDirection: 'column',
    alignItems: alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
    gap: contentGap,
  };

  const iconStyle: CSSProperties = {
    width: iconWidth,
    height: iconHeight,
    objectFit: 'contain',
  };

  const headlineStyle: CSSProperties = {
    color: headlineColor,
    fontSize: headlineFontSize,
    fontWeight: 'bold',
    margin: 0,
    letterSpacing: 0.5,
  };

  const descriptionStyle: CSSProperties = {
    color: descriptionColor,
    fontSize: descriptionFontSize,
    margin: 0,
    opacity: 0.9,
  };

  const getButtonStyle = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      display: 'inline-block',
      textDecoration: buttonStyle === 'link' ? 'underline' : 'none',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 500,
    };

    if (buttonStyle === 'solid') {
      return {
        ...baseStyle,
        backgroundColor: buttonColor,
        color: buttonTextColor,
        padding: '12px 24px',
        borderRadius: 4,
        border: 'none',
      };
    } else if (buttonStyle === 'outline') {
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        color: buttonColor,
        padding: '12px 24px',
        borderRadius: 4,
        border: `2px solid ${buttonColor}`,
      };
    } else {
      // link style
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        color: buttonTextColor,
        padding: 0,
        border: 'none',
      };
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (buttonUrl) {
      window.open(buttonUrl, '_blank');
    }
  };

  return (
    <div style={containerStyle}>
      {/* Icon/Image */}
      {showIcon && iconUrl && (
        <img src={iconUrl} alt={iconAlt ?? ''} style={iconStyle} />
      )}

      {/* Headline */}
      {headline && <h2 style={headlineStyle}>{headline}</h2>}

      {/* Description */}
      {description && <p style={descriptionStyle}>{description}</p>}

      {/* Button */}
      {showButton && buttonText && (
        <a
          href={buttonUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={getButtonStyle()}
          onClick={handleButtonClick}
        >
          {buttonText}
        </a>
      )}
    </div>
  );
}

