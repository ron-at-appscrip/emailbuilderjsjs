import React from 'react';

import { ColumnsContainer as BaseColumnsContainer } from '@usewaypoint/block-columns-container';

import { ReaderBlock } from '../../Reader/core';

import { ColumnsContainerProps } from './ColumnsContainerPropsSchema';

export default function ColumnsContainerReader({ style, props }: ColumnsContainerProps) {
  const { columns, ...restProps } = props ?? {};
  let cols = undefined;
  if (columns) {
    cols = columns.map((col: { childrenIds: string[] }) => col.childrenIds.map((childId: string) => <ReaderBlock key={childId} id={childId} />));
  }

  return <BaseColumnsContainer props={restProps} columns={cols} style={style} />;
}
