import React, { useState } from 'react';

import { ToggleButton } from '@mui/material';
import { ContactProps, ContactPropsDefaults, ContactPropsSchema } from '@usewaypoint/block-contact';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import ColorInput from './helpers/inputs/ColorInput';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import VariableTextInput from './helpers/inputs/VariableTextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type ContactSidebarPanelProps = {
  data: ContactProps;
  setData: (v: ContactProps) => void;
};

export default function ContactSidebarPanel({ data, setData }: ContactSidebarPanelProps) {
  const [, setErrors] = useState<any>(null);

  const updateData = (d: unknown) => {
    const res = ContactPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const type = data.props?.type ?? ContactPropsDefaults.type;
  const email = data.props?.email ?? ContactPropsDefaults.email;
  const phone = data.props?.phone ?? ContactPropsDefaults.phone;
  const emailLabel = data.props?.emailLabel ?? '';
  const phoneLabel = data.props?.phoneLabel ?? '';
  const linkColor = data.props?.linkColor ?? ContactPropsDefaults.linkColor;
  const showIcon = data.props?.showIcon ?? ContactPropsDefaults.showIcon;
  const layout = data.props?.layout ?? ContactPropsDefaults.layout;

  const showEmailFields = type === 'email' || type === 'both';
  const showPhoneFields = type === 'phone' || type === 'both';

  return (
    <BaseSidebarPanel title="Contact block">
      <RadioGroupInput
        label="Type"
        defaultValue={type}
        onChange={(type) => updateData({ ...data, props: { ...data.props, type } })}
      >
        <ToggleButton value="email">Email</ToggleButton>
        <ToggleButton value="phone">Phone</ToggleButton>
        <ToggleButton value="both">Both</ToggleButton>
      </RadioGroupInput>

      {showEmailFields && (
        <>
          <VariableTextInput
            label="Email"
            defaultValue={email}
            onChange={(email) => updateData({ ...data, props: { ...data.props, email } })}
          />
          <VariableTextInput
            label="Email Label (optional)"
            defaultValue={emailLabel}
            onChange={(emailLabel) => updateData({ ...data, props: { ...data.props, emailLabel } })}
            helperText="Leave empty to show email as label"
          />
        </>
      )}

      {showPhoneFields && (
        <>
          <VariableTextInput
            label="Phone"
            defaultValue={phone}
            onChange={(phone) => updateData({ ...data, props: { ...data.props, phone } })}
          />
          <VariableTextInput
            label="Phone Label (optional)"
            defaultValue={phoneLabel}
            onChange={(phoneLabel) => updateData({ ...data, props: { ...data.props, phoneLabel } })}
            helperText="Leave empty to show phone as label"
          />
        </>
      )}

      <RadioGroupInput
        label="Layout"
        defaultValue={layout}
        onChange={(layout) => updateData({ ...data, props: { ...data.props, layout } })}
      >
        <ToggleButton value="vertical">Vertical</ToggleButton>
        <ToggleButton value="horizontal">Horizontal</ToggleButton>
      </RadioGroupInput>

      <BooleanInput
        label="Show Icons"
        defaultValue={showIcon}
        onChange={(showIcon) => updateData({ ...data, props: { ...data.props, showIcon } })}
      />

      <ColorInput
        label="Link Color"
        defaultValue={linkColor}
        onChange={(linkColor) => updateData({ ...data, props: { ...data.props, linkColor } })}
      />

      <MultiStylePropertyPanel
        names={['backgroundColor', 'fontFamily', 'fontSize', 'fontWeight', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}

