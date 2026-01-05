import React from 'react';
import { z } from 'zod';

import { Address, AddressPropsSchema } from '@usewaypoint/block-address';
import { Avatar, AvatarPropsSchema } from '@usewaypoint/block-avatar';
import { Button, ButtonPropsSchema } from '@usewaypoint/block-button';
import { Contact, ContactPropsSchema } from '@usewaypoint/block-contact';
import { Coupon, CouponPropsSchema } from '@usewaypoint/block-coupon';
import { Divider, DividerPropsSchema } from '@usewaypoint/block-divider';
import { Footer, FooterPropsSchema } from '@usewaypoint/block-footer';
import { Header, HeaderPropsSchema } from '@usewaypoint/block-header';
import { Heading, HeadingPropsSchema } from '@usewaypoint/block-heading';
import { Html, HtmlPropsSchema } from '@usewaypoint/block-html';
import { Image, ImagePropsSchema } from '@usewaypoint/block-image';
import { Map, MapPropsSchema } from '@usewaypoint/block-map';
import { OrderSummary, OrderSummaryPropsSchema } from '@usewaypoint/block-order-summary';
import { ProductCard, ProductCardPropsSchema } from '@usewaypoint/block-product-card';
import { PromoBanner, PromoBannerPropsSchema } from '@usewaypoint/block-promo-banner';
import { SocialLinks, SocialLinksPropsSchema } from '@usewaypoint/block-social-links';
import { Spacer, SpacerPropsSchema } from '@usewaypoint/block-spacer';
import { Text, TextPropsSchema } from '@usewaypoint/block-text';
import {
  buildBlockComponent,
  buildBlockConfigurationDictionary,
  buildBlockConfigurationSchema,
} from '@usewaypoint/document-core';

import ColumnsContainerEditor from '../blocks/ColumnsContainer/ColumnsContainerEditor';
import ColumnsContainerPropsSchema from '../blocks/ColumnsContainer/ColumnsContainerPropsSchema';
import ContainerEditor from '../blocks/Container/ContainerEditor';
import ContainerPropsSchema from '../blocks/Container/ContainerPropsSchema';
import EmailLayoutEditor from '../blocks/EmailLayout/EmailLayoutEditor';
import EmailLayoutPropsSchema from '../blocks/EmailLayout/EmailLayoutPropsSchema';
import EditorBlockWrapper from '../blocks/helpers/block-wrappers/EditorBlockWrapper';

const EDITOR_DICTIONARY = buildBlockConfigurationDictionary({
  Address: {
    schema: AddressPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <Address {...props} />
      </EditorBlockWrapper>
    ),
  },
  Avatar: {
    schema: AvatarPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <Avatar {...props} />
      </EditorBlockWrapper>
    ),
  },
  Button: {
    schema: ButtonPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <Button {...props} />
      </EditorBlockWrapper>
    ),
  },
  Contact: {
    schema: ContactPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <Contact {...props} />
      </EditorBlockWrapper>
    ),
  },
  Coupon: {
    schema: CouponPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <Coupon {...props} />
      </EditorBlockWrapper>
    ),
  },
  Container: {
    schema: ContainerPropsSchema as any,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <ContainerEditor {...props} />
      </EditorBlockWrapper>
    ),
  },
  ColumnsContainer: {
    schema: ColumnsContainerPropsSchema as any,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <ColumnsContainerEditor {...props} />
      </EditorBlockWrapper>
    ),
  },
  Heading: {
    schema: HeadingPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <Heading {...props} />
      </EditorBlockWrapper>
    ),
  },
  Html: {
    schema: HtmlPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <Html {...props} />
      </EditorBlockWrapper>
    ),
  },
  Image: {
    schema: ImagePropsSchema,
    Component: (data: any) => {
      const props = {
        ...data,
        props: {
          ...data.props,
          url: data.props?.url ?? 'https://placehold.co/600x400@2x/F8F8F8/CCC?text=Your%20image',
        },
      };
      return (
        <EditorBlockWrapper>
          <Image {...props} />
        </EditorBlockWrapper>
      );
    },
  },
  Map: {
    schema: MapPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <Map {...props} />
      </EditorBlockWrapper>
    ),
  },
  OrderSummary: {
    schema: OrderSummaryPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <OrderSummary {...props} />
      </EditorBlockWrapper>
    ),
  },
  ProductCard: {
    schema: ProductCardPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <ProductCard {...props} />
      </EditorBlockWrapper>
    ),
  },
  PromoBanner: {
    schema: PromoBannerPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <PromoBanner {...props} />
      </EditorBlockWrapper>
    ),
  },
  SocialLinks: {
    schema: SocialLinksPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <SocialLinks {...props} />
      </EditorBlockWrapper>
    ),
  },
  Text: {
    schema: TextPropsSchema as any,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <Text {...props} />
      </EditorBlockWrapper>
    ),
  },
  EmailLayout: {
    schema: EmailLayoutPropsSchema as any,
    Component: (p: any) => <EmailLayoutEditor {...p} />,
  },
  Spacer: {
    schema: SpacerPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <Spacer {...props} />
      </EditorBlockWrapper>
    ),
  },
  Divider: {
    schema: DividerPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <Divider {...props} />
      </EditorBlockWrapper>
    ),
  },
  Header: {
    schema: HeaderPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <Header {...props} />
      </EditorBlockWrapper>
    ),
  },
  Footer: {
    schema: FooterPropsSchema,
    Component: (props: any) => (
      <EditorBlockWrapper>
        <Footer {...props} />
      </EditorBlockWrapper>
    ),
  },
});

export const EditorBlock = buildBlockComponent(EDITOR_DICTIONARY);
export const EditorBlockSchema = buildBlockConfigurationSchema(EDITOR_DICTIONARY as any) as any;
export const EditorConfigurationSchema = z.record(z.string(), EditorBlockSchema);

export type TEditorBlock = z.infer<typeof EditorBlockSchema>;
export type TEditorConfiguration = Record<string, TEditorBlock>;
