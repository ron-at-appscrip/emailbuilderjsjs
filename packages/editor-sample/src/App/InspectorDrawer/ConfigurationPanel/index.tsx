import React from 'react';

import { Box, Typography } from '@mui/material';

import { TEditorBlock } from '../../../documents/editor/core';
import { setDocument, useDocument, useSelectedBlockId } from '../../../documents/editor/EditorContext';

import AddressSidebarPanel from './input-panels/AddressSidebarPanel';
import AvatarSidebarPanel from './input-panels/AvatarSidebarPanel';
import ButtonSidebarPanel from './input-panels/ButtonSidebarPanel';
import ColumnsContainerSidebarPanel from './input-panels/ColumnsContainerSidebarPanel';
import ContactSidebarPanel from './input-panels/ContactSidebarPanel';
import ContainerSidebarPanel from './input-panels/ContainerSidebarPanel';
import CouponSidebarPanel from './input-panels/CouponSidebarPanel';
import DividerSidebarPanel from './input-panels/DividerSidebarPanel';
import EmailLayoutSidebarPanel from './input-panels/EmailLayoutSidebarPanel';
import FooterSidebarPanel from './input-panels/FooterSidebarPanel';
import HeaderSidebarPanel from './input-panels/HeaderSidebarPanel';
import HeadingSidebarPanel from './input-panels/HeadingSidebarPanel';
import HtmlSidebarPanel from './input-panels/HtmlSidebarPanel';
import ImageSidebarPanel from './input-panels/ImageSidebarPanel';
import MapSidebarPanel from './input-panels/MapSidebarPanel';
import OrderSummarySidebarPanel from './input-panels/OrderSummarySidebarPanel';
import ProductCardSidebarPanel from './input-panels/ProductCardSidebarPanel';
import PromoBannerSidebarPanel from './input-panels/PromoBannerSidebarPanel';
import SocialLinksSidebarPanel from './input-panels/SocialLinksSidebarPanel';
import SpacerSidebarPanel from './input-panels/SpacerSidebarPanel';
import TextSidebarPanel from './input-panels/TextSidebarPanel';

function renderMessage(val: string) {
  return (
    <Box sx={{ m: 3, p: 1, border: '1px dashed', borderColor: 'divider' }}>
      <Typography color="text.secondary">{val}</Typography>
    </Box>
  );
}

export default function ConfigurationPanel() {
  const document = useDocument();
  const selectedBlockId = useSelectedBlockId();

  if (!selectedBlockId) {
    return renderMessage('Click on a block to inspect.');
  }
  const block = document[selectedBlockId];
  if (!block) {
    return renderMessage(`Block with id ${selectedBlockId} was not found. Click on a block to reset.`);
  }

  const setBlock = (conf: TEditorBlock) => setDocument({ [selectedBlockId]: conf });
  const { data, type } = block;
  switch (type) {
    case 'Address':
      return <AddressSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Avatar':
      return <AvatarSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Button':
      return <ButtonSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Contact':
      return <ContactSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Coupon':
      return <CouponSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'ColumnsContainer':
      return (
        <ColumnsContainerSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />
      );
    case 'Container':
      return <ContainerSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Divider':
      return <DividerSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Header':
      return <HeaderSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Footer':
      return <FooterSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Heading':
      return <HeadingSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Html':
      return <HtmlSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Image':
      return <ImageSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Map':
      return <MapSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'OrderSummary':
      return <OrderSummarySidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'ProductCard':
      return <ProductCardSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'PromoBanner':
      return <PromoBannerSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'SocialLinks':
      return <SocialLinksSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'EmailLayout':
      return <EmailLayoutSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Spacer':
      return <SpacerSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    case 'Text':
      return <TextSidebarPanel key={selectedBlockId} data={data} setData={(data) => setBlock({ type, data })} />;
    default:
      return <pre>{JSON.stringify(block, null, '  ')}</pre>;
  }
}
