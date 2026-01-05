import React, { CSSProperties, useState } from 'react';
import { z } from 'zod';

const COLOR_SCHEMA = z.string().nullable().optional();

const PADDING_SCHEMA = z
  .object({
    top: z.number(),
    bottom: z.number(),
    right: z.number(),
    left: z.number(),
  })
  .optional()
  .nullable();

// Schema definition
export const CouponPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      padding: PADDING_SCHEMA,
    })
    .optional()
    .nullable(),
  props: z
    .object({
      code: z.string().optional().nullable(),
      showCopyButton: z.boolean().optional().nullable(),
      copyButtonText: z.string().optional().nullable(),
      discountType: z.enum(['percentage', 'fixed', 'freeShipping', 'buyOneGetOne', 'custom']).optional().nullable(),
      discountValue: z.number().optional().nullable(),
      discountText: z.string().optional().nullable(),
      currencySymbol: z.string().optional().nullable(),
      minOrderValue: z.number().optional().nullable(),
      maxDiscountValue: z.number().optional().nullable(),
      showMinOrder: z.boolean().optional().nullable(),
      validFrom: z.string().optional().nullable(),
      validUntil: z.string().optional().nullable(),
      showExpiry: z.boolean().optional().nullable(),
      expiryFormat: z.enum(['date', 'countdown', 'daysLeft']).optional().nullable(),
      title: z.string().optional().nullable(),
      subtitle: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      termsAndConditions: z.string().optional().nullable(),
      showTerms: z.boolean().optional().nullable(),
      showBadge: z.boolean().optional().nullable(),
      badgeText: z.string().optional().nullable(),
      badgeColor: z.string().optional().nullable(),
      badgeTextColor: z.string().optional().nullable(),
      showIcon: z.boolean().optional().nullable(),
      icon: z.string().optional().nullable(),
      showButton: z.boolean().optional().nullable(),
      buttonText: z.string().optional().nullable(),
      buttonUrl: z.string().optional().nullable(),
      buttonColor: z.string().optional().nullable(),
      buttonTextColor: z.string().optional().nullable(),
      buttonBorderRadius: z.number().optional().nullable(),
      layout: z.enum(['horizontal', 'vertical', 'ticket']).optional().nullable(),
      alignment: z.enum(['left', 'center', 'right']).optional().nullable(),
      backgroundColor: z.string().optional().nullable(),
      backgroundGradient: z.string().optional().nullable(),
      useGradient: z.boolean().optional().nullable(),
      borderStyle: z.enum(['solid', 'dashed', 'dotted', 'double', 'none']).optional().nullable(),
      borderWidth: z.number().optional().nullable(),
      borderColor: z.string().optional().nullable(),
      borderRadius: z.number().optional().nullable(),
      padding: z.number().optional().nullable(),
      shadow: z.boolean().optional().nullable(),
      codeBackgroundColor: z.string().optional().nullable(),
      codeBorderStyle: z.enum(['solid', 'dashed', 'dotted', 'double', 'none']).optional().nullable(),
      codeBorderColor: z.string().optional().nullable(),
      codeTextColor: z.string().optional().nullable(),
      codeFontSize: z.number().optional().nullable(),
      titleColor: z.string().optional().nullable(),
      titleFontSize: z.number().optional().nullable(),
      subtitleColor: z.string().optional().nullable(),
      descriptionColor: z.string().optional().nullable(),
      showScissors: z.boolean().optional().nullable(),
      showDashedLine: z.boolean().optional().nullable(),
      applicableText: z.string().optional().nullable(),
      showApplicable: z.boolean().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type CouponProps = z.infer<typeof CouponPropsSchema>;

export const CouponPropsDefaults = {
  code: 'SAVE20',
  showCopyButton: true,
  copyButtonText: 'Copy',
  discountType: 'percentage',
  discountValue: 20,
  discountText: '',
  currencySymbol: '$',
  minOrderValue: 0,
  maxDiscountValue: 0,
  showMinOrder: false,
  validFrom: '',
  validUntil: '',
  showExpiry: true,
  expiryFormat: 'date',
  title: 'Special Offer!',
  subtitle: 'Limited Time Only',
  description: 'Use this code at checkout to get your discount',
  termsAndConditions: '*Terms and conditions apply.',
  showTerms: true,
  showBadge: true,
  badgeText: 'LIMITED',
  badgeColor: '#FF4444',
  badgeTextColor: '#FFFFFF',
  showIcon: true,
  icon: '🎟️',
  showButton: true,
  buttonText: 'Shop Now',
  buttonUrl: '#',
  buttonColor: '#4CAF50',
  buttonTextColor: '#FFFFFF',
  buttonBorderRadius: 4,
  layout: 'vertical',
  alignment: 'center',
  backgroundColor: '#FFFFFF',
  backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  useGradient: false,
  borderStyle: 'dashed',
  borderWidth: 2,
  borderColor: '#E0E0E0',
  borderRadius: 12,
  padding: 24,
  shadow: true,
  codeBackgroundColor: '#F5F5F5',
  codeBorderStyle: 'dashed',
  codeBorderColor: '#333333',
  codeTextColor: '#333333',
  codeFontSize: 24,
  titleColor: '#333333',
  titleFontSize: 24,
  subtitleColor: '#666666',
  descriptionColor: '#666666',
  showScissors: true,
  showDashedLine: true,
  applicableText: 'Valid on all products',
  showApplicable: true,
};

export type CouponComponentProps = {
  style?: CSSProperties;
  props?: z.infer<typeof CouponPropsSchema>['props'];
};

export function Coupon({ style, props }: CouponComponentProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = props?.code ?? CouponPropsDefaults.code;
    if (code) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const p = {
    code: props?.code ?? CouponPropsDefaults.code,
    showCopyButton: props?.showCopyButton ?? CouponPropsDefaults.showCopyButton,
    copyButtonText: props?.copyButtonText ?? CouponPropsDefaults.copyButtonText,
    discountType: props?.discountType ?? CouponPropsDefaults.discountType,
    discountValue: props?.discountValue ?? CouponPropsDefaults.discountValue,
    discountText: props?.discountText ?? CouponPropsDefaults.discountText,
    currencySymbol: props?.currencySymbol ?? CouponPropsDefaults.currencySymbol,
    minOrderValue: props?.minOrderValue ?? CouponPropsDefaults.minOrderValue,
    maxDiscountValue: props?.maxDiscountValue ?? CouponPropsDefaults.maxDiscountValue,
    showMinOrder: props?.showMinOrder ?? CouponPropsDefaults.showMinOrder,
    validFrom: props?.validFrom ?? CouponPropsDefaults.validFrom,
    validUntil: props?.validUntil ?? CouponPropsDefaults.validUntil,
    showExpiry: props?.showExpiry ?? CouponPropsDefaults.showExpiry,
    expiryFormat: props?.expiryFormat ?? CouponPropsDefaults.expiryFormat,
    title: props?.title ?? CouponPropsDefaults.title,
    subtitle: props?.subtitle ?? CouponPropsDefaults.subtitle,
    description: props?.description ?? CouponPropsDefaults.description,
    termsAndConditions: props?.termsAndConditions ?? CouponPropsDefaults.termsAndConditions,
    showTerms: props?.showTerms ?? CouponPropsDefaults.showTerms,
    showBadge: props?.showBadge ?? CouponPropsDefaults.showBadge,
    badgeText: props?.badgeText ?? CouponPropsDefaults.badgeText,
    badgeColor: props?.badgeColor ?? CouponPropsDefaults.badgeColor,
    badgeTextColor: props?.badgeTextColor ?? CouponPropsDefaults.badgeTextColor,
    showIcon: props?.showIcon ?? CouponPropsDefaults.showIcon,
    icon: props?.icon ?? CouponPropsDefaults.icon,
    showButton: props?.showButton ?? CouponPropsDefaults.showButton,
    buttonText: props?.buttonText ?? CouponPropsDefaults.buttonText,
    buttonUrl: props?.buttonUrl ?? CouponPropsDefaults.buttonUrl,
    buttonColor: props?.buttonColor ?? CouponPropsDefaults.buttonColor,
    buttonTextColor: props?.buttonTextColor ?? CouponPropsDefaults.buttonTextColor,
    buttonBorderRadius: props?.buttonBorderRadius ?? CouponPropsDefaults.buttonBorderRadius,
    layout: props?.layout ?? CouponPropsDefaults.layout,
    alignment: props?.alignment ?? CouponPropsDefaults.alignment,
    backgroundColor: props?.backgroundColor ?? CouponPropsDefaults.backgroundColor,
    backgroundGradient: props?.backgroundGradient ?? CouponPropsDefaults.backgroundGradient,
    useGradient: props?.useGradient ?? CouponPropsDefaults.useGradient,
    borderStyle: props?.borderStyle ?? CouponPropsDefaults.borderStyle,
    borderWidth: props?.borderWidth ?? CouponPropsDefaults.borderWidth,
    borderColor: props?.borderColor ?? CouponPropsDefaults.borderColor,
    borderRadius: props?.borderRadius ?? CouponPropsDefaults.borderRadius,
    padding: props?.padding ?? CouponPropsDefaults.padding,
    shadow: props?.shadow ?? CouponPropsDefaults.shadow,
    codeBackgroundColor: props?.codeBackgroundColor ?? CouponPropsDefaults.codeBackgroundColor,
    codeBorderStyle: props?.codeBorderStyle ?? CouponPropsDefaults.codeBorderStyle,
    codeBorderColor: props?.codeBorderColor ?? CouponPropsDefaults.codeBorderColor,
    codeTextColor: props?.codeTextColor ?? CouponPropsDefaults.codeTextColor,
    codeFontSize: props?.codeFontSize ?? CouponPropsDefaults.codeFontSize,
    titleColor: props?.titleColor ?? CouponPropsDefaults.titleColor,
    titleFontSize: props?.titleFontSize ?? CouponPropsDefaults.titleFontSize,
    subtitleColor: props?.subtitleColor ?? CouponPropsDefaults.subtitleColor,
    descriptionColor: props?.descriptionColor ?? CouponPropsDefaults.descriptionColor,
    showScissors: props?.showScissors ?? CouponPropsDefaults.showScissors,
    showDashedLine: props?.showDashedLine ?? CouponPropsDefaults.showDashedLine,
    applicableText: props?.applicableText ?? CouponPropsDefaults.applicableText,
    showApplicable: props?.showApplicable ?? CouponPropsDefaults.showApplicable,
  };

  const containerStyle: CSSProperties = {
    ...style,
    background: p.useGradient ? p.backgroundGradient : p.backgroundColor,
    borderStyle: p.borderStyle || 'dashed',
    borderWidth: `${p.borderWidth}px`,
    borderColor: p.borderColor,
    borderRadius: `${p.borderRadius}px`,
    padding: `${p.padding}px`,
    boxShadow: p.shadow ? '0 4px 15px rgba(0,0,0,0.1)' : 'none',
    position: 'relative',
    overflow: 'hidden',
    textAlign: p.alignment as CSSProperties['textAlign'],
    fontFamily: 'Arial, sans-serif',
  };

  const badgeStyle: CSSProperties = {
    position: 'absolute',
    top: '12px',
    right: p.layout === 'ticket' ? '90px' : '12px',
    backgroundColor: p.badgeColor || '#FF4444',
    color: p.badgeTextColor || '#FFFFFF',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  };

  const codeBoxStyle: CSSProperties = {
    display: 'inline-block',
    backgroundColor: p.codeBackgroundColor,
    border: `2px ${p.codeBorderStyle} ${p.codeBorderColor}`,
    borderRadius: '8px',
    padding: '12px 24px',
    margin: '16px 0',
  };

  const codeTextStyle: CSSProperties = {
    color: p.codeTextColor,
    fontSize: `${p.codeFontSize}px`,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: '3px',
  };

  const buttonStyle: CSSProperties = {
    display: 'inline-block',
    backgroundColor: p.buttonColor,
    color: p.buttonTextColor,
    padding: '12px 32px',
    borderRadius: `${p.buttonBorderRadius}px`,
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    marginTop: '16px',
    textTransform: 'uppercase',
  };

  const ticketEdgeStyle: CSSProperties = {
    position: 'absolute',
    right: '80px',
    top: 0,
    bottom: 0,
    width: '2px',
    backgroundImage: `repeating-linear-gradient(to bottom, ${p.borderColor} 0, ${p.borderColor} 8px, transparent 8px, transparent 16px)`,
  };

  return (
    <div style={containerStyle}>
      {p.showBadge && p.badgeText && <div style={badgeStyle}>{p.badgeText}</div>}
      
      {p.showScissors && (
        <div style={{ position: 'absolute', left: '-2px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px', color: p.borderColor }}>✂️</div>
      )}
      
      {p.showDashedLine && (
        <div style={{ position: 'absolute', left: '20px', top: '50%', width: '20px', borderTop: `2px dashed ${p.borderColor}` }}></div>
      )}
      
      {p.layout === 'ticket' && (
        <>
          <div style={ticketEdgeStyle}></div>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '10px', color: '#999', textTransform: 'uppercase' }}>Code</span>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: p.codeTextColor, marginTop: '4px', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>{p.code}</span>
          </div>
        </>
      )}

      <div style={{ paddingRight: p.layout === 'ticket' ? '90px' : '0' }}>
        {p.showIcon && p.icon && <span style={{ fontSize: '48px', marginBottom: '12px', display: 'block' }}>{p.icon}</span>}
        
        {p.title && <h2 style={{ color: p.titleColor, fontSize: `${p.titleFontSize}px`, fontWeight: 'bold', margin: '0 0 8px 0' }}>{p.title}</h2>}
        
        {p.subtitle && <p style={{ color: p.subtitleColor, fontSize: '14px', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.subtitle}</p>}
        
        <div style={{ fontSize: '36px', fontWeight: 'bold', color: p.useGradient ? '#FFFFFF' : p.titleColor, margin: '16px 0' }}>
          {p.discountType === 'percentage' ? `${p.discountValue}% OFF` :
           p.discountType === 'fixed' ? `${p.currencySymbol}${p.discountValue} OFF` :
           p.discountType === 'freeShipping' ? 'FREE SHIPPING' :
           p.discountType === 'buyOneGetOne' ? 'BUY 1 GET 1 FREE' :
           p.discountType === 'custom' ? (p.discountText || 'SPECIAL OFFER') :
           `${p.discountValue}% OFF`}
        </div>
        
        {p.code && p.layout !== 'ticket' && (
          <div style={codeBoxStyle}>
            <span style={codeTextStyle}>{p.code}</span>
            {p.showCopyButton && (
              <button 
                onClick={handleCopy}
                style={{ 
                  backgroundColor: copied ? '#4CAF50' : 'transparent', 
                  border: `1px solid ${copied ? '#4CAF50' : p.codeBorderColor}`, 
                  color: copied ? '#FFFFFF' : p.codeTextColor, 
                  padding: '4px 12px', 
                  marginLeft: '12px', 
                  borderRadius: '4px', 
                  fontSize: '12px', 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minWidth: '60px',
                }}
              >
                {copied ? '✓ Copied!' : p.copyButtonText}
              </button>
            )}
          </div>
        )}
        
        {p.description && <p style={{ color: p.descriptionColor, fontSize: '14px', margin: '12px 0', lineHeight: 1.5 }}>{p.description}</p>}
        
        {p.showMinOrder && p.minOrderValue && p.minOrderValue > 0 && (
          <p style={{ color: p.descriptionColor, fontSize: '13px', margin: '8px 0', fontStyle: 'italic' }}>
            Min. order: {p.currencySymbol}{p.minOrderValue}
          </p>
        )}
        
        {p.showApplicable && p.applicableText && (
          <span style={{ color: p.descriptionColor, fontSize: '12px', margin: '8px 0', padding: '6px 12px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '4px', display: 'inline-block' }}>
            ✓ {p.applicableText}
          </span>
        )}
        
        {p.showExpiry && p.validUntil && (
          <div style={{ color: '#FF6B6B', fontSize: '13px', fontWeight: '600', margin: '12px 0', display: 'flex', alignItems: 'center', justifyContent: p.alignment, gap: '6px' }}>
            <span>⏰</span>
            <span>{(() => {
              const expiryDate = new Date(p.validUntil || '');
              const now = new Date();
              const diffDays = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              if (p.expiryFormat === 'countdown') {
                if (diffDays <= 0) return 'Expired';
                if (diffDays === 1) return 'Expires in 1 day';
                return `Expires in ${diffDays} days`;
              } else if (p.expiryFormat === 'daysLeft') {
                if (diffDays <= 0) return 'Expired';
                return `${diffDays} days left`;
              }
              return `Valid until ${expiryDate.toLocaleDateString()}`;
            })()}</span>
          </div>
        )}
        
        {p.showButton && p.buttonText && (
          <a href={p.buttonUrl || '#'} style={buttonStyle} target="_blank" rel="noopener noreferrer">
            {p.buttonText}
          </a>
        )}
        
        {p.showTerms && p.termsAndConditions && (
          <p style={{ color: '#999999', fontSize: '11px', marginTop: '16px', lineHeight: 1.4 }}>{p.termsAndConditions}</p>
        )}
      </div>
    </div>
  );
}

export default Coupon;

