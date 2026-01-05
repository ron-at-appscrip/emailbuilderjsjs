import React from 'react';

import {
  AccountCircleOutlined,
  CallToActionOutlined,
  CampaignOutlined,
  ConfirmationNumberOutlined,
  ContactMailOutlined,
  Crop32Outlined,
  HMobiledataOutlined,
  HorizontalRuleOutlined,
  HtmlOutlined,
  ImageOutlined,
  LibraryAddOutlined,
  LocationOnOutlined,
  MapOutlined,
  NotesOutlined,
  ReceiptLongOutlined,
  ShareOutlined,
  ShoppingCartOutlined,
  SmartButtonOutlined,
  ViewColumnOutlined,
  WebAssetOutlined,
} from '@mui/icons-material';

import { TEditorBlock } from '../../../../editor/core';

type TButtonProps = {
  label: string;
  icon: JSX.Element;
  block: () => TEditorBlock;
};
export const BUTTONS: TButtonProps[] = [
  {
    label: 'Header',
    icon: <WebAssetOutlined />,
    block: () => ({
      type: 'Header',
      data: {
        props: {
          showLogo: true,
          logoUrl: 'https://placehold.co/150x50/1a1a1a/FFFFFF?text=LOGO',
          logoAlt: 'Company Logo',
          logoWidth: 150,
          logoHeight: 50,
          showNavigation: true,
          navLinks: [
            { id: '1', text: 'Home', url: '#' },
            { id: '2', text: 'Shop', url: '#' },
            { id: '3', text: 'About', url: '#' },
            { id: '4', text: 'Contact', url: '#' },
          ],
          showDivider: true,
          layout: 'center',
        },
        style: {
          backgroundColor: '#FFFFFF',
          padding: { top: 24, bottom: 24, left: 24, right: 24 },
        },
      },
    }),
  },
  {
    label: 'Footer',
    icon: <CallToActionOutlined />,
    block: () => ({
      type: 'Footer',
      data: {
        props: {
          showCompanyName: true,
          companyName: 'Company Name',
          showAddress: true,
          address: '123 Main Street, Suite 100, New York, NY 10001',
          showCopyright: true,
          copyrightText: `© ${new Date().getFullYear()} Company Name. All rights reserved.`,
          showFooterLinks: true,
          footerLinks: [
            { id: '1', text: 'Privacy Policy', url: '#' },
            { id: '2', text: 'Terms of Service', url: '#' },
            { id: '3', text: 'Contact Us', url: '#' },
          ],
          showSocialLinks: true,
          socialLinks: [
            { id: '1', platform: 'Facebook', iconUrl: 'https://cdn-icons-png.flaticon.com/32/733/733547.png', url: 'https://facebook.com' },
            { id: '2', platform: 'Twitter', iconUrl: 'https://cdn-icons-png.flaticon.com/32/733/733579.png', url: 'https://twitter.com' },
            { id: '3', platform: 'Instagram', iconUrl: 'https://cdn-icons-png.flaticon.com/32/2111/2111463.png', url: 'https://instagram.com' },
          ],
          showUnsubscribe: true,
          unsubscribeText: 'Unsubscribe from this list',
          alignment: 'center',
        },
        style: {
          backgroundColor: '#F5F5F5',
          padding: { top: 32, bottom: 32, left: 24, right: 24 },
        },
      },
    }),
  },
  {
    label: 'Heading',
    icon: <HMobiledataOutlined />,
    block: () => ({
      type: 'Heading',
      data: {
        props: { text: 'Hello friend' },
        style: {
          padding: { top: 16, bottom: 16, left: 24, right: 24 },
        },
      },
    }),
  },
  {
    label: 'Text',
    icon: <NotesOutlined />,
    block: () => ({
      type: 'Text',
      data: {
        props: { text: 'My new text block' },
        style: {
          padding: { top: 16, bottom: 16, left: 24, right: 24 },
          fontWeight: 'normal',
        },
      },
    }),
  },

  {
    label: 'Button',
    icon: <SmartButtonOutlined />,
    block: () => ({
      type: 'Button',
      data: {
        props: {
          text: 'Button',
          url: 'https://www.usewaypoint.com',
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Image',
    icon: <ImageOutlined />,
    block: () => ({
      type: 'Image',
      data: {
        props: {
          url: 'https://assets.usewaypoint.com/sample-image.jpg',
          alt: 'Sample product',
          contentAlignment: 'middle',
          linkHref: null,
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Avatar',
    icon: <AccountCircleOutlined />,
    block: () => ({
      type: 'Avatar',
      data: {
        props: {
          imageUrl: 'https://ui-avatars.com/api/?size=128',
          shape: 'circle',
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Contact',
    icon: <ContactMailOutlined />,
    block: () => ({
      type: 'Contact',
      data: {
        props: {
          type: 'both',
          email: 'contact@example.com',
          phone: '+1 234 567 8900',
          showIcon: true,
          layout: 'vertical',
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Address',
    icon: <LocationOnOutlined />,
    block: () => ({
      type: 'Address',
      data: {
        props: {
          addressLine1: '123 Main Street',
          addressLine2: 'Suite 100',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          zipCode: '10001',
          showIcon: true,
          layout: 'stacked',
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Map',
    icon: <MapOutlined />,
    block: () => ({
      type: 'Map',
      data: {
        props: {
          address: 'New York, NY, USA',
          latitude: '40.7128',
          longitude: '-74.0060',
          zoom: 14,
          width: 600,
          height: 300,
          showLink: true,
          linkText: 'Get Directions',
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Product',
    icon: <ShoppingCartOutlined />,
    block: () => ({
      type: 'ProductCard',
      data: {
        props: {
          imageUrl: 'https://placehold.co/300x300/EEE/999?text=Product',
          productName: 'Product Name',
          description: 'This is a short description of the product.',
          price: '99.99',
          originalPrice: '149.99',
          currency: '$',
          showDiscount: true,
          showRating: true,
          rating: 4.5,
          reviewCount: '128',
          showStock: true,
          stockStatus: 'in_stock',
          stockText: 'In Stock',
          showBadge: true,
          badgeText: 'SALE',
          showButton: true,
          buttonText: 'Buy Now',
          buttonUrl: 'https://example.com/product',
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Order Summary',
    icon: <ReceiptLongOutlined />,
    block: () => ({
      type: 'OrderSummary',
      data: {
        props: {
          orderId: 'ORD-12345',
          orderDate: new Date().toLocaleDateString(),
          orderStatus: 'confirmed',
          showOrderInfo: true,
          showItems: true,
          showPricing: true,
          showShippingInfo: true,
          showPaymentInfo: true,
          showCustomerInfo: true,
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Coupon',
    icon: <ConfirmationNumberOutlined />,
    block: () => ({
      type: 'Coupon',
      data: {
        props: {
          code: 'SAVE20',
          discountType: 'percentage',
          discountValue: 20,
          title: 'Special Offer!',
          subtitle: 'Limited Time Only',
          description: 'Use this code at checkout',
          showBadge: true,
          badgeText: 'LIMITED',
          showButton: true,
          buttonText: 'Shop Now',
          showExpiry: true,
          layout: 'vertical',
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Promo Banner',
    icon: <CampaignOutlined />,
    block: () => ({
      type: 'PromoBanner',
      data: {
        props: {
          showIcon: true,
          iconUrl: 'https://placehold.co/48x48/FFFFFF/FFFFFF?text=👥',
          headline: 'GIVE $50, GET $50',
          description: 'Refer friends and earn rewards.',
          showButton: true,
          buttonText: 'Learn More',
          buttonUrl: '#',
          buttonStyle: 'link',
          alignment: 'center',
        },
        style: {
          backgroundColor: '#1a2b4a',
          padding: { top: 40, bottom: 40, left: 24, right: 24 },
        },
      },
    }),
  },
  {
    label: 'Social Links',
    icon: <ShareOutlined />,
    block: () => ({
      type: 'SocialLinks',
      data: {
        props: {
          links: [
            { id: '1', platform: 'Instagram', iconUrl: 'https://cdn-icons-png.flaticon.com/32/2111/2111463.png', url: 'https://instagram.com' },
            { id: '2', platform: 'Pinterest', iconUrl: 'https://cdn-icons-png.flaticon.com/32/145/145808.png', url: 'https://pinterest.com' },
            { id: '3', platform: 'Twitter', iconUrl: 'https://cdn-icons-png.flaticon.com/32/733/733579.png', url: 'https://twitter.com' },
            { id: '4', platform: 'Facebook', iconUrl: 'https://cdn-icons-png.flaticon.com/32/733/733547.png', url: 'https://facebook.com' },
          ],
          showContactInfo: true,
          contactText: 'support@example.com | +1 888-995-2507',
          showFooterText: true,
          footerText: '45 Bond Street New York, NY, 10012 | © 2024 Company Inc.',
          alignment: 'center',
        },
        style: { padding: { top: 32, bottom: 32, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Divider',
    icon: <HorizontalRuleOutlined />,
    block: () => ({
      type: 'Divider',
      data: {
        style: { padding: { top: 16, right: 0, bottom: 16, left: 0 } },
        props: {
          lineColor: '#CCCCCC',
        },
      },
    }),
  },
  {
    label: 'Spacer',
    icon: <Crop32Outlined />,
    block: () => ({
      type: 'Spacer',
      data: {},
    }),
  },
  {
    label: 'Html',
    icon: <HtmlOutlined />,
    block: () => ({
      type: 'Html',
      data: {
        props: { contents: '<strong>Hello world</strong>' },
        style: {
          fontSize: 16,
          textAlign: null,
          padding: { top: 16, bottom: 16, left: 24, right: 24 },
        },
      },
    }),
  },
  {
    label: 'Columns',
    icon: <ViewColumnOutlined />,
    block: () => ({
      type: 'ColumnsContainer',
      data: {
        props: {
          columnsGap: 16,
          columnsCount: 3,
          columns: [{ childrenIds: [] }, { childrenIds: [] }, { childrenIds: [] }],
        },
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },
  {
    label: 'Container',
    icon: <LibraryAddOutlined />,
    block: () => ({
      type: 'Container',
      data: {
        style: { padding: { top: 16, bottom: 16, left: 24, right: 24 } },
      },
    }),
  },

  // { label: 'ProgressBar', icon: <ProgressBarOutlined />, block: () => ({}) },
  // { label: 'LoopContainer', icon: <ViewListOutlined />, block: () => ({}) },
];
