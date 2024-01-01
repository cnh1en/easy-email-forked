import React from 'react';
import { Input } from './Input';
import { TextFieldProps } from '@shopify/polaris';

export interface InputWithUnitProps
  extends Omit<TextFieldProps, 'onChange' | 'autoComplete'> {
  value: string;
  onChange: (val: string) => void;
  quickchange?: boolean;
  autoComplete?: 'off' | 'on';
}

export function InputWithUnit(props: InputWithUnitProps) {
  return (
    <Input
      {...props}
      autoComplete='off'
      // quickchange
    />
  );
}
