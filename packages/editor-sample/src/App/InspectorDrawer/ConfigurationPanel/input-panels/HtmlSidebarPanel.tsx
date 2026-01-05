import React, { useState } from 'react';

import { HtmlProps, HtmlPropsSchema } from '@usewaypoint/block-html';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import VariableTextInput from './helpers/inputs/VariableTextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type HtmlSidebarPanelProps = {
  data: HtmlProps;
  setData: (v: HtmlProps) => void;
};
export default function HtmlSidebarPanel({ data, setData }: HtmlSidebarPanelProps) {
  const [, setErrors] = useState<any>(null);

  const updateData = (d: unknown) => {
    const res = HtmlPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <BaseSidebarPanel title="Html block">
      <VariableTextInput
        label="Content"
        rows={5}
        defaultValue={data.props?.contents ?? ''}
        onChange={(contents) => updateData({ ...data, props: { ...data.props, contents } })}
      />
      <MultiStylePropertyPanel
        names={['color', 'backgroundColor', 'fontFamily', 'fontSize', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
