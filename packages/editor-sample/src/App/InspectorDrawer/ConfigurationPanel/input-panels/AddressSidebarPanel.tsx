import React, { useState } from 'react';

import { ToggleButton } from '@mui/material';
import { AddressProps, AddressPropsDefaults, AddressPropsSchema } from '@usewaypoint/block-address';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import ColorInput from './helpers/inputs/ColorInput';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import VariableTextInput from './helpers/inputs/VariableTextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type AddressSidebarPanelProps = {
  data: AddressProps;
  setData: (v: AddressProps) => void;
};

export default function AddressSidebarPanel({ data, setData }: AddressSidebarPanelProps) {
  const [, setErrors] = useState<any>(null);

  const updateData = (d: unknown) => {
    const res = AddressPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const addressLine1 = data.props?.addressLine1 ?? AddressPropsDefaults.addressLine1;
  const addressLine2 = data.props?.addressLine2 ?? AddressPropsDefaults.addressLine2;
  const city = data.props?.city ?? AddressPropsDefaults.city;
  const state = data.props?.state ?? AddressPropsDefaults.state;
  const country = data.props?.country ?? AddressPropsDefaults.country;
  const zipCode = data.props?.zipCode ?? AddressPropsDefaults.zipCode;
  const textColor = data.props?.textColor ?? AddressPropsDefaults.textColor;
  const showIcon = data.props?.showIcon ?? AddressPropsDefaults.showIcon;
  const layout = data.props?.layout ?? AddressPropsDefaults.layout;

  return (
    <BaseSidebarPanel title="Address block">
      <VariableTextInput
        label="Address Line 1"
        defaultValue={addressLine1}
        onChange={(addressLine1) => updateData({ ...data, props: { ...data.props, addressLine1 } })}
      />
      <VariableTextInput
        label="Address Line 2"
        defaultValue={addressLine2}
        onChange={(addressLine2) => updateData({ ...data, props: { ...data.props, addressLine2 } })}
        helperText="Apartment, suite, unit, etc. (optional)"
      />
      <VariableTextInput
        label="City"
        defaultValue={city}
        onChange={(city) => updateData({ ...data, props: { ...data.props, city } })}
      />
      <VariableTextInput
        label="State / Province"
        defaultValue={state}
        onChange={(state) => updateData({ ...data, props: { ...data.props, state } })}
      />
      <VariableTextInput
        label="Zip / Postal Code"
        defaultValue={zipCode}
        onChange={(zipCode) => updateData({ ...data, props: { ...data.props, zipCode } })}
      />
      <VariableTextInput
        label="Country"
        defaultValue={country}
        onChange={(country) => updateData({ ...data, props: { ...data.props, country } })}
      />

      <RadioGroupInput
        label="Layout"
        defaultValue={layout}
        onChange={(layout) => updateData({ ...data, props: { ...data.props, layout } })}
      >
        <ToggleButton value="stacked">Stacked</ToggleButton>
        <ToggleButton value="inline">Inline</ToggleButton>
      </RadioGroupInput>

      <BooleanInput
        label="Show Location Icon"
        defaultValue={showIcon}
        onChange={(showIcon) => updateData({ ...data, props: { ...data.props, showIcon } })}
      />

      <ColorInput
        label="Text Color"
        defaultValue={textColor}
        onChange={(textColor) => updateData({ ...data, props: { ...data.props, textColor } })}
      />

      <MultiStylePropertyPanel
        names={['backgroundColor', 'fontFamily', 'fontSize', 'fontWeight', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}

