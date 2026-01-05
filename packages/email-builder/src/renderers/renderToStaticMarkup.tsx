import React from 'react';
import { renderToStaticMarkup as baseRenderToStaticMarkup } from 'react-dom/server';

import { StaticReader, TReaderDocument } from '../Reader/core';

type TOptions = {
  rootBlockId: string;
};
export default function renderToStaticMarkup(document: TReaderDocument, { rootBlockId }: TOptions) {
  return (
    '<!DOCTYPE html>' +
    baseRenderToStaticMarkup(
      <html>
        <body>
          <StaticReader document={document} rootBlockId={rootBlockId} />
        </body>
      </html>
    )
  );
}
