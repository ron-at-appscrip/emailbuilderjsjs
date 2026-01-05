import React, { createContext, useContext } from 'react';
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

import ColumnsContainerPropsSchema from '../blocks/ColumnsContainer/ColumnsContainerPropsSchema';
import ColumnsContainerReader from '../blocks/ColumnsContainer/ColumnsContainerReader';
import { ContainerPropsSchema } from '../blocks/Container/ContainerPropsSchema';
import ContainerReader from '../blocks/Container/ContainerReader';
import { EmailLayoutPropsSchema } from '../blocks/EmailLayout/EmailLayoutPropsSchema';
import EmailLayoutReader from '../blocks/EmailLayout/EmailLayoutReader';

const ReaderContext = createContext<TReaderDocument>({});

// Global variable for server-side rendering fallback
let __staticDocument: TReaderDocument = {};

function useReaderDocument() {
  const contextDoc = useContext(ReaderContext);
  // If context returns default value (empty object with no keys), use global fallback
  if (Object.keys(contextDoc).length === 0 && Object.keys(__staticDocument).length > 0) {
    return __staticDocument;
  }
  return contextDoc;
}

const READER_DICTIONARY = buildBlockConfigurationDictionary({
  ColumnsContainer: {
    schema: ColumnsContainerPropsSchema as any,
    Component: ColumnsContainerReader,
  },
  Container: {
    schema: ContainerPropsSchema as any,
    Component: ContainerReader,
  },
  EmailLayout: {
    schema: EmailLayoutPropsSchema as any,
    Component: EmailLayoutReader,
  },
  //
  Address: {
    schema: AddressPropsSchema,
    Component: Address,
  },
  Avatar: {
    schema: AvatarPropsSchema,
    Component: Avatar,
  },
  Button: {
    schema: ButtonPropsSchema,
    Component: Button,
  },
  Contact: {
    schema: ContactPropsSchema,
    Component: Contact,
  },
  Coupon: {
    schema: CouponPropsSchema as any,
    Component: Coupon,
  },
  Divider: {
    schema: DividerPropsSchema,
    Component: Divider,
  },
  Footer: {
    schema: FooterPropsSchema,
    Component: Footer,
  },
  Header: {
    schema: HeaderPropsSchema,
    Component: Header,
  },
  Heading: {
    schema: HeadingPropsSchema,
    Component: Heading,
  },
  Html: {
    schema: HtmlPropsSchema,
    Component: Html,
  },
  Image: {
    schema: ImagePropsSchema,
    Component: Image,
  },
  Map: {
    schema: MapPropsSchema,
    Component: Map,
  },
  OrderSummary: {
    schema: OrderSummaryPropsSchema,
    Component: OrderSummary,
  },
  ProductCard: {
    schema: ProductCardPropsSchema,
    Component: ProductCard,
  },
  PromoBanner: {
    schema: PromoBannerPropsSchema,
    Component: PromoBanner,
  },
  SocialLinks: {
    schema: SocialLinksPropsSchema,
    Component: SocialLinks,
  },
  Spacer: {
    schema: SpacerPropsSchema,
    Component: Spacer,
  },
  Text: {
    schema: TextPropsSchema as any,
    Component: Text,
  },
});

export const ReaderBlockSchema = buildBlockConfigurationSchema(READER_DICTIONARY as any) as any;
export type TReaderBlock = z.infer<typeof ReaderBlockSchema>;

export const ReaderDocumentSchema = z.record(z.string(), ReaderBlockSchema);
export type TReaderDocument = Record<string, TReaderBlock>;

const BaseReaderBlock = buildBlockComponent(READER_DICTIONARY);

export type TReaderBlockProps = { id: string };
export function ReaderBlock({ id }: TReaderBlockProps) {
  const document = useReaderDocument();
  const blockConfig = document[id];
  if (!blockConfig) {
    console.error(`[ReaderBlock] Block not found for id: "${id}". Document keys:`, Object.keys(document));
    return null;
  }
  return <BaseReaderBlock {...blockConfig} />;
}

export type TReaderProps = {
  document: Record<string, any>;
  rootBlockId: string;
};
export default function Reader({ document, rootBlockId }: TReaderProps) {
  return (
    <ReaderContext.Provider value={document}>
      <ReaderBlock id={rootBlockId} />
    </ReaderContext.Provider>
  );
}

// Static Reader that sets a global fallback for server-side rendering
export function StaticReader({ document, rootBlockId }: TReaderProps) {
  // Set global document for fallback when context doesn't work in SSR
  __staticDocument = document;
  return (
    <ReaderContext.Provider value={document}>
      <ReaderBlock id={rootBlockId} />
    </ReaderContext.Provider>
  );
}
