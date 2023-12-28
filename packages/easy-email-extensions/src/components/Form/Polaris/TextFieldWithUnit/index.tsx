import React, { useCallback, useState } from 'react';

import { TextField, TextFieldProps } from '@shopify/polaris';

export type TextFieldWithUnitProps = {
  unit: 'px' | '%';
  onChange: (value: any) => void;
} & TextFieldProps;

const TextFieldWithUnit = (props: TextFieldWithUnitProps) => {
  const { onChange: onPropsChange, unit, ...rest } = props;

  const handleChange = useCallback(
    (value: any) => {
      onPropsChange(`${value}${unit}`);
    },
    [onPropsChange, unit],
  );

  return (
    <TextField
      {...props}
      value={unit ? props.value?.replace(unit, '') : props.value}
      onChange={handleChange}
    />
  );
};

export default TextFieldWithUnit;
